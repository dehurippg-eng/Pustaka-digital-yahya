import type { FaseKurikulum2026, JalurKurikulum, MapelPAI } from '../types/curriculum';
import { FASE_A_DATA } from './fases/faseA';
import { FASE_B_DATA } from './fases/faseB';
import { FASE_C_DATA } from './fases/faseC';
import { FASE_D_DATA } from './fases/faseD';
import { FASE_E_DATA } from './fases/faseE';
import { FASE_F_DATA } from './fases/faseF';
import { MADRASAH_MA_FASES } from './madrasah/madrasahMA';
import { MADRASAH_MI_FASES } from './madrasah/madrasahMI';
import { MADRASAH_MTS_FASE_D } from './madrasah/madrasahMTs';

export const DIMENSI_PROFIL_LULUSAN_2026 = [
  'Keimanan dan Ketakwaan terhadap Tuhan YME',
  'Kewargaan',
  'Penalaran Kritis',
  'Kreativitas',
  'Kolaborasi',
  'Kemandirian',
  'Kesehatan',
  'Komunikasi',
] as const;

export const MODEL_PEMBELAJARAN_DEEP_LEARNING = [
  'Problem Based Learning (PBL) — Berkesadaran & Bermakna',
  'Project Based Learning (PjBL) — Kontekstual & Kolaboratif',
  'Discovery & Inquiry Learning — Tadabbur Ayat & Eksplorasi',
  'Cooperative Learning (Jigsaw / Think-Pair-Share) — Menggembirakan',
  'Contextual Teaching and Learning (CTL) — Living Values PAI',
] as const;

export const MAPEL_SEKOLAH: MapelPAI[] = ['PAI dan Budi Pekerti'];

export const MAPEL_MADRASAH: MapelPAI[] = [
  'Al-Qur’an Hadis',
  'Akidah Akhlak',
  'Fikih',
  'Sejarah Kebudayaan Islam (SKI)',
  'Bahasa Arab',
  'Ilmu Tafsir & Ilmu Hadis',
  'Ushul Fikih',
];

export const KURIKULUM_PAI_2026: FaseKurikulum2026[] = [
  FASE_A_DATA,
  FASE_B_DATA,
  FASE_C_DATA,
  FASE_D_DATA,
  FASE_E_DATA,
  FASE_F_DATA,
].map((fase) => ({
  ...fase,
  jalur: 'Sekolah (PAI & Budi Pekerti)' as JalurKurikulum,
  babList: fase.babList.map((bab) => ({
    ...bab,
    mapel: bab.mapel || ('PAI dan Budi Pekerti' as MapelPAI),
  })),
}));

export const KURIKULUM_MADRASAH_2026: FaseKurikulum2026[] = [
  ...MADRASAH_MI_FASES,
  MADRASAH_MTS_FASE_D,
  ...MADRASAH_MA_FASES,
];

export function getKurikulumByJalur(jalur: JalurKurikulum): FaseKurikulum2026[] {
  return jalur === 'Madrasah (Kemenag RI)'
    ? KURIKULUM_MADRASAH_2026
    : KURIKULUM_PAI_2026;
}
