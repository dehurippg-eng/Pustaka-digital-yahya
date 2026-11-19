import type {
  FaseKurikulum2026,
  JalurKurikulum,
  Jenjang,
  JenisAgendaKaldik,
  KaldikConfig,
  KaldikEvent,
  MapelPAI,
  ProsemRow,
  ProtaRow,
} from '../types/curriculum';

export const DEFAULT_KALDIK_EVENTS_2026_2027: KaldikEvent[] = [
  {
    id: 'evt-mpls-2026',
    tanggalMulai: '2026-07-13',
    tanggalSelesai: '2026-07-15',
    judul: 'Awal Tahun Ajaran 2026/2027 & MPLS / MATSAMA',
    jenis: 'kegiatan-khusus',
    semester: 'Ganjil',
  },
  {
    id: 'evt-hut-ri-2026',
    tanggalMulai: '2026-08-17',
    tanggalSelesai: '2026-08-17',
    judul: 'Hari Ulang Tahun Kemerdekaan RI ke-81',
    jenis: 'libur-nasional',
    semester: 'Ganjil',
  },
  {
    id: 'evt-maulid-2026',
    tanggalMulai: '2026-08-26',
    tanggalSelesai: '2026-08-26',
    judul: 'Peringatan Maulid Nabi Muhammad saw. (1448 H)',
    jenis: 'libur-nasional',
    semester: 'Ganjil',
  },
  {
    id: 'evt-sts-ganjil-2026',
    tanggalMulai: '2026-09-21',
    tanggalSelesai: '2026-09-25',
    judul: 'Sumatif Tengah Semester (STS) Ganjil',
    jenis: 'penilaian',
    semester: 'Ganjil',
  },
  {
    id: 'evt-sas-ganjil-2026',
    tanggalMulai: '2026-11-30',
    tanggalSelesai: '2026-12-08',
    judul: 'Sumatif Akhir Semester (SAS) Ganjil',
    jenis: 'penilaian',
    semester: 'Ganjil',
  },
  {
    id: 'evt-rapor-ganjil-2026',
    tanggalMulai: '2026-12-18',
    tanggalSelesai: '2026-12-18',
    judul: 'Penyerahan Rapor Semester Ganjil',
    jenis: 'kegiatan-khusus',
    semester: 'Ganjil',
  },
  {
    id: 'evt-libur-ganjil-2026',
    tanggalMulai: '2026-12-21',
    tanggalSelesai: '2027-01-02',
    judul: 'Libur Semester Ganjil, Natal & Tahun Baru 2027',
    jenis: 'libur-semester',
    semester: 'Ganjil',
  },
  {
    id: 'evt-isra-2027',
    tanggalMulai: '2027-01-06',
    tanggalSelesai: '2027-01-06',
    judul: 'Peringatan Isra Mi’raj Nabi Muhammad saw. (1448 H)',
    jenis: 'libur-nasional',
    semester: 'Genap',
  },
  {
    id: 'evt-awal-ramadhan-2027',
    tanggalMulai: '2027-02-08',
    tanggalSelesai: '2027-02-10',
    judul: 'Perkiraan Awal Ramadhan 1448 H & Pesantren Kilat',
    jenis: 'ramadhan-idulfitri',
    semester: 'Genap',
  },
  {
    id: 'evt-idulfitri-2027',
    tanggalMulai: '2027-03-08',
    tanggalSelesai: '2027-03-19',
    judul: 'Libur Hari Raya Idul Fitri 1448 H & Cuti Bersama',
    jenis: 'ramadhan-idulfitri',
    semester: 'Genap',
  },
  {
    id: 'evt-sts-genap-2027',
    tanggalMulai: '2027-03-29',
    tanggalSelesai: '2027-04-02',
    judul: 'Sumatif Tengah Semester (STS) Genap',
    jenis: 'penilaian',
    semester: 'Genap',
  },
  {
    id: 'evt-buruh-2027',
    tanggalMulai: '2027-05-01',
    tanggalSelesai: '2027-05-01',
    judul: 'Hari Buruh Internasional',
    jenis: 'libur-nasional',
    semester: 'Genap',
  },
  {
    id: 'evt-iduladha-2027',
    tanggalMulai: '2027-05-17',
    tanggalSelesai: '2027-05-17',
    judul: 'Hari Raya Idul Adha 1448 H (Perkiraan)',
    jenis: 'libur-nasional',
    semester: 'Genap',
  },
  {
    id: 'evt-pancasila-2027',
    tanggalMulai: '2027-06-01',
    tanggalSelesai: '2027-06-01',
    judul: 'Hari Lahir Pancasila',
    jenis: 'libur-nasional',
    semester: 'Genap',
  },
  {
    id: 'evt-sat-genap-2027',
    tanggalMulai: '2027-06-02',
    tanggalSelesai: '2027-06-10',
    judul: 'Sumatif Akhir Tahun (SAT / PAT) Genap',
    jenis: 'penilaian',
    semester: 'Genap',
  },
  {
    id: 'evt-rapor-genap-2027',
    tanggalMulai: '2027-06-18',
    tanggalSelesai: '2027-06-18',
    judul: 'Penyerahan Rapor Kenaikan Kelas',
    jenis: 'kegiatan-khusus',
    semester: 'Genap',
  },
  {
    id: 'evt-libur-genap-2027',
    tanggalMulai: '2027-06-21',
    tanggalSelesai: '2027-06-30',
    judul: 'Libur Akhir Tahun Ajaran 2026/2027',
    jenis: 'libur-semester',
    semester: 'Genap',
  },
];

export function getDefaultJpPerMinggu(
  jalur: JalurKurikulum,
  jenjang: Jenjang,
  mapel: MapelPAI
): number {
  if (jalur === 'Madrasah (Kemenag RI)') {
    if (mapel === 'Bahasa Arab') return jenjang === 'SD/MI' ? 2 : 3;
    return 2;
  }
  return jenjang === 'SD/MI' ? 4 : 3;
}

export function createDefaultKaldikConfig(
  jalur: JalurKurikulum,
  jenjang: Jenjang,
  mapel: MapelPAI
): KaldikConfig {
  return {
    tahunAjaran: '2026/2027',
    hariKerja: 5,
    jpPerMinggu: getDefaultJpPerMinggu(jalur, jenjang, mapel),
    events: DEFAULT_KALDIK_EVENTS_2026_2027,
  };
}

export interface KaldikDayInfo {
  isoDate: string;
  dayOfMonth: number;
  dayOfWeek: number; // 0 = Sun .. 6 = Sat
  isWeekend: boolean;
  events: KaldikEvent[];
  isEffective: boolean;
  isAssessment: boolean;
  isHolidayOrLeave: boolean;
}

export interface KaldikWeekSlot {
  key: string; // e.g. '2026-07-W1'
  monthKey: string; // '2026-07'
  weekIndex: number; // 1..5
  label: string; // 'M1'..'M5'
  effectiveDays: number;
  nonEffectiveDays: number;
  isEffectiveWeek: boolean;
  hasAssessment: boolean;
  statusTag: 'Efektif' | 'Penilaian' | 'Libur';
  jpSlot: number;
  sampleDateIso: string | null;
}

export interface KaldikMonthSummary {
  monthKey: string; // '2026-07'
  year: number;
  month: number; // 1..12
  monthName: string;
  shortName: string;
  semester: 'Ganjil' | 'Genap';
  days: KaldikDayInfo[];
  weeks: KaldikWeekSlot[];
  totalHariKalender: number;
  hariEfektif: number;
  mingguTotal: number;
  mingguEfektif: number;
  mingguNonEfektif: number;
  jpEfektif: number;
  eventsInMonth: KaldikEvent[];
}

export interface KaldikSummary {
  months: KaldikMonthSummary[];
  ganjil: {
    months: KaldikMonthSummary[];
    hariEfektif: number;
    mingguTotal: number;
    mingguEfektif: number;
    mingguNonEfektif: number;
    jpEfektif: number;
    weekSlots: KaldikWeekSlot[];
  };
  genap: {
    months: KaldikMonthSummary[];
    hariEfektif: number;
    mingguTotal: number;
    mingguEfektif: number;
    mingguNonEfektif: number;
    jpEfektif: number;
    weekSlots: KaldikWeekSlot[];
  };
  totalHariEfektifTahun: number;
  totalMingguEfektifTahun: number;
  totalJPTahun: number;
}

const BULAN_INDO = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const BULAN_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agt',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

function toIsoDate(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function isNonTeachingEvent(jenis: JenisAgendaKaldik): boolean {
  return (
    jenis === 'libur-nasional' ||
    jenis === 'libur-semester' ||
    jenis === 'ramadhan-idulfitri' ||
    jenis === 'kegiatan-khusus'
  );
}

export function computeKaldikSummary(config: KaldikConfig): KaldikSummary {
  const academicMonths: { year: number; month: number; semester: 'Ganjil' | 'Genap' }[] = [
    { year: 2026, month: 7, semester: 'Ganjil' },
    { year: 2026, month: 8, semester: 'Ganjil' },
    { year: 2026, month: 9, semester: 'Ganjil' },
    { year: 2026, month: 10, semester: 'Ganjil' },
    { year: 2026, month: 11, semester: 'Ganjil' },
    { year: 2026, month: 12, semester: 'Ganjil' },
    { year: 2027, month: 1, semester: 'Genap' },
    { year: 2027, month: 2, semester: 'Genap' },
    { year: 2027, month: 3, semester: 'Genap' },
    { year: 2027, month: 4, semester: 'Genap' },
    { year: 2027, month: 5, semester: 'Genap' },
    { year: 2027, month: 6, semester: 'Genap' },
  ];

  // Before 2026-07-13 is pre-academic holiday (Libur kenaikan kelas sebelumnya)
  const months: KaldikMonthSummary[] = academicMonths.map(({ year, month, semester }) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    const days: KaldikDayInfo[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month - 1, d);
      const dow = dateObj.getDay();
      const isoDate = toIsoDate(year, month, d);
      const isWeekend = config.hariKerja === 5 ? dow === 0 || dow === 6 : dow === 0;

      const matchedEvents = config.events.filter(
        (ev) => isoDate >= ev.tanggalMulai && isoDate <= ev.tanggalSelesai
      );

      const preStart = isoDate < '2026-07-13';
      const hasHolidayEvent = matchedEvents.some((ev) => isNonTeachingEvent(ev.jenis));
      const isAssessment = matchedEvents.some((ev) => ev.jenis === 'penilaian');
      const isHolidayOrLeave = preStart || hasHolidayEvent;
      const isEffective = !isWeekend && !isHolidayOrLeave;

      days.push({
        isoDate,
        dayOfMonth: d,
        dayOfWeek: dow,
        isWeekend,
        events: matchedEvents,
        isEffective,
        isAssessment,
        isHolidayOrLeave,
      });
    }

    // Group into weeks (Monday-based rows of the month)
    const weekGroups: KaldikDayInfo[][] = [];
    let currentWeek: KaldikDayInfo[] = [];
    for (const day of days) {
      if (day.dayOfWeek === 1 && currentWeek.length > 0) {
        weekGroups.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    }
    if (currentWeek.length > 0) {
      weekGroups.push(currentWeek);
    }

    // Merge tiny trailing/leading single-day fragment only if > 5 weeks
    if (weekGroups.length > 5) {
      if (weekGroups[0].filter((d) => !d.isWeekend).length === 0) {
        const first = weekGroups.shift()!;
        weekGroups[0] = [...first, ...weekGroups[0]];
      }
    }
    if (weekGroups.length > 5) {
      const last = weekGroups.pop()!;
      weekGroups[weekGroups.length - 1] = [...weekGroups[weekGroups.length - 1], ...last];
    }

    const weeks: KaldikWeekSlot[] = weekGroups.map((group, idx) => {
      const weekIndex = idx + 1;
      const workDays = group.filter((d) => !d.isWeekend);
      const effectiveList = workDays.filter((d) => d.isEffective);
      const assessmentDays = workDays.filter((d) => d.isAssessment).length;
      const effectiveDays = effectiveList.length;
      const nonEffectiveDays = workDays.length - effectiveDays;
      const isEffectiveWeek = effectiveDays >= 2;
      const hasAssessment = assessmentDays >= 2;

      const statusTag: KaldikWeekSlot['statusTag'] = !isEffectiveWeek
        ? 'Libur'
        : hasAssessment
          ? 'Penilaian'
          : 'Efektif';

      return {
        key: `${monthKey}-M${weekIndex}`,
        monthKey,
        weekIndex,
        label: `M${weekIndex}`,
        effectiveDays,
        nonEffectiveDays,
        isEffectiveWeek,
        hasAssessment,
        statusTag,
        jpSlot: isEffectiveWeek ? config.jpPerMinggu : 0,
        sampleDateIso: effectiveList[0]?.isoDate || workDays[0]?.isoDate || null,
      };
    });

    const hariEfektif = days.filter((d) => d.isEffective).length;
    const mingguEfektif = weeks.filter((w) => w.isEffectiveWeek).length;
    const mingguTotal = weeks.length;
    const mingguNonEfektif = mingguTotal - mingguEfektif;
    const jpEfektif = mingguEfektif * config.jpPerMinggu;

    const monthStart = toIsoDate(year, month, 1);
    const monthEnd = toIsoDate(year, month, daysInMonth);
    const eventsInMonth = config.events.filter(
      (ev) => ev.tanggalSelesai >= monthStart && ev.tanggalMulai <= monthEnd
    );

    return {
      monthKey,
      year,
      month,
      monthName: BULAN_INDO[month - 1],
      shortName: BULAN_SHORT[month - 1],
      semester,
      days,
      weeks,
      totalHariKalender: daysInMonth,
      hariEfektif,
      mingguTotal,
      mingguEfektif,
      mingguNonEfektif,
      jpEfektif,
      eventsInMonth,
    };
  });

  const ganjilMonths = months.filter((m) => m.semester === 'Ganjil');
  const genapMonths = months.filter((m) => m.semester === 'Genap');

  const sumBucket = (bucket: KaldikMonthSummary[]) => ({
    months: bucket,
    hariEfektif: bucket.reduce((acc, m) => acc + m.hariEfektif, 0),
    mingguTotal: bucket.reduce((acc, m) => acc + m.mingguTotal, 0),
    mingguEfektif: bucket.reduce((acc, m) => acc + m.mingguEfektif, 0),
    mingguNonEfektif: bucket.reduce((acc, m) => acc + m.mingguNonEfektif, 0),
    jpEfektif: bucket.reduce((acc, m) => acc + m.jpEfektif, 0),
    weekSlots: bucket.flatMap((m) => m.weeks),
  });

  const ganjil = sumBucket(ganjilMonths);
  const genap = sumBucket(genapMonths);

  return {
    months,
    ganjil,
    genap,
    totalHariEfektifTahun: ganjil.hariEfektif + genap.hariEfektif,
    totalMingguEfektifTahun: ganjil.mingguEfektif + genap.mingguEfektif,
    totalJPTahun: ganjil.jpEfektif + genap.jpEfektif,
  };
}

function buildSemesterProtaRows(params: {
  faseData: FaseKurikulum2026;
  mapel: MapelPAI;
  semester: 'Ganjil' | 'Genap';
  targetJP: number;
  jpPerMinggu: number;
  customJpProta: Record<string, number>;
}): ProtaRow[] {
  const { faseData, mapel, semester, targetJP, jpPerMinggu, customJpProta } = params;
  const matchingBabs = faseData.babList.filter(
    (b) =>
      b.semester === semester &&
      (mapel === 'PAI dan Budi Pekerti' || !b.mapel || b.mapel === mapel)
  );
  const usedBabs =
    matchingBabs.length > 0
      ? matchingBabs
      : faseData.babList.filter((b) => b.semester === semester).slice(0, 3);

  const stsJp = Math.max(jpPerMinggu, 2);
  const sasJp = Math.max(jpPerMinggu, 2);
  const kokurikulerJp = Math.max(jpPerMinggu, 2);
  const cadanganJp = Math.max(Math.min(jpPerMinggu, 4), 2);
  const fixedOverhead = stsJp + sasJp + kokurikulerJp + cadanganJp;
  const intraPool = Math.max(targetJP - fixedOverhead, usedBabs.length * jpPerMinggu);

  const rawWeights = usedBabs.map((b) =>
    Math.max(
      b.atpList.reduce((acc, a) => acc + (a.alokasiJP || 3), 0),
      3
    )
  );
  const weightSum = rawWeights.reduce((a, b) => a + b, 0) || 1;

  const intraJps = rawWeights.map((w) => Math.max(Math.round((w / weightSum) * intraPool), jpPerMinggu));
  // Balance rounding delta so sum matches intraPool closely
  let diff = intraPool - intraJps.reduce((a, b) => a + b, 0);
  let cursor = 0;
  while (diff !== 0 && intraJps.length > 0) {
    if (diff > 0) {
      intraJps[cursor % intraJps.length] += 1;
      diff -= 1;
    } else if (intraJps[cursor % intraJps.length] > jpPerMinggu) {
      intraJps[cursor % intraJps.length] -= 1;
      diff += 1;
    } else {
      break;
    }
    cursor++;
  }

  const rows: ProtaRow[] = [];
  const halfIndex = Math.ceil(usedBabs.length / 2);

  usedBabs.forEach((bab, idx) => {
    const firstAtp = bab.atpList[0];
    const firstMateri = bab.materiList[0];
    const rowId = `prota-${faseData.fase}-${semester}-${bab.id}`;
    const defaultJp = intraJps[idx] || jpPerMinggu * 2;
    rows.push({
      id: rowId,
      semester,
      nomorBab: bab.nomorBab,
      babJudul: bab.judulBab,
      kodeATP: firstAtp?.kode || `ATP.${faseData.fase}.${idx + 1}`,
      tujuanPembelajaran:
        bab.atpList.map((a) => a.tujuanPembelajaran).join(' ') || bab.deskripsiSingkat,
      materiPokok: bab.materiList.map((m) => m.judul).join('; ') || bab.judulBab,
      dalilTerkait: firstMateri
        ? `${firstMateri.ayatUtama.surah}: ${firstMateri.ayatUtama.ayat} & ${firstMateri.hadisUtama.perawi}`
        : 'Al-Qur’an & Hadis Shahih Terkait',
      alokasiJP: customJpProta[rowId] ?? defaultJp,
      jenis: 'intrakurikuler',
    });

    if (idx + 1 === halfIndex) {
      const stsId = `prota-${faseData.fase}-${semester}-sts`;
      rows.push({
        id: stsId,
        semester,
        nomorBab: 0,
        babJudul: `Sumatif Tengah Semester (STS) ${semester}`,
        kodeATP: `STS.${semester === 'Ganjil' ? '1' : '2'}`,
        tujuanPembelajaran: `Mengukur ketercapaian kompetensi paruh awal Semester ${semester} melalui asesmen sumatif tertulis dan lisan.`,
        materiPokok: `Evaluasi Tengah Semester ${semester} (${mapel})`,
        dalilTerkait: 'Evaluasi Pemahaman & Hafalan Dalil Inti',
        alokasiJP: customJpProta[stsId] ?? stsJp,
        jenis: 'asesmen',
      });
    }
  });

  const p5Id = `prota-${faseData.fase}-${semester}-p5ra`;
  rows.push({
    id: p5Id,
    semester,
    nomorBab: 0,
    babJudul:
      faseData.jalur === 'Madrasah (Kemenag RI)'
        ? `Proyek Kokurikuler & P5RA (${semester})`
        : `Proyek Kokurikuler Penguatan Profil Lulusan (${semester})`,
    kodeATP: `KOKUR.${semester === 'Ganjil' ? '1' : '2'}`,
    tujuanPembelajaran:
      'Mengimplementasikan nilai keimanan, akhlak karimah, moderasi beragama, dan kepedulian sosial secara kolaboratif.',
    materiPokok: 'Aksi Nyata Karakter Islami & Rahmatan lil ‘Alamin',
    dalilTerkait: 'QS. Al-Anbiya’: 107 & Hadis Akhlak Mulia',
    alokasiJP: customJpProta[p5Id] ?? kokurikulerJp,
    jenis: 'kokurikuler',
  });

  const sasId = `prota-${faseData.fase}-${semester}-sas`;
  rows.push({
    id: sasId,
    semester,
    nomorBab: 0,
    babJudul:
      semester === 'Ganjil'
        ? 'Sumatif Akhir Semester (SAS) Ganjil'
        : 'Sumatif Akhir Tahun (SAT / PAT) Genap',
    kodeATP: semester === 'Ganjil' ? 'SAS.1' : 'SAT.2',
    tujuanPembelajaran: `Mengevaluasi ketuntasan Capaian Pembelajaran seluruh lingkup materi pada Semester ${semester}.`,
    materiPokok: `Ujian Sumatif Akhir Semester ${semester} & Asesmen Praktik`,
    dalilTerkait: 'Uji Kompetensi Komprehensif Al-Qur’an, Hadis & Praktik Ibadah',
    alokasiJP: customJpProta[sasId] ?? sasJp,
    jenis: 'asesmen',
  });

  const cadId = `prota-${faseData.fase}-${semester}-cadangan`;
  rows.push({
    id: cadId,
    semester,
    nomorBab: 0,
    babJudul: `Program Pengayaan, Remedial & Jam Cadangan (${semester})`,
    kodeATP: `REM.${semester === 'Ganjil' ? '1' : '2'}`,
    tujuanPembelajaran:
      'Memberikan layanan diferensiasi pengayaan bagi siswa tuntas dan pendampingan remedial bagi siswa yang membutuhkan.',
    materiPokok: 'Klinik Talaqqi, Pendalaman Dalil & Remedial Terbimbing',
    dalilTerkait: 'Penyesuaian Kebutuhan Peserta Didik',
    alokasiJP: customJpProta[cadId] ?? cadanganJp,
    jenis: 'cadangan',
  });

  return rows;
}

export function buildAutoProta(params: {
  faseData: FaseKurikulum2026;
  mapel: MapelPAI;
  kaldikSummary: KaldikSummary;
  jpPerMinggu: number;
  customJpProta?: Record<string, number>;
}): ProtaRow[] {
  const { faseData, mapel, kaldikSummary, jpPerMinggu, customJpProta = {} } = params;
  const ganjil = buildSemesterProtaRows({
    faseData,
    mapel,
    semester: 'Ganjil',
    targetJP: kaldikSummary.ganjil.jpEfektif,
    jpPerMinggu,
    customJpProta,
  });
  const genap = buildSemesterProtaRows({
    faseData,
    mapel,
    semester: 'Genap',
    targetJP: kaldikSummary.genap.jpEfektif,
    jpPerMinggu,
    customJpProta,
  });
  return [...ganjil, ...genap];
}

export function buildAutoProsem(params: {
  protaRows: ProtaRow[];
  kaldikSummary: KaldikSummary;
  semester: 'Ganjil' | 'Genap';
}): ProsemRow[] {
  const { protaRows, kaldikSummary, semester } = params;
  const semRows = protaRows.filter((r) => r.semester === semester);
  const weekSlots =
    semester === 'Ganjil' ? kaldikSummary.ganjil.weekSlots : kaldikSummary.genap.weekSlots;

  const effectiveWeeks = weekSlots.filter((w) => w.isEffectiveWeek && w.jpSlot > 0);
  const remainingCapacity: Record<string, number> = {};
  effectiveWeeks.forEach((w) => {
    remainingCapacity[w.key] = w.jpSlot;
  });

  let weekCursor = 0;

  return semRows.map((row) => {
    const distribusiMinggu: Record<string, number> = {};
    let remainingJp = row.alokasiJP;

    // If this row is STS or SAS, try placing directly on an assessment week first if available
    if (row.jenis === 'asesmen') {
      const targetAssessmentWeeks = effectiveWeeks.filter((w) => w.hasAssessment && remainingCapacity[w.key] > 0);
      const preferred =
        row.kodeATP.startsWith('STS')
          ? targetAssessmentWeeks[0]
          : targetAssessmentWeeks[targetAssessmentWeeks.length - 1];
      if (preferred) {
        const take = Math.min(remainingJp, remainingCapacity[preferred.key]);
        if (take > 0) {
          distribusiMinggu[preferred.key] = take;
          remainingCapacity[preferred.key] -= take;
          remainingJp -= take;
        }
      }
    }

    while (remainingJp > 0 && weekCursor < effectiveWeeks.length) {
      const wk = effectiveWeeks[weekCursor];
      const cap = remainingCapacity[wk.key] || 0;
      if (cap <= 0) {
        weekCursor++;
        continue;
      }
      const take = Math.min(remainingJp, cap);
      distribusiMinggu[wk.key] = (distribusiMinggu[wk.key] || 0) + take;
      remainingCapacity[wk.key] -= take;
      remainingJp -= take;
      if (remainingCapacity[wk.key] <= 0) {
        weekCursor++;
      }
    }

    // If any JP left after sequential fill, place in any remaining capacity
    if (remainingJp > 0) {
      for (const wk of effectiveWeeks) {
        if (remainingJp <= 0) break;
        const cap = remainingCapacity[wk.key] || 0;
        if (cap > 0) {
          const take = Math.min(remainingJp, cap);
          distribusiMinggu[wk.key] = (distribusiMinggu[wk.key] || 0) + take;
          remainingCapacity[wk.key] -= take;
          remainingJp -= take;
        }
      }
    }

    return {
      id: row.id,
      semester,
      kodeATP: row.kodeATP,
      materiPokok: row.materiPokok,
      dalilTerkait: row.dalilTerkait,
      alokasiJP: row.alokasiJP,
      jenis: row.jenis,
      distribusiMinggu,
    };
  });
}

function escHtml(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

function signatureTableHtml(meta: {
  satuanPendidikan: string;
  namaKepsek: string;
  nipKepsek: string;
  namaGuru: string;
  nipGuru?: string;
  kotaPenetapan: string;
  mapel: string;
}): string {
  const tgl = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return `
  <table style="border: none; margin-top: 28px; width: 100%;">
    <tr>
      <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
        Mengetahui,<br/>
        Kepala ${escHtml(meta.satuanPendidikan)}<br/><br/><br/><br/>
        <strong><u>${escHtml(meta.namaKepsek || '........................................')}</u></strong><br/>
        NIP. ${escHtml(meta.nipKepsek && meta.nipKepsek !== '-' ? meta.nipKepsek : '........................................')}
      </td>
      <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
        ${escHtml(meta.kotaPenetapan || 'Indonesia')}, ${escHtml(tgl)}<br/>
        Guru Mata Pelajaran ${escHtml(meta.mapel)}<br/><br/><br/><br/>
        <strong><u>${escHtml(meta.namaGuru)}</u></strong><br/>
        NIP. ${escHtml(meta.nipGuru && meta.nipGuru !== '-' ? meta.nipGuru : '........................................')}
      </td>
    </tr>
  </table>`;
}

function downloadWordHtml(filename: string, title: string, bodyHtml: string, landscape = false) {
  const html = `<!DOCTYPE html>
<html lang="id" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8" />
<title>${escHtml(title)}</title>
<style>
  @page { size: ${landscape ? 'A4 landscape' : 'A4 portrait'}; margin: 1.5cm; }
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 10.5pt; color: #111827; line-height: 1.45; }
  h1 { font-size: 14pt; color: #065f46; text-align: center; margin-bottom: 4px; border-bottom: 2px solid #065f46; padding-bottom: 6px; }
  h2 { font-size: 11.5pt; color: #064e3b; background: #ecfdf5; padding: 5px 8px; margin-top: 14px; margin-bottom: 6px; }
  p.sub { text-align: center; font-size: 10pt; color: #475569; margin-top: 0; margin-bottom: 14px; }
  table { width: 100%; border-collapse: collapse; margin-top: 6px; margin-bottom: 12px; font-size: 9.5pt; }
  th, td { border: 1px solid #94a3b8; padding: 5px 7px; vertical-align: top; }
  th { background-color: #f1f5f9; font-weight: bold; text-align: center; }
  .num { text-align: center; }
  .right { text-align: right; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`;
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportKaldikWord(params: {
  kaldikConfig: KaldikConfig;
  summary: KaldikSummary;
  meta: {
    satuanPendidikan: string;
    jenjang: Jenjang;
    jalur: JalurKurikulum;
    mapel: MapelPAI;
    namaGuru: string;
    nipGuru?: string;
    namaKepsek: string;
    nipKepsek: string;
    kotaPenetapan: string;
  };
}) {
  const { kaldikConfig, summary, meta } = params;
  const rows = summary.months
    .map(
      (m, i) => `<tr>
      <td class="num">${i + 1}</td>
      <td>${escHtml(m.semester)}</td>
      <td>${escHtml(m.monthName)} ${m.year}</td>
      <td class="num">${m.totalHariKalender}</td>
      <td class="num">${m.hariEfektif}</td>
      <td class="num">${m.mingguTotal}</td>
      <td class="num"><strong>${m.mingguEfektif}</strong></td>
      <td class="num">${m.mingguNonEfektif}</td>
      <td class="num"><strong>${m.jpEfektif} JP</strong></td>
      <td>${m.eventsInMonth.map((e) => `${escHtml(e.judul)} (${escHtml(e.tanggalMulai)})`).join('<br/>') || 'Kegiatan Pembelajaran Efektif'}</td>
    </tr>`
    )
    .join('');

  const body = `
    <h1>KALENDER PENDIDIKAN & ANALISIS PEKAN EFEKTIF<br/>TAHUN AJARAN ${escHtml(kaldikConfig.tahunAjaran)}</h1>
    <p class="sub">${escHtml(meta.satuanPendidikan)} · ${escHtml(meta.jalur)} · ${escHtml(meta.mapel)} (${kaldikConfig.hariKerja} Hari Kerja, ${kaldikConfig.jpPerMinggu} JP/Minggu)</p>
    <h2>A. REKAPITULASI HARI & MINGGU EFEKTIF BELAJAR</h2>
    <table>
      <tr>
        <th>No</th><th>Semester</th><th>Bulan</th><th>Hari Kalender</th><th>Hari Efektif</th>
        <th>Jml Minggu</th><th>Minggu Efektif</th><th>Non-Efektif</th><th>Total JP</th><th>Agenda Utama Kaldik</th>
      </tr>
      ${rows}
      <tr style="background:#ecfdf5; font-weight:bold;">
        <td colspan="4" class="right">TOTAL SEMESTER GANJIL</td>
        <td class="num">${summary.ganjil.hariEfektif}</td>
        <td class="num">${summary.ganjil.mingguTotal}</td>
        <td class="num">${summary.ganjil.mingguEfektif}</td>
        <td class="num">${summary.ganjil.mingguNonEfektif}</td>
        <td class="num">${summary.ganjil.jpEfektif} JP</td>
        <td>Juli – Desember 2026</td>
      </tr>
      <tr style="background:#ecfdf5; font-weight:bold;">
        <td colspan="4" class="right">TOTAL SEMESTER GENAP</td>
        <td class="num">${summary.genap.hariEfektif}</td>
        <td class="num">${summary.genap.mingguTotal}</td>
        <td class="num">${summary.genap.mingguEfektif}</td>
        <td class="num">${summary.genap.mingguNonEfektif}</td>
        <td class="num">${summary.genap.jpEfektif} JP</td>
        <td>Januari – Juni 2027</td>
      </tr>
      <tr style="background:#f1f5f9; font-weight:bold;">
        <td colspan="4" class="right">TOTAL KESELURUHAN 1 TAHUN AJARAN</td>
        <td class="num">${summary.totalHariEfektifTahun}</td>
        <td class="num">${summary.ganjil.mingguTotal + summary.genap.mingguTotal}</td>
        <td class="num">${summary.totalMingguEfektifTahun}</td>
        <td class="num">${summary.ganjil.mingguNonEfektif + summary.genap.mingguNonEfektif}</td>
        <td class="num">${summary.totalJPTahun} JP</td>
        <td>Tahun Ajaran ${escHtml(kaldikConfig.tahunAjaran)}</td>
      </tr>
    </table>
    ${signatureTableHtml(meta)}
  `;
  downloadWordHtml(`kaldik-pai-2026-2027-${meta.jenjang.replace('/', '-')}.doc`, 'Kalender Pendidikan 2026/2027', body, true);
}

export function exportProtaWord(params: {
  protaRows: ProtaRow[];
  meta: {
    satuanPendidikan: string;
    jenjang: Jenjang;
    fase: string;
    jalur: JalurKurikulum;
    mapel: MapelPAI;
    tahunAjaran: string;
    namaGuru: string;
    nipGuru?: string;
    namaKepsek: string;
    nipKepsek: string;
    kotaPenetapan: string;
  };
}) {
  const { protaRows, meta } = params;
  const ganjil = protaRows.filter((r) => r.semester === 'Ganjil');
  const genap = protaRows.filter((r) => r.semester === 'Genap');
  const sumGanjil = ganjil.reduce((a, r) => a + r.alokasiJP, 0);
  const sumGenap = genap.reduce((a, r) => a + r.alokasiJP, 0);

  const renderSection = (title: string, rows: ProtaRow[], totalJp: number) => `
    <h2>${title}</h2>
    <table>
      <tr><th width="5%">No</th><th width="11%">Kode ATP</th><th width="22%">Bab / Lingkup Materi</th><th width="34%">Alur Tujuan Pembelajaran (ATP)</th><th width="20%">Integrasi Al-Qur’an & Hadis</th><th width="8%">JP</th></tr>
      ${rows
        .map(
          (r, i) => `<tr>
          <td class="num">${i + 1}</td>
          <td class="num"><strong>${escHtml(r.kodeATP)}</strong></td>
          <td><strong>${escHtml(r.babJudul)}</strong><br/><small>${escHtml(r.materiPokok)}</small></td>
          <td>${escHtml(r.tujuanPembelajaran)}</td>
          <td><small>${escHtml(r.dalilTerkait)}</small></td>
          <td class="num"><strong>${r.alokasiJP}</strong></td>
        </tr>`
        )
        .join('')}
      <tr style="background:#f1f5f9;font-weight:bold;">
        <td colspan="5" class="right">JUMLAH ALOKASI WAKTU</td>
        <td class="num">${totalJp} JP</td>
      </tr>
    </table>
  `;

  const body = `
    <h1>PROGRAM TAHUNAN (PROTA) KURIKULUM MERDEKA 2026<br/>MATA PELAJARAN ${escHtml(meta.mapel.toUpperCase())}</h1>
    <p class="sub">${escHtml(meta.satuanPendidikan)} · ${escHtml(meta.jalur)} · Jenjang ${escHtml(meta.jenjang)} (Fase ${escHtml(meta.fase)}) · Tahun Ajaran ${escHtml(meta.tahunAjaran)}</p>
    ${renderSection('SEMESTER 1 (GANJIL)', ganjil, sumGanjil)}
    ${renderSection('SEMESTER 2 (GENAP)', genap, sumGenap)}
    <p><strong>Total Alokasi Waktu 1 Tahun Ajaran:</strong> ${sumGanjil + sumGenap} Jam Pelajaran (JP) sesuai Kalender Pendidikan.</p>
    ${signatureTableHtml(meta)}
  `;
  downloadWordHtml(`prota-${meta.mapel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-fase-${meta.fase}.doc`, 'Program Tahunan (Prota) 2026', body, true);
}

export function exportProsemWord(params: {
  semester: 'Ganjil' | 'Genap';
  prosemRows: ProsemRow[];
  months: KaldikMonthSummary[];
  meta: {
    satuanPendidikan: string;
    jenjang: Jenjang;
    fase: string;
    jalur: JalurKurikulum;
    mapel: MapelPAI;
    tahunAjaran: string;
    namaGuru: string;
    nipGuru?: string;
    namaKepsek: string;
    nipKepsek: string;
    kotaPenetapan: string;
  };
}) {
  const { semester, prosemRows, months, meta } = params;
  const totalCols = months.reduce((a, m) => a + m.weeks.length, 0);

  const monthHeaders = months
    .map((m) => `<th colspan="${m.weeks.length}">${escHtml(m.shortName)} ${m.year}</th>`)
    .join('');

  const weekHeaders = months
    .flatMap((m) =>
      m.weeks.map(
        (w) =>
          `<th style="font-size:8pt;${!w.isEffectiveWeek ? 'background:#fee2e2;color:#991b1b;' : w.hasAssessment ? 'background:#fef3c7;color:#92400e;' : ''}">${w.weekIndex}</th>`
      )
    )
    .join('');

  const bodyRows = prosemRows
    .map(
      (r, idx) => `<tr>
      <td class="num">${idx + 1}</td>
      <td class="num"><strong>${escHtml(r.kodeATP)}</strong></td>
      <td>${escHtml(r.materiPokok)}<br/><small style="color:#475569;">${escHtml(r.dalilTerkait)}</small></td>
      <td class="num"><strong>${r.alokasiJP}</strong></td>
      ${months
        .flatMap((m) =>
          m.weeks.map((w) => {
            const val = r.distribusiMinggu[w.key];
            if (!w.isEffectiveWeek) {
              return '<td style="background:#fef2f2;text-align:center;color:#cbd5e1;">-</td>';
            }
            return `<td class="num" style="${val ? 'background:#ecfdf5;font-weight:bold;color:#065f46;' : ''}">${val || ''}</td>`;
          })
        )
        .join('')}
    </tr>`
    )
    .join('');

  const body = `
    <h1>PROGRAM SEMESTER (PROSEM) ${semester.toUpperCase()} KURIKULUM 2026<br/>MATA PELAJARAN ${escHtml(meta.mapel.toUpperCase())}</h1>
    <p class="sub">${escHtml(meta.satuanPendidikan)} · ${escHtml(meta.jalur)} · Jenjang ${escHtml(meta.jenjang)} (Fase ${escHtml(meta.fase)}) · Tahun Ajaran ${escHtml(meta.tahunAjaran)}</p>
    <table>
      <tr>
        <th rowspan="2" width="3%">No</th>
        <th rowspan="2" width="8%">Kode</th>
        <th rowspan="2" width="28%">Materi Pokok / Kegiatan & Dalil Inti</th>
        <th rowspan="2" width="4%">JP</th>
        ${monthHeaders}
      </tr>
      <tr>${weekHeaders}</tr>
      ${bodyRows}
      <tr style="background:#f1f5f9;font-weight:bold;">
        <td colspan="3" class="right">TOTAL ALOKASI SEMESTER ${semester.toUpperCase()}</td>
        <td class="num">${prosemRows.reduce((a, r) => a + r.alokasiJP, 0)}</td>
        <td colspan="${totalCols}" class="num">Distribusi Pekan Efektif Sesuai Kaldik ${escHtml(meta.tahunAjaran)}</td>
      </tr>
    </table>
    <p style="font-size:9pt;"><em>Keterangan warna kolom pekan: Merah muda = Pekan tidak efektif/libur; Kuning muda = Pekan STS/SAS; Hijau = JP Terjadwal.</em></p>
    ${signatureTableHtml(meta)}
  `;
  downloadWordHtml(`prosem-${semester.toLowerCase()}-${meta.mapel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.doc`, `Program Semester ${semester}`, body, true);
}
