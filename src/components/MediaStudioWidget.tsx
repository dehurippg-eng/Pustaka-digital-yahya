import React, { useState } from 'react';
import {
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  MonitorPlay,
  RotateCw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { exportMediaSlidesWord } from '../data/mediaBuilder';
import type { PaketMediaOtomatis } from '../types/curriculum';

interface MediaStudioWidgetProps {
  media: PaketMediaOtomatis;
  satuanPendidikan: string;
  namaGuru: string;
}

export const MediaStudioWidget: React.FC<MediaStudioWidgetProps> = ({
  media,
  satuanPendidikan,
  namaGuru,
}) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [fullscreen, setFullscreen] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const safeIdx = Math.min(slideIdx, Math.max(0, media.slides.length - 1));
  const currentSlide = media.slides[safeIdx];

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    if (!currentSlide) return;
    window.speechSynthesis.cancel();
    const text = [
      currentSlide.judulSlide,
      currentSlide.subjudul,
      currentSlide.terjemah ? `Artinya: ${currentSlide.terjemah}` : '',
      ...currentSlide.poinUtama,
    ]
      .filter(Boolean)
      .join('. ');
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'id-ID';
    utter.rate = 0.96;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const SlideStage = currentSlide ? (
    <div
      className={`border border-slate-200 rounded-xl bg-white flex flex-col justify-between ${
        fullscreen ? 'p-8 sm:p-12 h-full' : 'p-5 sm:p-7 min-h-[320px]'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-emerald-700">
              Slide {currentSlide.nomor} dari {media.slides.length} · {media.elemenFokus}
            </p>
            <h4
              className={`font-bold text-slate-900 mt-1 ${
                fullscreen ? 'text-2xl sm:text-3xl' : 'text-lg'
              }`}
            >
              {currentSlide.judulSlide}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">{currentSlide.subjudul}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleToggleSpeech}
              title="Bacakan ringkasan slide dengan suara"
              className="px-2.5 py-1.5 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
            >
              {speaking ? <VolumeX className="w-3.5 h-3.5 text-red-600" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{speaking ? 'Hentikan' : 'Baca Suara'}</span>
            </button>
            <button
              type="button"
              onClick={() => setFullscreen((v) => !v)}
              className="px-2.5 py-1.5 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg flex items-center gap-1 cursor-pointer"
            >
              {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{fullscreen ? 'Keluar Proyektor' : 'Mode Proyektor'}</span>
            </button>
          </div>
        </div>

        {currentSlide.teksArab && (
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-4 space-y-2">
            <p
              className={`font-arabic text-slate-900 text-right ${
                fullscreen ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
              }`}
            >
              {currentSlide.teksArab}
            </p>
            {currentSlide.transliterasi && (
              <p className="text-xs italic text-slate-600">{currentSlide.transliterasi}</p>
            )}
            {currentSlide.terjemah && (
              <p className="text-sm font-medium text-slate-800">
                Artinya: “{currentSlide.terjemah}”
              </p>
            )}
          </div>
        )}

        <ul className={`space-y-2 text-slate-800 ${fullscreen ? 'text-lg' : 'text-sm'}`}>
          {currentSlide.poinUtama.map((poin, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="font-mono text-xs font-bold text-emerald-700 mt-1 tabular-nums">
                0{idx + 1}.
              </span>
              <span className="leading-relaxed">{poin}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Panduan Guru:</span>{' '}
          {currentSlide.catatanGuru}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={safeIdx === 0}
            onClick={() => setSlideIdx((i) => Math.max(0, i - 1))}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>
          <button
            type="button"
            disabled={safeIdx >= media.slides.length - 1}
            onClick={() => setSlideIdx((i) => Math.min(media.slides.length - 1, i + 1))}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="space-y-5">
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 p-4 sm:p-8 flex items-center justify-center">
          <div className="w-full max-w-5xl h-full max-h-[680px]">{SlideStage}</div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-emerald-800">
            <MonitorPlay className="w-4 h-4 shrink-0" />
            <h3 className="text-sm font-bold">{media.judulPaket}</h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            {media.jenisMediaUtama} · {media.ringkasanPenggunaan}
          </p>
        </div>

        <button
          type="button"
          onClick={() => exportMediaSlidesWord(media, satuanPendidikan, namaGuru)}
          className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh Paket Slide & Kartu (.doc)</span>
        </button>
      </div>

      {SlideStage}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 space-y-2.5">
          <p className="text-xs font-bold text-slate-800">
            Kartu Konsep & Tadabbur Dalil Interaktif (Klik Kartu untuk Balik Jawaban)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {media.kartuKonsep.map((card) => {
              const flipped = Boolean(flippedCards[card.id]);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() =>
                    setFlippedCards((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
                  }
                  className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    flipped
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-medium text-emerald-800">
                      {flipped ? 'Penjelasan & Dalil' : 'Sisi Depan Kartu'}
                    </span>
                    <RotateCw className="w-3 h-3 text-slate-400" />
                  </div>
                  {!flipped ? (
                    <p className="text-xs font-bold text-slate-900 leading-snug">{card.depan}</p>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs text-slate-800 leading-relaxed">{card.belakang}</p>
                      <p className="text-[11px] italic text-emerald-900">{card.dalilSingkat}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-2.5">
          <div className="flex items-center gap-2 text-slate-900">
            <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
            <h4 className="text-xs font-bold">{media.aktivitasInteraktif.judul}</h4>
          </div>
          <p className="text-xs text-slate-600">{media.aktivitasInteraktif.instruksi}</p>
          <div className="space-y-1.5 pt-1">
            {media.aktivitasInteraktif.itemChecklist.map((item, idx) => {
              const checked = Boolean(checkedItems[idx]);
              return (
                <label
                  key={idx}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className="mt-0.5 accent-emerald-700"
                  />
                  <span className={checked ? 'line-through text-slate-400' : ''}>{item}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
