import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { GoogleGenAI, Type } from "@google/genai";

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const MODULES_FILE = path.join(DATA_DIR, "modules.json");
const AKADEMIK_FILE = path.join(DATA_DIR, "akademik.json");

const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days (sesi panjang tanpa batas pemakaian)

const ADMIN_EMAIL = "yahyappg2025@gmail.com";
const ADMIN_NAME = "Yahya, S.Pd.I";
const ADMIN_SCHOOL = "GURU PINTAR, CERDAS DAN PROFESIONAL — Admin Sekolah";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  school: string;
  role: "admin" | "guru";
  jabatan: string;
  createdAt: string;
  passwordHash: string;
  salt: string;
}

interface SafeUser {
  id: string;
  name: string;
  email: string;
  school: string;
  role: "admin" | "guru";
  jabatan: string;
  createdAt: string;
}

interface AuthedRequest extends Request {
  user?: SafeUser;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function verifyPassword(password: string, salt: string, expectedHex: string) {
  const derived = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

function toSafeUser(u: StoredUser): SafeUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    school: u.school,
    role: u.role,
    jabatan: u.jabatan,
    createdAt: u.createdAt,
  };
}

function getInitialAdminPassword(): string {
  const envPass = process.env.ADMIN_PASSWORD?.trim();
  if (envPass && envPass !== "MY_ADMIN_PASSWORD") {
    return envPass;
  }
  return "123456";
}

function loadUsers(): StoredUser[] {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) {
    const salt = crypto.randomBytes(16).toString("hex");
    const adminUser: StoredUser = {
      id: "admin-yahya",
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      school: ADMIN_SCHOOL,
      role: "admin",
      jabatan: "Administrator Sekolah",
      createdAt: new Date().toISOString(),
      salt,
      passwordHash: hashPassword(getInitialAdminPassword(), salt),
    };
    const seeded: StoredUser[] = [adminUser];
    fs.writeFileSync(USERS_FILE, JSON.stringify(seeded, null, 2));
    return seeded;
  }

  const parsed: StoredUser[] = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  let dirty = false;

  // Ensure legacy demo seed is removed and requested admin exists
  const filtered = parsed.filter((u) => {
    if (u.id === "guru-demo-1" && u.email === "guru@sarangilmu.id") {
      dirty = true;
      return false;
    }
    return true;
  });

  const existingAdmin = filtered.find((u) => u.email.toLowerCase() === ADMIN_EMAIL);
  if (!existingAdmin) {
    const salt = crypto.randomBytes(16).toString("hex");
    filtered.unshift({
      id: "admin-yahya",
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      school: ADMIN_SCHOOL,
      role: "admin",
      jabatan: "Administrator Sekolah",
      createdAt: new Date().toISOString(),
      salt,
      passwordHash: hashPassword(getInitialAdminPassword(), salt),
    });
    dirty = true;
  } else if (existingAdmin.role !== "admin") {
    existingAdmin.role = "admin";
    existingAdmin.name = ADMIN_NAME;
    dirty = true;
  }

  if (dirty) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(filtered, null, 2));
  }
  return filtered;
}

function saveUsers(users: StoredUser[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function signToken(userId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: Date.now() + TOKEN_TTL_MS }),
    "utf-8"
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function verifyToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as {
      uid?: string;
      exp?: number;
    };
    if (!decoded.uid || !decoded.exp || decoded.exp < Date.now()) {
      return null;
    }
    return decoded.uid;
  } catch {
    return null;
  }
}

function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    res.status(401).json({ error: "Sesi berakhir atau belum masuk. Silakan login kembali." });
    return;
  }
  const uid = verifyToken(match[1]);
  if (!uid) {
    res.status(401).json({ error: "Token sesi tidak valid atau telah kedaluwarsa." });
    return;
  }
  const users = loadUsers();
  const user = users.find((u) => u.id === uid);
  if (!user) {
    res.status(401).json({ error: "Akun tidak ditemukan." });
    return;
  }
  req.user = toSafeUser(user);
  next();
}

function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Akses ditolak. Fitur ini khusus untuk Admin." });
    return;
  }
  next();
}

function getSeedModules() {
  const now = new Date().toISOString();
  return [
    {
      id: "modul-ipa-fotosintesis-d",
      ownerId: "shared-demo",
      createdAt: now,
      updatedAt: now,
      identitas: {
        judulModul: "Transformasi Energi pada Fotosintesis dan Respirasi Sel",
        penyusun: "Yahya, S.Pd.I",
        sekolah: "SMP Negeri 1 Yogyakarta",
        tahunAjaran: "2026/2027",
        jenjang: "SMP/MTs",
        fase: "Fase D",
        kelas: "Kelas 8",
        mataPelajaran: "IPA (Ilmu Pengetahuan Alam)",
        topik: "Fotosintesis, Klorofil, dan Hubungan Energi Ekosistem",
        alokasiWaktu: "4 JP (2 x 80 menit)",
        jumlahPertemuan: 2,
        modelPembelajaran: "Inquiry Learning",
      },
      identifikasi: {
        kesiapanMurid:
          "Sebagian besar murid sudah mengenal kebutuhan tumbuhan terhadap air dan cahaya matahari dari pembelajaran IPAS Fase C, namun masih perlu membangun pemahaman mendalam mengenai bagaimana energi cahaya diubah menjadi energi kimia (glukosa) dan kaitannya dengan rantai makanan.",
        karakteristikMateri:
          "Materi konseptual dan eksperimental yang menghubungkan struktur daun (stomata dan kloroplas) dengan proses biokimia sederhana melalui pengamatan langsung uji amilum (Sachs).",
        dimensiProfilLulusan: [
          "Penalaran Kritis",
          "Kolaborasi",
          "Komunikasi",
          "Keimanan dan Ketakwaan terhadap Tuhan YME",
        ],
      },
      desainPembelajaran: {
        capaianPembelajaran:
          "Peserta didik mampu melakukan analisis untuk menemukan keterkaitan sistem organ dengan fungsinya serta kelainan atau gangguan yang muncul pada sistem organ dan proses transformasi energi pada makhluk hidup.",
        tujuanPembelajaran: [
          "Menjelaskan mekanisme perubahan energi cahaya menjadi energi kimia dalam proses fotosintesis melalui penyelidikan ilmiah.",
          "Membuktikan keterlibatan cahaya matahari dan klorofil dalam pembentukan amilum melalui eksperimen Uji Sachs.",
          "Menyajikan analisis keterkaitan fotosintesis terhadap keseimbangan oksigen dan ketahanan pangan di lingkungan sekitar.",
        ],
        pemahamanBermakna:
          "Tumbuhan hijau bertindak sebagai produsen energi utama di Bumi; setiap tarikan napas dan makanan yang kita konsumsi bergantung pada reaksi fotosintesis yang teratur.",
        pertanyaanPemantik: [
          "Mengapa daun yang ditutup kertas timah selama dua hari menghasilkan warna berbeda saat ditetesi larutan iodin?",
          "Apa yang akan terjadi pada kehidupan manusia jika seluruh tumbuhan hijau kehilangan kemampuan berfotosintesis selama satu bulan?",
        ],
        praktikPedagogis:
          "Pendekatan Pembelajaran Mendalam berbasis Inquiry Learning yang mengintegrasikan prinsip Berkesadaran (observasi hening terhadap daun hidup), Bermakna (kaitan dengan tanaman pangan lokal), dan Menggembirakan (eksperimen laboratorium kolaboratif).",
        kemitraanPembelajaran:
          "Kolaborasi dengan pengelola kebun sekolah / bank bibit lokal dan guru Prakarya untuk mengaitkan fotosintesis dengan perawatan tanaman produktif.",
        lingkunganBelajar:
          "Laboratorium IPA dan halaman taman sekolah yang memberi ruang bagi murid mengamati daun segar secara langsung dan berdiskusi dalam kelompok kecil.",
        pemanfaatanDigital:
          "Penggunaan simulasi interaktif spektrum cahaya fotosintesis dan dokumentasi foto hasil perubahan warna daun ke lembar pengamatan digital.",
      },
      pengalamanBelajar: {
        kegiatanAwal: [
          "Orientasi & Kesadaran Penuh (Berkesadaran · 3 menit): Guru menyapa murid dengan hangat, memimpin doa bersama, memeriksa kehadiran serta kesiapan fisik/emosional (check-in perasaan), lalu mengajak murid menarik napas dalam sejenak sambil menyadari dari mana asal oksigen yang dihirup.",
          "Apersepsi Kontekstual (Bermakna · 3 menit): Guru menayangkan gambar dua tanaman sejenis—satu diletakkan di ruang terang dan satu di lemari gelap—untuk menggali pengetahuan prasyarat dari pembelajaran IPAS sebelumnya.",
          "Motivasi & Pertanyaan Pemantik (Menggembirakan · 3 menit): Guru memperlihatkan daun yang sebagian ditutup kertas aluminium sejak dua hari lalu dan mengajukan pertanyaan pemantik tentang perbedaan kandungan amilum pada kedua bagian daun tersebut.",
          "Asesmen Diagnostik Awal Singkat (3 menit): Murid menuliskan tiga bahan utama pembuat makanan pada tumbuhan melalui kartu tanya cepat untuk memetakan miskonsepsi (tanah vs proses fotosintesis).",
          "Penyampaian Tujuan, Alur Belajar & Kesepakatan Kelas (3 menit): Guru menyampaikan tujuan pembelajaran, alur praktikum Uji Sachs berkelompok, kriteria penilaian, serta menyepakati keselamatan kerja laboratorium.",
        ],
        kegiatanInti: [
          {
            phase: "Memahami",
            principle: "Berkesadaran & Bermakna",
            durationMinutes: 35,
            teacherActivities: [
              "Memfasilitasi murid mengamati penampang melintang daun, jaringan mesofil, dan letak stomata melalui gambar/mikroskop.",
              "Membimbing diskusi konseptual mengenai reaksi input (CO2 + H2O + energi cahaya) dan output (glukosa + O2) tanpa hafalan mekanis.",
              "Memberikan scaffolding visual bagi murid yang masih bingung membedakan peran klorofil sebagai penangkap cahaya dan air sebagai sumber elektron.",
            ],
            studentActivities: [
              "Mengamati spesimen daun segar di sekitar kelas dengan penuh kesadaran dan mencatat perbedaan permukaan atas serta bawah daun.",
              "Menyusun peta alur transformasi energi cahaya menjadi energi kimia (glukosa) secara berpasangan.",
              "Mengonfirmasi hipotesis awal kelompok terkait bagian daun yang terkena cahaya dan yang tertutup kertas timah.",
            ],
          },
          {
            phase: "Mengaplikasi",
            principle: "Bermakna & Menggembirakan",
            durationMinutes: 65,
            teacherActivities: [
              "Mendampingi pelaksanaan praktikum Uji Sachs (merebus daun hingga layu, melarutkan klorofil menggunakan alkohol dalam penangas air/water bath, lalu meneteskan larutan lugol/iodin).",
              "Memberikan pertanyaan pemandu penyelidikan ketika kelompok membandingkan perbedaan warna bagian daun yang tertutup dan terbuka.",
              "Memantau ketelitian pencatatan data pengamatan serta kepatuhan prosedur keselamatan laboratorium pada setiap kelompok.",
            ],
            studentActivities: [
              "Melaksanakan eksperimen Uji Sachs secara kolaboratif sesuai pembagian peran dan prosedur K3 laboratorium.",
              "Mendokumentasikan perubahan warna daun sebelum dan sesudah ditetesi iodin ke dalam tabel pengamatan LKPD.",
              "Menganalisis bukti ilmiah keterlibatan cahaya matahari dan klorofil dalam pembentukan amilum serta mengaitkannya dengan ketahanan pangan lokal.",
            ],
          },
          {
            phase: "Merefleksi",
            principle: "Berkesadaran",
            durationMinutes: 30,
            teacherActivities: [
              "Memandu sesi galeri karya singkat antarkelompok untuk saling membandingkan temuan eksperimen dan argumen ilmiah.",
              "Memberikan umpan balik penguatan atas kesimpulan berbasis bukti yang disusun tiap kelompok.",
              "Mengajak murid menuliskan komitmen nyata merawat minimal satu tanaman produktif di rumah atau lingkungan sekolah.",
            ],
            studentActivities: [
              "Mempresentasikan kesimpulan uji amilum dan menanggapi pertanyaan teman dengan bahasa yang santun dan berbasis data.",
              "Mengevaluasi strategi kerja kelompok selama praktikum dan bagian konsep yang masih perlu pendalaman.",
              "Mengisi jurnal refleksi pribadi mengenai hal paling bermakna yang dipelajari serta komitmen menjaga kelestarian tumbuhan.",
            ],
          },
        ],
        kegiatanPenutup: [
          "Sintesis & Kesimpulan Bersama (4 menit): Murid bersama guru merangkum hubungan langsung antara energi cahaya, klorofil, pembentukan amilum, dan produksi oksigen bagi kehidupan.",
          "Umpan Balik Apresiatif & Penguatan (3 menit): Guru memberikan apresiasi atas kolaborasi, ketelitian keselamatan kerja, dan argumen ilmiah murid.",
          "Cek Pemahaman Akhir / Exit Ticket (2 menit): Murid menjawab satu pertanyaan refleksi singkat mengapa tumbuhan disebut produsen energi utama di Bumi.",
          "Tindak Lanjut & Penutup (3 menit): Guru menyampaikan agenda pertemuan berikutnya tentang respirasi seluler, berpesan merawat tanaman di rumah, serta menutup dengan doa dan salam.",
        ],
      },
      asesmen: {
        asesmenAwal: "Pertanyaan diagnostik 3 menit di awal pertemuan untuk memetakan miskonsepsi asal makanan tumbuhan (tanah vs fotosintesis).",
        asesmenFormatif: "Observasi keaktifan selama eksperimen Uji Sachs dan ketepatan alur peta konsep transformasi energi.",
        asesmenSumatif: "Laporan hasil penyelidikan ilmiah (LKPD) dan soal uraian analisis kasus dampak penebangan vegetasi perkotaan.",
        rubrikPenilaian: [
          {
            criterion: "Pemahaman Konsep Reaksi Fotosintesis",
            excellent: "Menjelaskan input, proses perubahan energi, dan output fotosintesis dengan akurat beserta bukti ilmiah.",
            good: "Menjelaskan input dan output fotosintesis dengan tepat namun alur perubahan energi masih sederhana.",
            developing: "Mengidentifikasi bahan fotosintesis secara umum tetapi masih tertukar peran klorofil dan air.",
            needsSupport: "Memerlukan bimbingan langsung untuk membedakan fotosintesis dengan penyerapan unsur hara tanah.",
          },
          {
            criterion: "Keterampilan Proses Eksperimen Uji Sachs",
            excellent: "Menjalankan seluruh prosedur aman, rapi, mencatat data objektif, dan menafsirkan warna lugol secara kritis.",
            good: "Menjalankan prosedur dengan baik dan menafsirkan hasil utama meski catatan observasi masih singkat.",
            developing: "Membutuhkan arahan guru pada tahapan pelarutan klorofil dan pencatatan perubahan warna.",
            needsSupport: "Belum mengikuti urutan kerja keselamatan laboratorium secara mandiri.",
          },
        ],
      },
      lkpd: {
        judulLkpd: "Penyelidikan Ilmiah: Membuktikan Cahaya dan Klorofil pada Pembentukan Amilum",
        tujuanLkpd:
          "Membuktikan bahwa bagian daun yang terkena cahaya matahari menghasilkan amilum melalui perubahan warna biru-kehitaman saat diuji dengan larutan iodin.",
        petunjukBelajar: [
          "Berdoalah sebelum memulai kegiatan praktikum.",
          "Bekerjalah dalam kelompok beranggotakan 3–4 orang dengan pembagian tugas yang adil.",
          "Patuhi tata tertib keselamatan laboratorium terutama saat menggunakan air panas dan alkohol.",
        ],
        alatDanBahan: [
          "Daun tanaman yang sebagian permukaannya telah ditutup aluminium foil selama 48 jam",
          "Gelas kimia, tabung reaksi, penjepit, dan pemanas air (water bath)",
          "Alkohol 70% dan larutan Lugol / Iodin",
          "Cawan petri dan pipet tetes",
        ],
        aktivitas: [
          {
            stepNumber: 1,
            title: "Prediksi Awal Sebelum Pengujian",
            instruction:
              "Amati daun yang bagian tengahnya telah ditutup aluminium foil. Diskusikan dugaan kelompokmu sebelum melakukan uji kimia.",
            promptQuestions: [
              "Menurut kelompokmu, apakah bagian daun yang tertutup aluminium foil tetap menghasilkan cadangan makanan (amilum)? Jelaskan alasanmu.",
            ],
            answerLines: 3,
          },
          {
            stepNumber: 2,
            title: "Pengamatan Hasil Uji Iodin",
            instruction:
              "Setelah daun direbus, dilarutkan klorofilnya dengan alkohol panas secara tidak langsung, lalu ditetesi larutan iodin, bandingkan kedua bagian daun.",
            promptQuestions: [
              "Tuliskan perbedaan warna yang terlihat pada bagian daun yang terbuka vs bagian daun yang tertutup aluminium foil!",
              "Apa bukti yang menunjukkan bahwa cahaya matahari berperan langsung dalam proses fotosintesis?",
            ],
            answerLines: 3,
          },
        ],
        refleksiSiswa: [
          "Apa temuan paling mengejutkan yang kamu lihat langsung pada percobaan hari ini?",
          "Bagaimana tindakan sederhanamu di lingkungan sekolah untuk menjaga tumbuhan tetap sehat dan tumbuh optimal?",
        ],
      },
    },
    {
      id: "modul-mtk-pecahan-b",
      ownerId: "shared-demo",
      createdAt: now,
      updatedAt: now,
      identitas: {
        judulModul: "Membandingkan dan Mengurutkan Pecahan dalam Konteks Sehari-hari",
        penyusun: "Yahya, S.Pd.I",
        sekolah: "SD Negeri 03 Sukamaju",
        tahunAjaran: "2026/2027",
        jenjang: "SD/MI",
        fase: "Fase B",
        kelas: "Kelas 4",
        mataPelajaran: "Matematika",
        topik: "Pecahan Senilai, Membandingkan, dan Mengurutkan Pecahan",
        alokasiWaktu: "2 JP (2 x 35 menit)",
        jumlahPertemuan: 1,
        modelPembelajaran: "Problem Based Learning (PBL)",
      },
      identifikasi: {
        kesiapanMurid:
          "Murid sudah mengenal konsep setengah dan seperempat dari benda konkret di Kelas 2–3, namun sering keliru mengira 1/4 lebih besar daripada 1/2 karena melihat angka penyebut 4 lebih besar dari 2.",
        karakteristikMateri:
          "Konsep bilangan pecahan yang memerlukan representasi visual konkret (pita pecahan/kertas lipat) sebelum menuju simbol angka abstrak.",
        dimensiProfilLulusan: ["Penalaran Kritis", "Kolaborasi", "Kemandirian"],
      },
      desainPembelajaran: {
        capaianPembelajaran:
          "Peserta didik dapat membandingkan dan mengurutkan antar-pecahan dengan pembilang satu dan antar-pecahan dengan penyebut yang sama, serta mengenali pecahan senilai menggunakan gambar dan simbol matematika.",
        tujuanPembelajaran: [
          "Membandingkan dua pecahan menggunakan alat peraga pita pecahan kertas lipat dengan tepat.",
          "Menentukan pecahan senilai menggunakan model visual luas daerah dan garis bilangan sederhana.",
          "Menyelesaikan masalah pembagian makanan sehari-hari yang melibatkan perbandingan pecahan.",
        ],
        pemahamanBermakna:
          "Semakin banyak bagian sama besar yang membagi satu benda utuh, semakin kecil ukuran setiap bagiannya.",
        pertanyaanPemantik: [
          "Jika kamu sangat lapar, mana yang akan kamu pilih: 1/2 bagian martabak atau 1/4 bagian martabak dengan ukuran loyang yang sama?",
        ],
        praktikPedagogis:
          "Problem Based Learning dengan manipulasi benda konkret kertas origami sehingga murid menemukan sendiri hukum perbandingan penyebut secara menggembirakan.",
        kemitraanPembelajaran:
          "Melibatkan orang tua melalui tugas pengamatan berbagi buah atau kue di rumah bersama keluarga.",
        lingkunganBelajar:
          "Ruang kelas berkelompok dengan meja kerja yang leluasa untuk menggunting, melipat, dan membandingkan pita pecahan.",
        pemanfaatanDigital:
          "Menampilkan simulasi visual batang pecahan melalui proyektor kelas saat mengkonfirmasi temuan siswa.",
      },
      pengalamanBelajar: {
        kegiatanAwal: [
          "Orientasi & Kesadaran Penuh (Berkesadaran · 2 menit): Guru menyapa murid dengan hangat, mengajak berdoa yang dipimpin murid secara bergilir, memeriksa kehadiran, melakukan check-in kesiapan emosi ('Bagaimana perasaanmu siap belajar hari ini?'), serta latihan tarik napas sadar singkat agar fokus.",
          "Apersepsi Kontekstual (Bermakna · 3 menit): Guru memutar permainan tebak cepat gambar pembagian kue ulang tahun dan buah potong untuk mengingatkan kembali konsep pecahan setengah (1/2) dan seperempat (1/4) dari benda utuh.",
          "Motivasi & Pertanyaan Pemantik (Menggembirakan · 2 menit): Guru menunjukkan dua ukuran loyang martabak yang sama lalu mengajukan pertanyaan pemantik: 'Jika kamu sangat lapar, mana yang lebih mengenyangkan: 1/2 bagian atau 1/4 bagian martabak? Mengapa?'",
          "Asesmen Diagnostik Awal Singkat (2 menit): Murid mengangkat kartu atau jari untuk menebak nilai pecahan dari gambar lingkaran yang diarsir guna memetakan murid yang masih mengira 1/4 lebih besar daripada 1/2.",
          "Penyampaian Tujuan, Manfaat & Kesepakatan Belajar (1 menit): Guru menyampaikan tujuan belajar membandingkan pecahan dengan pita origami, kegunaannya saat berbagi makanan secara adil, serta menyepakati aturan diskusi kelompok.",
        ],
        kegiatanInti: [
          {
            phase: "Memahami",
            principle: "Berkesadaran & Bermakna",
            durationMinutes: 15,
            teacherActivities: [
              "Membagikan tiga lembar kertas lipat (origami) persegi panjang yang berukuran sama persis kepada setiap murid.",
              "Memandu murid secara bertahap melipat kertas pertama menjadi 2 bagian sama besar, kertas kedua menjadi 4 bagian, dan kertas ketiga menjadi 8 bagian.",
              "Membimbing murid mengarsir 1 atau beberapa bagian serta menuliskan simbol 1/2, 1/4, 2/4, dan 1/8 secara teliti untuk memahami makna pembilang dan penyebut.",
            ],
            studentActivities: [
              "Melipat setiap kertas origami dengan rapi, memastikan tiap lipatan berukuran sama besar, lalu mengarsir bagian yang ditentukan.",
              "Menuliskan lambang pecahan pada bagian arsir dan mengamati perubahan ukuran potongan saat lipatan semakin banyak.",
              "Mensejajarkan pita pecahan 1/2, 1/4, dan 2/4 di atas meja untuk menemukan pecahan yang ukurannya lebih besar atau sama panjang (senilai).",
            ],
          },
          {
            phase: "Mengaplikasi",
            principle: "Bermakna & Menggembirakan",
            durationMinutes: 25,
            teacherActivities: [
              "Menyajikan tantangan kontekstual pada LKPD tentang pembagian bekal roti antara Raka (1/2), Sinta (1/4), dan Dani (2/4).",
              "Berkeliling memberikan pendampingan diferensiasi (scaffolding) kepada murid yang masih ragu menggunakan tanda perbandingan <, >, atau =.",
              "Mengajak pasangan murid mengurutkan kartu pecahan berpenyebut berbeda melalui permainan 'Berburu Bagian Terbesar'.",
            ],
            studentActivities: [
              "Menempelkan dan mensejajarkan pita pecahan di LKPD untuk membuktikan mana bagian roti yang lebih besar, lebih kecil, atau sama besar.",
              "Mengisi simbol <, >, atau = serta menyusun urutan pecahan dari terkecil ke terbesar bersama teman sebangku.",
              "Menyelesaikan 2 soal cerita berbagi buah dan kue sehari-hari dengan menyertakan gambar model pecahan sebagai bukti.",
            ],
          },
          {
            phase: "Merefleksi",
            principle: "Berkesadaran",
            durationMinutes: 10,
            teacherActivities: [
              "Memfasilitasi 2–3 murid mendemonstrasikan di depan kelas alasan mengapa 1/2 lebih besar daripada 1/4 meskipun angka 2 lebih kecil dari 4.",
              "Meluruskan apabila masih terdapat miskonsepsi membandingkan angka penyebut tanpa melihat luas daerah utuhnya.",
            ],
            studentActivities: [
              "Menjelaskan kesimpulan dengan bahasa sendiri menggunakan pita pecahan sebagai bukti konkret.",
              "Menuliskan satu pemahaman baru dan satu hal yang masih ingin ditanyakan pada kolom refleksi diri LKPD.",
            ],
          },
        ],
        kegiatanPenutup: [
          "Sintesis & Kesimpulan Bersama (3 menit): Guru bersama murid menyimpulkan aturan inti perbandingan pecahan (semakin besar penyebut pada pembilang satu, semakin kecil ukurannya) serta konsep pecahan senilai (1/2 = 2/4 = 4/8).",
          "Umpan Balik Apresiatif (2 menit): Guru memberi pujian atas ketelitian melipat kertas, keberanian berpendapat, dan sikap adil saat bekerja sama.",
          "Cek Pemahaman Akhir / Exit Ticket (3 menit): Murid menjawab cepat secara tertulis perbandingan antara 1/3 dan 1/6 beserta alasannya.",
          "Tindak Lanjut & Penutup (2 menit): Guru mengajak murid mengamati pembagian buah/kue bersama keluarga di rumah, menyampaikan materi pertemuan berikutnya (penjumlahan pecahan berpenyebut sama), lalu menutup dengan doa dan salam.",
        ],
      },
      asesmen: {
        asesmenAwal: "Tanya jawab lisan cepat menebak nilai pecahan dari gambar lingkaran yang diarsir.",
        asesmenFormatif: "Keakuratan murid dalam melipat dan menandai pita pecahan serta ketepatan simbol <, >, atau =.",
        asesmenSumatif: "Latihan mandiri 4 soal cerita membandingkan dan mengurutkan pecahan pada akhir LKPD.",
        rubrikPenilaian: [
          {
            criterion: "Ketepatan Membandingkan Pecahan",
            excellent: "Membandingkan pecahan dengan tepat dan mampu menjelaskan alasannya dengan model gambar.",
            good: "Membandingkan pecahan dengan tepat menggunakan tanda <, >, = namun penjelasan lisan masih singkat.",
            developing: "Masih sesekali tertukar saat membandingkan pecahan dengan pembilang berbeda.",
            needsSupport: "Masih membutuhkan pendampingan alat peraga kertas lipat secara penuh.",
          },
        ],
      },
      lkpd: {
        judulLkpd: "Petualangan Pita Pecahan: Siapa yang Mendapat Bagian Terbesar?",
        tujuanLkpd: "Menemukan cara membandingkan pecahan dan mengenali pecahan senilai menggunakan lipatan kertas.",
        petunjukBelajar: [
          "Siapkan 3 lembar kertas lipat berukuran sama, gunting tumpul, dan pensil warna.",
          "Lipat kertas dengan rapi sehingga setiap bagian berukuran sama besar.",
        ],
        alatDanBahan: ["3 lembar kertas origami persegi panjang", "Pensil warna", "Lem kertas"],
        aktivitas: [
          {
            stepNumber: 1,
            title: "Tempel dan Bandingkan Pita Pecahan",
            instruction:
              "Bandingkan kertas arsir 1/2, 2/4, dan 1/4 yang sudah kamu buat, lalu jawab pertanyaan berikut.",
            promptQuestions: [
              "Manakah yang lebih besar ukurannya: 1/2 atau 1/4? Berikan tanda <, >, atau = di antara 1/2 ... 1/4!",
              "Bagaimana ukuran bagian arsir 1/2 dibandingkan dengan 2/4? Apa kesimpulanmu?",
            ],
            answerLines: 2,
          },
        ],
        refleksiSiswa: [
          "Apakah kamu sudah yakin membedakan pecahan mana yang lebih besar tanpa tertipu angka bawahnya?",
        ],
      },
    },
    {
      id: "modul-kimia-hijau-e",
      ownerId: "shared-demo",
      createdAt: now,
      updatedAt: now,
      identitas: {
        judulModul: "Prinsip Kimia Hijau dalam Pengolahan Limbah Rumah Tangga",
        penyusun: "Yahya, S.Pd.I",
        sekolah: "SMA Negeri 2 Sleman",
        tahunAjaran: "2026/2027",
        jenjang: "SMA/MA",
        fase: "Fase E",
        kelas: "Kelas 10",
        mataPelajaran: "Kimia",
        topik: "Kimia Hijau (Green Chemistry) dalam Pembangunan Berkelanjutan 2030",
        alokasiWaktu: "3 JP (135 menit)",
        jumlahPertemuan: 1,
        modelPembelajaran: "Project Based Learning (PjBL)",
      },
      identifikasi: {
        kesiapanMurid:
          "Murid telah mengenal perubahan fisika dan kimia sederhana di SMP/MTs, namun perlu menghubungkan reaksi kimia sehari-hari dengan dampak ekologis dan 12 prinsip Kimia Hijau.",
        karakteristikMateri:
          "Materi kontekstual berbasis isu lingkungan yang memadukan literasi sains, analisis data limbah domestik, serta perancangan produk pembersih ramah lingkungan (eco-enzyme).",
        dimensiProfilLulusan: ["Penalaran Kritis", "Kreativitas", "Kolaborasi", "Kewargaan"],
      },
      desainPembelajaran: {
        capaianPembelajaran:
          "Peserta didik mampu mengamati, menyelidiki, dan menjelaskan fenomena kimia dalam kehidupan sehari-hari sesuai prinsip kimia hijau serta menerapkannya untuk mendukung pembangunan berkelanjutan.",
        tujuanPembelajaran: [
          "Mengidentifikasi pelanggaran prinsip kimia hijau pada penggunaan bahan kimia rumah tangga di sekitar.",
          "Merancang proyek pembuatan cairan pembersih ramah lingkungan berbasis fermentasi kulit buah (eco-enzyme).",
          "Mengevaluasi efektivitas produk ramah lingkungan berdasarkan indikator keasaman dan dampaknya terhadap ekosistem air.",
        ],
        pemahamanBermakna:
          "Ilmu kimia bukan sumber pencemaran jika dirancang sejak awal untuk mencegah limbah dan memakai bahan baku terbarukan.",
        pertanyaanPemantik: [
          "Ke mana perginya busa deterjen dan pemutih pakaian setelah masuk ke saluran air rumah kita?",
          "Bagaimana limbah kulit buah di dapur dapat diubah menjadi pengganti cairan pembersih kimia sintetis?",
        ],
        praktikPedagogis:
          "Project Based Learning dengan pendekatan Pembelajaran Mendalam yang mendorong kepedulian lingkungan (Berkesadaran), analisis kimia nyata (Bermakna), dan kolaborasi produksi kreatif (Menggembirakan).",
        kemitraanPembelajaran:
          "Kolaborasi dengan bank sampah sekolah / komunitas penggiat lingkungan sekitar.",
        lingkunganBelajar:
          "Laboratorium kimia dan ruang proyek terbuka untuk persiapan bahan organik dan pengujian pH.",
        pemanfaatanDigital:
          "Pembuatan infografis kampanye kimia hijau dan pencatatan data pengamatan fermentasi pada lembar kerja digital.",
      },
      pengalamanBelajar: {
        kegiatanAwal: [
          "Orientasi & Kesadaran Penuh (Berkesadaran · 3 menit): Guru memberi salam, mengajak berdoa, mengecek kehadiran serta kondisi kesiapan belajar murid, lalu memandu observasi hening singkat melihat foto perbandingan kondisi sungai bersih dan sungai berbusa deterjen.",
          "Apersepsi Kontekstual (Bermakna · 4 menit): Guru menggali pemahaman awal murid mengenai reaksi kimia dalam kehidupan sehari-hari dan menanyakan produk pembersih yang biasa dipakai keluarga di rumah.",
          "Motivasi & Pertanyaan Pemantik (Menggembirakan · 3 menit): Guru mengajukan pertanyaan pemantik tentang ke mana perginya busa deterjen rumah tangga dan bagaimana kulit buah sisa dapur dapat diolah menjadi cairan pembersih ramah lingkungan.",
          "Asesmen Diagnostik Awal Singkat (3 menit): Survei cepat 3 pertanyaan mengenai pengetahuan awal bahan kimia aman vs berisiko pencemaran air.",
          "Penyampaian Tujuan, Alur Proyek & Kesepakatan Belajar (2 menit): Guru menyampaikan tujuan pembelajaran Kimia Hijau, tahapan proyek pembuatan eco-enzyme dalam kelompok, serta kesepakatan keselamatan kerja laboratorium.",
        ],
        kegiatanInti: [
          {
            phase: "Memahami",
            principle: "Berkesadaran & Bermakna",
            durationMinutes: 35,
            teacherActivities: [
              "Menjelaskan konsep 12 Prinsip Kimia Hijau dengan fokus pada pencegahan limbah, bahan baku terbarukan, dan desain bahan mudah terurai.",
              "Membagikan kartu studi kasus label kemasan produk pembersih rumah tangga untuk diaudit oleh tiap kelompok.",
              "Membimbing murid menghubungkan temuan bahan aktif sintetis pada label produk dengan risiko eutrofikasi dan pencemaran perairan.",
            ],
            studentActivities: [
              "Membaca teliti komposisi kimia pada label produk pembersih dan memetakan potensi bahayanya terhadap ekosistem air.",
              "Merumuskan prinsip kimia hijau mana yang dilanggar dan prinsip apa yang relevan sebagai alternatif solusi.",
              "Menyusun peta konsep keterkaitan pencegahan limbah kimia rumah tangga dengan pelestarian lingkungan.",
            ],
          },
          {
            phase: "Mengaplikasi",
            principle: "Bermakna & Menggembirakan",
            durationMinutes: 50,
            teacherActivities: [
              "Membimbing tiap kelompok menghitung rasio komposisi pembuatan eco-enzyme 1 : 3 : 10 (gula merah : limbah kulit buah : air bersih) sesuai kapasitas wadah.",
              "Memantau ketepatan penimbangan massa, pengukuran volume, ruang kosong wadah untuk gas fermentasi, dan uji pH awal.",
              "Memberikan scaffolding teknis mengenai jadwal pelepasan gas pada minggu pertama fermentasi agar aman.",
            ],
            studentActivities: [
              "Menimbang bahan organik secara kolaboratif dan teliti, mencampurkan larutan ke dalam botol bermulut lebar, lalu mengukur pH awal.",
              "Menempelkan label identitas, tanggal mulai, serta menyusun jadwal observasi pelepasan gas dan perubahan aroma selama masa fermentasi.",
              "Merancang draf infografis kampanye pengurangan limbah kimia rumah tangga untuk dipublikasikan di lingkungan sekolah.",
            ],
          },
          {
            phase: "Merefleksi",
            principle: "Berkesadaran",
            durationMinutes: 20,
            teacherActivities: [
              "Memfasilitasi presentasi singkat rancangan proyek dan hasil audit label bahan kimia tiap kelompok.",
              "Memberikan umpan balik ilmiah mengenai ketepatan rasio bahan, keselamatan fermentasi, dan kualitas argumen Kimia Hijau.",
            ],
            studentActivities: [
              "Menyampaikan alasan ilmiah pemilihan komposisi bahan proyek dan menanggapi masukan dari kelompok lain.",
              "Merefleksikan kebiasaan konsumsi produk kimia di rumah serta menuliskan satu aksi nyata ramah lingkungan keluarga.",
            ],
          },
        ],
        kegiatanPenutup: [
          "Sintesis & Kesimpulan Bersama (5 menit): Guru dan murid menyimpulkan hubungan langsung 12 Prinsip Kimia Hijau dengan agenda Pembangunan Berkelanjutan (SDGs 2030).",
          "Umpan Balik Apresiatif (4 menit): Guru mengapresiasi ketelitian kerja laboratorium, kreativitas solusi, dan kepedulian ekologis tiap kelompok.",
          "Cek Pemahaman Akhir / Exit Ticket (3 menit): Murid menuliskan 2 prinsip Kimia Hijau yang paling relevan diterapkan pada proyek eco-enzyme.",
          "Tindak Lanjut & Penutup (3 menit): Guru mengingatkan jadwal pemantauan botol fermentasi pada pekan pertama, menyampaikan materi pertemuan berikutnya, doa, dan salam.",
        ],
      },
      asesmen: {
        asesmenAwal: "Survei cepat 3 pertanyaan mengenai pengetahuan awal bahan kimia aman vs berbahaya.",
        asesmenFormatif: "Observasi ketepatan rasio bahan proyek eco-enzyme dan analisis label produk.",
        asesmenSumatif: "Laporan rancangan proyek kimia hijau beserta soal uraian analisis prinsip kimia hijau.",
        rubrikPenilaian: [
          {
            criterion: "Analisis Prinsip Kimia Hijau",
            excellent: "Mengaitkan minimal 3 prinsip kimia hijau dengan bukti dampak lingkungan secara akurat.",
            good: "Mengaitkan 2 prinsip kimia hijau dengan penjelasan cukup tepat.",
            developing: "Menyebutkan prinsip secara umum tanpa analisis dampak konkret.",
            needsSupport: "Memerlukan bimbingan untuk mengenali konsep pencegahan limbah kimia.",
          },
          {
            criterion: "Perencanaan Proyek Eco-Enzyme",
            excellent: "Rasio bahan tepat (1:3:10), prosedur aman, dan jadwal pemantauan lengkap.",
            good: "Rasio bahan tepat namun catatan jadwal pemantauan masih ringkas.",
            developing: "Masih terdapat kekeliruan kecil dalam penimbangan rasio bahan.",
            needsSupport: "Memerlukan pendampingan penuh dalam menyiapkan bahan dan takaran.",
          },
        ],
      },
      lkpd: {
        judulLkpd: "Proyek Kimia Hijau: Merancang Pengganti Pembersih Kimia dari Limbah Organik",
        tujuanLkpd:
          "Menganalisis dampak bahan kimia rumah tangga dan merancang produk eco-enzyme sesuai prinsip kimia hijau.",
        petunjukBelajar: [
          "Bekerjalah dalam kelompok beranggotakan 4 siswa dengan pembagian tugas penimbang, pencatat, dan pengamat.",
          "Pastikan wadah plastik yang digunakan bersih dan tidak mudah pecah oleh tekanan gas fermentasi.",
        ],
        alatDanBahan: [
          "Botol plastik bermulut lebar kapasitas 1,5 liter",
          "Timbangan digital, gelas ukur, dan corong",
          "Limbah kulit buah segar (300 g), gula merah/molase (100 g), dan air bersih (1 liter)",
        ],
        aktivitas: [
          {
            stepNumber: 1,
            title: "Audit Bahan Kimia Rumah Tangga",
            instruction: "Amati dua produk pembersih yang sering dipakai di rumah, lalu identifikasi potensi dampaknya.",
            promptQuestions: [
              "Sebutkan bahan aktif pada produk pembersih tersebut dan jelaskan mengapa pembuangan langsungnya berisiko bagi ekosistem air!",
            ],
            answerLines: 3,
          },
          {
            stepNumber: 2,
            title: "Perancangan & Pencatatan Rasio Eco-Enzyme",
            instruction: "Hitung takaran bahan sesuai kapasitas botol kelompokmu dan catat kondisi awal larutan.",
            promptQuestions: [
              "Mengapa wadah tidak boleh diisi penuh hingga 100% dan perlu dibuka berkala pada minggu pertama fermentasi?",
            ],
            answerLines: 3,
          },
        ],
        refleksiSiswa: [
          "Perubahan kecil apa yang paling mudah kamu terapkan di rumah untuk mendukung prinsip Kimia Hijau?",
        ],
      },
      lampiran: {
        bahanBacaan: {
          ringkasanMateri:
            "Kimia Hijau (Green Chemistry) adalah pendekatan perancangan produk dan proses kimia untuk mengurangi atau menghilangkan penggunaan serta pembentukan zat berbahaya. Diperkenalkan oleh Paul Anastas dan John Warner melalui 12 Prinsip Kimia Hijau, fokus utamanya adalah mencegah timbulnya limbah sejak awal, menggunakan bahan baku terbarukan, dan merancang produk yang mudah terurai secara hayati.",
          poinKonsepKunci: [
            "Prinsip 1 (Pencegahan Limbah): Lebih baik mencegah limbah terbentuk daripada mengolahnya setelah terjadi.",
            "Prinsip 7 (Bahan Baku Terbarukan): Memanfaatkan limbah organik kulit buah sebagai substrat fermentasi.",
            "Prinsip 10 (Desain Produk Mudah Terurai): Produk pembersih alami tidak meninggalkan residu toksik di perairan.",
          ],
          sumberReferensiGuru:
            "Buku Panduan Guru Kimia SMA/MA Kelas X Kurikulum Merdeka (Kemendikbudristek) & Panduan Praktik Eco-Enzyme Nusantara.",
        },
        mediaPembelajaran: {
          daftarMediaAlat: [
            "Contoh kemasan produk pembersih rumah tangga (deterjen, karbol)",
            "Set alat timbang, gelas ukur, dan botol fermentasi 1,5 L",
            "Indikator pH universal untuk uji awal larutan",
          ],
          panduanPenggunaan:
            "Kemasan produk digunakan pada tahap Memahami untuk membaca komposisi bahan aktif, sedangkan set botol fermentasi digunakan pada tahap Mengaplikasi.",
        },
        instrumenAsesmen: {
          petunjukPengerjaan:
            "Jawablah soal analisis berikut dengan mengaitkan 12 Prinsip Kimia Hijau.",
          daftarSoal: [
            {
              nomor: 1,
              indikator: "Mengidentifikasi penerapan prinsip kimia hijau dalam kehidupan sehari-hari",
              levelKognitif: "C4 (Menganalisis)",
              pertanyaan:
                "Sebuah pabrik tekstil mengganti pelarut organik beracun dengan air daur ulang bersuhu ruang. Prinsip Kimia Hijau mana saja yang diterapkan?",
              kunciJawaban:
                "Prinsip penggunaan pelarut yang lebih aman, efisiensi energi (suhu ruang), serta pencegahan limbah berbahaya.",
            },
            {
              nomor: 2,
              indikator: "Mengevaluasi proses pembuatan eco-enzyme",
              levelKognitif: "C5 (Mengevaluasi)",
              pertanyaan:
                "Mengapa gula pasir putih tidak dianjurkan dalam pembuatan eco-enzyme dibandingkan gula merah atau molase?",
              kunciJawaban:
                "Gula merah/molase mengandung mineral alami yang dibutuhkan mikroorganisme fermentasi serta proses pembuatannya lebih minim pemutihan kimia.",
            },
          ],
        },
        pedomanPenskoran: {
          rumusNilai: "Nilai Akhir = (Skor Perolehan / Skor Maksimal) × 100",
          kriteriaKetuntasan:
            "Murid mencapai ketuntasan minimal apabila meraih skor ≥ 75 (Kategori Cakap).",
          catatanTindakLanjut:
            "Kelompok yang belum tepat rasionya melakukan koreksi takaran bersama guru sebelum tahap penyimpanan.",
        },
        pengayaanRemedial: {
          programPengayaan: [
            "Menguji efektivitas eco-enzyme terhadap noda minyak dan mengukur perubahan pH pada minggu ke-2 dan ke-4.",
          ],
          programRemedial: [
            "Pendampingan memetakan perbedaan kimia konvensional vs kimia hijau melalui bagan perbandingan sederhana.",
          ],
        },
        lembarRefleksi: {
          refleksiGuru: [
            "Apakah murid mampu membaca label bahan kimia secara kritis dan menghubungkannya dengan dampak perairan?",
            "Kendala teknis apa yang muncul saat penimbangan dan pencampuran bahan proyek?",
          ],
          refleksiPesertaDidik: [
            "Prinsip kimia hijau mana yang menurutmu paling mendesak diterapkan di lingkungan rumahmu?",
          ],
        },
        glosariumDanPustaka: {
          glosarium: [
            {
              istilah: "Kimia Hijau",
              definisi:
                "Cabang perancangan proses kimia yang meminimalkan penggunaan dan pembentukan zat berbahaya bagi manusia serta lingkungan.",
            },
            {
              istilah: "Eco-Enzyme",
              definisi:
                "Larutan hasil fermentasi limbah organik buah/sayur, gula, dan air yang menghasilkan asam organik pembersih alami.",
            },
          ],
          daftarPustaka: [
            "Puspaningsih, A. R., dkk. (2021). Ilmu Pengetahuan Alam untuk SMA Kelas X. Jakarta: Kemendikbudristek.",
            "Anastas, P. T., & Warner, J. C. (1998). Green Chemistry: Theory and Practice. Oxford University Press.",
          ],
        },
      },
    },
    {
      id: "modul-smk-k3lh-e",
      ownerId: "shared-demo",
      createdAt: now,
      updatedAt: now,
      identitas: {
        judulModul: "Penerapan K3LH dan Budaya Kerja 5R di Bengkel / Ruang Praktik",
        penyusun: "Yahya, S.Pd.I",
        sekolah: "SMK Negeri 2 Yogyakarta",
        tahunAjaran: "2026/2027",
        jenjang: "SMK/MAK",
        fase: "Fase E",
        kelas: "Kelas 10",
        mataPelajaran: "Dasar-Dasar Program Keahlian",
        topik: "Penerapan Keselamatan dan Kesehatan Kerja Lingkungan Hidup (K3LH) dan Budaya 5R",
        alokasiWaktu: "4 JP (180 menit)",
        jumlahPertemuan: 1,
        modelPembelajaran: "Problem Based Learning (PBL)",
      },
      identifikasi: {
        kesiapanMurid:
          "Murid kelas 10 baru memasuki bengkel/laboratorium keahlian sehingga membutuhkan pembiasaan standar keselamatan industri sebelum mengoperasikan alat praktik.",
        karakteristikMateri:
          "Kompetensi esensial vokasi yang memadukan identifikasi bahaya (hazard), penggunaan Alat Pelindung Diri (APD), rambu K3, serta penataan tempat kerja berbasis budaya 5R (Ringkas, Rapi, Resik, Rawat, Rajin).",
        dimensiProfilLulusan: ["Kemandirian", "Penalaran Kritis", "Kolaborasi", "Kesehatan"],
      },
      desainPembelajaran: {
        capaianPembelajaran:
          "Pada akhir fase E, peserta didik mampu menerapkan K3LH dan budaya kerja industri, antara lain: praktik-praktik kerja yang aman, bahaya-bahaya di tempat kerja, prosedur-prosedur dalam keadaan darurat, dan penerapan budaya kerja industri (5R).",
        tujuanPembelajaran: [
          "Mengidentifikasi potensi bahaya fisik, kimia, dan ergonomi di lingkungan bengkel/ruang praktik keahlian.",
          "Menentukan jenis Alat Pelindung Diri (APD) dan rambu keselamatan yang tepat sesuai skenario pekerjaan industri.",
          "Menyusun rencana inspeksi dan perbaikan area kerja berbasis prinsip 5R (Ringkas, Rapi, Resik, Rawat, Rajin).",
        ],
        pemahamanBermakna:
          "Keselamatan kerja dan kerapian ruang praktik bukan sekadar aturan sekolah, melainkan fondasi profesionalisme yang melindungi nyawa dan menjamin mutu hasil produksi di industri.",
        pertanyaanPemantik: [
          "Mengapa banyak kecelakaan kerja di bengkel justru berawal dari kabel berserakan atau keengganan memakai kacamata pelindung selama lima menit?",
          "Bagaimana kondisi meja praktik yang berantakan memengaruhi kecepatan dan keselamatan teknisi saat bekerja?",
        ],
        praktikPedagogis:
          "Problem Based Learning berbasis inspeksi bengkel nyata yang membangun kesadaran keselamatan diri (Berkesadaran), kesiapan menghadapi standar industri DUDI (Bermakna), dan simulasi tim audit keselamatan (Menggembirakan).",
        kemitraanPembelajaran:
          "Mengacu pada standar SOP keselamatan mitra DUDI / instruktur bengkel keahlian.",
        lingkunganBelajar:
          "Ruang praktik/bengkel keahlian yang dilengkapi rambu K3, APAR, kotak P3K, dan stasiun APD.",
        pemanfaatanDigital:
          "Pemotretan temuan kondisi tidak aman (unsafe condition) di area praktik dan penyusunan daftar periksa inspeksi K3LH.",
      },
      pengalamanBelajar: {
        kegiatanAwal: [
          "Orientasi & Safety Briefing Penuh Kesadaran (Berkesadaran · 4 menit): Guru membuka pembelajaran dengan salam, doa bersama, pemeriksaan kehadiran dan kelengkapan pakaian praktik, serta safety briefing singkat ala industri untuk menumbuhkan kewaspadaan kerja.",
          "Apersepsi Kontekstual (Bermakna · 3 menit): Guru menanyakan pengalaman murid melihat rambu keselamatan di jalan raya, bengkel, atau tempat umum dan dampaknya bila diabaikan.",
          "Motivasi & Pertanyaan Pemantik (Menggembirakan · 3 menit): Guru mengajukan pertanyaan pemantik mengapa banyak insiden kerja justru berawal dari kabel berserakan atau keengganan memakai pelindung mata selama lima menit.",
          "Asesmen Diagnostik Awal Singkat (3 menit): Kuis cepat mengenali arti 4 warna rambu K3 (merah, kuning, biru, hijau) untuk memetakan kesiapan awal murid.",
          "Penyampaian Tujuan, Alur Inspeksi & Kesepakatan K3 (2 menit): Guru menjelaskan tujuan kompetensi K3LH dan budaya 5R, alur simulasi Tim Audit Bengkel, serta larangan menyalakan mesin tanpa izin instruktur.",
        ],
        kegiatanInti: [
          {
            phase: "Memahami",
            principle: "Berkesadaran & Bermakna",
            durationMinutes: 45,
            teacherActivities: [
              "Memaparkan klasifikasi bahaya kerja (fisik, kimia, listrik, ergonomi), hierarki pengendalian bahaya, jenis APD wajib, serta makna budaya kerja 5R.",
              "Menunjukkan contoh kartu inspeksi K3LH standar industri (DUDI) dan cara mengidentifikasi potensi bahaya.",
              "Membimbing murid membedakan tindakan tidak aman (unsafe act) dan kondisi tidak aman (unsafe condition) melalui contoh skenario bengkel.",
            ],
            studentActivities: [
              "Mencocokkan berbagai skenario pekerjaan bengkel keahlian dengan jenis APD wajib dan rambu K3 yang sesuai.",
              "Mengidentifikasi contoh tindakan tidak aman vs kondisi tidak aman dalam kelompok berpasangan.",
              "Mencatat indikator penilaian kelayakan area kerja berbasis Ringkas, Rapi, Resik, Rawat, dan Rajin (5R).",
            ],
          },
          {
            phase: "Mengaplikasi",
            principle: "Bermakna & Menggembirakan",
            durationMinutes: 75,
            teacherActivities: [
              "Menugaskan tiap kelompok berperan sebagai Tim Audit K3LH untuk menginspeksi zona bengkel/ruang praktik yang telah ditentukan.",
              "Mendampingi kelompok mengisi LKPD Audit Potensi Bahaya serta membimbing penyusunan rencana aksi penataan 5R yang realistis.",
              "Memastikan seluruh murid mengenakan pakaian praktik rapi dan mematuhi batas zona aman selama observasi lapangan.",
            ],
            studentActivities: [
              "Mengamati area praktik secara sistematis, mendokumentasikan minimal 3 temuan potensi bahaya atau ketidaktertiban alat.",
              "Menentukan APD, pengendalian teknis/administratif, dan prosedur tanggap darurat ringan untuk setiap temuan.",
              "Merumuskan langkah konkret perbaikan 5R (Ringkas–Rapi–Resik–Rawat–Rajin) di zona praktik kelompok masing-masing.",
            ],
          },
          {
            phase: "Merefleksi",
            principle: "Berkesadaran",
            durationMinutes: 30,
            teacherActivities: [
              "Memandu presentasi hasil inspeksi antar-tim dan memfasilitasi penyusunan Piagam Komitmen Keselamatan Kelas.",
              "Memberikan umpan balik penguatan atas ketajaman analisis bahaya serta kepraktisan rencana aksi 5R tiap kelompok.",
            ],
            studentActivities: [
              "Mempresentasikan temuan audit K3LH dan rekomendasi penataan area kerja di hadapan kelas.",
              "Menuliskan kebiasaan keselamatan pribadi yang sebelumnya sering disepelekan dan berkomitmen menjaganya di setiap jam praktik.",
            ],
          },
        ],
        kegiatanPenutup: [
          "Sintesis & Kesimpulan Bersama (5 menit): Guru bersama murid merangkum keterkaitan disiplin K3LH dan budaya kerja 5R dengan kesiapan kerja serta standar profesionalisme industri (DUDI).",
          "Umpan Balik Apresiatif (4 menit): Guru memberikan apresiasi kepada tim audit paling teliti dan disiplin selama observasi bengkel.",
          "Cek Pemahaman Akhir (3 menit): Murid menyebutkan kembali urutan 5R beserta satu contoh penerapannya di meja praktik.",
          "Tindak Lanjut & Penutup (3 menit): Guru menyampaikan agenda praktik berikutnya (uji kompetensi pemilihan APD & alat ukur), memimpin doa penutup, dan salam.",
        ],
      },
      asesmen: {
        asesmenAwal: "Kuis identifikasi 4 warna rambu K3 (larangan, peringatan, kewajiban, darurat).",
        asesmenFormatif: "Ketepatan hasil observasi audit potensi bahaya pada LKPD di area bengkel.",
        asesmenSumatif: "Uji praktik pemilihan APD sesuai skenario kerja dan soal evaluasi prosedur K3LH.",
        rubrikPenilaian: [
          {
            criterion: "Ketepatan Identifikasi Bahaya & APD",
            excellent: "Mengidentifikasi seluruh potensi bahaya utama dan menentukan APD + alasan teknisnya dengan tepat.",
            good: "Mengidentifikasi sebagian besar bahaya dan menentukan APD yang sesuai.",
            developing: "Masih melewatkan bahaya tersembunyi atau tertukar fungsi APD tertentu.",
            needsSupport: "Memerlukan bimbingan langsung mengenali jenis bahaya dan fungsi dasar APD.",
          },
          {
            criterion: "Penerapan Konsep Budaya Kerja 5R",
            excellent: "Menyusun rencana perbaikan Ringkas–Rapi–Resik–Rawat–Rajin yang operasional dan realistis.",
            good: "Menyusun rencana 5R dengan baik namun tahap Rawat dan Rajin masih umum.",
            developing: "Baru mampu menguraikan aspek kebersihan (Resik) secara sederhana.",
            needsSupport: "Belum dapat membedakan tahapan 5R secara runtut.",
          },
        ],
      },
      lkpd: {
        judulLkpd: "Audit K3LH & Budaya Kerja 5R di Area Praktik Keahlian",
        tujuanLkpd:
          "Melatih kepekaan murid dalam menemukan potensi bahaya kerja, memilih APD yang tepat, dan merancang penataan 5R.",
        petunjukBelajar: [
          "Kenakan pakaian praktik yang rapi dan sepatu tertutup sebelum memasuki area observasi bengkel.",
          "Jangan menyalakan mesin atau peralatan tanpa seizin guru/instruktur bengkel.",
        ],
        alatDanBahan: [
          "Papan jalan (clipboard) dan LKPD cetak",
          "Contoh APD bengkel (helm keselamatan, kacamata safety, sarung tangan, masker)",
          "Denah sederhana ruang praktik keahlian",
        ],
        aktivitas: [
          {
            stepNumber: 1,
            title: "Inspeksi Potensi Bahaya Area Kerja",
            instruction:
              "Amati zona praktik yang ditugaskan kepada kelompokmu, lalu catat kondisi yang berpotensi menimbulkan kecelakaan.",
            promptQuestions: [
              "Tuliskan 3 potensi bahaya yang ditemukan (fisik/listrik/ergonomi) beserta tindakan pencegahannya!",
            ],
            answerLines: 3,
          },
          {
            stepNumber: 2,
            title: "Rancangan Perbaikan Budaya 5R",
            instruction:
              "Susun usulan penataan ruang praktik agar lebih efisien dan aman mengikuti prinsip Ringkas, Rapi, Resik, Rawat, dan Rajin.",
            promptQuestions: [
              "Langkah konkret apa pada tahap Ringkas dan Rapi yang dapat langsung dikerjakan kelompokmu hari ini?",
            ],
            answerLines: 3,
          },
        ],
        refleksiSiswa: [
          "Kebiasaan kecil apa di ruang praktik yang sebelumnya kamu anggap sepele namun ternyata berisiko bagi keselamatan?",
        ],
      },
      lampiran: {
        bahanBacaan: {
          ringkasanMateri:
            "K3LH (Keselamatan dan Kesehatan Kerja serta Lingkungan Hidup) bertujuan melindungi tenaga kerja dan peserta didik dari risiko kecelakaan kerja serta penyakit akibat kerja. Di dunia industri modern, K3LH dipadukan dengan budaya kerja 5R (Ringkas, Rapi, Resik, Rawat, Rajin) untuk menciptakan area kerja yang aman, tertib, dan produktif.",
          poinKonsepKunci: [
            "Hierarki Pengendalian Bahaya: Eliminasi, Substitusi, Rekayasa Teknik, Administrasi, dan APD.",
            "Makna Warna Rambu K3: Merah (Larangan/APAR), Kuning (Peringatan), Biru (Kewajiban APD), Hijau (Jalur Evakuasi/P3K).",
            "Budaya 5R: Ringkas (pisahkan barang perlu/tidak), Rapi (beri tempat dan label), Resik (bersihkan rutin), Rawat (standarisasi), Rajin (disiplin berkelanjutan).",
          ],
          sumberReferensiGuru:
            "Buku Dasar-Dasar Program Keahlian SMK Fase E (Kemendikbudristek) & UU No. 1 Tahun 1970 tentang Keselamatan Kerja.",
        },
        mediaPembelajaran: {
          daftarMediaAlat: [
            "Poster rambu-rambu K3 dan jalur evakuasi bengkel",
            "Perangkat APD standar (safety goggles, ear muff, gloves, safety shoes)",
            "APAR (Alat Pemadam Api Ringan) dan Kotak P3K sebagai media pengenalan tanggap darurat",
          ],
          panduanPenggunaan:
            "APD diperagakan langsung oleh murid di depan kelas saat fase Memahami, sedangkan area bengkel menjadi objek inspeksi pada fase Mengaplikasi.",
        },
        instrumenAsesmen: {
          petunjukPengerjaan:
            "Analisislah studi kasus kecelakaan kerja berikut dan jawab sesuai prosedur K3LH.",
          daftarSoal: [
            {
              nomor: 1,
              indikator: "Menentukan hierarki pengendalian bahaya dan APD yang tepat",
              levelKognitif: "C4 (Menganalisis)",
              pertanyaan:
                "Seorang siswa mengoperasikan mesin gerinda tanpa kacamata pelindung karena merasa pekerjaannya hanya sebentar. Jelaskan dua risiko bahaya serta pengendalian yang wajib dilakukan!",
              kunciJawaban:
                "Risiko percikan gram logam mengenai mata dan kebisingan/debu; pengendalian meliputi pemasangan pelindung mesin (guard) dan wajib memakai safety goggles serta masker.",
            },
            {
              nomor: 2,
              indikator: "Menerapkan prinsip budaya kerja 5R",
              levelKognitif: "C3 (Menerapkan)",
              pertanyaan:
                "Di meja kerja terdapat kunci pas rusak, sisa kabel bekas, dan obeng yang masih dipakai bercampur menjadi satu. Tahap 5R mana yang harus dilakukan pertama kali?",
              kunciJawaban:
                "Tahap Ringkas (Seiri): memilah dan menyingkirkan barang rusak atau tidak terpakai dari meja kerja sebelum melakukan penataan (Rapi).",
            },
          ],
        },
        pedomanPenskoran: {
          rumusNilai: "Nilai Akhir = (Jumlah Skor Perolehan / Skor Maksimal) × 100",
          kriteriaKetuntasan:
            "Peserta didik dinyatakan kompeten pada elemen K3LH apabila mencapai skor minimal 75 dan tidak melakukan pelanggaran prosedur keselamatan.",
          catatanTindakLanjut:
            "Murid yang belum mencapai ketuntasan wajib mengulang simulasi pemilihan APD dan inspeksi zona aman.",
        },
        pengayaanRemedial: {
          programPengayaan: [
            "Membuat desain poster rambu K3 atau infografis alur evakuasi darurat khusus untuk bengkel jurusan masing-masing.",
          ],
          programRemedial: [
            "Latihan terbimbing mencocokkan 10 rambu keselamatan dan fungsi APD menggunakan kartu bergambar.",
          ],
        },
        lembarRefleksi: {
          refleksiGuru: [
            "Apakah seluruh murid sudah mematuhi standar pakaian dan APD selama melakukan observasi bengkel?",
            "Area praktik mana yang paling membutuhkan perbaikan penataan 5R segera?",
          ],
          refleksiPesertaDidik: [
            "Menurutmu, aspek mana dari 5R yang paling sulit dipertahankan secara konsisten di bengkel dan bagaimana solusinya?",
          ],
        },
        glosariumDanPustaka: {
          glosarium: [
            {
              istilah: "K3LH",
              definisi:
                "Keselamatan dan Kesehatan Kerja serta Lingkungan Hidup dalam aktivitas industri dan bengkel praktik.",
            },
            {
              istilah: "Budaya 5R",
              definisi:
                "Metode penataan dan pemeliharaan area kerja yang terdiri atas Ringkas, Rapi, Resik, Rawat, dan Rajin.",
            },
          ],
          daftarPustaka: [
            "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. Dasar-Dasar Program Keahlian SMK/MAK Kelas X. Jakarta: Kemendikbudristek.",
            "Peraturan Menteri Ketenagakerjaan RI tentang Standar Keselamatan dan Kesehatan Kerja di Lingkungan Kerja.",
          ],
        },
      },
    },
  ];
}

interface StoredModuleRecord {
  id: string;
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
  lampiran?: unknown;
  pengalamanBelajar?: {
    kegiatanAwal?: unknown[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

function loadModules(): StoredModuleRecord[] {
  ensureDataDir();
  const seeds = getSeedModules() as StoredModuleRecord[];
  if (!fs.existsSync(MODULES_FILE)) {
    fs.writeFileSync(MODULES_FILE, JSON.stringify(seeds, null, 2));
    return seeds;
  }

  const existing: StoredModuleRecord[] = JSON.parse(fs.readFileSync(MODULES_FILE, "utf-8"));
  let dirty = false;

  // Non-destructively ensure all 4 sample jenjang modules exist and have complete Deep Learning structure
  for (const seed of seeds) {
    const idx = existing.findIndex((m) => m.id === seed.id);
    if (idx === -1) {
      existing.push(seed);
      dirty = true;
    } else {
      const curr = existing[idx];
      let updatedRec = curr;
      let changed = false;
      if (!curr.lampiran && seed.lampiran) {
        updatedRec = { ...updatedRec, lampiran: seed.lampiran };
        changed = true;
      }
      if (
        curr.ownerId === "shared-demo" &&
        (!Array.isArray(curr.pengalamanBelajar?.kegiatanAwal) ||
          curr.pengalamanBelajar.kegiatanAwal.length < 4)
      ) {
        updatedRec = { ...updatedRec, pengalamanBelajar: seed.pengalamanBelajar };
        changed = true;
      }
      if (changed) {
        existing[idx] = updatedRec;
        dirty = true;
      }
    }
  }

  if (dirty) {
    fs.writeFileSync(MODULES_FILE, JSON.stringify(existing, null, 2));
  }
  return existing;
}

function saveModules(modules: unknown[]) {
  ensureDataDir();
  fs.writeFileSync(MODULES_FILE, JSON.stringify(modules, null, 2));
}

function loadAkademikStore(): Record<string, unknown> {
  ensureDataDir();
  if (!fs.existsSync(AKADEMIK_FILE)) {
    fs.writeFileSync(AKADEMIK_FILE, JSON.stringify({}, null, 2));
    return {};
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(AKADEMIK_FILE, "utf-8"));
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function saveAkademikStore(store: Record<string, unknown>) {
  ensureDataDir();
  fs.writeFileSync(AKADEMIK_FILE, JSON.stringify(store, null, 2));
}

const modulResponseSchema = {
  type: Type.OBJECT,
  properties: {
    identitas: {
      type: Type.OBJECT,
      properties: {
        judulModul: { type: Type.STRING },
        penyusun: { type: Type.STRING },
        sekolah: { type: Type.STRING },
        tahunAjaran: { type: Type.STRING },
        jenjang: { type: Type.STRING },
        fase: { type: Type.STRING },
        kelas: { type: Type.STRING },
        mataPelajaran: { type: Type.STRING },
        topik: { type: Type.STRING },
        alokasiWaktu: { type: Type.STRING },
        jumlahPertemuan: { type: Type.INTEGER },
        modelPembelajaran: { type: Type.STRING },
      },
      required: [
        "judulModul",
        "penyusun",
        "sekolah",
        "tahunAjaran",
        "jenjang",
        "fase",
        "kelas",
        "mataPelajaran",
        "topik",
        "alokasiWaktu",
        "jumlahPertemuan",
        "modelPembelajaran",
      ],
    },
    identifikasi: {
      type: Type.OBJECT,
      properties: {
        kesiapanMurid: { type: Type.STRING },
        karakteristikMateri: { type: Type.STRING },
        dimensiProfilLulusan: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["kesiapanMurid", "karakteristikMateri", "dimensiProfilLulusan"],
    },
    desainPembelajaran: {
      type: Type.OBJECT,
      properties: {
        capaianPembelajaran: { type: Type.STRING },
        tujuanPembelajaran: { type: Type.ARRAY, items: { type: Type.STRING } },
        pemahamanBermakna: { type: Type.STRING },
        pertanyaanPemantik: { type: Type.ARRAY, items: { type: Type.STRING } },
        praktikPedagogis: { type: Type.STRING },
        kemitraanPembelajaran: { type: Type.STRING },
        lingkunganBelajar: { type: Type.STRING },
        pemanfaatanDigital: { type: Type.STRING },
      },
      required: [
        "capaianPembelajaran",
        "tujuanPembelajaran",
        "pemahamanBermakna",
        "pertanyaanPemantik",
        "praktikPedagogis",
        "kemitraanPembelajaran",
        "lingkunganBelajar",
        "pemanfaatanDigital",
      ],
    },
    pengalamanBelajar: {
      type: Type.OBJECT,
      properties: {
        kegiatanAwal: { type: Type.ARRAY, items: { type: Type.STRING } },
        kegiatanInti: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING, description: "Memahami, Mengaplikasi, atau Merefleksi" },
              principle: {
                type: Type.STRING,
                description: "Kombinasi prinsip Berkesadaran, Bermakna, atau Menggembirakan",
              },
              durationMinutes: { type: Type.INTEGER },
              teacherActivities: { type: Type.ARRAY, items: { type: Type.STRING } },
              studentActivities: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["phase", "principle", "durationMinutes", "teacherActivities", "studentActivities"],
          },
        },
        kegiatanPenutup: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["kegiatanAwal", "kegiatanInti", "kegiatanPenutup"],
    },
    asesmen: {
      type: Type.OBJECT,
      properties: {
        asesmenAwal: { type: Type.STRING },
        asesmenFormatif: { type: Type.STRING },
        asesmenSumatif: { type: Type.STRING },
        rubrikPenilaian: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              criterion: { type: Type.STRING },
              excellent: { type: Type.STRING },
              good: { type: Type.STRING },
              developing: { type: Type.STRING },
              needsSupport: { type: Type.STRING },
            },
            required: ["criterion", "excellent", "good", "developing", "needsSupport"],
          },
        },
      },
      required: ["asesmenAwal", "asesmenFormatif", "asesmenSumatif", "rubrikPenilaian"],
    },
    lkpd: {
      type: Type.OBJECT,
      properties: {
        judulLkpd: { type: Type.STRING },
        tujuanLkpd: { type: Type.STRING },
        petunjukBelajar: { type: Type.ARRAY, items: { type: Type.STRING } },
        alatDanBahan: { type: Type.ARRAY, items: { type: Type.STRING } },
        aktivitas: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepNumber: { type: Type.INTEGER },
              title: { type: Type.STRING },
              instruction: { type: Type.STRING },
              promptQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              answerLines: { type: Type.INTEGER },
            },
            required: ["stepNumber", "title", "instruction", "promptQuestions", "answerLines"],
          },
        },
        refleksiSiswa: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["judulLkpd", "tujuanLkpd", "petunjukBelajar", "alatDanBahan", "aktivitas", "refleksiSiswa"],
    },
    lampiran: {
      type: Type.OBJECT,
      properties: {
        asesmenDiagnostik: {
          type: Type.OBJECT,
          properties: {
            tujuanDiagnostik: { type: Type.STRING },
            diagnostikNonKognitif: { type: Type.ARRAY, items: { type: Type.STRING } },
            diagnostikKognitif: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nomor: { type: Type.INTEGER },
                  pertanyaan: { type: Type.STRING },
                  tujuanPemetaan: { type: Type.STRING },
                  tindakLanjut: { type: Type.STRING },
                },
                required: ["nomor", "pertanyaan", "tujuanPemetaan", "tindakLanjut"],
              },
            },
          },
          required: ["tujuanDiagnostik", "diagnostikNonKognitif", "diagnostikKognitif"],
        },
        penilaianSikap: {
          type: Type.OBJECT,
          properties: {
            teknikPenilaian: { type: Type.STRING },
            skalaKeterangan: { type: Type.STRING },
            aspekSikap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dimensi: { type: Type.STRING },
                  indikator: { type: Type.STRING },
                  kriteriaTampak: { type: Type.STRING },
                },
                required: ["dimensi", "indikator", "kriteriaTampak"],
              },
            },
          },
          required: ["teknikPenilaian", "skalaKeterangan", "aspekSikap"],
        },
        asesmenFormatif: {
          type: Type.OBJECT,
          properties: {
            petunjukPengerjaan: { type: Type.STRING },
            daftarSoal: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nomor: { type: Type.INTEGER },
                  indikator: { type: Type.STRING },
                  levelKognitif: { type: Type.STRING },
                  pertanyaan: { type: Type.STRING },
                  kunciJawaban: { type: Type.STRING },
                },
                required: ["nomor", "indikator", "levelKognitif", "pertanyaan", "kunciJawaban"],
              },
            },
            pedomanPenskoran: {
              type: Type.OBJECT,
              properties: {
                rumusNilai: { type: Type.STRING },
                kriteriaKetuntasan: { type: Type.STRING },
                catatanTindakLanjut: { type: Type.STRING },
              },
              required: ["rumusNilai", "kriteriaKetuntasan", "catatanTindakLanjut"],
            },
          },
          required: ["petunjukPengerjaan", "daftarSoal", "pedomanPenskoran"],
        },
        bahanAjar: {
          type: Type.OBJECT,
          properties: {
            judulBahanAjar: { type: Type.STRING },
            ringkasanMateri: { type: Type.STRING },
            poinKonsepKunci: { type: Type.ARRAY, items: { type: Type.STRING } },
            sumberReferensiGuru: { type: Type.STRING },
          },
          required: ["judulBahanAjar", "ringkasanMateri", "poinKonsepKunci", "sumberReferensiGuru"],
        },
        refleksiDanUmpanBalik: {
          type: Type.OBJECT,
          properties: {
            petunjukPengisian: { type: Type.STRING },
            refleksiPesertaDidik: { type: Type.ARRAY, items: { type: Type.STRING } },
            umpanBalikPesertaDidik: { type: Type.ARRAY, items: { type: Type.STRING } },
            tindakLanjutGuru: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            "petunjukPengisian",
            "refleksiPesertaDidik",
            "umpanBalikPesertaDidik",
            "tindakLanjutGuru",
          ],
        },
        mediaAjar: {
          type: Type.OBJECT,
          properties: {
            mediaUtama: { type: Type.ARRAY, items: { type: Type.STRING } },
            alatDanBahanPendukung: { type: Type.ARRAY, items: { type: Type.STRING } },
            sumberDigital: { type: Type.STRING },
            panduanPenggunaan: { type: Type.STRING },
          },
          required: ["mediaUtama", "alatDanBahanPendukung", "sumberDigital", "panduanPenggunaan"],
        },
        kktp: {
          type: Type.OBJECT,
          properties: {
            pendekatan: { type: Type.STRING },
            kriteriaKetuntasan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  criterion: { type: Type.STRING },
                  excellent: { type: Type.STRING },
                  good: { type: Type.STRING },
                  developing: { type: Type.STRING },
                  needsSupport: { type: Type.STRING },
                },
                required: ["criterion", "excellent", "good", "developing", "needsSupport"],
              },
            },
            intervalNilai: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  rentang: { type: Type.STRING },
                  predikat: { type: Type.STRING },
                  interpretasi: { type: Type.STRING },
                  tindakLanjut: { type: Type.STRING },
                },
                required: ["rentang", "predikat", "interpretasi", "tindakLanjut"],
              },
            },
          },
          required: ["pendekatan", "kriteriaKetuntasan", "intervalNilai"],
        },
        glosariumDanPustaka: {
          type: Type.OBJECT,
          properties: {
            glosarium: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  istilah: { type: Type.STRING },
                  definisi: { type: Type.STRING },
                },
                required: ["istilah", "definisi"],
              },
            },
            daftarPustaka: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["glosarium", "daftarPustaka"],
        },
      },
      required: [
        "asesmenDiagnostik",
        "penilaianSikap",
        "asesmenFormatif",
        "bahanAjar",
        "refleksiDanUmpanBalik",
        "mediaAjar",
        "kktp",
        "glosariumDanPustaka",
      ],
    },
  },
  required: ["identitas", "identifikasi", "desainPembelajaran", "pengalamanBelajar", "asesmen", "lkpd", "lampiran"],
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "4mb" }));

  // Ensure initial admin account is initialized on startup
  loadUsers();

  // Auth routes (Login akun terdaftar; pendaftaran akun guru hanya melalui Admin; tanpa batas pemakaian)
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      res.status(400).json({ error: "Email dan password wajib diisi." });
      return;
    }

    const users = loadUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
      res.status(401).json({ error: "Email atau password salah." });
      return;
    }

    const token = signToken(user.id);
    res.json({
      token,
      user: toSafeUser(user),
    });
  });

  app.get("/api/auth/me", requireAuth, (req: AuthedRequest, res) => {
    res.json({ user: req.user });
  });

  app.post("/api/auth/change-password", requireAuth, (req: AuthedRequest, res) => {
    const { currentPassword, newPassword } = req.body ?? {};
    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      newPassword.length < 6
    ) {
      res.status(400).json({ error: "Password baru minimal 6 karakter." });
      return;
    }

    const users = loadUsers();
    const user = users.find((u) => u.id === req.user?.id);
    if (!user || !verifyPassword(currentPassword, user.salt, user.passwordHash)) {
      res.status(401).json({ error: "Password saat ini tidak sesuai." });
      return;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    user.salt = salt;
    user.passwordHash = hashPassword(newPassword, salt);
    saveUsers(users);
    res.json({ ok: true, message: "Password berhasil diperbarui." });
  });

  // Admin: Teacher Account Management
  app.get("/api/admin/users", requireAuth, requireAdmin, (_req: AuthedRequest, res) => {
    const users = loadUsers().map(toSafeUser);
    res.json({ users });
  });

  app.post("/api/admin/users", requireAuth, requireAdmin, (req: AuthedRequest, res) => {
    const { name, email, school, jabatan, password } = req.body ?? {};
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof school !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !school.trim()
    ) {
      res.status(400).json({ error: "Nama, email, sekolah, dan password guru wajib diisi." });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password guru minimal 6 karakter." });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      res.status(400).json({ error: "Format email tidak valid." });
      return;
    }

    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      res.status(409).json({ error: "Email tersebut sudah terdaftar di sistem." });
      return;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const newTeacher: StoredUser = {
      id: `guru-${crypto.randomUUID().slice(0, 8)}`,
      name: name.trim().slice(0, 120),
      email: cleanEmail,
      school: school.trim().slice(0, 160),
      role: "guru",
      jabatan:
        typeof jabatan === "string" && jabatan.trim()
          ? jabatan.trim().slice(0, 100)
          : "Guru Mata Pelajaran",
      createdAt: new Date().toISOString(),
      salt,
      passwordHash: hashPassword(password, salt),
    };

    users.push(newTeacher);
    saveUsers(users);
    res.status(201).json({ user: toSafeUser(newTeacher) });
  });

  app.patch("/api/admin/users/:id/password", requireAuth, requireAdmin, (req: AuthedRequest, res) => {
    const { id } = req.params;
    const { newPassword } = req.body ?? {};
    if (typeof newPassword !== "string" || newPassword.length < 6) {
      res.status(400).json({ error: "Password baru minimal 6 karakter." });
      return;
    }

    const users = loadUsers();
    const target = users.find((u) => u.id === id);
    if (!target) {
      res.status(404).json({ error: "Akun guru tidak ditemukan." });
      return;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    target.salt = salt;
    target.passwordHash = hashPassword(newPassword, salt);
    saveUsers(users);
    res.json({ ok: true });
  });

  app.delete("/api/admin/users/:id", requireAuth, requireAdmin, (req: AuthedRequest, res) => {
    const { id } = req.params;
    if (id === req.user?.id) {
      res.status(400).json({ error: "Akun admin aktif tidak dapat dihapus." });
      return;
    }

    const users = loadUsers();
    const target = users.find((u) => u.id === id);
    if (!target) {
      res.status(404).json({ error: "Akun tidak ditemukan." });
      return;
    }
    if (target.role === "admin") {
      res.status(400).json({ error: "Akun admin tidak dapat dihapus." });
      return;
    }

    const next = users.filter((u) => u.id !== id);
    saveUsers(next);
    res.json({ ok: true });
  });

  // Modules CRUD (protected by requireAuth)
  app.get("/api/modules", requireAuth, (req: AuthedRequest, res) => {
    const modules = loadModules();
    const userId = req.user!.id;
    const isAdmin = req.user!.role === "admin";
    const filtered = isAdmin
      ? modules
      : modules.filter((m: { ownerId: string }) => m.ownerId === "shared-demo" || m.ownerId === userId);
    res.json({ modules: filtered });
  });

  app.post("/api/modules", requireAuth, (req: AuthedRequest, res) => {
    const modul = req.body?.modul;
    if (!modul || !modul.identitas?.judulModul) {
      res.status(400).json({ error: "Data modul tidak lengkap." });
      return;
    }
    const modules = loadModules();
    const now = new Date().toISOString();
    const saved = {
      ...modul,
      id: `modul-${crypto.randomUUID().slice(0, 8)}`,
      ownerId: req.user!.id,
      createdAt: now,
      updatedAt: now,
    };
    modules.unshift(saved);
    saveModules(modules);
    res.status(201).json({ modul: saved });
  });

  app.put("/api/modules/:id", requireAuth, (req: AuthedRequest, res) => {
    const { id } = req.params;
    const modul = req.body?.modul;
    if (!modul) {
      res.status(400).json({ error: "Data pembaruan modul kosong." });
      return;
    }
    const modules = loadModules();
    const idx = modules.findIndex((m: { id: string }) => m.id === id);
    if (idx === -1) {
      res.status(404).json({ error: "Modul tidak ditemukan." });
      return;
    }

    const existing = modules[idx];
    if (existing.ownerId !== req.user!.id && req.user!.role !== "admin") {
      res.status(403).json({
        error: "Anda hanya dapat menyunting modul milik sendiri. Duplikat modul ini terlebih dahulu untuk menyunting salinannya.",
      });
      return;
    }

    const updated = {
      ...existing,
      ...modul,
      id,
      ownerId: existing.ownerId,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };
    modules[idx] = updated;
    saveModules(modules);
    res.json({ modul: updated });
  });

  app.delete("/api/modules/:id", requireAuth, (req: AuthedRequest, res) => {
    const { id } = req.params;
    const modules = loadModules();
    const target = modules.find((m: { id: string }) => m.id === id);
    if (!target) {
      res.status(404).json({ error: "Modul tidak ditemukan." });
      return;
    }
    if (target.ownerId !== req.user!.id && req.user!.role !== "admin") {
      res.status(403).json({ error: "Hanya pemilik modul atau admin yang dapat menghapus modul ini." });
      return;
    }

    const next = modules.filter((m: { id: string }) => m.id !== id);
    saveModules(next);
    res.json({ ok: true });
  });

  // Gemini AI Modul Ajar & LKPD Generator (protected by requireAuth)
  app.post("/api/generate-modul", requireAuth, async (req: AuthedRequest, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      res.status(500).json({
        error: "GEMINI_API_KEY belum dikonfigurasi pada panel Secrets aplikasi.",
      });
      return;
    }

    const input = req.body;
    if (!input?.mataPelajaran || !input?.topik || !input?.jenjang) {
      res.status(400).json({ error: "Jenjang, mata pelajaran, dan topik materi wajib diisi." });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const minutesPerJp = input.jenjang === "SD/MI" ? 35 : input.jenjang === "SMP/MTs" ? 40 : 45;
      const totalMinutes = Number(input.jp || 2) * minutesPerJp;

      const systemInstruction = `Anda adalah pakar kurikulum pendidikan Indonesia dan penyusun perangkat ajar Kurikulum Merdeka berbasis Pendekatan Pembelajaran Mendalam (Deep Learning: Berkesadaran/Mindful, Bermakna/Meaningful, Menggembirakan/Joyful).
Susunlah Modul Ajar dan LKPD yang sangat terstruktur, operasional, siap pakai guru di kelas nyata, menggunakan Bahasa Indonesia baku dan pedagogis yang jelas.
Wajib menyusun pengalamanBelajar secara lengkap mengikuti kerangka Pembelajaran Mendalam (Deep Learning):
A. kegiatanAwal (Pendahuluan — wajib tepat 5 langkah berturut-turut dengan label prinsip & durasi menit yang proporsional):
   1. Orientasi & Kesadaran Penuh (Berkesadaran/Mindful): salam hangat, doa bersama, cek kehadiran, check-in kondisi emosional/kesiapan murid, serta teknik fokus singkat.
   2. Apersepsi Kontekstual (Bermakna/Meaningful): mengaitkan materi prasyarat atau pengalaman nyata sehari-hari murid dengan topik yang akan dipelajari.
   3. Motivasi & Pertanyaan Pemantik (Menggembirakan/Joyful): aktivitas pemantik kreatif (gambar/video/tebak cepat/fenomena nyata) serta penyampaian manfaat materi dan pertanyaan pemantik kritis.
   4. Asesmen Diagnostik Awal Singkat: tanya jawab/kuis cepat untuk memetakan kesiapan belajar & miskonsepsi awal murid.
   5. Tujuan Pembelajaran, Alur Aktivitas & Kesepakatan Kelas: menyampaikan tujuan yang ingin dicapai, skenario pembelajaran kolaboratif, kriteria penilaian, dan kesepakatan belajar.
B. kegiatanInti — wajib tepat 3 tahap berurutan:
   1. "Memahami"
   2. "Mengaplikasi"
   3. "Merefleksi"
   Pada setiap tahap sertakan kombinasi prinsip (Berkesadaran, Bermakna, Menggembirakan), alokasi durasi yang realistis, serta minimal 3 aktivitas guru dan 3 aktivitas murid yang rinci, operasional, dan memuat pendampingan diferensiasi.
C. kegiatanPenutup — wajib tepat 4 langkah berturut-turut dengan durasi menit:
   1. Sintesis & Kesimpulan Bersama guru dan murid.
   2. Umpan Balik Apresiatif & Penguatan Konsep oleh guru.
   3. Cek Pemahaman Akhir / Exit Ticket atau refleksi lisan/tulis singkat.
   4. Tindak Lanjut (tugas/agenda pertemuan berikutnya), pesan karakter, doa, dan salam penutup.
Sesuaikan kedalaman materi dengan jenjang dan fase peserta didik, serta pastikan rubrik penilaian memiliki kriteria yang konkret dan terukur.
Pastikan seluruh LKPD (Lampiran 5) memiliki petunjuk belajar, alat/bahan, 2-3 aktivitas bertahap dengan pertanyaan analisis kritis (bukan sekadar hafalan), serta pertanyaan refleksi siswa.
Lengkapi pula objek lampiran agar mencakup tepat 8 lampiran lengkap + penutup Modul Ajar:
- asesmenDiagnostik (Lampiran 1: Asesmen Diagnostik non-kognitif & kognitif)
- penilaianSikap (Lampiran 2: Penilaian Non Tes / Penilaian Sikap sesuai Dimensi Profil Lulusan)
- asesmenFormatif (Lampiran 3: Asesmen Formatif 2-3 soal analisis + kunci + pedoman penskoran)
- bahanAjar (Lampiran 4: Bahan Ajar ringkas & konsep kunci)
- LKPD pada properti lkpd (Lampiran 5)
- refleksiDanUmpanBalik (Lampiran 6: Lembar Refleksi & Umpan Balik Peserta Didik + Tindak Lanjut Guru)
- mediaAjar (Lampiran 7: Media Ajar relevan dan operasional)
- kktp (Lampiran 8: KKTP rubrik + 4 interval nilai ketuntasan Kurikulum Merdeka)
- glosariumDanPustaka (Bagian F penutup Modul Ajar).`;

      const smkNote =
        input.jenjang === "SMK/MAK"
          ? `\nKhusus jenjang SMK/MAK: kaitkan aktivitas Pembelajaran Mendalam dan LKPD dengan konteks dunia kerja, praktik industri (DUDI), keselamatan kerja (K3), atau projek keahlian terapan sesuai mata pelajaran.`
          : "";

      const mediaHint = input.mediaAjarRekomendasi
        ? `\n- Referensi Media Ajar yang Dipilih Guru: Media Utama (${(input.mediaAjarRekomendasi.mediaUtama || []).join("; ")}), Alat Pendukung (${(input.mediaAjarRekomendasi.alatDanBahanPendukung || []).join("; ")}), Sumber Digital (${input.mediaAjarRekomendasi.sumberDigital || ""})`
        : "";

      const prompt = `Buatkan Modul Ajar Kurikulum Merdeka (Pendekatan Pembelajaran Mendalam) dan 8 Lampiran lengkap berdasarkan rincian berikut:
- Nama Penyusun: ${input.penyusun || req.user!.name}
- Satuan Pendidikan: ${input.sekolah || req.user!.school}
- Tahun Ajaran: ${input.tahunAjaran || "2026/2027"}
- Jenjang: ${input.jenjang}
- Fase & Kelas: ${input.fase} / ${input.kelas}
- Mata Pelajaran: ${input.mataPelajaran}
- Topik / Materi Pokok: ${input.topik}
- Alokasi Waktu: ${input.jp} JP (${totalMinutes} menit total, ${input.jumlahPertemuan || 1} pertemuan)
- Model Pembelajaran: ${input.modelPembelajaran || "Problem Based Learning (PBL)"}
- Dimensi Profil Lulusan Fokus: ${(input.dimensiProfilLulusan || ["Penalaran Kritis", "Kolaborasi"]).join(", ")}
- Catatan Konteks Murid/Sekolah: ${input.catatanKonteks || "Kelas heterogen dengan dukungan alat peraga kontekstual di sekolah."}${mediaHint}${smkNote}

Hasilkan JSON sesuai schema yang ditetapkan.`;

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: modulResponseSchema,
        },
      });

      const rawText = (response.text ?? "").trim();
      if (!rawText) {
        res.status(502).json({ error: "Model tidak mengembalikan isi modul. Silakan coba lagi." });
        return;
      }

      const generated = JSON.parse(rawText);
      const now = new Date().toISOString();
      const newModul = {
        id: `modul-${crypto.randomUUID().slice(0, 8)}`,
        ownerId: req.user!.id,
        createdAt: now,
        updatedAt: now,
        ...generated,
        identitas: {
          ...generated.identitas,
          penyusun: input.penyusun || req.user!.name,
          sekolah: input.sekolah || req.user!.school,
          tahunAjaran: input.tahunAjaran || generated.identitas.tahunAjaran,
          jenjang: input.jenjang,
          fase: input.fase,
          kelas: input.kelas,
          mataPelajaran: input.mataPelajaran,
          topik: input.topik || generated.identitas.topik,
          alokasiWaktu: `${input.jp} JP (${totalMinutes} menit)`,
          jumlahPertemuan: Number(input.jumlahPertemuan || 1),
          modelPembelajaran: input.modelPembelajaran || generated.identitas.modelPembelajaran,
          ...(input.kotaTanggal ? { kotaTanggal: String(input.kotaTanggal) } : {}),
          ...(input.namaKepalaSekolah ? { namaKepalaSekolah: String(input.namaKepalaSekolah) } : {}),
          ...(input.nipKepalaSekolah ? { nipKepalaSekolah: String(input.nipKepalaSekolah) } : {}),
          ...(input.nipGuru ? { nipGuru: String(input.nipGuru) } : {}),
        },
        identifikasi: {
          ...generated.identifikasi,
          dimensiProfilLulusan:
            Array.isArray(input.dimensiProfilLulusan) && input.dimensiProfilLulusan.length > 0
              ? input.dimensiProfilLulusan
              : generated.identifikasi.dimensiProfilLulusan,
        },
        lampiran: {
          ...generated.lampiran,
          mediaAjar:
            input.mediaAjarRekomendasi &&
            Array.isArray(input.mediaAjarRekomendasi.mediaUtama) &&
            input.mediaAjarRekomendasi.mediaUtama.length > 0
              ? input.mediaAjarRekomendasi
              : generated.lampiran?.mediaAjar,
        },
      };

      const modules = loadModules();
      modules.unshift(newModul);
      saveModules(modules);

      res.json({ modul: newModul });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan saat menyusun modul ajar.";
      res.status(500).json({ error: message });
    }
  });

  // Akademik Workspace Routes (Kaldik, Prota, Prosem, Daftar Hadir, Rekap Nilai, Cover Perangkat)
  app.get("/api/akademik", requireAuth, (req: AuthedRequest, res) => {
    const store = loadAkademikStore();
    const record = store[req.user!.id] ?? null;
    res.json({ data: record });
  });

  app.put("/api/akademik", requireAuth, (req: AuthedRequest, res) => {
    const data = req.body?.data;
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      res.status(400).json({ error: "Format data perangkat akademik tidak valid." });
      return;
    }
    const store = loadAkademikStore();
    store[req.user!.id] = {
      ...(data as Record<string, unknown>),
      updatedAt: new Date().toISOString(),
    };
    saveAkademikStore(store);
    res.json({ ok: true, data: store[req.user!.id] });
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
