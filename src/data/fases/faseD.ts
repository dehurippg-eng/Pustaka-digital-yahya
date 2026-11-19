import type { FaseKurikulum2026 } from '../../types/curriculum';

export const FASE_D_DATA: FaseKurikulum2026 = {
  fase: 'D',
  jenjang: 'SMP/MTs',
  kelasRentang: 'Kelas 7 – 9',
  labelLengkap: 'Fase D · SMP/MTs (Kelas VII, VIII & IX)',
  rasional2026:
    'Pada Fase D Kurikulum Merdeka 2026, peserta didik SMP/MTs mendalami Al-Qur’an dan hadis tentang pelestarian alam, semangat keilmuan, dan toleransi; memperdalam enam rukun iman secara rasional; membiasakan jujur, amanah, dan tabayyun di era digital; menguasai fikih sujud, salat jamak-qasar, zakat mal, puasa sunah, serta penyembelihan, akikah, dan kurban; serta mengkaji kejayaan Bani Umayyah, Abbasiyah, dan Islam di Nusantara pada Semester 1 dan Semester 2.',
  capaianPembelajaran: [
    {
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiCP:
        'Peserta didik memahami ayat Al-Qur’an dan hadis tentang pelestarian alam (ekoteologi), semangat keilmuan, dan toleransi dengan penerapan hukum tajwid (mad, nun sukun/tanwin, mim sukun, waqaf).',
    },
    {
      elemen: 'Akidah',
      deskripsiCP:
        'Peserta didik mendalami enam rukun iman secara argumentatif serta menerapkannya sebagai landasan ketenangan jiwa, etos kerja, dan integritas moral remaja.',
    },
    {
      elemen: 'Akhlak',
      deskripsiCP:
        'Peserta didik menganalisis bahaya gibah, fitnah, hoaks, serta membiasakan jujur, amanah, tabayyun, berprasangka baik (husnuzan), dan menghormati guru serta orang tua.',
    },
    {
      elemen: 'Fikih',
      deskripsiCP:
        'Peserta didik memahami dan mempraktikkan rukhsah ibadah (salat jamak-qasar), sujud sahwi/tilawah/syukur, puasa sunah, zakat mal, serta tata cara penyembelihan, akikah, dan kurban.',
    },
    {
      elemen: 'Sejarah Peradaban Islam',
      deskripsiCP:
        'Peserta didik menganalisis kejayaan peradaban Islam masa Bani Umayyah dan Abbasiyah (Baitul Hikmah) serta masuk dan berkembangnya Islam di Nusantara secara damai.',
    },
  ],
  babList: [
    // SEMESTER 1 (GANJIL)
    {
      id: 'fase-d-bab-1',
      nomorBab: 1,
      judulBab: 'Pelestarian Alam (Ekoteologi) dalam Al-Qur’an & Hadis',
      kelas: 'Kelas 8',
      semester: 'Ganjil',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Mengkaji QS. Ar-Rum ayat 41–42 tentang larangan berbuat kerusakan di bumi serta tanggung jawab manusia sebagai khalifah ekologis.',
      atpList: [
        {
          kode: 'ATP-D.1.1',
          kelas: 'Kelas 8',
          semester: 'Ganjil',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Membaca QS. Ar-Rum ayat 41 sesuai kaidah tajwid (hukum Ra dan Lam) dan menganalisis akar krisis lingkungan akibat ulah manusia.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-1-m1',
          kode: 'MAT-D.1.1',
          judul: 'Larangan Merusak Bumi dan Tanggung Jawab Ekologis Muslim',
          ringkasan:
            'Menghubungkan QS. Ar-Rum ayat 41 dengan fenomena perubahan iklim, pencemaran, dan peran generasi muda menjaga kelestarian alam.',
          kataKunci: ['Ekoteologi', 'Ar-Rum 41', 'Khalifah Fil Ard', 'Sedekah Ekologis'],
          ayatUtama: {
            surah: 'QS. Ar-Rum',
            ayat: '41',
            arab: 'ظَهَرَ الْفَسَادُ فِى الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ اَيْدِى النَّاسِ لِيُذِيْقَهُمْ بَعْضَ الَّذِيْ عَمِلُوْا لَعَلَّهُمْ يَرْجِعُوْنَ',
            latin: 'Ẓaharal-fasādu fil-barri wal-baḥri bimā kasabat aidin-nāsi liyużīqahum ba‘ḍal-lażī ‘amilū la‘allahum yarji‘ūn.',
            terjemah:
              'Telah tampak kerusakan di darat dan di laut disebabkan karena perbuatan tangan manusia; Allah menghendaki agar mereka merasakan sebagian dari (akibat) perbuatan mereka, agar mereka kembali (ke jalan yang benar).',
            tafsirSingkat: 'Kerusakan ekologi dan sosial berakar dari keserakahan manusia.',
            keterkaitanMateri: 'Siswa menganalisis isu sampah, polusi, dan gaya hidup berkelanjutan.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 2320) dan Muslim (No. 1553)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Muzara’ah',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا أَوْ يَزْرَعُ زَرْعًا فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ إِلَّا كَانَ لَهُ بِهِ صَدَقَةٌ',
            latin: 'Mā min muslimin yagrisu garsan au yazra‘u zar‘an faya’kulu minhu ṭairun au insānun au bahīmatun illā kāna lahū bihī ṣadaqah.',
            terjemah:
              'Tidaklah seorang muslim menanam pohon atau bercocok tanam lalu dimakan oleh burung, manusia, atau hewan ternak, melainkan hal itu menjadi sedekah baginya.',
            hikmahPedagogis: 'Menanamkan kesadaran bahwa merawat tumbuhan bernilai pahala sedekah jariyah.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-2',
      nomorBab: 2,
      judulBab: 'Memperkokoh Iman kepada Allah, Malaikat, dan Kitab Suci',
      kelas: 'Kelas 7',
      semester: 'Ganjil',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Mendalami iman kepada Allah melalui Asmaul Husna (Al-‘Alim, Al-Khabir, As-Sami’, Al-Basir) serta mencintai Al-Qur’an sebagai pedoman hidup.',
      atpList: [
        {
          kode: 'ATP-D.2.1',
          kelas: 'Kelas 7',
          semester: 'Ganjil',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menganalisis bukti keimanan kepada Allah Yang Maha Mengetahui dan Maha Melihat serta menjadikannya benteng integritas diri.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Penalaran Kritis'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-2-m1',
          kode: 'MAT-D.2.1',
          judul: 'Integritas Remaja dalam Pengawasan Allah (Al-‘Alim & Al-Basir)',
          ringkasan:
            'Menyadari bahwa Allah Maha Mengetahui dan Maha Melihat sehingga pelajar terhindar dari menyontek dan kecurangan.',
          kataKunci: ['Al-‘Alim', 'Al-Khabir', 'As-Sami’', 'Al-Basir'],
          ayatUtama: {
            surah: 'QS. Al-Mujadilah',
            ayat: '7',
            arab: 'مَا يَكُوْنُ مِنْ نَّجْوٰى ثَلٰثَةٍ اِلَّا هُوَ رَابِعُهُمْ وَلَا خَمْسَةٍ اِلَّا هُوَ سَادِسُهُمْ',
            latin: 'Mā yakūnu min najwā ṡalāṡatin illā huwa rābi‘uhum wa lā khamsatin illā huwa sādisuhum.',
            terjemah: 'Tidak ada pembicaraan rahasia antara tiga orang, melainkan Dialah yang keempatnya. Dan tidak ada lima orang, melainkan Dialah yang keenamnya.',
            tafsirSingkat: 'Ilmu dan pengawasan Allah meliputi setiap gerak-gerik manusia di tempat terang maupun tersembunyi.',
            keterkaitanMateri: 'Membangun kejujuran akademik siswa saat ujian dan tugas mandiri.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 8)',
            kitab: 'Sahih Muslim, Kitab Al-Iman',
            derajat: 'Shahih',
            arab: 'الْإِحْسَانُ أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ',
            latin: 'Al-iḥsānu an ta‘budallāha ka’annaka tarāh, fa in lam takun tarāhu fa innahū yarāk.',
            terjemah: 'Ihsan adalah engkau beribadah kepada Allah seakan-akan engkau melihat-Nya, dan jika engkau tidak melihat-Nya maka sesungguhnya Dia melihatmu.',
            hikmahPedagogis: 'Menguatkan kesadaran muraqabah (merasa diawasi Allah) dalam keseharian remaja.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-3',
      nomorBab: 3,
      judulBab: 'Menghadirkan Kejujuran, Amanah & Istikamah dalam Hidup',
      kelas: 'Kelas 7',
      semester: 'Ganjil',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Menganalisis pentingnya kejujuran, amanah, dan konsistensi (istikamah) dalam membangun kepercayaan di sekolah dan keluarga.',
      atpList: [
        {
          kode: 'ATP-D.3.1',
          kelas: 'Kelas 7',
          semester: 'Ganjil',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Mengevaluasi dampak perilaku jujur dan amanah dibandingkan perilaku khianat dalam kehidupan pelajar SMP.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kewargaan', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-3-m1',
          kode: 'MAT-D.3.1',
          judul: 'Jujur, Amanah, dan Istikamah sebagai Karakter Pelajar Muslim',
          ringkasan:
            'Menelaah korelasi kesuksesan belajar dan kepemimpinan dengan keteguhan menjaga amanah dan istikamah.',
          kataKunci: ['Jujur', 'Amanah', 'Istikamah', 'Integritas'],
          ayatUtama: {
            surah: 'QS. Al-Ahqaf',
            ayat: '13',
            arab: 'اِنَّ الَّذِيْنَ قَالُوْا رَبُّنَا اللّٰهُ ثُمَّ اسْتَقَامُوْا فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُوْنَ',
            latin: 'Innal-lażīna qālū rabbunallāhu ṡummastaqāmū falā khaufun ‘alaihim wa lā hum yaḥzanūn.',
            terjemah:
              'Sesungguhnya orang-orang yang berkata, “Tuhan kami adalah Allah,” kemudian mereka tetap istikamah, tidak ada rasa khawatir pada mereka, dan mereka tidak (pula) bersedih hati.',
            tafsirSingkat: 'Keteguhan memegang kebenaran (istikamah) melahirkan ketenangan jiwa.',
            keterkaitanMateri: 'Mendorong konsistensi siswa dalam disiplin belajar dan ibadah.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 38)',
            kitab: 'Sahih Muslim, Kitab Al-Iman',
            derajat: 'Shahih',
            arab: 'قُلْ آمَنْتُ بِاللَّهِ ثُمَّ اسْتَقِمْ',
            latin: 'Qul āmantu billāhi ṡummastaqim.',
            terjemah: 'Katakanlah: Aku beriman kepada Allah, kemudian beristikamahlah (teguh dan konsisten).',
            hikmahPedagogis: 'Memberi nasihat ringkas dan padat bagi pelajar untuk konsisten dalam kebaikan.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-4',
      nomorBab: 4,
      judulBab: 'Sujud Syukur, Sahwi, Tilawah & Kemudahan Salat Jamak-Qasar',
      kelas: 'Kelas 7',
      semester: 'Ganjil',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami dan mempraktikkan sujud syukur, sahwi, tilawah serta rukhsah salat jamak dan qasar saat dalam perjalanan jauh.',
      atpList: [
        {
          kode: 'ATP-D.4.1',
          kelas: 'Kelas 7',
          semester: 'Ganjil',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Mempraktikkan tata cara sujud syukur, sahwi, tilawah, serta mensimulasikan salat jamak-qasar sesuai syarat syar’i.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-4-m1',
          kode: 'MAT-D.4.1',
          judul: 'Rukhsah Salat Jamak-Qasar dan Macam-Macam Sujud',
          ringkasan:
            'Mengenal kasih sayang Allah melalui keringanan salat bagi musafir serta adab bersyukur dan menyimak ayat sajdah.',
          kataKunci: ['Jamak Qasar', 'Rukhsah', 'Sujud Syukur', 'Sujud Tilawah'],
          ayatUtama: {
            surah: 'QS. An-Nisa’',
            ayat: '101',
            arab: 'وَاِذَا ضَرَبْتُمْ فِى الْاَرْضِ فَلَيْسَ عَلَيْكُمْ جُنَاحٌ اَنْ تَقْصُرُوْا مِنَ الصَّلٰوةِ',
            latin: 'Wa iżā ḍarabtum fil-arḍi falaisa ‘alaikum junāḥun an taqṣurū minaṣ-ṣalāh.',
            terjemah: 'Dan apabila kamu bepergian di bumi, maka tidaklah berdosa kamu mengqasar salat.',
            tafsirSingkat: 'Islam memberikan kemudahan (rukhsah) agar musafir tetap dapat menjaga kewajiban salat.',
            keterkaitanMateri: 'Membuat siswa paham cara beribadah saat study tour atau mudik.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 686)',
            kitab: 'Sahih Muslim, Kitab Shalatil Musafirin',
            derajat: 'Shahih',
            arab: 'صَدَقَةٌ تَصَدَّقَ اللَّهُ بِهَا عَلَيْكُمْ فَاقْبَلُوا صَدَقَتَهُ',
            latin: 'Ṣadaqatun taṣaddaqallāhu bihā ‘alaikum faqbalū ṣadaqatah.',
            terjemah: 'Itu (qasar salat) adalah sedekah yang Allah berikan kepada kalian, maka terimalah sedekah-Nya.',
            hikmahPedagogis: 'Menunjukkan wajah fikih Islam yang memudahkan dan realistis.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-5',
      nomorBab: 5,
      judulBab: 'Peradaban Islam Masa Daulah Bani Umayyah di Damaskus & Andalusia',
      kelas: 'Kelas 7',
      semester: 'Ganjil',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Menelusuri perkembangan tata kelola pemerintahan, seni arsitektur, dan pertumbuhan ilmu pengetahuan pada masa Dinasti Umayyah.',
      atpList: [
        {
          kode: 'ATP-D.5.1',
          kelas: 'Kelas 7',
          semester: 'Ganjil',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menganalisis kemajuan peradaban Islam pada masa Bani Umayyah di Damaskus dan Andalusia (Spanyol) sebagai inspirasi kemajuan.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Kreativitas'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'd-5-m1',
          kode: 'MAT-D.5.1',
          judul: 'Cahaya Ilmu dan Arsitektur Islam di Damaskus & Cordoba',
          ringkasan:
            'Mengenal sosok Umar bin Abdul Aziz dan kemajuan universitas serta perpustakaan di Andalusia.',
          kataKunci: ['Bani Umayyah', 'Andalusia', 'Umar bin Abdul Aziz', 'Peradaban'],
          ayatUtama: {
            surah: 'QS. Al-Anbiya’',
            ayat: '107',
            arab: 'وَمَآ اَرْسَلْنٰكَ اِلَّا رَحْمَةً لِّلْعٰلَمِيْنَ',
            latin: 'Wa mā arsalnāka illā raḥmatal lil-‘ālamīn.',
            terjemah: 'Dan Kami tidak mengutus engkau (Muhammad) melainkan untuk (menjadi) rahmat bagi seluruh alam.',
            tafsirSingkat: 'Peradaban Islam dibangun untuk menebar kemaslahatan ilmu, keadilan, dan kesejahteraan bagi semua.',
            keterkaitanMateri: 'Mengkaji keterbukaan ilmuwan Andalusia yang memajukan Eropa dan dunia.',
          },
          hadisUtama: {
            perawi: 'HR. Ibnu Majah (No. 224) & Al-Baihaqi',
            kitab: 'Sunan Ibnu Majah, Muqaddimah',
            derajat: 'Hasan Shahih',
            arab: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
            latin: 'Ṭalabul-‘ilmi farīḍatun ‘alā kulli muslim.',
            terjemah: 'Menuntut ilmu itu wajib bagi setiap Muslim.',
            hikmahPedagogis: 'Mengaitkan etos menuntut ilmu dengan lahirnya pusat peradaban besar Islam.',
          },
        },
      ],
    },

    // SEMESTER 2 (GENAP)
    {
      id: 'fase-d-bab-6',
      nomorBab: 6,
      judulBab: 'Semangat Keilmuan (QS. Al-Mujadilah: 11) & Toleransi Beragama',
      kelas: 'Kelas 9',
      semester: 'Genap',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Mengkaji QS. Al-Mujadilah ayat 11 tentang derajat orang berilmu dan QS. Al-Kafirun/Yunus tentang etika toleransi dalam masyarakat majemuk.',
      atpList: [
        {
          kode: 'ATP-D.6.1',
          kelas: 'Kelas 9',
          semester: 'Genap',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Membaca QS. Al-Mujadilah: 11 secara tartil serta menghubungkan semangat menuntut ilmu dengan sikap toleran di sekolah.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-6-m1',
          kode: 'MAT-D.6.1',
          judul: 'Derajat Orang Beriman dan Berilmu dalam QS. Al-Mujadilah: 11',
          ringkasan:
            'Memahami janji Allah mengangkat derajat orang beriman yang tekun menuntut ilmu serta berlapang dada di majelis ilmu.',
          kataKunci: ['Ilmu Pengetahuan', 'Al-Mujadilah 11', 'Toleransi', 'Etos Belajar'],
          ayatUtama: {
            surah: 'QS. Al-Mujadilah',
            ayat: '11',
            arab: 'يَرْفَعِ اللّٰهُ الَّذِيْنَ اٰمَنُوْا مِنْكُمْۙ وَالَّذِيْنَ اُوْتُوا الْعِلْمَ دَرَجٰتٍۗ وَاللّٰهُ بِمَا تَعْمَلُوْنَ خَبِيْرٌ',
            latin: 'Yarfa‘illāhul-lażīna āmanū minkum wallażīna ūtul-‘ilma darajāt, wallāhu bimā ta‘malūna khabīr.',
            terjemah:
              'Allah akan mengangkat (derajat) orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu beberapa derajat. Dan Allah Mahateliti terhadap apa yang kamu kerjakan.',
            tafsirSingkat: 'Iman yang dipadukan dengan penguasaan ilmu pengetahuan melahirkan kemuliaan umat.',
            keterkaitanMateri: 'Memotivasi siswa kelas IX menghadapi transisi ke jenjang menengah atas.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 2699)',
            kitab: 'Sahih Muslim, Kitab Adz-Dzikr wad-Du’a',
            derajat: 'Shahih',
            arab: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
            latin: 'Man salaka ṭarīqan yaltamisu fīhi ‘ilman sahhalallāhu lahū bihī ṭarīqan ilal-jannah.',
            terjemah: 'Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga.',
            hikmahPedagogis: 'Menumbuhkan semangat belajar sepanjang hayat pada peserta didik.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-7',
      nomorBab: 7,
      judulBab: 'Beriman kepada Hari Akhir serta Qada dan Qadar secara Rasional',
      kelas: 'Kelas 9',
      semester: 'Genap',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Menganalisis peristiwa kiamat sugra dan kubra, hikmah beriman kepada hari akhir, serta peran ikhtiar dan tawakal dalam takdir.',
      atpList: [
        {
          kode: 'ATP-D.7.1',
          kelas: 'Kelas 9',
          semester: 'Genap',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menganalisis makna iman kepada hari akhir dan qada-qadar sebagai pendorong tanggung jawab moral dan optimisme masa depan.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-7-m1',
          kode: 'MAT-D.7.1',
          judul: 'Tanggung Jawab Moral & Optimisme di Balik Iman Hari Akhir dan Takdir',
          ringkasan:
            'Menghubungkan kesadaran akan hisab amal dengan disiplin diri, anti-kecurangan, dan etos ikhtiar optimal.',
          kataKunci: ['Hari Akhir', 'Qada Qadar', 'Hisab Amal', 'Optimisme'],
          ayatUtama: {
            surah: 'QS. Al-Zalzalah',
            ayat: '7 – 8',
            arab: 'فَمَنْ يَّعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَّرَهٗ ۝ وَمَنْ يَّعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَّرَهٗ ۝',
            latin: 'Famay ya‘mal miṡqāla żarratin khairay yarah. Wa may ya‘mal miṡqāla żarratin syarray yarah.',
            terjemah:
              'Maka barangsiapa mengerjakan kebaikan seberat zarrah, niscaya dia akan melihat (balasan)nya. Dan barangsiapa mengerjakan kejahatan seberat zarrah, niscaya dia akan melihat (balasan)nya.',
            tafsirSingkat: 'Tidak ada amal sekecil apa pun yang luput dari perhitungan keadilan Allah.',
            keterkaitanMateri: 'Mendorong siswa menghargai setiap perbuatan baik sekecil apa pun.',
          },
          hadisUtama: {
            perawi: 'HR. At-Tirmidzi (No. 2417)',
            kitab: 'Jami’ At-Tirmidzi, Kitab Shifatil Qiyamah',
            derajat: 'Hasan Shahih',
            arab: 'لَا تَزُولُ قَدَمَا عَبْدٍ يَوْمَ الْقِيَامَةِ حَتَّى يُسْأَلَ عَنْ عُمْرِهِ فِيمَا أَفْنَاهُ وَعَنْ عِلْمِهِ فِيمَا فَعَلَ وَعَنْ مَالِهِ مِنْ أَيْنَ اكْتَسَبَهُ وَفِيمَا أَنْفَقَهُ وَعَنْ جِسْمِهِ فِيمَا أَبْلَاهُ',
            latin: 'Lā tazūlu qadamā ‘abdin yaumal-qiyāmati ḥattā yus’ala ‘an ‘umrihī fīmā afnāhu wa ‘an ‘ilmihī fīmā fa‘ala wa ‘an mālihī min ainaktasabahū wa fīmā anfaqahū wa ‘an jismihī fīmā ablāh.',
            terjemah:
              'Tidak akan bergeser kedua kaki seorang hamba pada hari kiamat sampai ia ditanya tentang umurnya untuk apa dihabiskan, ilmunya untuk apa diamalkan, hartanya dari mana diperoleh dan ke mana dibelanjakan, serta tubuhnya untuk apa digunakan.',
            hikmahPedagogis: 'Mengajak remaja mengelola waktu, ilmu, dan kesehatan secara bertanggung jawab.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-8',
      nomorBab: 8,
      judulBab: 'Tabayyun & Menjauhi Gibah di Era Media Sosial',
      kelas: 'Kelas 7',
      semester: 'Genap',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Menganalisis adab komunikasi digital dalam Islam: verifikasi informasi (tabayyun), menghindari ujaran kebencian, gibah, dan fitnah.',
      atpList: [
        {
          kode: 'ATP-D.8.1',
          kelas: 'Kelas 7',
          semester: 'Genap',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Mengevaluasi informasi digital dengan prinsip tabayyun dan membandingkan dampak psikologis serta sosial dari gibah.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Komunikasi', 'Keimanan dan Ketakwaan terhadap Tuhan YME'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-8-m1',
          kode: 'MAT-D.8.1',
          judul: 'Literasi Digital Islami: Tabayyun dan Anti-Gibah',
          ringkasan:
            'Mempraktikkan cek fakta sebelum menyebarluaskan berita sesuai QS. Al-Hujurat: 6 dan menjaga kehormatan sesama.',
          kataKunci: ['Tabayyun', 'Anti-Hoaks', 'Anti-Gibah', 'Etika Digital'],
          ayatUtama: {
            surah: 'QS. Al-Hujurat',
            ayat: '6',
            arab: 'يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْٓا اِنْ جَاۤءَكُمْ فَاسِقٌۢ بِنَبَاٍ فَتَبَيَّنُوْٓا اَنْ تُصِيْبُوْا قَوْمًاۢ بِجَهَالَةٍ فَتُصْبِحُوْا عَلٰى مَا فَعَلْتُمْ نٰدِمِيْنَ',
            latin: 'Yā ayyuhal-lażīna āmanū in jā’akum fāsiqun binaba’in fatabayyanū an tuṣībū qauman bijahālatin fatuṣbiḥū ‘alā mā fa‘altum nādimīn.',
            terjemah:
              'Wahai orang-orang yang beriman! Jika seseorang yang fasik datang kepadamu membawa suatu berita, maka telitilah kebenarannya (tabayyun), agar kamu tidak mencelakakan suatu kaum karena kebodohan.',
            tafsirSingkat: 'Verifikasi sumber dan kebenaran berita adalah kewajiban moral orang beriman.',
            keterkaitanMateri: 'Membekali siswa SMP/MTs menghadapi arus informasi cepat di media sosial.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 5) dalam Muqaddimah',
            kitab: 'Sahih Muslim',
            derajat: 'Shahih',
            arab: 'كَفَى بِالْمَرْءِ كَذِبًا أَنْ يُحَدِّثَ بِكُلِّ مَا سَمِعَ',
            latin: 'Kafā bil-mar’i każiban an yuḥaddiṡa bikulli mā sami‘a.',
            terjemah: 'Cukuplah seseorang dianggap berdusta apabila ia menceritakan semua apa yang ia dengar.',
            hikmahPedagogis: 'Menjadi pedoman praktis etika "saring sebelum sharing" di ruang digital.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-9',
      nomorBab: 9,
      judulBab: 'Zakat Mal, Penyembelihan Hewan, Akikah, dan Kurban',
      kelas: 'Kelas 9',
      semester: 'Genap',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami ketentuan zakat harta (emas, perdagangan, pertanian), tata cara penyembelihan hewan sesuai syariat, serta akikah dan kurban.',
      atpList: [
        {
          kode: 'ATP-D.9.1',
          kelas: 'Kelas 9',
          semester: 'Genap',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Menghitung nisab zakat mal sederhana serta menjelaskan syarat sah penyembelihan hewan, akikah, dan kurban.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kolaborasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-9-m1',
          kode: 'MAT-D.9.1',
          judul: 'Ihsan dalam Penyembelihan Syar’i, Akikah, dan Ibadah Kurban',
          ringkasan:
            'Memahami etika menyembelih tanpa menyiksa hewan (ihsan), syarat hewan kurban, dan nilai solidaritas sosial.',
          kataKunci: ['Kurban', 'Akikah', 'Penyembelihan Syar’i', 'Zakat Mal'],
          ayatUtama: {
            surah: 'QS. Al-Kautsar',
            ayat: '1 – 2',
            arab: 'اِنَّآ اَعْطَيْنٰكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝',
            latin: 'Innā a‘ṭainākal-kauṡar. Faṣalli lirabbika wanḥar.',
            terjemah: 'Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak. Maka laksanakanlah salat karena Tuhanmu, dan berkurbanlah.',
            tafsirSingkat: 'Syukur atas nikmat Allah diwujudkan melalui ibadah salat (hablum minallah) dan berkurban (hablum minannas).',
            keterkaitanMateri: 'Mengintegrasikan kesadaran spiritual dan kepedulian pangan masyarakat.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 1955)',
            kitab: 'Sahih Muslim, Kitab As-Said wa Adz-Dzaba’ih',
            derajat: 'Shahih',
            arab: 'إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ فَإِذَا قَتَلْتُمْ فَأَحْسِنُوا الْقِتْلَةَ وَإِذَا ذَبَحْتُمْ فَأَحْسِنُوا الذَّبْحَ',
            latin: 'Innallāha katabal-iḥsāna ‘alā kulli syai’, fa iżā qataltum fa aḥsinul-qitlah, wa iżā żabaḥtum fa aḥsinuż-żabḥ.',
            terjemah:
              'Sesungguhnya Allah mewajibkan berbuat ihsan (baik) atas segala sesuatu. Maka jika kalian menyembelih, sembelihlah dengan cara yang baik (tajamkan pisau dan tenangkan hewan).',
            hikmahPedagogis: 'Mengajarkan adab kasih sayang terhadap hewan bahkan saat proses penyembelihan.',
          },
        },
      ],
    },
    {
      id: 'fase-d-bab-10',
      nomorBab: 10,
      judulBab: 'Kejayaan Daulah Abbasiyah (Baitul Hikmah) & Islam di Nusantara',
      kelas: 'Kelas 8',
      semester: 'Genap',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Menelusuri kemajuan sains dan literasi masa Daulah Abbasiyah serta proses masuknya Islam di Nusantara secara damai.',
      atpList: [
        {
          kode: 'ATP-D.10.1',
          kelas: 'Kelas 8',
          semester: 'Genap',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menganalisis faktor kemajuan Baitul Hikmah masa Abbasiyah serta jalur damai dakwah Islam di Nusantara.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Kreativitas', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'd-10-m1',
          kode: 'MAT-D.10.1',
          judul: 'Baitul Hikmah, Ilmuwan Muslim, dan Dakwah Damai Nusantara',
          ringkasan:
            'Mengenal kontribusi Al-Khawarizmi, Ibnu Sina, serta kearifan budaya lokal dalam penyebaran Islam di Indonesia.',
          kataKunci: ['Abbasiyah', 'Baitul Hikmah', 'Islam Nusantara', 'Ulul Albab'],
          ayatUtama: {
            surah: 'QS. An-Nahl',
            ayat: '125',
            arab: 'اُدْعُ اِلٰى سَبِيْلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ وَجَادِلْهُمْ بِالَّتِيْ هِيَ اَحْسَنُ',
            latin: 'Ud‘u ilā sabīli rabbika bil-ḥikmati wal-mau‘iẓatil-ḥasanati wa jādilhum billatī hiya aḥsan.',
            terjemah:
              'Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pengajaran yang baik, dan berdebatlah dengan mereka dengan cara yang baik.',
            tafsirSingkat: 'Dakwah yang mengakar kuat adalah dakwah yang bijaksana, santun, dan menghormati budaya masyarakat.',
            keterkaitanMateri: 'Menjelaskan mengapa Islam diterima luas secara damai di Nusantara.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 69) dan Muslim (No. 1734)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Ilm',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'يَسِّرُوا وَلَا تُعَسِّرُوا وَبَشِّرُوا وَلَا تُنَفِّرُوا',
            latin: 'Yassirū wa lā tu‘assirū, wa basysyirū wa lā tunaffirū.',
            terjemah: 'Permudahlah dan jangan mempersulit, berilah kabar gembira dan jangan membuat orang lari (menjauh).',
            hikmahPedagogis: 'Meneladani metode dakwah para ulama yang ramah dan menyejukkan.',
          },
        },
      ],
    },
  ],
};
