import type {
  BabPilihan,
  CapaianElemen,
  FaseKurikulum2026,
  JalurKurikulum,
} from '../types/curriculum';

export interface CpAtpDocumentMeta {
  jalur: JalurKurikulum;
  faseData: FaseKurikulum2026;
  semesterFilter: 'Semua' | 'Ganjil' | 'Genap';
  mapelFilter: string;
  cpList: CapaianElemen[];
  babs: BabPilihan[];
  satuanPendidikan: string;
  namaGuru: string;
  nipGuru?: string;
  namaKepsek: string;
  nipKepsek?: string;
  kotaPenetapan: string;
  tahunAjaran: string;
}

function esc(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

export function exportCpAtpAsWordDoc(meta: CpAtpDocumentMeta) {
  const {
    jalur,
    faseData,
    semesterFilter,
    mapelFilter,
    cpList,
    babs,
    satuanPendidikan,
    namaGuru,
    nipGuru,
    namaKepsek,
    nipKepsek,
    kotaPenetapan,
    tahunAjaran,
  } = meta;

  const tgl = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const totalJP = babs.reduce(
    (acc, bab) => acc + bab.atpList.reduce((sum, atp) => sum + (atp.alokasiJP || 0), 0),
    0
  );

  const cpRows = cpList
    .map(
      (cp, idx) => `<tr>
      <td class="num">${idx + 1}</td>
      <td><strong>${esc(cp.mapel || cp.elemen)}</strong>${cp.mapel ? `<br/><small>${esc(cp.elemen)}</small>` : ''}</td>
      <td>${esc(cp.deskripsiCP)}</td>
    </tr>`
    )
    .join('');

  const atpRows: string[] = [];
  let rowNum = 1;
  babs.forEach((bab) => {
    const dalilStr = bab.materiList
      .map(
        (m) =>
          `<strong>${esc(m.judul)}</strong><br/><small>${esc(m.ayatUtama.surah)}: ${esc(m.ayatUtama.ayat)} & ${esc(m.hadisUtama.perawi)}</small>`
      )
      .join('<br/>');

    bab.atpList.forEach((atp) => {
      atpRows.push(`<tr>
        <td class="num">${rowNum++}</td>
        <td class="num"><strong>${esc(atp.kode)}</strong><br/><small>Sem ${atp.semester === 'Ganjil' ? '1' : '2'}</small></td>
        <td>${esc(atp.kelas)}<br/><small>${esc(atp.mapel || atp.elemen)}</small></td>
        <td><strong>Bab ${bab.nomorBab}: ${esc(bab.judulBab)}</strong><br/>${esc(atp.tujuanPembelajaran)}</td>
        <td>${dalilStr}</td>
        <td><small>${atp.dimensiProfilLulusan.map(esc).join(', ')}</small></td>
        <td class="num"><strong>${atp.alokasiJP} JP</strong></td>
      </tr>`);
    });
  });

  const html = `<!DOCTYPE html>
<html lang="id" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8" />
<title>Dokumen CP & ATP Kurikulum Merdeka 2026 - Fase ${esc(faseData.fase)}</title>
<style>
  @page { size: A4 landscape; margin: 1.4cm; }
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 10pt; color: #111827; line-height: 1.45; }
  h1 { font-size: 14pt; color: #065f46; text-align: center; margin-bottom: 4px; border-bottom: 2px solid #065f46; padding-bottom: 6px; }
  p.sub { text-align: center; font-size: 9.5pt; color: #475569; margin-top: 0; margin-bottom: 12px; }
  h2 { font-size: 11.5pt; color: #064e3b; background: #ecfdf5; padding: 5px 8px; margin-top: 14px; margin-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; margin-top: 6px; margin-bottom: 12px; font-size: 9pt; }
  th, td { border: 1px solid #94a3b8; padding: 5px 7px; vertical-align: top; }
  th { background-color: #f1f5f9; font-weight: bold; text-align: center; }
  .num { text-align: center; }
</style>
</head>
<body>
  <h1>CAPAIAN PEMBELAJARAN (CP) & ALUR TUJUAN PEMBELAJARAN (ATP)<br/>KURIKULUM MERDEKA 2026 — FASE ${esc(faseData.fase)} (${esc(faseData.jenjang)})</h1>
  <p class="sub">${esc(satuanPendidikan)} · ${esc(jalur)} · Filter: ${esc(mapelFilter)} · Semester ${semesterFilter === 'Semua' ? '1 & 2 (Ganjil & Genap)' : semesterFilter} · Tahun Ajaran ${esc(tahunAjaran)}</p>

  <table style="margin-bottom:10px;">
    <tr><th width="20%">Satuan Pendidikan</th><td width="30%">${esc(satuanPendidikan)}</td><th width="20%">Guru Penyusun</th><td width="30%">${esc(namaGuru)} ${nipGuru && nipGuru !== '-' ? `(NIP. ${esc(nipGuru)})` : ''}</td></tr>
    <tr><th>Jalur & Jenjang</th><td>${esc(jalur)} · ${esc(faseData.jenjang)}</td><th>Fase / Kelas</th><td>Fase ${esc(faseData.fase)} (${esc(faseData.kelasRentang)})</td></tr>
  </table>

  <h2>A. RASIONAL & CAPAIAN PEMBELAJARAN (CP) TAHUN 2026</h2>
  <p><strong>Rasional Kurikulum 2026 Fase ${esc(faseData.fase)}:</strong> ${esc(faseData.rasional2026)}</p>
  <table>
    <tr><th width="5%">No</th><th width="24%">Elemen / Mata Pelajaran</th><th>Deskripsi Capaian Pembelajaran (CP 2026)</th></tr>
    ${cpRows}
  </table>

  <h2>B. ALUR TUJUAN PEMBELAJARAN (ATP) & INTEGRASI DALIL AL-QUR’AN HADIS</h2>
  <table>
    <tr>
      <th width="4%">No</th>
      <th width="10%">Kode ATP</th>
      <th width="12%">Kelas / Mapel</th>
      <th width="28%">Bab & Rumusan Tujuan Pembelajaran</th>
      <th width="24%">Materi Pilihan & Dalil Al-Qur’an / Hadis</th>
      <th width="15%">Dimensi Profil Lulusan 2026</th>
      <th width="7%">JP</th>
    </tr>
    ${atpRows.join('')}
    <tr style="background:#f1f5f9;font-weight:bold;">
      <td colspan="6" style="text-align:right;">TOTAL ALOKASI JAM PELAJARAN PADA ATP TERPILIH</td>
      <td class="num">${totalJP} JP</td>
    </tr>
  </table>

  <table style="border:none;margin-top:24px;">
    <tr>
      <td style="border:none;width:50%;text-align:center;vertical-align:top;">
        Mengetahui,<br/>
        Kepala ${esc(satuanPendidikan)}<br/><br/><br/><br/>
        <strong><u>${esc(namaKepsek || '........................................')}</u></strong><br/>
        NIP. ${esc(nipKepsek && nipKepsek !== '-' ? nipKepsek : '........................................')}
      </td>
      <td style="border:none;width:50%;text-align:center;vertical-align:top;">
        ${esc(kotaPenetapan || 'Indonesia')}, ${esc(tgl)}<br/>
        Guru Mata Pelajaran ${esc(mapelFilter === 'Semua Mapel' || mapelFilter === 'Semua Elemen' ? 'PAI' : mapelFilter)}<br/><br/><br/><br/>
        <strong><u>${esc(namaGuru)}</u></strong><br/>
        NIP. ${esc(nipGuru && nipGuru !== '-' ? nipGuru : '........................................')}
      </td>
    </tr>
  </table>
</body>
</html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cp-atp-2026-fase-${faseData.fase.toLowerCase()}-${faseData.jenjang.replace('/', '-')}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
