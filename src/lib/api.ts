import type {
  AyatQuran,
  ClassroomRecord,
  HadisNabi,
  JalurKurikulum,
  Jenjang,
  MapelPAI,
  ModulAjarDeepLearning,
  PertemuanOption,
  PlannerSettings,
  UserAccount,
} from '../types/curriculum';

const TOKEN_KEY = 'pai_merdeka_2026_token';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Permintaan gagal (${res.status})`);
  }
  return data as T;
}

export async function loginApi(
  email: string,
  password: string
): Promise<{ token: string; user: UserAccount }> {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchCurrentUser(): Promise<{ user: UserAccount }> {
  return apiFetch('/api/auth/me');
}

export async function changePasswordApi(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; user: UserAccount }> {
  return apiFetch('/api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function updateProfilePhotoApi(
  avatarUrl: string
): Promise<{ ok: boolean; user: UserAccount }> {
  return apiFetch('/api/auth/profile-photo', {
    method: 'POST',
    body: JSON.stringify({ avatarUrl }),
  });
}

export async function listUsersApi(): Promise<{ users: UserAccount[] }> {
  return apiFetch('/api/admin/users');
}

export async function createTeacherApi(payload: {
  name: string;
  email: string;
  password: string;
  nip?: string;
  school: string;
  jenjang: Jenjang | 'Semua Jenjang';
}): Promise<{ user: UserAccount }> {
  return apiFetch('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateUserApi(
  id: string,
  payload: {
    name?: string;
    nip?: string;
    school?: string;
    jenjang?: Jenjang | 'Semua Jenjang';
    active?: boolean;
    resetPassword?: string;
  }
): Promise<{ user: UserAccount }> {
  return apiFetch(`/api/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteUserApi(id: string): Promise<{ ok: boolean }> {
  return apiFetch(`/api/admin/users/${id}`, {
    method: 'DELETE',
  });
}

export async function listModulesApi(): Promise<{ modules: ModulAjarDeepLearning[] }> {
  return apiFetch('/api/modules');
}

export async function saveModuleApi(
  modul: ModulAjarDeepLearning
): Promise<{ module: ModulAjarDeepLearning }> {
  return apiFetch('/api/modules', {
    method: 'POST',
    body: JSON.stringify(modul),
  });
}

export async function deleteModuleApi(id: string): Promise<{ ok: boolean }> {
  return apiFetch(`/api/modules/${id}`, {
    method: 'DELETE',
  });
}

export interface DalilEnrichment {
  konteksAyat: string;
  ayatPendukung: {
    surah: string;
    ayat: string;
    arab: string;
    latin: string;
    terjemah: string;
    keterkaitan: string;
  }[];
  hadisPendukung: {
    perawi: string;
    derajat: string;
    arab: string;
    terjemah: string;
    hikmah: string;
  };
  strategiDeepLearning: string;
}

export async function exploreDalilAiApi(payload: {
  jenjang: string;
  jalur?: JalurKurikulum;
  mataPelajaran?: MapelPAI;
  fase: string;
  kelas: string;
  babJudul: string;
  materiJudul: string;
  ayatUtama: AyatQuran;
  hadisUtama: HadisNabi;
}): Promise<{ enrichment: DalilEnrichment }> {
  return apiFetch('/api/dalil/explore', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function generateModuleAiApi(payload: {
  jenjang: Jenjang;
  jalur?: JalurKurikulum;
  mataPelajaran?: MapelPAI;
  fase: string;
  kelas: string;
  semester: string;
  elemen: string;
  babJudul: string;
  materi: unknown;
  cpElemen: string;
  atpList: unknown[];
  satuanPendidikan: string;
  alokasiJP: number;
  pertemuanKe?: PertemuanOption;
  modelPembelajaran: string;
  catatanKonteks?: string;
  kotaPenetapan?: string;
  tanggalPenetapan?: string;
  namaKepsek?: string;
  nipKepsek?: string;
}): Promise<{ module: ModulAjarDeepLearning }> {
  return apiFetch('/api/modules/generate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchPlannerApi(): Promise<{ planner: PlannerSettings | null }> {
  return apiFetch('/api/planner');
}

export async function savePlannerApi(
  planner: PlannerSettings
): Promise<{ planner: PlannerSettings }> {
  return apiFetch('/api/planner', {
    method: 'PUT',
    body: JSON.stringify(planner),
  });
}

export async function listClassroomsApi(): Promise<{ classrooms: ClassroomRecord[] }> {
  return apiFetch('/api/classrooms');
}

export async function saveClassroomApi(
  classroom: ClassroomRecord
): Promise<{ classroom: ClassroomRecord }> {
  return apiFetch('/api/classrooms', {
    method: 'POST',
    body: JSON.stringify(classroom),
  });
}

export async function deleteClassroomApi(id: string): Promise<{ ok: boolean }> {
  return apiFetch(`/api/classrooms/${id}`, {
    method: 'DELETE',
  });
}
