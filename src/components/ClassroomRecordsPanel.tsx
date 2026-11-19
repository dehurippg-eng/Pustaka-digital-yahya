import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  Download,
  FileSpreadsheet,
  Loader2,
  Plus,
  Printer,
  Save,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react';
import type { KaldikSummary } from '../data/academicPlanner';
import {
  computeAttendanceStats,
  computeStudentGradeSummary,
  createDefaultClassroom,
  exportAttendanceCsv,
  exportAttendanceWord,
  exportGradesCsv,
  exportGradesWord,
  getRelevantBabsForClass,
  parseBulkStudentsText,
} from '../data/classroomEngine';
import { getKurikulumByJalur } from '../data/kurikulum2026';
import { deleteClassroomApi, listClassroomsApi, saveClassroomApi } from '../lib/api';
import type {
  ClassroomRecord,
  JalurKurikulum,
  Jenjang,
  MapelPAI,
  StatusHadir,
  UserAccount,
} from '../types/curriculum';

type RecordsSubTab = 'attendance' | 'grades';

interface ClassroomRecordsPanelProps {
  user: UserAccount;
  activeSubTab: RecordsSubTab;
  onSubTabChange: (tab: RecordsSubTab) => void;
  kaldikSummary: KaldikSummary;
}

const STATUS_CYCLE: StatusHadir[] = ['H', 'S', 'I', 'A'];

export const ClassroomRecordsPanel: React.FC<ClassroomRecordsPanelProps> = ({
  user,
  activeSubTab,
  onSubTabChange,
  kaldikSummary,
}) => {
  const [classrooms, setClassrooms] = useState<ClassroomRecord[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ nis: '', nama: '', jk: 'L' as 'L' | 'P' });
  const [bulkText, setBulkText] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [newClassModal, setNewClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('Kelas VII-B');

  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [deleteMeetingTarget, setDeleteMeetingTarget] = useState<string>('');
  const [confirmDeleteAll, setConfirmDeleteAll] = useState<
    null | 'students' | 'meetings'
  >(null);

  useEffect(() => {
    listClassroomsApi()
      .then((res) => {
        if (res.classrooms.length > 0) {
          setClassrooms(res.classrooms);
          setActiveId(res.classrooms[0].id);
        } else {
          const defaultJalur: JalurKurikulum = 'Sekolah (PAI & Budi Pekerti)';
          const defaultJenjang: Jenjang =
            user.jenjang === 'Semua Jenjang' ? 'SD/MI' : user.jenjang;
          const faseList = getKurikulumByJalur(defaultJalur);
          const faseObj =
            faseList.find((f) => f.jenjang === defaultJenjang) || faseList[0];
          const sample = createDefaultClassroom({
            user,
            faseData: faseObj,
            mapel: faseObj.babList[0]?.mapel || 'PAI dan Budi Pekerti',
            semester: 'Ganjil',
            kaldikSummary,
          });
          setClassrooms([sample]);
          setActiveId(sample.id);
        }
      })
      .catch(() => {
        const faseList = getKurikulumByJalur('Sekolah (PAI & Budi Pekerti)');
        const sample = createDefaultClassroom({
          user,
          faseData: faseList[0],
          mapel: 'PAI dan Budi Pekerti',
          semester: 'Ganjil',
          kaldikSummary,
        });
        setClassrooms([sample]);
        setActiveId(sample.id);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeClass = useMemo(
    () => classrooms.find((c) => c.id === activeId) || classrooms[0],
    [classrooms, activeId]
  );

  useEffect(() => {
    setSelectedStudentIds([]);
    setConfirmDeleteAll(null);
    setDeleteMeetingTarget(activeClass?.pertemuan[activeClass.pertemuan.length - 1]?.id || '');
  }, [activeClass?.id]);

  const updateActiveClass = (updater: (prev: ClassroomRecord) => ClassroomRecord) => {
    if (!activeClass) return;
    setClassrooms((prev) => prev.map((c) => (c.id === activeClass.id ? updater(c) : c)));
  };

  const kurikulumList = useMemo(
    () => getKurikulumByJalur(activeClass?.jalur || 'Sekolah (PAI & Budi Pekerti)'),
    [activeClass?.jalur]
  );
  const fasesForJenjang = useMemo(
    () => kurikulumList.filter((f) => f.jenjang === (activeClass?.jenjang || 'SD/MI')),
    [kurikulumList, activeClass?.jenjang]
  );
  const activeFase = useMemo(
    () =>
      fasesForJenjang.find((f) => f.fase === activeClass?.fase) ||
      fasesForJenjang[0] ||
      kurikulumList[0],
    [fasesForJenjang, activeClass?.fase, kurikulumList]
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

  const relevantBabs = useMemo(() => {
    if (!activeClass) return [];
    return getRelevantBabsForClass(activeFase, activeClass.mapel, activeClass.semester);
  }, [activeFase, activeClass]);

  const attendanceStats = useMemo(
    () => (activeClass ? computeAttendanceStats(activeClass) : { perStudent: [], rataRataKehadiran: 100 }),
    [activeClass]
  );

  const gradeSummaries = useMemo(() => {
    if (!activeClass) return [];
    return activeClass.siswa.map((s) =>
      computeStudentGradeSummary(s, activeClass.nilai[s.id], activeClass, relevantBabs)
    );
  }, [activeClass, relevantBabs]);

  const gradeAnalytics = useMemo(() => {
    if (gradeSummaries.length === 0) {
      return { rataRata: 0, tuntasCount: 0, remedialCount: 0, tertinggi: 0 };
    }
    const total = gradeSummaries.reduce((a, s) => a + s.nilaiAkhir, 0);
    const tuntasCount = gradeSummaries.filter((s) => s.nilaiAkhir >= (activeClass?.kktp || 75)).length;
    const tertinggi = Math.max(...gradeSummaries.map((s) => s.nilaiAkhir));
    return {
      rataRata: Math.round(total / gradeSummaries.length),
      tuntasCount,
      remedialCount: gradeSummaries.length - tuntasCount,
      tertinggi,
    };
  }, [gradeSummaries, activeClass?.kktp]);

  const handleSaveClass = async () => {
    if (!activeClass) return;
    setSaving(true);
    setNotice('');
    setError('');
    try {
      const res = await saveClassroomApi(activeClass);
      setClassrooms((prev) => prev.map((c) => (c.id === activeClass.id ? res.classroom : c)));
      setActiveId(res.classroom.id);
      setNotice(`Data rombel "${res.classroom.namaKelas}" berhasil disimpan ke database.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan data kelas.');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNewClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const created = createDefaultClassroom({
      user,
      faseData: activeFase,
      mapel: activeClass?.mapel || 'PAI dan Budi Pekerti',
      semester: activeClass?.semester || 'Ganjil',
      namaKelas: newClassName.trim(),
      kaldikSummary,
    });
    setClassrooms((prev) => [created, ...prev]);
    setActiveId(created.id);
    setNewClassModal(false);
    setNewClassName('');
  };

  const handleDeleteActiveClass = async () => {
    if (!activeClass || classrooms.length <= 1) return;
    try {
      await deleteClassroomApi(activeClass.id).catch(() => null);
      const next = classrooms.filter((c) => c.id !== activeClass.id);
      setClassrooms(next);
      setActiveId(next[0]?.id || '');
    } catch {
      // ignore
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.nama.trim() || !activeClass) return;
    const nextIdx = activeClass.siswa.length + 1;
    const added = {
      id: `std-${Date.now()}`,
      nis: newStudent.nis.trim() || `2026${String(nextIdx).padStart(3, '0')}`,
      nama: newStudent.nama.trim(),
      jenisKelamin: newStudent.jk,
    };
    updateActiveClass((prev) => ({
      ...prev,
      siswa: [...prev.siswa, added],
    }));
    setNewStudent({ nis: '', nama: '', jk: 'L' });
    setShowAddStudent(false);
  };

  const handleBulkImport = () => {
    if (!bulkText.trim() || !activeClass) return;
    const parsed = parseBulkStudentsText(bulkText, activeClass.siswa.length);
    if (parsed.length === 0) return;
    updateActiveClass((prev) => ({
      ...prev,
      siswa: [...prev.siswa, ...parsed],
    }));
    setBulkText('');
    setShowBulkModal(false);
  };

  const handleAddMeeting = () => {
    if (!activeClass) return;
    const nextNum = activeClass.pertemuan.length + 1;
    const babIdx = (nextNum - 1) % Math.max(relevantBabs.length, 1);
    const chosenBab = relevantBabs[babIdx];
    const chosenMateri = chosenBab?.materiList[0];
    const meetId = `meet-${Date.now()}`;
    const newMeet = {
      id: meetId,
      pertemuanKe: nextNum,
      tanggal: new Date().toISOString().slice(0, 10),
      semester: activeClass.semester,
      mapel: activeClass.mapel,
      materiJudul: chosenMateri?.judul || `Pertemuan ${nextNum} ${activeClass.mapel}`,
      dalilSingkat: chosenMateri
        ? `${chosenMateri.ayatUtama.surah}: ${chosenMateri.ayatUtama.ayat}`
        : 'Al-Qur’an & Hadis',
    };
    updateActiveClass((prev) => {
      const att: Record<string, StatusHadir> = {};
      prev.siswa.forEach((s) => {
        att[s.id] = 'H';
      });
      return {
        ...prev,
        pertemuan: [...prev.pertemuan, newMeet],
        absensi: { ...prev.absensi, [meetId]: att },
      };
    });
  };

  const handleMarkAllPresent = (meetId: string) => {
    updateActiveClass((prev) => {
      const nextAtt: Record<string, StatusHadir> = {};
      prev.siswa.forEach((s) => {
        nextAtt[s.id] = 'H';
      });
      return {
        ...prev,
        absensi: { ...prev.absensi, [meetId]: nextAtt },
      };
    });
  };

  const handleCycleAttendance = (meetId: string, studentId: string) => {
    updateActiveClass((prev) => {
      const current = prev.absensi[meetId]?.[studentId] || 'H';
      const nextStatus = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
      return {
        ...prev,
        absensi: {
          ...prev.absensi,
          [meetId]: {
            ...(prev.absensi[meetId] || {}),
            [studentId]: nextStatus,
          },
        },
      };
    });
  };

  const handleToggleSelectStudent = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const handleToggleSelectAllStudents = () => {
    if (!activeClass) return;
    if (selectedStudentIds.length === activeClass.siswa.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(activeClass.siswa.map((s) => s.id));
    }
  };

  const handleDeleteStudentsByIds = (ids: string[]) => {
    if (!activeClass || ids.length === 0) return;
    const idSet = new Set(ids);
    updateActiveClass((prev) => {
      const nextAbsensi: Record<string, Record<string, StatusHadir>> = {};
      Object.entries(prev.absensi).forEach(([meetId, map]) => {
        const cleaned: Record<string, StatusHadir> = {};
        Object.entries(map).forEach(([sid, status]) => {
          if (!idSet.has(sid)) cleaned[sid] = status;
        });
        nextAbsensi[meetId] = cleaned;
      });
      const nextNilai = { ...prev.nilai };
      ids.forEach((sid) => {
        delete nextNilai[sid];
      });
      return {
        ...prev,
        siswa: prev.siswa.filter((s) => !idSet.has(s.id)),
        absensi: nextAbsensi,
        nilai: nextNilai,
      };
    });
    setSelectedStudentIds((prev) => prev.filter((id) => !idSet.has(id)));
    setNotice(`${ids.length} siswa berhasil dihapus dari daftar absen & nilai.`);
  };

  const handleDeleteMeeting = (meetId: string) => {
    if (!activeClass || !meetId) return;
    const target = activeClass.pertemuan.find((m) => m.id === meetId);
    updateActiveClass((prev) => {
      const nextPertemuan = prev.pertemuan
        .filter((m) => m.id !== meetId)
        .map((m, idx) => ({ ...m, pertemuanKe: idx + 1 }));
      const nextAbsensi = { ...prev.absensi };
      delete nextAbsensi[meetId];
      return {
        ...prev,
        pertemuan: nextPertemuan,
        absensi: nextAbsensi,
      };
    });
    const remaining = activeClass.pertemuan.filter((m) => m.id !== meetId);
    setDeleteMeetingTarget(remaining[remaining.length - 1]?.id || '');
    setNotice(
      target
        ? `Kolom absen Pertemuan P${target.pertemuanKe} (${target.tanggal}) berhasil dihapus.`
        : 'Pertemuan berhasil dihapus.'
    );
  };

  const handleDeleteAllMeetings = () => {
    if (!activeClass) return;
    updateActiveClass((prev) => ({
      ...prev,
      pertemuan: [],
      absensi: {},
    }));
    setDeleteMeetingTarget('');
    setConfirmDeleteAll(null);
    setShowDeleteMenu(false);
    setNotice('Seluruh pertemuan absen pada rombel ini telah dihapus.');
  };

  const handleClearAllStudents = () => {
    if (!activeClass) return;
    updateActiveClass((prev) => ({
      ...prev,
      siswa: [],
      absensi: {},
      nilai: {},
    }));
    setSelectedStudentIds([]);
    setConfirmDeleteAll(null);
    setShowDeleteMenu(false);
    setNotice('Seluruh daftar siswa pada absen rombel ini telah dikosongkan.');
  };

  const handleGradeChange = (
    studentId: string,
    field: 'formatifBab' | 'sumatifBab' | 'praktik' | 'sts' | 'sas',
    babIdOrVal: string,
    rawVal?: string
  ) => {
    const numStr = rawVal !== undefined ? rawVal : babIdOrVal;
    const num = numStr === '' ? null : Math.max(0, Math.min(100, Number(numStr)));
    updateActiveClass((prev) => {
      const existing = prev.nilai[studentId] || {
        formatifBab: {},
        sumatifBab: {},
        praktikIbadahHafalan: null,
        sts: null,
        sas: null,
      };
      if (field === 'formatifBab') {
        return {
          ...prev,
          nilai: {
            ...prev.nilai,
            [studentId]: {
              ...existing,
              formatifBab: { ...existing.formatifBab, [babIdOrVal]: num },
            },
          },
        };
      }
      if (field === 'sumatifBab') {
        return {
          ...prev,
          nilai: {
            ...prev.nilai,
            [studentId]: {
              ...existing,
              sumatifBab: { ...existing.sumatifBab, [babIdOrVal]: num },
            },
          },
        };
      }
      if (field === 'praktik') {
        return {
          ...prev,
          nilai: { ...prev.nilai, [studentId]: { ...existing, praktikIbadahHafalan: num } },
        };
      }
      if (field === 'sts') {
        return {
          ...prev,
          nilai: { ...prev.nilai, [studentId]: { ...existing, sts: num } },
        };
      }
      return {
        ...prev,
        nilai: { ...prev.nilai, [studentId]: { ...existing, sas: num } },
      };
    });
  };

  if (loading || !activeClass) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
        Memuat Daftar Hadir & Rekap Nilai Siswa...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="no-print bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-emerald-700 mb-1">
              Administrasi Kelas Terpadu Kurikulum Merdeka 2026
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              Daftar Hadir Siswa & Rekapitulasi Nilai Otomatis
            </h2>
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start lg:self-auto">
            {(
              [
                { id: 'attendance', label: 'Daftar Hadir Siswa' },
                { id: 'grades', label: 'Rekap Nilai & Deskripsi Rapor' },
              ] as { id: RecordsSubTab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onSubTabChange(t.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Pilih / Kelola Rombel Kelas
            </label>
            <div className="flex items-center gap-1.5">
              <select
                value={activeClass.id}
                onChange={(e) => setActiveId(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
              >
                {classrooms.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.namaKelas} · {c.mapel} (Sem {c.semester === 'Ganjil' ? '1' : '2'})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setNewClassModal((v) => !v)}
                title="Tambah rombel kelas baru"
                className="p-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
              {classrooms.length > 1 && (
                <button
                  type="button"
                  onClick={handleDeleteActiveClass}
                  title="Hapus rombel ini"
                  className="p-2 border border-slate-300 rounded-lg text-slate-500 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Jalur & Jenjang / Fase
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={activeClass.jalur}
                onChange={(e) => {
                  const nextJalur = e.target.value as JalurKurikulum;
                  const list = getKurikulumByJalur(nextJalur);
                  const nextFase = list.find((f) => f.jenjang === activeClass.jenjang) || list[0];
                  updateActiveClass((prev) => ({
                    ...prev,
                    jalur: nextJalur,
                    fase: nextFase.fase,
                    mapel: nextFase.babList[0]?.mapel || 'PAI dan Budi Pekerti',
                  }));
                }}
                className="px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="Sekolah (PAI & Budi Pekerti)">Sekolah</option>
                <option value="Madrasah (Kemenag RI)">Madrasah</option>
              </select>
              <select
                value={`${activeClass.jenjang}|${activeClass.fase}`}
                onChange={(e) => {
                  const [j, f] = e.target.value.split('|') as [Jenjang, ClassroomRecord['fase']];
                  updateActiveClass((prev) => ({ ...prev, jenjang: j, fase: f }));
                }}
                className="px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg"
              >
                {kurikulumList.map((f) => (
                  <option key={f.fase} value={`${f.jenjang}|${f.fase}`}>
                    {f.jenjang} · Fase {f.fase}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Mata Pelajaran & Semester
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={activeClass.mapel}
                onChange={(e) =>
                  updateActiveClass((prev) => ({ ...prev, mapel: e.target.value as MapelPAI }))
                }
                className="px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg"
              >
                {availableMapels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={activeClass.semester}
                onChange={(e) =>
                  updateActiveClass((prev) => ({
                    ...prev,
                    semester: e.target.value as 'Ganjil' | 'Genap',
                  }))
                }
                className="px-2 py-2 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="Ganjil">Semester 1 (Ganjil)</option>
                <option value="Genap">Semester 2 (Genap)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Kepala Sekolah / Madrasah (TTD)
            </label>
            <input
              type="text"
              value={activeClass.namaKepsek}
              onChange={(e) =>
                updateActiveClass((prev) => ({ ...prev, namaKepsek: e.target.value }))
              }
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {newClassModal && (
          <form
            onSubmit={handleCreateNewClass}
            className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap items-center gap-2.5"
          >
            <input
              type="text"
              required
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="Nama Rombel baru, misal: Kelas VIII-B"
              className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg min-w-[220px]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-medium rounded-lg cursor-pointer"
            >
              Buat Rombel Baru
            </button>
            <button
              type="button"
              onClick={() => setNewClassModal(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Batal
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddStudent((v) => !v)}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Tambah 1 Siswa</span>
            </button>
            <button
              type="button"
              onClick={() => setShowBulkModal((v) => !v)}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Tempel Daftar Siswa (Bulk)</span>
            </button>
            <span className="text-xs text-slate-500 font-mono tabular-nums ml-1">
              {activeClass.siswa.length} Siswa · {relevantBabs.length} Bab Aktif
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveClass}
              disabled={saving}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Simpan Data Rombel</span>
            </button>

            <button
              type="button"
              onClick={() =>
                activeSubTab === 'attendance'
                  ? exportAttendanceCsv(activeClass)
                  : exportGradesCsv(activeClass, relevantBabs)
              }
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Unduh Excel/CSV</span>
            </button>

            <button
              type="button"
              onClick={() =>
                activeSubTab === 'attendance'
                  ? exportAttendanceWord(activeClass, user)
                  : exportGradesWord(activeClass, relevantBabs, user)
              }
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
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

        {showAddStudent && (
          <form
            onSubmit={handleAddStudent}
            className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-2.5"
          >
            <input
              type="text"
              value={newStudent.nis}
              onChange={(e) => setNewStudent({ ...newStudent, nis: e.target.value })}
              placeholder="NIS (opsional)"
              className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono"
            />
            <input
              type="text"
              required
              value={newStudent.nama}
              onChange={(e) => setNewStudent({ ...newStudent, nama: e.target.value })}
              placeholder="Nama Lengkap Siswa"
              className="sm:col-span-2 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
            />
            <div className="flex items-center gap-2">
              <select
                value={newStudent.jk}
                onChange={(e) => setNewStudent({ ...newStudent, jk: e.target.value as 'L' | 'P' })}
                className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="L">L</option>
                <option value="P">P</option>
              </select>
              <button
                type="submit"
                className="flex-1 px-3 py-1.5 bg-emerald-700 text-white text-xs font-medium rounded-lg cursor-pointer"
              >
                Tambahkan
              </button>
            </div>
          </form>
        )}

        {showBulkModal && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
            <p className="text-xs font-medium text-slate-800">
              Tempel Daftar Nama Siswa (satu siswa per baris, boleh format{' '}
              <code>NIS, Nama, L/P</code> atau cukup nama saja):
            </p>
            <textarea
              rows={4}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={'2026013, Muhammad Iqbal, L\n2026014, Salma Al-Humaira, P'}
              className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg font-mono"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBulkImport}
                className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-medium rounded-lg cursor-pointer"
              >
                Proses Tambah Siswa Massal
              </button>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

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

      {activeSubTab === 'attendance' && (
        <section className="print-container bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="no-print flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              Rata-rata Kehadiran Kelas:{' '}
              <strong className="font-mono tabular-nums text-emerald-800">
                {attendanceStats.rataRataKehadiran}%
              </strong>{' '}
              · Klik status (<code>H</code> / <code>S</code> / <code>I</code> / <code>A</code>)
              pada sel untuk mengubah cepat.
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedStudentIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleDeleteStudentsByIds(selectedStudentIds)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Siswa Terpilih ({selectedStudentIds.length})</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowDeleteMenu((v) => !v);
                  setConfirmDeleteAll(null);
                }}
                className={`px-3 py-1.5 border text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
                  showDeleteMenu
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-white hover:bg-red-50 border-slate-300 text-red-700'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Menu Hapus Absen</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleAddMeeting}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Pertemuan Baru</span>
              </button>
            </div>
          </div>

          {showDeleteMenu && (
            <div className="no-print p-4 bg-red-50/70 border border-red-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-red-900">
                  Menu Hapus Daftar Hadir Siswa & Pertemuan
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteMenu(false);
                    setConfirmDeleteAll(null);
                  }}
                  className="text-red-700 hover:text-red-900 p-0.5 cursor-pointer"
                  aria-label="Tutup menu hapus"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-red-200 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-slate-800">
                    1. Hapus Kolom Pertemuan
                  </p>
                  <div className="flex items-center gap-1.5">
                    <select
                      value={deleteMeetingTarget || activeClass.pertemuan[0]?.id || ''}
                      onChange={(e) => setDeleteMeetingTarget(e.target.value)}
                      disabled={activeClass.pertemuan.length === 0}
                      className="flex-1 min-w-0 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                    >
                      {activeClass.pertemuan.length === 0 ? (
                        <option value="">Belum ada pertemuan</option>
                      ) : (
                        activeClass.pertemuan.map((m) => (
                          <option key={m.id} value={m.id}>
                            P{m.pertemuanKe} ({m.tanggal})
                          </option>
                        ))
                      )}
                    </select>
                    <button
                      type="button"
                      disabled={activeClass.pertemuan.length === 0}
                      onClick={() =>
                        handleDeleteMeeting(
                          deleteMeetingTarget || activeClass.pertemuan[0]?.id || ''
                        )
                      }
                      className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white text-xs font-medium rounded-md whitespace-nowrap cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-red-200 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-slate-800">
                    2. Hapus Siswa pada Absen
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      disabled={selectedStudentIds.length === 0}
                      onClick={() => handleDeleteStudentsByIds(selectedStudentIds)}
                      className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-500 text-white text-xs font-medium rounded-md cursor-pointer"
                    >
                      Hapus Tercentang ({selectedStudentIds.length})
                    </button>
                    <button
                      type="button"
                      disabled={activeClass.siswa.length === 0}
                      onClick={() => setConfirmDeleteAll('students')}
                      className="px-2.5 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-40 text-xs font-medium rounded-md cursor-pointer"
                    >
                      Hapus Semua Siswa
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-red-200 rounded-lg space-y-2">
                  <p className="text-xs font-semibold text-slate-800">
                    3. Kosongkan Semua Pertemuan
                  </p>
                  <button
                    type="button"
                    disabled={activeClass.pertemuan.length === 0}
                    onClick={() => setConfirmDeleteAll('meetings')}
                    className="w-full px-2.5 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-40 text-xs font-medium rounded-md cursor-pointer"
                  >
                    Hapus Semua Pertemuan ({activeClass.pertemuan.length})
                  </button>
                </div>
              </div>

              {confirmDeleteAll && (
                <div className="p-3 bg-white border border-red-300 rounded-lg flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-medium text-red-900">
                    {confirmDeleteAll === 'students'
                      ? `Konfirmasi: Hapus seluruh ${activeClass.siswa.length} siswa beserta data absensinya?`
                      : `Konfirmasi: Hapus seluruh ${activeClass.pertemuan.length} kolom pertemuan absen?`}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        confirmDeleteAll === 'students'
                          ? handleClearAllStudents()
                          : handleDeleteAllMeetings()
                      }
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md cursor-pointer"
                    >
                      Ya, Hapus Sekarang
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteAll(null)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <header className="text-center pb-4 border-b-2 border-emerald-800 space-y-1">
            <p className="text-xs font-semibold text-emerald-700">
              DAFTAR HADIR PESERTA DIDIK KURIKULUM 2026
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              {activeClass.namaKelas} — {activeClass.mapel.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-600">
              {activeClass.satuanPendidikan} · Semester {activeClass.semester} · Tahun Ajaran{' '}
              {activeClass.tahunAjaran}
            </p>
          </header>

          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="no-print py-2 px-2 text-center w-8">
                    <input
                      type="checkbox"
                      checked={
                        activeClass.siswa.length > 0 &&
                        selectedStudentIds.length === activeClass.siswa.length
                      }
                      onChange={handleToggleSelectAllStudents}
                      aria-label="Pilih semua siswa"
                      className="rounded border-slate-300 cursor-pointer"
                    />
                  </th>
                  <th className="py-2 px-2.5 text-center w-9">No</th>
                  <th className="py-2 px-2.5 w-24">NIS</th>
                  <th className="py-2 px-2.5 min-w-[180px]">Nama Peserta Didik</th>
                  <th className="py-2 px-2 text-center w-10">L/P</th>
                  {activeClass.pertemuan.map((m) => (
                    <th key={m.id} className="py-1.5 px-2 text-center min-w-[82px]">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold text-slate-900">P{m.pertemuanKe}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteMeeting(m.id)}
                          title={`Hapus Pertemuan P${m.pertemuanKe}`}
                          aria-label={`Hapus Pertemuan P${m.pertemuanKe}`}
                          className="no-print text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-[10px] font-mono font-normal text-slate-500">
                        {m.tanggal.slice(5)}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleMarkAllPresent(m.id)}
                        className="no-print mt-0.5 text-[10px] text-emerald-700 hover:underline font-medium cursor-pointer"
                        title="Tandai semua hadir"
                      >
                        Semua H
                      </button>
                    </th>
                  ))}
                  <th className="py-2 px-2 text-center bg-emerald-50 text-emerald-900">H</th>
                  <th className="py-2 px-2 text-center">S</th>
                  <th className="py-2 px-2 text-center">I</th>
                  <th className="py-2 px-2 text-center">A</th>
                  <th className="py-2 px-2 text-right font-bold">% Hadir</th>
                  <th className="no-print py-2 px-2 text-center w-16">Hapus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendanceStats.perStudent.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11 + activeClass.pertemuan.length}
                      className="py-8 text-center text-xs text-slate-500"
                    >
                      Belum ada data siswa pada kelas ini. Gunakan tombol &quot;Tambah 1 Siswa&quot;
                      atau &quot;Tempel Daftar Siswa (Bulk)&quot; di atas.
                    </td>
                  </tr>
                ) : (
                  attendanceStats.perStudent.map((row, idx) => (
                    <tr key={row.student.id} className="hover:bg-slate-50/70">
                      <td className="no-print py-2 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.includes(row.student.id)}
                          onChange={() => handleToggleSelectStudent(row.student.id)}
                          aria-label={`Pilih ${row.student.nama}`}
                          className="rounded border-slate-300 cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-2.5 text-center font-mono tabular-nums">{idx + 1}</td>
                      <td className="py-2 px-2.5 font-mono text-slate-600">{row.student.nis}</td>
                      <td className="py-2 px-2.5 font-medium text-slate-900">{row.student.nama}</td>
                      <td className="py-2 px-2 text-center text-slate-600">
                        {row.student.jenisKelamin}
                      </td>
                      {activeClass.pertemuan.map((m) => {
                        const st = activeClass.absensi[m.id]?.[row.student.id] || 'H';
                        const stCls =
                          st === 'H'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : st === 'S'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : st === 'I'
                                ? 'bg-sky-50 text-sky-800 border-sky-200'
                                : 'bg-red-50 text-red-800 border-red-200';
                        return (
                          <td key={m.id} className="py-1.5 px-1.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleCycleAttendance(m.id, row.student.id)}
                              className={`w-8 h-7 rounded border font-mono text-xs font-bold cursor-pointer ${stCls}`}
                            >
                              {st}
                            </button>
                          </td>
                        );
                      })}
                      <td className="py-2 px-2 text-center font-mono tabular-nums font-bold text-emerald-800 bg-emerald-50/40">
                        {row.H}
                      </td>
                      <td className="py-2 px-2 text-center font-mono tabular-nums">{row.S}</td>
                      <td className="py-2 px-2 text-center font-mono tabular-nums">{row.I}</td>
                      <td className="py-2 px-2 text-center font-mono tabular-nums text-red-700">
                        {row.A}
                      </td>
                      <td className="py-2 px-2 text-right font-mono tabular-nums font-bold text-slate-900">
                        {row.persentaseHadir}%
                      </td>
                      <td className="no-print py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteStudentsByIds([row.student.id])}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-red-700 hover:bg-red-50 rounded border border-red-200 cursor-pointer"
                          title="Hapus siswa dari daftar absen"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50 text-xs space-y-1.5">
            <p className="font-bold text-slate-900">Jurnal Agenda Materi & Dalil Pertemuan:</p>
            {activeClass.pertemuan.length === 0 ? (
              <p className="text-slate-500">
                Belum ada pertemuan. Klik &quot;Tambah Pertemuan Baru&quot; untuk menambahkan kolom
                absensi.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-slate-700">
                {activeClass.pertemuan.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-semibold text-emerald-800">
                        P{p.pertemuanKe} ({p.tanggal}):
                      </span>{' '}
                      {p.materiJudul} <span className="text-slate-500">({p.dalilSingkat})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteMeeting(p.id)}
                      className="no-print text-[11px] text-red-600 hover:underline shrink-0 cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 grid grid-cols-2 gap-8 text-xs text-center print-avoid-break">
            <div>
              <p className="text-slate-600">Mengetahui,</p>
              <p className="font-semibold text-slate-900">Kepala {activeClass.satuanPendidikan}</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{activeClass.namaKepsek}</p>
              <p className="font-mono text-slate-600">
                NIP.{' '}
                {activeClass.nipKepsek !== '-'
                  ? activeClass.nipKepsek
                  : '................................'}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                {activeClass.kotaPenetapan},{' '}
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="font-semibold text-slate-900">
                Guru Mata Pelajaran {activeClass.mapel}
              </p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{user.name}</p>
              <p className="font-mono text-slate-600">
                NIP. {user.nip || '................................'}
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSubTab === 'grades' && (
        <section className="print-container bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="no-print grid grid-cols-2 lg:grid-cols-6 gap-3 pb-2">
            <div className="p-3.5 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-500">Rata-rata Kelas</p>
              <p className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                {gradeAnalytics.rataRata}
              </p>
            </div>
            <div className="p-3.5 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-500">Tuntas KKTP</p>
              <p className="text-xl font-bold font-mono tabular-nums text-emerald-800 mt-0.5">
                {gradeAnalytics.tuntasCount} Siswa
              </p>
            </div>
            <div className="p-3.5 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-500">Perlu Remedial</p>
              <p className="text-xl font-bold font-mono tabular-nums text-amber-700 mt-0.5">
                {gradeAnalytics.remedialCount} Siswa
              </p>
            </div>
            <div className="p-3.5 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-500">Nilai Tertinggi</p>
              <p className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">
                {gradeAnalytics.tertinggi}
              </p>
            </div>
            <div className="col-span-2 p-3.5 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Ambang Ketuntasan (KKTP)
                </label>
                <p className="text-[11px] text-slate-500">
                  Otomatis menentukan status Pengayaan / Remedial & deskripsi rapor
                </p>
              </div>
              <input
                type="number"
                min={50}
                max={95}
                value={activeClass.kktp}
                onChange={(e) =>
                  updateActiveClass((prev) => ({
                    ...prev,
                    kktp: Math.max(50, Math.min(95, Number(e.target.value) || 75)),
                  }))
                }
                className="w-20 px-2.5 py-1.5 text-center font-mono tabular-nums text-sm font-bold border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <header className="text-center pb-4 border-b-2 border-emerald-800 space-y-1">
            <p className="text-xs font-semibold text-emerald-700">
              REKAPITULASI NILAI & DESKRIPSI CAPAIAN RAPOR KURIKULUM MERDEKA 2026
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              {activeClass.namaKelas} — {activeClass.mapel.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-600">
              {activeClass.satuanPendidikan} · Semester {activeClass.semester} · KKTP:{' '}
              {activeClass.kktp} · Tahun Ajaran {activeClass.tahunAjaran}
            </p>
          </header>

          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="py-2 px-2 text-center w-8">No</th>
                  <th className="py-2 px-2 min-w-[160px]">Nama Peserta Didik</th>
                  {relevantBabs.map((b, i) => (
                    <th
                      key={`f-${b.id}`}
                      className="py-2 px-1.5 text-center min-w-[54px]"
                      title={`Formatif Bab ${b.nomorBab}: ${b.judulBab}`}
                    >
                      F.Bab{i + 1}
                    </th>
                  ))}
                  {relevantBabs.map((b, i) => (
                    <th
                      key={`s-${b.id}`}
                      className="py-2 px-1.5 text-center min-w-[54px]"
                      title={`Sumatif Bab ${b.nomorBab}: ${b.judulBab}`}
                    >
                      S.Bab{i + 1}
                    </th>
                  ))}
                  <th className="py-2 px-1.5 text-center min-w-[60px]">Praktik</th>
                  <th className="py-2 px-1.5 text-center min-w-[54px]">STS</th>
                  <th className="py-2 px-1.5 text-center min-w-[54px]">SAS</th>
                  <th className="py-2 px-2 text-center bg-emerald-50 text-emerald-900 font-bold">
                    Nilai Akhir
                  </th>
                  <th className="py-2 px-2 text-center font-bold">Predikat</th>
                  <th className="py-2 px-2 min-w-[110px]">Status KKTP</th>
                  <th className="py-2 px-2.5 min-w-[240px]">Deskripsi Rapor Otomatis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gradeSummaries.map((sum, idx) => {
                  const entry = activeClass.nilai[sum.student.id] || {
                    formatifBab: {},
                    sumatifBab: {},
                    praktikIbadahHafalan: null,
                    sts: null,
                    sas: null,
                  };
                  const statusCls =
                    sum.statusKKTP === 'Perlu Remedial'
                      ? 'text-red-700 font-semibold'
                      : sum.statusKKTP === 'Tuntas · Pengayaan'
                        ? 'text-emerald-800 font-semibold'
                        : 'text-slate-700 font-medium';
                  return (
                    <tr key={sum.student.id} className="hover:bg-slate-50/70">
                      <td className="py-2 px-2 text-center font-mono tabular-nums">{idx + 1}</td>
                      <td className="py-2 px-2 font-medium text-slate-900">
                        <div>{sum.student.nama}</div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {sum.student.nis} · {sum.student.jenisKelamin}
                        </div>
                      </td>
                      {relevantBabs.map((b) => (
                        <td key={`fi-${b.id}`} className="py-1.5 px-1 text-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={entry.formatifBab[b.id] ?? ''}
                            onChange={(e) =>
                              handleGradeChange(sum.student.id, 'formatifBab', b.id, e.target.value)
                            }
                            className="w-12 px-1 py-1 text-center font-mono tabular-nums border border-slate-200 rounded bg-white"
                          />
                        </td>
                      ))}
                      {relevantBabs.map((b) => (
                        <td key={`si-${b.id}`} className="py-1.5 px-1 text-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={entry.sumatifBab[b.id] ?? ''}
                            onChange={(e) =>
                              handleGradeChange(sum.student.id, 'sumatifBab', b.id, e.target.value)
                            }
                            className="w-12 px-1 py-1 text-center font-mono tabular-nums border border-slate-200 rounded bg-white"
                          />
                        </td>
                      ))}
                      <td className="py-1.5 px-1 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={entry.praktikIbadahHafalan ?? ''}
                          onChange={(e) =>
                            handleGradeChange(sum.student.id, 'praktik', e.target.value)
                          }
                          className="w-12 px-1 py-1 text-center font-mono tabular-nums border border-slate-200 rounded bg-white"
                        />
                      </td>
                      <td className="py-1.5 px-1 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={entry.sts ?? ''}
                          onChange={(e) => handleGradeChange(sum.student.id, 'sts', e.target.value)}
                          className="w-12 px-1 py-1 text-center font-mono tabular-nums border border-slate-200 rounded bg-white"
                        />
                      </td>
                      <td className="py-1.5 px-1 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={entry.sas ?? ''}
                          onChange={(e) => handleGradeChange(sum.student.id, 'sas', e.target.value)}
                          className="w-12 px-1 py-1 text-center font-mono tabular-nums border border-slate-200 rounded bg-white"
                        />
                      </td>
                      <td className="py-2 px-2 text-center font-mono tabular-nums font-bold text-emerald-900 bg-emerald-50/40">
                        {sum.nilaiAkhir}
                      </td>
                      <td className="py-2 px-2 text-center font-bold text-slate-900">
                        {sum.predikat}
                      </td>
                      <td className={`py-2 px-2 ${statusCls}`}>{sum.statusKKTP}</td>
                      <td className="py-2 px-2.5 text-[11px] text-slate-700 leading-relaxed">
                        {sum.deskripsiRapor}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-8 text-xs text-center print-avoid-break">
            <div>
              <p className="text-slate-600">Mengetahui,</p>
              <p className="font-semibold text-slate-900">Kepala {activeClass.satuanPendidikan}</p>
              <div className="h-16" />
              <p className="font-bold underline text-slate-900">{activeClass.namaKepsek}</p>
              <p className="font-mono text-slate-600">
                NIP.{' '}
                {activeClass.nipKepsek !== '-'
                  ? activeClass.nipKepsek
                  : '................................'}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                {activeClass.kotaPenetapan},{' '}
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="font-semibold text-slate-900">
                Guru Mata Pelajaran {activeClass.mapel}
              </p>
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
