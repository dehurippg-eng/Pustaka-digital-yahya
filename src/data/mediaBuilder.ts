import type {
  BabPilihan,
  FaseKurikulum2026,
  MateriPilihan,
  PaketMediaOtomatis,
  PertemuanOption,
} from '../types/curriculum';

export function buildAutoMediaForMateri(params: {
  faseData: FaseKurikulum2026;
  bab: BabPilihan;
  materi: MateriPilihan;
  pertemuanKe?: PertemuanOption;
}): PaketMediaOtomatis {
  const { faseData, bab, materi, pertemuanKe = 'Pertemuan 1' } = params;
  const mapel = bab.mapel || 'PAI dan Budi Pekerti';

  const jenisMediaUtama =
    bab.elemen === 'Fikih'
      ? 'Slide Interaktif + Bagan Alur Tata Cara Ibadah/Muamalah & Kartu Syarat-Rukun'
      : bab.elemen === 'Sejarah Peradaban Islam'
        ? 'Slide Kronologi Sejarah (Timeline) + Peta Ibrah & Kartu Tokoh Keteladanan'
        : bab.elemen === 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)'
          ? 'Kartu Mufradat Bilingual (Arab–Indonesia) + Audio Pelafalan & Pola Kalimat'
          : bab.elemen === 'Al-Qur’an dan Hadis'
            ? 'Mushaf Slide Tajwid/Tadabbur + Kartu Ayat–Hadis & Checklist Hafalan'
            : 'Slide Tadabbur Nilai + Kartu Konsep Akhlak/Akidah & Studi Kasus Kelas';

  const fokusPertemuanText =
    pertemuanKe === 'Pertemuan 1'
      ? 'Dioptimalkan untuk Pertemuan 1: Apersepsi, Tilawah Dalil & Eksplorasi Konsep Dasar.'
      : pertemuanKe === 'Pertemuan 2'
        ? 'Dioptimalkan untuk Pertemuan 2: Analisis Studi Kasus, LKPD Kelompok & Simulasi Praktik.'
        : pertemuanKe === 'Pertemuan 3'
          ? 'Dioptimalkan untuk Pertemuan 3: Presentasi Karya Siswa, Refleksi & Kuis Sumatif.'
          : 'Mencakup rangkaian lengkap media visual untuk Pertemuan 1 s.d. 3.';

  const slides = [
    {
      nomor: 1,
      judulSlide: materi.judul,
      subjudul: `${mapel} · Fase ${faseData.fase} (${bab.kelas}) · ${pertemuanKe}`,
      poinUtama: [
        `Bab ${bab.nomorBab}: ${bab.judulBab}`,
        materi.ringkasan,
        ...bab.atpList.slice(0, 2).map((a) => `Tujuan: ${a.tujuanPembelajaran}`),
      ],
      catatanGuru:
        'Tampilkan slide pembuka saat apersepsi dan ajak siswa membaca tujuan pembelajaran bersama-sama.',
    },
    {
      nomor: 2,
      judulSlide: `Dalil Al-Qur’an Utama: ${materi.ayatUtama.surah} Ayat ${materi.ayatUtama.ayat}`,
      subjudul: 'Teks Mushaf, Transliterasi & Makna Ayat',
      teksArab: materi.ayatUtama.arab,
      transliterasi: materi.ayatUtama.latin,
      terjemah: materi.ayatUtama.terjemah,
      poinUtama: [
        `Tafsir Ringkas: ${materi.ayatUtama.tafsirSingkat}`,
        `Keterkaitan Materi: ${materi.ayatUtama.keterkaitanMateri}`,
      ],
      catatanGuru:
        'Pimpin pembacaan ayat secara tartil bersama-sama, lalu tunjuk siswa secara bergantian membaca terjemahannya.',
    },
    {
      nomor: 3,
      judulSlide: `Landasan Hadis: ${materi.hadisUtama.perawi}`,
      subjudul: `${materi.hadisUtama.kitab} · Derajat ${materi.hadisUtama.derajat}`,
      teksArab: materi.hadisUtama.arab,
      transliterasi: materi.hadisUtama.latin,
      terjemah: materi.hadisUtama.terjemah,
      poinUtama: [`Hikmah Pedagogis: ${materi.hadisUtama.hikmahPedagogis}`],
      catatanGuru:
        'Bahas konteks sabda Nabi saw. dan minta siswa menandai kata kunci utama yang dapat langsung dipraktikkan hari ini.',
    },
    {
      nomor: 4,
      judulSlide: 'Peta Konsep & Kata Kunci Pembelajaran Mendalam',
      subjudul: `Fokus Konsep: ${materi.kataKunci.join(' · ')}`,
      poinUtama: materi.kataKunci.map(
        (k, idx) =>
          `${idx + 1}. ${k} — dikaji secara Berkesadaran (Mindful) dan Bermakna (Meaningful) sesuai konteks pelajar ${faseData.jenjang}.`
      ),
      catatanGuru:
        'Gunakan papan tulis atau proyektor untuk menghubungkan setiap kata kunci dengan contoh nyata di lingkungan sekolah/madrasah.',
    },
    {
      nomor: 5,
      judulSlide: `Aktivitas Kolaboratif (${pertemuanKe})`,
      subjudul: 'Diskusi Kasus, Praktik Nyata & Karya Kelompok',
      poinUtama: [
        'Bentuk kelompok heterogen (4–5 peserta didik) sesuai kesiapan belajar.',
        `Identifikasi persoalan nyata di sekolah atau media sosial terkait "${materi.kataKunci[0] || materi.judul}".`,
        `Susun solusi berbasis ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} & ${materi.hadisUtama.perawi}.`,
        'Siapkan paparan singkat / simulasi praktik di depan kelas.',
      ],
      catatanGuru:
        'Berikan pendampingan khusus (scaffolding) pada kelompok yang membutuhkan bimbingan membaca dalil.',
    },
    {
      nomor: 6,
      judulSlide: 'Refleksi Hati & Komitmen Amal Saleh 7 Hari',
      subjudul: 'Pembelajaran Menggembirakan & Berkelanjutan',
      poinUtama: [
        `Apa satu hal paling menyentuh dari ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} hari ini?`,
        'Tuliskan satu komitmen kebaikan yang akan diamalkan di rumah & sekolah mulai hari ini.',
        'Tutup pembelajaran dengan hamdalah dan doa kafaratul majelis.',
      ],
      catatanGuru:
        'Berikan apresiasi positif terhadap setiap komitmen siswa dan catat perkembangan sikap pada lembar observasi.',
    },
  ];

  const kartuKonsep = [
    {
      id: 'card-1',
      depan: `${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}`,
      belakang: materi.ayatUtama.tafsirSingkat,
      dalilSingkat: materi.ayatUtama.terjemah,
    },
    {
      id: 'card-2',
      depan: materi.hadisUtama.perawi,
      belakang: materi.hadisUtama.hikmahPedagogis,
      dalilSingkat: materi.hadisUtama.terjemah,
    },
    ...materi.kataKunci.slice(0, 4).map((kw, idx) => ({
      id: `card-kw-${idx + 1}`,
      depan: `Konsep Kunci: ${kw}`,
      belakang: `Penerapan nilai ${kw} pada materi "${materi.judul}" di lingkungan ${faseData.jenjang} (${bab.kelas}).`,
      dalilSingkat: `${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}`,
    })),
  ];

  const aktivitasInteraktif =
    bab.elemen === 'Fikih'
      ? {
          judul: 'Checklist Simulasi Praktik Ibadah / Muamalah',
          instruksi: 'Centang langkah praktik yang sudah diperagakan secara benar oleh siswa/kelompok:',
          itemChecklist: [
            `Membaca niat dan dalil dasar (${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat})`,
            'Menjelaskan syarat sah dan rukun sesuai ketentuan Fikih',
            'Memperagakan urutan praktik secara tertib dan tuma’ninah',
            'Menyebutkan hikmah sosial/spiritual ibadah dalam keseharian',
          ],
        }
      : bab.elemen === 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)'
        ? {
            judul: 'Latihan Pelafalan & Dialog Cepat (Hiwar)',
            instruksi: 'Lakukan praktik berpasangan selama 10 menit dengan panduan langkah berikut:',
            itemChecklist: [
              'Menyimak (Istima’) pelafalan teks Arab dengan makhraj yang tepat',
              'Menyebutkan minimal 5 mufradat inti beserta artinya',
              'Menyusun 2 kalimat tanya jawab sederhana sesuai tema',
              'Menghubungkan tema bacaan dengan pesan ayat Al-Qur’an terkait',
            ],
          }
        : bab.elemen === 'Sejarah Peradaban Islam'
          ? {
              judul: 'Kartu Ibrah & Kronologi Sejarah Islam',
              instruksi: 'Petakan peristiwa sejarah dan nilai keteladanannya secara berkelompok:',
              itemChecklist: [
                'Mengurutkan waktu, tokoh utama, dan latar peristiwa sejarah',
                'Menemukan faktor keberhasilan dakwah/peradaban Islam',
                `Mengaitkan kisah sejarah dengan ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}`,
                'Merumuskan keteladanan sikap untuk pelajar masa kini',
              ],
            }
          : {
              judul: 'Misi Kebaikan & Tadabbur Kontekstual',
              instruksi: 'Tandai langkah penguasaan materi dan pembiasaan akhlak di kelas:',
              itemChecklist: [
                `Membaca tartil & memahami pesan ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat}`,
                `Menghafal pokok sabda Nabi pada ${materi.hadisUtama.perawi}`,
                'Menemukan 1 solusi masalah keseharian berbasis nilai Islam',
                'Menyepakati aksi nyata pembiasaan baik selama 7 hari',
              ],
            };

  return {
    id: `media-${materi.id}`,
    judulPaket: `Media Ajar Interaktif: ${materi.judul}`,
    jenisMediaUtama,
    elemenFokus: `${mapel} · ${bab.elemen}`,
    ringkasanPenggunaan: `${fokusPertemuanText} Media ini sudah tertaut otomatis ke bagian Sarana/Prasarana, Pemanfaatan Digital, dan Pengalaman Belajar Modul Ajar.`,
    slides,
    kartuKonsep,
    aktivitasInteraktif,
  };
}

function esc(s: string): string {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

export function exportMediaSlidesWord(media: PaketMediaOtomatis, schoolName: string, teacherName: string) {
  const slideBlocks = media.slides
    .map(
      (sl) => `
    <div style="border:1.5px solid #065f46; padding:12px; margin-bottom:14px; page-break-inside:avoid;">
      <h2 style="margin-top:0;color:#065f46;background:#ecfdf5;padding:6px 10px;">SLIDE ${sl.nomor}: ${esc(sl.judulSlide)}</h2>
      <p style="color:#475569;margin-top:0;"><strong>${esc(sl.subjudul)}</strong></p>
      ${sl.teksArab ? `<div style="font-family:'Traditional Arabic','Amiri',serif;font-size:17pt;direction:rtl;text-align:right;background:#f8fafc;padding:10px;border:1px solid #cbd5e1;margin:8px 0;">${esc(sl.teksArab)}</div>` : ''}
      ${sl.transliterasi ? `<p><em>${esc(sl.transliterasi)}</em></p>` : ''}
      ${sl.terjemah ? `<p><strong>Artinya:</strong> "${esc(sl.terjemah)}"</p>` : ''}
      <ul>${sl.poinUtama.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <p style="font-size:9pt;color:#334155;background:#f1f5f9;padding:6px;"><strong>Catatan Guru:</strong> ${esc(sl.catatanGuru)}</p>
    </div>`
    )
    .join('');

  const cardRows = media.kartuKonsep
    .map(
      (c, i) => `<tr>
      <td style="text-align:center;">${i + 1}</td>
      <td><strong>${esc(c.depan)}</strong></td>
      <td>${esc(c.belakang)}</td>
      <td><small>${esc(c.dalilSingkat)}</small></td>
    </tr>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="id" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8" />
<title>${esc(media.judulPaket)}</title>
<style>
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 10.5pt; color: #111827; margin: 24px; line-height: 1.45; }
  h1 { font-size: 15pt; color: #065f46; border-bottom: 2px solid #065f46; padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  th, td { border: 1px solid #94a3b8; padding: 6px 8px; vertical-align: top; }
  th { background: #f1f5f9; }
</style>
</head>
<body>
  <h1>PAKET MEDIA PEMBELAJARAN OTOMATIS<br/>${esc(media.judulPaket.toUpperCase())}</h1>
  <p><strong>Satuan Pendidikan:</strong> ${esc(schoolName)} · <strong>Penyusun:</strong> ${esc(teacherName)}<br/>
  <strong>Jenis Media:</strong> ${esc(media.jenisMediaUtama)} (${esc(media.elemenFokus)})</p>
  ${slideBlocks}
  <h2 style="color:#065f46;">KARTU KONSEP & FLASHCARD SIAP CETAK</h2>
  <table>
    <tr><th width="6%">No</th><th width="24%">Sisi Depan Kartu</th><th width="40%">Penjelasan Sisi Belakang</th><th width="30%">Landasan Dalil</th></tr>
    ${cardRows}
  </table>
</body>
</html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `media-ajar-pai-${media.id}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
