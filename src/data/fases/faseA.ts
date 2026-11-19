import type { FaseKurikulum2026 } from '../../types/curriculum';

export const FASE_A_DATA: FaseKurikulum2026 = {
  fase: 'A',
  jenjang: 'SD/MI',
  kelasRentang: 'Kelas 1 – 2',
  labelLengkap: 'Fase A · SD/MI (Kelas I & II)',
  rasional2026:
    'Pada Fase A Kurikulum Merdeka 2026, Pendidikan Agama Islam dan Budi Pekerti menumbuhkan kecintaan peserta didik terhadap Al-Qur’an melalui pengenalan huruf hijaiyah berharakat dan surah-surah pendek, membangun fondasi tauhid (rukun iman dan Asmaul Husna), membiasakan akhlak mulia dalam keluarga, mengenal tata cara bersuci dan salat fardu, serta meneladani kisah para nabi secara lengkap pada Semester 1 dan Semester 2.',
  capaianPembelajaran: [
    {
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiCP:
        'Peserta didik memahami huruf hijaiyah berharakat, huruf hijaiyah bersambung, Surah Al-Fatihah, serta surah-surah pendek (An-Nas, Al-Falaq, Al-Ikhlas) dan hadis tentang belajar Al-Qur’an serta kasih sayang.',
    },
    {
      elemen: 'Akidah',
      deskripsiCP:
        'Peserta didik memahami rukun iman, iman kepada Allah Swt., malaikat-malaikat-Nya, rasul-rasul-Nya, serta Asmaul Husna (Ar-Rahman, Ar-Rahim, Al-Malik, Al-Ahad, Al-Hafiz, Al-Wali).',
    },
    {
      elemen: 'Akhlak',
      deskripsiCP:
        'Peserta didik membiasakan perilaku jujur, berterima kasih, hormat kepada orang tua dan guru, kasih sayang kepada sesama, disiplin, serta hidup bersih.',
    },
    {
      elemen: 'Fikih',
      deskripsiCP:
        'Peserta didik memahami rukun Islam, syahadatain, tata cara bersuci (wudu dan tayamum sederhana), azan, ikamah, dan gerakan serta bacaan salat fardu.',
    },
    {
      elemen: 'Sejarah Peradaban Islam',
      deskripsiCP:
        'Peserta didik menceritakan kisah keteladanan Nabi Adam a.s., Nabi Nuh a.s., Nabi Ibrahim a.s., serta masa kanak-kanak Nabi Muhammad saw. dengan bahasa sederhana.',
    },
  ],
  babList: [
    // SEMESTER 1 (GANJIL)
    {
      id: 'fase-a-bab-1',
      nomorBab: 1,
      judulBab: 'Aku Cinta Al-Qur’an (Surah Al-Fatihah & Huruf Hijaiyah)',
      kelas: 'Kelas 1',
      semester: 'Ganjil',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Pengenalan huruf hijaiyah berharakat fathah, kasrah, dammah, serta pelafalan dan makna kasih sayang dalam Surah Al-Fatihah.',
      atpList: [
        {
          kode: 'ATP-A.1.1',
          kelas: 'Kelas 1',
          semester: 'Ganjil',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Melafalkan huruf hijaiyah berharakat dan Surah Al-Fatihah dengan makhraj yang benar serta penuh kesadaran akan kasih sayang Allah Swt.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Komunikasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'a-1-m1',
          kode: 'MAT-A.1.1',
          judul: 'Mengenal Kasih Sayang Allah dalam Surah Al-Fatihah',
          ringkasan:
            'Mempelajari Surah Al-Fatihah ayat 1–7, melafalkan dengan tartil sederhana, serta memaknai sifat Ar-Rahman dan Ar-Rahim.',
          kataKunci: ['Surah Al-Fatihah', 'Ar-Rahman', 'Ar-Rahim', 'Tartil'],
          ayatUtama: {
            surah: 'QS. Al-Fatihah',
            ayat: '1 – 3',
            arab: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ۝ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ ۝ الرَّحْمٰنِ الرَّحِيْمِ ۝',
            latin: 'Bismillāhir-raḥmānir-raḥīm. Al-ḥamdu lillāhi rabbil-‘ālamīn. Ar-raḥmānir-raḥīm.',
            terjemah:
              'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam, Yang Maha Pengasih, Maha Penyayang.',
            tafsirSingkat:
              'Setiap kebaikan diawali dengan menyebut nama Allah Yang Maha Pengasih dan Maha Penyayang.',
            keterkaitanMateri:
              'Menjadi landasan pembiasaan membaca basmalah sebelum belajar dan menumbuhkan rasa syukur.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 5027)',
            kitab: 'Sahih Al-Bukhari, Kitab Fada’il Al-Qur’an',
            derajat: 'Shahih',
            arab: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
            latin: 'Khairukum man ta‘allamal-Qur’āna wa ‘allamah.',
            terjemah: 'Sebaik-baik kalian adalah orang yang belajar Al-Qur’an dan mengajarkannya.',
            hikmahPedagogis: 'Memotivasi anak agar gembira ketika belajar membaca huruf Al-Qur’an.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-2',
      nomorBab: 2,
      judulBab: 'Mengenal Rukun Iman & Allah Maha Pengasih (Asmaul Husna)',
      kelas: 'Kelas 1',
      semester: 'Ganjil',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Mengenal enam rukun iman serta meyakini keberadaan Allah Swt. melalui ciptaan-Nya dan Asmaul Husna Ar-Rahman, Ar-Rahim, dan Al-Ahad.',
      atpList: [
        {
          kode: 'ATP-A.2.1',
          kelas: 'Kelas 1',
          semester: 'Ganjil',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menyebutkan enam rukun iman serta mengaitkan sifat kasih sayang Allah (Ar-Rahman, Ar-Rahim) dengan rasa syukur atas ciptaan-Nya.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'a-2-m1',
          kode: 'MAT-A.2.1',
          judul: 'Rukun Iman dan Mengenal Allah Yang Maha Esa (Al-Ahad)',
          ringkasan:
            'Memahami bahwa alam semesta dan diri kita adalah ciptaan Allah Yang Maha Esa serta penuh kasih sayang.',
          kataKunci: ['Rukun Iman', 'Al-Ahad', 'Ar-Rahman', 'Ciptaan Allah'],
          ayatUtama: {
            surah: 'QS. Al-Ikhlas',
            ayat: '1 – 2',
            arab: 'قُلْ هُوَ اللّٰهُ اَحَدٌ ۝ اَللّٰهُ الصَّمَدُ ۝',
            latin: 'Qul huwallāhu aḥad. Allāhuṣ-ṣamad.',
            terjemah: 'Katakanlah (Muhammad), Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu.',
            tafsirSingkat: 'Allah Swt. adalah Tuhan Yang Maha Esa dan menjadi satu-satunya tempat hamba bergantung dan berdoa.',
            keterkaitanMateri: 'Menanamkan tauhid murni sejak kelas awal sekolah dasar.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 8)',
            kitab: 'Sahih Muslim, Kitab Al-Iman',
            derajat: 'Shahih',
            arab: 'أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ',
            latin: 'An tu’mina billāhi wa malā’ikatihī wa kutubihī wa rusulihī wal-yaumil-ākhiri wa tu’mina bil-qadari khairihī wa syarrih.',
            terjemah:
              'Iman adalah engkau beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan engkau beriman kepada takdir yang baik maupun yang buruk.',
            hikmahPedagogis: 'Menjadi dasar hafalan dan pemahaman enam rukun iman secara utuh.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-3',
      nomorBab: 3,
      judulBab: 'Aku Anak Saleh: Jujur, Santun, dan Hormat Orang Tua',
      kelas: 'Kelas 1',
      semester: 'Ganjil',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Membiasakan perilaku jujur, bertutur kata santun, berterima kasih, serta berbakti kepada ayah dan ibu.',
      atpList: [
        {
          kode: 'ATP-A.3.1',
          kelas: 'Kelas 1',
          semester: 'Ganjil',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Menunjukkan contoh perilaku jujur, santun, dan hormat kepada orang tua dan guru dalam kehidupan sehari-hari.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Komunikasi', 'Kolaborasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'a-3-m1',
          kode: 'MAT-A.3.1',
          judul: 'Berbakti kepada Orang Tua dan Berkata Jujur',
          ringkasan:
            'Belajar mendoakan orang tua, meminta izin sebelum pergi, serta berani berkata jujur dalam setiap keadaan.',
          kataKunci: ['Birrul Walidain', 'Jujur', 'Santun', 'Doa Orang Tua'],
          ayatUtama: {
            surah: 'QS. Al-Isra’',
            ayat: '23',
            arab: 'وَقَضٰى رَبُّكَ اَلَّا تَعْبُدُوْٓا اِلَّآ اِيَّاهُ وَبِالْوَالِدَيْنِ اِحْسَانًا',
            latin: 'Wa qaḍā rabbuka allā ta‘budū illā iyyāhu wa bil-wālidaini iḥsānā.',
            terjemah:
              'Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik kepada ibu bapak.',
            tafsirSingkat: 'Berbuat baik kepada kedua orang tua ditempatkan Allah tepat setelah perintah beribadah hanya kepada-Nya.',
            keterkaitanMateri: 'Membangun kebiasaan anak menyayangi, membantu, dan mendoakan orang tua setiap hari.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 6094) dan Muslim (No. 2607)',
            kitab: 'Sahih Al-Bukhari & Muslim',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ',
            latin: '‘Alaikum biṣ-ṣidqi fa innaṣ-ṣidqa yahdī ilal-birri wa innal-birra yahdī ilal-jannah.',
            terjemah:
              'Hendaklah kalian selalu bersikap jujur, karena kejujuran menuntun kepada kebaikan, dan kebaikan menuntun ke surga.',
            hikmahPedagogis: 'Membiasakan sikap jujur sejak usia dini agar anak dipercaya keluarga dan teman.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-4',
      nomorBab: 4,
      judulBab: 'Mengenal Rukun Islam dan Dua Kalimat Syahadat',
      kelas: 'Kelas 2',
      semester: 'Ganjil',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami lima rukun Islam secara berurutan serta melafalkan dan memaknai syahadat tauhid dan syahadat rasul.',
      atpList: [
        {
          kode: 'ATP-A.4.1',
          kelas: 'Kelas 2',
          semester: 'Ganjil',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Melafalkan dua kalimat syahadat beserta artinya dan menjelaskan lima rukun Islam sebagai tiang kehidupan seorang Muslim.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'a-4-m1',
          kode: 'MAT-A.4.1',
          judul: 'Lima Rukun Islam dan Makna Syahadatain',
          ringkasan:
            'Mengenal lima pilar Islam (Syahadat, Salat, Zakat, Puasa, Haji) melalui lagu edukatif dan praktik pelafalan syahadat.',
          kataKunci: ['Rukun Islam', 'Syahadatain', 'Tauhid', 'Ibadah'],
          ayatUtama: {
            surah: 'QS. Muhammad',
            ayat: '19',
            arab: 'فَاعْلَمْ اَنَّهٗ لَآ اِلٰهَ اِلَّا اللّٰهُ وَاسْتَغْفِرْ لِذَنْۢبِكَ',
            latin: 'Fa‘lam annahū lā ilāha illallāhu wastagfir liżambik.',
            terjemah: 'Maka ketahuilah, bahwa tidak ada tuhan (yang patut disembah) selain Allah dan mohonlah ampunan atas dosamu.',
            tafsirSingkat: 'Kalimat Lā ilāha illallāh merupakan pokok seluruh ibadah dalam rukun Islam.',
            keterkaitanMateri: 'Menguatkan pemahaman bahwa setiap rukun Islam berakar pada pengakuan tauhid.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 8) dan Muslim (No. 16)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Iman',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَإِقَامِ الصَّلَاةِ وَإِيتَاءِ الزَّكَاةِ وَالْحَجِّ وَصَوْمِ رَمَضَانَ',
            latin: 'Buniyal-islāmu ‘alā khamsin: syahādati an lā ilāha illallāhu wa anna Muḥammadan rasūlullāh, wa iqāmiṣ-ṣalāh, wa ītā’iz-zakāh, wal-ḥajji, wa ṣaumi ramaḍān.',
            terjemah:
              'Islam dibangun atas lima perkara: bersaksi bahwa tiada Tuhan selain Allah dan Muhammad adalah utusan Allah, mendirikan salat, menunaikan zakat, berhaji, dan berpuasa Ramadan.',
            hikmahPedagogis: 'Mengenalkan bangunan Islam yang kokoh secara visual dan bermakna.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-5',
      nomorBab: 5,
      judulBab: 'Kisah Keteladanan Nabi Adam a.s. dan Nabi Nuh a.s.',
      kelas: 'Kelas 1',
      semester: 'Ganjil',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Meneladani sikap segera bertaubat dari Nabi Adam a.s. serta kesabaran dan kegigihan berdakwah dari Nabi Nuh a.s.',
      atpList: [
        {
          kode: 'ATP-A.5.1',
          kelas: 'Kelas 1',
          semester: 'Ganjil',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menceritakan kembali kisah Nabi Adam a.s. dan Nabi Nuh a.s. serta mengambil teladan sikap berani mengakui kesalahan dan bersabar.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'a-5-m1',
          kode: 'MAT-A.5.1',
          judul: 'Taubat Nabi Adam a.s. dan Kesabaran Nabi Nuh a.s.',
          ringkasan:
            'Belajar mengakui kesalahan dan meminta maaf seperti Nabi Adam a.s., serta sabar dalam kebaikan seperti Nabi Nuh a.s.',
          kataKunci: ['Nabi Adam a.s.', 'Nabi Nuh a.s.', 'Taubat', 'Kesabaran'],
          ayatUtama: {
            surah: 'QS. Al-A’raf',
            ayat: '23',
            arab: 'قَالَا رَبَّنَا ظَلَمْنَآ اَنْفُسَنَا وَاِنْ لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُوْنَنَّ مِنَ الْخٰسِرِيْنَ',
            latin: 'Qālā rabbanā ẓalamnā anfusanā wa il lam tagfir lanā wa tarḥamnā lanakūnanna minal-khāsirīn.',
            terjemah:
              'Keduanya berkata, “Ya Tuhan kami, kami telah menzalimi diri kami sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.”',
            tafsirSingkat: 'Doa taubat Nabi Adam a.s. mengajarkan kerendahan hati mengakui kekeliruan dan memohon ampun kepada Allah.',
            keterkaitanMateri: 'Membiasakan anak berani meminta maaf ketika berbuat salah.',
          },
          hadisUtama: {
            perawi: 'HR. At-Tirmidzi (No. 2499) & Ibnu Majah',
            kitab: 'Jami’ At-Tirmidzi, Kitab Shifatil Qiyamah',
            derajat: 'Hasan',
            arab: 'كُلُّ بَنِي آدَمَ خَطَّاءٌ وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ',
            latin: 'Kullu banī Ādama khaṭṭā’un wa khairul-khaṭṭā’īnat-tawwābūn.',
            terjemah: 'Setiap anak keturunan Adam pasti pernah berbuat salah, dan sebaik-baik orang yang bersalah adalah yang segera bertaubat.',
            hikmahPedagogis: 'Membangun keberanian jujur dan memperbaiki kesalahan tanpa rasa putus asa.',
          },
        },
      ],
    },

    // SEMESTER 2 (GENAP)
    {
      id: 'fase-a-bab-6',
      nomorBab: 6,
      judulBab: 'Senang Membaca Surah An-Nas, Al-Falaq, dan Al-Ikhlas',
      kelas: 'Kelas 2',
      semester: 'Genap',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Membaca dan menghafal huruf hijaiyah bersambung serta Surah Al-Mu’awwidzat (An-Nas & Al-Falaq) sebagai doa perlindungan diri.',
      atpList: [
        {
          kode: 'ATP-A.6.1',
          kelas: 'Kelas 2',
          semester: 'Genap',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Membaca dan menghafal Surah An-Nas dan Al-Falaq secara tartil serta membiasakannya sebagai doa memohon perlindungan kepada Allah.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'a-6-m1',
          kode: 'MAT-A.6.1',
          judul: 'Memohon Perlindungan Allah dalam Surah An-Nas',
          ringkasan:
            'Melafalkan Surah An-Nas ayat 1–6 dan memahami bahwa hanya Allah Pelindung manusia dari segala bisikan keburukan.',
          kataKunci: ['Surah An-Nas', 'Hijaiyah Bersambung', 'Perlindungan Allah'],
          ayatUtama: {
            surah: 'QS. An-Nas',
            ayat: '1 – 3',
            arab: 'قُلْ اَعُوْذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ اِلٰهِ النَّاسِ ۝',
            latin: 'Qul a‘ūżu birabbin-nās. Malikin-nās. Ilāhin-nās.',
            terjemah: 'Katakanlah, “Aku berlindung kepada Tuhannya manusia, Raja manusia, sembahan manusia.”',
            tafsirSingkat: 'Allah adalah Pemelihara, Raja, dan Sembahan seluruh manusia sehingga anak beriman selalu merasa aman bersama-Nya.',
            keterkaitanMateri: 'Membiasakan bacaan Surah An-Nas sebelum tidur dan saat merasa takut.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 5017)',
            kitab: 'Sahih Al-Bukhari, Kitab Fada’il Al-Qur’an',
            derajat: 'Shahih',
            arab: 'كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا أَوَى إِلَى فِرَاشِهِ كُلَّ لَيْلَةٍ جَمَعَ كَفَّيْهِ ثُمَّ نَفَثَ فِيهِمَا فَقَرَأَ فِيهِمَا قُلْ هُوَ اللَّهُ أَحَدٌ وَقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ وَقُلْ أَعُوذُ بِرَبِّ النَّاسِ',
            latin: 'Kānan-nabiyyu ṣallallāhu ‘alaihi wa sallama iżā awā ilā firāsyihī kulla lailatin jama‘a kaffaihi ṡumma nafaṡa fīhimā faqara’a fīhimā Qul huwallāhu aḥad, wa Qul a‘ūżu birabbil-falaq, wa Qul a‘ūżu birabbin-nās.',
            terjemah:
              'Nabi saw. apabila hendak tidur setiap malam, beliau menangkupkan kedua telapak tangannya lalu meniupkan dan membaca Surah Al-Ikhlas, Al-Falaq, dan An-Nas.',
            hikmahPedagogis: 'Mengajarkan sunah Nabi saw. sebelum tidur secara menyenangkan.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-7',
      nomorBab: 7,
      judulBab: 'Mengenal Malaikat Allah dan Sifat Al-Hafiz – Al-Wali',
      kelas: 'Kelas 2',
      semester: 'Genap',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Mengenal sepuluh malaikat Allah beserta tugasnya dan menumbuhkan kesadaran bahwa Allah Maha Memelihara (Al-Hafiz) dan Maha Melindungi (Al-Wali).',
      atpList: [
        {
          kode: 'ATP-A.7.1',
          kelas: 'Kelas 2',
          semester: 'Genap',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menyebutkan nama-nama malaikat dan tugasnya serta menunjukkan sikap hati-hati dan optimis karena selalu diawasi dan dijaga Allah.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'a-7-m1',
          kode: 'MAT-A.7.1',
          judul: 'Beriman kepada Malaikat dan Allah Al-Hafiz',
          ringkasan:
            'Memahami bahwa malaikat adalah makhluk Allah yang taat mencatat amal baik dan buruk kita setiap saat.',
          kataKunci: ['Malaikat Allah', 'Al-Hafiz', 'Al-Wali', 'Amal Baik'],
          ayatUtama: {
            surah: 'QS. Qaf',
            ayat: '18',
            arab: 'مَا يَلْفِظُ مِنْ قَوْلٍ اِلَّا لَدَيْهِ رَقِيْبٌ عَتِيْدٌ',
            latin: 'Mā yalfiẓu min qaulin illā ladaihi raqībun ‘atīd.',
            terjemah: 'Tidak ada suatu kata yang diucapkannya melainkan ada di sisinya malaikat pengawas yang selalu siap (mencatat).',
            tafsirSingkat: 'Setiap ucapan baik maupun buruk dicatat oleh malaikat Raqib dan Atid.',
            keterkaitanMateri: 'Mendorong anak untuk menjaga lisan dengan berkata baik dan jujur.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 555) dan Muslim (No. 632)',
            kitab: 'Sahih Al-Bukhari, Kitab Mawaqit As-Salah',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'يَتَعَاقَبُونَ فِيكُمْ مَلَائِكَةٌ بِاللَّيْلِ وَمَلَائِكَةٌ بِالنَّهَارِ وَيَجْتَمِعُونَ فِي صَلَاةِ الْفَجْرِ وَصَلَاةِ الْعَصْرِ',
            latin: 'Yata‘āqabūna fīkum malā’ikatun bil-laili wa malā’ikatun bin-nahāri wa yajtami‘ūna fī ṣalātil-fajri wa ṣalātil-‘aṣr.',
            terjemah:
              'Para malaikat malam dan malaikat siang bergantian mengawasi kalian, dan mereka berkumpul pada waktu salat Subuh dan salat Asar.',
            hikmahPedagogis: 'Memotivasi anak menjaga salat tepat waktu karena disaksikan malaikat.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-8',
      nomorBab: 8,
      judulBab: 'Kasih Sayang kepada Sesama dan Rajin Bersyukur',
      kelas: 'Kelas 2',
      semester: 'Genap',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Membiasakan sikap kasih sayang kepada keluarga, teman, tumbuhan, dan hewan, serta mengucap syukur alhamdulillah atas nikmat Allah.',
      atpList: [
        {
          kode: 'ATP-A.8.1',
          kelas: 'Kelas 2',
          semester: 'Genap',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Mempraktikkan perilaku saling menyayangi, berbagi bekal/alat tulis, dan bersyukur atas nikmat kesehatan serta keluarga.',
          dimensiProfilLulusan: ['Kolaborasi', 'Kewargaan', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'a-8-m1',
          kode: 'MAT-A.8.1',
          judul: 'Menyayangi Sesama Makhluk dan Bersyukur',
          ringkasan:
            'Mengenal pentingnya empati, berbagi dengan teman, serta tidak menyakiti hewan dan merusak tanaman.',
          kataKunci: ['Kasih Sayang', 'Syukur', 'Berbagi', 'Empati'],
          ayatUtama: {
            surah: 'QS. Ibrahim',
            ayat: '7',
            arab: 'لَىِٕنْ شَكَرْتُمْ لَاَزِيْدَنَّكُمْ وَلَىِٕنْ كَفَرْتُمْ اِنَّ عَذَابِيْ لَشَدِيْدٌ',
            latin: 'La’in syakartum la’azīdannakum wa la’in kafartum inna ‘ażābī lasyadīd.',
            terjemah:
              'Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu, tetapi jika kamu mengingkari (nikmat-Ku), maka pasti azab-Ku sangat berat.',
            tafsirSingkat: 'Rasa syukur atas nikmat Allah mendatangkan keberkahan dan tambahan kebaikan.',
            keterkaitanMateri: 'Membentuk sikap positif anak dalam mensyukuri keluarga, guru, dan teman.',
          },
          hadisUtama: {
            perawi: 'HR. At-Tirmidzi (No. 1924) & Abu Dawud',
            kitab: 'Jami’ At-Tirmidzi, Kitab Al-Birr was-Silah',
            derajat: 'Shahih',
            arab: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
            latin: 'Ar-rāḥimūna yarḥamuhumur-raḥmān, irḥamū man fil-arḍi yarḥamkum man fis-samā’.',
            terjemah:
              'Orang-orang yang penyayang akan disayangi oleh Allah Yang Maha Penyayang. Sayangilah makhluk yang ada di bumi, niscaya Yang di langit akan menyayangi kalian.',
            hikmahPedagogis: 'Menguatkan karakter peduli sesama dan lingkungan pada peserta didik.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-9',
      nomorBab: 9,
      judulBab: 'Hidup Bersih, Tata Cara Wudu, dan Salat Fardu',
      kelas: 'Kelas 2',
      semester: 'Genap',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami makna bersuci (taharah), praktik wudu yang tertib, azan-ikamah, serta gerakan dan bacaan salat fardu lima waktu.',
      atpList: [
        {
          kode: 'ATP-A.9.1',
          kelas: 'Kelas 2',
          semester: 'Genap',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Mempraktikkan tata cara wudu beserta doanya serta gerakan salat fardu dengan tertib dan tumaninah.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kesehatan', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'a-9-m1',
          kode: 'MAT-A.9.1',
          judul: 'Bersuci Sebelum Salat dan Kebersihan Diri',
          ringkasan:
            'Mengenal syarat sah salat melalui wudu yang benar sekaligus menjaga kesehatan tubuh dan kebersihan ruang kelas.',
          kataKunci: ['Wudu', 'Salat Fardu', 'Taharah', 'Kesehatan'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '222',
            arab: 'اِنَّ اللّٰهَ يُحِبُّ التَّوَّابِيْنَ وَيُحِبُّ الْمُتَطَهِّرِيْنَ',
            latin: 'Innallāha yuḥibbut-tawwābīna wa yuḥibbul-mutaṭahhirīn.',
            terjemah: 'Sungguh, Allah menyukai orang yang tobat dan menyukai orang yang menyucikan diri.',
            tafsirSingkat: 'Allah mencintai hamba yang menjaga kesucian batin dan kebersihan lahir.',
            keterkaitanMateri: 'Menghubungkan praktik fikih wudu dengan kesadaran hidup bersih dan sehat.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 223)',
            kitab: 'Sahih Muslim, Kitab At-Taharah',
            derajat: 'Shahih',
            arab: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
            latin: 'Aṭ-ṭuhūru syaṭrul-īmān.',
            terjemah: 'Kesucian (kebersihan) itu adalah sebagian dari iman.',
            hikmahPedagogis: 'Membentuk kebiasaan konkret anak menjaga kebersihan dan berwudu dengan tertib.',
          },
        },
      ],
    },
    {
      id: 'fase-a-bab-10',
      nomorBab: 10,
      judulBab: 'Kisah Nabi Ibrahim a.s. dan Masa Kecil Nabi Muhammad saw.',
      kelas: 'Kelas 2',
      semester: 'Genap',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Meneladani keteguhan iman Nabi Ibrahim a.s. serta sifat jujur (Al-Amin) dan kasih sayang Nabi Muhammad saw. sejak masa kanak-kanak.',
      atpList: [
        {
          kode: 'ATP-A.10.1',
          kelas: 'Kelas 2',
          semester: 'Genap',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menceritakan keteladanan Nabi Ibrahim a.s. dan masa kecil Nabi Muhammad saw. serta meniru sifat jujur dan santun beliau.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'a-10-m1',
          kode: 'MAT-A.10.1',
          judul: 'Keteladanan Masa Kecil Rasulullah saw. (Al-Amin)',
          ringkasan:
            'Mengenal ketabahan Nabi Muhammad saw. sebagai anak yatim, pekerja keras menggembala kambing, dan jujur hingga dijuluki Al-Amin.',
          kataKunci: ['Nabi Muhammad saw.', 'Al-Amin', 'Nabi Ibrahim a.s.', 'Teladan'],
          ayatUtama: {
            surah: 'QS. Al-Qalam',
            ayat: '4',
            arab: 'وَاِنَّكَ لَعَلٰى خُلُقٍ عَظِيْمٍ',
            latin: 'Wa innaka la‘alā khuluqin ‘aẓīm.',
            terjemah: 'Dan sesungguhnya engkau (Muhammad) benar-benar berbudi pekerti yang agung.',
            tafsirSingkat: 'Allah memuji keluhuran akhlak Nabi Muhammad saw. sebagai teladan terbaik bagi seluruh umat manusia.',
            keterkaitanMateri: 'Menginspirasi anak meniru kebaikan akhlak Rasulullah sejak dini.',
          },
          hadisUtama: {
            perawi: 'HR. Ahmad (No. 8952) & Al-Hakim',
            kitab: 'Musnad Ahmad',
            derajat: 'Shahih',
            arab: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ',
            latin: 'Innamā bu‘iṡtu li’utammima makārimal-akhlāq.',
            terjemah: 'Sesungguhnya aku diutus hanya untuk menyempurnakan kemuliaan akhlak.',
            hikmahPedagogis: 'Menegaskan bahwa inti meneladani Nabi adalah mempraktikkan akhlak mulia.',
          },
        },
      ],
    },
  ],
};
