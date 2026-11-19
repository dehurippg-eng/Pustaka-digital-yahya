import type { FaseKurikulum2026 } from '../../types/curriculum';

export const MADRASAH_MA_FASES: FaseKurikulum2026[] = [
  {
    fase: 'E',
    jenjang: 'SMA/MA',
    jalur: 'Madrasah (Kemenag RI)',
    kelasRentang: 'Kelas 10 MA',
    labelLengkap: 'Fase E · Madrasah Aliyah (MA Kelas X)',
    rasional2026:
      'Kurikulum Madrasah Aliyah (MA) Fase E Tahun 2026 membekali peserta didik kajian mendalam rumpun PAI Madrasah (Al-Qur’an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab) serta pengenalan jurusan keagamaan (Ilmu Tafsir & Ilmu Hadis, Ushul Fikih) secara lengkap pada Semester 1 (Ganjil) dan Semester 2 (Genap).',
    capaianPembelajaran: [
      {
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiCP:
          'Peserta didik MA menganalisis keotentikan wahyu Al-Qur’an, struktur sanad-matan-rawi hadis, serta klasifikasi hadis sahih, hasan, dan daif sebagai sumber ajaran Islam.',
      },
      {
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiCP:
          'Peserta didik MA menganalisis prinsip akidah Islam Ahlussunnah wal Jamaah, menghindari sifat tercela (hubbud dunya, hasad, ujub, sombong, riya), dan membiasakan moderasi beragama (wasathiyah).',
      },
      {
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiCP:
          'Peserta didik MA menganalisis konsep fikih dan syariah, pengurusan jenazah, zakat produktif, ibadah haji dan umrah, serta fikih kurban dan akikah.',
      },
      {
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiCP:
          'Peserta didik MA menganalisis substansi dan strategi dakwah Nabi Muhammad saw. di Makkah dan Madinah, Piagam Madinah, serta kepemimpinan Khulafaurasyidin.',
      },
      {
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiCP:
          'Peserta didik MA memahami dan memproduksi teks lisan maupun tulis berbahasa Arab bertema At-Tahiyyat wat-Ta’aruf, Al-Usrah wal-Bait, Al-Madrasah, dan Al-Hayatul Yaumiyyah dengan kaidah Aqsamul Kalimah dan Mudzakkar-Mu’annats.',
      },
    ],
    babList: [
      {
        id: 'ma-e-qh-1',
        nomorBab: 1,
        judulBab: 'Al-Qur’an Hadis: Keotentikan Al-Qur’an & Unsur-Unsur Hadis (Sanad, Matan, Rawi)',
        kelas: 'Kelas 10 MA',
        semester: 'Ganjil',
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiSingkat:
          'Mengkaji bukti keotentikan Al-Qur’an secara historis-linguistik dan memahami anatomi hadis (sanad, matan, rawi) serta fungsi hadis terhadap Al-Qur’an.',
        atpList: [
          {
            kode: 'ATP-MA.QH.E1',
            kelas: 'Kelas 10 MA',
            semester: 'Ganjil',
            elemen: 'Al-Qur’an dan Hadis',
            mapel: 'Al-Qur’an Hadis',
            tujuanPembelajaran:
              'Menganalisis bukti kemukjizatan serta penjagaan Al-Qur’an dan mengklasifikasikan sanad, matan, serta perawi hadis secara metodologis.',
            dimensiProfilLulusan: [
              'Keimanan dan Ketakwaan terhadap Tuhan YME',
              'Penalaran Kritis',
            ],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-e-qh-m1',
            kode: 'MAT-MA.QH.E1',
            judul: 'I’jazul Qur’an dan Fungsi Hadis (Bayan Taqrir, Tafsir, Tasyri’)',
            ringkasan:
              'Membuktikan keaslian mushaf Al-Qur’an yang dijaga Allah Swt. serta memahami peran As-Sunnah merinci dan menguatkan hukum Al-Qur’an.',
            kataKunci: ['I’jazul Qur’an', 'Sanad', 'Matan', 'Bayan Tafsir'],
            ayatUtama: {
              surah: 'QS. Al-Hijr',
              ayat: '9',
              arab: 'اِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَاِنَّا لَهٗ لَحٰفِظُوْنَ',
              latin: 'Innā naḥnu nazzalnaż-żikra wa innā lahū laḥāfiẓūn.',
              terjemah:
                'Sesungguhnya Kamilah yang menurunkan Al-Qur’an, dan pasti Kami (pula) yang memeliharanya.',
              tafsirSingkat:
                'Allah menjamin kemurnian redaksi dan makna Al-Qur’an dari segala upaya perubahan hingga akhir zaman melalui hafalan dan kodifikasi mutawatir.',
              keterkaitanMateri:
                'Menjadi landasan teologis kajian Ulumul Qur’an dan Ulumul Hadis bagi siswa MA.',
            },
            hadisUtama: {
              perawi: 'HR. Abu Dawud (No. 4604) & At-Tirmidzi',
              kitab: 'Sunan Abi Dawud, Kitab As-Sunnah',
              derajat: 'Shahih',
              arab: 'أَلَا إِنِّي أُوتِيتُ الْكِتَابَ وَمِثْلَهُ مَعَهُ',
              latin: 'Alā innī ūtītul-kitāba wa miṡlahū ma‘ah.',
              terjemah:
                'Ketahuilah, sesungguhnya aku diberi Al-Kitab (Al-Qur’an) dan yang semisalnya (As-Sunnah) bersamanya.',
              hikmahPedagogis:
                'Menegaskan keterpaduan tak terpisahkan antara Al-Qur’an dan Hadis dalam memahami syariat.',
            },
          },
        ],
      },
      {
        id: 'ma-e-fk-1',
        nomorBab: 2,
        judulBab: 'Fikih: Kepengurusan Jenazah (Tajhizul Jana’iz) & Zakat Produktif',
        kelas: 'Kelas 10 MA',
        semester: 'Ganjil',
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiSingkat:
          'Menguasai hukum fardu kifayah pengurusan jenazah (memandikan, mengafani, menyalatkan, menguburkan) serta pengelolaan zakat produktif untuk pengentasan kemiskinan.',
        atpList: [
          {
            kode: 'ATP-MA.FK.E1',
            kelas: 'Kelas 10 MA',
            semester: 'Ganjil',
            elemen: 'Fikih',
            mapel: 'Fikih',
            tujuanPembelajaran:
              'Mempraktikkan tata cara salat jenazah dengan empat takbir dan merancang model penyaluran zakat produktif berbasis pemberdayaan mustahik.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kolaborasi'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-e-fk-m1',
            kode: 'MAT-MA.FK.E1',
            judul: 'Fardu Kifayah Tajhizul Jana’iz dan Tata Cara Salat Jenazah',
            ringkasan:
              'Memahami empat kewajiban muslim terhadap jenazah saudaranya beserta perbedaan bacaan dan posisi imam bagi jenazah laki-laki dan perempuan.',
            kataKunci: ['Tajhizul Jana’iz', 'Salat Jenazah', 'Fardu Kifayah', 'Zakat Produktif'],
            ayatUtama: {
              surah: 'QS. Ali ‘Imran',
              ayat: '185',
              arab: 'كُلُّ نَفْسٍ ذَاۤىِٕقَةُ الْمَوْتِۗ وَاِنَّمَا تُوَفَّوْنَ اُجُوْرَكُمْ يَوْمَ الْقِيٰمَةِ',
              latin: 'Kullu nafsin żā’iqatul-maut, wa innamā tuwaffauna ujūrakum yaumal-qiyāmah.',
              terjemah:
                'Setiap yang bernyawa akan merasakan mati. Dan hanya pada hari Kiamat sajalah diberikan dengan sempurna balasanmu.',
              tafsirSingkat:
                'Mengingat kematian (zikrul maut) melembutkan hati dan menguatkan solidaritas memuliakan jenazah sesama Muslim.',
              keterkaitanMateri:
                'Membentuk kesiapan praktik sosial keagamaan siswa MA ketika berada di tengah masyarakat.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 1325) & Muslim (No. 945)',
              kitab: 'Sahih Al-Bukhari, Kitab Al-Jana’iz',
              derajat: 'Shahih (Muttafaq ‘Alaih)',
              arab: 'مَنْ شَهِدَ الْجِنَازَةَ حَتَّى يُصَلَّى عَلَيْهَا فَلَهُ قِيرَاطٌ وَمَنْ شَهِدَهَا حَتَّى تُدْفَنَ فَلَهُ قِيرَاطَانِ',
              latin:
                'Man syahidal-jināzata ḥattā yuṣallā ‘alaihā falahū qīrāṭ, wa man syahidahā ḥattā tudfana falahū qīrāṭān.',
              terjemah:
                'Barangsiapa menghadiri jenazah hingga menyalatkannya maka baginya pahala satu qirath (sebesar gunung Uhud), dan barangsiapa menyaksikannya hingga dimakamkan maka baginya dua qirath.',
              hikmahPedagogis:
                'Mendorong siswa MA terlibat aktif dalam takziah dan ibadah sosial kemasyarakatan.',
            },
          },
        ],
      },
      {
        id: 'ma-e-ski-1',
        nomorBab: 3,
        judulBab: 'SKI: Peradaban Arab Pra-Islam & Strategi Dakwah Rasulullah saw. Periode Makkah',
        kelas: 'Kelas 10 MA',
        semester: 'Ganjil',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Menganalisis kondisi sosial-keagamaan masyarakat Jahiliyah serta transformasi bertahap dakwah Nabi Muhammad saw. di Makkah selama 13 tahun.',
        atpList: [
          {
            kode: 'ATP-MA.SKI.E1',
            kelas: 'Kelas 10 MA',
            semester: 'Ganjil',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Mengevaluasi strategi dakwah sirriyah dan jahriyah Rasulullah saw. di Makkah serta memetik keteladanan keteguhan prinsip dalam perubahan sosial.',
            dimensiProfilLulusan: ['Penalaran Kritis', 'Komunikasi', 'Kewargaan'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-e-ski-m1',
            kode: 'MAT-MA.SKI.E1',
            judul: 'Substansi & Strategi Dakwah Makkah sebagai Pondasi Akidah dan Kesetaraan',
            ringkasan:
              'Menguraikan prioritas dakwah tauhid dan pembebasan martabat manusia di tengah sistem kabilah Quraisy yang diskriminatif.',
            kataKunci: ['Dakwah Makkah', 'Sirriyah & Jahriyah', 'Tauhid Sosial', 'Darul Arqam'],
            ayatUtama: {
              surah: 'QS. Al-Hijr',
              ayat: '94',
              arab: 'فَاصْدَعْ بِمَا تُؤْمَرُ وَاَعْرِضْ عَنِ الْمُشْرِكِيْنَ',
              latin: 'Faṣda‘ bimā tu’maru wa a‘riḍ ‘anil-musyrikīn.',
              terjemah:
                'Maka sampaikanlah (Muhammad) secara terang-terangan segala apa yang diperintahkan (kepadamu) dan berpalinglah dari orang yang musyrik.',
              tafsirSingkat:
                'Ayat ini menjadi titik balik dimulainya dakwah jahriyah (terbuka) secara damai dan penuh keberanian di Makkah.',
              keterkaitanMateri:
                'Menjadi tonggak analisis historiografi SKI Kelas 10 MA Semester 1.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 3612)',
              kitab: 'Sahih Al-Bukhari, Kitab Al-Manaqib',
              derajat: 'Shahih',
              arab: 'وَاللَّهِ لَيُتِمَّنَّ هَذَا الْأَمْرَ حَتَّى يَسِيرَ الرَّاكِبُ مِنْ صَنْعَاءَ إِلَى حَضْرَمَوْتَ لَا يَخَافُ إِلَّا اللَّهَ',
              latin:
                'Wallāhi layutimanna hāżal-amru ḥattā yasīrar-rākibu min Ṣan‘ā’a ilā Ḥaḍramauta lā yakhāfu illallāh.',
              terjemah:
                'Demi Allah, sungguh Allah akan menyempurnakan agama ini hingga seorang pengendara berjalan dari Shan’a menuju Hadramaut tidak merasa takut kecuali hanya kepada Allah.',
              hikmahPedagogis:
                'Menanamkan optimisme perjuangan jangka panjang di tengah tantangan zaman.',
            },
          },
        ],
      },
      {
        id: 'ma-e-aa-2',
        nomorBab: 4,
        judulBab: 'Akidah Akhlak: Moderasi Beragama (Wasathiyah) & Menghindari Sifat Tercela',
        kelas: 'Kelas 10 MA',
        semester: 'Genap',
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiSingkat:
          'Menganalisis konsep Wasathiyah Islam (tawazun, i’tidal, tasamuh, syura) serta menundukkan penyakit hati hubbud dunya, hasad, dan ujub.',
        atpList: [
          {
            kode: 'ATP-MA.AA.E2',
            kelas: 'Kelas 10 MA',
            semester: 'Genap',
            elemen: 'Akidah',
            mapel: 'Akidah Akhlak',
            tujuanPembelajaran:
              'Mengevaluasi sikap ekstremisme (ifrath dan tafrith) melalui prinsip Ummatan Wasathan serta merumuskan strategi tazkiyatun nafs remaja.',
            dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-e-aa-m2',
            kode: 'MAT-MA.AA.E2',
            judul: 'Ummatan Wasathan dan Kebersihan Hati dari Hasad serta Ujub',
            ringkasan:
              'Memahami keseimbangan Islam antara akal dan wahyu, dunia dan akhirat, serta penyucian hati dari kesombongan dan iri hati.',
            kataKunci: ['Wasathiyah', 'Tasamuh', 'Tazkiyatun Nafs', 'Anti-Hasad'],
            ayatUtama: {
              surah: 'QS. Al-Baqarah',
              ayat: '143',
              arab: 'وَكَذٰلِكَ جَعَلْنٰكُمْ اُمَّةً وَّسَطًا لِّتَكُوْنُوْا شُهَدَاۤءَ عَلَى النَّاسِ',
              latin: 'Wa każālika ja‘alnākum ummataw wasaṭal litakūnū syuhadā’a ‘alan-nās.',
              terjemah:
                'Dan demikian pula Kami telah menjadikan kamu (umat Islam) umat yang adil dan pilihan (wasathan) agar kamu menjadi saksi atas (perbuatan) manusia.',
              tafsirSingkat:
                'Umat Islam dipanggil menjadi teladan keadilan, keseimbangan, dan kedamaian yang menjauhi ekstrem kanan maupun ekstrem kiri.',
              keterkaitanMateri:
                'Menjadi inti penguatan moderasi beragama di Madrasah Aliyah.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 39) & An-Nasa’i',
              kitab: 'Sahih Al-Bukhari, Kitab Al-Iman',
              derajat: 'Shahih',
              arab: 'إِنَّ الدِّينَ يُسْرٌ وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلَّا غَلَبَهُ فَسَدِّدُوا وَقَارِبُوا',
              latin:
                'Innad-dīna yusrun, wa lan yusyāddad-dīna aḥadun illā galabah, fasaddidū wa qāribū.',
              terjemah:
                'Sesungguhnya agama ini mudah. Tidaklah seseorang memperberat-berat urusan agama melainkan ia akan dikalahkan olehnya. Maka luruskanlah dan dekatkanlah (bersikaplah moderat).',
              hikmahPedagogis:
                'Membentuk pola pikir beragama yang matang, lapang dada, dan seimbang.',
            },
          },
        ],
      },
      {
        id: 'ma-e-ski-2',
        nomorBab: 5,
        judulBab: 'SKI: Piagam Madinah & Strategi Membangun Masyarakat Plural yang Damai',
        kelas: 'Kelas 10 MA',
        semester: 'Genap',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Mengkaji substansi Piagam Madinah (Shahifah Al-Madinah) sebagai konstitusi tertulis pertama yang menjamin kebebasan beragama dan keadilan warga.',
        atpList: [
          {
            kode: 'ATP-MA.SKI.E2',
            kelas: 'Kelas 10 MA',
            semester: 'Genap',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Menganalisis pasal-pasal pokok Piagam Madinah dan menghubungkannya dengan nilai kebhinekaan serta konsensus berbangsa di Indonesia.',
            dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis', 'Komunikasi'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-e-ski-m2',
            kode: 'MAT-MA.SKI.E2',
            judul: 'Piagam Madinah sebagai Model Negara Hukum yang Inklusif',
            ringkasan:
              'Membedah nilai persatuan antar-kabilah, hak hidup aman komunitas Yahudi-Nasrani-Muslim, dan pertahanan bersama di Madinah.',
            kataKunci: ['Piagam Madinah', 'Masyarakat Madani', 'Konstitusi Damai', 'Kebhinekaan'],
            ayatUtama: {
              surah: 'QS. Al-Mumtahanah',
              ayat: '8',
              arab: 'لَا يَنْهٰىكُمُ اللّٰهُ عَنِ الَّذِيْنَ لَمْ يُقَاتِلُوْكُمْ فِى الدِّيْنِ وَلَمْ يُخْرِجُوْكُمْ مِّنْ دِيَارِكُمْ اَنْ تَبَرُّوْهُمْ وَتُقْسِطُوْٓا اِلَيْهِمْ',
              latin:
                'Lā yanhākumullāhu ‘anil-lażīna lam yuqātilūkum fid-dīni wa lam yukhrijūkum min diyārikum an tabarrūhum wa tuqsiṭū ilaihim.',
              terjemah:
                'Allah tidak melarang kamu berbuat baik dan berlaku adil terhadap orang-orang yang tidak memerangimu dalam urusan agama dan tidak mengusirmu dari kampung halamanmu.',
              tafsirSingkat:
                'Islam mewajibkan keadilan sosial dan kebaikan hubungan kemanusiaan lintas agama dalam kehidupan bernegara yang damai.',
              keterkaitanMateri:
                'Menguatkan wawasan kebangsaan Islami siswa MA melalui fakta sejarah Piagam Madinah.',
            },
            hadisUtama: {
              perawi: 'HR. Abu Dawud (No. 3052)',
              kitab: 'Sunan Abi Dawud',
              derajat: 'Shahih',
              arab: 'أَلَا مَنْ ظَلَمَ مُعَاهِدًا أَوِ انْتَقَصَهُ أَوْ كَلَّفَهُ فَوْقَ طَاقَتِهِ فَأَنَا حَجِيجُهُ يَوْمَ الْقِيَامَةِ',
              latin:
                'Alā man ẓalama mu‘āhidan awintaqaṣahū au kallafahū fauqa ṭāqatihī fa ana ḥajījuhū yaumal-qiyāmah.',
              terjemah:
                'Ingatlah, barangsiapa menzalimi warga non-muslim yang terikat perjanjian damai, mengurangi haknya, atau membebaninya di luar batas, maka akulah yang menjadi pembelanya pada hari Kiamat.',
              hikmahPedagogis:
                'Menanamkan jaminan keadilan dan anti-diskriminasi dalam masyarakat majemuk.',
            },
          },
        ],
      },
      {
        id: 'ma-e-ba-2',
        nomorBab: 6,
        judulBab: 'Bahasa Arab: اَلْحَيَاةُ الْيَوْمِيَّةُ وَالهِوَايَةُ (Aktivitas Harian & Hobi)',
        kelas: 'Kelas 10 MA',
        semester: 'Genap',
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiSingkat:
          'Mengembangkan kemampuan menyimak, berbicara, membaca, dan menulis wacana bahasa Arab bertema aktivitas harian pelajar MA dan hobi positif.',
        atpList: [
          {
            kode: 'ATP-MA.BA.E2',
            kelas: 'Kelas 10 MA',
            semester: 'Genap',
            elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
            mapel: 'Bahasa Arab',
            tujuanPembelajaran:
              'Memproduksi dialog dan paragraf narasi berbahasa Arab dengan menerapkan kaidah Adawatul Istifham dan pembagian kata kerja (Fi’il).',
            dimensiProfilLulusan: ['Komunikasi', 'Kreativitas'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-e-ba-m2',
            kode: 'MAT-MA.BA.E2',
            judul: 'Teks Narasi Al-Hayatul Yaumiyyah dan Pembagian Fi’il (Madi, Mudhari’, Amr)',
            ringkasan:
              'Menganalisis teks qira’ah tentang keseharian santri/siswa MA dan menyusun esai pendek menggunakan tasrif fi’il dasar.',
            kataKunci: ['Al-Hayatul Yaumiyyah', 'Tasrif Fi’il', 'Qira’ah', 'Insya’'],
            ayatUtama: {
              surah: 'QS. Az-Zukhruf',
              ayat: '3',
              arab: 'اِنَّا جَعَلْنٰهُ قُرْاٰنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُوْنَ',
              latin: 'Innā ja‘alnāhu qur’ānan ‘arabiyyal la‘allakum ta‘qilūn.',
              terjemah:
                'Sesungguhnya Kami menjadikan Al-Qur’an dalam bahasa Arab agar kamu mengerti.',
              tafsirSingkat:
                'Penguasaan struktur kata kerja bahasa Arab membuka pintu pemahaman langsung terhadap ayat-ayat Al-Qur’an.',
              keterkaitanMateri:
                'Menyatukan pembelajaran gramatika Sharaf dengan literasi kitab suci.',
            },
            hadisUtama: {
              perawi: 'HR. At-Tirmidzi (No. 2317)',
              kitab: 'Jami’ At-Tirmidzi',
              derajat: 'Hasan',
              arab: 'مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ',
              latin: 'Min ḥusni islāmil-mar’i tarkuhū mā lā ya‘nīh.',
              terjemah:
                'Di antara tanda kebaikan keislaman seseorang adalah meninggalkan hal-hal yang tidak bermanfaat baginya.',
              hikmahPedagogis:
                'Mengarahkan hobi dan aktivitas harian siswa MA pada hal yang produktif.',
            },
          },
        ],
      },
    ],
  },
  {
    fase: 'F',
    jenjang: 'SMA/MA',
    jalur: 'Madrasah (Kemenag RI)',
    kelasRentang: 'Kelas 11 – 12 MA',
    labelLengkap: 'Fase F · Madrasah Aliyah (MA Kelas XI & XII)',
    rasional2026:
      'Kurikulum Madrasah Aliyah Fase F Tahun 2026 memantapkan kompetensi tingkat lanjut siswa kelas 11 dan 12 MA pada rumpun PAI Madrasah (Al-Qur’an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab) sekaligus menghadirkan mapel peminatan/keagamaan khusus MA yaitu Ilmu Tafsir & Ilmu Hadis serta Ushul Fikih pada Semester 1 dan Semester 2.',
    capaianPembelajaran: [
      {
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiCP:
          'Peserta didik MA menganalisis ayat dan hadis tentang tanggung jawab individu-keluarga, amar makruf nahi mungkar, etos keilmuan, demokrasi/musyawarah, dan kesadaran berbangsa.',
      },
      {
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiCP:
          'Peserta didik MA menganalisis aliran-aliran ilmu kalam secara moderat, tasawuf positif dan akhlak pergaulan remaja, serta etika profesi dan kepemimpinan Islam.',
      },
      {
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiCP:
          'Peserta didik MA menganalisis hukum jinayah dan hudud secara proporsional, fikih munakahat (pernikahan dan keluarga sakinah), serta fikih mawaris (pembagian warisan Islam) dan siyasah syar’iyah.',
      },
      {
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiCP:
          'Peserta didik MA menganalisis peradaban tiga kerajaan besar Islam (Usmani, Safawi, Mughal), gerakan pembaruan pemikiran Islam modern, dan perkembangan Islam di dunia serta Indonesia.',
      },
      {
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiCP:
          'Peserta didik MA menguasai keterampilan berbahasa Arab tingkat lanjut (Balaghah dasar, Na’at-Man’ut, Idafah, Fi’il Mabni Lil-Majhul) bertema At-Tasawwuq, As-Safar, Al-Hadharah Al-Islamiyah, dan Ad-Dirasah fil-Jami’ah.',
      },
      {
        elemen: 'Ilmu Tafsir & Ilmu Hadis',
        mapel: 'Ilmu Tafsir & Ilmu Hadis',
        deskripsiCP:
          'Peserta didik MA Keagamaan menguasai metodologi Tafsir Tahlili, Ijmali, Muqarin, dan Maudhu’i serta kaidah kritik sanad-matan (Jarh wa Ta’dil dan Takhrij Hadis).',
      },
      {
        elemen: 'Ushul Fikih',
        mapel: 'Ushul Fikih',
        deskripsiCP:
          'Peserta didik MA Keagamaan menganalisis sumber hukum Islam muttafaq (Al-Qur’an, Sunah, Ijmak, Qiyas) dan mukhtalaf (Istihsan, Maslahah Mursalah, ‘Urf, Saddudz Dzari’ah), Qawa’idul Fiqhiyah, dan Maqashid Syariah.',
      },
    ],
    babList: [
      // SEMESTER 1 (GANJIL)
      {
        id: 'ma-f-uf-1',
        nomorBab: 1,
        judulBab: 'Ushul Fikih: Maqashid Syariah & Sumber Hukum Islam (Al-Qur’an, Sunah, Ijmak, Qiyas)',
        kelas: 'Kelas 11 – 12 MA',
        semester: 'Ganjil',
        elemen: 'Ushul Fikih',
        mapel: 'Ushul Fikih',
        deskripsiSingkat:
          'Memahami metode istinbat hukum Islam melalui sumber hukum muttafaq dan lima prinsip Maqashid Syariah (Hifdzud Din, Nafs, ‘Aql, Nasl, Mal).',
        atpList: [
          {
            kode: 'ATP-MA.UF.F1',
            kelas: 'Kelas 12 MA',
            semester: 'Ganjil',
            elemen: 'Ushul Fikih',
            mapel: 'Ushul Fikih',
            tujuanPembelajaran:
              'Menganalisis penerapan Qiyas dan Maslahah Mursalah berbasis Maqashid Syariah untuk menjawab persoalan hukum kontemporer (fikih digital dan kesehatan).',
            dimensiProfilLulusan: [
              'Keimanan dan Ketakwaan terhadap Tuhan YME',
              'Penalaran Kritis',
              'Kreativitas',
            ],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-f-uf-m1',
            kode: 'MAT-MA.UF.F1',
            judul: 'Rukun Qiyas dan Lima Prinsip Maqashid Syariah dalam Ijtihad Kontemporer',
            ringkasan:
              'Membedah empat rukun Qiyas (Ashl, Far’, Hukmul Ashl, ‘Illat) serta penerapan Al-Kulliyatul Khams dalam menjaga kemaslahatan umat.',
            kataKunci: ['Ushul Fikih', 'Qiyas', 'Maqashid Syariah', 'Maslahah Mursalah'],
            ayatUtama: {
              surah: 'QS. Al-Hasyr',
              ayat: '2',
              arab: 'فَاعْتَبِرُوْا يٰٓاُولِى الْاَبْصَارِ',
              latin: 'Fa‘tabirū yā ulil-abṣār.',
              terjemah:
                'Maka ambillah (kejadian itu) untuk menjadi pelajaran, wahai orang-orang yang mempunyai pandangan (akal tajam)!',
              tafsirSingkat:
                'Ulama Ushul Fikih menjadikan perintah i’tibar (menghubungkan satu kasus dengan kasus serupa yang ber-illat sama) sebagai dasar legitimasi Qiyas.',
              keterkaitanMateri:
                'Menjadi landasan metodologis pengembangan hukum Islam agar selalu relevan di setiap zaman.',
            },
            hadisUtama: {
              perawi: 'HR. Abu Dawud (No. 3592) & At-Tirmidzi (No. 1327)',
              kitab: 'Sunan Abi Dawud, Kitab Al-Aqdhiyah',
              derajat: 'Hasan Shahih',
              arab: 'كَيْفَ تَقْضِي إِذَا عَرَضَ لَكَ قَضَاءٌ قَالَ أَقْضِي بِكِتَابِ اللَّهِ قَالَ فَإِنْ لَمْ تَجِدْ قَالَ فَبِسُنَّةِ رَسُولِ اللَّهِ قَالَ فَإِنْ لَمْ تَجِدْ قَالَ أَجْتَهِدُ رَأْيِي وَلَا آلُو',
              latin:
                'Kaifa taqḍī iżā ‘araḍa laka qaḍā’? Qāla: Aqḍī bikitābillāh. Qāla: Fa in lam tajid? Qāla: Fabisunnati rasūlillāh. Qāla: Fa in lam tajid? Qāla: Ajtahidu ra’yī wa lā ālū.',
              terjemah:
                'Bagaimana engkau memutuskan suatu perkara wahai Mu’adz? Mu’adz menjawab: Dengan Kitabullah; jika tidak kutemukan maka dengan Sunah Rasulullah; jika tidak kutemukan maka aku berijtihad dengan akalku dengan sungguh-sungguh.',
              hikmahPedagogis:
                'Kisah dialog Rasulullah saw. dan Mu’adz bin Jabal menjadi fondasi utama urutan dalil dalam ilmu Ushul Fikih.',
            },
          },
        ],
      },
      {
        id: 'ma-f-th-1',
        nomorBab: 2,
        judulBab: 'Ilmu Tafsir & Ilmu Hadis: Metode Tafsir Maudhu’i dan Kaidah Takhrij Hadis',
        kelas: 'Kelas 11 – 12 MA',
        semester: 'Ganjil',
        elemen: 'Ilmu Tafsir & Ilmu Hadis',
        mapel: 'Ilmu Tafsir & Ilmu Hadis',
        deskripsiSingkat:
          'Mempelajari metodologi tafsir tematik (Maudhu’i) dan komparatif (Muqarin) serta langkah praktis meneliti otentisitas sanad-matan melalui Takhrij Hadis.',
        atpList: [
          {
            kode: 'ATP-MA.TH.F1',
            kelas: 'Kelas 12 MA',
            semester: 'Ganjil',
            elemen: 'Ilmu Tafsir & Ilmu Hadis',
            mapel: 'Ilmu Tafsir & Ilmu Hadis',
            tujuanPembelajaran:
              'Mempraktikkan langkah penyusunan kajian Tafsir Maudhu’i dan verifikasi derajat hadis menggunakan metode Jarh wa Ta’dil.',
            dimensiProfilLulusan: ['Penalaran Kritis', 'Kemandirian', 'Komunikasi'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-f-th-m1',
            kode: 'MAT-MA.TH.F1',
            judul: 'Metodologi Tafsir Maudhu’i dan Kritik Matan-Sanad Hadis',
            ringkasan:
              'Menguasai syarat mufassir, membedakan tafsir bil-ma’tsur dan bir-ra’yi al-mahmud, serta lima syarat kesahihan hadis.',
            kataKunci: ['Tafsir Maudhu’i', 'Takhrij Hadis', 'Jarh wa Ta’dil', 'Kaidah Tafsir'],
            ayatUtama: {
              surah: 'QS. Sad',
              ayat: '29',
              arab: 'كِتٰبٌ اَنْزَلْنٰهُ اِلَيْكَ مُبٰرَكٌ لِّيَدَّبَّرُوْٓا اٰيٰتِهٖ وَلِيَتَذَكَّرَ اُولُوا الْاَلْبَابِ',
              latin:
                'Kitābun anzalnāhu ilaika mubārakul liyaddabbarū āyātihī wa liyatażakkara ulul-albāb.',
              terjemah:
                'Kitab (Al-Qur’an) yang Kami turunkan kepadamu penuh berkah agar mereka menghayati ayat-ayatnya dan agar orang-orang yang berakal sehat mendapat pelajaran.',
              tafsirSingkat:
                'Tadabbur ilmiah terhadap Al-Qur’an menuntut penguasaan kaidah bahasa, asbabun nuzul, dan korelasi ayat.',
              keterkaitanMateri:
                'Menjadi inti kurikulum peminatan keagamaan MA dalam melahirkan calon peneliti kajian Islam.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 110) & Muslim (No. 3)',
              kitab: 'Sahih Al-Bukhari, Kitab Al-‘Ilm',
              derajat: 'Shahih (Muttafaq ‘Alaih)',
              arab: 'مَنْ كَذَبَ عَلَيَّ مُتَعَمِّدًا فَلْيَتَبَوَّأْ مَقْعَدَهُ مِنَ النَّارِ',
              latin: 'Man każaba ‘alayya muta‘ammidan falyatabawwa’ maq‘adahū minan-nār.',
              terjemah:
                'Barangsiapa berdusta atas namaku dengan sengaja, maka hendaklah ia bersiap-siap menempati tempat duduknya di neraka.',
              hikmahPedagogis:
                'Menjelaskan mengapa ulama hadis membangun ilmu sanad dan Jarh wa Ta’dil secara ketat demi menjaga kemurnian sunah.',
            },
          },
        ],
      },
      {
        id: 'ma-f-ski-1',
        nomorBab: 3,
        judulBab: 'SKI: Peradaban Tiga Kerajaan Besar Islam (Turki Usmani, Safawi, & Mughal)',
        kelas: 'Kelas 11 – 12 MA',
        semester: 'Ganjil',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Mengkaji kontribusi arsitektur, diplomasi, toleransi multikultural, dan kemajuan teknologi militer-sains pada masa Daulah Usmani, Safawi, dan Mughal.',
        atpList: [
          {
            kode: 'ATP-MA.SKI.F1',
            kelas: 'Kelas 11 MA',
            semester: 'Ganjil',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Menganalisis faktor kejayaan serta kemunduran Tiga Kerajaan Besar Islam sebagai pelajaran strategis membangun daya saing peradaban modern.',
            dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Kreativitas'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-f-ski-m1',
            kode: 'MAT-MA.SKI.F1',
            judul: 'Kemajuan Arsitektur, Diplomasi, dan Ibrah Kemunduran Tiga Kerajaan Besar',
            ringkasan:
              'Membandingkan kejayaan Istanbul (Muhammad Al-Fatih & Sulaiman Al-Qanuni), Isfahan, dan Agra-Delhi (Taj Mahal) serta menjaga persatuan umat dari konflik sektarian.',
            kataKunci: ['Turki Usmani', 'Daulah Safawi', 'Daulah Mughal', 'Ibrah Sejarah'],
            ayatUtama: {
              surah: 'QS. Yusuf',
              ayat: '111',
              arab: 'لَقَدْ كَانَ فِيْ قَصَصِهِمْ عِبْرَةٌ لِّاُولِى الْاَلْبَابِ',
              latin: 'Laqad kāna fī qaṣaṣihim ‘ibratul li’ulil-albāb.',
              terjemah:
                'Sungguh, pada kisah-kisah mereka itu terdapat pengajaran (ibrah) bagi orang yang mempunyai akal.',
              tafsirSingkat:
                'Studi sejarah Islam bertujuan mengambil pelajaran strategis (ibrah) agar kejayaan dapat dilanjutkan dan kesalahan tidak diulang.',
              keterkaitanMateri:
                'Menjadi landasan analisis historis SKI Kelas 11–12 MA Semester 1.',
            },
            hadisUtama: {
              perawi: 'HR. Ahmad (No. 18957) & Al-Hakim',
              kitab: 'Musnad Ahmad',
              derajat: 'Hasan Shahih',
              arab: 'لَتُفْتَحَنَّ الْقُسْطَنْطِينِيَّةُ فَلَنِعْمَ الْأَمِيرُ أَمِيرُهَا وَلَنِعْمَ الْجَيْشُ ذَلِكَ الْجَيْشُ',
              latin:
                'Latuftaḥannal-Qusṭanṭīniyyatu falani‘mal-amīru amīruhā wa lani‘mal-jaisyu żālikal-jaisy.',
              terjemah:
                'Sungguh Konstantinopel akan ditaklukkan; sebaik-baik pemimpin adalah pemimpinnya dan sebaik-baik pasukan adalah pasukannya.',
              hikmahPedagogis:
                'Menginspirasi etos kepemimpinan visioner, penguasaan teknologi, dan kedisiplinan seperti Sultan Muhammad Al-Fatih.',
            },
          },
        ],
      },
      // SEMESTER 2 (GENAP)
      {
        id: 'ma-f-fk-2',
        nomorBab: 4,
        judulBab: 'Fikih: Munakahat (Keluarga Sakinah) dan Fikih Mawaris (Ilmu Faraid)',
        kelas: 'Kelas 11 – 12 MA',
        semester: 'Genap',
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiSingkat:
          'Memahami ketentuan pernikahan dalam Islam dan UU Perkawinan, hak-kewajiban suami istri, serta perhitungan Furudhul Muqaddarah dalam hukum waris Islam.',
        atpList: [
          {
            kode: 'ATP-MA.FK.F2',
            kelas: 'Kelas 12 MA',
            semester: 'Genap',
            elemen: 'Fikih',
            mapel: 'Fikih',
            tujuanPembelajaran:
              'Menghitung pembagian harta warisan (ashabul furudh dan ashabah) dalam studi kasus keluarga secara tepat, adil, dan transparan.',
            dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Kemandirian'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-f-fk-m2',
            kode: 'MAT-MA.FK.F2',
            judul: 'Prinsip Keadilan Ilmu Faraid (Mawaris) dan Ketahanan Keluarga Islam',
            ringkasan:
              'Menguasai syarat dan rukun waris, hijab-mahjub, penghitungan bagian 1/2, 1/4, 1/8, 2/3, 1/3, 1/6, serta nilai sakinah mawaddah warahmah.',
            kataKunci: ['Faraid', 'Ashabul Furudh', 'Munakahat', 'Keadilan Waris'],
            ayatUtama: {
              surah: 'QS. An-Nisa’',
              ayat: '11',
              arab: 'يُوْصِيْكُمُ اللّٰهُ فِيْٓ اَوْلَادِكُمْ لِلذَّكَرِ مِثْلُ حَظِّ الْاُنْثَيَيْنِ ۚ فَرِيْضَةً مِّنَ اللّٰهِ',
              latin:
                'Yūṣīkumullāhu fī aulādikum liż-żakari miṡlu ḥaẓẓil-unṡayain, farīḍatam minallāh.',
              terjemah:
                'Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan... (Ini adalah) ketetapan dari Allah.',
              tafsirSingkat:
                'Pembagian waris ditetapkan langsung oleh Allah secara rinci demi mencegah sengketa antaranggota keluarga.',
              keterkaitanMateri:
                'Menjadi pokok bahasan Fikih MA Kelas XII Semester Genap yang memadukan hukum syariat dan numerasi logis.',
            },
            hadisUtama: {
              perawi: 'HR. Ibnu Majah (No. 2719) & Ad-Daruqutni',
              kitab: 'Sunan Ibnu Majah, Kitab Al-Fara’id',
              derajat: 'Hasan',
              arab: 'تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا فَإِنَّهَا نِصْفُ الْعِلْمِ',
              latin: 'Ta‘allamul-farā’iḍa wa ‘allimūhā fa innahā niṣful-‘ilm.',
              terjemah:
                'Pelajarilah ilmu faraid (waris) dan ajarkanlah kepada manusia, karena sesungguhnya ia adalah separuh ilmu.',
              hikmahPedagogis:
                'Membekali siswa MA dengan keterampilan menghitung hak waris secara objektif dan berkeadilan.',
            },
          },
        ],
      },
      {
        id: 'ma-f-aa-2',
        nomorBab: 5,
        judulBab: 'Akidah Akhlak: Ilmu Kalam, Tasawuf Positif & Etika Kepemimpinan Pemuda',
        kelas: 'Kelas 11 – 12 MA',
        semester: 'Genap',
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiSingkat:
          'Memahami perbandingan argumen aliran Ilmu Kalam secara bijak serta integrasi tasawuf akhlaki dalam etika kepemimpinan profesional dan digital.',
        atpList: [
          {
            kode: 'ATP-MA.AA.F2',
            kelas: 'Kelas 12 MA',
            semester: 'Genap',
            elemen: 'Akidah',
            mapel: 'Akidah Akhlak',
            tujuanPembelajaran:
              'Menganalisis relevansi tasawuf modern (takhalii, tahallii, tajallii) untuk menjaga kesehatan mental dan etika kepemimpinan generasi Z.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kesehatan'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-f-aa-m2',
            kode: 'MAT-MA.AA.F2',
            judul: 'Tasawuf Positif (Takhalli, Tahalli, Tajalli) di Era Disrupsi',
            ringkasan:
              'Menerapkan penyucian jiwa dari sifat tercela (takhalli), penghiasan dengan akhlak mulia (tahalli), dan penghayatan kehadiran Ilahi (tajalli) tanpa meninggalkan dunia kerja.',
            kataKunci: ['Tasawuf Positif', 'Takhalli', 'Tahalli', 'Kesehatan Mental'],
            ayatUtama: {
              surah: 'QS. Asy-Syams',
              ayat: '9 – 10',
              arab: 'قَدْ اَفْلَحَ مَنْ زَكّٰىهَاۖ ۝ وَقَدْ خَابَ مَنْ دَسّٰىهَاۗ ۝',
              latin: 'Qad aflaḥa man zakkāhā. Wa qad khāba man dassāhā.',
              terjemah:
                'Sungguh beruntung orang yang menyucikannya (jiwa itu), dan sungguh rugi orang yang mengotorinya.',
              tafsirSingkat:
                'Keberhasilan sejati manusia diukur dari kesungguhannya membersihkan jiwa dan mengendalikan hawa nafsu.',
              keterkaitanMateri:
                'Menjawab kegelisahan psikologis pelajar MA tingkat akhir dengan spiritualitas Islam yang aktif.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 52) & Muslim (No. 1599)',
              kitab: 'Sahih Al-Bukhari & Muslim',
              derajat: 'Shahih (Muttafaq ‘Alaih)',
              arab: 'أَلَا وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ أَلَا وَهِيَ الْقَلْبُ',
              latin:
                'Alā wa inna fil-jasadi muḍgatan iżā ṣalaḥat ṣalaḥal-jasadu kulluh, wa iżā fasadat fasadal-jasadu kulluh, alā wa hiyal-qalb.',
              terjemah:
                'Ketahuilah, di dalam tubuh terdapat segumpal daging; apabila ia baik maka baiklah seluruh tubuh, dan apabila ia rusak maka rusaklah seluruh tubuh. Ketahuilah, segumpal daging itu adalah hati (qalb).',
              hikmahPedagogis:
                'Menegaskan pentingnya manajemen kalbu dalam seluruh aspek aktivitas akademik dan sosial.',
            },
          },
        ],
      },
      {
        id: 'ma-f-ski-2',
        nomorBab: 6,
        judulBab: 'SKI: Gerakan Pembaruan Pemikiran Islam Modern & Peran Umat di Indonesia',
        kelas: 'Kelas 11 – 12 MA',
        semester: 'Genap',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Mengkaji gagasan pembaruan Jamaluddin Al-Afghani, Muhammad Abduh, KH. Ahmad Dahlan, dan KH. Hasyim Asy’ari dalam membangun kemandirian bangsa.',
        atpList: [
          {
            kode: 'ATP-MA.SKI.F2',
            kelas: 'Kelas 12 MA',
            semester: 'Genap',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Mengevaluasi kontribusi pembaruan pendidikan dan kebangsaan para tokoh Islam modern bagi kemajuan Indonesia masa kini.',
            dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis', 'Kreativitas'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-f-ski-m2',
            kode: 'MAT-MA.SKI.F2',
            judul: 'Tajdid Pendidikan Islam dan Kontribusi Ulama dalam Kemerdekaan Indonesia',
            ringkasan:
              'Menelaah transformasi pesantren dan madrasah modern, semangat ijtihad, serta Resolusi Jihad dan peran ulama menjaga NKRI.',
            kataKunci: ['Tajdid Islam', 'Modernisasi Madrasah', 'KH. Hasyim Asy’ari', 'KH. Ahmad Dahlan'],
            ayatUtama: {
              surah: 'QS. Ar-Ra’d',
              ayat: '11',
              arab: 'اِنَّ اللّٰهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتّٰى يُغَيِّرُوْا مَا بِاَنْفُسِهِمْ',
              latin: 'Innallāha lā yugayyiru mā biqaumin ḥattā yugayyirū mā bi’anfusihim.',
              terjemah:
                'Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan diri mereka sendiri.',
              tafsirSingkat:
                'Kemajuan peradaban dan kemerdekaan suatu bangsa mensyaratkan ikhtiar pembaruan pendidikan, etos kerja, dan persatuan.',
              keterkaitanMateri:
                'Ayat pendorong gerakan tajdid dan pembaruan Islam di dunia dan Nusantara.',
            },
            hadisUtama: {
              perawi: 'HR. Abu Dawud (No. 4291)',
              kitab: 'Sunan Abi Dawud, Kitab Al-Malahim',
              derajat: 'Shahih',
              arab: 'إِنَّ اللَّهَ يَبْعَثُ لِهَذِهِ الْأُمَّةِ عَلَى رَأْسِ كُلِّ مِائَةِ سَنَةٍ مَنْ يُجَدِّدُ لَهَا دِينَهَا',
              latin:
                'Innallāha yab‘aṡu lihāżihil-ummati ‘alā ra’si kulli mi’ati sanatin man yujaddidu lahā dīnahā.',
              terjemah:
                'Sesungguhnya Allah mengutus bagi umat ini pada setiap penghujung seratus tahun orang yang memperbarui (menghidupkan kembali pemahaman dan pengamalan) agamanya.',
              hikmahPedagogis:
                'Mengajak siswa MA menjadi generasi pembawa pembaruan ilmu dan akhlak bagi bangsa.',
            },
          },
        ],
      },
      {
        id: 'ma-f-ba-2',
        nomorBab: 7,
        judulBab: 'Bahasa Arab: الدِّرَاسَةُ فِي الْجَامِعَةِ وَالْحَضَارَةُ الْإِسْلَامِيَّةُ (Studi Lanjut & Peradaban)',
        kelas: 'Kelas 11 – 12 MA',
        semester: 'Genap',
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiSingkat:
          'Memahami teks eksposisi berbahasa Arab tentang studi perguruan tinggi dan kontribusi peradaban Islam dengan kaidah Fi’il Mabni Lil-Majhul dan Asmaul Khamsah.',
        atpList: [
          {
            kode: 'ATP-MA.BA.F2',
            kelas: 'Kelas 12 MA',
            semester: 'Genap',
            elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
            mapel: 'Bahasa Arab',
            tujuanPembelajaran:
              'Menulis esai singkat dan berpresentasi dalam bahasa Arab mengenai rencana studi perguruan tinggi serta kontribusi ilmuwan Muslim.',
            dimensiProfilLulusan: ['Komunikasi', 'Kemandirian', 'Penalaran Kritis'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'ma-f-ba-m2',
            kode: 'MAT-MA.BA.F2',
            judul: 'Qira’ah Al-Hadharah Al-Islamiyah dan Kaidah Fi’il Mabni Lil-Majhul',
            ringkasan:
              'Menganalisis pola kalimat aktif-pasif (Ma’lum-Majhul) dalam teks sejarah keilmuan Islam serta merancang profil studi masa depan berbahasa Arab.',
            kataKunci: ['Al-Hadharah', 'Mabni Lil-Majhul', 'Na’ibul Fa’il', 'Kalam Ilmiah'],
            ayatUtama: {
              surah: 'QS. Al-Mujadilah',
              ayat: '11',
              arab: 'يَرْفَعِ اللّٰهُ الَّذِيْنَ اٰمَنُوْا مِنْكُمْۙ وَالَّذِيْنَ اُوْتُوا الْعِلْمَ دَرَجٰتٍ',
              latin: 'Yarfa‘illāhul-lażīna āmanū minkum wallażīna ūtul-‘ilma darajāt.',
              terjemah:
                'Allah akan mengangkat (derajat) orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu beberapa derajat.',
              tafsirSingkat:
                'Kata "Ūtū" (أُوْتُوا = diberi) pada ayat ini merupakan contoh nyata Fi’il Mabni Lil-Majhul dalam Al-Qur’an.',
              keterkaitanMateri:
                'Menyatukan penguasaan gramatika Bahasa Arab tingkat lanjut dengan motivasi melanjutkan pendidikan tinggi.',
            },
            hadisUtama: {
              perawi: 'HR. Ibnu Majah (No. 224)',
              kitab: 'Sunan Ibnu Majah',
              derajat: 'Shahih',
              arab: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
              latin: 'Ṭalabul-‘ilmi farīḍatun ‘alā kulli muslim.',
              terjemah: 'Menuntut ilmu adalah kewajiban atas setiap muslim.',
              hikmahPedagogis:
                'Memotivasi siswa MA kelas XII meraih beasiswa dan prestasi akademik di perguruan tinggi.',
            },
          },
        ],
      },
    ],
  },
];
