import React, { useEffect, useMemo, useState } from 'react';
import { KeyRound, Plus, Search, Trash2, UserCheck, UserX, Edit3, X } from 'lucide-react';
import {
  createTeacherApi,
  deleteUserApi,
  listUsersApi,
  updateUserApi,
} from '../lib/api';
import type { Jenjang, UserAccount } from '../types/curriculum';

interface AdminUsersPanelProps {
  currentAdmin: UserAccount;
}

export const AdminUsersPanel: React.FC<AdminUsersPanelProps> = ({ currentAdmin }) => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJenjang, setFilterJenjang] = useState<'Semua' | Jenjang | 'Semua Jenjang'>('Semua');

  // Create form modal
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [nip, setNip] = useState('');
  const [school, setSchool] = useState('');
  const [jenjang, setJenjang] = useState<Jenjang | 'Semua Jenjang'>('SD/MI');
  const [submitting, setSubmitting] = useState(false);

  // Edit / Reset modal
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [editName, setEditName] = useState('');
  const [editNip, setEditNip] = useState('');
  const [editSchool, setEditSchool] = useState('');
  const [editJenjang, setEditJenjang] = useState<Jenjang | 'Semua Jenjang'>('SD/MI');
  const [resetTempPass, setResetTempPass] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await listUsersApi();
      setUsers(res.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat daftar akun guru.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter((u) => {
      if (filterJenjang !== 'Semua' && u.jenjang !== filterJenjang) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.school.toLowerCase().includes(q) ||
        (u.nip || '').toLowerCase().includes(q)
      );
    });
  }, [users, searchQuery, filterJenjang]);

  const stats = useMemo(() => {
    const gurus = users.filter((u) => u.role === 'guru');
    const activeGurus = gurus.filter((u) => u.active).length;
    const inactiveGurus = gurus.filter((u) => !u.active).length;
    return {
      totalAkun: users.length,
      totalGuru: gurus.length,
      activeGurus,
      inactiveGurus,
    };
  }, [users]);

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setNotice('');
    try {
      const res = await createTeacherApi({
        name,
        email,
        password,
        nip,
        school,
        jenjang,
      });
      setUsers((prev) => [...prev, res.user]);
      setNotice(
        `Akun Guru PAI atas nama ${res.user.name} (${res.user.email}) berhasil dibuat dengan kata sandi sementara.`
      );
      setName('');
      setEmail('');
      setPassword('123456');
      setNip('');
      setSchool('');
      setJenjang('SD/MI');
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal membuat akun guru.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (target: UserAccount) => {
    setError('');
    setNotice('');
    try {
      const res = await updateUserApi(target.id, { active: !target.active });
      setUsers((prev) => prev.map((u) => (u.id === target.id ? res.user : u)));
      setNotice(
        `Status akun ${res.user.name} diubah menjadi ${res.user.active ? 'Aktif' : 'Nonaktif'}.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengubah status akun.');
    }
  };

  const openEditModal = (u: UserAccount) => {
    setEditingUser(u);
    setEditName(u.name);
    setEditNip(u.nip || '');
    setEditSchool(u.school);
    setEditJenjang(u.jenjang);
    setResetTempPass('');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSubmitting(true);
    setError('');
    setNotice('');
    try {
      const res = await updateUserApi(editingUser.id, {
        name: editName,
        nip: editNip,
        school: editSchool,
        jenjang: editJenjang,
        ...(resetTempPass.trim() ? { resetPassword: resetTempPass.trim() } : {}),
      });
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? res.user : u)));
      setNotice(
        resetTempPass.trim()
          ? `Data & kata sandi sementara untuk ${res.user.name} telah diperbarui.`
          : `Profil akun ${res.user.name} berhasil diperbarui.`
      );
      setEditingUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memperbarui akun.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (target: UserAccount) => {
    setError('');
    setNotice('');
    try {
      await deleteUserApi(target.id);
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
      setNotice(`Akun guru ${target.name} telah dihapus.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus akun.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Total Pengguna Terdaftar</p>
          <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {stats.totalAkun}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Akun Guru PAI</p>
          <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {stats.totalGuru}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Guru Aktif</p>
          <p className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
            {stats.activeGurus}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Guru Nonaktif</p>
          <p className="text-2xl font-bold text-amber-700 font-mono tabular-nums mt-1">
            {stats.inactiveGurus}
          </p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-emerald-700 mb-1">
              Otoritas Administrator · {currentAdmin.name}
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              Manajemen Akun Guru Agama Islam
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Admin berwenang membuatkan akun login baru, mengatur kata sandi sementara, dan
              mengelola akses Guru PAI jenjang SD/MI hingga SMA/MA.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Akun Guru PAI</span>
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
            {error}
          </div>
        )}

        {notice && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
            {notice}
          </div>
        )}

        {showCreateForm && (
          <form
            onSubmit={handleCreateTeacher}
            className="p-5 border border-emerald-200 bg-emerald-50/30 rounded-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Formulir Pendaftaran Akun Guru PAI Baru
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nama Lengkap & Gelar *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ahmad Fauzi, S.Pd.I"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Guru (untuk Login) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guru.pai@sekolah.sch.id"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Kata Sandi Sementara *
                </label>
                <input
                  type="text"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Satuan Pendidikan / Madrasah *
                </label>
                <input
                  type="text"
                  required
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Contoh: SDN 01 Harapan / SMAN 2"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Jenjang Ampuan
                </label>
                <select
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value as Jenjang | 'Semua Jenjang')}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                >
                  <option value="SD/MI">SD/MI</option>
                  <option value="SMP/MTs">SMP/MTs</option>
                  <option value="SMA/MA">SMA/MA</option>
                  <option value="Semua Jenjang">Semua Jenjang</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  NIP / NUPTK (Opsional)
                </label>
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="Nomor Induk Pegawai"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg disabled:bg-emerald-400 cursor-pointer"
              >
                {submitting ? 'Menyimpan...' : 'Daftarkan Akun Guru'}
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama guru, email, NIP, atau sekolah..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <select
            value={filterJenjang}
            onChange={(e) =>
              setFilterJenjang(e.target.value as 'Semua' | Jenjang | 'Semua Jenjang')
            }
            className="px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800"
          >
            <option value="Semua">Semua Jenjang</option>
            <option value="SD/MI">SD/MI</option>
            <option value="SMP/MTs">SMP/MTs</option>
            <option value="SMA/MA">SMA/MA</option>
            <option value="Semua Jenjang">Lintas Jenjang</option>
          </select>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-700">Nama & Email</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">Peran & Jenjang</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">Satuan Pendidikan</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">Status Akses</th>
                  <th className="py-3 px-4 font-semibold text-slate-700 text-right">Kelola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        {u.avatarUrl ? (
                          <img
                            src={u.avatarUrl}
                            alt={u.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                            {u.name
                              .split(' ')
                              .slice(0, 2)
                              .map((w) => w[0])
                              .join('')
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">{u.name}</p>
                          <p className="text-xs font-mono text-slate-500">
                            {u.email}
                            {u.role !== 'admin' && u.nip ? ` · NIP ${u.nip}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                      <span className="font-medium">
                        {u.role === 'admin' ? 'Guru SMAN 2 Kuala Mandor B (Admin)' : 'Guru PAI'}
                      </span>{' '}
                      · {u.jenjang}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{u.school}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium ${
                          u.active ? 'text-emerald-700' : 'text-red-700'
                        }`}
                      >
                        {u.active ? 'Aktif' : 'Nonaktif'}
                      </span>
                      {u.mustChangePassword && (
                        <span className="text-xs text-amber-700 ml-1.5">
                          · Sandi Sementara
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(u)}
                          title="Edit profil & reset password"
                          className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit / Sandi</span>
                        </button>

                        {u.id !== currentAdmin.id && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleToggleActive(u)}
                              title={u.active ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                            >
                              {u.active ? (
                                <UserX className="w-4 h-4 text-amber-700" />
                              ) : (
                                <UserCheck className="w-4 h-4 text-emerald-700" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u)}
                              title="Hapus Akun Guru"
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editingUser && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Edit Data & Reset Kata Sandi
                </h3>
                <p className="text-xs text-slate-500 font-mono">{editingUser.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div
                className={`grid grid-cols-1 ${
                  editingUser.role === 'admin' ? '' : 'sm:grid-cols-2'
                } gap-3`}
              >
                {editingUser.role !== 'admin' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      NIP / NUPTK
                    </label>
                    <input
                      type="text"
                      value={editNip}
                      onChange={(e) => setEditNip(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Jenjang Ampuan
                  </label>
                  <select
                    value={editJenjang}
                    onChange={(e) =>
                      setEditJenjang(e.target.value as Jenjang | 'Semua Jenjang')
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  >
                    <option value="SD/MI">SD/MI</option>
                    <option value="SMP/MTs">SMP/MTs</option>
                    <option value="SMA/MA">SMA/MA</option>
                    <option value="Semua Jenjang">Semua Jenjang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Satuan Pendidikan
                </label>
                <input
                  type="text"
                  required
                  value={editSchool}
                  onChange={(e) => setEditSchool(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mb-1">
                  <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                  <span>Reset Kata Sandi Sementara (Kosongkan jika tidak diubah)</span>
                </label>
                <input
                  type="text"
                  minLength={6}
                  value={resetTempPass}
                  onChange={(e) => setResetTempPass(e.target.value)}
                  placeholder="Masukkan sandi baru minimal 6 karakter"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
