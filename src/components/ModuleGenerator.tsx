import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  Download,
  Loader2,
  Printer,
  Save,
  Sparkles,
  Check,
  FileText,
} from 'lucide-react';
import {
  getKurikulumByJalur,
  MODEL_PEMBELAJARAN_DEEP_LEARNING,
} from '../data/kurikulum2026';
import {
  buildTemplateDeepLearningModule,
  exportModuleAsWordDoc,
} from '../data/moduleBuilder';
import { buildAutoMediaForMateri } from '../data/mediaBuilder';
import { generateModuleAiApi, saveModuleApi } from '../lib/api';
import { MediaStudioWidget } from './MediaStudioWidget';
import type {
  BabPilihan,
  FaseKurikulum2026,
  JalurKurikulum,
  Jenjang,
  MapelPAI,
  MateriPilihan,
  ModulAjarDeepLearning,
  PertemuanOption,
  UserAccount,
} from '../types/curriculum';

const PERTEMUAN_OPTIONS: { id: PertemuanOption; hint: string; jp: number }[] = [
  { id: 'Pertemuan 1', hint: 'Fondasi Dalil, Tadabbur & Diagnostik Awal', jp: 2 },
  { id: 'Pertemuan 2', hint: 'Kolaborasi LKPD, Studi Kasus & Aplikasi Nyata', jp: 2 },
  { id: 'Pertemuan 3', hint: 'Presentasi Karya, Refleksi & Sumatif HOTS', jp: 2 },
  { id: 'Pertemuan 1–3 (Utuh)', hint: 'Paket Lengkap 1 Bab (3 Pertemuan)', jp: 6 },
];

interface ModuleGeneratorProps {
  user: UserAccount;
  initialSelection?: {
    faseData: FaseKurikulum2026;
    bab: BabPilihan;
    materi: MateriPilihan;
    pertemuanKe?: PertemuanOption;
  } | null;
  loadedModule?: ModulAjarDeepLearning | null;
  onModuleSaved: (saved: ModulAjarDeepLearning) => void;
}

type SectionTab =
  | 'all'
  | 'inti'
  | 'media'
  | 'l1'
  | 'l2'
  | 'l3'
  | 'l4'
  | 'l5'
  | 'l6'
  | 'l7'
  | 'l8';

const SECTION_TABS: { id: SectionTab; label: string }[] = [
  { id: 'all', label: 'Semua (Inti + Media + 8 Lampiran)' },
  { id: 'inti', label: 'Dokumen Inti' },
  { id: 'media', label: 'Media Ajar Otomatis' },
  { id: 'l1', label: 'Lampiran 1 · Bahan Ajar' },
  { id: 'l2', label: 'Lampiran 2 · LKPD' },
  { id: 'l3', label: 'Lampiran 3 · Asesmen Awal' },
  { id: 'l4', label: 'Lampiran 4 · Formatif' },
  { id: 'l5', label: 'Lampiran 5 · Sumatif HOTS' },
  { id: 'l6', label: 'Lampiran 6 · Pengayaan/Remedial' },
  { id: 'l7', label: 'Lampiran 7 · Refleksi' },
  { id: 'l8', label: 'Lampiran 8 · Glosarium/Pustaka' },
];

export const ModuleGenerator: React.FC<ModuleGeneratorProps> = ({
  user,
  initialSelection,
  loadedModule,
  onModuleSaved,
}) => {
  const [selectedJalur, setSelectedJalur] = useState<JalurKurikulum>(
    initialSelection?.faseData.jalur || 'Sekolah (PAI & Budi Pekerti)'
  );
  const [selectedJenjang, setSelectedJenjang] = useState<Jenjang>(
    initialSelection?.faseData.jenjang || 'SD/MI'
  );
  const [selectedSemester, setSelectedSemester] = useState<'Semua' | 'Ganjil' | 'Genap'>('Semua');
  const [selectedMapel, setSelectedMapel] = useState<'Semua Mapel' | MapelPAI>('Semua Mapel');

  const kurikulumJalur = useMemo(
    () => getKurikulumByJalur(selectedJalur),
    [selectedJalur]
  );

  const fasesForJenjang = useMemo(
    () => kurikulumJalur.filter((f) => f.jenjang === selectedJenjang),
    [kurikulumJalur, selectedJenjang]
  );

  const [selectedFaseCode, setSelectedFaseCode] = useState<string>(
    initialSelection?.faseData.fase || fasesForJenjang[0]?.fase || 'A'
  );
  const activeFase = useMemo(
    () =>
      fasesForJenjang.find((f) => f.fase === selectedFaseCode) ||
      fasesForJenjang[0] ||
      kurikulumJalur[0],
    [fasesForJenjang, selectedFaseCode, kurikulumJalur]
  );

  const availableMapels = useMemo(() => {
    const set = new Set<MapelPAI>();
    activeFase.babList.forEach((b) => {
      if (b.mapel) set.add(b.mapel);
    });
    return ['Semua Mapel', ...Array.from(set)] as ('Semua Mapel' | MapelPAI)[];
  }, [activeFase]);

  const filteredBabs = useMemo(() => {
    const matched = activeFase.babList.filter((b) => {
      const okSem = selectedSemester === 'Semua' || b.semester === selectedSemester;
      const okMapel =
        selectedMapel === 'Semua Mapel' || (b.mapel || 'PAI dan Budi Pekerti') === selectedMapel;
      return okSem && okMapel;
    });
    return matched.length > 0 ? matched : activeFase.babList;
  }, [activeFase, selectedSemester, selectedMapel]);

  const [selectedBabId, setSelectedBabId] = useState<string>(
    initialSelection?.bab.id || filteredBabs[0]?.id || ''
  );
  const activeBab = useMemo(
    () => filteredBabs.find((b) => b.id === selectedBabId) || filteredBabs[0],
    [filteredBabs, selectedBabId]
  );

  const [selectedMateriId, setSelectedMateriId] = useState<string>(
    initialSelection?.materi.id || activeBab?.materiList[0]?.id || ''
  );
  const activeMateri = useMemo(
    () =>
      activeBab?.materiList.find((m) => m.id === selectedMateriId) ||
      activeBab?.materiList[0],
    [activeBab, selectedMateriId]
  );

  const [satuanPendidikan, setSatuanPendidikan] = useState<string>(
    user.school || 'Sekolah/Madrasah PAI'
  );
  const [selectedPertemuan, setSelectedPertemuan] = useState<PertemuanOption>(
    initialSelection?.pertemuanKe || 'Pertemuan 1'
  );
  const [alokasiJP, setAlokasiJP] = useState<number>(
    initialSelection?.pertemuanKe === 'Pertemuan 1–3 (Utuh)' ? 6 : 2
  );
  const [modelPembelajaran, setModelPembelajaran] = useState<string>(
    MODEL_PEMBELAJARAN_DEEP_LEARNING[0]
  );
  const [catatanKonteks, setCatatanKonteks] = useState<string>('');
  const [namaKepsek, setNamaKepsek] = useState<string>('Kepala Sekolah / Madrasah');
  const [nipKepsek, setNipKepsek] = useState<string>('-');
  const [kotaPenetapan, setKotaPenetapan] = useState<string>('Indonesia');
  const [tanggalPenetapan, setTanggalPenetapan] = useState<string>(
    new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  );

  const [currentModule, setCurrentModule] = useState<ModulAjarDeepLearning>(() => {
    if (loadedModule) return loadedModule;
    return buildTemplateDeepLearningModule({
      faseData: activeFase,
      bab: activeBab,
      materi: activeMateri,
      user,
      satuanPendidikan: user.school || 'Sekolah/Madrasah PAI',
      alokasiJP: initialSelection?.pertemuanKe === 'Pertemuan 1–3 (Utuh)' ? 6 : 2,
      pertemuanKe: initialSelection?.pertemuanKe || 'Pertemuan 1',
      modelPembelajaran: MODEL_PEMBELAJARAN_DEEP_LEARNING[0],
      jalur: selectedJalur,
      mataPelajaran: activeBab?.mapel || 'PAI dan Budi Pekerti',
      namaKepsek: 'Kepala Sekolah / Madrasah',
      nipKepsek: '-',
      kotaPenetapan: 'Indonesia',
      tanggalPenetapan: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    });
  });

  const [activeTab, setActiveTab] = useState<SectionTab>('all');
  const [generatingAi, setGeneratingAi] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (loadedModule) {
      setCurrentModule(loadedModule);
      setSatuanPendidikan(loadedModule.identitas.satuanPendidikan);
      if (loadedModule.identitas.pertemuanKe) {
        setSelectedPertemuan(loadedModule.identitas.pertemuanKe);
      }
      setNamaKepsek(loadedModule.identitas.namaKepsek || 'Kepala Sekolah / Madrasah');
      setNipKepsek(loadedModule.identitas.nipKepsek || '-');
      setKotaPenetapan(loadedModule.identitas.kotaPenetapan || 'Indonesia');
      if (loadedModule.identitas.tanggalPenetapan) {
        setTanggalPenetapan(loadedModule.identitas.tanggalPenetapan);
      }
      setActiveTab('all');
      setError('');
    }
  }, [loadedModule]);

  useEffect(() => {
    if (initialSelection) {
      const nextJalur = initialSelection.faseData.jalur || 'Sekolah (PAI & Budi Pekerti)';
      const nextPertemuan = initialSelection.pertemuanKe || selectedPertemuan;
      const nextJp = nextPertemuan === 'Pertemuan 1–3 (Utuh)' ? 6 : 2;
      setSelectedJalur(nextJalur);
      setSelectedJenjang(initialSelection.faseData.jenjang);
      setSelectedFaseCode(initialSelection.faseData.fase);
      setSelectedSemester('Semua');
      setSelectedMapel('Semua Mapel');
      setSelectedBabId(initialSelection.bab.id);
      setSelectedMateriId(initialSelection.materi.id);
      setSelectedPertemuan(nextPertemuan);
      setAlokasiJP(nextJp);
      setCurrentModule(
        buildTemplateDeepLearningModule({
          faseData: initialSelection.faseData,
          bab: initialSelection.bab,
          materi: initialSelection.materi,
          user,
          satuanPendidikan,
          alokasiJP: nextJp,
          pertemuanKe: nextPertemuan,
          modelPembelajaran,
          jalur: nextJalur,
          mataPelajaran: initialSelection.bab.mapel || 'PAI dan Budi Pekerti',
          catatanKonteks,
          namaKepsek,
          nipKepsek,
          kotaPenetapan,
          tanggalPenetapan,
        })
      );
      setActiveTab('all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelection]);

  const handleJalurSelect = (jalur: JalurKurikulum) => {
    setSelectedJalur(jalur);
    setSelectedSemester('Semua');
    setSelectedMapel('Semua Mapel');
    const list = getKurikulumByJalur(jalur);
    const firstFase = list.find((f) => f.jenjang === selectedJenjang) || list[0];
    if (firstFase) {
      setSelectedFaseCode(firstFase.fase);
      const firstBab = firstFase.babList[0];
      if (firstBab) {
        setSelectedBabId(firstBab.id);
        setSelectedMateriId(firstBab.materiList[0]?.id || '');
      }
    }
  };

  const handleJenjangSelect = (j: Jenjang) => {
    setSelectedJenjang(j);
    setSelectedSemester('Semua');
    setSelectedMapel('Semua Mapel');
    const firstFase = kurikulumJalur.find((f) => f.jenjang === j) || kurikulumJalur[0];
    if (firstFase) {
      setSelectedFaseCode(firstFase.fase);
      const firstBab = firstFase.babList[0];
      if (firstBab) {
        setSelectedBabId(firstBab.id);
        setSelectedMateriId(firstBab.materiList[0]?.id || '');
      }
    }
  };

  const handleFaseSelect = (code: string) => {
    setSelectedFaseCode(code);
    setSelectedSemester('Semua');
    setSelectedMapel('Semua Mapel');
    const found = fasesForJenjang.find((f) => f.fase === code);
    if (found) {
      const firstBab = found.babList[0];
      if (firstBab) {
        setSelectedBabId(firstBab.id);
        setSelectedMateriId(firstBab.materiList[0]?.id || '');
      }
    }
  };

  const handleBuildTemplate = () => {
    if (!activeBab || !activeMateri) return;
    setError('');
    setSavedNotice('');
    const built = buildTemplateDeepLearningModule({
      faseData: activeFase,
      bab: activeBab,
      materi: activeMateri,
      user,
      satuanPendidikan,
      alokasiJP,
      pertemuanKe: selectedPertemuan,
      modelPembelajaran,
      jalur: selectedJalur,
      mataPelajaran: activeBab.mapel || 'PAI dan Budi Pekerti',
      catatanKonteks,
      namaKepsek,
      nipKepsek,
      kotaPenetapan,
      tanggalPenetapan,
    });
    setCurrentModule(built);
  };

  const handleGenerateAi = async () => {
    if (!activeBab || !activeMateri) return;
    setGeneratingAi(true);
    setError('');
    setSavedNotice('');
    try {
      const resolvedMapel = activeBab.mapel || 'PAI dan Budi Pekerti';
      const cpElemen =
        activeFase.capaianPembelajaran.find(
          (c) => (c.mapel && c.mapel === resolvedMapel) || c.elemen === activeBab.elemen
        )?.deskripsiCP || activeFase.rasional2026;
      const res = await generateModuleAiApi({
        jenjang: activeFase.jenjang,
        jalur: selectedJalur,
        mataPelajaran: resolvedMapel,
        fase: activeFase.fase,
        kelas: activeBab.kelas,
        semester: activeBab.semester,
        elemen: activeBab.elemen,
        babJudul: `Bab ${activeBab.nomorBab}: ${activeBab.judulBab}`,
        materi: activeMateri,
        cpElemen,
        atpList: activeBab.atpList,
        satuanPendidikan,
        alokasiJP,
        pertemuanKe: selectedPertemuan,
        modelPembelajaran,
        catatanKonteks,
        namaKepsek,
        nipKepsek,
        kotaPenetapan,
        tanggalPenetapan,
      });
      const autoMedia = buildAutoMediaForMateri({
        faseData: activeFase,
        bab: activeBab,
        materi: activeMateri,
        pertemuanKe: selectedPertemuan,
      });
      setCurrentModule({
        ...res.module,
        mediaOtomatis: autoMedia,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyusun modul ajar.');
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleSaveArchive = async () => {
    setSaving(true);
    setError('');
    setSavedNotice('');
    try {
      const res = await saveModuleApi(currentModule);
      setCurrentModule(res.module);
      onModuleSaved(res.module);
      setSavedNotice('Modul Ajar beserta 8 Lampiran berhasil disimpan ke Arsip.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan modul.');
    } finally {
      setSaving(false);
    }
  };

  const [showWordMenu, setShowWordMenu] = useState(false);

  const triggerPrintWithScope = (targetTab: 'inti' | 'all') => {
    if (activeTab !== targetTab) {
      setActiveTab(targetTab);
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  const handlePrintModulInti = () => {
    setShowWordMenu(false);
    triggerPrintWithScope('inti');
  };

  const handlePrintKeseluruhan = () => {
    setShowWordMenu(false);
    triggerPrintWithScope('all');
  };

  const showSection = (id: Exclude<SectionTab, 'all'>) =>
    activeTab === 'all' || activeTab === id;

  const { identitas, identifikasi, desainPembelajaran, pengalamanBelajar, asesmenRingkas, lampiran } =
    currentModule;

  const activeAutoMedia = useMemo(() => {
    if (currentModule.mediaOtomatis) return currentModule.mediaOtomatis;
    if (!activeBab || !activeMateri) return null;
    return buildAutoMediaForMateri({
      faseData: activeFase,
      bab: activeBab,
      materi: activeMateri,
      pertemuanKe: selectedPertemuan,
    });
  }, [currentModule.mediaOtomatis, activeFase, activeBab, activeMateri, selectedPertemuan]);

  return (
    <div className="space-y-6">
      <section className="no-print bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-emerald-700 mb-1">
              Studio Penyusunan Perangkat Ajar Deep Learning 2026
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              Generator Modul Ajar Lengkap + 8 Lampiran
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleBuildTemplate}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Terapkan Kerangka 2026</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateAi}
              disabled={generatingAi}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {generatingAi ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>
                {generatingAi ? 'Menyusun Modul & 8 Lampiran...' : 'Susun Lengkap dengan AI'}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Jalur Pendidikan
            </label>
            <select
              value={selectedJalur}
              onChange={(e) => handleJalurSelect(e.target.value as JalurKurikulum)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="Sekolah (PAI & Budi Pekerti)">Sekolah (PAI & Budi Pekerti)</option>
              <option value="Madrasah (Kemenag RI)">Madrasah (Kemenag RI)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Jenjang</label>
            <select
              value={selectedJenjang}
              onChange={(e) => handleJenjangSelect(e.target.value as Jenjang)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="SD/MI">SD/MI</option>
              <option value="SMP/MTs">SMP/MTs</option>
              <option value="SMA/MA">SMA/MA</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Fase</label>
            <select
              value={activeFase.fase}
              onChange={(e) => handleFaseSelect(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              {fasesForJenjang.map((f) => (
                <option key={f.fase} value={f.fase}>
                  Fase {f.fase} ({f.kelasRentang})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Semester (1 & 2)
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => {
                const nextSem = e.target.value as 'Semua' | 'Ganjil' | 'Genap';
                setSelectedSemester(nextSem);
                const firstMatch = activeFase.babList.find(
                  (b) =>
                    (nextSem === 'Semua' || b.semester === nextSem) &&
                    (selectedMapel === 'Semua Mapel' ||
                      (b.mapel || 'PAI dan Budi Pekerti') === selectedMapel)
                );
                if (firstMatch) {
                  setSelectedBabId(firstMatch.id);
                  setSelectedMateriId(firstMatch.materiList[0]?.id || '');
                }
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="Semua">Semester 1 & 2</option>
              <option value="Ganjil">Semester 1 (Ganjil)</option>
              <option value="Genap">Semester 2 (Genap)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Mata Pelajaran
            </label>
            <select
              value={selectedMapel}
              onChange={(e) => {
                const nextMapel = e.target.value as 'Semua Mapel' | MapelPAI;
                setSelectedMapel(nextMapel);
                const firstMatch = activeFase.babList.find(
                  (b) =>
                    (selectedSemester === 'Semua' || b.semester === selectedSemester) &&
                    (nextMapel === 'Semua Mapel' ||
                      (b.mapel || 'PAI dan Budi Pekerti') === nextMapel)
                );
                if (firstMatch) {
                  setSelectedBabId(firstMatch.id);
                  setSelectedMateriId(firstMatch.materiList[0]?.id || '');
                }
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              {availableMapels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Bab Pilihan</label>
            <select
              value={activeBab?.id || ''}
              onChange={(e) => {
                const bab = filteredBabs.find((b) => b.id === e.target.value);
                setSelectedBabId(e.target.value);
                if (bab?.materiList[0]) {
                  setSelectedMateriId(bab.materiList[0].id);
                }
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              {filteredBabs.map((b) => (
                <option key={b.id} value={b.id}>
                  Bab {b.nomorBab} ({b.kelas} · Sem {b.semester === 'Ganjil' ? '1' : '2'} ·{' '}
                  {b.mapel || 'PAI'}): {b.judulBab}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Materi Pilihan (Terhubung Ayat & Hadis)
            </label>
            <select
              value={activeMateri?.id || ''}
              onChange={(e) => setSelectedMateriId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              {activeBab?.materiList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.kode} — {m.judul} ({m.ayatUtama.surah}: {m.ayatUtama.ayat})
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-4 pt-1">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Pilihan Pertemuan Sebelum Menyusun Modul Ajar
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {PERTEMUAN_OPTIONS.map((opt) => {
                const isActive = selectedPertemuan === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedPertemuan(opt.id);
                      setAlokasiJP(opt.jp);
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold">{opt.id}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{opt.hint}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Satuan Pendidikan
            </label>
            <input
              type="text"
              value={satuanPendidikan}
              onChange={(e) => setSatuanPendidikan(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Alokasi Waktu (JP)
            </label>
            <input
              type="number"
              min={1}
              max={18}
              value={alokasiJP}
              onChange={(e) => setAlokasiJP(Math.max(1, Number(e.target.value) || 2))}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 font-mono tabular-nums"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Model Pembelajaran Mendalam
            </label>
            <select
              value={modelPembelajaran}
              onChange={(e) => setModelPembelajaran(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              {MODEL_PEMBELAJARAN_DEEP_LEARNING.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Catatan Konteks Kelas / Kebutuhan Siswa (Opsional)
            </label>
            <input
              type="text"
              value={catatanKonteks}
              onChange={(e) => setCatatanKonteks(e.target.value)}
              placeholder="Contoh: Siswa heterogen, fokus praktik membaca Al-Qur'an & kerja kelompok"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nama Kepala Sekolah / Madrasah (untuk TTD)
            </label>
            <input
              type="text"
              value={namaKepsek}
              onChange={(e) => {
                const val = e.target.value;
                setNamaKepsek(val);
                setCurrentModule((prev) => ({
                  ...prev,
                  identitas: { ...prev.identitas, namaKepsek: val },
                }));
              }}
              placeholder="Contoh: Dr. H. Ahmad Syafi'i, M.Pd"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              NIP Kepala Sekolah (Opsional)
            </label>
            <input
              type="text"
              value={nipKepsek}
              onChange={(e) => {
                const val = e.target.value;
                setNipKepsek(val);
                setCurrentModule((prev) => ({
                  ...prev,
                  identitas: { ...prev.identitas, nipKepsek: val },
                }));
              }}
              placeholder="197501012000031002"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Kota / Tempat Pengesahan
            </label>
            <input
              type="text"
              value={kotaPenetapan}
              onChange={(e) => {
                const val = e.target.value;
                setKotaPenetapan(val);
                setCurrentModule((prev) => ({
                  ...prev,
                  identitas: { ...prev.identitas, kotaPenetapan: val },
                }));
              }}
              placeholder="Contoh: Bandung"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tanggal Pengesahan
            </label>
            <input
              type="text"
              value={tanggalPenetapan}
              onChange={(e) => {
                const val = e.target.value;
                setTanggalPenetapan(val);
                setCurrentModule((prev) => ({
                  ...prev,
                  identitas: { ...prev.identitas, tanggalPenetapan: val },
                }));
              }}
              placeholder="Contoh: 19 November 2026"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>
        </div>

        {activeBab && activeMateri && (
          <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-emerald-950">
              <p className="font-semibold">
                Media Pembelajaran Otomatis Terhubung: {activeMateri.judul} ({selectedPertemuan})
              </p>
              <p className="text-emerald-800 mt-0.5">
                Tersedia 6 Slide Presentasi Proyektor, Audio Bacaan, Kartu Konsep Ayat/Hadis &
                Checklist Aktivitas Kelas otomatis tersinkronisasi saat modul disusun.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              Buka Studio Media
            </button>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
            {error}
          </div>
        )}

        {savedNotice && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{savedNotice}</span>
          </div>
        )}
      </section>

      <section className="no-print bg-white border border-slate-200 rounded-xl p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {SECTION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSaveArchive}
            disabled={saving}
            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Simpan Arsip</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowWordMenu((v) => !v)}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Word (.doc)</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showWordMenu && (
              <div className="absolute right-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowWordMenu(false);
                    exportModuleAsWordDoc(currentModule, 'inti');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-xs text-slate-800 transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-slate-900">Word Khusus Modul Ajar (.doc)</p>
                  <p className="text-[11px] text-slate-500">
                    Dokumen inti A–G & Lembar Pengesahan saja
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWordMenu(false);
                    exportModuleAsWordDoc(currentModule, 'all');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-xs text-slate-800 transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-emerald-900">
                    Word Keseluruhan (Modul + 8 Lampiran)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Dokumen inti lengkap beserta Lampiran 1 s.d. 8
                  </p>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handlePrintModulInti}
            title="Cetak atau simpan PDF khusus Dokumen Inti Modul Ajar (A–G + Pengesahan) tanpa Lampiran"
            className="px-3 py-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-700" />
            <span>Cetak Modul Ajar</span>
          </button>

          <button
            type="button"
            onClick={handlePrintKeseluruhan}
            title="Cetak atau simpan PDF keseluruhan Modul Ajar beserta 8 Lampiran lengkap"
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Keseluruhan (Modul + Lampiran)</span>
          </button>
        </div>
      </section>

      <article className="print-container bg-white border border-slate-200 rounded-xl p-6 sm:p-10 space-y-10">
        <div className="no-print px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <span>
            Pratinjau Cetak Aktif:{' '}
            <strong className="text-slate-900">
              {activeTab === 'inti'
                ? 'Khusus Modul Ajar Inti (A–G & TTD Pengesahan, tanpa Lampiran)'
                : activeTab === 'all'
                  ? 'Keseluruhan Modul Ajar Inti + 8 Lampiran Lengkap'
                  : SECTION_TABS.find((t) => t.id === activeTab)?.label}
            </strong>
          </span>
          <span className="text-[11px] text-slate-500">
            Pilih tombol <strong>Cetak Modul Ajar</strong> atau{' '}
            <strong>Cetak Keseluruhan (Modul + Lampiran)</strong> di kanan atas.
          </span>
        </div>
        {showSection('inti') && (
          <div className="space-y-8">
            <header className="pb-6 border-b-2 border-emerald-800">
              <p className="text-xs font-semibold text-emerald-700 tracking-wide">
                PERANGKAT AJAR KURIKULUM MERDEKA 2026 ·{' '}
                {(identitas.jalur || 'SEKOLAH (PAI & BUDI PEKERTI)').toUpperCase()} · PEMBELAJARAN
                MENDALAM (DEEP LEARNING)
              </p>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Modul Ajar {identitas.mataPelajaran || 'Pendidikan Agama Islam & Budi Pekerti'}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {identitas.babJudul} — {identitas.materiJudul}
              </p>
            </header>

            <section className="space-y-3 print-avoid-break">
              <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
                A. Identitas Modul
              </h2>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm border-collapse">
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700 w-56">
                        Nama Penyusun
                      </th>
                      <td className="py-2.5 px-4 text-slate-900">
                        {identitas.namaPenyusun}{' '}
                        {identitas.nipPenyusun && identitas.nipPenyusun !== '-' && (
                          <span className="font-mono text-xs text-slate-500">
                            · NIP {identitas.nipPenyusun}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700">
                        Satuan Pendidikan
                      </th>
                      <td className="py-2.5 px-4 text-slate-900">{identitas.satuanPendidikan}</td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700">
                        Kepala Sekolah / Madrasah
                      </th>
                      <td className="py-2.5 px-4 text-slate-900">
                        {identitas.namaKepsek || namaKepsek}{' '}
                        {(identitas.nipKepsek || nipKepsek) &&
                          (identitas.nipKepsek || nipKepsek) !== '-' && (
                            <span className="font-mono text-xs text-slate-500">
                              · NIP {identitas.nipKepsek || nipKepsek}
                            </span>
                          )}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700">
                        Jalur & Mata Pelajaran
                      </th>
                      <td className="py-2.5 px-4 text-slate-900">
                        {identitas.jalur || 'Sekolah (PAI & Budi Pekerti)'} ·{' '}
                        <span className="font-semibold">
                          {identitas.mataPelajaran || 'PAI dan Budi Pekerti'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700">
                        Jenjang / Fase / Kelas
                      </th>
                      <td className="py-2.5 px-4 text-slate-900">
                        {identitas.jenjang} · Fase {identitas.fase} · {identitas.kelas} · Semester{' '}
                        {identitas.semester === 'Ganjil'
                          ? '1 (Ganjil)'
                          : identitas.semester === 'Genap'
                          ? '2 (Genap)'
                          : identitas.semester}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700">
                        Pertemuan Target
                      </th>
                      <td className="py-2.5 px-4 text-emerald-900 font-semibold">
                        {identitas.pertemuanKe || 'Pertemuan 1–3 (Utuh)'}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700">
                        Elemen / Bidang Kajian
                      </th>
                      <td className="py-2.5 px-4 text-slate-900">{identitas.elemen}</td>
                    </tr>
                    <tr>
                      <th className="py-2.5 px-4 text-left bg-slate-50 font-medium text-slate-700">
                        Alokasi Waktu & Tahun
                      </th>
                      <td className="py-2.5 px-4 text-slate-900 font-mono tabular-nums text-xs">
                        {identitas.alokasiWaktu} · Tahun Ajaran {identitas.tahunAjaran}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4 print-avoid-break">
              <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
                B. Identifikasi & Kompetensi Awal Pembelajaran Mendalam
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 border border-slate-200 rounded-lg space-y-1.5">
                  <h3 className="font-semibold text-slate-900">1. Kesiapan Peserta Didik</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {identifikasi.kesiapanPesertaDidik}
                  </p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg space-y-1.5">
                  <h3 className="font-semibold text-slate-900">2. Karakteristik Materi</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {identifikasi.karakteristikMateri}
                  </p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg space-y-1.5">
                  <h3 className="font-semibold text-slate-900">3. Target Peserta Didik</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {identifikasi.targetPesertaDidik ||
                      'Peserta didik reguler dengan pendekatan pembelajaran berdiferensiasi sesuai tingkat kesiapan belajar.'}
                  </p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg space-y-1.5">
                  <h3 className="font-semibold text-slate-900">4. Sarana & Prasarana</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {identifikasi.saranaPrasarana ||
                      'Mushaf Al-Qur’an dan terjemahan, kumpulan hadis tematik, papan tulis, proyektor, audio murottal, dan LKPD.'}
                  </p>
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg text-sm">
                <h3 className="font-semibold text-slate-900 mb-1.5">
                  5. Dimensi Profil Lulusan (8 Dimensi Nasional 2026)
                </h3>
                <p className="text-slate-700">
                  {identifikasi.dimensiProfilLulusan.join(' · ')}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
                C. Desain Pembelajaran & Landasan Dalil Al-Qur’an – Hadis
              </h2>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 text-sm">
                <div className="p-4">
                  <p className="font-semibold text-slate-900 mb-1">
                    1. Capaian Pembelajaran (CP 2026)
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {desainPembelajaran.capaianPembelajaran2026}
                  </p>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-slate-900 mb-1">
                    2. Alur Tujuan Pembelajaran (ATP)
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {desainPembelajaran.tujuanPembelajaran.map((tp, idx) => (
                      <li key={idx}>{tp}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">3. Pemahaman Bermakna</p>
                    <p className="text-slate-700 leading-relaxed">
                      {desainPembelajaran.pemahamanBermakna ||
                        `Memahami dan mengamalkan nilai ${identitas.materiJudul} secara berkesadaran dan bermakna dalam kehidupan sehari-hari.`}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">4. Pertanyaan Pemantik</p>
                    <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                      {(desainPembelajaran.pertanyaanPemantik &&
                      desainPembelajaran.pertanyaanPemantik.length > 0
                        ? desainPembelajaran.pertanyaanPemantik
                        : [
                            `Mengapa nilai ${identitas.materiJudul} penting diamalkan oleh pelajar Muslim masa kini?`,
                            `Bagaimana keterkaitan dalil Al-Qur’an dan hadis pada materi ini dengan tantangan pergaulan sehari-hari?`,
                          ]
                      ).map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="p-4 space-y-3 bg-slate-50/60">
                  <p className="font-semibold text-slate-900">
                    5. Landasan Dalil Inti (Al-Qur’an & Hadis)
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-white border border-emerald-200 rounded-lg space-y-2">
                      <p className="text-xs font-bold text-emerald-800">
                        {lampiran.lampiran1BahanAjar.ayatAlQuran.surah} · Ayat{' '}
                        {lampiran.lampiran1BahanAjar.ayatAlQuran.ayat}
                      </p>
                      <p className="font-arabic text-xl text-slate-900 text-right">
                        {lampiran.lampiran1BahanAjar.ayatAlQuran.arab}
                      </p>
                      <p className="text-xs italic text-slate-600">
                        {lampiran.lampiran1BahanAjar.ayatAlQuran.latin}
                      </p>
                      <p className="text-xs text-slate-800">
                        “{lampiran.lampiran1BahanAjar.ayatAlQuran.terjemah}”
                      </p>
                    </div>
                    <div className="p-3.5 bg-white border border-amber-200 rounded-lg space-y-2">
                      <p className="text-xs font-bold text-amber-900">
                        {lampiran.lampiran1BahanAjar.hadisRelevan.perawi} ·{' '}
                        {lampiran.lampiran1BahanAjar.hadisRelevan.derajat}
                      </p>
                      <p className="font-arabic text-lg text-slate-900 text-right">
                        {lampiran.lampiran1BahanAjar.hadisRelevan.arab}
                      </p>
                      <p className="text-xs italic text-slate-600">
                        {lampiran.lampiran1BahanAjar.hadisRelevan.latin}
                      </p>
                      <p className="text-xs text-slate-800">
                        “{lampiran.lampiran1BahanAjar.hadisRelevan.terjemah}”
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">6. Lintas Disiplin Ilmu</p>
                    <p className="text-slate-600">{desainPembelajaran.lintasDisiplinIlmu}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">7. Praktik Pedagogis</p>
                    <p className="text-slate-600">{desainPembelajaran.praktikPedagogis}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">8. Kemitraan Pembelajaran</p>
                    <p className="text-slate-600">{desainPembelajaran.kemitraanPembelajaran}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">
                      9. Lingkungan & Pemanfaatan Digital
                    </p>
                    <p className="text-slate-600">
                      {desainPembelajaran.lingkunganPembelajaran}{' '}
                      {desainPembelajaran.pemanfaatanDigital}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
                D. Pengalaman Belajar (Berkesadaran · Bermakna · Menggembirakan)
              </h2>
              <div className="space-y-4">
                {pengalamanBelajar.map((tahap, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg overflow-hidden print-avoid-break"
                  >
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          Tahap {idx + 1}: {tahap.tahap}
                        </span>
                        <span className="text-xs text-slate-500 ml-2">· {tahap.prinsip}</span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-emerald-800 tabular-nums">
                        {tahap.durasiMenit} Menit
                      </span>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                      <div>
                        <p className="font-semibold text-slate-800 mb-1.5">Aktivitas Guru</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          {tahap.aktivitasGuru.map((ag, i) => (
                            <li key={i}>{ag}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 mb-1.5">
                          Aktivitas Peserta Didik
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          {tahap.aktivitasSiswa.map((as, i) => (
                            <li key={i}>{as}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="px-4 py-2.5 bg-emerald-50/40 border-t border-slate-100 text-xs text-emerald-950">
                      <span className="font-semibold">Integrasi Dalil:</span> {tahap.integrasiDalil}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3 print-avoid-break">
              <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
                E. Ringkasan Asesmen, Pengayaan & Remedial
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="font-semibold text-slate-900 mb-1">Asesmen Awal</p>
                  <p className="text-slate-600 leading-relaxed">{asesmenRingkas.asesmenAwal}</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="font-semibold text-slate-900 mb-1">Asesmen Proses (Formatif)</p>
                  <p className="text-slate-600 leading-relaxed">{asesmenRingkas.asesmenProses}</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <p className="font-semibold text-slate-900 mb-1">Asesmen Akhir (Sumatif)</p>
                  <p className="text-slate-600 leading-relaxed">{asesmenRingkas.asesmenAkhir}</p>
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg text-sm">
                <p className="font-semibold text-slate-900 mb-1">
                  Tindak Lanjut Pengayaan & Remedial
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {lampiran.lampiran6PengayaanRemedial.kriteriaKetuntasan} (Rincian kegiatan
                  tersedia pada Lampiran 6).
                </p>
              </div>
            </section>

            <section className="space-y-4 print-avoid-break">
              <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
                F. Glosarium & Daftar Pustaka
              </h2>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-2.5 px-4 font-semibold text-slate-700 w-56">Istilah</th>
                      <th className="py-2.5 px-4 font-semibold text-slate-700">Definisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lampiran.lampiran8GlosariumPustaka.glosarium.map((g, i) => (
                      <tr key={i}>
                        <td className="py-2.5 px-4 font-semibold text-slate-900">{g.istilah}</td>
                        <td className="py-2.5 px-4 text-slate-700">{g.definisi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg text-sm space-y-2">
                <h3 className="font-semibold text-slate-900">Daftar Pustaka Rujukan 2026</h3>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                  {lampiran.lampiran8GlosariumPustaka.daftarPustaka.map((dp, i) => (
                    <li key={i}>{dp}</li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="space-y-4 print-avoid-break pt-4">
              <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
                G. Lembar Pengesahan
              </h2>
              <div className="border border-slate-200 rounded-lg p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm text-slate-900">
                <div className="text-center space-y-16">
                  <div>
                    <p>Mengetahui,</p>
                    <p className="font-medium">
                      Kepala {identitas.satuanPendidikan}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold underline underline-offset-4">
                      {identitas.namaKepsek || namaKepsek || '........................................'}
                    </p>
                    <p className="text-xs font-mono text-slate-600 mt-1">
                      NIP.{' '}
                      {identitas.nipKepsek && identitas.nipKepsek !== '-'
                        ? identitas.nipKepsek
                        : nipKepsek && nipKepsek !== '-'
                        ? nipKepsek
                        : '........................................'}
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-16">
                  <div>
                    <p>
                      {identitas.kotaPenetapan || kotaPenetapan},{' '}
                      {identitas.tanggalPenetapan || tanggalPenetapan}
                    </p>
                    <p className="font-medium">
                      Guru Mata Pelajaran {identitas.mataPelajaran || 'PAI & Budi Pekerti'}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold underline underline-offset-4">
                      {identitas.namaPenyusun}
                    </p>
                    <p className="text-xs font-mono text-slate-600 mt-1">
                      NIP.{' '}
                      {identitas.nipPenyusun && identitas.nipPenyusun !== '-'
                        ? identitas.nipPenyusun
                        : '........................................'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {showSection('media') && activeAutoMedia && (
          <section className="no-print space-y-4">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Media Pembelajaran Otomatis (Terhubung Langsung ke Modul Ajar)
            </h2>
            <MediaStudioWidget
              media={activeAutoMedia}
              satuanPendidikan={identitas.satuanPendidikan}
              namaGuru={identitas.namaPenyusun}
            />
          </section>
        )}

        {showSection('l1') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 1 · Bahan Ajar & Integrasi Ayat Al-Qur’an dan Hadis
            </h2>
            <h3 className="text-lg font-bold text-slate-900">
              {lampiran.lampiran1BahanAjar.judul}
            </h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">
              <p className="font-semibold text-slate-900 mb-1">Peta Konsep Materi</p>
              <p className="text-slate-700">
                {lampiran.lampiran1BahanAjar.petaKonsep.join(' → ')}
              </p>
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {lampiran.lampiran1BahanAjar.uraianMateriInti}
            </p>
            <div className="border border-emerald-200 bg-emerald-50/30 rounded-lg p-5 space-y-3">
              <p className="text-xs font-bold text-emerald-900">
                Dalil Al-Qur’an · {lampiran.lampiran1BahanAjar.ayatAlQuran.surah} Ayat{' '}
                {lampiran.lampiran1BahanAjar.ayatAlQuran.ayat}
              </p>
              <p className="font-arabic text-2xl text-slate-900 text-right bg-white p-4 rounded border border-emerald-100">
                {lampiran.lampiran1BahanAjar.ayatAlQuran.arab}
              </p>
              <p className="text-xs italic text-slate-600">
                {lampiran.lampiran1BahanAjar.ayatAlQuran.latin}
              </p>
              <p className="text-sm text-slate-900 font-medium">
                Artinya: “{lampiran.lampiran1BahanAjar.ayatAlQuran.terjemah}”
              </p>
            </div>
            <div className="border border-amber-200 bg-amber-50/30 rounded-lg p-5 space-y-3">
              <p className="text-xs font-bold text-amber-900">
                Dalil Hadis · {lampiran.lampiran1BahanAjar.hadisRelevan.perawi} (
                {lampiran.lampiran1BahanAjar.hadisRelevan.derajat})
              </p>
              <p className="font-arabic text-xl text-slate-900 text-right bg-white p-4 rounded border border-amber-100">
                {lampiran.lampiran1BahanAjar.hadisRelevan.arab}
              </p>
              <p className="text-xs italic text-slate-600">
                {lampiran.lampiran1BahanAjar.hadisRelevan.latin}
              </p>
              <p className="text-sm text-slate-900 font-medium">
                Artinya: “{lampiran.lampiran1BahanAjar.hadisRelevan.terjemah}”
              </p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg text-sm">
              <p className="font-semibold text-slate-900 mb-1">
                Implementasi dalam Kehidupan Sehari-hari
              </p>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {lampiran.lampiran1BahanAjar.implementasiKehidupan}
              </p>
            </div>
          </section>
        )}

        {showSection('l2') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 2 · Lembar Kerja Peserta Didik (LKPD) Deep Learning
            </h2>
            <h3 className="text-lg font-bold text-slate-900">{lampiran.lampiran2LKPD.judulLKPD}</h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">
              <p className="font-semibold text-slate-900 mb-1.5">Petunjuk Belajar</p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                {lampiran.lampiran2LKPD.petunjukBelajar.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg text-sm space-y-2">
              <p className="font-semibold text-slate-900">A. Aktivitas Eksplorasi Mandiri</p>
              <p className="text-slate-600">{lampiran.lampiran2LKPD.aktivitasMandiri.instruksi}</p>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-800">
                {lampiran.lampiran2LKPD.aktivitasMandiri.pertanyaan.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg text-sm space-y-2">
              <p className="font-semibold text-slate-900">
                B. Aktivitas Kolaborasi Kelompok (Studi Kasus)
              </p>
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-100">
                {lampiran.lampiran2LKPD.aktivitasKelompok.studiKasus}
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                {lampiran.lampiran2LKPD.aktivitasKelompok.langkahKerja.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ol>
              <p className="text-xs font-medium text-emerald-800 pt-1">
                Tagihan Produk Karya: {lampiran.lampiran2LKPD.aktivitasKelompok.produkKarya}
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Aspek Penilaian LKPD</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700 text-right w-24">
                      Bobot
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Kriteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lampiran.lampiran2LKPD.rubrikPenilaianLKPD.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-4 font-medium text-slate-900">{r.aspek}</td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums text-slate-700">
                        {r.bobot}%
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">{r.kriteria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showSection('l3') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 3 · Instrumen Asesmen Awal (Diagnostik)
            </h2>
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Tujuan Diagnostik:</span>{' '}
              {lampiran.lampiran3AsesmenAwal.tujuanDiagnostik}
            </p>
            <div className="p-4 border border-slate-200 rounded-lg text-sm space-y-2">
              <p className="font-semibold text-slate-900">Asesmen Non-Kognitif & Kesiapan Emosi</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                {lampiran.lampiran3AsesmenAwal.asesmenNonKognitif.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold text-slate-700 w-14">No</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">
                      Pertanyaan Diagnostik Kognitif
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Indikator Kesiapan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lampiran.lampiran3AsesmenAwal.pertanyaanDiagnostikKognitif.map((d) => (
                    <tr key={d.nomor}>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-slate-700">
                        {d.nomor}
                      </td>
                      <td className="py-2.5 px-4 text-slate-900">{d.pertanyaan}</td>
                      <td className="py-2.5 px-4 text-slate-600">{d.indikatorKesiapan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold text-slate-700 w-56">
                      Kategori Kesiapan
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">
                      Tindak Lanjut Pembelajaran Berdiferensiasi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lampiran.lampiran3AsesmenAwal.pemetaanDiferensiasi.map((p, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-4 font-medium text-emerald-900">{p.kategori}</td>
                      <td className="py-2.5 px-4 text-slate-700">{p.tindakLanjut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showSection('l4') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 4 · Instrumen & Rubrik Asesmen Formatif
            </h2>
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Teknik Penilaian:</span>{' '}
              {lampiran.lampiran4AsesmenFormatif.teknikPenilaian}
            </p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold text-slate-700 w-56">
                      Aspek Observasi Sikap
                    </th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Indikator Terukur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lampiran.lampiran4AsesmenFormatif.lembarObservasiSikap.map((s, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-4 font-medium text-slate-900">{s.aspek}</td>
                      <td className="py-2.5 px-4 text-slate-600">{s.indikator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-semibold text-slate-700">Kriteria Unjuk Kerja</th>
                    <th className="py-2.5 px-3 font-semibold text-emerald-800">Skor 4</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-700">Skor 3</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-700">Skor 2</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-700">Skor 1</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lampiran.lampiran4AsesmenFormatif.rubrikUnjukKerja.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3 font-medium text-slate-900">{r.kriteria}</td>
                      <td className="py-2.5 px-3 text-slate-700">{r.skor4}</td>
                      <td className="py-2.5 px-3 text-slate-600">{r.skor3}</td>
                      <td className="py-2.5 px-3 text-slate-600">{r.skor2}</td>
                      <td className="py-2.5 px-3 text-slate-600">{r.skor1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showSection('l5') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 5 · Kisi-Kisi & Soal Asesmen Sumatif (HOTS)
            </h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Indikator Soal</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Level Kognitif</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Bentuk Soal</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700 text-right">Nomor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lampiran.lampiran5AsesmenSumatif.kisiKisi.map((k, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-4 text-slate-900">{k.indikatorSoal}</td>
                      <td className="py-2.5 px-4 text-slate-700">{k.levelKognitif}</td>
                      <td className="py-2.5 px-4 text-slate-600">{k.bentukSoal}</td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums text-slate-700">
                        {k.nomorSoal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Bagian A · Soal Pilihan Ganda</h3>
              {lampiran.lampiran5AsesmenSumatif.soalPilihanGanda.map((s) => (
                <div
                  key={s.nomor}
                  className="p-4 border border-slate-200 rounded-lg text-sm space-y-2 print-avoid-break"
                >
                  <p className="font-medium text-slate-900">
                    <span className="font-mono tabular-nums mr-1.5">{s.nomor}.</span>
                    <span className="text-xs text-emerald-800 mr-1.5">[{s.levelKognitif}]</span>
                    {s.pertanyaan}
                  </p>
                  <ul className="space-y-1 pl-4 text-slate-700">
                    {s.opsi.map((op, i) => (
                      <li key={i}>{op}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <span className="font-semibold text-emerald-800">
                      Kunci: {s.kunciJawaban}
                    </span>{' '}
                    · {s.pembahasan}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Bagian B · Soal Uraian Analitis & Pedoman Penskoran
              </h3>
              {lampiran.lampiran5AsesmenSumatif.soalUraian.map((u) => (
                <div
                  key={u.nomor}
                  className="p-4 border border-slate-200 rounded-lg text-sm space-y-1.5 print-avoid-break"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium text-slate-900">
                      <span className="font-mono tabular-nums mr-1.5">{u.nomor}.</span>
                      {u.pertanyaan}
                    </p>
                    <span className="font-mono text-xs text-slate-500 whitespace-nowrap shrink-0 tabular-nums">
                      Skor Maks: {u.skorMaksimal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Pedoman Jawaban:</span>{' '}
                    {u.pedomanJawaban}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {showSection('l6') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 6 · Program Pengayaan & Remedial
            </h2>
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Kriteria Ketuntasan (KKTP):</span>{' '}
              {lampiran.lampiran6PengayaanRemedial.kriteriaKetuntasan}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-bold text-emerald-900">Program Pengayaan</h3>
                <p className="text-xs text-slate-500">
                  Sasaran: {lampiran.lampiran6PengayaanRemedial.programPengayaan.sasaran}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {lampiran.lampiran6PengayaanRemedial.programPengayaan.bentukKegiatan.map(
                    (k, i) => (
                      <li key={i}>{k}</li>
                    )
                  )}
                </ul>
                <p className="text-xs text-slate-600 pt-1">
                  <span className="font-semibold">Tagihan Produk:</span>{' '}
                  {lampiran.lampiran6PengayaanRemedial.programPengayaan.tagihanProduk}
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-bold text-slate-900">Program Remedial</h3>
                <p className="text-xs text-slate-500">
                  Sasaran: {lampiran.lampiran6PengayaanRemedial.programRemedial.sasaran}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {lampiran.lampiran6PengayaanRemedial.programRemedial.langkahPembelajaran.map(
                    (l, i) => (
                      <li key={i}>{l}</li>
                    )
                  )}
                </ul>
                <p className="text-xs text-slate-600 pt-1">
                  <span className="font-semibold">Evaluasi Ulang:</span>{' '}
                  {lampiran.lampiran6PengayaanRemedial.programRemedial.evaluasiUlang}
                </p>
              </div>
            </div>
          </section>
        )}

        {showSection('l7') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 7 · Lembar Refleksi Guru & Peserta Didik
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-semibold text-slate-900">Refleksi Peserta Didik</h3>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                  {lampiran.lampiran7Refleksi.refleksiPesertaDidik.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ol>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-semibold text-slate-900">Refleksi Guru PAI</h3>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                  {lampiran.lampiran7Refleksi.refleksiGuru.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">
              <span className="font-semibold text-slate-900">Rencana Tindak Lanjut:</span>{' '}
              <span className="text-slate-700">
                {lampiran.lampiran7Refleksi.rencanaTindakLanjut}
              </span>
            </div>
          </section>
        )}

        {showSection('l8') && (
          <section className="space-y-5 print-break-before">
            <h2 className="text-base font-bold text-emerald-950 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-lg">
              Lampiran 8 · Glosarium Istilah Syar’i & Daftar Pustaka
            </h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-semibold text-slate-700 w-56">Istilah</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-700">Definisi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lampiran.lampiran8GlosariumPustaka.glosarium.map((g, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">{g.istilah}</td>
                      <td className="py-2.5 px-4 text-slate-700">{g.definisi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg text-sm space-y-2">
              <h3 className="font-semibold text-slate-900">Daftar Pustaka Rujukan 2026</h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                {lampiran.lampiran8GlosariumPustaka.daftarPustaka.map((dp, i) => (
                  <li key={i}>{dp}</li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
