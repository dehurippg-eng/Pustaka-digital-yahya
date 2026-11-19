import type {
  BabPilihan,
  FaseKurikulum2026,
  JalurKurikulum,
  MapelPAI,
  MateriPilihan,
  ModulAjarDeepLearning,
  PertemuanOption,
  UserAccount,
} from '../types/curriculum';
import { buildAutoMediaForMateri } from './mediaBuilder';

export interface ModuleConfigInput {
  faseData: FaseKurikulum2026;
  bab: BabPilihan;
  materi: MateriPilihan;
  user: UserAccount;
  satuanPendidikan: string;
  alokasiJP: number;
  modelPembelajaran: string;
  pertemuanKe?: PertemuanOption;
  jalur?: JalurKurikulum;
  mataPelajaran?: MapelPAI;
  catatanKonteks?: string;
  kotaPenetapan?: string;
  tanggalPenetapan?: string;
  namaKepsek?: string;
  nipKepsek?: string;
}

export function buildTemplateDeepLearningModule(
  input: ModuleConfigInput
): ModulAjarDeepLearning {
  const { faseData, bab, materi, user, satuanPendidikan, alokasiJP, modelPembelajaran } = input;
  const todayFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const resolvedJalur: JalurKurikulum =
    input.jalur || faseData.jalur || 'Sekolah (PAI & Budi Pekerti)';
  const resolvedMapel: MapelPAI =
    input.mataPelajaran || bab.mapel || 'PAI dan Budi Pekerti';

  const cpElemen =
    faseData.capaianPembelajaran.find(
      (c) =>
        (c.mapel && c.mapel === resolvedMapel) ||
        c.elemen === bab.elemen
    )?.deskripsiCP || faseData.rasional2026;

  const totalMenit = alokasiJP * (faseData.jenjang === 'SD/MI' ? 35 : faseData.jenjang === 'SMP/MTs' ? 40 : 45);
  const menitMemahami = Math.round(totalMenit * 0.25);
  const menitMengaplikasi = Math.round(totalMenit * 0.55);
  const menitMerefleksi = Math.max(15, totalMenit - menitMemahami - menitMengaplikasi);

  const dimensi = Array.from(
    new Set(bab.atpList.flatMap((a) => a.dimensiProfilLulusan))
  );

  const opsiCount = faseData.jenjang === 'SMA/MA' ? 5 : 4;
  const makeOpsi = (items: string[]) => items.slice(0, opsiCount);

  const resolvedPertemuan: PertemuanOption = input.pertemuanKe || 'Pertemuan 1–3 (Utuh)';
  const fokusPertemuan =
    resolvedPertemuan === 'Pertemuan 1'
      ? 'Fokus Pertemuan 1: Eksplorasi Konsep, Asesmen Diagnostik Awal & Tadabbur Tartil Dalil'
      : resolvedPertemuan === 'Pertemuan 2'
        ? 'Fokus Pertemuan 2: Pendalaman Kasus Kontekstual, Kolaborasi LKPD & Praktik Aplikasi Nyata'
        : resolvedPertemuan === 'Pertemuan 3'
          ? 'Fokus Pertemuan 3: Presentasi Karya, Refleksi Komitmen Diri & Asesmen Sumatif HOTS'
          : 'Rangkaian Lengkap Pertemuan 1 s.d. 3 (Memahami, Mengaplikasi, Merefleksi)';

  const autoMedia = buildAutoMediaForMateri({
    faseData,
    bab,
    materi,
    pertemuanKe: resolvedPertemuan,
  });

  return {
    id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: user.id,
    authorName: user.name,
    sourceMode: 'template',
    mediaOtomatis: autoMedia,
    identitas: {
      namaPenyusun: user.name,
      nipPenyusun: user.nip || '-',
      satuanPendidikan: satuanPendidikan || user.school || 'Sekolah/Madrasah PAI',
      tahunAjaran: '2026/2027',
      jenjang: faseData.jenjang,
      jalur: resolvedJalur,
      mataPelajaran: resolvedMapel,
      fase: faseData.fase,
      kelas: bab.kelas,
      semester: bab.semester,
      pertemuanKe: resolvedPertemuan,
      elemen: bab.elemen,
      babJudul: `Bab ${bab.nomorBab}: ${bab.judulBab}`,
      materiJudul: materi.judul,
      alokasiWaktu: `${alokasiJP} JP · ${resolvedPertemuan} (${alokasiJP} × ${faseData.jenjang === 'SD/MI' ? 35 : faseData.jenjang === 'SMP/MTs' ? 40 : 45} menit)`,
      kotaPenetapan: input.kotaPenetapan || 'Indonesia',
      tanggalPenetapan: input.tanggalPenetapan || todayFormatted,
      namaKepsek: input.namaKepsek || 'Kepala Sekolah / Madrasah',
      nipKepsek: input.nipKepsek || '-',
    },
    identifikasi: {
      kesiapanPesertaDidik: `Peserta didik kelas ${bab.kelas} (${faseData.jenjang}) memiliki beragam latar belakang kemampuan membaca Al-Qur'an dan pemahaman awal mengenai ${materi.kataKunci.join(', ')}. Diperlukan asesmen awal untuk memetakan kebutuhan bimbingan tartil maupun pendalaman analisis kontekstual.${input.catatanKonteks ? ` Konteks khusus kelas: ${input.catatanKonteks}` : ''}`,
      karakteristikMateri: `Materi "${materi.judul}" merupakan bagian dari elemen ${bab.elemen} yang mengintegrasikan pemahaman tekstual dalil (${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} & ${materi.hadisUtama.perawi}) dengan praktik nyata dalam kehidupan pelajar sehari-hari.`,
      targetPesertaDidik: `Peserta didik reguler/tipikal kelas ${bab.kelas} ${faseData.jenjang}, peserta didik dengan hambatan belajar (pendampingan talaqqi & kartu konsep), serta peserta didik pencapaian tinggi (tutor sebaya & pengayaan analisis dalil).`,
      saranaPrasarana:
        `Mushaf Al-Qur’an & terjemahan Kemenag RI, ${autoMedia.jenisMediaUtama} (${autoMedia.slides.length} slide & ${autoMedia.kartuKonsep.length} kartu konsep interaktif terlampir), proyektor/layar kelas, serta LKPD Deep Learning.`,
      dimensiProfilLulusan:
        dimensi.length > 0
          ? dimensi
          : [
              'Keimanan dan Ketakwaan terhadap Tuhan YME',
              'Penalaran Kritis',
              'Kolaborasi',
              'Komunikasi',
            ],
    },
    desainPembelajaran: {
      capaianPembelajaran2026: cpElemen,
      lintasDisiplinIlmu:
        bab.elemen === 'Fikih'
          ? 'Ilmu Kesehatan, Ekonomi/Matematika Sosial, dan Pendidikan Pancasila'
          : bab.elemen === 'Sejarah Peradaban Islam'
          ? 'Sejarah Nasional/Dunia, Sosiologi, dan Literasi Bahasa Indonesia'
          : 'Pendidikan Pancasila, Bahasa Indonesia, dan Ilmu Sosial/Alam Kontekstual',
      tujuanPembelajaran: bab.atpList.map((a) => `${a.kode}: ${a.tujuanPembelajaran}`),
      topikPembelajaran: `${materi.judul} (${resolvedPertemuan}) — ${fokusPertemuan}`,
      pemahamanBermakna: `Mempelajari "${materi.judul}" yang berlandaskan ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} dan ${materi.hadisUtama.perawi} menumbuhkan kesadaran spiritual sekaligus membekali peserta didik keterampilan memecahkan persoalan nyata dengan akhlak mulia.`,
      pertanyaanPemantik: [
        `Mengapa ajaran Islam dalam ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat} sangat menekankan nilai ${materi.kataKunci[0] || materi.judul}?`,
        `Bagaimana wujud perilaku pelajar Muslim yang mencerminkan pesan ${materi.hadisUtama.perawi} di sekolah dan lingkungan keluarga?`,
        `Tantangan apa yang sering membuat pelajar lalai mengamalkan nilai tersebut, dan bagaimana solusi kreatifnya?`,
      ],
      dalilInti: {
        ayat: materi.ayatUtama,
        hadis: materi.hadisUtama,
      },
      praktikPedagogis: `Pendekatan Pembelajaran Mendalam (Deep Learning) dengan model ${modelPembelajaran} yang mengedepankan prinsip Berkesadaran (Mindful), Bermakna (Meaningful), dan Menggembirakan (Joyful).`,
      kemitraanPembelajaran:
        'Kolaborasi guru PAI dengan wali kelas, guru Bimbingan Konseling, orang tua/wali murid dalam pemantauan pembiasaan ibadah di rumah, serta takmir masjid sekolah.',
      lingkunganPembelajaran:
        'Ruang kelas kolaboratif dengan pengaturan tempat duduk berkelompok, musala/masjid sekolah untuk praktik langsung, serta pojok literasi mushaf Al-Qur’an dan kitab hadis.',
      pemanfaatanDigital:
        `Terhubung langsung dengan Paket Media Pembelajaran Otomatis "${autoMedia.judulPaket}" (${autoMedia.slides.length} slide mode proyektor, audio pembacaan materi, kartu konsep interaktif, dan checklist aktivitas kelas).`,
    },
    pengalamanBelajar: [
      {
        tahap: 'Memahami',
        prinsip: 'Berkesadaran (Mindful) & Bermakna (Meaningful)',
        durasiMenit: menitMemahami,
        aktivitasGuru: [
          'Membuka pembelajaran dengan salam, doa berkesadaran (mindful prayer), serta mengecek kehadiran dan kesiapan emosional peserta didik.',
          `Menampilkan pemantik kontekstual berupa studi kasus atau video singkat terkait "${materi.judul}" dan mengaitkannya dengan pengalaman nyata siswa.`,
          `Membimbing tilawah bersama ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat} serta membacakan matan hadis ${materi.hadisUtama.perawi} dengan artikulasi jelas.`,
          'Menjelaskan tujuan pembelajaran dan alur kegiatan Deep Learning yang akan ditempuh.',
        ],
        aktivitasSiswa: [
          'Berdoa dengan khusyuk, menyiapkan alat tulis dan mushaf/buku PAI, serta menyimak pertanyaan pemantik dari guru.',
          `Membaca secara tartil ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} secara klasikal dan berpasangan, kemudian mengidentifikasi kosakata kunci.`,
          'Mengajukan pertanyaan kritis awal tentang relevansi ayat dan hadis terhadap situasi keseharian remaja/pelajar.',
        ],
        integrasiDalil: `Tilawah & Tadabbur Awal ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} beserta pembacaan sanad-matan ${materi.hadisUtama.perawi}.`,
      },
      {
        tahap: 'Mengaplikasi',
        prinsip: 'Bermakna (Meaningful) & Menggembirakan (Joyful)',
        durasiMenit: menitMengaplikasi,
        aktivitasGuru: [
          `Mengorganisasikan peserta didik ke dalam kelompok heterogen (4–5 siswa) sesuai hasil pemetaan asesmen awal untuk menerapkan model ${modelPembelajaran}.`,
          'Membagikan LKPD Deep Learning (Lampiran 2) dan membimbing proses investigasi makna ayat, tafsir ringkas, serta analisis kasus.',
          'Memfasilitasi diskusi aktif, memberikan umpan balik konstruktif (scaffolding), dan mengobservasi ketercapaian Profil Lulusan (Lampiran 4).',
          'Mengorkestrasi presentasi karya/solusi antar kelompok dengan suasana apresiatif dan menyenangkan.',
        ],
        aktivitasSiswa: [
          `Menganalisis keterkaitan antara ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} dan ${materi.hadisUtama.perawi} dalam kelompok melalui LKPD.`,
          'Merumuskan solusi nyata atau merancang produk kreatif (poster nilai, simulasi praktik, atau peta konsep) yang relevan dengan kehidupan sekolah.',
          'Mempresentasikan hasil temuan kelompok di depan kelas serta menanggapi gagasan teman secara santun dan berbasis dalil.',
        ],
        integrasiDalil: `Eksplorasi dalil: "${materi.ayatUtama.keterkaitanMateri}" dan hikmah hadis: "${materi.hadisUtama.hikmahPedagogis}"`,
      },
      {
        tahap: 'Merefleksi',
        prinsip: 'Berkesadaran (Mindful) & Bermakna (Meaningful)',
        durasiMenit: menitMerefleksi,
        aktivitasGuru: [
          'Memandu siswa menyimpulkan benang merah materi serta meluruskan miskonsepsi konsep syar’i jika ditemukan.',
          'Memfasilitasi pengisian lembar refleksi diri (Lampiran 7) dan asesmen sumatif singkat (Lampiran 5).',
          'Mengajak siswa merumuskan satu komitmen aksi nyata selama satu pekan ke depan dan menutup dengan doa kafaratul majelis.',
        ],
        aktivitasSiswa: [
          'Menuliskan poin kesadaran baru yang diperoleh setelah mempelajari ayat dan hadis pada materi ini.',
          'Menyampaikan satu komitmen perilaku nyata di rumah dan sekolah serta menyelesaikan evaluasi akhir pembelajaran.',
          'Mengikuti doa penutup dengan tenang dan tertib.',
        ],
        integrasiDalil: `Penguatan internalisasi nilai dari ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} menjadi amal saleh harian.`,
      },
    ],
    asesmenRingkas: {
      asesmenAwal:
        'Pertanyaan pemantik lisan dan cek kesiapan membaca dalil Al-Qur’an serta pemahaman awal konsep (Lampiran 3) untuk menentukan pendampingan diferensiasi.',
      asesmenProses:
        'Observasi keaktifan kolaborasi, ketepatan argumen berbasis dalil saat diskusi kelompok, serta penilaian kinerja produk LKPD menggunakan rubrik skala 1–4 (Lampiran 4).',
      asesmenAkhir:
        'Tes tertulis berbasis HOTS (Pilihan Ganda dan Uraian Analitis pada Lampiran 5) serta refleksi komitmen penerapan nilai dalam kehidupan nyata (Lampiran 7).',
    },
    lampiran: {
      lampiran1BahanAjar: {
        judul: `Bahan Ajar PAI ${bab.kelas}: ${materi.judul}`,
        petaKonsep: [
          `Landasan Wahyu: ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat}`,
          `Landasan Nabawi: ${materi.hadisUtama.perawi}`,
          ...materi.kataKunci.map((k) => `Konsep Inti: ${k}`),
          'Aksi Nyata Pelajar Muslim Berkarakter',
        ],
        uraianMateriInti: `${materi.ringkasan}\n\nDalam Kurikulum Merdeka 2026 berbasis Pembelajaran Mendalam (Deep Learning), pemahaman terhadap "${materi.judul}" tidak berhenti pada hafalan definisi semata. Peserta didik diajak menyadari bahwa setiap ajaran Islam memiliki landasan wahyu yang kokoh sekaligus menjawab persoalan nyata di lingkungan sekolah, keluarga, dan masyarakat.\n\n${materi.ayatUtama.tafsirSingkat} ${materi.ayatUtama.keterkaitanMateri}\n\nSejalan dengan hal tersebut, ${materi.hadisUtama.perawi} menegaskan hikmah praktis: ${materi.hadisUtama.hikmahPedagogis}`,
        ayatAlQuran: materi.ayatUtama,
        hadisRelevan: materi.hadisUtama,
        implementasiKehidupan: `1) Di lingkungan sekolah: mengamalkan nilai ${materi.kataKunci[0] || materi.judul} bersama guru dan teman secara konsisten.\n2) Di rumah bersama keluarga: membiasakan adab Islami yang selaras dengan pesan ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}.\n3) Di ruang sosial & digital: menyebarkan teladan kebaikan dan menghindari perilaku yang bertentangan dengan tuntunan ${materi.hadisUtama.perawi}.`,
      },
      lampiran2LKPD: {
        judulLKPD: `LKPD Deep Learning — ${materi.judul}`,
        petunjukBelajar: [
          'Awali pengerjaan LKPD dengan membaca Basmalah dan niat belajar karena Allah Swt.',
          `Bacalah kembali ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat} dan hadis ${materi.hadisUtama.perawi} pada Lampiran 1.`,
          'Kerjakan bagian Tugas Mandiri terlebih dahulu, kemudian lanjutkan diskusi pada bagian Kolaborasi Kelompok.',
          'Tuliskan jawaban menggunakan bahasa yang santun, runtut, dan menyertakan alasan berbasis dalil.',
        ],
        aktivitasMandiri: {
          instruksi: `Amati teks Arab dan terjemahan ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}, lalu jawablah pertanyaan pemantik berikut secara individu:`,
          pertanyaan: [
            `Tuliskan kembali pesan utama yang terkandung dalam ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat} dengan bahasamu sendiri!`,
            `Bagaimana hubungan antara isi ayat tersebut dengan sabda Nabi dalam ${materi.hadisUtama.perawi}?`,
            `Sebutkan 2 contoh tantangan di sekitarmu yang berkaitan dengan materi "${materi.judul}"!`,
          ],
        },
        aktivitasKelompok: {
          studiKasus: `Di lingkungan sekolah atau pergaulan pelajar saat ini, sering muncul situasi di mana nilai "${materi.kataKunci[0] || materi.judul}" terabaikan karena kurangnya kesadaran atau pengaruh lingkungan. Sebagai tim pelajar Muslim yang berpenalaran kritis, analisislah penyebab persoalan tersebut dan rancanglah solusi praktis yang menyenangkan untuk diterapkan di kelas kalian!`,
          langkahKerja: [
            'Identifikasi akar masalah dari studi kasus di atas dan kaitkan dengan dalil Al-Qur’an serta Hadis.',
            'Diskusikan 3 langkah aksi nyata yang paling realistis dilaksanakan dalam 1 minggu.',
            'Tuangkan hasil diskusi dalam bentuk peta konsep/poster mini/presentasi singkat untuk dipamerkan di depan kelas.',
          ],
          produkKarya:
            'Peta Konsep Solutif atau Poster Kampanye Nilai PAI Berbasis Dalil (kertas plano / slide presentasi).',
        },
        rubrikPenilaianLKPD: [
          {
            aspek: 'Ketepatan Analisis Dalil (Al-Qur’an & Hadis)',
            bobot: 35,
            kriteria:
              'Mampu mengaitkan ayat dan hadis dengan kasus secara tepat, logis, dan utuh.',
          },
          {
            aspek: 'Kedalaman Penalaran Kritis & Solusi',
            bobot: 35,
            kriteria:
              'Solusi yang dirumuskan realistis, kontekstual, dan berdampak positif bagi warga sekolah.',
          },
          {
            aspek: 'Kreativitas Penyajian & Kerja Sama Tim',
            bobot: 30,
            kriteria:
              'Produk rapi, komunikatif, dan seluruh anggota kelompok berpartisipasi aktif.',
          },
        ],
      },
      lampiran3AsesmenAwal: {
        tujuanDiagnostik:
          'Memetakan kemampuan awal membaca Al-Qur’an, pemahaman dasar konsep materi, dan gaya belajar peserta didik sebelum masuk ke inti Deep Learning.',
        asesmenNonKognitif: [
          'Bagaimana perasaanmu mengikuti pelajaran PAI hari ini? (Sangat Siap / Cukup Siap / Perlu Semangat)',
          'Cara belajar apa yang paling membantumu memahami materi agama? (Membaca langsung / Diskusi kelompok / Praktik & visual)',
        ],
        pertanyaanDiagnostikKognitif: [
          {
            nomor: 1,
            pertanyaan: `Apakah kamu sudah pernah membaca atau mendengar ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat}?`,
            indikatorKesiapan: 'Mengukur familiaritas peserta didik terhadap dalil utama.',
          },
          {
            nomor: 2,
            pertanyaan: `Menurut pemahaman awalmu, apa arti penting mempelajari "${materi.judul}" bagi pelajar Muslim?`,
            indikatorKesiapan: 'Mengukur kesiapan koneksi makna awal (meaningful readiness).',
          },
          {
            nomor: 3,
            pertanyaan: `Sebutkan satu contoh sikap sehari-hari yang mencerminkan ${materi.kataKunci[0] || materi.judul}!`,
            indikatorKesiapan: 'Mengukur kemampuan menghubungkan konsep dengan perilaku nyata.',
          },
        ],
        pemetaanDiferensiasi: [
          {
            kategori: 'Perlu Bimbingan (Awal)',
            tindakLanjut:
              'Diberikan pendampingan talaqqi pelafalan ayat/hadis secara bertahap dan kartu kata kunci bergambar sebelum diskusi.',
          },
          {
            kategori: 'Berkembang (Menengah)',
            tindakLanjut:
              'Mengikuti alur LKPD standar dengan bimbingan guru pada tahap mengaitkan tafsir dengan studi kasus.',
          },
          {
            kategori: 'Mahir (Siap Eksplorasi Lanjut)',
            tindakLanjut:
              'Diberikan tantangan menjadi tutor sebaya tartil serta menganalisis studi kasus yang lebih kompleks.',
          },
        ],
      },
      lampiran4AsesmenFormatif: {
        teknikPenilaian:
          'Observasi langsung selama proses diskusi kelompok, presentasi, dan praktik membaca dalil.',
        lembarObservasiSikap: [
          {
            aspek: 'Keimanan & Ketakwaan',
            indikator: 'Khusyuk saat berdoa, santun melafalkan Al-Qur’an & Hadis.',
          },
          {
            aspek: 'Kolaborasi',
            indikator: 'Aktif mendengarkan pendapat teman dan berbagi tugas kelompok secara adil.',
          },
          {
            aspek: 'Penalaran Kritis',
            indikator: 'Mengajukan pertanyaan atau argumen yang didukung oleh bukti ayat/hadis.',
          },
          {
            aspek: 'Komunikasi',
            indikator: 'Menyampaikan ide secara jelas, percaya diri, dan menghargai lawan bicara.',
          },
        ],
        rubrikUnjukKerja: [
          {
            kriteria: 'Penguasaan Dalil Al-Qur’an & Hadis',
            skor4: 'Melafalkan sangat lancar sesuai tajwid dan menjelaskan maknanya dengan tepat.',
            skor3: 'Melafalkan cukup lancar dengan sedikit kekeliruan kecil serta memahami maknanya.',
            skor2: 'Memerlukan bantuan guru saat melafalkan dan baru memahami makna secara umum.',
            skor1: 'Belum mampu melafalkan dengan benar dan belum memahami pesan pokok dalil.',
          },
          {
            kriteria: 'Pemecahan Masalah & Presentasi Kelompok',
            skor4: 'Argumen mendalam, solusi sangat aplikatif, penyampaian sistematis dan menarik.',
            skor3: 'Argumen logis, solusi sesuai konteks, penyampaian jelas dan runtut.',
            skor2: 'Argumen masih normatif, solusi kurang terperinci, penyampaian kurang percaya diri.',
            skor1: 'Belum menunjukkan analisis masalah dan pasif saat presentasi kelompok.',
          },
        ],
      },
      lampiran5AsesmenSumatif: {
        kisiKisi: [
          {
            indikatorSoal: `Mengidentifikasi pesan pokok ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}`,
            levelKognitif: 'C2 / Memahami',
            bentukSoal: 'Pilihan Ganda',
            nomorSoal: '1, 2',
          },
          {
            indikatorSoal: `Menganalisis keterkaitan hadis ${materi.hadisUtama.perawi} dengan kasus sehari-hari`,
            levelKognitif: 'C4 / Menganalisis (HOTS)',
            bentukSoal: 'Pilihan Ganda & Uraian',
            nomorSoal: '3, 4, Uraian 1–2',
          },
          {
            indikatorSoal: `Mengevaluasi penerapan nilai ${materi.judul} di lingkungan sekolah/masyarakat`,
            levelKognitif: 'C5 / Mengevaluasi (HOTS)',
            bentukSoal: 'Pilihan Ganda & Uraian',
            nomorSoal: '5, Uraian 3',
          },
        ],
        soalPilihanGanda: [
          {
            nomor: 1,
            levelKognitif: 'C2 (Pemahaman)',
            pertanyaan: `Perhatikan rujukan utama materi "${materi.judul}" yaitu ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat}. Pesan pokok yang ditekankan pada ayat tersebut adalah...`,
            opsi: makeOpsi([
              `A. ${materi.ayatUtama.tafsirSingkat}`,
              'B. Kewajiban meninggalkan seluruh aktivitas duniawi tanpa terkecuali',
              'C. Larangan berinteraksi sosial dengan masyarakat yang berbeda pendapat',
              'D. Pengabaian terhadap tata cara ibadah yang telah dicontohkan Rasul',
              'E. Pembatasan menuntut ilmu hanya pada bidang tertentu saja',
            ]),
            kunciJawaban: 'A',
            pembahasan: `${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} menegaskan bahwa ${materi.ayatUtama.tafsirSingkat}`,
          },
          {
            nomor: 2,
            levelKognitif: 'C3 (Penerapan)',
            pertanyaan: `Dalam ${materi.hadisUtama.perawi}, Rasulullah saw. bersabda: "${materi.hadisUtama.terjemah}". Sikap pelajar yang paling sesuai dengan hadis tersebut adalah...`,
            opsi: makeOpsi([
              'A. Menghafalkan hadis hanya untuk mendapatkan nilai tinggi tanpa diamalkan',
              `B. Mengamalkan nilai ${materi.kataKunci[0] || materi.judul} secara konsisten dalam pergaulan di sekolah dan rumah`,
              'C. Menunda berbuat baik hingga memasuki usia dewasa nanti',
              'D. Menyalahkan teman yang belum memahami materi tanpa memberi contoh baik',
              'E. Merasa paling benar dalam berdiskusi sehingga menolak saran teman',
            ]),
            kunciJawaban: 'B',
            pembahasan: `Hikmah utama hadis ${materi.hadisUtama.perawi} adalah: ${materi.hadisUtama.hikmahPedagogis}`,
          },
          {
            nomor: 3,
            levelKognitif: 'C4 (Analisis - HOTS)',
            pertanyaan: `Apabila di kelas ditemukan masalah terkait kurangnya kesadaran terhadap ${materi.kataKunci[0] || materi.judul}, langkah analisis pertama yang tepat berdasarkan prinsip PAI adalah...`,
            opsi: makeOpsi([
              'A. Langsung menghukum pihak yang bersalah di depan umum',
              'B. Mengabaikan kejadian tersebut karena bukan urusan pribadi',
              `C. Mengidentifikasi akar masalah secara objektif lalu menasihati dengan hikmah merujuk ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}`,
              'D. Menyebarkan kesalahan tersebut di media sosial kelas',
              'E. Menunggu teguran dari kepala sekolah tanpa berbuat apa-apa',
            ]),
            kunciJawaban: 'C',
            pembahasan:
              'Pendekatan Islami mengutamakan analisis objektif, tabayyun, dan nasihat dengan hikmah serta keteladanan.',
          },
          {
            nomor: 4,
            levelKognitif: 'C4 (Analisis - HOTS)',
            pertanyaan: `Keterkaitan antara ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat} dengan dimensi Profil Lulusan dalam pembelajaran mendalam tampak pada...`,
            opsi: makeOpsi([
              'A. Kemampuan menghafal teks tanpa memahami konteks sosial',
              'B. Ketergantungan penuh pada teman saat mengerjakan tugas mandiri',
              'C. Penguatan keimanan yang terwujud melalui penalaran kritis, kolaborasi, dan akhlak mulia',
              'D. Persaingan tidak sehat demi menjadi juara kelas semata',
              'E. Penolakan terhadap perkembangan teknologi pembelajaran',
            ]),
            kunciJawaban: 'C',
            pembahasan:
              'Pembelajaran mendalam PAI menghubungkan pemahaman dalil dengan penguatan keimanan, penalaran kritis, dan kontribusi nyata.',
          },
          {
            nomor: 5,
            levelKognitif: 'C5 (Evaluasi - HOTS)',
            pertanyaan: `Manakah program kelas berikut yang paling efektif dan bermakna untuk mengimplementasikan "${materi.judul}" di ${faseData.jenjang}?`,
            opsi: makeOpsi([
              'A. Membaca catatan pelajaran sekali saja menjelang ujian akhir',
              'B. Mengadakan lomba menyalin teks tanpa diskusi makna',
              `C. Membentuk gerakan pembiasaan mingguan yang terukur, dievaluasi bersama, dan berlandaskan ${materi.hadisUtama.perawi}`,
              'D. Mewajibkan denda uang bagi siswa yang lupa membawa buku',
              'E. Mengurangi jam praktik ibadah demi memperbanyak tugas teori',
            ]),
            kunciJawaban: 'C',
            pembahasan:
              'Program pembiasaan berkelanjutan yang terukur dan reflektif memastikan nilai agama hidup dalam keseharian peserta didik.',
          },
        ],
        soalUraian: [
          {
            nomor: 1,
            pertanyaan: `Jelaskan inti kandungan ${materi.ayatUtama.surah} ayat ${materi.ayatUtama.ayat} serta kaitannya dengan materi "${materi.judul}"!`,
            pedomanJawaban: `Peserta didik menjelaskan pesan ayat (${materi.ayatUtama.tafsirSingkat}) dan mengaitkannya secara tepat dengan konteks materi (${materi.ayatUtama.keterkaitanMateri}).`,
            skorMaksimal: 30,
          },
          {
            nomor: 2,
            pertanyaan: `Bagaimana cara menerapkan hikmah hadis ${materi.hadisUtama.perawi} dalam menghadapi tantangan pergaulan pelajar masa kini? Berikan 2 contoh konkret!`,
            pedomanJawaban: `Peserta didik menguraikan hikmah hadis (${materi.hadisUtama.hikmahPedagogis}) disertai 2 contoh tindakan nyata di lingkungan sekolah/rumah/digital.`,
            skorMaksimal: 35,
          },
          {
            nomor: 3,
            pertanyaan: `Rancanglah satu komitmen pribadi atau aksi kebaikan kelas selama 7 hari ke depan sebagai wujud pemahamanmu terhadap materi "${materi.judul}"!`,
            pedomanJawaban:
              'Peserta didik menuliskan rencana aksi yang spesifik, realistis, berkesadaran, dan selaras dengan nilai syariat.',
            skorMaksimal: 35,
          },
        ],
      },
      lampiran6PengayaanRemedial: {
        kriteriaKetuntasan:
          'Peserta didik dinyatakan mencapai KKTP apabila memperoleh skor minimal 75 pada asesmen formatif dan sumatif serta menunjukkan kesadaran sikap sesuai indikator.',
        programPengayaan: {
          sasaran: 'Peserta didik yang telah melampaui KKTP (skor ≥ 85).',
          bentukKegiatan: [
            `Mengkaji ayat Al-Qur’an atau hadis pendukung lainnya yang masih serumpun dengan ${materi.judul}.`,
            'Menjadi mentor sebaya (peer tutor) bagi teman yang masih berlatih membaca dalil.',
            'Membuat karya dakwah digital (poster infografis atau video pendek 60 detik) tentang nilai materi.',
          ],
          tagihanProduk:
            'Karya ringkasan tadabbur atau media edukasi islami yang diunggah di mading/portal kelas.',
        },
        programRemedial: {
          sasaran: 'Peserta didik yang belum mencapai KKTP (skor < 75).',
          langkahPembelajaran: [
            'Pembelajaran ulang terfokus pada bagian indikator yang belum dikuasai dengan pendekatan personal.',
            'Pendampingan talaqqi pelafalan ayat dan pemahaman kata kunci secara bertahap.',
            'Pemberian latihan terbimbing menggunakan kartu konsep sederhana.',
          ],
          evaluasiUlang:
            'Tes lisan atau tertulis ulang dengan tingkat kesukaran setara hingga peserta didik mencapai ketuntasan minimal.',
        },
      },
      lampiran7Refleksi: {
        refleksiPesertaDidik: [
          `Nilai bermakna apa yang paling menyentuh hatimu setelah mentadabburi ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}?`,
          'Bagian mana dari kegiatan belajar hari ini yang membuatmu paling bersemangat dan memahami materi secara mendalam?',
          `Perubahan sikap nyata apa yang akan kamu mulai lakukan sejak hari ini terkait "${materi.judul}"?`,
        ],
        refleksiGuru: [
          'Apakah alur pengalaman belajar (Memahami – Mengaplikasi – Merefleksi) telah berjalan dengan prinsip berkesadaran, bermakna, dan menggembirakan?',
          'Peserta didik mana yang memerlukan perhatian dan pendampingan khusus pada pertemuan berikutnya?',
          'Apakah media dan LKPD yang digunakan sudah efektif menghubungkan dalil naqli dengan konteks kehidupan siswa?',
        ],
        rencanaTindakLanjut:
          'Hasil refleksi menjadi dasar penyesuaian strategi diferensiasi pada bab/materi selanjutnya dan dilaporkan dalam jurnal mengajar guru PAI.',
      },
      lampiran8GlosariumPustaka: {
        glosarium: [
          {
            istilah: 'Capaian Pembelajaran (CP)',
            definisi:
              'Kompetensi pembelajaran yang harus dicapai peserta didik pada setiap fase perkembangan dalam Kurikulum Merdeka 2026.',
          },
          {
            istilah: 'Alur Tujuan Pembelajaran (ATP)',
            definisi:
              'Rangkaian tujuan pembelajaran yang tersusun secara sistematis dan logis di dalam fase secara utuh dari awal hingga akhir.',
          },
          {
            istilah: 'Pembelajaran Mendalam (Deep Learning)',
            definisi:
              'Pendekatan belajar yang memuliakan pengalaman memahami, mengaplikasi, dan merefleksi secara berkesadaran, bermakna, dan menggembirakan.',
          },
          {
            istilah: 'Tadabbur',
            definisi:
              'Merenungkan makna, pesan, dan hikmah ayat-ayat Al-Qur’an secara mendalam untuk diamalkan dalam kehidupan.',
          },
          {
            istilah: 'Hadis Shahih / Hasan',
            definisi:
              'Hadis yang sanadnya bersambung, diriwayatkan oleh perawi adil dan dabit, serta terbebas dari syadz dan illat sehingga dapat dijadikan hujah.',
          },
          {
            istilah: materi.kataKunci[0] || 'Akhlak Karimah',
            definisi: `Konsep kunci dalam materi "${materi.judul}" yang menghubungkan landasan syariat dengan pembentukan karakter pelajar Muslim.`,
          },
        ],
        daftarPustaka: [
          resolvedJalur === 'Madrasah (Kemenag RI)'
            ? `Kementerian Agama RI. (2024–2026). KMA & Panduan Capaian Pembelajaran ${resolvedMapel} dan Bahasa Arab pada Madrasah (MI, MTs, MA). Jakarta: Direktorat KSKK Madrasah.`
            : 'Kementerian Pendidikan Dasar dan Menengah RI. (2025/2026). Keputusan Kepala BSKAP tentang Capaian Pembelajaran Pendidikan Agama Islam dan Budi Pekerti Kurikulum Merdeka (SD/MI–SMA/MA). Jakarta.',
          'Kementerian Pendidikan Dasar dan Menengah RI. (2025). Naskah Akademik Pembelajaran Mendalam (Deep Learning): Menuju Pendidikan Bermutu untuk Semua. Jakarta.',
          `Kementerian Agama RI. (2022–2026). Al-Qur’an dan Terjemahannya Edisi Penyempurnaan (${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}). Jakarta: Lajnah Pentashihan Mushaf Al-Qur’an.`,
          `Buku ${resolvedMapel} ${faseData.jenjang} ${bab.kelas}. Kemendikdasmen & Kemenag RI.`,
          `${materi.hadisUtama.kitab} (${materi.hadisUtama.perawi}). Rujukan Hadis Nabawi Terverifikasi.`,
        ],
      },
    },
  };
}

export function exportModuleAsWordDoc(
  modul: ModulAjarDeepLearning,
  scope: 'inti' | 'all' = 'all'
) {
  const esc = (s: string) =>
    (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');

  const { identitas, identifikasi, desainPembelajaran, pengalamanBelajar, asesmenRingkas, lampiran } =
    modul;

  const html = `
<!DOCTYPE html>
<html lang="id" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8" />
<title>Modul Ajar Deep Learning - ${esc(identitas.materiJudul)}</title>
<style>
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #111827; margin: 24px; }
  h1 { font-size: 16pt; color: #065f46; border-bottom: 2px solid #065f46; padding-bottom: 6px; margin-bottom: 14px; }
  h2 { font-size: 13pt; color: #064e3b; margin-top: 18px; margin-bottom: 8px; background: #ecfdf5; padding: 6px 10px; }
  h3 { font-size: 11.5pt; color: #0f172a; margin-top: 12px; margin-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 12px; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; text-align: left; }
  th { background-color: #f1f5f9; font-weight: bold; }
  .arab { font-family: 'Traditional Arabic', 'Amiri', serif; font-size: 16pt; direction: rtl; text-align: right; line-height: 2; background: #f8fafc; padding: 10px; border: 1px solid #cbd5e1; }
  .page-break { page-break-before: always; }
</style>
</head>
<body>
  <h1>MODUL AJAR PEMBELAJARAN MENDALAM (DEEP LEARNING)<br/>${esc((identitas.mataPelajaran || 'PENDIDIKAN AGAMA ISLAM & BUDI PEKERTI').toUpperCase())} — KURIKULUM MERDEKA 2026</h1>

  <h2>A. IDENTITAS MODUL</h2>
  <table>
    <tr><th width="28%">Nama Penyusun</th><td>${esc(identitas.namaPenyusun)} ${identitas.nipPenyusun && identitas.nipPenyusun !== '-' ? `(NIP. ${esc(identitas.nipPenyusun)})` : ''}</td></tr>
    <tr><th>Satuan Pendidikan</th><td>${esc(identitas.satuanPendidikan)}</td></tr>
    <tr><th>Kepala Sekolah / Madrasah</th><td>${esc(identitas.namaKepsek || 'Kepala Sekolah / Madrasah')} ${identitas.nipKepsek && identitas.nipKepsek !== '-' ? `(NIP. ${esc(identitas.nipKepsek)})` : ''}</td></tr>
    <tr><th>Jalur & Mata Pelajaran</th><td>${esc(identitas.jalur || 'Sekolah (PAI & Budi Pekerti)')} — <strong>${esc(identitas.mataPelajaran || 'PAI dan Budi Pekerti')}</strong></td></tr>
    <tr><th>Jenjang / Fase / Kelas</th><td>${esc(identitas.jenjang)} / Fase ${esc(identitas.fase)} / ${esc(identitas.kelas)} (Semester ${esc(identitas.semester)})</td></tr>
    <tr><th>Pertemuan Target</th><td><strong>${esc(identitas.pertemuanKe || 'Pertemuan 1–3 (Utuh)')}</strong></td></tr>
    <tr><th>Elemen / Bidang Kajian</th><td>${esc(identitas.elemen)}</td></tr>
    <tr><th>Bab & Materi Pilihan</th><td>${esc(identitas.babJudul)} — ${esc(identitas.materiJudul)}</td></tr>
    <tr><th>Alokasi Waktu & Tahun</th><td>${esc(identitas.alokasiWaktu)} · Tahun Ajaran ${esc(identitas.tahunAjaran)}</td></tr>
  </table>

  <h2>B. IDENTIFIKASI & KOMPETENSI AWAL</h2>
  <p><strong>1. Kesiapan Peserta Didik:</strong> ${esc(identifikasi.kesiapanPesertaDidik)}</p>
  <p><strong>2. Karakteristik Materi Pelajaran:</strong> ${esc(identifikasi.karakteristikMateri)}</p>
  <p><strong>3. Target Peserta Didik:</strong> ${esc(identifikasi.targetPesertaDidik || 'Peserta didik reguler dengan pembelajaran berdiferensiasi')}</p>
  <p><strong>4. Sarana & Prasarana:</strong> ${esc(identifikasi.saranaPrasarana || 'Mushaf Al-Qur’an, kitab hadis, proyektor, audio murottal, dan LKPD')}</p>
  <p><strong>5. Dimensi Profil Lulusan (2026):</strong> ${identifikasi.dimensiProfilLulusan.map(esc).join(', ')}</p>

  <h2>C. DESAIN PEMBELAJARAN & LANDASAN DALIL</h2>
  <p><strong>1. Capaian Pembelajaran (CP 2026):</strong> ${esc(desainPembelajaran.capaianPembelajaran2026)}</p>
  <p><strong>2. Tujuan Pembelajaran (ATP):</strong></p>
  <ul>${desainPembelajaran.tujuanPembelajaran.map((tp) => `<li>${esc(tp)}</li>`).join('')}</ul>
  <p><strong>3. Pemahaman Bermakna:</strong> ${esc(desainPembelajaran.pemahamanBermakna || '')}</p>
  <p><strong>4. Pertanyaan Pemantik:</strong></p>
  <ol>${(desainPembelajaran.pertanyaanPemantik || []).map((q) => `<li>${esc(q)}</li>`).join('')}</ol>
  <p><strong>5. Topik Pembelajaran:</strong> ${esc(desainPembelajaran.topikPembelajaran)}</p>
  <p><strong>6. Landasan Ayat Al-Qur’an (${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.surah)}: ${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.ayat)}):</strong></p>
  <div class="arab">${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.arab)}</div>
  <p><em>${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.latin)}</em><br/>Artinya: "${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.terjemah)}"</p>
  <p><strong>7. Landasan Hadis (${esc(lampiran.lampiran1BahanAjar.hadisRelevan.perawi)}):</strong></p>
  <div class="arab">${esc(lampiran.lampiran1BahanAjar.hadisRelevan.arab)}</div>
  <p>Artinya: "${esc(lampiran.lampiran1BahanAjar.hadisRelevan.terjemah)}"</p>
  <p><strong>8. Lintas Disiplin Ilmu:</strong> ${esc(desainPembelajaran.lintasDisiplinIlmu)}</p>
  <p><strong>9. Praktik Pedagogis:</strong> ${esc(desainPembelajaran.praktikPedagogis)}</p>
  <p><strong>10. Kemitraan Pembelajaran:</strong> ${esc(desainPembelajaran.kemitraanPembelajaran)}</p>
  <p><strong>11. Lingkungan Pembelajaran:</strong> ${esc(desainPembelajaran.lingkunganPembelajaran)}</p>
  <p><strong>12. Pemanfaatan Digital:</strong> ${esc(desainPembelajaran.pemanfaatanDigital)}</p>

  <h2>D. PENGALAMAN BELAJAR (BERKESADARAN · BERMAKNA · MENGGEMBIRAKAN)</h2>
  <table>
    <tr><th width="18%">Tahap & Prinsip</th><th width="36%">Aktivitas Guru</th><th width="36%">Aktivitas Peserta Didik</th><th width="10%">Durasi</th></tr>
    ${pengalamanBelajar
      .map(
        (t) => `<tr>
      <td><strong>${esc(t.tahap)}</strong><br/><small>${esc(t.prinsip)}</small><br/><small><em>${esc(t.integrasiDalil)}</em></small></td>
      <td><ul>${t.aktivitasGuru.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></td>
      <td><ul>${t.aktivitasSiswa.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></td>
      <td>${t.durasiMenit} mnt</td>
    </tr>`
      )
      .join('')}
  </table>

  <h2>E. ASESMEN, PENGAYAAN & REMEDIAL</h2>
  <p><strong>Asesmen Awal:</strong> ${esc(asesmenRingkas.asesmenAwal)}</p>
  <p><strong>Asesmen Proses (Formatif):</strong> ${esc(asesmenRingkas.asesmenProses)}</p>
  <p><strong>Asesmen Akhir (Sumatif):</strong> ${esc(asesmenRingkas.asesmenAkhir)}</p>
  <p><strong>Pengayaan & Remedial:</strong> ${esc(lampiran.lampiran6PengayaanRemedial.kriteriaKetuntasan)}</p>

  <h2>F. GLOSARIUM & DAFTAR PUSTAKA</h2>
  <table>
    <tr><th width="28%">Istilah</th><th>Definisi</th></tr>
    ${lampiran.lampiran8GlosariumPustaka.glosarium.map((g) => `<tr><td><strong>${esc(g.istilah)}</strong></td><td>${esc(g.definisi)}</td></tr>`).join('')}
  </table>
  <p><strong>Daftar Pustaka:</strong></p>
  <ol>${lampiran.lampiran8GlosariumPustaka.daftarPustaka.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>

  <h2>G. LEMBAR PENGESAHAN</h2>
  <table style="border: none; margin-top: 24px;">
    <tr>
      <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
        Mengetahui,<br/>
        Kepala ${esc(identitas.satuanPendidikan)}<br/><br/><br/><br/>
        <strong><u>${esc(identitas.namaKepsek || '........................................')}</u></strong><br/>
        NIP. ${esc(identitas.nipKepsek && identitas.nipKepsek !== '-' ? identitas.nipKepsek : '........................................')}
      </td>
      <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
        ${esc(identitas.kotaPenetapan || 'Indonesia')}, ${esc(identitas.tanggalPenetapan || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }))}<br/>
        Guru Mata Pelajaran ${esc(identitas.mataPelajaran || 'PAI & Budi Pekerti')}<br/><br/><br/><br/>
        <strong><u>${esc(identitas.namaPenyusun)}</u></strong><br/>
        NIP. ${esc(identitas.nipPenyusun && identitas.nipPenyusun !== '-' ? identitas.nipPenyusun : '........................................')}
      </td>
    </tr>
  </table>${
    scope === 'all'
      ? `

  <div class="page-break"></div>
  <h1>8 LAMPIRAN LENGKAP PERANGKAT AJAR</h1>`
      : ''
  }

${
    scope === 'all'
      ? `  <h2>LAMPIRAN 1: BAHAN AJAR & INTEGRASI DALIL AL-QUR'AN DAN HADIS</h2>
  <h3>${esc(lampiran.lampiran1BahanAjar.judul)}</h3>
  <p><strong>Peta Konsep:</strong> ${lampiran.lampiran1BahanAjar.petaKonsep.map(esc).join(' → ')}</p>
  <p>${esc(lampiran.lampiran1BahanAjar.uraianMateriInti)}</p>
  <p><strong>Ayat Al-Qur'an (${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.surah)}: ${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.ayat)}):</strong></p>
  <div class="arab">${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.arab)}</div>
  <p><em>${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.latin)}</em><br/>Artinya: "${esc(lampiran.lampiran1BahanAjar.ayatAlQuran.terjemah)}"</p>
  <p><strong>Hadis Relevan (${esc(lampiran.lampiran1BahanAjar.hadisRelevan.perawi)} — ${esc(lampiran.lampiran1BahanAjar.hadisRelevan.derajat)}):</strong></p>
  <div class="arab">${esc(lampiran.lampiran1BahanAjar.hadisRelevan.arab)}</div>
  <p><em>${esc(lampiran.lampiran1BahanAjar.hadisRelevan.latin)}</em><br/>Artinya: "${esc(lampiran.lampiran1BahanAjar.hadisRelevan.terjemah)}"</p>
  <p><strong>Implementasi Kehidupan:</strong><br/>${esc(lampiran.lampiran1BahanAjar.implementasiKehidupan)}</p>

  <h2>LAMPIRAN 2: LEMBAR KERJA PESERTA DIDIK (LKPD)</h2>
  <h3>${esc(lampiran.lampiran2LKPD.judulLKPD)}</h3>
  <p><strong>Petunjuk Belajar:</strong></p>
  <ol>${lampiran.lampiran2LKPD.petunjukBelajar.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>
  <p><strong>Tugas Mandiri:</strong> ${esc(lampiran.lampiran2LKPD.aktivitasMandiri.instruksi)}</p>
  <ol>${lampiran.lampiran2LKPD.aktivitasMandiri.pertanyaan.map((q) => `<li>${esc(q)}</li>`).join('')}</ol>
  <p><strong>Tugas Kelompok (Studi Kasus):</strong> ${esc(lampiran.lampiran2LKPD.aktivitasKelompok.studiKasus)}</p>
  <ol>${lampiran.lampiran2LKPD.aktivitasKelompok.langkahKerja.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>
  <p><strong>Produk Karya:</strong> ${esc(lampiran.lampiran2LKPD.aktivitasKelompok.produkKarya)}</p>
  <table>
    <tr><th>Aspek Penilaian LKPD</th><th>Bobot (%)</th><th>Kriteria</th></tr>
    ${lampiran.lampiran2LKPD.rubrikPenilaianLKPD.map((r) => `<tr><td>${esc(r.aspek)}</td><td>${r.bobot}%</td><td>${esc(r.kriteria)}</td></tr>`).join('')}
  </table>

  <h2>LAMPIRAN 3: INSTRUMEN ASESMEN AWAL (DIAGNOSTIK)</h2>
  <p><strong>Tujuan:</strong> ${esc(lampiran.lampiran3AsesmenAwal.tujuanDiagnostik)}</p>
  <p><strong>Pertanyaan Non-Kognitif:</strong></p>
  <ul>${lampiran.lampiran3AsesmenAwal.asesmenNonKognitif.map((q) => `<li>${esc(q)}</li>`).join('')}</ul>
  <table>
    <tr><th>No</th><th>Pertanyaan Diagnostik Kognitif</th><th>Indikator Kesiapan</th></tr>
    ${lampiran.lampiran3AsesmenAwal.pertanyaanDiagnostikKognitif.map((d) => `<tr><td>${d.nomor}</td><td>${esc(d.pertanyaan)}</td><td>${esc(d.indikatorKesiapan)}</td></tr>`).join('')}
  </table>
  <table>
    <tr><th>Kategori Kesiapan</th><th>Tindak Lanjut Pembelajaran Berdiferensiasi</th></tr>
    ${lampiran.lampiran3AsesmenAwal.pemetaanDiferensiasi.map((p) => `<tr><td>${esc(p.kategori)}</td><td>${esc(p.tindakLanjut)}</td></tr>`).join('')}
  </table>

  <h2>LAMPIRAN 4: INSTRUMEN & RUBRIK ASESMEN FORMATIF</h2>
  <p><strong>Teknik Penilaian:</strong> ${esc(lampiran.lampiran4AsesmenFormatif.teknikPenilaian)}</p>
  <table>
    <tr><th>Aspek Observasi Sikap</th><th>Indikator Terukur</th></tr>
    ${lampiran.lampiran4AsesmenFormatif.lembarObservasiSikap.map((s) => `<tr><td>${esc(s.aspek)}</td><td>${esc(s.indikator)}</td></tr>`).join('')}
  </table>
  <table>
    <tr><th>Kriteria Unjuk Kerja</th><th>Skor 4 (Sangat Baik)</th><th>Skor 3 (Baik)</th><th>Skor 2 (Cukup)</th><th>Skor 1 (Perlu Bimbingan)</th></tr>
    ${lampiran.lampiran4AsesmenFormatif.rubrikUnjukKerja.map((r) => `<tr><td>${esc(r.kriteria)}</td><td>${esc(r.skor4)}</td><td>${esc(r.skor3)}</td><td>${esc(r.skor2)}</td><td>${esc(r.skor1)}</td></tr>`).join('')}
  </table>

  <h2>LAMPIRAN 5: KISI-KISI & SOAL ASESMEN SUMATIF (HOTS)</h2>
  <table>
    <tr><th>Indikator Soal</th><th>Level Kognitif</th><th>Bentuk</th><th>Nomor</th></tr>
    ${lampiran.lampiran5AsesmenSumatif.kisiKisi.map((k) => `<tr><td>${esc(k.indikatorSoal)}</td><td>${esc(k.levelKognitif)}</td><td>${esc(k.bentukSoal)}</td><td>${esc(k.nomorSoal)}</td></tr>`).join('')}
  </table>
  <h3>Soal Pilihan Ganda</h3>
  ${lampiran.lampiran5AsesmenSumatif.soalPilihanGanda
    .map(
      (s) => `<p><strong>${s.nomor}. [${esc(s.levelKognitif)}]</strong> ${esc(s.pertanyaan)}<br/>${s.opsi.map(esc).join('<br/>')}<br/><em>Kunci: ${esc(s.kunciJawaban)} — ${esc(s.pembahasan)}</em></p>`
    )
    .join('')}
  <h3>Soal Uraian Analitis</h3>
  ${lampiran.lampiran5AsesmenSumatif.soalUraian
    .map(
      (u) => `<p><strong>${u.nomor}. (Skor Maks: ${u.skorMaksimal})</strong> ${esc(u.pertanyaan)}<br/><em>Pedoman Jawaban: ${esc(u.pedomanJawaban)}</em></p>`
    )
    .join('')}

  <h2>LAMPIRAN 6: PROGRAM PENGAYAAN DAN REMEDIAL</h2>
  <p><strong>Kriteria Ketuntasan (KKTP):</strong> ${esc(lampiran.lampiran6PengayaanRemedial.kriteriaKetuntasan)}</p>
  <p><strong>Program Pengayaan (${esc(lampiran.lampiran6PengayaanRemedial.programPengayaan.sasaran)}):</strong></p>
  <ul>${lampiran.lampiran6PengayaanRemedial.programPengayaan.bentukKegiatan.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  <p>Tagihan Produk: ${esc(lampiran.lampiran6PengayaanRemedial.programPengayaan.tagihanProduk)}</p>
  <p><strong>Program Remedial (${esc(lampiran.lampiran6PengayaanRemedial.programRemedial.sasaran)}):</strong></p>
  <ul>${lampiran.lampiran6PengayaanRemedial.programRemedial.langkahPembelajaran.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
  <p>Evaluasi Ulang: ${esc(lampiran.lampiran6PengayaanRemedial.programRemedial.evaluasiUlang)}</p>

  <h2>LAMPIRAN 7: LEMBAR REFLEKSI GURU & PESERTA DIDIK</h2>
  <p><strong>Refleksi Peserta Didik:</strong></p>
  <ol>${lampiran.lampiran7Refleksi.refleksiPesertaDidik.map((r) => `<li>${esc(r)}</li>`).join('')}</ol>
  <p><strong>Refleksi Guru:</strong></p>
  <ol>${lampiran.lampiran7Refleksi.refleksiGuru.map((r) => `<li>${esc(r)}</li>`).join('')}</ol>
  <p><strong>Rencana Tindak Lanjut:</strong> ${esc(lampiran.lampiran7Refleksi.rencanaTindakLanjut)}</p>

  <h2>LAMPIRAN 8: GLOSARIUM & DAFTAR PUSTAKA</h2>
  <table>
    <tr><th width="28%">Istilah</th><th>Definisi</th></tr>
    ${lampiran.lampiran8GlosariumPustaka.glosarium.map((g) => `<tr><td><strong>${esc(g.istilah)}</strong></td><td>${esc(g.definisi)}</td></tr>`).join('')}
  </table>
  <p><strong>Daftar Pustaka:</strong></p>
  <ol>${lampiran.lampiran8GlosariumPustaka.daftarPustaka.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>`
      : ''
  }
</body>
</html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeName = identitas.materiJudul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  link.href = url;
  link.download =
    scope === 'inti'
      ? `modul-ajar-inti-${identitas.fase.toLowerCase()}-${safeName}.doc`
      : `modul-ajar-lengkap-8-lampiran-${identitas.fase.toLowerCase()}-${safeName}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
