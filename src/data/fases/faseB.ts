import type { FaseKurikulum2026 } from '../../types/curriculum';

export const FASE_B_DATA: FaseKurikulum2026 = {
  fase: 'B',
  jenjang: 'SD/MI',
  kelasRentang: 'Kelas 3 – 4',
  labelLengkap: 'Fase B · SD/MI (Kelas III & IV)',
  rasional2026:
    'Pada Fase B Kurikulum Merdeka 2026, peserta didik mendalami bacaan Al-Qur’an dan hadis tentang keragaman, ilmu pengetahuan, dan silaturahmi; mengenal Asmaul Husna serta iman kepada kitab dan rasul Allah; mempraktikkan akhlak amanah dan toleransi; melaksanakan puasa Ramadan, salat Jumat/sunah, dan tanggung jawab balig; serta meneladani kisah hijrah Nabi Muhammad saw. pada Semester 1 dan Semester 2.',
  capaianPembelajaran: [
    {
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiCP:
        'Peserta didik membaca dan memahami pesan pokok QS. Al-Hujurat ayat 13, QS. Al-‘Alaq ayat 1–5, QS. At-Tin, serta hadis tentang silaturahmi dan menuntut ilmu dengan hukum bacaan tajwid dasar.',
    },
    {
      elemen: 'Akidah',
      deskripsiCP:
        'Peserta didik memahami sifat-sifat Allah Swt., Asmaul Husna (Al-Malik, Al-Aziz, Al-Quddus, As-Salam, Al-Mu’min), serta iman kepada kitab-kitab dan rasul-rasul Allah Swt.',
    },
    {
      elemen: 'Akhlak',
      deskripsiCP:
        'Peserta didik membiasakan perilaku amanah, bakti kepada orang tua dan guru, menghargai keragaman suku dan budaya sebagai sunnatullah, serta menyebarkan salam.',
    },
    {
      elemen: 'Fikih',
      deskripsiCP:
        'Peserta didik memahami ketentuan puasa Ramadan, tanda-tanda balig beserta tanggung jawab ibadahnya, salat Jumat, salat Duha, dan salat Id.',
    },
    {
      elemen: 'Sejarah Peradaban Islam',
      deskripsiCP:
        'Peserta didik menceritakan kisah keteladanan Nabi Muhammad saw. sebelum kenabian hingga peristiwa hijrah membangun masyarakat Madinah.',
    },
  ],
  babList: [
    // SEMESTER 1 (GANJIL)
    {
      id: 'fase-b-bab-1',
      nomorBab: 1,
      judulBab: 'Indahnya Saling Menghargai dalam Keragaman (QS. Al-Hujurat: 13)',
      kelas: 'Kelas 4',
      semester: 'Ganjil',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Memahami QS. Al-Hujurat ayat 13 tentang penciptaan manusia yang beragam bangsa dan suku agar saling mengenal dan bertakwa.',
      atpList: [
        {
          kode: 'ATP-B.1.1',
          kelas: 'Kelas 4',
          semester: 'Ganjil',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Membaca QS. Al-Hujurat ayat 13 dengan tartil dan menjelaskan pesan pokok tentang keragaman sebagai sunnatullah.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kewargaan', 'Penalaran Kritis'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'b-1-m1',
          kode: 'MAT-B.1.1',
          judul: 'Tadabbur QS. Al-Hujurat: 13 dan Persaudaraan Sesama',
          ringkasan:
            'Mengenal hukum bacaan mad dan qalqalah sederhana dalam QS. Al-Hujurat: 13 sekaligus memaknai nilai lita‘arafu.',
          kataKunci: ['Keragaman', 'Lita’arafu', 'Takwa', 'Toleransi'],
          ayatUtama: {
            surah: 'QS. Al-Hujurat',
            ayat: '13',
            arab: 'يٰٓاَيُّهَا النَّاسُ اِنَّا خَلَقْنٰكُمْ مِّنْ ذَكَرٍ وَّاُنْثٰى وَجَعَلْنٰكُمْ شُعُوْبًا وَّقَبَاۤىِٕلَ لِتَعَارَفُوْا ۚ اِنَّ اَكْرَمَكُمْ عِنْدَ اللّٰهِ اَتْقٰىكُمْ',
            latin: 'Yā ayyuhan-nāsu innā khalaqnākum min żakariw wa unṡā wa ja‘alnākum syu‘ūbaw wa qabā’ila lita‘ārafū, inna akramakum ‘indallāhi atqākum.',
            terjemah:
              'Wahai manusia, sesungguhnya Kami telah menciptakan kamu dari seorang laki-laki dan seorang perempuan, kemudian Kami jadikan kamu berbangsa-bangsa dan bersuku-suku agar kamu saling mengenal. Sesungguhnya yang paling mulia di antara kamu di sisi Allah ialah orang yang paling bertakwa.',
            tafsirSingkat: 'Perbedaan suku dan budaya bukan alasan merendahkan orang lain, melainkan sarana saling mengenal dan berbuat baik.',
            keterkaitanMateri: 'Mendukung penguatan dimensi Kewargaan dan Kolaborasi peserta didik.',
          },
          hadisUtama: {
            perawi: 'HR. Ahmad (No. 23489)',
            kitab: 'Musnad Ahmad',
            derajat: 'Shahih',
            arab: 'لَا فَضْلَ لِعَرَبِيٍّ عَلَى عَجَمِيٍّ وَلَا لِعَجَمِيٍّ عَلَى عَرَبِيٍّ إِلَّا بِالتَّقْوَى',
            latin: 'Lā faḍla li‘arabiyyin ‘alā ‘ajamiyyin wa lā li‘ajamiyyin ‘alā ‘arabiyyin illā bit-taqwā.',
            terjemah: 'Tidak ada keutamaan bagi orang Arab atas non-Arab, dan tidak pula non-Arab atas orang Arab kecuali dengan ketakwaan.',
            hikmahPedagogis: 'Menanamkan anti-perundungan dan kesetaraan martabat manusia sejak SD.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-2',
      nomorBab: 2,
      judulBab: 'Teladan Mulia Lima Asmaul Husna (Al-Malik hingga Al-Mu’min)',
      kelas: 'Kelas 4',
      semester: 'Ganjil',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Memahami arti dan keteladanan Asmaul Husna Al-Malik, Al-Aziz, Al-Quddus, As-Salam, dan Al-Mu’min dalam menjaga ketertiban dan kedamaian.',
      atpList: [
        {
          kode: 'ATP-B.2.1',
          kelas: 'Kelas 4',
          semester: 'Ganjil',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menjelaskan arti lima Asmaul Husna dan mempraktikkan sikap menahan diri, menjaga kebersihan, dan menciptakan rasa aman bagi teman.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'b-2-m1',
          kode: 'MAT-B.2.1',
          judul: 'Meneladani Al-Malik, Al-Aziz, Al-Quddus, As-Salam, Al-Mu’min',
          ringkasan:
            'Menghubungkan sifat keagungan dan kedamaian Allah dengan kebiasaan menjaga kebersihan hati dan lisan di kelas.',
          kataKunci: ['Asmaul Husna', 'Al-Malik', 'As-Salam', 'Al-Mu’min'],
          ayatUtama: {
            surah: 'QS. Al-Hasyr',
            ayat: '23',
            arab: 'هُوَ اللّٰهُ الَّذِيْ لَآ اِلٰهَ اِلَّا هُوَ ۚ اَلْمَلِكُ الْقُدُّوْسُ السَّلٰمُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيْزُ',
            latin: 'Huwallāhul-lażī lā ilāha illā huw, al-malikul-quddūsus-salāmul-mu’minul-muhaiminul-‘azīz.',
            terjemah:
              'Dialah Allah tidak ada tuhan selain Dia. Maharaja, Yang Mahasuci, Yang Mahasejahtera, Yang Menjaga Keamanan, Pemelihara Keselamatan, Yang Mahaperkasa.',
            tafsirSingkat: 'Lima Asmaul Husna ini menegaskan kesempurnaan kekuasaan Allah yang membawa kesucian, keamanan, dan kedamaian.',
            keterkaitanMateri: 'Mengajak siswa menjadi pribadi yang menjaga rasa aman dan tidak mengganggu teman.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 10) dan Muslim (No. 40)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Iman',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
            latin: 'Al-muslimu man salimal-muslimūna min lisānihī wa yadih.',
            terjemah: 'Seorang Muslim sejati adalah orang yang kaum Muslimin lainnya selamat dari gangguan lisan dan tangannya.',
            hikmahPedagogis: 'Menguatkan implementasi As-Salam dan Al-Mu’min dalam pergaulan sekolah.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-3',
      nomorBab: 3,
      judulBab: 'Perilaku Amanah, Bakti kepada Orang Tua & Hormat Guru',
      kelas: 'Kelas 3',
      semester: 'Ganjil',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Membiasakan sikap dapat dipercaya (amanah) dalam tugas kelas maupun rumah serta memuliakan guru sebagai pembimbing ilmu.',
      atpList: [
        {
          kode: 'ATP-B.3.1',
          kelas: 'Kelas 3',
          semester: 'Ganjil',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Menerapkan perilaku amanah dan adab sopan santun kepada orang tua serta guru dalam interaksi belajar.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kolaborasi', 'Komunikasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'b-3-m1',
          kode: 'MAT-B.3.1',
          judul: 'Menjaga Amanah dan Memuliakan Guru',
          ringkasan:
            'Memahami makna amanah dalam menjaga barang titipan, tugas sekolah, dan janji, serta menghormati jasa guru.',
          kataKunci: ['Amanah', 'Hormat Guru', 'Bakti Orang Tua', 'Integritas'],
          ayatUtama: {
            surah: 'QS. An-Nisa’',
            ayat: '58',
            arab: 'اِنَّ اللّٰهَ يَأْمُرُكُمْ اَنْ تُؤَدُّوا الْاَمٰنٰتِ اِلٰٓى اَهْلِهَا',
            latin: 'Innallāha ya’murukum an tu’addul-amānāti ilā ahlihā.',
            terjemah: 'Sungguh, Allah menyuruhmu menyampaikan amanat kepada yang berhak menerimanya.',
            tafsirSingkat: 'Menunaikan amanah merupakan perintah langsung Allah yang menjaga kepercayaan dalam masyarakat.',
            keterkaitanMateri: 'Melatih tanggung jawab siswa menjalankan piket kelas dan tugas belajar.',
          },
          hadisUtama: {
            perawi: 'HR. Ahmad (No. 22755) & Al-Hakim',
            kitab: 'Musnad Ahmad',
            derajat: 'Hasan',
            arab: 'لَيْسَ مِنَّا مَنْ لَمْ يُجِلَّ كَبِيرَنَا وَيَرْحَمْ صَغِيرَنَا وَيَعْرِفْ لِعَالِمِنَا حَقَّهُ',
            latin: 'Laisa minnā man lam yujilla kabīranā wa yarḥam ṣagīranā wa ya‘rif li‘āliminā ḥaqqah.',
            terjemah:
              'Bukan termasuk golongan kami orang yang tidak menghormati yang lebih tua, tidak menyayangi yang lebih muda, dan tidak mengetahui hak orang yang berilmu (guru).',
            hikmahPedagogis: 'Menumbuhkan adab hormat kepada guru dan kasih sayang kepada adik kelas.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-4',
      nomorBab: 4,
      judulBab: 'Ketentuan Puasa Ramadan dan Hikmahnya',
      kelas: 'Kelas 3',
      semester: 'Ganjil',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami syarat wajib, syarat sah, rukun puasa Ramadan, hal-hal yang membatalkan puasa, serta sunah di bulan Ramadan.',
      atpList: [
        {
          kode: 'ATP-B.4.1',
          kelas: 'Kelas 3',
          semester: 'Ganjil',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Menjelaskan ketentuan ibadah puasa Ramadan (niat, rukun, dan pembatal) serta hikmahnya bagi kesehatan dan kesabaran.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kesehatan', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'b-4-m1',
          kode: 'MAT-B.4.1',
          judul: 'Rukun Puasa Ramadan dan Pelatihan Pengendalian Diri',
          ringkasan:
            'Mempelajari tata cara sahur, niat puasa, menahan lapar dan amarah, hingga menyegerakan berbuka.',
          kataKunci: ['Puasa Ramadan', 'Takwa', 'Sahur', 'Pengendalian Diri'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '183',
            arab: 'يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِيْنَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُوْنَ',
            latin: 'Yā ayyuhal-lażīna āmanū kutiba ‘alaikumuṣ-ṣiyāmu kamā kutiba ‘alal-lażīna min qablikum la‘allakum tattaqūn.',
            terjemah:
              'Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang sebelum kamu agar kamu bertakwa.',
            tafsirSingkat: 'Puasa adalah ibadah untuk melatih ketakwaan, kejujuran, dan kepedulian sosial.',
            keterkaitanMateri: 'Menyiapkan siswa menyambut dan mengamalkan ibadah Ramadan dengan penuh kegembiraan.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 1904) dan Muslim (No. 1151)',
            kitab: 'Sahih Al-Bukhari, Kitab As-Saum',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'الصِّيَامُ جُنَّةٌ فَإِذَا كَانَ يَوْمُ صَوْمِ أَحَدِكُمْ فَلَا يَرْفُثْ وَلَا يَصْخَبْ',
            latin: 'Aṣ-ṣiyāmu junnatun, fa iżā kāna yaumu ṣaumi aḥadikum falā yarfuṡ wa lā yaṣkhab.',
            terjemah:
              'Puasa adalah perisai. Apabila salah seorang dari kalian sedang berpuasa, janganlah berkata kotor dan jangan pula berteriak-teriak (marah).',
            hikmahPedagogis: 'Mengajarkan bahwa puasa bukan sekadar menahan lapar, melainkan juga melatih lisan dan emosi.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-5',
      nomorBab: 5,
      judulBab: 'Kisah Masa Muda Nabi Muhammad saw. & Turunnya Wahyu Pertama',
      kelas: 'Kelas 3',
      semester: 'Ganjil',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Menelusuri keteladanan Nabi Muhammad saw. sebagai pedagang jujur, pendamai suku Quraisy, hingga peristiwa Gua Hira.',
      atpList: [
        {
          kode: 'ATP-B.5.1',
          kelas: 'Kelas 3',
          semester: 'Ganjil',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menceritakan keteladanan Nabi Muhammad saw. saat peletakan Hajar Aswad dan menerima wahyu pertama QS. Al-‘Alaq: 1–5.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'b-5-m1',
          kode: 'MAT-B.5.1',
          judul: 'Kebijaksanaan Peletakan Hajar Aswad & Wahyu Pertama (Iqra’)',
          ringkasan:
            'Belajar cara Nabi menyelesaikan perselisihan suku Quraisy dengan adil dan menerima perintah pertama untuk membaca (Iqra’).',
          kataKunci: ['Gua Hira', 'Iqra’', 'Hajar Aswad', 'Sifat Siddiq'],
          ayatUtama: {
            surah: 'QS. Al-‘Alaq',
            ayat: '1 – 5',
            arab: 'اِقْرَأْ بِاسْمِ رَبِّكَ الَّذِيْ خَلَقَ ۝ خَلَقَ الْاِنْسَانَ مِنْ عَلَقٍ ۝ اِقْرَأْ وَرَبُّكَ الْاَكْرَمُ ۝ الَّذِيْ عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْاِنْسَانَ مَا لَمْ يَعْلَمْ ۝',
            latin: 'Iqra’ bismi rabbikal-lażī khalaq. Khalaqal-insāna min ‘alaq. Iqra’ wa rabbukal-akram. Allażī ‘allama bil-qalam. ‘Allamal-insāna mā lam ya‘lam.',
            terjemah:
              'Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan. Dia telah menciptakan manusia dari segumpal darah. Bacalah, dan Tuhanmulah Yang Mahamulia, yang mengajar (manusia) dengan pena. Dia mengajarkan manusia apa yang tidak diketahuinya.',
            tafsirSingkat: 'Wahyu pertama menegaskan tradisi literasi, membaca, dan menulis yang dilandasi iman kepada Allah.',
            keterkaitanMateri: 'Membangun kecintaan siswa terhadap budaya membaca dan menulis.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 3) dan Muslim (No. 160)',
            kitab: 'Sahih Al-Bukhari, Kitab Bad’il Wahyi',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'فَجَاءَهُ الْمَلَكُ فَقَالَ اقْرَأْ قَالَ مَا أَنَا بِقَارِئٍ',
            latin: 'Fajā’ahul-malaku faqāla: iqra’, qāla: mā ana biqāri’.',
            terjemah: 'Maka Malaikat (Jibril) mendatanginya seraya berkata: “Bacalah!” Beliau menjawab: “Aku tidak dapat membaca.”',
            hikmahPedagogis: 'Mengenalkan sejarah awal kenabian dan kesungguhan dalam belajar.',
          },
        },
      ],
    },

    // SEMESTER 2 (GENAP)
    {
      id: 'fase-b-bab-6',
      nomorBab: 6,
      judulBab: 'Mengaji & Memahami Pesan Surah At-Tin serta Hadis Silaturahmi',
      kelas: 'Kelas 4',
      semester: 'Genap',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Membaca Surah At-Tin sesuai kaidah tajwid (nun sukun/tanwin dasar) dan meneladani kesempurnaan penciptaan manusia yang beriman dan beramal saleh.',
      atpList: [
        {
          kode: 'ATP-B.6.1',
          kelas: 'Kelas 4',
          semester: 'Genap',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Membaca Surah At-Tin dengan tartil, mengidentifikasi pesan kemuliaan manusia, dan mempraktikkan silaturahmi dengan keluarga serta tetangga.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kolaborasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'b-6-m1',
          kode: 'MAT-B.6.1',
          judul: 'Kemuliaan Manusia Beriman dalam QS. At-Tin & Silaturahmi',
          ringkasan:
            'Memahami bahwa manusia diciptakan dalam bentuk sebaik-baiknya dan dijaga kemuliaannya melalui iman, amal saleh, dan silaturahmi.',
          kataKunci: ['Surah At-Tin', 'Amal Saleh', 'Silaturahmi', 'Tajwid'],
          ayatUtama: {
            surah: 'QS. At-Tin',
            ayat: '4 – 6',
            arab: 'لَقَدْ خَلَقْنَا الْاِنْسَانَ فِيْٓ اَحْسَنِ تَقْوِيْمٍ ۝ ثُمَّ رَدَدْنٰهُ اَسْفَلَ سٰفِلِيْنَ ۝ اِلَّا الَّذِيْنَ اٰمَنُوْا وَعَمِلُوا الصّٰلِحٰتِ فَلَهُمْ اَجْرٌ غَيْرُ مَمْنُوْنٍ ۝',
            latin: 'Laqad khalaqnal-insāna fī aḥsani taqwīm. Ṡumma radadnāhu asfala sāfilīn. Illal-lażīna āmanū wa ‘amiluṣ-ṣāliḥāti falahum ajrun gairu mamnūn.',
            terjemah:
              'Sungguh, Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya, kemudian Kami kembalikan dia ke tempat yang serendah-rendahnya, kecuali orang-orang yang beriman dan mengerjakan kebajikan; maka mereka akan mendapat pahala yang tidak ada putus-putusnya.',
            tafsirSingkat: 'Keindahan fisik dan akal manusia hanya bernilai mulia apabila disertai iman dan amal kebajikan.',
            keterkaitanMateri: 'Mendorong siswa menjaga kesehatan tubuh sekaligus memperbanyak amal baik.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 5986) dan Muslim (No. 2557)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Adab',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'مَنْ أَحَبَّ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ وَيُنْسَأَ لَهُ فِي أَثَرِهِ فَلْيَصِلْ رَحِمَهُ',
            latin: 'Man aḥabba an yubsaṭa lahū fī rizqihī wa yunsa’a lahū fī aṡarihī falyaṣil raḥimah.',
            terjemah:
              'Barangsiapa ingin diluaskan rezekinya dan dipanjangkan umurnya, hendaklah ia menyambung tali silaturahmi.',
            hikmahPedagogis: 'Membiasakan anak menyapa saudara, tetangga, dan menjaga kerukunan.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-7',
      nomorBab: 7,
      judulBab: 'Beriman kepada Kitab-Kitab dan Rasul-Rasul Allah Swt.',
      kelas: 'Kelas 4',
      semester: 'Genap',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Mengenal empat kitab suci Allah (Taurat, Zabur, Injil, Al-Qur’an) serta sifat-sifat wajib rasul (Siddiq, Amanah, Tablig, Fatanah).',
      atpList: [
        {
          kode: 'ATP-B.7.1',
          kelas: 'Kelas 4',
          semester: 'Genap',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menjelaskan makna iman kepada rasul Allah serta meneladani empat sifat mulia rasul (jujur, amanah, komunikatif, cerdas).',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Komunikasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'b-7-m1',
          kode: 'MAT-B.7.1',
          judul: 'Meneladani Sifat Siddiq, Amanah, Tablig, dan Fatanah Rasul',
          ringkasan:
            'Memahami fungsi rasul sebagai teladan umat manusia dan mempraktikkan kejujuran serta kecerdasan dalam belajar.',
          kataKunci: ['Iman kepada Rasul', 'Siddiq', 'Amanah', 'Fatanah'],
          ayatUtama: {
            surah: 'QS. Al-Ahzab',
            ayat: '21',
            arab: 'لَقَدْ كَانَ لَكُمْ فِيْ رَسُوْلِ اللّٰهِ اُسْوَةٌ حَسَنَةٌ لِّمَنْ كَانَ يَرْجُوا اللّٰهَ وَالْيَوْمَ الْاٰخِرَ',
            latin: 'Laqad kāna lakum fī rasūlillāhi uswatun ḥasanatul liman kāna yarjullāha wal-yaumal-ākhir.',
            terjemah:
              'Sungguh, telah ada pada (diri) Rasulullah itu suri teladan yang baik bagimu (yaitu) bagi orang yang mengharap (rahmat) Allah dan (kedatangan) hari Kiamat.',
            tafsirSingkat: 'Rasulullah saw. adalah model karakter sempurna dalam ucapan, ibadah, dan kepemimpinan.',
            keterkaitanMateri: 'Mengkonkretkan keimanan kepada rasul menjadi teladan karakter harian siswa.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 1995)',
            kitab: 'Sahih Muslim, Kitab Al-Imarah',
            derajat: 'Shahih',
            arab: 'مَا مِنْ نَبِيٍّ بَعَثَهُ اللَّهُ فِي أُمَّةٍ قَبْلِي إِلَّا كَانَ لَهُ مِنْ أُمَّتِهِ حَوَارِيُّونَ وَأَصْحَابٌ يَأْخُذُونَ بِسُنَّتِهِ وَيَقْتَدُونَ بِأَمْرِهِ',
            latin: 'Mā min nabiyyin ba‘aṡahullāhu fī ummatin qablī illā kāna lahū min ummatihī ḥawāriyyūna wa aṣḥābun ya’khużūna bisunnatihī wa yaqtadūna bi’amrih.',
            terjemah:
              'Tidak ada seorang nabi pun yang diutus Allah pada suatu umat sebelumku melainkan memiliki para pembela dan sahabat yang berpegang teguh pada sunahnya dan mengikuti perintahnya.',
            hikmahPedagogis: 'Menumbuhkan semangat meneladani sunah Rasulullah bersama teman sebaya.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-8',
      nomorBab: 8,
      judulBab: 'Salam Penebar Damai & Sikap Menghormati Perbedaan',
      kelas: 'Kelas 4',
      semester: 'Genap',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Membiasakan budaya salam, senang menolong sesama, dan menghormati keyakinan maupun kebiasaan teman yang berbeda.',
      atpList: [
        {
          kode: 'ATP-B.8.1',
          kelas: 'Kelas 4',
          semester: 'Genap',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Menunjukkan budaya menyapa dengan salam, bersikap ramah, dan berteman tanpa membeda-bedakan latar belakang.',
          dimensiProfilLulusan: ['Kewargaan', 'Komunikasi', 'Kolaborasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'b-8-m1',
          kode: 'MAT-B.8.1',
          judul: 'Budaya Salam dan Senyum sebagai Wujud Akhlak Damai',
          ringkasan:
            'Memahami makna ucapan Assalamu’alaikum sebagai doa keselamatan dan menjadikannya kebiasaan di lingkungan sekolah.',
          kataKunci: ['Budaya Salam', 'Toleransi', 'Kerukunan', 'Ramah'],
          ayatUtama: {
            surah: 'QS. An-Nisa’',
            ayat: '86',
            arab: 'وَاِذَا حُيِّيْتُمْ بِتَحِيَّةٍ فَحَيُّوْا بِاَحْسَنَ مِنْهَآ اَوْ رُدُّوْهَا',
            latin: 'Wa iżā ḥuyyītum bitaḥiyyatin faḥayyū bi’aḥsana minhā au ruddūhā.',
            terjemah:
              'Dan apabila kamu dihormati dengan suatu (salam) penghormatan, maka balaslah penghormatan itu dengan yang lebih baik, atau balaslah (dengan yang serupa).',
            tafsirSingkat: 'Islam mengajarkan keramahan dan etika membalas penghormatan dengan lebih santun.',
            keterkaitanMateri: 'Membangun iklim kelas yang hangat, aman, dan saling menghormati.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 54)',
            kitab: 'Sahih Muslim, Kitab Al-Iman',
            derajat: 'Shahih',
            arab: 'أَفْشُوا السَّلَامَ بَيْنَكُمْ',
            latin: 'Afsyus-salāma bainakum.',
            terjemah: 'Sebarkanlah salam (kedamaian) di antara kalian.',
            hikmahPedagogis: 'Membiasakan salam sebagai pembuka komunikasi positif antar siswa.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-9',
      nomorBab: 9,
      judulBab: 'Menyambut Usia Balig, Mandi Wajib, dan Salat Jumat/Sunah',
      kelas: 'Kelas 4',
      semester: 'Genap',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami tanda-tanda balig secara biologis dan fikih, kewajiban mukalaf, tata cara mandi wajib, serta ketentuan salat Jumat dan Duha.',
      atpList: [
        {
          kode: 'ATP-B.9.1',
          kelas: 'Kelas 4',
          semester: 'Genap',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Mengidentifikasi tanda-tanda usia balig menurut fikih dan biologi serta menjelaskan ketentuan salat Jumat dan salat Duha.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kesehatan', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'b-9-m1',
          kode: 'MAT-B.9.1',
          judul: 'Tanda Balig, Mandi Wajib, dan Kewajiban Mukalaf',
          ringkasan:
            'Menguraikan tanda balig bagi laki-laki dan perempuan, tata cara mandi wajib setelah hadas besar, serta tanggung jawab salat.',
          kataKunci: ['Balig', 'Mukalaf', 'Mandi Wajib', 'Salat Jumat'],
          ayatUtama: {
            surah: 'QS. An-Nur',
            ayat: '59',
            arab: 'وَاِذَا بَلَغَ الْاَطْفَالُ مِنْكُمُ الْحُلُمَ فَلْيَسْتَأْذِنُوْا كَمَا اسْتَأْذَنَ الَّذِيْنَ مِنْ قَبْلِهِمْ',
            latin: 'Wa iżā balagal-aṭfālu minkumul-ḥuluma falyasta’żinū kamasta’żanal-lażīna min qablihim.',
            terjemah:
              'Dan apabila anak-anakmu telah sampai umur dewasa (balig), maka hendaklah mereka meminta izin seperti orang-orang yang sebelum mereka meminta izin.',
            tafsirSingkat: 'Fase balig menandai peralihan menuju kedewasaan adab dan tanggung jawab syariat.',
            keterkaitanMateri: 'Edukasi pubertas Islami yang santun, berkesadaran, dan melindungi kesehatan remaja awal.',
          },
          hadisUtama: {
            perawi: 'HR. Abu Dawud (No. 4403)',
            kitab: 'Sunan Abi Dawud, Kitab Al-Hudud',
            derajat: 'Shahih',
            arab: 'رُفِعَ الْقَلَمُ عَنْ ثَلَاثَةٍ عَنِ النَّائِمِ حَتَّى يَسْتَيْقِظَ وَعَنِ الصَّبِيِّ حَتَّى يَحْتَلِمَ وَعَنِ الْمَجْنُونِ حَتَّى يَعْقِلَ',
            latin: 'Rufi‘al-qalamu ‘an ṡalāṡatin: ‘anin-nā’imi ḥattā yastaiqiẓa, wa ‘aniṣ-ṣabiyyi ḥattā yaḥtalima, wa ‘anil-majnūni ḥattā ya‘qil.',
            terjemah:
              'Pena catatan amal diangkat dari tiga golongan: orang tidur hingga bangun, anak kecil hingga balig (bermimpi basah), dan orang gila hingga berakal.',
            hikmahPedagogis: 'Membantu siswa memahami kapan kewajiban taklif dimulai agar tumbuh kesadaran ibadah.',
          },
        },
      ],
    },
    {
      id: 'fase-b-bab-10',
      nomorBab: 10,
      judulBab: 'Kisah Hijrah Nabi Muhammad saw. & Persaudaraan di Madinah',
      kelas: 'Kelas 4',
      semester: 'Genap',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Memahami sebab dan strategi hijrah Nabi ke Madinah serta bagaimana beliau membangun persaudaraan Muhajirin-Anshar dan Masjid Nabawi.',
      atpList: [
        {
          kode: 'ATP-B.10.1',
          kelas: 'Kelas 4',
          semester: 'Genap',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menceritakan kisah hijrah Nabi Muhammad saw. ke Madinah dan meneladani semangat persaudaraan kaum Muhajirin dan Anshar.',
          dimensiProfilLulusan: ['Kolaborasi', 'Kewargaan', 'Keimanan dan Ketakwaan terhadap Tuhan YME'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'b-10-m1',
          kode: 'MAT-B.10.1',
          judul: 'Persaudaraan Muhajirin – Anshar dan Membangun Masyarakat Madinah',
          ringkasan:
            'Mempelajari ketulusan kaum Anshar menyambut kaum Muhajirin dan peran masjid sebagai pusat persatuan umat.',
          kataKunci: ['Hijrah Madinah', 'Muhajirin', 'Anshar', 'Persaudaraan'],
          ayatUtama: {
            surah: 'QS. Al-Anfal',
            ayat: '72',
            arab: 'اِنَّ الَّذِيْنَ اٰمَنُوْا وَهَاجَرُوْا وَجَاهَدُوْا بِاَمْوَالِهِمْ وَاَنْفُسِهِمْ فِيْ سَبِيْلِ اللّٰهِ وَالَّذِيْنَ اٰوَوْا وَّنَصَرُوْٓا اُولٰۤىِٕكَ بَعْضُهُمْ اَوْلِيَآءُ بَعْضٍ',
            latin: 'Innal-lażīna āmanū wa hājarū wa jāhadū bi’amwālihim wa anfusihim fī sabīlillāhi wallażīna āwaw wa naṣarū ulā’ika ba‘ḍuhum auliyā’u ba‘ḍ.',
            terjemah:
              'Sesungguhnya orang-orang yang beriman dan berhijrah serta berjihad dengan harta dan jiwanya pada jalan Allah dan orang-orang yang memberikan tempat kediaman dan memberi pertolongan (kepada Muhajirin), mereka itu satu sama lain saling melindungi.',
            tafsirSingkat: 'Kebersamaan Muhajirin dan Anshar membuktikan kekuatan ukhuwah yang saling menolong di kala sulit.',
            keterkaitanMateri: 'Mendorong siswa menyambut teman baru dengan ramah dan suka menolong.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 13) dan Muslim (No. 45)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Iman',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
            latin: 'Lā yu’minu aḥadukum ḥattā yuḥibba li’akhīhi mā yuḥibbu linafsih.',
            terjemah: 'Tidak sempurna iman salah seorang di antara kalian hingga ia mencintai kebaikan untuk saudaranya sebagaimana ia mencintainya untuk dirinya sendiri.',
            hikmahPedagogis: 'Menjadi ruh dari kisah persaudaraan Anshar dan Muhajirin bagi siswa.',
          },
        },
      ],
    },
  ],
};
