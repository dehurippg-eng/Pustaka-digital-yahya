import React, { useRef, useState } from 'react';
import { Camera, Check, KeyRound, ShieldCheck, Trash2 } from 'lucide-react';
import { changePasswordApi, updateProfilePhotoApi } from '../lib/api';
import type { UserAccount } from '../types/curriculum';

interface ProfilePanelProps {
  user: UserAccount;
  onUserUpdated: (user: UserAccount) => void;
}

const DEFAULT_ADMIN_AVATAR = '/src/assets/images/avatar_admin_yahya_1795085547771.jpg';

function resizeImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('File bukan gambar yang valid.'));
      img.onload = () => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Browser tidak mendukung pemrosesan gambar.'));
          return;
        }
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ user, onUserUpdated }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatarError, setAvatarError] = useState(false);

  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [photoSuccess, setPhotoSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const effectiveAvatar =
    user.avatarUrl && user.avatarUrl.trim() !== ''
      ? user.avatarUrl
      : user.role === 'admin'
        ? DEFAULT_ADMIN_AVATAR
        : '';

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setPhotoError('');
    setPhotoSuccess('');
    if (!file.type.startsWith('image/')) {
      setPhotoError('Pilih file gambar (JPG, PNG, atau WebP).');
      return;
    }

    setPhotoLoading(true);
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      const res = await updateProfilePhotoApi(dataUrl);
      setAvatarError(false);
      onUserUpdated(res.user);
      setPhotoSuccess('Foto profil berhasil diperbarui.');
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : 'Gagal memperbarui foto profil.');
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleResetPhoto = async () => {
    setPhotoError('');
    setPhotoSuccess('');
    setPhotoLoading(true);
    try {
      const res = await updateProfilePhotoApi('');
      setAvatarError(false);
      onUserUpdated(res.user);
      setPhotoSuccess('Foto profil dikembalikan ke tampilan awal.');
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : 'Gagal menghapus foto profil.');
    } finally {
      setPhotoLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      const res = await changePasswordApi(currentPassword, newPassword);
      onUserUpdated(res.user);
      setSuccess('Kata sandi Anda berhasil diperbarui.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memperbarui kata sandi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {effectiveAvatar && !avatarError ? (
              <img
                src={effectiveAvatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={() => setAvatarError(true)}
                className="w-16 h-16 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-800 text-white font-bold text-xl flex items-center justify-center">
                {user.name
                  .split(' ')
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-emerald-700">
              {user.role === 'admin'
                ? 'Administrator · Guru SMAN 2 Kuala Mandor B'
                : 'Guru Pendidikan Agama Islam'}
            </p>
            <h2 className="text-lg font-bold text-slate-900 truncate">{user.name}</h2>
            <p className="text-xs font-mono text-slate-500 truncate">{user.email}</p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoSelect}
              className="hidden"
            />
            <button
              type="button"
              disabled={photoLoading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-xs font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{photoLoading ? 'Mengunggah...' : 'Ganti Foto Profil'}</span>
            </button>

            {user.avatarUrl && user.avatarUrl.trim() !== '' && (
              <button
                type="button"
                disabled={photoLoading}
                onClick={handleResetPhoto}
                className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-slate-300 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Foto</span>
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Berlaku untuk akun Admin & Guru PAI (JPG, PNG, atau WebP, otomatis disesuaikan).
          </p>
          {photoError && (
            <p className="text-xs text-red-700 font-medium">{photoError}</p>
          )}
          {photoSuccess && (
            <p className="text-xs text-emerald-800 font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{photoSuccess}</span>
            </p>
          )}
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Satuan Pendidikan</span>
            <span className="text-slate-900 font-medium text-right">{user.school}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Jenjang Ampuan</span>
            <span className="text-slate-900 font-medium text-right">{user.jenjang}</span>
          </div>
          {user.role === 'admin' ? (
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Jabatan / Status Guru</span>
              <span className="text-slate-900 font-medium text-right">
                Guru SMAN 2 Kuala Mandor B
              </span>
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">NIP / NUPTK</span>
              <span className="text-slate-900 font-mono text-xs text-right">
                {user.nip || '-'}
              </span>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Status Akun</span>
            <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Aktif</span>
            </span>
          </div>
        </div>
      </section>

      <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-700" />
            <span>Ubah Kata Sandi</span>
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Disarankan untuk mengganti kata sandi sementara dengan kata sandi pribadi yang aman.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Kata Sandi Saat Ini
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Kata Sandi Baru (Minimal 6 karakter)
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            {loading ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
          </button>
        </form>
      </section>
    </div>
  );
};
