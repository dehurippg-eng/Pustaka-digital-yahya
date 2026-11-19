import type {
  BabPilihan,
  ClassroomRecord,
  FaseKurikulum2026,
  MapelPAI,
  PertemuanKelas,
  StatusHadir,
  StudentGradeEntry,
  StudentProfile,
  UserAccount,
} from '../types/curriculum';
import type { KaldikSummary } from './academicPlanner';

const SAMPLE_STUDENT_POOL: { nama: string; jk: 'L' | 'P' }[] = [
  { nama: 'Ahmad Fauzan Al-Ghazali', jk: 'L' },
  { nama: 'Aisyah Humaira Azzahra', jk: 'P' },
  { nama: 'Muhammad Hafiz Ramadhan', jk: 'L' },
  { nama: 'Fatimah Az-Zahra Putri', jk: 'P' },
  { nama: 'Zaidan Rizki Pratama', jk: 'L' },
  { nama: 'Nadia Safira Khairunnisa', jk: 'P' },
  { nama: 'Rafka Maulana Yusuf', jk: 'L' },
  { nama: 'Siti Amina Rahmawati', jk: 'P' },
  { nama: 'Bilal Hakim Nugroho', jk: 'L' },
  { nama: 'Zahra Aliyah Salsabila', jk: 'P' },
  { nama: 'Farhan Dzikri Abdillah', jk: 'L' },
  { nama: 'Khadijah Nurul Hidayah', jk: 'P' },
];

export function getRelevantBabsForClass(
  faseData: FaseKurikulum2026,
  mapel: MapelPAI,
  semester: 'Ganjil' | 'Genap'
): BabPilihan[] {
  const matched = faseData.babList.filter(
    (b) =>
      b.semester === semester &&
      (mapel === 'PAI dan Budi Pekerti' || !b.mapel || b.mapel === mapel)
  );
  if (matched.length > 0) return matched;
  const bySem = faseData.babList.filter((b) => b.semester === semester);
  return bySem.length > 0 ? bySem : faseData.babList.slice(0, 3);
}

export function createDefaultClassroom(params: {
  user: UserAccount;
  faseData: FaseKurikulum2026;
  mapel: MapelPAI;
  semester: 'Ganjil' | 'Genap';
  namaKelas?: string;
  kaldikSummary: KaldikSummary;
}): ClassroomRecord {
  const { user, faseData, mapel, semester, namaKelas, kaldikSummary } = params;
  const defaultClassName =
    namaKelas ||
    (faseData.jenjang === 'SD/MI'
      ? faseData.fase === 'A'
        ? 'Kelas I-A'
        : faseData.fase === 'B'
          ? 'Kelas IV-A'
          : 'Kelas VI-A'
      : faseData.jenjang === 'SMP/MTs'
        ? 'Kelas VII-A'
        : faseData.fase === 'E'
          ? 'Kelas X-1'
          : 'Kelas XI-1');

  const siswa: StudentProfile[] = SAMPLE_STUDENT_POOL.map((s, idx) => ({
    id: `std-${idx + 1}`,
    nis: `2026${String(idx + 1).padStart(3, '0')}`,
    nama: s.nama,
    jenisKelamin: s.jk,
  }));

  const relevantBabs = getRelevantBabsForClass(faseData, mapel, semester);
  const effectiveDates = (semester === 'Ganjil' ? kaldikSummary.ganjil.months : kaldikSummary.genap.months)
    .flatMap((m) => m.weeks)
    .filter((w) => w.isEffectiveWeek && w.sampleDateIso)
    .map((w) => w.sampleDateIso as string);

  const materiItems = relevantBabs.flatMap((bab) =>
    bab.materiList.map((m) => ({
      materiJudul: m.judul,
      dalilSingkat: `${m.ayatUtama.surah}: ${m.ayatUtama.ayat}`,
    }))
  );

  const pertemuanCount = Math.min(Math.max(materiItems.length, 4), 6);
  const pertemuan: PertemuanKelas[] = Array.from({ length: pertemuanCount }, (_, idx) => {
    const item = materiItems[idx % Math.max(materiItems.length, 1)];
    return {
      id: `meet-${idx + 1}`,
      pertemuanKe: idx + 1,
      tanggal: effectiveDates[idx] || (semester === 'Ganjil' ? '2026-07-20' : '2027-01-11'),
      semester,
      mapel,
      materiJudul: item?.materiJudul || `Pembelajaran ${mapel} Pertemuan ${idx + 1}`,
      dalilSingkat: item?.dalilSingkat || 'Al-Qur’an & Hadis Relevan',
    };
  });

  const absensi: Record<string, Record<string, StatusHadir>> = {};
  pertemuan.forEach((p, mIdx) => {
    absensi[p.id] = {};
    siswa.forEach((s, sIdx) => {
      // Seed realistic sample attendance so teacher immediately sees live summaries
      if (mIdx === 1 && sIdx === 4) absensi[p.id][s.id] = 'S';
      else if (mIdx === 2 && sIdx === 9) absensi[p.id][s.id] = 'I';
      else absensi[p.id][s.id] = 'H';
    });
  });

  const nilai: Record<string, StudentGradeEntry> = {};
  siswa.forEach((s, idx) => {
    const formatifBab: Record<string, number | null> = {};
    const sumatifBab: Record<string, number | null> = {};
    const base = 76 + ((idx * 7) % 18);
    relevantBabs.forEach((b, bIdx) => {
      formatifBab[b.id] = Math.min(98, base + ((bIdx * 3) % 7));
      sumatifBab[b.id] = Math.min(96, base - 2 + ((bIdx * 5) % 9));
    });
    // Include one student slightly below KKTP (75) to demonstrate automatic Remedial detection
    const modBase = idx === 6 ? 69 : base;
    if (idx === 6) {
      relevantBabs.forEach((b) => {
        formatifBab[b.id] = 71;
        sumatifBab[b.id] = 68;
      });
    }
    nilai[s.id] = {
      formatifBab,
      sumatifBab,
      praktikIbadahHafalan: Math.min(98, modBase + 4),
      sts: Math.min(97, modBase + 1),
      sas: Math.min(98, modBase + 2),
    };
  });

  return {
    id: `cls-${Date.now()}`,
    authorId: user.id,
    namaKelas: defaultClassName,
    tahunAjaran: '2026/2027',
    jalur: faseData.jalur || 'Sekolah (PAI & Budi Pekerti)',
    jenjang: faseData.jenjang,
    fase: faseData.fase,
    mapel,
    semester,
    kktp: 75,
    bobot: {
      formatif: 30,
      sumatifBab: 25,
      praktik: 20,
      sts: 10,
      sas: 15,
    },
    satuanPendidikan: user.school || 'Sekolah/Madrasah PAI',
    namaKepsek: 'Kepala Sekolah / Madrasah',
    nipKepsek: '-',
    kotaPenetapan: 'Indonesia',
    siswa,
    pertemuan,
    absensi,
    nilai,
    updatedAt: new Date().toISOString(),
  };
}

export function parseBulkStudentsText(
  rawText: string,
  existingCount: number
): StudentProfile[] {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  return lines.map((line, idx) => {
    const parts = line.split(/\t|;|,|\|/).map((p) => p.trim()).filter(Boolean);
    let nis = `2026${String(existingCount + idx + 1).padStart(3, '0')}`;
    let nama = line;
    let jk: 'L' | 'P' = 'L';

    if (parts.length === 2) {
      if (/^[LP]$/i.test(parts[1])) {
        nama = parts[0];
        jk = parts[1].toUpperCase() as 'L' | 'P';
      } else if (/^\d+$/.test(parts[0])) {
        nis = parts[0];
        nama = parts[1];
      } else {
        nama = parts[0];
      }
    } else if (parts.length >= 3) {
      if (/^\d+$/.test(parts[0])) {
        nis = parts[0];
        nama = parts[1];
        jk = /^P/i.test(parts[2]) ? 'P' : 'L';
      } else {
        nama = parts[0];
        jk = /^P/i.test(parts[1]) ? 'P' : 'L';
      }
    }

    return {
      id: `std-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      nis,
      nama,
      jenisKelamin: jk,
    };
  });
}

export interface StudentAttendanceSummary {
  student: StudentProfile;
  H: number;
  S: number;
  I: number;
  A: number;
  totalPertemuan: number;
  persentaseHadir: number;
}

export function computeAttendanceStats(classroom: ClassroomRecord): {
  perStudent: StudentAttendanceSummary[];
  rataRataKehadiran: number;
} {
  const meets = classroom.pertemuan;
  const perStudent = classroom.siswa.map((student) => {
    let H = 0;
    let S = 0;
    let I = 0;
    let A = 0;
    meets.forEach((m) => {
      const status = classroom.absensi[m.id]?.[student.id] || 'H';
      if (status === 'H') H++;
      else if (status === 'S') S++;
      else if (status === 'I') I++;
      else A++;
    });
    const total = meets.length;
    const persentaseHadir = total > 0 ? Math.round((H / total) * 100) : 100;
    return { student, H, S, I, A, totalPertemuan: total, persentaseHadir };
  });

  const rataRataKehadiran =
    perStudent.length > 0
      ? Math.round(perStudent.reduce((acc, s) => acc + s.persentaseHadir, 0) / perStudent.length)
      : 100;

  return { perStudent, rataRataKehadiran };
}

export interface StudentGradeSummary {
  student: StudentProfile;
  avgFormatif: number;
  avgSumatifBab: number;
  praktik: number;
  sts: number;
  sas: number;
  nilaiAkhir: number;
  predikat: 'A' | 'B' | 'C' | 'D';
  statusKKTP: 'Tuntas · Pengayaan' | 'Tuntas' | 'Perlu Remedial';
  deskripsiRapor: string;
}

function avgNums(nums: (number | null | undefined)[]): number {
  const valid = nums.filter((n): n is number => typeof n === 'number' && !Number.isNaN(n));
  if (valid.length === 0) return 0;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

export function computeStudentGradeSummary(
  student: StudentProfile,
  entry: StudentGradeEntry | undefined,
  classroom: ClassroomRecord,
  relevantBabs: BabPilihan[]
): StudentGradeSummary {
  const safeEntry: StudentGradeEntry = entry || {
    formatifBab: {},
    sumatifBab: {},
    praktikIbadahHafalan: null,
    sts: null,
    sas: null,
  };

  const formVals = relevantBabs.map((b) => safeEntry.formatifBab[b.id]);
  const sumVals = relevantBabs.map((b) => safeEntry.sumatifBab[b.id]);
  const avgFormatif = Math.round(avgNums(formVals));
  const avgSumatifBab = Math.round(avgNums(sumVals));
  const praktik = Math.round(safeEntry.praktikIbadahHafalan ?? 0);
  const sts = Math.round(safeEntry.sts ?? 0);
  const sas = Math.round(safeEntry.sas ?? 0);

  const bobotSum =
    classroom.bobot.formatif +
      classroom.bobot.sumatifBab +
      classroom.bobot.praktik +
      classroom.bobot.sts +
      classroom.bobot.sas || 100;

  const rawFinal =
    (avgFormatif * classroom.bobot.formatif +
      avgSumatifBab * classroom.bobot.sumatifBab +
      praktik * classroom.bobot.praktik +
      sts * classroom.bobot.sts +
      sas * classroom.bobot.sas) /
    bobotSum;

  const nilaiAkhir = Math.round(rawFinal);

  const predikat: StudentGradeSummary['predikat'] =
    nilaiAkhir >= 90 ? 'A' : nilaiAkhir >= 80 ? 'B' : nilaiAkhir >= classroom.kktp ? 'C' : 'D';

  const statusKKTP: StudentGradeSummary['statusKKTP'] =
    nilaiAkhir >= 85
      ? 'Tuntas · Pengayaan'
      : nilaiAkhir >= classroom.kktp
        ? 'Tuntas'
        : 'Perlu Remedial';

  // Automatic Rapor Competency Description citing best & lowest Bab + Dalil
  const babScores = relevantBabs.map((b) => {
    const f = safeEntry.formatifBab[b.id] ?? 0;
    const s = safeEntry.sumatifBab[b.id] ?? 0;
    return {
      bab: b,
      avg: (f + s) / 2,
      dalil: b.materiList[0]?.ayatUtama
        ? `${b.materiList[0].ayatUtama.surah}: ${b.materiList[0].ayatUtama.ayat}`
        : '',
    };
  });

  babScores.sort((a, b) => b.avg - a.avg);
  const bestBab = babScores[0];
  const lowestBab = babScores[babScores.length - 1];

  let deskripsiRapor = '';
  if (!bestBab) {
    deskripsiRapor = `Menunjukkan perkembangan kompetensi ${classroom.mapel} sesuai Kurikulum Merdeka 2026.`;
  } else if (nilaiAkhir >= 85) {
    deskripsiRapor = `Sangat cakap dalam memahami dan mengamalkan "${bestBab.bab.judulBab}"${bestBab.dalil ? ` (${bestBab.dalil})` : ''} serta konsisten dalam praktik ibadah dan hafalan dalil.`;
  } else if (nilaiAkhir >= classroom.kktp) {
    deskripsiRapor = `Mencapai ketuntasan dengan baik pada materi "${bestBab.bab.judulBab}"${bestBab.dalil ? ` (${bestBab.dalil})` : ''}. Perlu penguatan berkelanjutan pada pemahaman "${lowestBab.bab.judulBab}".`;
  } else {
    deskripsiRapor = `Memerlukan bimbingan dan remedial terfokus dalam memahami "${lowestBab.bab.judulBab}" serta latihan pelafalan dan makna dalil terkait.`;
  }

  return {
    student,
    avgFormatif,
    avgSumatifBab,
    praktik,
    sts,
    sas,
    nilaiAkhir,
    predikat,
    statusKKTP,
    deskripsiRapor,
  };
}

function esc(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

export function exportAttendanceCsv(classroom: ClassroomRecord) {
  const { perStudent } = computeAttendanceStats(classroom);
  const header = [
    'No',
    'NIS',
    'Nama Siswa',
    'L/P',
    ...classroom.pertemuan.map((p) => `P${p.pertemuanKe} (${p.tanggal})`),
    'Hadir',
    'Sakit',
    'Izin',
    'Alpa',
    'Persentase',
  ];
  const rows = perStudent.map((row, idx) => [
    String(idx + 1),
    row.student.nis,
    `"${row.student.nama.replace(/"/g, '""')}"`,
    row.student.jenisKelamin,
    ...classroom.pertemuan.map((m) => classroom.absensi[m.id]?.[row.student.id] || 'H'),
    String(row.H),
    String(row.S),
    String(row.I),
    String(row.A),
    `${row.persentaseHadir}%`,
  ]);
  const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `daftar-hadir-${classroom.namaKelas.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportGradesCsv(classroom: ClassroomRecord, relevantBabs: BabPilihan[]) {
  const summaries = classroom.siswa.map((s) =>
    computeStudentGradeSummary(s, classroom.nilai[s.id], classroom, relevantBabs)
  );
  const header = [
    'No',
    'NIS',
    'Nama Siswa',
    'L/P',
    'Rata Formatif',
    'Rata Sumatif Bab',
    'Praktik/Hafalan',
    'STS',
    'SAS',
    'Nilai Rapor Akhir',
    'Predikat',
    'Status KKTP',
    'Deskripsi Rapor Otomatis',
  ];
  const rows = summaries.map((sum, idx) => [
    String(idx + 1),
    sum.student.nis,
    `"${sum.student.nama.replace(/"/g, '""')}"`,
    sum.student.jenisKelamin,
    String(sum.avgFormatif),
    String(sum.avgSumatifBab),
    String(sum.praktik),
    String(sum.sts),
    String(sum.sas),
    String(sum.nilaiAkhir),
    sum.predikat,
    `"${sum.statusKKTP}"`,
    `"${sum.deskripsiRapor.replace(/"/g, '""')}"`,
  ]);
  const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rekap-nilai-${classroom.namaKelas.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadClassroomWord(filename: string, title: string, bodyHtml: string) {
  const html = `<!DOCTYPE html>
<html lang="id" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8" />
<title>${esc(title)}</title>
<style>
  @page { size: A4 landscape; margin: 1.4cm; }
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 10pt; color: #111827; line-height: 1.4; }
  h1 { font-size: 13.5pt; color: #065f46; text-align: center; margin-bottom: 4px; border-bottom: 2px solid #065f46; padding-bottom: 6px; }
  p.sub { text-align: center; font-size: 9.5pt; color: #475569; margin-top: 0; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 14px; font-size: 9pt; }
  th, td { border: 1px solid #94a3b8; padding: 4px 6px; vertical-align: middle; }
  th { background-color: #f1f5f9; font-weight: bold; text-align: center; }
  .num { text-align: center; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`;
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function classroomSignatureHtml(classroom: ClassroomRecord, teacherName: string, teacherNip?: string) {
  const tgl = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return `
  <table style="border:none;margin-top:24px;">
    <tr>
      <td style="border:none;width:50%;text-align:center;vertical-align:top;">
        Mengetahui,<br/>
        Kepala ${esc(classroom.satuanPendidikan)}<br/><br/><br/><br/>
        <strong><u>${esc(classroom.namaKepsek || '........................................')}</u></strong><br/>
        NIP. ${esc(classroom.nipKepsek && classroom.nipKepsek !== '-' ? classroom.nipKepsek : '........................................')}
      </td>
      <td style="border:none;width:50%;text-align:center;vertical-align:top;">
        ${esc(classroom.kotaPenetapan || 'Indonesia')}, ${esc(tgl)}<br/>
        Guru Mata Pelajaran ${esc(classroom.mapel)}<br/><br/><br/><br/>
        <strong><u>${esc(teacherName)}</u></strong><br/>
        NIP. ${esc(teacherNip && teacherNip !== '-' ? teacherNip : '........................................')}
      </td>
    </tr>
  </table>`;
}

export function exportAttendanceWord(classroom: ClassroomRecord, user: UserAccount) {
  const { perStudent, rataRataKehadiran } = computeAttendanceStats(classroom);
  const meetHeaders = classroom.pertemuan
    .map((p) => `<th>P${p.pertemuanKe}<br/><small>${esc(p.tanggal.slice(5))}</small></th>`)
    .join('');

  const rows = perStudent
    .map(
      (r, idx) => `<tr>
      <td class="num">${idx + 1}</td>
      <td class="num">${esc(r.student.nis)}</td>
      <td>${esc(r.student.nama)}</td>
      <td class="num">${r.student.jenisKelamin}</td>
      ${classroom.pertemuan
        .map((m) => {
          const st = classroom.absensi[m.id]?.[r.student.id] || 'H';
          return `<td class="num">${st}</td>`;
        })
        .join('')}
      <td class="num"><strong>${r.H}</strong></td>
      <td class="num">${r.S}</td>
      <td class="num">${r.I}</td>
      <td class="num">${r.A}</td>
      <td class="num"><strong>${r.persentaseHadir}%</strong></td>
    </tr>`
    )
    .join('');

  const body = `
    <h1>DAFTAR HADIR PESERTA DIDIK — ${esc(classroom.mapel.toUpperCase())}</h1>
    <p class="sub">${esc(classroom.satuanPendidikan)} · Rombel: ${esc(classroom.namaKelas)} · Semester ${esc(classroom.semester)} · Tahun Ajaran ${esc(classroom.tahunAjaran)} · Rata-rata Kehadiran: ${rataRataKehadiran}%</p>
    <table>
      <tr>
        <th>No</th><th>NIS</th><th>Nama Peserta Didik</th><th>L/P</th>
        ${meetHeaders}
        <th>H</th><th>S</th><th>I</th><th>A</th><th>%</th>
      </tr>
      ${rows}
    </table>
    <p style="font-size:8.5pt;"><strong>Agenda Materi Pertemuan:</strong> ${classroom.pertemuan.map((p) => `P${p.pertemuanKe} (${p.tanggal}): ${esc(p.materiJudul)} [${esc(p.dalilSingkat)}]`).join(' | ')}</p>
    ${classroomSignatureHtml(classroom, user.name, user.nip)}
  `;
  downloadClassroomWord(
    `daftar-hadir-${classroom.namaKelas.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.doc`,
    'Daftar Hadir Peserta Didik',
    body
  );
}

export function exportGradesWord(
  classroom: ClassroomRecord,
  relevantBabs: BabPilihan[],
  user: UserAccount
) {
  const summaries = classroom.siswa.map((s) =>
    computeStudentGradeSummary(s, classroom.nilai[s.id], classroom, relevantBabs)
  );
  const rows = summaries
    .map(
      (s, idx) => `<tr>
      <td class="num">${idx + 1}</td>
      <td class="num">${esc(s.student.nis)}</td>
      <td>${esc(s.student.nama)}</td>
      <td class="num">${s.student.jenisKelamin}</td>
      <td class="num">${s.avgFormatif}</td>
      <td class="num">${s.avgSumatifBab}</td>
      <td class="num">${s.praktik}</td>
      <td class="num">${s.sts}</td>
      <td class="num">${s.sas}</td>
      <td class="num"><strong>${s.nilaiAkhir}</strong></td>
      <td class="num"><strong>${s.predikat}</strong></td>
      <td class="num">${esc(s.statusKKTP)}</td>
      <td style="font-size:8.5pt;">${esc(s.deskripsiRapor)}</td>
    </tr>`
    )
    .join('');

  const body = `
    <h1>REKAPITULASI NILAI & DESKRIPSI RAPOR KURIKULUM MERDEKA 2026<br/>MATA PELAJARAN ${esc(classroom.mapel.toUpperCase())}</h1>
    <p class="sub">${esc(classroom.satuanPendidikan)} · Rombel: ${esc(classroom.namaKelas)} · Jenjang ${esc(classroom.jenjang)} (Fase ${esc(classroom.fase)}) · Semester ${esc(classroom.semester)} · KKTP: ${classroom.kktp}</p>
    <table>
      <tr>
        <th>No</th><th>NIS</th><th>Nama Peserta Didik</th><th>L/P</th>
        <th>Formatif<br/>(${classroom.bobot.formatif}%)</th>
        <th>Sumatif Bab<br/>(${classroom.bobot.sumatifBab}%)</th>
        <th>Praktik<br/>(${classroom.bobot.praktik}%)</th>
        <th>STS<br/>(${classroom.bobot.sts}%)</th>
        <th>SAS<br/>(${classroom.bobot.sas}%)</th>
        <th>Nilai Akhir</th>
        <th>Predikat</th>
        <th>Status KKTP</th>
        <th width="28%">Deskripsi Capaian Kompetensi Rapor</th>
      </tr>
      ${rows}
    </table>
    ${classroomSignatureHtml(classroom, user.name, user.nip)}
  `;
  downloadClassroomWord(
    `rekap-nilai-${classroom.namaKelas.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.doc`,
    'Rekapitulasi Nilai Peserta Didik',
    body
  );
}
