import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Check,
  Download,
  Loader2,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react';
import {
  buildAutoProsem,
  buildAutoProta,
  computeKaldikSummary,
  createDefaultKaldikConfig,
  DEFAULT_KALDIK_EVENTS_2026_2027,
  exportKaldikWord,
  exportProsemWord,
  exportProtaWord,
  getDefaultJpPerMinggu,
} from '../data/academicPlanner';
import { getKurikulumByJalur } from '../data/kurikulum2026';
import { fetchPlannerApi, savePlannerApi } from '../lib/api';
import type {
  JalurKurikulum,
  Jenjang,
  JenisAgendaKaldik,
  KaldikConfig,
  KaldikEvent,
  MapelPAI,
  PlannerSettings,
  UserAccount,
} from '../types/curriculum';

type PlannerSubTab = 'kaldik' | 'prota' | 'prosem';

interface AcademicPlannerPanelProps {
  user: UserAccount;
  activeSubTab: PlannerSubTab;
  onSubTabChange: (tab: PlannerSubTab) => void;
  onKaldikConfigChange?: (config: KaldikConfig) => void;
}

const JENIS_AGENDA_LABEL: Record<JenisAgendaKaldik, string> = {
  'libur-nasional': 'Libur Nasional / Hari Besar',
  'libur-semester': 'Libur Semester',
  'ramadhan-idulfitri': 'Ramadhan & Idul Fitri',
  penilaian: 'Pekan Penilaian (STS/SAS/SAT)',
  'kegiatan-khusus': 'Kegiatan Khusus Sekolah/Madrasah',
};

export const AcademicPlannerPanel: React.FC<AcademicPlannerPanelProps> = ({
  user,
  activeSubTab,
  onSubTabChange,
  onKaldikConfigChange,
}) => {
  const defaultJalur: JalurKurikulum = 'Sekolah (PAI & Budi Pekerti)';
  const defaultJenjang: Jenjang = user.jenjang === 'Semua Jenjang' ? 'SD/MI' : user.jenjang;
  const defaultMapel: MapelPAI = 'PAI dan Budi Pekerti';

  const [jalur, setJalur] = useState<JalurKurikulum>(defaultJalur);
  const [jenjang, setJenjang] = useState<Jenjang>(defaultJenjang);
  const [faseCode, setFaseCode] = useState<string>('A');
  const [mapel, setMapel] = useState<MapelPAI>(defaultMapel);
  const [satuanPendidikan, setSatuanPendidikan] = useState<string>(
    user.school || 'Sekolah / Madrasah PAI'
  );
  const [namaKepsek, setNamaKepsek] = useState<string>('Kepala Sekolah / Madrasah');
  const [nipKepsek, setNipKepsek] = useState<string>('-');
  const [kotaPenetapan, setKotaPenetapan] = useState<string>('Indonesia');
  const [kaldikConfig, setKaldikConfig] = useState<KaldikConfig>(() =>
    createDefaultKaldikConfig(defaultJalur, defaultJenjang, defaultMapel)
  );
  const [customJpProta, setCustomJpProta] = useState<Record<string, number>>({});
  const [prosemSemester, setProsemSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>('2026-07');

  const [newEvent, setNewEvent] = useState<{
    judul: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    jenis: JenisAgendaKaldik;
    semester: 'Ganjil' | 'Genap';
  }>({
    judul: '',
    tanggalMulai: '2026-09-14',
    tanggalSelesai: '2026-09-14',
    jenis: 'kegiatan-khusus',
    semester: 'Ganjil',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlannerApi()
      .then((res) => {
        if (res.planner) {
          setJalur(res.planner.jalur);
          setJenjang(res.planner.jenjang);
          setFaseCode(res.planner.fase);
          setMapel(res.planner.mapel);
          setSatuanPendidikan(res.planner.satuanPendidikan);
          setNamaKepsek(res.planner.namaKepsek);
          setNipKepsek(res.planner.nipKepsek);
          setKotaPenetapan(res.planner.kotaPenetapan);
          setKaldikConfig(res.planner.kaldikConfig);
          setCustomJpProta(res.planner.customJpProta || {});
          onKaldikConfigChange?.(res.planner.kaldikConfig);
        }
      })
      .catch(() => {
        // Use clean defaults if not yet saved
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onKaldikConfigChange?.(kaldikConfig);
  }, [kaldikConfig, onKaldikConfigChange]);

  const kurikulumList = useMemo(() => getKurikulumByJalur(jalur), [jalur]);
  const fasesForJenjang = useMemo(
    () => kurikulumList.filter((f) => f.jenjang === jenjang),
    [kurikulumList, jenjang]
  );
  const activeFase = useMemo(
    () =>
      fasesForJenjang.find((f) => f.fase === faseCode) ||
      fasesForJenjang[0] ||
      kurikulumList[0],
    [fasesForJenjang, faseCode, kurikulumList]
  );

  const availableMapels = useMemo(() => {
    const set = new Set<MapelPAI>();
    activeFase.capaianPembelajaran.forEach((c) => {
      if (c.mapel) set.add(c.mapel);
    });
    activeFase.babList.forEach((b) => {
      if (b.mapel) set.add(b.mapel);
    });
    return Array.from(set);
  }, [activeFase]);

  const activeMapel: MapelPAI = availableMapels.includes(mapel)
    ? mapel
    : availableMapels[0] || 'PAI dan Budi Pekerti';

  const kaldikSummary = useMemo(() => computeKaldikSummary(kaldikConfig), [kaldikConfig]);

  const protaRows = useMemo(
    () =>
      buildAutoProta({
        faseData: activeFase,
        mapel: activeMapel,
        kaldikSummary,
        jpPerMinggu: kaldikConfig.jpPerMinggu,
        customJpProta,
      }),
    [activeFase, activeMapel, kaldikSummary, kaldikConfig.jpPerMinggu, customJpProta]
  );

  const prosemRows = useMemo(
    () =>
      buildAutoProsem({
        protaRows,
        kaldikSummary,
        semester: prosemSemester,
      }),
    [protaRows, kaldikSummary, prosemSemester]
  );

  const activeMonthDetail = useMemo(
    () => kaldikSummary.months.find((m) => m.monthKey === selectedMonthKey) || kaldikSummary.months[0],
    [kaldikSummary, selectedMonthKey]
  );

  const handleJalurChange = (nextJalur: JalurKurikulum) => {
    setJalur(nextJalur);
    const list = getKurikulumByJalur(nextJalur);
    const nextFase = list.find((f) => f.jenjang === jenjang) || list[0];
    if (nextFase) {
      setFaseCode(nextFase.fase);
      const nextMapel = nextFase.babList[0]?.mapel || 'PAI dan Budi Pekerti';
      setMapel(nextMapel);
      setKaldikConfig((prev) => ({
        ...prev,
        jpPerMinggu: getDefaultJpPerMinggu(nextJalur, nextFase.jenjang, nextMapel),
      }));
    }
  };

  const handleJenjangChange = (nextJenjang: Jenjang) => {
    setJenjang(nextJenjang);
    const nextFase = kurikulumList.find((f) => f.jenjang === nextJenjang) || kurikulumList[0];
    if (nextFase) {
      setFaseCode(nextFase.fase);
      const nextMapel = nextFase.babList[0]?.mapel || activeMapel;
      setMapel(nextMapel);
      setKaldikConfig((prev) => ({
        ...prev,
        jpPerMinggu: getDefaultJpPerMinggu(jalur, nextJenjang, nextMapel),
      }));
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.judul.trim() || !newEvent.tanggalMulai) return;
    const end = newEvent.tanggalSelesai || newEvent.tanggalMulai;
    const evt: KaldikEvent = {
      id: `evt-${Date.now()}`,
      judul: newEvent.judul.trim(),
      tanggalMulai: newEvent.tanggalMulai,
      tanggalSelesai: end >= newEvent.tanggalMulai ? end : newEvent.tanggalMulai,
      jenis: newEvent.jenis,
      semester: newEvent.semester,
    };
    setKaldikConfig((prev) => ({
      ...prev,
      events: [...prev.events, evt].sort((a, b) => a.tanggalMulai.localeCompare(b.tanggalMulai)),
    }));
    setNewEvent((prev) => ({ ...prev, judul: '' }));
  };

  const handleDeleteEvent = (id: string) => {
    setKaldikConfig((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  const handleSavePlanner = async () => {
    setSaving(true);
    setNotice('');
    setError('');
    try {
      const payload: PlannerSettings = {
        authorId: user.id,
        tahunAjaran: kaldikConfig.tahunAjaran,
        jalur,
        jenjang,
        fase: activeFase.fase,
        mapel: activeMapel,
        satuanPendidikan,
        namaKepsek,
        nipKepsek,
        kotaPenetapan,
        kaldikConfig,
        customJpProta,
        updatedAt: new Date().toISOString(),
      };
      await savePlannerApi(payload);
      setNotice('Kaldik, Prota & Prosem tersimpan otomatis ke akun Anda.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan pengaturan perangkat.');
    } finally {
      setSaving(false);
    }
  };

  const commonExportMeta = {
    satuanPendidikan,
    jenjang,
    fase: activeFase.fase,
    jalur,
    mapel: activeMapel,
    tahunAjaran: kaldikConfig.tahunAjaran,
    namaGuru: user.name,
    nipGuru: user.nip,
    namaKepsek,
    nipKepsek,
    kotaPenetapan,
  };

  const ganjilRows = protaRows.filter((r) => r.semester === 'Ganjil');
  const genapRows = protaRows.filter((r) => r.semester === 'Genap');
  const prosemMonths =
    prosemSemester === 'Ganjil' ? kaldikSummary.ganjil.months : kaldikSummary.genap.months;

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
        Memuat Kalender Pendidikan, Prota & Prosem Otomatis 2026/2027...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="no-print bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-emerald-700 mb-1">
              Otomatisasi Perangkat Tahunan & Semester Kurikulum Merdeka 2026
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              Kalender Pendidikan (Kaldik), Program Tahunan (Prota) & Program Semester (Prosem)
            </h2>
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start lg:self-auto">
            {(
              [
                { id: 'kaldik', label: '1. Kaldik & Pekan Efektif' },
                { id: 'prota', label: '2. Prota Otomatis' },
                { id: 'prosem', label: '3. Prosem Matriks' },
              ] as { id: PlannerSubTab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onSubTabChange(t.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSubTab === t.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Jalur Pendidikan</label>
            <select
              value={jalur}
              onChange={(e) => handleJalurChange(e.target.value as JalurKurikulum)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="Sekolah (PAI & Budi Pekerti)">Sekolah (PAI & Budi Pekerti)</option>
              <option value="Madrasah (Kemenag RI)">Madrasah (Kemenag RI)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Jenjang & Fase</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={jenjang}
                onChange={(e) => handleJenjangChange(e.target.value as Jenjang)}
                className="w-full px-2.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="SD/MI">SD/MI</option>
                <option value="SMP/MTs">SMP/MTs</option>
                <option value="SMA/MA">SMA/MA</option>
              </select>
              <select
                value={activeFase.fase}
                onChange={(e) => setFaseCode(e.target.value)}
                className="w-full px-2.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
              >
                {fasesForJenjang.map((f) => (
                  <option key={f.fase} value={f.fase}>
                    Fase {f.fase}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Mata Pelajaran</label>
            <select
              value={activeMapel}
              onChange={(e) => {
                const next = e.target.value as MapelPAI;
                setMapel(next);
                setKaldikConfig((prev) => ({
                  ...prev,
                  jpPerMinggu: getDefaultJpPerMinggu(jalur, jenjang, next),
                }));
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

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Sistem Hari Kerja & JP/Minggu
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={kaldikConfig.hariKerja}
                onChange={(e) =>
                  setKaldikConfig((prev) => ({
                    ...prev,
                    hariKerja: Number(e.target.value) as 5 | 6,
                  }))
                }
                className="w-full px-2.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
              >
                <option value={5}>5 Hari (Sen–Jum)</option>
                <option value={6}>6 Hari (Sen–Sab)</option>
              </select>
              <input
                type="number"
                min={1}
                max={10}
                value={kaldikConfig.jpPerMinggu}
                onChange={(e) =>
                  setKaldikConfig((prev) => ({
                    ...prev,
                    jpPerMinggu: Math.max(1, Number(e.target.value) || 2),
                  }))
                }
                className="w-full px-2.5 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono tabular-nums text-slate-800"
                title="JP per Minggu"
              />
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
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Kepala Sekolah / Madrasah (TTD)
            </label>
            <input
              type="text"
              value={namaKepsek}
              onChange={(e) => setNamaKepsek(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              NIP Kepsek (Opsional)
            </label>
            <input
              type="text"
              value={nipKepsek}
              onChange={(e) => setNipKepsek(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Kota Pengesahan
            </label>
            <input
              type="text"
              value={kotaPenetapan}
              onChange={(e) => setKotaPenetapan(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-mono tabular-nums">
            <span>
              Ganjil: <strong className="text-slate-900">{kaldikSummary.ganjil.mingguEfektif}</strong>{' '}
              Minggu ({kaldikSummary.ganjil.jpEfektif} JP)
            </span>
            <span>·</span>
            <span>
              Genap: <strong className="text-slate-900">{kaldikSummary.genap.mingguEfektif}</strong>{' '}
              Minggu ({kaldikSummary.genap.jpEfektif} JP)
            </span>
            <span>·</span>
            <span>
              Total 1 Tahun:{' '}
              <strong className="text-emerald-800">{kaldikSummary.totalJPTahun} JP</strong> (
              {kaldikSummary.totalHariEfektifTahun} Hari Efektif)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSavePlanner}
              disabled={saving}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Simpan Pengaturan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeSubTab === 'kaldik') {
                  exportKaldikWord({ kaldikConfig, summary: kaldikSummary, meta: commonExportMeta });
                } else if (activeSubTab === 'prota') {
                  exportProtaWord({ protaRows, meta: commonExportMeta });
                } else {
                  exportProsemWord({
                    semester: prosemSemester,
                    prosemRows,
                    months: prosemMonths,
                    meta: commonExportMeta,
                  });
                }
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Word (.doc)</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>

        {notice && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{notice}</span>
          </div>
        )}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
            {error}
          </div>
        )}
      </section>

      {activeSubTab === 'kaldik' && (
        <div className="space-y-6">
          <section className="print-container bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <header className="text-center pb-4 border-b-2 border-emerald-800 space-y-1">
              <p className="text-xs font-semibold text-emerald-700">
                KALENDER PENDIDIKAN & ANALISIS PEKAN EFEKTIF KURIKULUM 2026
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                TAHUN AJARAN {kaldikConfig.tahunAjaran} — {satuanPendidikan.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-600">
                {jalur} · {activeMapel} · {kaldikConfig.hariKerja} Hari Kerja/Minggu ·{' '}
                {kaldikConfig.jpPerMinggu} JP/Minggu
              </p>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">Hari Efektif 1 Tahun</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {kaldikSummary.totalHariEfektifTahun}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Hari belajar tatap muka</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">Pekan Efektif Ganjil</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-emerald-800 mt-1">
                  {kaldikSummary.ganjil.mingguEfektif} Minggu
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {kaldikSummary.ganjil.jpEfektif} JP (Jul–Des 2026)
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">Pekan Efektif Genap</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-emerald-800 mt-1">
                  {kaldikSummary.genap.mingguEfektif} Minggu
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {kaldikSummary.genap.jpEfektif} JP (Jan–Jun 2027)
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">Total Alokasi Tahunan</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {kaldikSummary.totalJPTahun} JP
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Tersinkron ke Prota & Prosem</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="py-2.5 px-3 font-semibold">Semester</th>
                    <th className="py-2.5 px-3 font-semibold">Bulan</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Hari Efektif</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Jml Pekan</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Pekan Efektif</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Non-Efektif</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Total JP</th>
                    <th className="py-2.5 px-3 font-semibold">Agenda / Hari Libur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {kaldikSummary.months.map((m) => (
                    <tr
                      key={m.monthKey}
                      onClick={() => setSelectedMonthKey(m.monthKey)}
                      className={`cursor-pointer transition-colors ${
                        selectedMonthKey === m.monthKey ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-slate-600">{m.semester}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {m.monthName} {m.year}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {m.hariEfektif} / {m.totalHariKalender}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {m.mingguTotal}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-800">
                        {m.mingguEfektif}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-500">
                        {m.mingguNonEfektif}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">
                        {m.jpEfektif} JP
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {m.eventsInMonth.length > 0
                          ? m.eventsInMonth.map((e) => e.judul).join('; ')
                          : 'Pembelajaran efektif penuh'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {activeMonthDetail && (
              <div className="no-print border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>
                      Rincian Tanggal Bulan {activeMonthDetail.monthName} {activeMonthDetail.year}
                    </span>
                  </h4>
                  <span className="text-xs text-slate-500">
                    Klik bulan pada tabel di atas untuk meninjau hari efektif per tanggal
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                    <div key={d} className="py-1 font-semibold text-slate-500">
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: activeMonthDetail.days[0]?.dayOfWeek || 0 }).map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}
                  {activeMonthDetail.days.map((day) => {
                    const cls = day.isWeekend
                      ? 'bg-slate-100 text-slate-400 border-slate-200'
                      : day.isHolidayOrLeave
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : day.isAssessment
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : 'bg-emerald-50/40 text-emerald-950 border-emerald-200';
                    return (
                      <div
                        key={day.isoDate}
                        title={
                          day.events.map((e) => e.judul).join(', ') ||
                          (day.isWeekend ? 'Akhir Pekan' : 'Hari Efektif Belajar')
                        }
                        className={`p-1.5 rounded border font-mono tabular-nums ${cls}`}
                      >
                        <div className="font-semibold">{day.dayOfMonth}</div>
                        <div className="text-[10px] truncate">
                          {day.isWeekend
                            ? 'Libur'
                            : day.isHolidayOrLeave
                              ? 'Off'
                              : day.isAssessment
                                ? 'Ujian'
                                : 'HE'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="no-print border border-slate-200 rounded-lg p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Kelola Agenda Libur Sekolah / Madrasah & Pekan Penilaian
                  </h4>
                  <p className="text-xs text-slate-500">
                    Perubahan agenda langsung menghitung ulang pekan efektif, Prota, dan Prosem.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setKaldikConfig((prev) => ({
                      ...prev,
                      events: DEFAULT_KALDIK_EVENTS_2026_2027,
                    }))
                  }
                  className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Standar 2026/2027</span>
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-6 gap-2.5">
                <input
                  type="text"
                  required
                  value={newEvent.judul}
                  onChange={(e) => setNewEvent({ ...newEvent, judul: e.target.value })}
                  placeholder="Contoh: Pesantren Kilat Ramadhan"
                  className="md:col-span-2 px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
                <input
                  type="date"
                  required
                  value={newEvent.tanggalMulai}
                  onChange={(e) => setNewEvent({ ...newEvent, tanggalMulai: e.target.value })}
                  className="px-2.5 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
                <input
                  type="date"
                  required
                  value={newEvent.tanggalSelesai}
                  onChange={(e) => setNewEvent({ ...newEvent, tanggalSelesai: e.target.value })}
                  className="px-2.5 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
                <select
                  value={newEvent.jenis}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, jenis: e.target.value as JenisAgendaKaldik })
                  }
                  className="px-2.5 py-2 text-xs border border-slate-300 rounded-lg"
                >
                  {Object.entries(JENIS_AGENDA_LABEL).map(([k, lbl]) => (
                    <option key={k} value={k}>
                      {lbl}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Agenda</span>
                </button>
              </form>

              <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-lg">
                {kaldikConfig.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="px-3 py-2 flex items-center justify-between gap-3 text-xs hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-slate-500 mr-2">
                        {ev.tanggalMulai}
                        {ev.tanggalSelesai !== ev.tanggalMulai ? ` s.d. ${ev.tanggalSelesai}` : ''}
                      </span>
                      <span className="font-semibold text-slate-900">{ev.judul}</span>
                      <span className="text-slate-500 ml-2">· {JENIS_AGENDA_LABEL[ev.jenis]}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer shrink-0"
                      title="Hapus agenda"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-8 text-xs text-center print-avoid-break">
              <div>
                <p className="text-slate-600">Mengetahui,</p>
                <p className="font-semibold text-slate-900">Kepala {satuanPendidikan}</p>
                <div className="h-16" />
                <p className="font-bold underline text-slate-900">{namaKepsek}</p>
                <p className="font-mono text-slate-600">
                  NIP. {nipKepsek !== '-' ? nipKepsek : '................................'}
                </p>
              </div>
              <div>
                <p className="text-slate-600">
                  {kotaPenetapan},{' '}
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="font-semibold text-slate-900">Guru Mata Pelajaran {activeMapel}</p>
                <div className="h-16" />
                <p className="font-bold underline text-slate-900">{user.name}</p>
                <p className="font-mono text-slate-600">
                  NIP. {user.nip || '................................'}
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeSubTab === 'prota' && (
        <section className="print-container bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="no-print flex items-center justify-between gap-2">
            <p className="text-xs text-slate-600">
              JP setiap baris otomatis diseimbangkan mengikuti total pekan efektif Kaldik (bisa diubah
              manual pada kolom JP).
            </p>
            <button
              type="button"
              onClick={() => setCustomJpProta({})}
              className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hitung Ulang JP Otomatis</span>
            </button>
          </div>

          <header className="text-center pb-4 border-b-2 border-emerald-800 space-y-1">
            <p className="text-xs font-semibold text-emerald-700">
              PROGRAM TAHUNAN (PROTA) KURIKULUM MERDEKA 2026
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              {activeMapel.toUpperCase()} — {activeFase.labelLengkap.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-600">
              {satuanPendidikan} · {jalur} · Tahun Ajaran {kaldikConfig.tahunAjaran}
            </p>
          </header>

          {(
            [
              { title: 'Semester 1 (Ganjil)', rows: ganjilRows, targetJp: kaldikSummary.ganjil.jpEfektif },
              { title: 'Semester 2 (Genap)', rows: genapRows, targetJp: kaldikSummary.genap.jpEfektif },
            ] as const
          ).map((sec) => {
            const actualSum = sec.rows.reduce((a, r) => a + r.alokasiJP, 0);
            return (
              <div key={sec.title} className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-emerald-950">{sec.title}</h4>
                  <span className="text-xs font-mono tabular-nums text-slate-600">
                    Alokasi: <strong>{actualSum} JP</strong> (Kaldik: {sec.targetJp} JP)
                  </span>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                        <th className="py-2 px-3 w-10 text-center">No</th>
                        <th className="py-2 px-3 w-28">Kode ATP</th>
                        <th className="py-2 px-3">Bab, Materi & Rumusan Tujuan Pembelajaran</th>
                        <th className="py-2 px-3 w-64">Dalil Al-Qur’an & Hadis</th>
                        <th className="py-2 px-3 w-24 text-center">JP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sec.rows.map((r, i) => (
                        <tr key={r.id} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-3 text-center font-mono tabular-nums">{i + 1}</td>
                          <td className="py-2.5 px-3 font-mono font-semibold text-emerald-800">
                            {r.kodeATP}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">
                            <p className="font-semibold text-slate-900">{r.babJudul}</p>
                            <p className="mt-0.5">{r.tujuanPembelajaran}</p>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{r.dalilTerkait}</td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="number"
                              min={1}
                              max={30}
                              value={r.alokasiJP}
                              onChange={(e) =>
                                setCustomJpProta((prev) => ({
                                  ...prev,
                                  [r.id]: Math.max(1, Number(e.target.value) || 1),
                                }))
                              }
                              className="w-16 px-2 py-1 text-center font-mono tabular-nums border border-slate-300 rounded bg-white text-slate-900"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <div className="pt-4 grid grid-cols-2 gap-8 text-xs text-center print-avoid-break">
            <div>
              <p className="text-slate-600">Mengetahui,</p>
              <p className="font-semibold text-slate-900">Kepala {satuanPendidikan}</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{namaKepsek}</p>
              <p className="font-mono text-slate-600">
                NIP. {nipKepsek !== '-' ? nipKepsek : '................................'}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                {kotaPenetapan},{' '}
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="font-semibold text-slate-900">Guru Mata Pelajaran {activeMapel}</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{user.name}</p>
              <p className="font-mono text-slate-600">
                NIP. {user.nip || '................................'}
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSubTab === 'prosem' && (
        <section className="print-container bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="no-print flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['Ganjil', 'Genap'] as const).map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setProsemSemester(sem)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    prosemSemester === sem
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semester {sem === 'Ganjil' ? '1 (Ganjil · Jul–Des)' : '2 (Genap · Jan–Jun)'}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Kolom merah = Pekan libur/non-efektif Kaldik · Kolom kuning = Pekan STS/SAS
            </p>
          </div>

          <header className="text-center pb-4 border-b-2 border-emerald-800 space-y-1">
            <p className="text-xs font-semibold text-emerald-700">
              PROGRAM SEMESTER (PROSEM) {prosemSemester.toUpperCase()} KURIKULUM 2026
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              {activeMapel.toUpperCase()} — {activeFase.labelLengkap.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-600">
              {satuanPendidikan} · {jalur} · Tahun Ajaran {kaldikConfig.tahunAjaran}
            </p>
          </header>

          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th rowSpan={2} className="py-2 px-2 border-r border-slate-200 text-center w-8">
                    No
                  </th>
                  <th rowSpan={2} className="py-2 px-2 border-r border-slate-200 w-24">
                    Kode
                  </th>
                  <th rowSpan={2} className="py-2 px-2 border-r border-slate-200 min-w-[220px]">
                    Materi Pokok & Integrasi Dalil
                  </th>
                  <th rowSpan={2} className="py-2 px-2 border-r border-slate-200 text-center w-10">
                    JP
                  </th>
                  {prosemMonths.map((m) => (
                    <th
                      key={m.monthKey}
                      colSpan={m.weeks.length}
                      className="py-1.5 px-1 border-r border-slate-200 text-center font-bold"
                    >
                      {m.shortName}
                    </th>
                  ))}
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  {prosemMonths.flatMap((m) =>
                    m.weeks.map((w) => (
                      <th
                        key={w.key}
                        className={`py-1 px-1 text-center font-mono border-r border-slate-200 min-w-[24px] ${
                          !w.isEffectiveWeek
                            ? 'bg-red-50 text-red-700'
                            : w.hasAssessment
                              ? 'bg-amber-50 text-amber-800'
                              : ''
                        }`}
                        title={`${m.monthName} Minggu ${w.weekIndex} (${w.statusTag})`}
                      >
                        {w.weekIndex}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prosemRows.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/70">
                    <td className="py-2 px-2 border-r border-slate-200 text-center font-mono tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="py-2 px-2 border-r border-slate-200 font-mono font-semibold text-emerald-800">
                      {row.kodeATP}
                    </td>
                    <td className="py-2 px-2 border-r border-slate-200">
                      <p className="font-semibold text-slate-900">{row.materiPokok}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{row.dalilTerkait}</p>
                    </td>
                    <td className="py-2 px-2 border-r border-slate-200 text-center font-mono tabular-nums font-bold">
                      {row.alokasiJP}
                    </td>
                    {prosemMonths.flatMap((m) =>
                      m.weeks.map((w) => {
                        const val = row.distribusiMinggu[w.key];
                        if (!w.isEffectiveWeek) {
                          return (
                            <td
                              key={w.key}
                              className="py-2 px-1 text-center bg-red-50/60 text-slate-300 border-r border-slate-100"
                            >
                              -
                            </td>
                          );
                        }
                        return (
                          <td
                            key={w.key}
                            className={`py-2 px-1 text-center font-mono tabular-nums border-r border-slate-100 ${
                              val
                                ? 'bg-emerald-50 text-emerald-900 font-bold'
                                : w.hasAssessment
                                  ? 'bg-amber-50/30'
                                  : ''
                            }`}
                          >
                            {val || ''}
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-8 text-xs text-center print-avoid-break">
            <div>
              <p className="text-slate-600">Mengetahui,</p>
              <p className="font-semibold text-slate-900">Kepala {satuanPendidikan}</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{namaKepsek}</p>
              <p className="font-mono text-slate-600">
                NIP. {nipKepsek !== '-' ? nipKepsek : '................................'}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                {kotaPenetapan},{' '}
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="font-semibold text-slate-900">Guru Mata Pelajaran {activeMapel}</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{user.name}</p>
              <p className="font-mono text-slate-600">
                NIP. {user.nip || '................................'}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
