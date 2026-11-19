import React, { useMemo, useState } from 'react';
import { Download, Eye, Search, Trash2, FilePlus2 } from 'lucide-react';
import { exportModuleAsWordDoc } from '../data/moduleBuilder';
import type { Jenjang, ModulAjarDeepLearning } from '../types/curriculum';

interface ModuleArchiveProps {
  modules: ModulAjarDeepLearning[];
  loading: boolean;
  onOpenModule: (modul: ModulAjarDeepLearning) => void;
  onDeleteModule: (id: string) => Promise<void>;
  onCreateNew: () => void;
}

export const ModuleArchive: React.FC<ModuleArchiveProps> = ({
  modules,
  loading,
  onOpenModule,
  onDeleteModule,
  onCreateNew,
}) => {
  const [query, setQuery] = useState('');
  const [filterJenjang, setFilterJenjang] = useState<'Semua' | Jenjang>('Semua');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return modules.filter((m) => {
      if (filterJenjang !== 'Semua' && m.identitas.jenjang !== filterJenjang) return false;
      if (!q) return true;
      return (
        m.identitas.materiJudul.toLowerCase().includes(q) ||
        m.identitas.babJudul.toLowerCase().includes(q) ||
        (m.identitas.mataPelajaran || '').toLowerCase().includes(q) ||
        m.identitas.namaPenyusun.toLowerCase().includes(q) ||
        m.identitas.satuanPendidikan.toLowerCase().includes(q)
      );
    });
  }, [modules, query, filterJenjang]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDeleteModule(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-emerald-700 mb-1">
              Dokumentasi Perangkat Ajar Tersimpan
            </p>
            <h2 className="text-xl font-bold text-slate-900">Arsip Modul Ajar Deep Learning</h2>
          </div>

          <button
            type="button"
            onClick={onCreateNew}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FilePlus2 className="w-4 h-4" />
            <span>Buat Modul Baru</span>
          </button>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul materi, bab, penyusun, atau sekolah..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
            {(['Semua', 'SD/MI', 'SMP/MTs', 'SMA/MA'] as const).map((j) => (
              <button
                key={j}
                type="button"
                onClick={() => setFilterJenjang(j)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filterJenjang === j
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-slate-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="border border-dashed border-slate-300 rounded-xl p-10 text-center space-y-3">
              <p className="text-sm font-medium text-slate-800">
                {modules.length === 0
                  ? 'Belum ada Modul Ajar yang disimpan ke arsip.'
                  : 'Tidak ada modul ajar yang cocok dengan kata kunci pencarian.'}
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Susun modul ajar lengkap dengan 8 lampiran pada menu Generator Modul Ajar lalu klik
                Simpan Arsip untuk menyimpannya di sini.
              </p>
              <button
                type="button"
                onClick={onCreateNew}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Mulai Susun Modul Ajar
              </button>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold text-slate-700">Materi & Bab</th>
                    <th className="py-3 px-4 font-semibold text-slate-700">Jenjang / Fase</th>
                    <th className="py-3 px-4 font-semibold text-slate-700">Penyusun</th>
                    <th className="py-3 px-4 font-semibold text-slate-700">Diperbarui</th>
                    <th className="py-3 px-4 font-semibold text-slate-700 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((mod) => (
                    <tr key={mod.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{mod.identitas.materiJudul}</p>
                        <p className="text-xs text-slate-500">
                          {mod.identitas.mataPelajaran || 'PAI dan Budi Pekerti'} ·{' '}
                          {mod.identitas.babJudul} · {mod.identitas.elemen}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                        {mod.identitas.jenjang} · Fase {mod.identitas.fase} ({mod.identitas.kelas} ·{' '}
                        Sem {mod.identitas.semester === 'Ganjil' ? '1' : mod.identitas.semester === 'Genap' ? '2' : mod.identitas.semester})
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-slate-800">{mod.identitas.namaPenyusun}</p>
                        <p className="text-xs text-slate-500">{mod.identitas.satuanPendidikan}</p>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs tabular-nums text-slate-500 whitespace-nowrap">
                        {new Date(mod.updatedAt).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onOpenModule(mod)}
                            className="px-2.5 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Buka</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => exportModuleAsWordDoc(mod)}
                            title="Unduh Word (.doc)"
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(mod.id)}
                            disabled={deletingId === mod.id}
                            title="Hapus Modul"
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
