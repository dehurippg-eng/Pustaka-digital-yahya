import React, { useEffect, useMemo, useState } from 'react';
import {
  Archive,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  LogOut,
  Menu,
  TableProperties,
  UserCog,
  Users,
  X,
} from 'lucide-react';
import { AcademicPlannerPanel } from './components/AcademicPlannerPanel';
import { AdminUsersPanel } from './components/AdminUsersPanel';
import { AuthView } from './components/AuthView';
import { ClassroomRecordsPanel } from './components/ClassroomRecordsPanel';
import { CurriculumExplorer } from './components/CurriculumExplorer';
import { ModuleArchive } from './components/ModuleArchive';
import { ModuleGenerator } from './components/ModuleGenerator';
import { ProfilePanel } from './components/ProfilePanel';
import { computeKaldikSummary, createDefaultKaldikConfig } from './data/academicPlanner';
import {
  deleteModuleApi,
  fetchCurrentUser,
  fetchPlannerApi,
  getStoredToken,
  listModulesApi,
  setStoredToken,
} from './lib/api';
import type {
  BabPilihan,
  FaseKurikulum2026,
  KaldikConfig,
  MateriPilihan,
  ModulAjarDeepLearning,
  PertemuanOption,
  UserAccount,
} from './types/curriculum';

type WorkspaceTab =
  | 'catalog'
  | 'generator'
  | 'archive'
  | 'kaldik'
  | 'prota'
  | 'prosem'
  | 'attendance'
  | 'grades'
  | 'admin-users'
  | 'profile';

const TAB_LABELS: Record<WorkspaceTab, string> = {
  catalog: 'Katalog CP, ATP & Dalil 2026',
  generator: 'Generator Modul Ajar & Media Deep Learning',
  archive: 'Arsip Perangkat Ajar',
  kaldik: 'Kalender Pendidikan (Kaldik) 2026/2027',
  prota: 'Program Tahunan (Prota) Otomatis',
  prosem: 'Program Semester (Prosem) Otomatis',
  attendance: 'Daftar Hadir Siswa Otomatis',
  grades: 'Rekap Nilai & Deskripsi Rapor Otomatis',
  'admin-users': 'Kelola Akun Guru PAI',
  profile: 'Foto Profil & Keamanan Akun',
};

export default function App() {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('catalog');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCurriculum, setSelectedCurriculum] = useState<{
    faseData: FaseKurikulum2026;
    bab: BabPilihan;
    materi: MateriPilihan;
    pertemuanKe?: PertemuanOption;
  } | null>(null);
  const [loadedModule, setLoadedModule] = useState<ModulAjarDeepLearning | null>(null);

  const [savedModules, setSavedModules] = useState<ModulAjarDeepLearning[]>([]);
  const [loadingModules, setLoadingModules] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const [sharedKaldikConfig, setSharedKaldikConfig] = useState<KaldikConfig>(() =>
    createDefaultKaldikConfig('Sekolah (PAI & Budi Pekerti)', 'SD/MI', 'PAI dan Budi Pekerti')
  );

  const kaldikSummary = useMemo(
    () => computeKaldikSummary(sharedKaldikConfig),
    [sharedKaldikConfig]
  );

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setBootstrapping(false);
      return;
    }
    fetchCurrentUser()
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => {
        setStoredToken(null);
      })
      .finally(() => {
        setBootstrapping(false);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      setSavedModules([]);
      return;
    }
    setLoadingModules(true);
    listModulesApi()
      .then((res) => setSavedModules(res.modules))
      .catch(() => setSavedModules([]))
      .finally(() => setLoadingModules(false));

    const fallbackJenjang =
      user.jenjang === 'Semua Jenjang' ? 'SD/MI' : user.jenjang;
    fetchPlannerApi()
      .then((res) => {
        if (res.planner?.kaldikConfig) {
          setSharedKaldikConfig(res.planner.kaldikConfig);
        } else {
          setSharedKaldikConfig(
            createDefaultKaldikConfig('Sekolah (PAI & Budi Pekerti)', fallbackJenjang, 'PAI dan Budi Pekerti')
          );
        }
      })
      .catch(() => {
        setSharedKaldikConfig(
          createDefaultKaldikConfig('Sekolah (PAI & Budi Pekerti)', fallbackJenjang, 'PAI dan Budi Pekerti')
        );
      });
  }, [user]);

  const handleLoginSuccess = (token: string, loggedUser: UserAccount) => {
    setStoredToken(token);
    setUser(loggedUser);
    setPreviewMode(false);
    setActiveTab('catalog');
  };

  const handleLogout = () => {
    setStoredToken(null);
    setUser(null);
    setPreviewMode(false);
    setActiveTab('catalog');
    setMobileMenuOpen(false);
  };

  const handleCreateModuleFromSelection = (
    faseData: FaseKurikulum2026,
    bab: BabPilihan,
    materi: MateriPilihan,
    pertemuanKe: PertemuanOption
  ) => {
    setLoadedModule(null);
    setSelectedCurriculum({ faseData, bab, materi, pertemuanKe });
    setActiveTab('generator');
    setMobileMenuOpen(false);
  };

  const handleModuleSaved = (saved: ModulAjarDeepLearning) => {
    setSavedModules((prev) => {
      const exists = prev.some((m) => m.id === saved.id);
      if (exists) {
        return prev.map((m) => (m.id === saved.id ? saved : m));
      }
      return [saved, ...prev];
    });
  };

  const handleDeleteModule = async (id: string) => {
    await deleteModuleApi(id);
    setSavedModules((prev) => prev.filter((m) => m.id !== id));
  };

  if (bootstrapping) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
        <div className="text-sm text-slate-600">Memuat Ruang Kerja Pustaka PAI Merdeka 2026...</div>
      </div>
    );
  }

  if (!user && !previewMode) {
    return (
      <AuthView
        onLoginSuccess={handleLoginSuccess}
        onPreviewCurriculum={() => setPreviewMode(true)}
      />
    );
  }

  if (!user && previewMode) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex flex-col">
        <header className="w-full border-b border-slate-200 bg-white sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
              Pustaka PAI Merdeka 2026
            </span>
            <p className="hidden md:block text-xs text-slate-500 whitespace-nowrap shrink-0">
              Mode Pratinjau Katalog CP & ATP 2026 (SD/MI – SMA/MA)
            </p>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setPreviewMode(false)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Masuk Portal Guru / Admin
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl w-full mx-auto px-6 py-6">
          <CurriculumExplorer
            isAuthenticated={false}
            user={null}
            onRequireLogin={() => setPreviewMode(false)}
          />
        </main>
      </div>
    );
  }

  type NavGroup = {
    title: string;
    items: {
      id: WorkspaceTab;
      label: string;
      icon: React.FC<{ className?: string }>;
      adminOnly?: boolean;
    }[];
  };

  const navGroups: NavGroup[] = [
    {
      title: 'Perangkat Pembelajaran',
      items: [
        { id: 'catalog', label: 'Katalog CP, ATP & Dalil', icon: BookOpen },
        { id: 'generator', label: 'Modul Ajar & Media', icon: FileText },
        { id: 'archive', label: 'Arsip Perangkat Ajar', icon: Archive },
      ],
    },
    {
      title: 'Program & Kalender',
      items: [
        { id: 'kaldik', label: 'Kalender Pendidikan', icon: CalendarDays },
        { id: 'prota', label: 'Program Tahunan (Prota)', icon: TableProperties },
        { id: 'prosem', label: 'Program Semester (Prosem)', icon: FileSpreadsheet },
      ],
    },
    {
      title: 'Siswa & Penilaian',
      items: [
        { id: 'attendance', label: 'Daftar Hadir Siswa', icon: ClipboardCheck },
        { id: 'grades', label: 'Rekap Nilai & Rapor', icon: GraduationCap },
      ],
    },
    {
      title: 'Pengaturan Akun',
      items: [
        { id: 'admin-users', label: 'Kelola Akun Guru', icon: Users, adminOnly: true },
        { id: 'profile', label: 'Ganti Foto & Profil', icon: UserCog },
      ],
    },
  ];

  const SidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-200 overflow-y-auto">
      <div>
        <div className="px-5 py-5 border-b border-slate-100">
          <p className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Pustaka PAI Merdeka
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Kurikulum 2026 · SD/MI–SMA/MA</p>
        </div>

        <nav className="p-3 space-y-4">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.adminOnly || user?.role === 'admin'
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.title}>
                <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-900'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-emerald-700' : 'text-slate-400'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </span>
                        {item.id === 'archive' && savedModules.length > 0 && (
                          <span className="text-xs font-mono tabular-nums text-slate-500">
                            {savedModules.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 space-y-3 shrink-0">
        <button
          type="button"
          onClick={() => {
            setActiveTab('profile');
            setMobileMenuOpen(false);
          }}
          title="Klik untuk ganti foto profil & keamanan akun"
          className="w-full flex items-center gap-3 text-left rounded-lg p-1.5 -m-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {(user?.avatarUrl || (user?.role === 'admin' && !avatarError)) ? (
            <img
              src={user?.avatarUrl || '/src/assets/images/avatar_admin_yahya_1795085547771.jpg'}
              alt={user?.name || 'Profil'}
              referrerPolicy="no-referrer"
              onError={() => setAvatarError(true)}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {user?.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">{user?.name}</p>
            <p className="text-[11px] text-slate-500 truncate">
              {user?.role === 'admin'
                ? 'Guru SMAN 2 Kuala Mandor B'
                : `Guru PAI · ${user?.jenjang}`}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:text-red-700 hover:bg-red-50 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      <aside className="no-print hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        {SidebarContent}
      </aside>

      {mobileMenuOpen && (
        <div className="no-print fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full z-10">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup menu"
              className="absolute right-3 top-4 p-1.5 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
            {SidebarContent}
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Buka navigasi"
                className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-sm min-w-0">
                <span className="text-slate-400 hidden sm:inline">Ruang Kerja</span>
                <span className="text-slate-300 hidden sm:inline">/</span>
                <h1 className="font-semibold text-slate-900 truncate">
                  {TAB_LABELS[activeTab]}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="hidden md:inline text-xs text-slate-500 whitespace-nowrap">
                {user?.name} · {user?.school}
              </span>
              {activeTab !== 'generator' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('generator')}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Susun Modul Ajar
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-[1360px] w-full mx-auto">
          {user?.mustChangePassword && activeTab !== 'profile' && (
            <div className="no-print mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <p className="text-amber-950">
                Anda masih menggunakan kata sandi sementara yang dibuatkan oleh Admin. Demi
                keamanan akun, silakan perbarui kata sandi Anda.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ubah Kata Sandi
              </button>
            </div>
          )}

          {activeTab === 'catalog' && (
            <CurriculumExplorer
              isAuthenticated={true}
              user={user}
              onCreateModuleFromSelection={handleCreateModuleFromSelection}
            />
          )}

          {activeTab === 'generator' && user && (
            <ModuleGenerator
              user={user}
              initialSelection={selectedCurriculum}
              loadedModule={loadedModule}
              onModuleSaved={handleModuleSaved}
            />
          )}

          {activeTab === 'archive' && (
            <ModuleArchive
              modules={savedModules}
              loading={loadingModules}
              onOpenModule={(mod) => {
                setLoadedModule(mod);
                setActiveTab('generator');
              }}
              onDeleteModule={handleDeleteModule}
              onCreateNew={() => {
                setLoadedModule(null);
                setActiveTab('generator');
              }}
            />
          )}

          {(activeTab === 'kaldik' || activeTab === 'prota' || activeTab === 'prosem') && user && (
            <AcademicPlannerPanel
              user={user}
              activeSubTab={activeTab}
              onSubTabChange={(t) => setActiveTab(t)}
              onKaldikConfigChange={(cfg) => setSharedKaldikConfig(cfg)}
            />
          )}

          {(activeTab === 'attendance' || activeTab === 'grades') && user && (
            <ClassroomRecordsPanel
              user={user}
              activeSubTab={activeTab}
              onSubTabChange={(t) => setActiveTab(t)}
              kaldikSummary={kaldikSummary}
            />
          )}

          {activeTab === 'admin-users' && user?.role === 'admin' && (
            <AdminUsersPanel currentAdmin={user} />
          )}

          {activeTab === 'profile' && user && (
            <ProfilePanel
              user={user}
              onUserUpdated={(updated) => {
                setAvatarError(false);
                setUser(updated);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
