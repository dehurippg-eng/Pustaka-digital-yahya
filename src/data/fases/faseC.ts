import type { FaseKurikulum2026 } from '../../types/curriculum';

export const FASE_C_DATA: FaseKurikulum2026 = {
  fase: 'C',
  jenjang: 'SD/MI',
  kelasRentang: 'Kelas 5 – 6',
  labelLengkap: 'Fase C · SD/MI (Kelas V & VI)',
  rasional2026:
    'Pada Fase C Kurikulum Merdeka 2026, peserta didik mengkaji QS. Al-Ma’un, QS. Ad-Duha, dan QS. Al-A’la dengan tajwid yang baik; memperdalam Asmaul Husna, iman kepada hari akhir, dan qada-qadar; menumbuhkan kepedulian sosial terhadap anak yatim dan duafa serta sikap musyawarah; mempraktikkan zakat, infak, sedekah, kurban, serta hukum halal-haram; dan meneladani Fathu Makkah hingga kepemimpinan Khulafaurasyidin pada Semester 1 dan Semester 2.',
  capaianPembelajaran: [
    {
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiCP:
        'Peserta didik memahami makna QS. Al-Ma’un, QS. Ad-Duha, QS. Al-A’la, serta hadis tentang keutamaan memberi dan menyantuni anak yatim dengan bacaan bertajwid.',
    },
    {
      elemen: 'Akidah',
      deskripsiCP:
        'Peserta didik memahami Asmaul Husna (Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit, Al-Ba’is, Al-Ghaffar, Al-Afuw), iman kepada hari akhir, serta qada dan qadar.',
    },
    {
      elemen: 'Akhlak',
      deskripsiCP:
        'Peserta didik membiasakan perilaku dermawan, pemaaf, menjaga lingkungan bumi sebagai khalifah, dan menghormati pendapat orang lain dalam musyawarah.',
    },
    {
      elemen: 'Fikih',
      deskripsiCP:
        'Peserta didik memahami ketentuan zakat fitrah, infak, sedekah, kurban, ibadah haji sederhana, serta kriteria makanan dan minuman halal-haram.',
    },
    {
      elemen: 'Sejarah Peradaban Islam',
      deskripsiCP:
        'Peserta didik menganalisis kisah keteladanan Nabi Muhammad saw. pada peristiwa Fathu Makkah, Haji Wada, dan kepemimpinan Khulafaurasyidin (Abu Bakar, Umar, Usman, Ali).',
    },
  ],
  babList: [
    // SEMESTER 1 (GANJIL)
    {
      id: 'fase-c-bab-1',
      nomorBab: 1,
      judulBab: 'Menyayangi Anak Yatim & Peduli Sesama (QS. Al-Ma’un)',
      kelas: 'Kelas 5',
      semester: 'Ganjil',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Mengkaji QS. Al-Ma’un ayat 1–7 tentang bahaya mendustakan agama melalui pengabaian anak yatim dan kaum miskin serta riya dalam salat.',
      atpList: [
        {
          kode: 'ATP-C.1.1',
          kelas: 'Kelas 5',
          semester: 'Ganjil',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Menganalisis isi kandungan QS. Al-Ma’un ayat 1–7 serta menghubungkan ibadah ritual (salat) dengan kepedulian sosial nyata.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kolaborasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'c-1-m1',
          kode: 'MAT-C.1.1',
          judul: 'Keseimbangan Kesalehan Ritual dan Sosial dalam QS. Al-Ma’un',
          ringkasan:
            'Membedah ciri-ciri pendusta agama dalam QS. Al-Ma’un dan merancang gerakan berbagi di sekolah.',
          kataKunci: ['Al-Ma’un', 'Anak Yatim', 'Kesalehan Sosial', 'Ikhlas'],
          ayatUtama: {
            surah: 'QS. Al-Ma’un',
            ayat: '1 – 3',
            arab: 'اَرَءَيْتَ الَّذِيْ يُكَذِّبُ بِالدِّيْنِ ۝ فَذٰلِكَ الَّذِيْ يَدُعُّ الْيَتِيْمَ ۝ وَلَا يَحُضُّ عَلٰى طَعَامِ الْمِسْكِيْنِ ۝',
            latin: 'Ara’aital-lażī yukażżibu bid-dīn. Fażālikal-lażī yadu‘‘ul-yatīm. Wa lā yaḥuḍḍu ‘alā ṭa‘āmil-miskīn.',
            terjemah:
              'Tahukah kamu (orang) yang mendustakan agama? Maka itulah orang yang menghardik anak yatim, dan tidak mendorong memberi makan orang miskin.',
            tafsirSingkat: 'Keimanan sejati harus melahirkan empati aktif bagi anak yatim dan kaum duafa.',
            keterkaitanMateri: 'Menjadi inti proyek pembelajaran mendalam bertema aksi filantropi siswa.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 5304)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Adab',
            derajat: 'Shahih',
            arab: 'أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا وَأَشَارَ بِالسَّبَّابَةِ وَالْوُسْطَى',
            latin: 'Ana wa kāfilul-yatīmi fil-jannati hākażā wa asyāra bis-sabbābati wal-wusṭā.',
            terjemah:
              'Aku dan orang yang menanggung anak yatim berada di surga seperti ini (beliau mengisyaratkan jari telunjuk dan jari tengah).',
            hikmahPedagogis: 'Menguatkan motivasi empati peserta didik terhadap teman atau anak yatim.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-2',
      nomorBab: 2,
      judulBab: 'Mengenal Kekuasaan Allah melalui Asmaul Husna (Al-Qawiyyu – Al-Ba’is)',
      kelas: 'Kelas 5',
      semester: 'Ganjil',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Memahami sifat Allah Yang Mahakuat (Al-Qawiyyu), Mandiri (Al-Qayyum), Menghidupkan (Al-Muhyi), Mematikan (Al-Mumit), dan Membangkitkan (Al-Ba’is).',
      atpList: [
        {
          kode: 'ATP-C.2.1',
          kelas: 'Kelas 5',
          semester: 'Ganjil',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menjelaskan makna lima Asmaul Husna tersebut serta mengaitkannya dengan sikap mandiri, pantang menyerah, dan optimis.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Penalaran Kritis'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'c-2-m1',
          kode: 'MAT-C.2.1',
          judul: 'Mandiri dan Tangguh dengan Meneladani Al-Qawiyyu & Al-Qayyum',
          ringkasan:
            'Menyadari bahwa kekuatan dan kemandirian sejati bersumber dari Allah sehingga siswa tidak mudah putus asa dan tidak bergantung berlebihan kepada orang lain.',
          kataKunci: ['Al-Qawiyyu', 'Al-Qayyum', 'Al-Muhyi', 'Kemandirian'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '255',
            arab: 'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ',
            latin: 'Allāhu lā ilāha illā huw, al-ḥayyul-qayyūm.',
            terjemah: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus menerus mengurus (makhluk-Nya).',
            tafsirSingkat: 'Al-Qayyum bermakna Allah Maha Berdiri Sendiri dan mengurus seluruh alam tanpa lelah.',
            keterkaitanMateri: 'Melatih kemandirian belajar dan keteguhan mental siswa kelas V.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 2664)',
            kitab: 'Sahih Muslim, Kitab Al-Qadar',
            derajat: 'Shahih',
            arab: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ وَفِي كُلٍّ خَيْرٌ',
            latin: 'Al-mu’minul-qawiyyu khairun wa aḥabbu ilallāhi minal-mu’miniḍ-ḍa‘īfi wa fī kullin khair.',
            terjemah:
              'Mukmin yang kuat lebih baik dan lebih dicintai oleh Allah daripada mukmin yang lemah, namun pada keduanya ada kebaikan.',
            hikmahPedagogis: 'Mendorong siswa kuat secara iman, fisik, kesehatan, dan kemauan belajar.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-3',
      nomorBab: 3,
      judulBab: 'Indahnya Hidup Bermusyawarah & Menghargai Pendapat',
      kelas: 'Kelas 5',
      semester: 'Ganjil',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Mempraktikkan adab bermusyawarah dalam kelompok belajar, menghormati pendapat teman, dan melaksanakan hasil keputusan bersama dengan lapang dada.',
      atpList: [
        {
          kode: 'ATP-C.3.1',
          kelas: 'Kelas 5',
          semester: 'Ganjil',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Menerapkan prinsip musyawarah yang santun dan menerima perbedaan pendapat secara bijak di kelas.',
          dimensiProfilLulusan: ['Kewargaan', 'Kolaborasi', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'c-3-m1',
          kode: 'MAT-C.3.1',
          judul: 'Etika Bermusyawarah (Syura) dan Kebersamaan Kelas',
          ringkasan:
            'Belajar menyampaikan gagasan secara sopan, tidak memaksakan kehendak, dan menghormati suara bersama.',
          kataKunci: ['Musyawarah', 'Syura', 'Lapang Dada', 'Kewargaan'],
          ayatUtama: {
            surah: 'QS. Ali ‘Imran',
            ayat: '159',
            arab: 'فَبِمَا رَحْمَةٍ مِّنَ اللّٰهِ لِنْتَ لَهُمْ ۚ وَلَوْ كُنْتَ فَظًّا غَلِيْظَ الْقَلْبِ لَانْفَضُّوْا مِنْ حَوْلِكَ ۖ فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِى الْاَمْرِ',
            latin: 'Fabimā raḥmatin minallāhi linta lahum, walau kunta faẓẓan galīẓal-qalbi lanfaḍḍū min ḥaulik, fa‘fu ‘anhum wastagfir lahum wa syāwirhum fil-amr.',
            terjemah:
              'Maka berkat rahmat Allah engkau (Muhammad) berlaku lemah lembut terhadap mereka. Sekiranya engkau bersikap keras dan berhati kasar, tentulah mereka menjauhkan diri dari sekitarmu. Karena itu maafkanlah mereka dan mohonkanlah ampunan untuk mereka, dan bermusyawarahlah dengan mereka dalam urusan itu.',
            tafsirSingkat: 'Musyawarah yang berhasil selalu diawali sikap lemah lembut dan lapang dada.',
            keterkaitanMateri: 'Selaras dengan nilai demokrasi dan kerja kelompok di sekolah dasar.',
          },
          hadisUtama: {
            perawi: 'HR. At-Tirmidzi (No. 2822) & Al-Hakim',
            kitab: 'Jami’ At-Tirmidzi',
            derajat: 'Hasan',
            arab: 'مَا رَأَيْتُ أَحَدًا أَكْثَرَ مَشُورَةً لِأَصْحَابِهِ مِنْ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
            latin: 'Mā ra’aitu aḥadan akṡara masyūratan li’aṣḥābihī min rasūlillāhi ṣallallāhu ‘alaihi wa sallam.',
            terjemah: 'Aku tidak pernah melihat seseorang yang paling banyak bermusyawarah dengan para sahabatnya melebihi Rasulullah saw. (Abu Hurairah r.a.).',
            hikmahPedagogis: 'Menunjukkan keteladanan Nabi yang menghargai gagasan para sahabat.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-4',
      nomorBab: 4,
      judulBab: 'Berbagi Melalui Zakat Fitrah, Infak, Sedekah, dan Kurban',
      kelas: 'Kelas 5',
      semester: 'Ganjil',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami ketentuan zakat fitrah (nisab, takaran, mustahik 8 asnaf), perbedaan infak-sedekah, serta hikmah kurban dan haji.',
      atpList: [
        {
          kode: 'ATP-C.4.1',
          kelas: 'Kelas 5',
          semester: 'Ganjil',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Membedakan ketentuan zakat fitrah, infak, dan sedekah serta mensimulasikan penyaluran zakat kepada mustahik.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kolaborasi', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'c-4-m1',
          kode: 'MAT-C.4.1',
          judul: 'Zakat Fitrah, Delapan Mustahik, dan Kemuliaan Sedekah',
          ringkasan:
            'Mempelajari ukuran zakat fitrah (2,5 kg / 3,5 liter beras), waktu wajib, serta kelompok penerima zakat.',
          kataKunci: ['Zakat Fitrah', 'Infak', 'Sedekah', 'Mustahik'],
          ayatUtama: {
            surah: 'QS. At-Taubah',
            ayat: '60',
            arab: 'اِنَّمَا الصَّدَقٰتُ لِلْفُقَرَاۤءِ وَالْمَسٰكِيْنِ وَالْعٰمِلِيْنَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوْبُهُمْ وَفِى الرِّقَابِ وَالْغٰرِمِيْنَ وَفِيْ سَبِيْلِ اللّٰهِ وَابْنِ السَّبِيْلِ',
            latin: 'Innamaṣ-ṣadaqātu lil-fuqarā’i wal-masākīni wal-‘āmilīna ‘alaihā wal-mu’allafati qulūbuhum wa fir-riqābi wal-gārimīna wa fī sabīlillāhi wabnis-sabīl.',
            terjemah:
              'Sesungguhnya zakat itu hanyalah untuk orang-orang fakir, orang miskin, amil zakat, yang dilunakkan hatinya (mualaf), untuk (memerdekakan) hamba sahaya, untuk (membebaskan) orang yang berutang, untuk jalan Allah, dan untuk orang yang sedang dalam perjalanan.',
            tafsirSingkat: 'Zakat memiliki sasaran delapan golongan yang jelas agar keadilan sosial terwujud.',
            keterkaitanMateri: 'Membekali siswa pengetahuan fikih sosial yang aplikatif menjelang Idulfitri.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 1503) dan Muslim (No. 984)',
            kitab: 'Sahih Al-Bukhari, Kitab Az-Zakah',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'فَرَضَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ زَكَاةَ الْفِطْرِ طُهْرَةً لِلصَّائِمِ مِنَ اللَّغْوِ وَالرَّفَثِ وَطُعْمَةً لِلْمَسَاكِينِ',
            latin: 'Faraḍa rasūlullāhi ṣallallāhu ‘alaihi wa sallama zakātal-fiṭri ṭuhratan liṣ-ṣā’imi minal-lagwi war-rafaṡi wa ṭu‘matan lil-masākīn.',
            terjemah:
              'Rasulullah saw. mewajibkan zakat fitrah sebagai penyuci bagi orang yang berpuasa dari perbuatan sia-sia dan kata-kata kotor, serta sebagai makanan bagi orang-orang miskin.',
            hikmahPedagogis: 'Menjelaskan fungsi ganda zakat fitrah: penyucian jiwa dan jaminan pangan fakir miskin.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-5',
      nomorBab: 5,
      judulBab: 'Peristiwa Fathu Makkah dan Haji Wada Nabi Muhammad saw.',
      kelas: 'Kelas 5',
      semester: 'Ganjil',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Meneladani sikap pemaaf Rasulullah saw. tanpa balas dendam saat Fathu Makkah serta pesan persatuan kemanusiaan pada Haji Wada.',
      atpList: [
        {
          kode: 'ATP-C.5.1',
          kelas: 'Kelas 5',
          semester: 'Ganjil',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menganalisis keteladanan sikap pemaaf dan cinta damai Nabi Muhammad saw. pada peristiwa Fathu Makkah dan Haji Wada.',
          dimensiProfilLulusan: ['Kewargaan', 'Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'c-5-m1',
          kode: 'MAT-C.5.1',
          judul: 'Pembebasan Kota Makkah Tanpa Pertumpahan Darah & Jiwa Pemaaf',
          ringkasan:
            'Menggali nilai amnesti umum Rasulullah kepada penduduk Quraisy dan pesan kesetaraan manusia dalam khutbah Haji Wada.',
          kataKunci: ['Fathu Makkah', 'Haji Wada', 'Pemaaf', 'Perdamaian'],
          ayatUtama: {
            surah: 'QS. An-Nasr',
            ayat: '1 – 3',
            arab: 'اِذَا جَاۤءَ نَصْرُ اللّٰهِ وَالْفَتْحُ ۝ وَرَاَيْتَ النَّاسَ يَدْخُلُوْنَ فِيْ دِيْنِ اللّٰهِ اَفْوَاجًا ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ',
            latin: 'Iżā jā’a naṣrullāhi wal-fatḥ. Wa ra’aitan-nāsa yadkhulūna fī dīnillāhi afwājā. Fasabbiḥ biḥamdi rabbika wastagfirh.',
            terjemah:
              'Apabila telah datang pertolongan Allah dan kemenangan, dan engkau melihat manusia berbondong-bondong masuk agama Allah, maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya.',
            tafsirSingkat: 'Kemenangan sejati disambut dengan tasbih, syukur, dan kerendahan hati, bukan kesombongan.',
            keterkaitanMateri: 'Mengajarkan siswa agar tetap rendah hati ketika meraih prestasi.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 2588)',
            kitab: 'Sahih Muslim, Kitab Al-Birr was-Silah',
            derajat: 'Shahih',
            arab: 'وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا',
            latin: 'Wa mā zādallāhu ‘abdan bi‘afwin illā ‘izzā.',
            terjemah: 'Tidaklah Allah menambah kemuliaan pada seorang hamba yang pemaaf melainkan semakin mulia.',
            hikmahPedagogis: 'Menghubungkan sikap memaafkan Nabi saat Fathu Makkah dengan penyelesaian konflik antar teman.',
          },
        },
      ],
    },

    // SEMESTER 2 (GENAP)
    {
      id: 'fase-c-bab-6',
      nomorBab: 6,
      judulBab: 'Hidup Optimis dan Mensyukuri Nikmat (QS. Ad-Duha & Al-A’la)',
      kelas: 'Kelas 6',
      semester: 'Genap',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Membaca dan menelaah pesan ketenangan jiwa dalam QS. Ad-Duha serta etika menyantuni yatim dan peminta-minta.',
      atpList: [
        {
          kode: 'ATP-C.6.1',
          kelas: 'Kelas 6',
          semester: 'Genap',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Membaca QS. Ad-Duha dengan tartil dan menjelaskan pesan optimisme, kasih sayang terhadap anak yatim, serta syukur nikmat.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Penalaran Kritis'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'c-6-m1',
          kode: 'MAT-C.6.1',
          judul: 'Pesan Optimisme dan Kepedulian Sosial dalam QS. Ad-Duha',
          ringkasan:
            'Memahami bahwa Allah tidak pernah meninggalkan hamba-Nya yang beriman serta perintah berbuat baik kepada yatim dan duafa.',
          kataKunci: ['QS. Ad-Duha', 'Optimisme', 'Syukur Nikmat', 'Anti-Putus Asa'],
          ayatUtama: {
            surah: 'QS. Ad-Duha',
            ayat: '9 – 11',
            arab: 'فَاَمَّا الْيَتِيْمَ فَلَا تَقْهَرْ ۝ وَاَمَّا السَّاۤىِٕلَ فَلَا تَنْهَرْ ۝ وَاَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ ۝',
            latin: 'Fa ammal-yatīma falā taqhar. Wa ammas-sā’ila falā tanhar. Wa ammā bini‘mati rabbika faḥaddiṡ.',
            terjemah:
              'Maka terhadap anak yatim janganlah engkau berlaku sewenang-wenang, dan terhadap orang yang meminta-minta janganlah engkau menghardiknya, dan terhadap nikmat Tuhanmu hendaklah engkau nyatakan (dengan bersyukur).',
            tafsirSingkat: 'Rasa syukur atas nikmat Allah diwujudkan dengan kelembutan kepada yang lemah dan berbagi kebaikan.',
            keterkaitanMateri: 'Membangun kepekaan sosial dan ketangguhan mental siswa kelas VI.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 1429) dan Muslim (No. 1033)',
            kitab: 'Sahih Al-Bukhari, Kitab Az-Zakah',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى',
            latin: 'Al-yadul-‘ulyā khairun minal-yadis-suflā.',
            terjemah: 'Tangan yang di atas (pemberi) lebih baik daripada tangan yang di bawah (peminta).',
            hikmahPedagogis: 'Menanamkan semangat berbagi dan etos kemandirian pada siswa.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-7',
      nomorBab: 7,
      judulBab: 'Beriman kepada Hari Akhir serta Qada dan Qadar',
      kelas: 'Kelas 6',
      semester: 'Genap',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Memahami hakikat iman kepada hari kiamat dan takdir Allah (qada-qadar) untuk menumbuhkan etos ikhtiar, doa, dan tawakal.',
      atpList: [
        {
          kode: 'ATP-C.7.1',
          kelas: 'Kelas 6',
          semester: 'Genap',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Membedakan takdir muallaq dan mubram serta mempraktikkan keseimbangan antara berusaha sungguh-sungguh (ikhtiar), berdoa, dan bertawakal.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'c-7-m1',
          kode: 'MAT-C.7.1',
          judul: 'Ikhtiar, Doa, dan Tawakal dalam Memaknai Qada dan Qadar',
          ringkasan:
            'Memahami bahwa beriman pada takdir bukan pasrah tanpa usaha, melainkan bekerja keras terlebih dahulu baru berserah diri kepada Allah.',
          kataKunci: ['Qada dan Qadar', 'Ikhtiar', 'Tawakal', 'Hari Akhir'],
          ayatUtama: {
            surah: 'QS. Ar-Ra’d',
            ayat: '11',
            arab: 'اِنَّ اللّٰهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتّٰى يُغَيِّرُوْا مَا بِاَنْفُسِهِمْ',
            latin: 'Innallāha lā yugayyiru mā biqaumin ḥattā yugayyirū mā bi’anfusihim.',
            terjemah:
              'Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan diri mereka sendiri.',
            tafsirSingkat: 'Perubahan nasib dan prestasi belajar menuntut kesungguhan ikhtiar manusia.',
            keterkaitanMateri: 'Memotivasi siswa kelas VI mempersiapkan ujian dan masa depan dengan kerja keras.',
          },
          hadisUtama: {
            perawi: 'HR. At-Tirmidzi (No. 2517)',
            kitab: 'Jami’ At-Tirmidzi, Kitab Shifatil Qiyamah',
            derajat: 'Hasan Shahih',
            arab: 'اعْقِلْهَا وَتَوَكَّلْ',
            latin: 'I‘qilhā wa tawakkal.',
            terjemah: 'Ikatlah (untamu terlebih dahulu sebagai ikhtiar), kemudian bertawakallah (kepada Allah).',
            hikmahPedagogis: 'Mengajarkan prinsip ikhtiar sebelum tawakal dengan perumpamaan yang sangat mudah diingat.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-8',
      nomorBab: 8,
      judulBab: 'Akhlak Pemaaf, Hidup Sederhana, dan Peduli Lingkungan',
      kelas: 'Kelas 6',
      semester: 'Genap',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Membiasakan sikap rendah hati, tidak boros, mudah memaafkan kesalahan teman, serta menjaga kelestarian alam sebagai khalifah di bumi.',
      atpList: [
        {
          kode: 'ATP-C.8.1',
          kelas: 'Kelas 6',
          semester: 'Genap',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Menunjukkan sikap pemaaf, hemat energi/air, dan peduli menjaga kebersihan lingkungan sebagai bagian dari akhlak Islam.',
          dimensiProfilLulusan: ['Kesehatan', 'Kewargaan', 'Kolaborasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'c-8-m1',
          kode: 'MAT-C.8.1',
          judul: 'Menjadi Khalifah Penjaga Bumi dan Pribadi Pemaaf',
          ringkasan:
            'Menerapkan gaya hidup tidak berlebihan (anti-israf) dan menjaga lingkungan sekolah tetap hijau dan bersih.',
          kataKunci: ['Peduli Lingkungan', 'Hemat', 'Pemaaf', 'Khalifah'],
          ayatUtama: {
            surah: 'QS. Al-A’raf',
            ayat: '31',
            arab: 'وَكُلُوْا وَاشْرَبُوْا وَلَا تُسْرِفُوْاۚ اِنَّهٗ لَا يُحِبُّ الْمُسْرِفِيْنَ',
            latin: 'Wa kulū wasyrabū wa lā tusrifū, innahū lā yuḥibbul-musrifīn.',
            terjemah: 'Makan dan minumlah, tetapi jangan berlebihan. Sungguh, Allah tidak menyukai orang yang berlebih-lebihan.',
            tafsirSingkat: 'Islam melarang pemborosan makanan, air, dan energi karena merusak keseimbangan hidup.',
            keterkaitanMateri: 'Membangun kebiasaan tidak menyisakan makanan dan menghemat air wudu.',
          },
          hadisUtama: {
            perawi: 'HR. Ahmad (No. 7065) & Ibnu Majah (No. 425)',
            kitab: 'Sunan Ibnu Majah, Kitab At-Taharah',
            derajat: 'Hasan Shahih',
            arab: 'لَا تُسْرِفْ فِي الْمَاءِ وَلَوْ كُنْتَ عَلَى نَهَرٍ جَارٍ',
            latin: 'Lā tusrif fil-mā’i walau kunta ‘alā naharin jār.',
            terjemah: 'Janganlah engkau boros dalam menggunakan air (saat berwudu), meskipun engkau berada di sungai yang mengalir.',
            hikmahPedagogis: 'Menghubungkan adab ibadah dengan konservasi air bersih.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-9',
      nomorBab: 9,
      judulBab: 'Hukum Halal dan Haram dalam Konsumsi Sehari-hari',
      kelas: 'Kelas 6',
      semester: 'Genap',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami prinsip halal dan haram makanan, minuman, serta barang gunaan menurut syariat Islam dan kesehatan.',
      atpList: [
        {
          kode: 'ATP-C.9.1',
          kelas: 'Kelas 6',
          semester: 'Genap',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Menganalisis kriteria makanan dan minuman halal-thayyib serta mengevaluasi label halal pada produk jajanan di lingkungan sekolah.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kesehatan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'c-9-m1',
          kode: 'MAT-C.9.1',
          judul: 'Konsep Halalan Thayyiban dan Etika Memilih Konsumsi',
          ringkasan:
            'Membedakan halal secara zat, halal secara cara memperolehnya, dan thayyib (aman serta bergizi bagi tubuh).',
          kataKunci: ['Halalan Thayyiban', 'Label Halal', 'Gizi Sehat', 'Fikih Konsumsi'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '168',
            arab: 'يٰٓاَيُّهَا النَّاسُ كُلُوْا مِمَّا فِى الْاَرْضِ حَلٰلًا طَيِّبًا وَّلَا تَتَّبِعُوْا خُطُوٰتِ الشَّيْطٰنِ',
            latin: 'Yā ayyuhan-nāsu kulū mimmā fil-arḍi ḥalālan ṭayyiban wa lā tattabi‘ū khuṭuwātisy-syaiṭān.',
            terjemah:
              'Wahai manusia! Makanlah dari (makanan) yang halal dan baik yang terdapat di bumi, dan janganlah kamu mengikuti langkah-langkah setan.',
            tafsirSingkat: 'Islam mensyaratkan halal secara hukum syariat sekaligus thayyib (higienis dan bergizi).',
            keterkaitanMateri: 'Melatih literasi kritis siswa memeriksa komposisi dan label halal jajanan.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 52) dan Muslim (No. 1599)',
            kitab: 'Sahih Al-Bukhari & Sahih Muslim',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ وَبَيْنَهُمَا مُشْتَبِهَاتٌ لَا يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ',
            latin: 'Innal-ḥalāla bayyinun wa innal-ḥarāma bayyinun wa bainahumā musytabihātun lā ya‘lamuhunna kaṡīrun minan-nās.',
            terjemah:
              'Sesungguhnya yang halal itu jelas dan yang haram itu jelas, dan di antara keduanya terdapat perkara-perkara syubhat (samar) yang tidak diketahui banyak manusia.',
            hikmahPedagogis: 'Membiasakan sikap kehati-hatian dalam memilih makanan, minuman, dan harta.',
          },
        },
      ],
    },
    {
      id: 'fase-c-bab-10',
      nomorBab: 10,
      judulBab: 'Kepemimpinan Khulafaurasyidin (Abu Bakar, Umar, Usman, Ali)',
      kelas: 'Kelas 6',
      semester: 'Genap',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Mengkaji keteladanan kepemimpinan yang amanah, tegas, dermawan, dan cerdas dari empat Khulafaurasyidin.',
      atpList: [
        {
          kode: 'ATP-C.10.1',
          kelas: 'Kelas 6',
          semester: 'Genap',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Membandingkan keteladanan kepemimpinan Abu Bakar As-Siddiq, Umar bin Khattab, Usman bin Affan, dan Ali bin Abi Thalib serta menerapkannya dalam kepemimpinan kelas.',
          dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis', 'Kolaborasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'c-10-m1',
          kode: 'MAT-C.10.1',
          judul: 'Jejak Amanah & Keadilan Empat Khulafaurasyidin',
          ringkasan:
            'Mengenal kontribusi besar kodifikasi Al-Qur’an, keadilan sosial, kedermawanan, dan kecintaan terhadap ilmu dari para khalifah.',
          kataKunci: ['Khulafaurasyidin', 'Kepemimpinan Amanah', 'Keadilan', 'Kedermawanan'],
          ayatUtama: {
            surah: 'QS. An-Nur',
            ayat: '55',
            arab: 'وَعَدَ اللّٰهُ الَّذِيْنَ اٰمَنُوْا مِنْكُمْ وَعَمِلُوا الصّٰلِحٰتِ لَيَسْتَخْلِفَنَّهُمْ فِى الْاَرْضِ',
            latin: 'Wa‘adallāhul-lażīna āmanū minkum wa ‘amiluṣ-ṣāliḥāti layastakhlifannahum fil-arḍ.',
            terjemah:
              'Allah telah menjanjikan kepada orang-orang di antara kamu yang beriman dan yang mengerjakan kebajikan, bahwa Dia sungguh akan menjadikan mereka berkuasa di bumi.',
            tafsirSingkat: 'Kepemimpinan yang diberkahi dibangun di atas iman dan amal saleh yang membawa kemakmuran.',
            keterkaitanMateri: 'Menumbuhkan jiwa kepemimpinan yang jujur dan melayani di sekolah.',
          },
          hadisUtama: {
            perawi: 'HR. Abu Dawud (No. 4607) & At-Tirmidzi (No. 2676)',
            kitab: 'Sunan Abi Dawud, Kitab As-Sunnah',
            derajat: 'Shahih',
            arab: 'فَعَلَيْكُمْ بِسُنَّتِي وَسُنَّةِ الْخُلَفَاءِ الرَّاشِدِينَ الْمَهْدِيِّينَ عَضُّوا عَلَيْهَا بِالنَّوَاجِذِ',
            latin: 'Fa‘alaikum bisunnatī wa sunnatil-khulafā’ir-rāsyidīnal-mahdiyyīna ‘aḍḍū ‘alaihā bin-nawājiż.',
            terjemah:
              'Maka berpegang teguhlah kalian pada sunahku dan sunah Khulafaurasyidin yang mendapat petunjuk; gigitlah ia erat-erat.',
            hikmahPedagogis: 'Mengukuhkan posisi Khulafaurasyidin sebagai teladan pemimpin berintegritas.',
          },
        },
      ],
    },
  ],
};
