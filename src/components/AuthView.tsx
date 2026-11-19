import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { loginApi } from '../lib/api';
import type { UserAccount } from '../types/curriculum';

interface AuthViewProps {
  onLoginSuccess: (token: string, user: UserAccount) => void;
  onPreviewCurriculum: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  onLoginSuccess,
  onPreviewCurriculum,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await loginApi(email, password);
      onLoginSuccess(result.token, result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal masuk ke sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            Pustaka PAI Merdeka 2026
          </span>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={onPreviewCurriculum}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pratinjau CP & ATP 2026
            </button>
          </nav>
          <div className="shrink-0">
            <button
              type="button"
              onClick={onPreviewCurriculum}
              className="px-4 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Jelajah Katalog
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
            <div className="relative h-64 sm:h-72 bg-emerald-950 overflow-hidden">
              {!imgError ? (
                <img
                  src="/src/assets/images/hero_islamic_archive_1795085547946.jpg"
                  alt="Meja belajar Pendidikan Agama Islam dengan mushaf Al-Qur'an dan buku perangkat ajar Kurikulum Merdeka 2026"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-emerald-200" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <p className="text-xs font-medium text-emerald-200 tracking-wide mb-2">
                  Kurikulum Merdeka 2026 · SD/MI · SMP/MTs · SMA/MA
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight text-balance">
                  Perangkat Ajar PAI Terpadu Berbasis Pembelajaran Mendalam
                </h1>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Platform penyusunan perangkat ajar Pendidikan Agama Islam dan Budi Pekerti dari
                Fase A hingga Fase F. Menghubungkan langsung Capaian Pembelajaran (CP) dan Alur
                Tujuan Pembelajaran (ATP) 2026 dengan ayat Al-Qur’an, hadis shahih, serta Modul Ajar
                Deep Learning lengkap dengan 8 lampiran siap cetak.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-lg font-bold text-slate-900 tabular-nums">Fase A – F</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cakupan lengkap kelas 1 SD/MI sampai 12 SMA/MA
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 tabular-nums">Dalil Terhubung</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Bab & materi pilihan langsung tertaut Al-Qur’an dan Hadis
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 tabular-nums">8 Lampiran</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Bahan ajar, LKPD, asesmen diagnostik–sumatif, & refleksi
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-xs font-medium text-emerald-700 mb-1.5">
                Portal Admin & Guru Agama Islam
              </p>
              <h2 className="text-2xl font-bold text-slate-900">Masuk ke Ruang Kerja</h2>
              <p className="text-sm text-slate-600 mt-1.5">
                Gunakan akun Administrator atau akun Guru PAI yang telah didaftarkan oleh Admin.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ppgyahya2025@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="w-full pl-10 pr-11 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{loading ? 'Memeriksa kredensial...' : 'Masuk ke Portal'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
              <p className="font-medium text-slate-700">Informasi Akses Pengelola</p>
              <p>
                Admin Utama: <span className="font-medium text-slate-800">Yahya, S.Pd.I</span> (Guru
                SMAN 2 Kuala Mandor B) ·{' '}
                <span className="font-mono text-slate-700">ppgyahya2025@gmail.com</span>
              </p>
              <p>
                Guru PAI dapat login menggunakan email dan kata sandi sementara yang dibuatkan oleh
                Admin melalui menu Kelola Akun Guru.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
