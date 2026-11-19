import type { FaseKurikulum2026 } from '../../types/curriculum';

export const MADRASAH_MTS_FASE_D: FaseKurikulum2026 = {
  fase: 'D',
  jenjang: 'SMP/MTs',
  jalur: 'Madrasah (Kemenag RI)',
  kelasRentang: 'Kelas 7 – 9 MTs',
  labelLengkap: 'Fase D · Madrasah Tsanawiyah (MTs Kelas VII, VIII & IX)',
  rasional2026:
    'Kurikulum Madrasah Tsanawiyah (MTs) Fase D Tahun 2026 mengorganisasikan lima mata pelajaran PAI & Bahasa Arab secara terstruktur pada Semester 1 (Ganjil) dan Semester 2 (Genap): Al-Qur’an Hadis (tajwid mad, gharib, dan hadis tematik), Akidah Akhlak (tauhid Asmaul Husna, sifat rasul, akhlak terpuji & adab sosial), Fikih (taharah, salat, sujud, puasa, zakat, penyembelihan, dan muamalah), SKI (dakwah Nabi di Madinah, Khulafaurasyidin, Umayyah, Abbasiyah, Ayyubiyah, hingga Wali Songo), serta Bahasa Arab komunikatif.',
  capaianPembelajaran: [
    {
      elemen: 'Al-Qur’an dan Hadis',
      mapel: 'Al-Qur’an Hadis',
      deskripsiCP:
        'Peserta didik MTs menganalisis hukum bacaan Mad (Mad Tabi’i, Mad Wajib Muttasil, Mad Jaiz Munfasil, Mad Arid Lissukun, Mad Silah, Mad Lazim) dan bacaan Gharib, serta mengkaji hadis tentang infak, optimistis, dan kepedulian sosial.',
    },
    {
      elemen: 'Akidah',
      mapel: 'Akidah Akhlak',
      deskripsiCP:
        'Peserta didik MTs menganalisis sifat wajib, mustahil, jaiz bagi Allah dan Rasul, mukjizat-karamah, bahaya riya-nifaq, serta adab kepada orang tua, guru, dan sesama muslim.',
    },
    {
      elemen: 'Fikih',
      mapel: 'Fikih',
      deskripsiCP:
        'Peserta didik MTs menguasai ketentuan bersuci dari najis dan hadas, salat fardu dan jamak-qasar, sujud sahwi-tilawah-syukur, zakat, kurban-akikah, serta akad muamalah (jual beli, khiyar, qirad, riba).',
    },
    {
      elemen: 'Sejarah Peradaban Islam',
      mapel: 'Sejarah Kebudayaan Islam (SKI)',
      deskripsiCP:
        'Peserta didik MTs menganalisis strategi pembangunan peradaban Madinah, Dinasti Bani Umayyah, kemajuan ilmu pengetahuan masa Daulah Abbasiyah, kejayaan Al-Ayyubiyah, dan sejarah Islam Nusantara serta Wali Songo.',
    },
    {
      elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
      mapel: 'Bahasa Arab',
      deskripsiCP:
        'Peserta didik MTs mampu memahami wacana, berdialog, dan menulis teks sederhana bertema Al-Madrasah, Al-Yaumiyyat, As-Sihhah, Al-Hafizah Al-Bi’iyyah, dan Ra’sus Sanah Al-Hijriyah menggunakan kaidah Mubtada’-Khabar dan Jumlah Fi’liyah.',
    },
  ],
  babList: [
    // SEMESTER 1 (GANJIL)
    {
      id: 'mts-d-qh-1',
      nomorBab: 1,
      judulBab: 'Al-Qur’an Hadis: Hukum Bacaan Mad & Infak di Jalan Allah (QS. Al-Baqarah: 254 & 261)',
      kelas: 'Kelas 8 MTs',
      semester: 'Ganjil',
      elemen: 'Al-Qur’an dan Hadis',
      mapel: 'Al-Qur’an Hadis',
      deskripsiSingkat:
        'Membedakan Mad ‘Iwad, Mad Layyin, dan Mad ‘Arid Lissukun serta mengaitkannya dengan keutamaan infak dan sedekah ikhlas.',
      atpList: [
        {
          kode: 'ATP-MTs.QH.D1',
          kelas: 'Kelas 8 MTs',
          semester: 'Ganjil',
          elemen: 'Al-Qur’an dan Hadis',
          mapel: 'Al-Qur’an Hadis',
          tujuanPembelajaran:
            'Menerapkan hukum bacaan Mad ‘Iwad, Mad Layyin, dan Mad ‘Arid Lissukun dalam membaca ayat tentang infak serta menganalisis dampak sosial filantropi Islam.',
          dimensiProfilLulusan: [
            'Keimanan dan Ketakwaan terhadap Tuhan YME',
            'Penalaran Kritis',
            'Kewargaan',
          ],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'mts-d-qh-m1',
          kode: 'MAT-MTs.QH.D1',
          judul: 'Tajwid Mad Far’i & Spirit Kedermawanan dalam QS. Al-Baqarah: 254',
          ringkasan:
            'Mempraktikkan panjang harakat bacaan Mad saat waqaf dan mengkaji hadis tentang dua malaikat yang mendoakan orang berinfak setiap pagi.',
          kataKunci: ['Mad ‘Arid Lissukun', 'Mad Layyin', 'Infak', 'Filantropi Islam'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '254',
            arab: 'يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْٓا اَنْفِقُوْا مِمَّا رَزَقْنٰكُمْ مِّنْ قَبْلِ اَنْ يَّأْتِيَ يَوْمٌ لَّا بَيْعٌ فِيْهِ وَلَا خُلَّةٌ وَّلَا شَفَاعَةٌ',
            latin:
              'Yā ayyuhal-lażīna āmanū anfiqū mimmā razaqnākum min qabli ay ya’tiya yaumul lā bai‘un fīhi wa lā khullatuw wa lā syafā‘ah.',
            terjemah:
              'Wahai orang-orang yang beriman! Infakkanlah sebagian dari rezeki yang telah Kami berikan kepadamu sebelum datang hari ketika tidak ada lagi jual beli, tidak ada lagi persahabatan, dan tidak ada lagi syafaat.',
            tafsirSingkat:
              'Kesempatan berbagi harta di dunia bersifat terbatas; infak menjadi investasi amal abadi sebelum hari kiamat tiba.',
            keterkaitanMateri:
              'Memadukan analisis kaidah panjang Mad Jaiz Munfasil/Tabi’i dengan penguatan empati sosial siswa MTs.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 1442) & Muslim (No. 1010)',
            kitab: 'Sahih Al-Bukhari, Kitab Az-Zakah',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'مَا مِنْ يَوْمٍ يُصْبِحُ الْعِبَادُ فِيهِ إِلَّا مَلَكَانِ يَنْزِلَانِ فَيَقُولُ أَحَدُهُمَا اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا وَيَقُولُ الْآخَرُ اللَّهُمَّ أَعْطِ مُمْسِكًا تَلَفًا',
            latin:
              'Mā min yaumin yuṣbiḥul-‘ibādu fīhi illā malakāni yanzilāni fayaqūlu aḥaduhumā: Allāhumma a‘ṭi munfiqan khalafan, wa yaqūlul-ākhar: Allāhumma a‘ṭi mumsikan talafā.',
            terjemah:
              'Tidak ada satu pagi pun yang dilalui hamba-hamba melainkan dua malaikat turun; yang satu berdoa: Ya Allah, berikanlah ganti bagi orang yang berinfak, dan yang lain berdoa: Ya Allah, berikanlah kehancuran bagi orang yang kikir.',
            hikmahPedagogis:
              'Membiasakan siswa gemar berinfak sejak dini melalui gerakan infak kelas harian.',
          },
        },
      ],
    },
    {
      id: 'mts-d-aa-1',
      nomorBab: 2,
      judulBab: 'Akidah Akhlak: Sifat-Sifat Allah, Mujahadah An-Nafs, dan Adab Bermedia Sosial',
      kelas: 'Kelas 7 – 8 MTs',
      semester: 'Ganjil',
      elemen: 'Akidah',
      mapel: 'Akidah Akhlak',
      deskripsiSingkat:
        'Mengenal sifat wajib, mustahil, dan jaiz Allah Swt. secara dalil aqli-naqli serta menumbuhkan pengendalian diri (mujahadah an-nafs) dan akhlak ikhlas.',
      atpList: [
        {
          kode: 'ATP-MTs.AA.D1',
          kelas: 'Kelas 7 MTs',
          semester: 'Ganjil',
          elemen: 'Akidah',
          mapel: 'Akidah Akhlak',
          tujuanPembelajaran:
            'Menjelaskan sifat wajib Allah (Nafsiyah, Salbiyah, Ma’ani, Ma’nawiyah) dan mengaitkannya dengan kejujuran serta keteguhan menjaga diri dari riya.',
          dimensiProfilLulusan: [
            'Keimanan dan Ketakwaan terhadap Tuhan YME',
            'Penalaran Kritis',
          ],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'mts-d-aa-m1',
          kode: 'MAT-MTs.AA.D1',
          judul: 'Ikhlas Beramal dan Menjauhi Riya serta Nifaq',
          ringkasan:
            'Membedah ciri penyakit hati (riya dan nifaq) serta cara melatih keikhlasan hati karena keyakinan bahwa Allah Maha Mendengar dan Maha Mengetahui.',
          kataKunci: ['Ikhlas', 'Anti-Riya', 'Sifat Wajib Allah', 'Muraqabah'],
          ayatUtama: {
            surah: 'QS. Al-Bayyinah',
            ayat: '5',
            arab: 'وَمَآ اُمِرُوْٓا اِلَّا لِيَعْبُدُوا اللّٰهَ مُخْلِصِيْنَ لَهُ الدِّيْنَ ەۙ حُنَفَاۤءَ',
            latin: 'Wa mā umirū illā liya‘budullāha mukhliṣīna lahud-dīna ḥunafā’.',
            terjemah:
              'Padahal mereka hanya diperintah menyembah Allah dengan ikhlas menaati-Nya semata-mata karena (menjalankan) agama yang lurus.',
            tafsirSingkat:
              'Keikhlasan merupakan ruh setiap amal ibadah; amal yang dicampuri riya kehilangan nilai di sisi Allah.',
            keterkaitanMateri:
              'Membangun kesadaran batin siswa MTs agar berkarya dan beribadah bukan demi pujian media sosial semata.',
          },
          hadisUtama: {
            perawi: 'HR. Ahmad (No. 23630)',
            kitab: 'Musnad Ahmad',
            derajat: 'Shahih',
            arab: 'إِنَّ أَخْوَفَ مَا أَخَافُ عَلَيْكُمُ الشِّرْكُ الْأَصْغَرُ قَالُوا وَمَا الشِّرْكُ الْأَصْغَرُ يَا رَسُولَ اللَّهِ قَالَ الرِّيَاءُ',
            latin:
              'Inna akhwafa mā akhāfu ‘alaikumusy-syirkul-aṣgar. Qālū: wa masy-syirkul-aṣgaru yā rasūlallāh? Qāla: Ar-riyā’.',
            terjemah:
              'Sesungguhnya perkara yang paling aku khawatirkan menimpa kalian adalah syirik kecil. Para sahabat bertanya: Apakah syirik kecil itu wahai Rasulullah? Beliau menjawab: Riya (pamer).',
            hikmahPedagogis:
              'Melatih integritas moral remaja agar berbuat baik secara konsisten meski tidak dilihat orang lain.',
          },
        },
      ],
    },
    {
      id: 'mts-d-fk-1',
      nomorBab: 3,
      judulBab: 'Fikih: Taharah (Najis & Hadas), Sujud Sahwi, Tilawah, dan Syukur',
      kelas: 'Kelas 7 – 8 MTs',
      semester: 'Ganjil',
      elemen: 'Fikih',
      mapel: 'Fikih',
      deskripsiSingkat:
        'Mengklasifikasikan najis mukhaffafah, mutawassitah, mughallazah, hadas kecil-besar, serta praktik tiga sujud sunah dalam fikih ibadah.',
      atpList: [
        {
          kode: 'ATP-MTs.FK.D1',
          kelas: 'Kelas 8 MTs',
          semester: 'Ganjil',
          elemen: 'Fikih',
          mapel: 'Fikih',
          tujuanPembelajaran:
            'Mempraktikkan tata cara penyucian najis dan tiga macam sujud (sahwi, tilawah, syukur) lengkap dengan bacaan dan sebab disyariatkannya.',
          dimensiProfilLulusan: [
            'Keimanan dan Ketakwaan terhadap Tuhan YME',
            'Kemandirian',
            'Kesehatan',
          ],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'mts-d-fk-m1',
          kode: 'MAT-MTs.FK.D1',
          judul: 'Sujud Sahwi, Sujud Tilawah, dan Sujud Syukur dalam Ibadah',
          ringkasan:
            'Memahami sebab, hukum, dan tata cara pelaksanaan sujud sahwi saat lupa rakaat, sujud tilawah saat ayat sajdah, dan sujud syukur atas nikmat.',
          kataKunci: ['Sujud Sahwi', 'Sujud Tilawah', 'Sujud Syukur', 'Fikih Ibadah'],
          ayatUtama: {
            surah: 'QS. Al-‘Alaq',
            ayat: '19',
            arab: 'كَلَّاۗ لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ ۩',
            latin: 'Kallā, lā tuṭi‘hu wasjud waqtarib.',
            terjemah:
              'Sekali-kali tidak! Janganlah kamu patuh kepadanya; dan sujudlah serta dekatkanlah (dirimu kepada Allah).',
            tafsirSingkat:
              'Sujud adalah puncak kerendahan hati seorang hamba untuk mendekatkan diri (taqarrub) kepada Allah.',
            keterkaitanMateri:
              'QS. Al-‘Alaq ayat 19 merupakan salah satu ayat sajdah yang menjadi sebab langsung pelaksanaan Sujud Tilawah.',
          },
          hadisUtama: {
            perawi: 'HR. Abu Dawud (No. 2774) & At-Tirmidzi',
            kitab: 'Sunan Abi Dawud, Kitab Al-Jihad',
            derajat: 'Hasan Shahih',
            arab: 'كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا أَتَاهُ أَمْرٌ يَسُرُّهُ أَوْ بُشِّرَ بِهِ خَرَّ سَاجِدًا شُكْرًا لِلَّهِ',
            latin:
              'Kānan-nabiyyu ṣallallāhu ‘alaihi wa sallama iżā atāhu amrun yasurruhū au busysyira bihī kharra sājidan syukran lillāh.',
            terjemah:
              'Apabila datang kepada Nabi saw. suatu perkara yang menggembirakan atau kabar gembira, beliau langsung tersungkur sujud sebagai tanda syukur kepada Allah.',
            hikmahPedagogis:
              'Membentuk refleks syukur siswa saat meraih prestasi atau selamat dari musibah.',
          },
        },
      ],
    },
    {
      id: 'mts-d-ski-1',
      nomorBab: 4,
      judulBab: 'SKI: Kemajuan Kebudayaan, Ilmu & Keadilan Masa Daulah Bani Umayyah (Damaskus & Andalusia)',
      kelas: 'Kelas 7 – 8 MTs',
      semester: 'Ganjil',
      elemen: 'Sejarah Peradaban Islam',
      mapel: 'Sejarah Kebudayaan Islam (SKI)',
      deskripsiSingkat:
        'Mengkaji tata kelola pemerintahan, kemajuan arsitektur, serta keteladanan kesederhanaan dan keadilan Khalifah Umar bin Abdul Aziz pada masa Bani Umayyah.',
      atpList: [
        {
          kode: 'ATP-MTs.SKI.D1',
          kelas: 'Kelas 7 MTs',
          semester: 'Ganjil',
          elemen: 'Sejarah Peradaban Islam',
          mapel: 'Sejarah Kebudayaan Islam (SKI)',
          tujuanPembelajaran:
            'Menganalisis faktor kemajuan peradaban Islam masa Bani Umayyah dan meneladani integritas kepemimpinan Khalifah Umar bin Abdul Aziz.',
          dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis', 'Kemandirian'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'mts-d-ski-m1',
          kode: 'MAT-MTs.SKI.D1',
          judul: 'Peradaban Ilmu Daulah Umayyah dan Keteladanan Umar bin Abdul Aziz',
          ringkasan:
            'Menelusuri pusat keilmuan di Damaskus dan Cordoba (Andalusia) serta reformasi keadilan sosial dan kodifikasi hadis masa Umar bin Abdul Aziz.',
          kataKunci: ['Bani Umayyah', 'Umar bin Abdul Aziz', 'Andalusia', 'Keadilan Sosial'],
          ayatUtama: {
            surah: 'QS. An-Nahl',
            ayat: '90',
            arab: 'اِنَّ اللّٰهَ يَأْمُرُ بِالْعَدْلِ وَالْاِحْسَانِ وَاِيْتَاۤئِ ذِى الْقُرْبٰى وَيَنْهٰى عَنِ الْفَحْشَاۤءِ وَالْمُنْكَرِ وَالْبَغْيِ',
            latin:
              'Innallāha ya’muru bil-‘adli wal-iḥsāni wa ītā’i żil-qurbā wa yanhā ‘anil-faḥsyā’i wal-munkari wal-bagy.',
            terjemah:
              'Sesungguhnya Allah menyuruh berlaku adil dan berbuat kebajikan, memberi bantuan kepada kerabat, dan Dia melarang perbuatan keji, kemungkaran, dan permusuhan.',
            tafsirSingkat:
              'Ayat ini menjadi prinsip tata kelola pemerintahan adil yang ditegakkan oleh Khalifah Umar bin Abdul Aziz.',
            keterkaitanMateri:
              'Menghubungkan materi SKI Bani Umayyah di MTs dengan pembentukan karakter pemimpin jujur dan adil.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 1827)',
            kitab: 'Sahih Muslim, Kitab Al-Imarah',
            derajat: 'Shahih',
            arab: 'إِنَّ الْمُقْسِطِينَ عِنْدَ اللَّهِ عَلَى مَنَابِرَ مِنْ نُورٍ عَنْ يَمِينِ الرَّحْمَنِ',
            latin: 'Innal-muqsiṭīna ‘indallāhi ‘alā manābira min nūrin ‘an yamīnir-raḥmān.',
            terjemah:
              'Sesungguhnya orang-orang yang berlaku adil akan berada di sisi Allah di atas mimbar-mimbar cahaya di sebelah kanan Zat Yang Maha Pengasih.',
            hikmahPedagogis:
              'Menginspirasi siswa MTs menjadi pengurus OSIS/kelas yang amanah dan berpihak pada keadilan.',
          },
        },
      ],
    },
    // SEMESTER 2 (GENAP)
    {
      id: 'mts-d-fk-2',
      nomorBab: 5,
      judulBab: 'Fikih: Muamalah Islami (Jual Beli, Khiyar, Qirad, dan Larangan Riba)',
      kelas: 'Kelas 9 MTs',
      semester: 'Genap',
      elemen: 'Fikih',
      mapel: 'Fikih',
      deskripsiSingkat:
        'Mengkaji prinsip fikih muamalah masa kini: syarat jual beli sah, jenis khiyar, kerja sama modal (qirad/mudharabah), serta bahaya transaksi ribawi.',
      atpList: [
        {
          kode: 'ATP-MTs.FK.D2',
          kelas: 'Kelas 9 MTs',
          semester: 'Genap',
          elemen: 'Fikih',
          mapel: 'Fikih',
          tujuanPembelajaran:
            'Mengevaluasi transaksi jual beli daring (e-commerce) dan pinjaman modern berdasarkan prinsip khiyar, qirad, dan larangan riba.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Kemandirian'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'mts-d-fk-m2',
          kode: 'MAT-MTs.FK.D2',
          judul: 'Etika Jual Beli Digital, Khiyar, dan Bebas Riba',
          ringkasan:
            'Menganalisis perlindungan konsumen dalam Islam melalui hak khiyar (majelis, syarat, ‘aib) serta keharaman praktik riba dan penipuan.',
          kataKunci: ['Khiyar', 'Qirad', 'Anti-Riba', 'Muamalah Digital'],
          ayatUtama: {
            surah: 'QS. An-Nisa’',
            ayat: '29',
            arab: 'يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْا لَا تَأْكُلُوْٓا اَمْوَالَكُمْ بَيْنَكُمْ بِالْبَاطِلِ اِلَّآ اَنْ تَكُوْنَ تِجَارَةً عَنْ تَرَاضٍ مِّنْكُمْ',
            latin:
              'Yā ayyuhal-lażīna āmanū lā ta’kulū amwālakum bainakum bil-bāṭili illā an takūna tijāratan ‘an tarāḍim minkum.',
            terjemah:
              'Wahai orang-orang yang beriman! Janganlah kamu saling memakan harta sesamamu dengan jalan yang batil (tidak benar), kecuali dalam perdagangan yang berlaku atas dasar suka sama suka di antara kamu.',
            tafsirSingkat:
              'Prinsip utama muamalah Islam adalah ‘an tarāḍin (kerelaan tanpa paksaan atau penipuan) dan bebas unsur batil.',
            keterkaitanMateri:
              'Membekali siswa MTs menghadapi transaksi online shop dan dompet digital secara syar’i.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 102)',
            kitab: 'Sahih Muslim, Kitab Al-Iman',
            derajat: 'Shahih',
            arab: 'مَنْ غَشَّنَا فَلَيْسَ مِنَّا',
            latin: 'Man gasysyanā falaisa minnā.',
            terjemah: 'Barangsiapa yang menipu kami, maka ia tidak termasuk golongan kami.',
            hikmahPedagogis:
              'Menegaskan integritas anti-penipuan dalam setiap aktivitas ekonomi.',
          },
        },
      ],
    },
    {
      id: 'mts-d-ski-2',
      nomorBab: 6,
      judulBab: 'SKI: Kejayaan Daulah Ayyubiyah (Shalahuddin Al-Ayyubi) & Wali Songo di Nusantara',
      kelas: 'Kelas 8 – 9 MTs',
      semester: 'Genap',
      elemen: 'Sejarah Peradaban Islam',
      mapel: 'Sejarah Kebudayaan Islam (SKI)',
      deskripsiSingkat:
        'Menelusuri kepemimpinan adil dan toleran Shalahuddin Al-Ayyubi serta metode dakwah kultural damai Wali Songo dalam menyebarkan Islam di Indonesia.',
      atpList: [
        {
          kode: 'ATP-MTs.SKI.D2',
          kelas: 'Kelas 9 MTs',
          semester: 'Genap',
          elemen: 'Sejarah Peradaban Islam',
          mapel: 'Sejarah Kebudayaan Islam (SKI)',
          tujuanPembelajaran:
            'Menganalisis nilai toleransi, keberanian, dan kearifan budaya dari perjuangan Shalahuddin Al-Ayyubi serta dakwah Wali Songo.',
          dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'mts-d-ski-m2',
          kode: 'MAT-MTs.SKI.D2',
          judul: 'Kebesaran Jiwa Shalahuddin Al-Ayyubi dan Dakwah Kultural Wali Songo',
          ringkasan:
            'Menggali hikmah akhlak ksatria Shalahuddin Al-Ayyubi saat membebaskan Baitul Maqdis dan strategi damai Wali Songo melalui seni, pesantren, dan budaya lokal.',
            kataKunci: ['Al-Ayyubiyah', 'Wali Songo', 'Dakwah Kultural', 'Moderasi'],
          ayatUtama: {
            surah: 'QS. An-Nahl',
            ayat: '125',
            arab: 'اُدْعُ اِلٰى سَبِيْلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ وَجَادِلْهُمْ بِالَّتِيْ هِيَ اَحْسَنُ',
            latin:
              'Ud‘u ilā sabīli rabbika bil-ḥikmati wal-mau‘iẓatil-ḥasanati wa jādilhum billatī hiya aḥsan.',
            terjemah:
              'Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pengajaran yang baik, dan berdebatlah dengan mereka dengan cara yang baik.',
            tafsirSingkat:
              'Metode dakwah Islam mengedepankan kebijaksanaan (hikmah), keteladanan santun, dan dialog bermartabat.',
            keterkaitanMateri:
              'Menjelaskan rahasia keberhasilan Islam diterima secara damai oleh masyarakat Nusantara oleh Wali Songo.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 69) & Muslim (No. 1734)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-‘Ilm',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'يَسِّرُوا وَلَا تُعَسِّرُوا وَبَشِّرُوا وَلَا تُنَفِّرُوا',
            latin: 'Yassirū wa lā tu‘assirū, wa basysyirū wa lā tunaffirū.',
            terjemah:
              'Mudahkanlah dan jangan mempersulit, berilah kabar gembira dan jangan membuat orang lari (menjauh).',
            hikmahPedagogis:
              'Menginspirasi siswa madrasah berdakwah dengan sikap ramah dan menyejukkan.',
          },
        },
      ],
    },
    {
      id: 'mts-d-ba-2',
      nomorBab: 7,
      judulBab: 'Bahasa Arab: الْحِفَاظُ عَلَى الْبِيْئَةِ وَالصِّحَّةُ (Menjaga Lingkungan & Kesehatan)',
      kelas: 'Kelas 9 MTs',
      semester: 'Genap',
      elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
      mapel: 'Bahasa Arab',
      deskripsiSingkat:
        'Memahami teks bacaan bahasa Arab tentang pelestarian lingkungan dan pola hidup sehat dengan penerapan Fi’il Amr dan Isim Tafdhil.',
      atpList: [
        {
          kode: 'ATP-MTs.BA.D2',
          kelas: 'Kelas 9 MTs',
          semester: 'Genap',
          elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
          mapel: 'Bahasa Arab',
          tujuanPembelajaran:
            'Menyusun kalimat ajakan/perintah (Fi’il Amr) dan perbandingan (Isim Tafdhil) berbahasa Arab tentang menjaga kelestarian alam madrasah.',
          dimensiProfilLulusan: ['Komunikasi', 'Kesehatan', 'Kreativitas'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'mts-d-ba-m2',
          kode: 'MAT-MTs.BA.D2',
          judul: 'Penerapan Fi’il Amr & Isim Tafdhil dalam Tema Menjaga Lingkungan',
          ringkasan:
            'Berlatih menulis poster ajakan kebersihan dan penghijauan madrasah berbahasa Arab dengan struktur gramatika yang benar.',
          kataKunci: ['Al-Bi’ah', 'Fi’il Amr', 'Isim Tafdhil', 'Kitabah'],
          ayatUtama: {
            surah: 'QS. Al-A’raf',
            ayat: '56',
            arab: 'وَلَا تُفْسِدُوْا فِى الْاَرْضِ بَعْدَ اِصْلَاحِهَا وَادْعُوْهُ خَوْفًا وَّطَمَعًا',
            latin: 'Wa lā tufsidū fil-arḍi ba‘da iṣlāḥihā wad‘ūhu khaufaw wa ṭama‘ā.',
            terjemah:
              'Dan janganlah kamu berbuat kerusakan di bumi setelah (diciptakan) dengan baik. Berdoalah kepada-Nya dengan rasa takut dan penuh harap.',
            tafsirSingkat:
              'Larangan merusak keseimbangan alam disertai struktur Fi’il Nahyi dalam bahasa Arab Al-Qur’an.',
            keterkaitanMateri:
              'Menghubungkan kaidah tata bahasa Arab (Nahwu-Sharaf) langsung dengan ayat ekoteologi Al-Qur’an.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 223)',
            kitab: 'Sahih Muslim',
            derajat: 'Shahih',
            arab: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
            latin: 'Aṭ-ṭuhūru syaṭrul-īmān.',
            terjemah: 'Kesucian dan kebersihan itu adalah sebagian dari iman.',
            hikmahPedagogis:
              'Menguatkan karakter peduli lingkungan bersih sekaligus keterampilan berbahasa Arab.',
          },
        },
      ],
    },
  ],
};
