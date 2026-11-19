import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import type {
  ClassroomRecord,
  JalurKurikulum,
  Jenjang,
  MapelPAI,
  ModulAjarDeepLearning,
  PertemuanOption,
  PlannerSettings,
  UserAccount,
  UserRole,
} from './src/types/curriculum.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

interface StoredUser extends UserAccount {
  passwordHash: string;
  passwordSalt: string;
}

interface DatabaseSchema {
  sessionSecret: string;
  users: StoredUser[];
  modules: ModulAjarDeepLearning[];
  planners: Record<string, PlannerSettings>;
  classrooms: ClassroomRecord[];
}

function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const usedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, usedSalt, 64).toString('hex');
  return { hash, salt: usedSalt };
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  const a = Buffer.from(derived, 'hex');
  const b = Buffer.from(hash, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function createDefaultDb(): DatabaseSchema {
  const adminCreds = hashPassword('123456');
  return {
    sessionSecret: crypto.randomBytes(32).toString('hex'),
    users: [
      {
        id: 'admin-yahya-2026',
        name: 'Yahya, S.Pd.I',
        email: 'ppgyahya2025@gmail.com',
        role: 'admin',
        nip: '',
        school: 'SMAN 2 Kuala Mandor B',
        jenjang: 'Semua Jenjang',
        active: true,
        mustChangePassword: false,
        createdAt: new Date().toISOString(),
        passwordHash: adminCreds.hash,
        passwordSalt: adminCreds.salt,
      },
    ],
    modules: [],
    planners: {},
    classrooms: [],
  };
}

function readDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    const initial = createDefaultDb();
    writeDb(initial);
    return initial;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    if (!parsed.users || !Array.isArray(parsed.users) || parsed.users.length === 0) {
      const initial = createDefaultDb();
      writeDb(initial);
      return initial;
    }
    if (!parsed.sessionSecret) {
      parsed.sessionSecret = crypto.randomBytes(32).toString('hex');
      writeDb(parsed);
    }
    if (!Array.isArray(parsed.modules)) {
      parsed.modules = [];
    }
    if (!parsed.planners || typeof parsed.planners !== 'object') {
      parsed.planners = {};
    }
    if (!Array.isArray(parsed.classrooms)) {
      parsed.classrooms = [];
    }
    let changed = false;
    parsed.users = parsed.users.map((u) => {
      if (u.role === 'admin' && u.id === 'admin-yahya-2026') {
        const nextNip = '';
        const nextSchool =
          u.school === 'Administrator Pusat PAI Merdeka' ? 'SMAN 2 Kuala Mandor B' : u.school;
        if (u.nip !== nextNip || u.school !== nextSchool) {
          changed = true;
          return { ...u, nip: nextNip, school: nextSchool };
        }
      }
      return u;
    });
    if (changed) {
      writeDb(parsed);
    }
    return parsed;
  } catch {
    const initial = createDefaultDb();
    writeDb(initial);
    return initial;
  }
}

function writeDb(db: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tmpPath = `${DB_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(tmpPath, DB_PATH);
}

function sanitizeUser(user: StoredUser): UserAccount {
  const { passwordHash: _ph, passwordSalt: _ps, ...publicUser } = user;
  return publicUser;
}

interface TokenPayload {
  sub: string;
  role: UserRole;
  exp: number;
}

function signToken(payload: TokenPayload, secret: string): string {
  const encoded = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

function verifyToken(token: string, secret: string): TokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8')) as TokenPayload;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

interface AuthedRequest extends Request {
  currentUser?: StoredUser;
}

function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) {
    res.status(401).json({ error: 'Sesi login tidak ditemukan. Silakan masuk terlebih dahulu.' });
    return;
  }
  const db = readDb();
  const payload = verifyToken(token, db.sessionSecret);
  if (!payload) {
    res.status(401).json({ error: 'Sesi telah berakhir atau tidak valid. Silakan login ulang.' });
    return;
  }
  const user = db.users.find((u) => u.id === payload.sub);
  if (!user || !user.active) {
    res.status(403).json({ error: 'Akun tidak ditemukan atau sedang dinonaktifkan oleh Admin.' });
    return;
  }
  req.currentUser = user;
  next();
}

function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction): void {
  if (!req.currentUser || req.currentUser.role !== 'admin') {
    res.status(403).json({ error: 'Akses ditolak. Fitur ini hanya untuk Admin PAI.' });
    return;
  }
  next();
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  // Ensure DB is seeded on startup
  readDb();

  const app = express();
  app.use(express.json({ limit: '4mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'pustaka-pai-merdeka-2026' });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      res.status(400).json({ error: 'Email dan kata sandi wajib diisi.' });
      return;
    }
    const db = readDb();
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user || !verifyPassword(String(password), user.passwordHash, user.passwordSalt)) {
      res.status(401).json({ error: 'Email atau kata sandi tidak sesuai.' });
      return;
    }
    if (!user.active) {
      res.status(403).json({ error: 'Akun Anda sedang dinonaktifkan oleh Admin.' });
      return;
    }

    const token = signToken(
      {
        sub: user.id,
        role: user.role,
        exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
      },
      db.sessionSecret
    );

    res.json({
      token,
      user: sanitizeUser(user),
    });
  });

  // Auth: Current user
  app.get('/api/auth/me', requireAuth, (req: AuthedRequest, res) => {
    res.json({ user: sanitizeUser(req.currentUser!) });
  });

  // Auth: Change own password
  app.post('/api/auth/change-password', requireAuth, (req: AuthedRequest, res) => {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword || String(newPassword).length < 6) {
      res.status(400).json({ error: 'Kata sandi baru minimal 6 karakter.' });
      return;
    }
    const db = readDb();
    const idx = db.users.findIndex((u) => u.id === req.currentUser!.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
      return;
    }
    const target = db.users[idx];
    if (!verifyPassword(String(currentPassword), target.passwordHash, target.passwordSalt)) {
      res.status(400).json({ error: 'Kata sandi saat ini tidak cocok.' });
      return;
    }
    const updatedCreds = hashPassword(String(newPassword));
    db.users[idx] = {
      ...target,
      passwordHash: updatedCreds.hash,
      passwordSalt: updatedCreds.salt,
      mustChangePassword: false,
    };
    writeDb(db);
    res.json({ ok: true, user: sanitizeUser(db.users[idx]) });
  });

  // Auth: Update own profile photo (Admin & Guru)
  app.post('/api/auth/profile-photo', requireAuth, (req: AuthedRequest, res) => {
    const { avatarUrl } = req.body || {};
    if (typeof avatarUrl !== 'string') {
      res.status(400).json({ error: 'Format foto profil tidak valid.' });
      return;
    }
    const trimmed = avatarUrl.trim();
    if (
      trimmed !== '' &&
      !trimmed.startsWith('data:image/') &&
      !trimmed.startsWith('/src/assets/')
    ) {
      res.status(400).json({ error: 'Foto profil harus berupa file gambar yang valid.' });
      return;
    }
    if (trimmed.length > 900_000) {
      res.status(400).json({ error: 'Ukuran gambar terlalu besar. Gunakan gambar di bawah 700 KB.' });
      return;
    }

    const db = readDb();
    const idx = db.users.findIndex((u) => u.id === req.currentUser!.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
      return;
    }
    db.users[idx] = {
      ...db.users[idx],
      avatarUrl: trimmed,
    };
    writeDb(db);
    res.json({ ok: true, user: sanitizeUser(db.users[idx]) });
  });

  // Admin: List all accounts
  app.get('/api/admin/users', requireAuth, requireAdmin, (_req, res) => {
    const db = readDb();
    res.json({ users: db.users.map(sanitizeUser) });
  });

  // Admin: Create teacher account
  app.post('/api/admin/users', requireAuth, requireAdmin, (req, res) => {
    const { name, email, password, nip, school, jenjang } = req.body || {};
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Nama guru, email, dan kata sandi sementara wajib diisi.' });
      return;
    }
    if (String(password).length < 6) {
      res.status(400).json({ error: 'Kata sandi sementara minimal 6 karakter.' });
      return;
    }
    const db = readDb();
    const normalizedEmail = String(email).trim().toLowerCase();
    if (db.users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      res.status(409).json({ error: 'Email sudah terdaftar pada akun lain.' });
      return;
    }
    const creds = hashPassword(String(password));
    const newUser: StoredUser = {
      id: `guru-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      name: String(name).trim(),
      email: normalizedEmail,
      role: 'guru',
      nip: nip ? String(nip).trim() : '',
      school: school ? String(school).trim() : 'Sekolah/Madrasah PAI',
      jenjang: (jenjang as Jenjang | 'Semua Jenjang') || 'SD/MI',
      active: true,
      mustChangePassword: true,
      createdAt: new Date().toISOString(),
      passwordHash: creds.hash,
      passwordSalt: creds.salt,
    };
    db.users.push(newUser);
    writeDb(db);
    res.status(201).json({ user: sanitizeUser(newUser) });
  });

  // Admin: Update teacher account or reset temp password
  app.patch('/api/admin/users/:id', requireAuth, requireAdmin, (req: AuthedRequest, res) => {
    const { id } = req.params;
    const { name, nip, school, jenjang, active, resetPassword } = req.body || {};
    const db = readDb();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Akun tidak ditemukan.' });
      return;
    }
    const target = db.users[idx];
    if (target.id === req.currentUser!.id && active === false) {
      res.status(400).json({ error: 'Admin utama tidak dapat menonaktifkan akun sendiri.' });
      return;
    }
    let passwordHash = target.passwordHash;
    let passwordSalt = target.passwordSalt;
    let mustChangePassword = target.mustChangePassword;
    if (resetPassword && String(resetPassword).length >= 6) {
      const creds = hashPassword(String(resetPassword));
      passwordHash = creds.hash;
      passwordSalt = creds.salt;
      mustChangePassword = true;
    }
    db.users[idx] = {
      ...target,
      name: name !== undefined ? String(name).trim() : target.name,
      nip: nip !== undefined ? String(nip).trim() : target.nip,
      school: school !== undefined ? String(school).trim() : target.school,
      jenjang: jenjang !== undefined ? jenjang : target.jenjang,
      active: active !== undefined ? Boolean(active) : target.active,
      passwordHash,
      passwordSalt,
      mustChangePassword,
    };
    writeDb(db);
    res.json({ user: sanitizeUser(db.users[idx]) });
  });

  // Admin: Delete teacher account
  app.delete('/api/admin/users/:id', requireAuth, requireAdmin, (req: AuthedRequest, res) => {
    const { id } = req.params;
    if (id === req.currentUser!.id) {
      res.status(400).json({ error: 'Akun Admin utama tidak dapat dihapus.' });
      return;
    }
    const db = readDb();
    const before = db.users.length;
    db.users = db.users.filter((u) => u.id !== id);
    if (db.users.length === before) {
      res.status(404).json({ error: 'Akun guru tidak ditemukan.' });
      return;
    }
    writeDb(db);
    res.json({ ok: true });
  });

  // Modules: List saved modules
  app.get('/api/modules', requireAuth, (req: AuthedRequest, res) => {
    const db = readDb();
    const visible =
      req.currentUser!.role === 'admin'
        ? db.modules
        : db.modules.filter((m) => m.authorId === req.currentUser!.id);
    res.json({ modules: visible });
  });

  // Modules: Save or update module
  app.post('/api/modules', requireAuth, (req: AuthedRequest, res) => {
    const modul = req.body as ModulAjarDeepLearning;
    if (!modul || !modul.identitas || !modul.lampiran) {
      res.status(400).json({ error: 'Format Modul Ajar tidak lengkap.' });
      return;
    }
    const db = readDb();
    const now = new Date().toISOString();
    const existingIdx = db.modules.findIndex((m) => m.id === modul.id);
    if (existingIdx >= 0) {
      const existing = db.modules[existingIdx];
      if (existing.authorId !== req.currentUser!.id && req.currentUser!.role !== 'admin') {
        res.status(403).json({ error: 'Tidak memiliki izin memperbarui modul guru lain.' });
        return;
      }
      db.modules[existingIdx] = {
        ...modul,
        updatedAt: now,
      };
      writeDb(db);
      res.json({ module: db.modules[existingIdx] });
      return;
    }

    const saved: ModulAjarDeepLearning = {
      ...modul,
      id: modul.id || `mod-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      authorId: req.currentUser!.id,
      authorName: req.currentUser!.name,
      createdAt: now,
      updatedAt: now,
    };
    db.modules.unshift(saved);
    writeDb(db);
    res.status(201).json({ module: saved });
  });

  // Modules: Delete module
  app.delete('/api/modules/:id', requireAuth, (req: AuthedRequest, res) => {
    const { id } = req.params;
    const db = readDb();
    const target = db.modules.find((m) => m.id === id);
    if (!target) {
      res.status(404).json({ error: 'Modul ajar tidak ditemukan.' });
      return;
    }
    if (target.authorId !== req.currentUser!.id && req.currentUser!.role !== 'admin') {
      res.status(403).json({ error: 'Tidak memiliki izin menghapus modul ini.' });
      return;
    }
    db.modules = db.modules.filter((m) => m.id !== id);
    writeDb(db);
    res.json({ ok: true });
  });

  // Planner (Kaldik, Prota, Prosem): Get current user's planner settings
  app.get('/api/planner', requireAuth, (req: AuthedRequest, res) => {
    const db = readDb();
    const planner = db.planners[req.currentUser!.id] || null;
    res.json({ planner });
  });

  // Planner: Save current user's planner settings
  app.put('/api/planner', requireAuth, (req: AuthedRequest, res) => {
    const payload = req.body as PlannerSettings;
    if (!payload || !payload.kaldikConfig) {
      res.status(400).json({ error: 'Konfigurasi Kaldik, Prota & Prosem tidak valid.' });
      return;
    }
    const db = readDb();
    const saved: PlannerSettings = {
      ...payload,
      authorId: req.currentUser!.id,
      updatedAt: new Date().toISOString(),
    };
    db.planners[req.currentUser!.id] = saved;
    writeDb(db);
    res.json({ planner: saved });
  });

  // Classrooms (Daftar Hadir & Rekap Nilai): List visible classrooms
  app.get('/api/classrooms', requireAuth, (req: AuthedRequest, res) => {
    const db = readDb();
    const visible =
      req.currentUser!.role === 'admin'
        ? db.classrooms
        : db.classrooms.filter((c) => c.authorId === req.currentUser!.id);
    res.json({ classrooms: visible });
  });

  // Classrooms: Create or update classroom record
  app.post('/api/classrooms', requireAuth, (req: AuthedRequest, res) => {
    const classroom = req.body as ClassroomRecord;
    if (!classroom || !classroom.namaKelas || !Array.isArray(classroom.siswa)) {
      res.status(400).json({ error: 'Data rombel kelas dan daftar siswa tidak lengkap.' });
      return;
    }
    const db = readDb();
    const now = new Date().toISOString();
    const existingIdx = db.classrooms.findIndex((c) => c.id === classroom.id);
    if (existingIdx >= 0) {
      const existing = db.classrooms[existingIdx];
      if (existing.authorId !== req.currentUser!.id && req.currentUser!.role !== 'admin') {
        res.status(403).json({ error: 'Tidak memiliki izin memperbarui kelas guru lain.' });
        return;
      }
      db.classrooms[existingIdx] = {
        ...classroom,
        updatedAt: now,
      };
      writeDb(db);
      res.json({ classroom: db.classrooms[existingIdx] });
      return;
    }

    const saved: ClassroomRecord = {
      ...classroom,
      id: classroom.id || `cls-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      authorId: req.currentUser!.id,
      updatedAt: now,
    };
    db.classrooms.unshift(saved);
    writeDb(db);
    res.status(201).json({ classroom: saved });
  });

  // Classrooms: Delete classroom
  app.delete('/api/classrooms/:id', requireAuth, (req: AuthedRequest, res) => {
    const { id } = req.params;
    const db = readDb();
    const target = db.classrooms.find((c) => c.id === id);
    if (!target) {
      res.status(404).json({ error: 'Data kelas tidak ditemukan.' });
      return;
    }
    if (target.authorId !== req.currentUser!.id && req.currentUser!.role !== 'admin') {
      res.status(403).json({ error: 'Tidak memiliki izin menghapus data kelas ini.' });
      return;
    }
    db.classrooms = db.classrooms.filter((c) => c.id !== id);
    writeDb(db);
    res.json({ ok: true });
  });

  // AI: Explore deeper Tafsir & additional Qur'an/Hadith references
  app.post('/api/dalil/explore', requireAuth, async (req: AuthedRequest, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Layanan AI belum dikonfigurasi pada server. Pastikan GEMINI_API_KEY tersedia di panel Secrets.',
      });
      return;
    }

    const { jenjang, jalur, mataPelajaran, fase, kelas, babJudul, materiJudul, ayatUtama, hadisUtama } = req.body || {};
    if (!materiJudul || !ayatUtama) {
      res.status(400).json({ error: 'Data materi dan ayat utama wajib disertakan.' });
      return;
    }

    try {
      const prompt = `Anda adalah pakar Pendidikan Agama Islam (PAI), Madrasah (Kemenag RI), dan Tafsir-Hadis Indonesia Kurikulum Merdeka 2026.
Jalur: ${jalur || 'Sekolah (PAI & Budi Pekerti)'}
Mata Pelajaran: ${mataPelajaran || 'PAI dan Budi Pekerti'}
Jenjang: ${jenjang} (Fase ${fase}, ${kelas})
Bab: ${babJudul}
Materi: ${materiJudul}
Ayat Utama: ${ayatUtama.surah} ayat ${ayatUtama.ayat} ("${ayatUtama.terjemah}")
Hadis Utama: ${hadisUtama.perawi} ("${hadisUtama.terjemah}")

Berikan pendalaman keilmuan akurat untuk Guru ${mataPelajaran || 'PAI'} berupa:
1. Asbabun Nuzul / konteks turunnya ayat secara ringkas dan shahih (jika tidak ada riwayat khusus, jelaskan munasabah/konteks surah).
2. Dua (2) Ayat Al-Qur'an pendukung tambahan yang relevan (lengkap Surah, nomor ayat, teks Arab berharakat akurat, transliterasi, dan terjemahan Kemenag RI).
3. Satu (1) Hadis pendukung tambahan yang shahih/hasan (lengkap Perawi, teks Arab, terjemahan, dan relevansi untuk siswa ${jenjang}).
4. Strategi mengajarkan dalil ini secara Deep Learning (Berkesadaran, Bermakna, Menggembirakan) untuk siswa ${kelas} pada mata pelajaran ${mataPelajaran || 'PAI dan Budi Pekerti'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction:
            'Jawablah dengan akurat dalam bahasa Indonesia baku dan teks Arab Al-Qur’an/Hadis berharakat yang valid sesuai mushaf standar Kemenag RI.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              konteksAyat: { type: Type.STRING },
              ayatPendukung: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    surah: { type: Type.STRING },
                    ayat: { type: Type.STRING },
                    arab: { type: Type.STRING },
                    latin: { type: Type.STRING },
                    terjemah: { type: Type.STRING },
                    keterkaitan: { type: Type.STRING },
                  },
                },
              },
              hadisPendukung: {
                type: Type.OBJECT,
                properties: {
                  perawi: { type: Type.STRING },
                  derajat: { type: Type.STRING },
                  arab: { type: Type.STRING },
                  terjemah: { type: Type.STRING },
                  hikmah: { type: Type.STRING },
                },
              },
              strategiDeepLearning: { type: Type.STRING },
            },
          },
        },
      });

      const data = JSON.parse((response.text ?? '{}').trim());
      res.json({ enrichment: data });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menghubungi layanan AI.';
      res.status(502).json({ error: `Gagal memperdalam dalil: ${msg}` });
    }
  });

  // AI: Generate complete Deep Learning Modul Ajar + 8 Lampiran
  app.post('/api/modules/generate', requireAuth, async (req: AuthedRequest, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Layanan AI belum dikonfigurasi pada server. Anda tetap dapat membuat modul menggunakan template standar Kurikulum 2026.',
      });
      return;
    }

    const {
      jenjang,
      jalur,
      mataPelajaran,
      fase,
      kelas,
      semester,
      elemen,
      babJudul,
      materi,
      cpElemen,
      atpList,
      satuanPendidikan,
      alokasiJP,
      pertemuanKe,
      modelPembelajaran,
      catatanKonteks,
      kotaPenetapan,
      tanggalPenetapan,
      namaKepsek,
      nipKepsek,
    } = req.body || {};

    if (!materi || !babJudul) {
      res.status(400).json({ error: 'Bab dan Materi pilihan wajib ditentukan.' });
      return;
    }

    const resolvedJalur: JalurKurikulum = jalur || 'Sekolah (PAI & Budi Pekerti)';
    const resolvedMapel: MapelPAI = mataPelajaran || 'PAI dan Budi Pekerti';
    const resolvedPertemuan: PertemuanOption = pertemuanKe || 'Pertemuan 1–3 (Utuh)';
    const totalMenit =
      Number(alokasiJP || 6) * (jenjang === 'SD/MI' ? 35 : jenjang === 'SMP/MTs' ? 40 : 45);

    try {
      const prompt = `Susunlah Modul Ajar ${resolvedMapel} (${resolvedJalur}) Kurikulum Merdeka 2026 berbasis Pembelajaran Mendalam (Deep Learning) LENGKAP beserta 8 LAMPIRAN siap pakai.

Data Perangkat:
- Penyusun: ${req.currentUser!.name}
- Satuan Pendidikan: ${satuanPendidikan || req.currentUser!.school}
- Jalur / Mata Pelajaran: ${resolvedJalur} / ${resolvedMapel}
- Jenjang / Fase / Kelas: ${jenjang} / Fase ${fase} / ${kelas} (Semester ${semester})
- Target Pertemuan: ${resolvedPertemuan}
- Elemen / Kajian: ${elemen}
- Bab: ${babJudul}
- Materi: ${materi.judul} (${materi.ringkasan})
- Alokasi Waktu: ${alokasiJP} JP (${totalMenit} menit)
- Model Pembelajaran: ${modelPembelajaran}
- Capaian Pembelajaran 2026: ${cpElemen}
- Alur Tujuan Pembelajaran: ${(atpList || []).map((a: { kode: string; tujuanPembelajaran: string }) => `${a.kode}: ${a.tujuanPembelajaran}`).join('; ')}
- Ayat Utama: ${materi.ayatUtama.surah}: ${materi.ayatUtama.ayat} ("${materi.ayatUtama.terjemah}")
- Hadis Utama: ${materi.hadisUtama.perawi} ("${materi.hadisUtama.terjemah}")
${catatanKonteks ? `- Catatan Konteks Siswa/Sekolah: ${catatanKonteks}` : ''}

Ketentuan Wajib:
1. Fokus aktivitas langkah pembelajaran harus selaras dengan target "${resolvedPertemuan}" (Pertemuan 1 berfokus pada pemahaman konsep, asesmen awal & tadabbur dalil; Pertemuan 2 berfokus pada kolaborasi LKPD, studi kasus/proyek & praktik aplikasi; Pertemuan 3 berfokus pada presentasi karya, asesmen sumatif & refleksi komitmen; atau lengkap 1–3).
2. Gunakan pendekatan Pembelajaran Mendalam (Deep Learning) dengan 3 tahap pengalaman belajar: "Memahami", "Mengaplikasi", "Merefleksi" serta prinsip Berkesadaran (Mindful), Bermakna (Meaningful), Menggembirakan (Joyful). Total durasi ketiga tahap harus sama dengan ${totalMenit} menit.
2. Gunakan 8 Dimensi Profil Lulusan 2026 (Keimanan dan Ketakwaan terhadap Tuhan YME, Kewargaan, Penalaran Kritis, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi) yang paling relevan.
3. Susun 8 LAMPIRAN secara utuh, mendalam, dan kontekstual sesuai usia peserta didik ${jenjang} (${kelas}):
   - Lampiran 1: Bahan Ajar & Implementasi Dalil
   - Lampiran 2: LKPD Deep Learning (Mandiri + Studi Kasus Kelompok + Rubrik)
   - Lampiran 3: Instrumen Asesmen Awal Diagnostik + Pemetaan Diferensiasi
   - Lampiran 4: Instrumen & Rubrik Asesmen Formatif (Observasi Sikap + Rubrik Skor 1-4)
   - Lampiran 5: Kisi-kisi + 5 Soal Pilihan Ganda HOTS (opsi A-${jenjang === 'SMA/MA' ? 'E' : 'D'}) + 3 Soal Uraian Analitis + Kunci/Pedoman
   - Lampiran 6: Program Pengayaan dan Remedial
   - Lampiran 7: Lembar Refleksi Peserta Didik dan Guru
   - Lampiran 8: Glosarium (minimal 6 istilah) dan Daftar Pustaka Kurikulum 2026.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction:
            'Anda adalah Tim Pengembang Perangkat Ajar PAI Nasional Kurikulum Merdeka 2026. Hasilkan JSON yang sangat rapi, operasional, siap cetak oleh guru di kelas, dan penuh nilai pedagogis Islami.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              identifikasi: {
                type: Type.OBJECT,
                properties: {
                  kesiapanPesertaDidik: { type: Type.STRING },
                  karakteristikMateri: { type: Type.STRING },
                  targetPesertaDidik: { type: Type.STRING },
                  saranaPrasarana: { type: Type.STRING },
                  dimensiProfilLulusan: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
              },
              desainPembelajaran: {
                type: Type.OBJECT,
                properties: {
                  lintasDisiplinIlmu: { type: Type.STRING },
                  topikPembelajaran: { type: Type.STRING },
                  pemahamanBermakna: { type: Type.STRING },
                  pertanyaanPemantik: { type: Type.ARRAY, items: { type: Type.STRING } },
                  praktikPedagogis: { type: Type.STRING },
                  kemitraanPembelajaran: { type: Type.STRING },
                  lingkunganPembelajaran: { type: Type.STRING },
                  pemanfaatanDigital: { type: Type.STRING },
                },
              },
              pengalamanBelajar: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    tahap: { type: Type.STRING },
                    prinsip: { type: Type.STRING },
                    durasiMenit: { type: Type.INTEGER },
                    aktivitasGuru: { type: Type.ARRAY, items: { type: Type.STRING } },
                    aktivitasSiswa: { type: Type.ARRAY, items: { type: Type.STRING } },
                    integrasiDalil: { type: Type.STRING },
                  },
                },
              },
              asesmenRingkas: {
                type: Type.OBJECT,
                properties: {
                  asesmenAwal: { type: Type.STRING },
                  asesmenProses: { type: Type.STRING },
                  asesmenAkhir: { type: Type.STRING },
                },
              },
              lampiran: {
                type: Type.OBJECT,
                properties: {
                  lampiran1BahanAjar: {
                    type: Type.OBJECT,
                    properties: {
                      judul: { type: Type.STRING },
                      petaKonsep: { type: Type.ARRAY, items: { type: Type.STRING } },
                      uraianMateriInti: { type: Type.STRING },
                      implementasiKehidupan: { type: Type.STRING },
                    },
                  },
                  lampiran2LKPD: {
                    type: Type.OBJECT,
                    properties: {
                      judulLKPD: { type: Type.STRING },
                      petunjukBelajar: { type: Type.ARRAY, items: { type: Type.STRING } },
                      aktivitasMandiri: {
                        type: Type.OBJECT,
                        properties: {
                          instruksi: { type: Type.STRING },
                          pertanyaan: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                      },
                      aktivitasKelompok: {
                        type: Type.OBJECT,
                        properties: {
                          studiKasus: { type: Type.STRING },
                          langkahKerja: { type: Type.ARRAY, items: { type: Type.STRING } },
                          produkKarya: { type: Type.STRING },
                        },
                      },
                      rubrikPenilaianLKPD: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            aspek: { type: Type.STRING },
                            bobot: { type: Type.INTEGER },
                            kriteria: { type: Type.STRING },
                          },
                        },
                      },
                    },
                  },
                  lampiran3AsesmenAwal: {
                    type: Type.OBJECT,
                    properties: {
                      tujuanDiagnostik: { type: Type.STRING },
                      asesmenNonKognitif: { type: Type.ARRAY, items: { type: Type.STRING } },
                      pertanyaanDiagnostikKognitif: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            nomor: { type: Type.INTEGER },
                            pertanyaan: { type: Type.STRING },
                            indikatorKesiapan: { type: Type.STRING },
                          },
                        },
                      },
                      pemetaanDiferensiasi: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            kategori: { type: Type.STRING },
                            tindakLanjut: { type: Type.STRING },
                          },
                        },
                      },
                    },
                  },
                  lampiran4AsesmenFormatif: {
                    type: Type.OBJECT,
                    properties: {
                      teknikPenilaian: { type: Type.STRING },
                      lembarObservasiSikap: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            aspek: { type: Type.STRING },
                            indikator: { type: Type.STRING },
                          },
                        },
                      },
                      rubrikUnjukKerja: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            kriteria: { type: Type.STRING },
                            skor4: { type: Type.STRING },
                            skor3: { type: Type.STRING },
                            skor2: { type: Type.STRING },
                            skor1: { type: Type.STRING },
                          },
                        },
                      },
                    },
                  },
                  lampiran5AsesmenSumatif: {
                    type: Type.OBJECT,
                    properties: {
                      kisiKisi: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            indikatorSoal: { type: Type.STRING },
                            levelKognitif: { type: Type.STRING },
                            bentukSoal: { type: Type.STRING },
                            nomorSoal: { type: Type.STRING },
                          },
                        },
                      },
                      soalPilihanGanda: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            nomor: { type: Type.INTEGER },
                            levelKognitif: { type: Type.STRING },
                            pertanyaan: { type: Type.STRING },
                            opsi: { type: Type.ARRAY, items: { type: Type.STRING } },
                            kunciJawaban: { type: Type.STRING },
                            pembahasan: { type: Type.STRING },
                          },
                        },
                      },
                      soalUraian: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            nomor: { type: Type.INTEGER },
                            pertanyaan: { type: Type.STRING },
                            pedomanJawaban: { type: Type.STRING },
                            skorMaksimal: { type: Type.INTEGER },
                          },
                        },
                      },
                    },
                  },
                  lampiran6PengayaanRemedial: {
                    type: Type.OBJECT,
                    properties: {
                      kriteriaKetuntasan: { type: Type.STRING },
                      programPengayaan: {
                        type: Type.OBJECT,
                        properties: {
                          sasaran: { type: Type.STRING },
                          bentukKegiatan: { type: Type.ARRAY, items: { type: Type.STRING } },
                          tagihanProduk: { type: Type.STRING },
                        },
                      },
                      programRemedial: {
                        type: Type.OBJECT,
                        properties: {
                          sasaran: { type: Type.STRING },
                          langkahPembelajaran: { type: Type.ARRAY, items: { type: Type.STRING } },
                          evaluasiUlang: { type: Type.STRING },
                        },
                      },
                    },
                  },
                  lampiran7Refleksi: {
                    type: Type.OBJECT,
                    properties: {
                      refleksiPesertaDidik: { type: Type.ARRAY, items: { type: Type.STRING } },
                      refleksiGuru: { type: Type.ARRAY, items: { type: Type.STRING } },
                      rencanaTindakLanjut: { type: Type.STRING },
                    },
                  },
                  lampiran8GlosariumPustaka: {
                    type: Type.OBJECT,
                    properties: {
                      glosarium: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            istilah: { type: Type.STRING },
                            definisi: { type: Type.STRING },
                          },
                        },
                      },
                      daftarPustaka: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                  },
                },
              },
            },
          },
        },
      });

      const generated = JSON.parse((response.text ?? '{}').trim());
      const now = new Date().toISOString();
      const minutesPerJp = jenjang === 'SD/MI' ? 35 : jenjang === 'SMP/MTs' ? 40 : 45;

      const fullModule: ModulAjarDeepLearning = {
        id: `mod-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
        createdAt: now,
        updatedAt: now,
        authorId: req.currentUser!.id,
        authorName: req.currentUser!.name,
        sourceMode: 'ai',
        identitas: {
          namaPenyusun: req.currentUser!.name,
          nipPenyusun: req.currentUser!.nip || '-',
          satuanPendidikan: satuanPendidikan || req.currentUser!.school,
          tahunAjaran: '2026/2027',
          jenjang,
          jalur: resolvedJalur,
          mataPelajaran: resolvedMapel,
          fase,
          kelas,
          semester,
          pertemuanKe: resolvedPertemuan,
          elemen,
          babJudul,
          materiJudul: materi.judul,
          alokasiWaktu: `${alokasiJP} JP · ${resolvedPertemuan} (${alokasiJP} × ${minutesPerJp} menit)`,
          kotaPenetapan: kotaPenetapan || 'Indonesia',
          tanggalPenetapan:
            tanggalPenetapan ||
            new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
          namaKepsek: namaKepsek || 'Kepala Sekolah / Madrasah',
          nipKepsek: nipKepsek || '-',
        },
        identifikasi: generated.identifikasi,
        desainPembelajaran: {
          capaianPembelajaran2026: cpElemen,
          tujuanPembelajaran: (atpList || []).map(
            (a: { kode: string; tujuanPembelajaran: string }) => `${a.kode}: ${a.tujuanPembelajaran}`
          ),
          dalilInti: {
            ayat: materi.ayatUtama,
            hadis: materi.hadisUtama,
          },
          ...generated.desainPembelajaran,
        },
        pengalamanBelajar: generated.pengalamanBelajar,
        asesmenRingkas: generated.asesmenRingkas,
        lampiran: {
          ...generated.lampiran,
          lampiran1BahanAjar: {
            ...generated.lampiran.lampiran1BahanAjar,
            ayatAlQuran: materi.ayatUtama,
            hadisRelevan: materi.hadisUtama,
          },
        },
      };

      res.json({ module: fullModule });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menyusun modul ajar AI.';
      res.status(502).json({ error: `Gagal menghasilkan Modul Ajar: ${msg}` });
    }
  });

  // Frontend Vite / Static handling
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server Pustaka PAI Merdeka 2026 berjalan pada port ${port}`);
  });
}

startServer();
