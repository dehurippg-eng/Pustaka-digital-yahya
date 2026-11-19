import React, { useMemo, useState } from 'react';
import { BookOpen, ChevronRight, Download, FileText, Loader2, Printer, Sparkles } from 'lucide-react';
import { exportCpAtpAsWordDoc } from '../data/cpAtpExporter';
import { getKurikulumByJalur } from '../data/kurikulum2026';
import { exploreDalilAiApi, type DalilEnrichment } from '../lib/api';
import type {
  BabPilihan,
  ElemenPAI,
  FaseKurikulum2026,
  JalurKurikulum,
  Jenjang,
  MapelPAI,
  MateriPilihan,
  PertemuanOption,
  UserAccount,
} from '../types/curriculum';

const PERTEMUAN_OPTIONS: PertemuanOption[] = [
  'Pertemuan 1',
  'Pertemuan 2',
  'Pertemuan 3',
  'Pertemuan 1–3 (Utuh)',
];

interface CurriculumExplorerProps {
  isAuthenticated: boolean;
  user?: UserAccount | null;
  onCreateModuleFromSelection?: (
    faseData: FaseKurikulum2026,
    bab: BabPilihan,
    materi: MateriPilihan,
    pertemuanKe: PertemuanOption
  ) => void;
  onRequireLogin?: () => void;
}

const JALUR_OPTIONS: JalurKurikulum[] = [
  'Sekolah (PAI & Budi Pekerti)',
  'Madrasah (Kemenag RI)',
];

const JENJANG_OPTIONS: Jenjang[] = ['SD/MI', 'SMP/MTs', 'SMA/MA'];

type SemesterFilter = 'Semua' | 'Ganjil' | 'Genap';

const SEMESTER_OPTIONS: { id: SemesterFilter; label: string }[] = [
  { id: 'Semua', label: 'Semester 1 & 2' },
  { id: 'Ganjil', label: 'Semester 1 (Ganjil)' },
  { id: 'Genap', label: 'Semester 2 (Genap)' },
];

const ELEMEN_SEKOLAH_OPTIONS: ('Semua Elemen' | ElemenPAI)[] = [
  'Semua Elemen',
  'Al-Qur’an dan Hadis',
  'Akidah',
  'Akhlak',
  'Fikih',
  'Sejarah Peradaban Islam',
];

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  isAuthenticated,
  user,
  onCreateModuleFromSelection,
  onRequireLogin,
}) => {
  const [selectedJalur, setSelectedJalur] = useState<JalurKurikulum>('Sekolah (PAI & Budi Pekerti)');
  const [selectedJenjang, setSelectedJenjang] = useState<Jenjang>('SD/MI');
  const [selectedSemester, setSelectedSemester] = useState<SemesterFilter>('Semua');
  const [selectedPertemuan, setSelectedPertemuan] = useState<PertemuanOption>('Pertemuan 1');
  const [showCpAtpPrintSheet, setShowCpAtpPrintSheet] = useState(false);
  const [printMeta, setPrintMeta] = useState({
    satuanPendidikan: user?.school || 'Sekolah / Madrasah PAI',
    namaGuru: user?.name || 'Guru PAI & Budi Pekerti',
    nipGuru: user?.nip || '-',
    namaKepsek: 'Kepala Sekolah / Madrasah',
    nipKepsek: '-',
    kotaPenetapan: 'Indonesia',
    tahunAjaran: '2026/2027',
  });

  const kurikulumJalur = useMemo(
    () => getKurikulumByJalur(selectedJalur),
    [selectedJalur]
  );

  const fasesForJenjang = useMemo(
    () => kurikulumJalur.filter((f) => f.jenjang === selectedJenjang),
    [kurikulumJalur, selectedJenjang]
  );

  const [selectedFaseCode, setSelectedFaseCode] = useState<string>(
    fasesForJenjang[0]?.fase || 'A'
  );
  const activeFase = useMemo(
    () =>
      fasesForJenjang.find((f) => f.fase === selectedFaseCode) ||
      fasesForJenjang[0] ||
      kurikulumJalur[0],
    [fasesForJenjang, selectedFaseCode, kurikulumJalur]
  );

  const [selectedElemen, setSelectedElemen] = useState<'Semua Elemen' | ElemenPAI>('Semua Elemen');
  const [selectedMapel, setSelectedMapel] = useState<'Semua Mapel' | MapelPAI>('Semua Mapel');

  const availableMapelInFase = useMemo(() => {
    const mapels = new Set<MapelPAI>();
    activeFase.capaianPembelajaran.forEach((c) => {
      if (c.mapel) mapels.add(c.mapel);
    });
    activeFase.babList.forEach((b) => {
      if (b.mapel) mapels.add(b.mapel);
    });
    return ['Semua Mapel', ...Array.from(mapels)] as ('Semua Mapel' | MapelPAI)[];
  }, [activeFase]);

  const filteredBabs = useMemo(() => {
    return activeFase.babList.filter((bab) => {
      const matchSemester =
        selectedSemester === 'Semua' || bab.semester === selectedSemester;
      const matchFilter =
        selectedJalur === 'Madrasah (Kemenag RI)'
          ? selectedMapel === 'Semua Mapel' || bab.mapel === selectedMapel
          : selectedElemen === 'Semua Elemen' || bab.elemen === selectedElemen;
      return matchSemester && matchFilter;
    });
  }, [activeFase, selectedSemester, selectedJalur, selectedMapel, selectedElemen]);

  const [selectedBabId, setSelectedBabId] = useState<string>(filteredBabs[0]?.id || '');
  const activeBab = useMemo(
    () => filteredBabs.find((b) => b.id === selectedBabId) || filteredBabs[0],
    [filteredBabs, selectedBabId]
  );

  const [selectedMateriId, setSelectedMateriId] = useState<string>(
    activeBab?.materiList[0]?.id || ''
  );
  const activeMateri = useMemo(
    () =>
      activeBab?.materiList.find((m) => m.id === selectedMateriId) ||
      activeBab?.materiList[0],
    [activeBab, selectedMateriId]
  );

  const [enrichmentMap, setEnrichmentMap] = useState<Record<string, DalilEnrichment>>({});
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState('');

  const resetSelectionFromFase = (faseObj?: FaseKurikulum2026) => {
    if (!faseObj) return;
    setSelectedFaseCode(faseObj.fase);
    setSelectedElemen('Semua Elemen');
    setSelectedMapel('Semua Mapel');
    setSelectedSemester('Semua');
    const firstBab = faseObj.babList[0];
    setSelectedBabId(firstBab?.id || '');
    setSelectedMateriId(firstBab?.materiList[0]?.id || '');
    setAiError('');
  };

  const handleJalurChange = (jalur: JalurKurikulum) => {
    setSelectedJalur(jalur);
    const list = getKurikulumByJalur(jalur);
    const firstFase = list.find((f) => f.jenjang === selectedJenjang) || list[0];
    resetSelectionFromFase(firstFase);
  };

  const handleJenjangChange = (jenjang: Jenjang) => {
    setSelectedJenjang(jenjang);
    const firstFase = kurikulumJalur.find((f) => f.jenjang === jenjang) || kurikulumJalur[0];
    resetSelectionFromFase(firstFase);
  };

  const handleFaseChange = (faseCode: string) => {
    const found = fasesForJenjang.find((f) => f.fase === faseCode);
    resetSelectionFromFase(found);
  };

  const handleExploreDalilAi = async () => {
    if (!isAuthenticated) {
      onRequireLogin?.();
      return;
    }
    if (!activeBab || !activeMateri) return;
    setLoadingAi(true);
    setAiError('');
    try {
      const res = await exploreDalilAiApi({
        jenjang: activeFase.jenjang,
        jalur: selectedJalur,
        mataPelajaran: activeBab.mapel || 'PAI dan Budi Pekerti',
        fase: activeFase.fase,
        kelas: activeBab.kelas,
        babJudul: activeBab.judulBab,
        materiJudul: activeMateri.judul,
        ayatUtama: activeMateri.ayatUtama,
        hadisUtama: activeMateri.hadisUtama,
      });
      setEnrichmentMap((prev) => ({
        ...prev,
        [activeMateri.id]: res.enrichment,
      }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Gagal memperdalam dalil.');
    } finally {
      setLoadingAi(false);
    }
  };

  const activeEnrichment = activeMateri ? enrichmentMap[activeMateri.id] : undefined;

  const filteredCP = useMemo(() => {
    return activeFase.capaianPembelajaran.filter((cp) => {
      if (selectedJalur === 'Madrasah (Kemenag RI)') {
        return selectedMapel === 'Semua Mapel' || cp.mapel === selectedMapel;
      }
      return selectedElemen === 'Semua Elemen' || cp.elemen === selectedElemen;
    });
  }, [activeFase, selectedJalur, selectedMapel, selectedElemen]);

  return (
    <div className="space-y-6">
      <section className="no-print bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col gap-4 pb-5 border-b border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-emerald-700 mb-1">
                Standar Nasional 2026 · Sekolah (PAI & Budi Pekerti) & Madrasah (Kemenag RI) · Semester 1 & 2
              </p>
              <h2 className="text-xl font-bold text-slate-900">
                Capaian Pembelajaran (CP) & Alur Tujuan Pembelajaran (ATP) 2026
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {JALUR_OPTIONS.map((jalur) => (
                  <button
                    key={jalur}
                    type="button"
                    onClick={() => handleJalurChange(jalur)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedJalur === jalur
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {jalur}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-slate-600">
              Dokumen CP & ATP lengkap siap cetak PDF atau unduh Microsoft Word untuk administrasi guru:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCpAtpPrintSheet((v) => !v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  showCpAtpPrintSheet
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showCpAtpPrintSheet ? 'Tutup Tampilan Cetak CP & ATP' : 'Pratinjau Dokumen CP & ATP Siap Cetak'}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  exportCpAtpAsWordDoc({
                    jalur: selectedJalur,
                    faseData: activeFase,
                    semesterFilter: selectedSemester,
                    mapelFilter:
                      selectedJalur === 'Madrasah (Kemenag RI)' ? selectedMapel : selectedElemen,
                    cpList: filteredCP,
                    babs: filteredBabs,
                    ...printMeta,
                  })
                }
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Word CP & ATP (.doc)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!showCpAtpPrintSheet) {
                    setShowCpAtpPrintSheet(true);
                    setTimeout(() => window.print(), 140);
                  } else {
                    window.print();
                  }
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / PDF CP & ATP</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {JENJANG_OPTIONS.map((jenjang) => (
                  <button
                    key={jenjang}
                    type="button"
                    onClick={() => handleJenjangChange(jenjang)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedJenjang === jenjang
                        ? 'bg-white text-emerald-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {jenjang}
                  </button>
                ))}
              </div>

              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {fasesForJenjang.map((f) => (
                  <button
                    key={f.fase}
                    type="button"
                    onClick={() => handleFaseChange(f.fase)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFase.fase === f.fase
                        ? 'bg-emerald-700 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Fase {f.fase} ({f.kelasRentang})
                  </button>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {SEMESTER_OPTIONS.map((sem) => (
                <button
                  key={sem.id}
                  type="button"
                  onClick={() => setSelectedSemester(sem.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedSemester === sem.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sem.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Rasional & Rumusan CP {activeFase.labelLengkap}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{activeFase.rasional2026}</p>

            {selectedJalur === 'Madrasah (Kemenag RI)' ? (
              <div className="pt-2">
                <label
                  htmlFor="filter-mapel-madrasah"
                  className="block text-xs font-medium text-slate-500 mb-1.5"
                >
                  Filter Mata Pelajaran Khusus Madrasah
                </label>
                <select
                  id="filter-mapel-madrasah"
                  value={selectedMapel}
                  onChange={(e) => setSelectedMapel(e.target.value as 'Semua Mapel' | MapelPAI)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {availableMapelInFase.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="pt-2">
                <label
                  htmlFor="filter-elemen"
                  className="block text-xs font-medium text-slate-500 mb-1.5"
                >
                  Filter Elemen Capaian Pembelajaran
                </label>
                <select
                  id="filter-elemen"
                  value={selectedElemen}
                  onChange={(e) => setSelectedElemen(e.target.value as 'Semua Elemen' | ElemenPAI)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {ELEMEN_SEKOLAH_OPTIONS.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-4 text-xs font-semibold text-slate-700 w-48">
                      {selectedJalur === 'Madrasah (Kemenag RI)'
                        ? 'Mata Pelajaran Madrasah'
                        : 'Elemen PAI'}
                    </th>
                    <th className="py-2.5 px-4 text-xs font-semibold text-slate-700">
                      Deskripsi Capaian Pembelajaran (CP 2026)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredCP.map((cp, idx) => (
                    <tr key={`${cp.elemen}-${cp.mapel || idx}`} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-medium text-emerald-800 align-top">
                        <div>{cp.mapel || cp.elemen}</div>
                        {cp.mapel && cp.mapel !== cp.elemen && (
                          <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                            {cp.elemen}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600 leading-relaxed">
                        {cp.deskripsiCP}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showCpAtpPrintSheet && (
        <section className="print-container bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="no-print grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 pb-5 border-b border-slate-200">
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Satuan Pendidikan
              </label>
              <input
                type="text"
                value={printMeta.satuanPendidikan}
                onChange={(e) => setPrintMeta({ ...printMeta, satuanPendidikan: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Nama Guru Penyusun
              </label>
              <input
                type="text"
                value={printMeta.namaGuru}
                onChange={(e) => setPrintMeta({ ...printMeta, namaGuru: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Nama Kepala Sekolah
              </label>
              <input
                type="text"
                value={printMeta.namaKepsek}
                onChange={(e) => setPrintMeta({ ...printMeta, namaKepsek: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                NIP Kepsek
              </label>
              <input
                type="text"
                value={printMeta.nipKepsek}
                onChange={(e) => setPrintMeta({ ...printMeta, nipKepsek: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Kota Pengesahan
              </label>
              <input
                type="text"
                value={printMeta.kotaPenetapan}
                onChange={(e) => setPrintMeta({ ...printMeta, kotaPenetapan: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <header className="text-center pb-4 border-b-2 border-emerald-800 space-y-1">
            <p className="text-xs font-semibold text-emerald-700 tracking-wide">
              DOKUMEN PERANGKAT KURIKULUM MERDEKA 2026 · {selectedJalur.toUpperCase()}
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              CAPAIAN PEMBELAJARAN (CP) & ALUR TUJUAN PEMBELAJARAN (ATP)
            </h3>
            <p className="text-xs text-slate-600">
              {printMeta.satuanPendidikan} · {activeFase.labelLengkap} · Semester{' '}
              {selectedSemester === 'Semua' ? '1 & 2 (Ganjil & Genap)' : selectedSemester} · Tahun
              Ajaran {printMeta.tahunAjaran}
            </p>
          </header>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg">
              A. Capaian Pembelajaran (CP) Tahun 2026
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">{activeFase.rasional2026}</p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold text-slate-700 w-10 text-center">No</th>
                    <th className="py-2 px-3 font-semibold text-slate-700 w-48">Elemen / Mapel</th>
                    <th className="py-2 px-3 font-semibold text-slate-700">
                      Rumusan Capaian Pembelajaran (CP)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCP.map((cp, i) => (
                    <tr key={`${cp.elemen}-${cp.mapel || i}`}>
                      <td className="py-2 px-3 text-center font-mono tabular-nums">{i + 1}</td>
                      <td className="py-2 px-3 font-semibold text-emerald-900">
                        {cp.mapel || cp.elemen}
                      </td>
                      <td className="py-2 px-3 text-slate-700 leading-relaxed">{cp.deskripsiCP}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg">
              B. Alur Tujuan Pembelajaran (ATP) & Integrasi Dalil Al-Qur’an / Hadis
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2 px-3 font-semibold text-slate-700">Kode ATP</th>
                    <th className="py-2 px-3 font-semibold text-slate-700">Sem / Kelas</th>
                    <th className="py-2 px-3 font-semibold text-slate-700">Bab & Tujuan Pembelajaran</th>
                    <th className="py-2 px-3 font-semibold text-slate-700">Materi & Dalil Terkait</th>
                    <th className="py-2 px-3 font-semibold text-slate-700">Profil Lulusan 2026</th>
                    <th className="py-2 px-3 font-semibold text-slate-700 text-center">JP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBabs.flatMap((bab) =>
                    bab.atpList.map((atp) => (
                      <tr key={atp.kode}>
                        <td className="py-2 px-3 font-mono font-semibold text-emerald-800 whitespace-nowrap">
                          {atp.kode}
                        </td>
                        <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                          Sem {atp.semester === 'Ganjil' ? '1' : '2'} · {atp.kelas}
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          <p className="font-semibold text-slate-900">
                            Bab {bab.nomorBab}: {bab.judulBab}
                          </p>
                          <p className="mt-0.5">{atp.tujuanPembelajaran}</p>
                        </td>
                        <td className="py-2 px-3 text-slate-600">
                          {bab.materiList.map((m) => (
                            <div key={m.id} className="mb-1 last:mb-0">
                              <span className="font-medium text-slate-800">{m.judul}</span>
                              <span className="block text-[11px] text-emerald-800">
                                {m.ayatUtama.surah}: {m.ayatUtama.ayat} · {m.hadisUtama.perawi}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="py-2 px-3 text-slate-600">
                          {atp.dimensiProfilLulusan.join(', ')}
                        </td>
                        <td className="py-2 px-3 text-center font-mono tabular-nums font-semibold">
                          {atp.alokasiJP}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-8 text-xs text-center print-avoid-break">
            <div>
              <p className="text-slate-600">Mengetahui,</p>
              <p className="font-semibold text-slate-900">Kepala {printMeta.satuanPendidikan}</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{printMeta.namaKepsek}</p>
              <p className="font-mono text-slate-600">
                NIP. {printMeta.nipKepsek !== '-' ? printMeta.nipKepsek : '................................'}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                {printMeta.kotaPenetapan},{' '}
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="font-semibold text-slate-900">Guru Mata Pelajaran</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{printMeta.namaGuru}</p>
              <p className="font-mono text-slate-600">
                NIP. {printMeta.nipGuru !== '-' ? printMeta.nipGuru : '................................'}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="no-print grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-base font-bold text-slate-900">Bab & Materi Pilihan</h3>
              <span className="text-xs font-mono tabular-nums text-slate-500">
                {filteredBabs.length} Bab
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Pilih bab dan materi untuk melihat keterkaitan langsung dengan Al-Qur’an & Hadis.
            </p>

            {filteredBabs.length === 0 ? (
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600 space-y-2">
                <p>
                  Belum ada bab pada kombinasi filter{' '}
                  <span className="font-semibold">
                    {selectedJalur === 'Madrasah (Kemenag RI)' ? selectedMapel : selectedElemen}
                  </span>{' '}
                  dan{' '}
                  <span className="font-semibold">
                    {selectedSemester === 'Semua'
                      ? 'Semua Semester'
                      : selectedSemester === 'Ganjil'
                      ? 'Semester 1 (Ganjil)'
                      : 'Semester 2 (Genap)'}
                  </span>{' '}
                  di fase ini.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSemester('Semua');
                    setSelectedMapel('Semua Mapel');
                    setSelectedElemen('Semua Elemen');
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 font-medium hover:bg-slate-100 cursor-pointer"
                >
                  Tampilkan Semua Bab di Fase {activeFase.fase}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBabs.map((bab) => {
                  const isSelectedBab = activeBab?.id === bab.id;
                  return (
                    <div
                      key={bab.id}
                      className={`border rounded-lg transition-colors ${
                        isSelectedBab
                          ? 'border-emerald-600 bg-emerald-50/40'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBabId(bab.id);
                          setSelectedMateriId(bab.materiList[0]?.id || '');
                          setAiError('');
                        }}
                        className="w-full text-left p-3.5 cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                          <span>
                            Bab {bab.nomorBab} · {bab.kelas} · Semester{' '}
                            {bab.semester === 'Ganjil' ? '1 (Ganjil)' : '2 (Genap)'}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 ${
                              isSelectedBab ? 'text-emerald-700' : 'text-slate-400'
                            }`}
                          />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 leading-snug">
                          {bab.judulBab}
                        </p>
                        <p className="text-xs text-emerald-800 mt-1">
                          {bab.mapel || 'PAI dan Budi Pekerti'} · {bab.elemen}
                        </p>
                      </button>

                      {isSelectedBab && (
                        <div className="px-3.5 pb-3.5 pt-2 border-t border-emerald-200/60 space-y-1.5">
                          <p className="text-xs font-medium text-slate-600">Materi Terhubung:</p>
                          {bab.materiList.map((mat) => (
                            <button
                              key={mat.id}
                              type="button"
                              onClick={() => setSelectedMateriId(mat.id)}
                              className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors cursor-pointer ${
                                activeMateri?.id === mat.id
                                  ? 'bg-emerald-700 text-white font-medium'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {mat.kode} — {mat.judul}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {activeBab && (
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Alur Tujuan Pembelajaran (ATP 2026) — Bab {activeBab.nomorBab}
              </h3>
              <div className="space-y-3">
                {activeBab.atpList.map((atp) => (
                  <div
                    key={atp.kode}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-emerald-800">
                        {atp.kode}
                      </span>
                      <span className="font-mono tabular-nums text-slate-600">
                        {atp.alokasiJP} JP · {atp.kelas} · Sem{' '}
                        {atp.semester === 'Ganjil' ? '1' : '2'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {atp.tujuanPembelajaran}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Profil Lulusan: {atp.dimensiProfilLulusan.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-8 space-y-5">
          {activeBab && activeMateri ? (
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    {selectedJalur} · {activeBab.mapel || 'PAI dan Budi Pekerti'} · Fase{' '}
                    {activeFase.fase} · {activeBab.kelas} · Semester{' '}
                    {activeBab.semester === 'Ganjil' ? '1 (Ganjil)' : '2 (Genap)'}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {activeMateri.judul}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {activeMateri.ringkasan}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Kata kunci: {activeMateri.kataKunci.join(' · ')}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="text-[11px] font-medium text-slate-500">
                      Pilih Target Pertemuan sebelum menyusun modul:
                    </span>
                    <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
                      {PERTEMUAN_OPTIONS.map((pt) => (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setSelectedPertemuan(pt)}
                          className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            selectedPertemuan === pt
                              ? 'bg-white text-emerald-800 shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!isAuthenticated) {
                        onRequireLogin?.();
                        return;
                      }
                      onCreateModuleFromSelection?.(
                        activeFase,
                        activeBab,
                        activeMateri,
                        selectedPertemuan
                      );
                    }}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Susun Modul Ajar ({selectedPertemuan})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExploreDalilAi}
                    disabled={loadingAi}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
                  >
                    {loadingAi ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>
                      {loadingAi ? 'Memperdalam Tafsir...' : 'Perdalam Tafsir & Dalil Pendukung'}
                    </span>
                  </button>
                </div>
              </div>

              {aiError && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
                  {aiError}
                </div>
              )}

              <div className="border border-emerald-200 bg-emerald-50/35 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-sm font-bold text-emerald-950">
                      Integrasi Ayat Al-Qur’an Utama
                    </h4>
                  </div>
                  <span className="text-xs font-medium text-emerald-800">
                    {activeMateri.ayatUtama.surah} · Ayat {activeMateri.ayatUtama.ayat}
                  </span>
                </div>

                <p className="font-arabic text-2xl sm:text-3xl text-slate-900 bg-white border border-emerald-100 rounded-lg p-5 text-right">
                  {activeMateri.ayatUtama.arab}
                </p>

                <div className="space-y-2 text-sm">
                  <p className="italic text-slate-600">{activeMateri.ayatUtama.latin}</p>
                  <p className="text-slate-900 font-medium leading-relaxed">
                    Artinya: “{activeMateri.ayatUtama.terjemah}”
                  </p>
                  <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div>
                      <p className="font-semibold text-emerald-900 mb-1">Tafsir Ringkas</p>
                      <p className="leading-relaxed">{activeMateri.ayatUtama.tafsirSingkat}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900 mb-1">
                        Keterkaitan dengan Materi
                      </p>
                      <p className="leading-relaxed">
                        {activeMateri.ayatUtama.keterkaitanMateri}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-amber-200 bg-amber-50/35 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Hadis Nabawi yang Relevan
                  </h4>
                  <span className="text-xs font-medium text-amber-900">
                    {activeMateri.hadisUtama.perawi} · Derajat {activeMateri.hadisUtama.derajat}
                  </span>
                </div>

                <p className="font-arabic text-xl sm:text-2xl text-slate-900 bg-white border border-amber-100 rounded-lg p-5 text-right">
                  {activeMateri.hadisUtama.arab}
                </p>

                <div className="space-y-2 text-sm">
                  <p className="italic text-slate-600">{activeMateri.hadisUtama.latin}</p>
                  <p className="text-slate-900 font-medium leading-relaxed">
                    Artinya: “{activeMateri.hadisUtama.terjemah}”
                  </p>
                  <div className="pt-2 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Sumber Kitab</p>
                      <p>{activeMateri.hadisUtama.kitab}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Hikmah Pedagogis</p>
                      <p className="leading-relaxed">
                        {activeMateri.hadisUtama.hikmahPedagogis}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {activeEnrichment && (
                <div className="border border-slate-200 bg-slate-50 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">
                    Pendalaman Tafsir, Dalil Pendukung & Strategi Deep Learning
                  </h4>
                  <div className="text-sm text-slate-700 space-y-2">
                    <p className="font-semibold text-slate-900">Asbabun Nuzul / Konteks Ayat</p>
                    <p className="leading-relaxed">{activeEnrichment.konteksAyat}</p>
                  </div>

                  {activeEnrichment.ayatPendukung?.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-semibold text-slate-700">
                        Ayat Al-Qur’an Pendukung
                      </p>
                      {activeEnrichment.ayatPendukung.map((ap, i) => (
                        <div
                          key={`${ap.surah}-${i}`}
                          className="bg-white border border-slate-200 rounded-lg p-4 space-y-2"
                        >
                          <p className="text-xs font-semibold text-emerald-800">
                            {ap.surah} · Ayat {ap.ayat}
                          </p>
                          <p className="font-arabic text-xl text-slate-900 text-right">{ap.arab}</p>
                          <p className="text-xs italic text-slate-600">{ap.latin}</p>
                          <p className="text-sm text-slate-800">“{ap.terjemah}”</p>
                          <p className="text-xs text-slate-600">{ap.keterkaitan}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeEnrichment.hadisPendukung && (
                    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
                      <p className="text-xs font-semibold text-amber-900">
                        Hadis Pendukung · {activeEnrichment.hadisPendukung.perawi} (
                        {activeEnrichment.hadisPendukung.derajat})
                      </p>
                      <p className="font-arabic text-lg text-slate-900 text-right">
                        {activeEnrichment.hadisPendukung.arab}
                      </p>
                      <p className="text-sm text-slate-800">
                        “{activeEnrichment.hadisPendukung.terjemah}”
                      </p>
                      <p className="text-xs text-slate-600">
                        {activeEnrichment.hadisPendukung.hikmah}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900 mb-1">
                      Strategi Mengajar Berkesadaran, Bermakna & Menggembirakan
                    </p>
                    <p className="leading-relaxed">{activeEnrichment.strategiDeepLearning}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
              Pilih salah satu Bab dan Materi Pilihan di sebelah kiri untuk meninjau keterkaitan
              ayat Al-Qur’an dan hadis.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
