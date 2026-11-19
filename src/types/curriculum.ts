export type Jenjang = 'SD/MI' | 'SMP/MTs' | 'SMA/MA';
export type Fase = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type JalurKurikulum = 'Sekolah (PAI & Budi Pekerti)' | 'Madrasah (Kemenag RI)';
export type MapelPAI =
  | 'PAI dan Budi Pekerti'
  | 'Al-Qur’an Hadis'
  | 'Akidah Akhlak'
  | 'Fikih'
  | 'Sejarah Kebudayaan Islam (SKI)'
  | 'Bahasa Arab'
  | 'Ilmu Tafsir & Ilmu Hadis'
  | 'Ushul Fikih';

export type ElemenPAI =
  | 'Al-Qur’an dan Hadis'
  | 'Akidah'
  | 'Akhlak'
  | 'Fikih'
  | 'Sejarah Peradaban Islam'
  | 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)'
  | 'Ilmu Tafsir & Ilmu Hadis'
  | 'Ushul Fikih';

export type UserRole = 'admin' | 'guru';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nip?: string;
  school: string;
  jenjang: Jenjang | 'Semua Jenjang';
  avatarUrl?: string;
  active: boolean;
  mustChangePassword: boolean;
  createdAt: string;
}

export interface AyatQuran {
  surah: string;
  ayat: string;
  arab: string;
  latin: string;
  terjemah: string;
  tafsirSingkat: string;
  keterkaitanMateri: string;
}

export interface HadisNabi {
  perawi: string;
  kitab: string;
  derajat: string;
  arab: string;
  latin: string;
  terjemah: string;
  hikmahPedagogis: string;
}

export interface MateriPilihan {
  id: string;
  kode: string;
  judul: string;
  ringkasan: string;
  kataKunci: string[];
  ayatUtama: AyatQuran;
  hadisUtama: HadisNabi;
}

export interface ATPItem {
  kode: string;
  kelas: string;
  semester: 'Ganjil' | 'Genap';
  elemen: ElemenPAI;
  mapel?: MapelPAI;
  tujuanPembelajaran: string;
  dimensiProfilLulusan: string[];
  alokasiJP: number;
}

export interface BabPilihan {
  id: string;
  nomorBab: number;
  judulBab: string;
  kelas: string;
  semester: 'Ganjil' | 'Genap';
  elemen: ElemenPAI;
  mapel?: MapelPAI;
  deskripsiSingkat: string;
  atpList: ATPItem[];
  materiList: MateriPilihan[];
}

export interface CapaianElemen {
  elemen: ElemenPAI;
  mapel?: MapelPAI;
  deskripsiCP: string;
}

export interface FaseKurikulum2026 {
  fase: Fase;
  jenjang: Jenjang;
  jalur?: JalurKurikulum;
  kelasRentang: string;
  labelLengkap: string;
  rasional2026: string;
  capaianPembelajaran: CapaianElemen[];
  babList: BabPilihan[];
}

export type PertemuanOption =
  | 'Pertemuan 1'
  | 'Pertemuan 2'
  | 'Pertemuan 3'
  | 'Pertemuan 1–3 (Utuh)';

export interface ModulIdentitas {
  namaPenyusun: string;
  nipPenyusun?: string;
  satuanPendidikan: string;
  tahunAjaran: string;
  jenjang: Jenjang;
  jalur?: JalurKurikulum;
  mataPelajaran?: MapelPAI;
  fase: Fase;
  kelas: string;
  semester: string;
  pertemuanKe?: PertemuanOption;
  elemen: ElemenPAI;
  babJudul: string;
  materiJudul: string;
  alokasiWaktu: string;
  kotaPenetapan?: string;
  tanggalPenetapan?: string;
  namaKepsek?: string;
  nipKepsek?: string;
}

export interface ModulIdentifikasi {
  kesiapanPesertaDidik: string;
  karakteristikMateri: string;
  targetPesertaDidik?: string;
  saranaPrasarana?: string;
  dimensiProfilLulusan: string[];
}

export interface ModulDesainPembelajaran {
  capaianPembelajaran2026: string;
  lintasDisiplinIlmu: string;
  tujuanPembelajaran: string[];
  topikPembelajaran: string;
  pemahamanBermakna?: string;
  pertanyaanPemantik?: string[];
  dalilInti?: {
    ayat: AyatQuran;
    hadis: HadisNabi;
  };
  praktikPedagogis: string;
  kemitraanPembelajaran: string;
  lingkunganPembelajaran: string;
  pemanfaatanDigital: string;
}

export interface TahapPengalamanBelajar {
  tahap: 'Memahami' | 'Mengaplikasi' | 'Merefleksi';
  prinsip: string;
  durasiMenit: number;
  aktivitasGuru: string[];
  aktivitasSiswa: string[];
  integrasiDalil: string;
}

export interface ModulAsesmenRingkas {
  asesmenAwal: string;
  asesmenProses: string;
  asesmenAkhir: string;
}

export interface Lampiran1BahanAjar {
  judul: string;
  petaKonsep: string[];
  uraianMateriInti: string;
  ayatAlQuran: AyatQuran;
  hadisRelevan: HadisNabi;
  implementasiKehidupan: string;
}

export interface Lampiran2LKPD {
  judulLKPD: string;
  petunjukBelajar: string[];
  aktivitasMandiri: {
    instruksi: string;
    pertanyaan: string[];
  };
  aktivitasKelompok: {
    studiKasus: string;
    langkahKerja: string[];
    produkKarya: string;
  };
  rubrikPenilaianLKPD: {
    aspek: string;
    bobot: number;
    kriteria: string;
  }[];
}

export interface Lampiran3AsesmenAwal {
  tujuanDiagnostik: string;
  asesmenNonKognitif: string[];
  pertanyaanDiagnostikKognitif: {
    nomor: number;
    pertanyaan: string;
    indikatorKesiapan: string;
  }[];
  pemetaanDiferensiasi: {
    kategori: string;
    tindakLanjut: string;
  }[];
}

export interface Lampiran4AsesmenFormatif {
  teknikPenilaian: string;
  lembarObservasiSikap: {
    aspek: string;
    indikator: string;
  }[];
  rubrikUnjukKerja: {
    kriteria: string;
    skor4: string;
    skor3: string;
    skor2: string;
    skor1: string;
  }[];
}

export interface SoalPilihanGanda {
  nomor: number;
  levelKognitif: string;
  pertanyaan: string;
  opsi: string[];
  kunciJawaban: string;
  pembahasan: string;
}

export interface SoalUraian {
  nomor: number;
  pertanyaan: string;
  pedomanJawaban: string;
  skorMaksimal: number;
}

export interface Lampiran5AsesmenSumatif {
  kisiKisi: {
    indikatorSoal: string;
    levelKognitif: string;
    bentukSoal: string;
    nomorSoal: string;
  }[];
  soalPilihanGanda: SoalPilihanGanda[];
  soalUraian: SoalUraian[];
}

export interface Lampiran6PengayaanRemedial {
  kriteriaKetuntasan: string;
  programPengayaan: {
    sasaran: string;
    bentukKegiatan: string[];
    tagihanProduk: string;
  };
  programRemedial: {
    sasaran: string;
    langkahPembelajaran: string[];
    evaluasiUlang: string;
  };
}

export interface Lampiran7Refleksi {
  refleksiPesertaDidik: string[];
  refleksiGuru: string[];
  rencanaTindakLanjut: string;
}

export interface Lampiran8GlosariumPustaka {
  glosarium: {
    istilah: string;
    definisi: string;
  }[];
  daftarPustaka: string[];
}

export interface DelapanLampiran {
  lampiran1BahanAjar: Lampiran1BahanAjar;
  lampiran2LKPD: Lampiran2LKPD;
  lampiran3AsesmenAwal: Lampiran3AsesmenAwal;
  lampiran4AsesmenFormatif: Lampiran4AsesmenFormatif;
  lampiran5AsesmenSumatif: Lampiran5AsesmenSumatif;
  lampiran6PengayaanRemedial: Lampiran6PengayaanRemedial;
  lampiran7Refleksi: Lampiran7Refleksi;
  lampiran8GlosariumPustaka: Lampiran8GlosariumPustaka;
}

export interface MediaSlide {
  nomor: number;
  judulSlide: string;
  subjudul: string;
  poinUtama: string[];
  teksArab?: string;
  transliterasi?: string;
  terjemah?: string;
  catatanGuru: string;
}

export interface MediaKartuKonsep {
  id: string;
  depan: string;
  belakang: string;
  dalilSingkat: string;
}

export interface PaketMediaOtomatis {
  id: string;
  judulPaket: string;
  jenisMediaUtama: string;
  elemenFokus: string;
  ringkasanPenggunaan: string;
  slides: MediaSlide[];
  kartuKonsep: MediaKartuKonsep[];
  aktivitasInteraktif: {
    judul: string;
    instruksi: string;
    itemChecklist: string[];
  };
}

export interface ModulAjarDeepLearning {
  id: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName: string;
  identitas: ModulIdentitas;
  identifikasi: ModulIdentifikasi;
  desainPembelajaran: ModulDesainPembelajaran;
  pengalamanBelajar: TahapPengalamanBelajar[];
  asesmenRingkas: ModulAsesmenRingkas;
  lampiran: DelapanLampiran;
  mediaOtomatis?: PaketMediaOtomatis;
  sourceMode: 'ai' | 'template';
}

export type JenisAgendaKaldik =
  | 'libur-nasional'
  | 'libur-semester'
  | 'ramadhan-idulfitri'
  | 'penilaian'
  | 'kegiatan-khusus';

export interface KaldikEvent {
  id: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  judul: string;
  jenis: JenisAgendaKaldik;
  semester: 'Ganjil' | 'Genap';
}

export interface KaldikConfig {
  tahunAjaran: string;
  hariKerja: 5 | 6;
  jpPerMinggu: number;
  events: KaldikEvent[];
}

export interface ProtaRow {
  id: string;
  semester: 'Ganjil' | 'Genap';
  nomorBab: number;
  babJudul: string;
  kodeATP: string;
  tujuanPembelajaran: string;
  materiPokok: string;
  dalilTerkait: string;
  alokasiJP: number;
  jenis: 'intrakurikuler' | 'kokurikuler' | 'asesmen' | 'cadangan';
}

export interface ProsemRow {
  id: string;
  semester: 'Ganjil' | 'Genap';
  kodeATP: string;
  materiPokok: string;
  dalilTerkait: string;
  alokasiJP: number;
  jenis: 'intrakurikuler' | 'kokurikuler' | 'asesmen' | 'cadangan';
  distribusiMinggu: Record<string, number>;
}

export interface PlannerSettings {
  authorId: string;
  tahunAjaran: string;
  jalur: JalurKurikulum;
  jenjang: Jenjang;
  fase: Fase;
  mapel: MapelPAI;
  satuanPendidikan: string;
  namaKepsek: string;
  nipKepsek: string;
  kotaPenetapan: string;
  kaldikConfig: KaldikConfig;
  customJpProta: Record<string, number>;
  updatedAt: string;
}

export type StatusHadir = 'H' | 'S' | 'I' | 'A';

export interface StudentProfile {
  id: string;
  nis: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
}

export interface PertemuanKelas {
  id: string;
  pertemuanKe: number;
  tanggal: string;
  semester: 'Ganjil' | 'Genap';
  mapel: MapelPAI;
  materiJudul: string;
  dalilSingkat: string;
}

export interface StudentGradeEntry {
  formatifBab: Record<string, number | null>;
  sumatifBab: Record<string, number | null>;
  praktikIbadahHafalan: number | null;
  sts: number | null;
  sas: number | null;
}

export interface BobotNilai {
  formatif: number;
  sumatifBab: number;
  praktik: number;
  sts: number;
  sas: number;
}

export interface ClassroomRecord {
  id: string;
  authorId: string;
  namaKelas: string;
  tahunAjaran: string;
  jalur: JalurKurikulum;
  jenjang: Jenjang;
  fase: Fase;
  mapel: MapelPAI;
  semester: 'Ganjil' | 'Genap';
  kktp: number;
  bobot: BobotNilai;
  satuanPendidikan: string;
  namaKepsek: string;
  nipKepsek: string;
  kotaPenetapan: string;
  siswa: StudentProfile[];
  pertemuan: PertemuanKelas[];
  absensi: Record<string, Record<string, StatusHadir>>;
  nilai: Record<string, StudentGradeEntry>;
  updatedAt: string;
}
