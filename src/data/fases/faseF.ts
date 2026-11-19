import type { FaseKurikulum2026 } from '../../types/curriculum';

export const FASE_F_DATA: FaseKurikulum2026 = {
  fase: 'F',
  jenjang: 'SMA/MA',
  kelasRentang: 'Kelas 11 – 12',
  labelLengkap: 'Fase F · SMA/MA (Kelas XI & XII)',
  rasional2026:
    'Pada Fase F Kurikulum Merdeka 2026, peserta didik SMA/MA kelas XI–XII mematangkan kapasitas berpikir kritis (tafakkur) dan semangat iptek berdasarkan QS. Ali Imran: 190–191 dan QS. Ar-Rahman: 33; memperkokoh keseimbangan ikhtiar-tawakal serta akidah di era kontemporer; mempraktikkan moderasi beragama, toleransi, dan musyawarah; menguasai fikih munakahat dan mawaris; serta mengkaji kebangkitan Islam modern dan kontribusi organisasi Islam di Indonesia pada Semester 1 dan Semester 2.',
  capaianPembelajaran: [
    {
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiCP:
        'Peserta didik menganalisis secara kritis QS. Ali Imran: 190–191 (Ulul Albab), QS. Ar-Rahman: 33 (IPTEK), QS. Yunus: 40–41 (toleransi), dan QS. Asy-Syura: 38 (musyawarah) beserta hadis shahih terkait.',
    },
    {
      elemen: 'Akidah',
      deskripsiCP:
        'Peserta didik menganalisis hakikat tauhid dalam ilmu pengetahuan, menjaga kemurnian akidah dari aliran menyimpang, serta mempraktikkan keseimbangan ikhtiar, doa, dan tawakal.',
    },
    {
      elemen: 'Akhlak',
      deskripsiCP:
        'Peserta didik menginternalisasi adab menggunakan akal dan ilmu, memenuhi janji, menjaga lisan di ruang publik, serta moderasi beragama (wasathiyah).',
    },
    {
      elemen: 'Fikih',
      deskripsiCP:
        'Peserta didik menganalisis ketentuan pernikahan dalam Islam (munakahat), pembagian harta waris (mawaris), serta prinsip ushul fikih dan ijtihad kontemporer.',
    },
    {
      elemen: 'Sejarah Peradaban Islam',
      deskripsiCP:
        'Peserta didik mengevaluasi perkembangan peradaban Islam masa modern, pemikiran tokoh pembaharu Islam, dan kontribusi organisasi Islam di Indonesia bagi kemajuan bangsa.',
    },
  ],
  babList: [
    // SEMESTER 1 (GANJIL)
    {
      id: 'fase-f-bab-1',
      nomorBab: 1,
      judulBab: 'Berpikir Kritis (Ulul Albab) dan Semangat Iptek dalam Islam',
      kelas: 'Kelas 11',
      semester: 'Ganjil',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Mengkaji QS. Ali Imran ayat 190–191 dan QS. Ar-Rahman ayat 33 tentang integrasi zikir, pikir, dan riset ilmiah dalam membangun peradaban.',
      atpList: [
        {
          kode: 'ATP-F.1.1',
          kelas: 'Kelas 11',
          semester: 'Ganjil',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Menganalisis karakteristik Ulul Albab dalam QS. Ali Imran ayat 190–191 dan merumuskan relevansinya dengan etika riset serta teknologi modern.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kreativitas'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'f-1-m1',
          kode: 'MAT-F.1.1',
          judul: 'Karakteristik Ulul Albab: Sinergi Zikir dan Pikir',
          ringkasan:
            'Membedah struktur tafakkur dalam QS. Ali Imran: 190–191 sebagai metode ilmiah yang menyambungkan observasi alam dengan kesadaran spiritual.',
          kataKunci: ['Ulul Albab', 'Berpikir Kritis', 'Zikir & Pikir', 'Ayat Kauniyah'],
          ayatUtama: {
            surah: 'QS. Ali ‘Imran',
            ayat: '190 – 191',
            arab: 'اِنَّ فِيْ خَلْقِ السَّمٰوٰتِ وَالْاَرْضِ وَاخْتِلَافِ الَّيْلِ وَالنَّهَارِ لَاٰيٰتٍ لِّاُولِى الْاَلْبَابِ ۝ الَّذِيْنَ يَذْكُرُوْنَ اللّٰهَ قِيَامًا وَّقُعُوْدًا وَّعَلٰى جُنُوْبِهِمْ وَيَتَفَكَّرُوْنَ فِيْ خَلْقِ السَّمٰوٰتِ وَالْاَرْضِ',
            latin: 'Inna fī khalqis-samāwāti wal-arḍi wakhtilāfil-laili wan-nahāri la’āyātil li’ulil-albāb. Allażīna yażkurūnallāha qiyāmaw wa qu‘ūdaw wa ‘alā junūbihim wa yatafakkarūna fī khalqis-samāwāti wal-arḍ.',
            terjemah:
              'Sesungguhnya dalam penciptaan langit dan bumi, serta pergantian malam dan siang terdapat tanda-tanda (kebesaran Allah) bagi orang yang berakal (ulul albab), (yaitu) orang-orang yang mengingat Allah sambil berdiri, duduk, atau dalam keadaan berbaring, dan mereka memikirkan tentang penciptaan langit dan bumi.',
            tafsirSingkat: 'Ulul Albab memadukan kedalaman zikir (ketuhanan) dan ketajaman pikir (riset alam).',
            keterkaitanMateri: 'Landasan utama dimensi Penalaran Kritis dalam Deep Learning Kurikulum 2026.',
          },
          hadisUtama: {
            perawi: 'HR. At-Tirmidzi (No. 2459) & Ibnu Majah',
            kitab: 'Jami’ At-Tirmidzi, Kitab Shifatil Qiyamah',
            derajat: 'Hasan',
            arab: 'الْكَيِّسُ مَنْ دَانَ نَفْسَهُ وَعَمِلَ لِمَا بَعْدَ الْمَوْتِ وَالْعَاجِزُ مَنْ أَتْبَعَ نَفْسَهُ هَوَاهَا وَتَمَنَّى عَلَى اللَّهِ',
            latin: 'Al-kayyisu man dāna nafsahū wa ‘amila limā ba‘dal-maut, wal-‘ājizu man atba‘a nafsahū hawāhā wa tamannā ‘alallāh.',
            terjemah:
              'Orang yang cerdas adalah orang yang mampu mengendalikan dirinya dan beramal untuk kehidupan setelah mati.',
            hikmahPedagogis: 'Mengajarkan bahwa kecerdasan sejati mencakup kendali diri dan visi masa depan.',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-2',
      nomorBab: 2,
      judulBab: 'Tauhid dalam Ilmu Pengetahuan: Ikhtiar, Doa & Tawakal',
      kelas: 'Kelas 11',
      semester: 'Ganjil',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Mengkaji keselarasan hukum alam (sunnatullah) dengan kekuasaan Allah serta membangun ketangguhan mental pelajar menghadapi tantangan akademik dan karir.',
      atpList: [
        {
          kode: 'ATP-F.2.1',
          kelas: 'Kelas 11',
          semester: 'Ganjil',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Menganalisis konsep sunnatullah dalam sains serta menerapkan keseimbangan ikhtiar maksimal, doa khusyuk, dan tawakal.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian', 'Penalaran Kritis'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'f-2-m1',
          kode: 'MAT-F.2.1',
          judul: 'Sunnatullah, Etos Riset, dan Tawakal Sejati',
          ringkasan:
            'Memahami bahwa keteraturan hukum fisika, biologi, dan sosial adalah bagian dari sunnatullah yang harus dipelajari.',
          kataKunci: ['Sunnatullah', 'Ikhtiar', 'Tawakal', 'Tauhid Sains'],
          ayatUtama: {
            surah: 'QS. Ali ‘Imran',
            ayat: '159',
            arab: 'فَاِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللّٰهِۗ اِنَّ اللّٰهَ يُحِبُّ الْمُتَوَكِّلِيْنَ',
            latin: 'Fa iżā ‘azamta fatawakkal ‘alallāh, innallāha yuḥibbul-mutawakkilīn.',
            terjemah: 'Kemudian, apabila engkau telah membulatkan tekad, maka bertawakallah kepada Allah. Sungguh, Allah mencintai orang yang bertawakal.',
            tafsirSingkat: 'Tawakal datang setelah adanya azam (tekad kuat), musyawarah, dan perencanaan matang.',
            keterkaitanMateri: 'Membangun kesiapan mental siswa menghadapi seleksi perguruan tinggi atau dunia kerja.',
          },
          hadisUtama: {
            perawi: 'HR. At-Tirmidzi (No. 2344) & Ibnu Majah',
            kitab: 'Jami’ At-Tirmidzi, Kitab Az-Zuhd',
            derajat: 'Shahih',
            arab: 'لَوْ أَنَّكُمْ تَتَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا',
            latin: 'Lau annakum tatawakkalūna ‘alallāhi ḥaqqa tawakkulihī larazaqakum kamā yarzuquṭ-ṭaira tagdū khimāṣan wa tarūḥu biṭānā.',
            terjemah:
              'Seandainya kalian bertawakal kepada Allah dengan sebenar-benarnya tawakal, niscaya Dia memberi rezeki sebagaimana burung yang pergi pagi hari dalam keadaan lapar dan pulang sore hari dalam keadaan kenyang.',
            hikmahPedagogis: 'Burung tetap terbang keluar sarang untuk mencari rezeki—tawakal menuntut aksi nyata.',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-3',
      nomorBab: 3,
      judulBab: 'Memenuhi Janji, Mensyukuri Nikmat & Menjaga Etika Ruang Publik',
      kelas: 'Kelas 11',
      semester: 'Ganjil',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Mengkaji kewajiban menepati janji (al-wafa bil-‘ahd), menjaga rahasia amanah, dan etika berpendapat di ruang publik maupun media digital.',
      atpList: [
        {
          kode: 'ATP-F.3.1',
          kelas: 'Kelas 11',
          semester: 'Ganjil',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Menganalisis pentingnya komitmen menepati janji dan etika menjaga lisan/tulisan di ruang publik sebagai ciri mukmin bermartabat.',
          dimensiProfilLulusan: ['Komunikasi', 'Kewargaan', 'Keimanan dan Ketakwaan terhadap Tuhan YME'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'f-3-m1',
          kode: 'MAT-F.3.1',
          judul: 'Integritas Janji dan Etika Berkomunikasi di Ruang Publik',
          ringkasan:
            'Memahami pertanggungjawaban setiap janji dan ucapan di hadapan Allah serta dampaknya pada kepercayaan sosial.',
          kataKunci: ['Menepati Janji', 'Menjaga Lisan', 'Etika Publik', 'Amanah'],
          ayatUtama: {
            surah: 'QS. Al-Isra’',
            ayat: '34',
            arab: 'وَاَوْفُوْا بِالْعَهْدِۖ اِنَّ الْعَهْدَ كَانَ مَسْـُٔوْلًا',
            latin: 'Wa aufū bil-‘ahdi innal-‘ahda kāna mas’ūlā.',
            terjemah: 'Dan penuhilah janji, karena janji itu pasti diminta pertanggungjawabannya.',
            tafsirSingkat: 'Menepati janji merupakan pilar integritas pribadi dan keharmonisan sosial.',
            keterkaitanMateri: 'Melatih kedisiplinan siswa dalam janji tugas, organisasi OSIS, dan pergaulan.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 33) dan Muslim (No. 59)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Iman',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'آيَةُ الْمُنَافِقِ ثَلَاثٌ إِذَا حَدَّثَ كَذَبَ وَإِذَا وَعَدَ أَخْلَفَ وَإِذَا اؤْتُمِنَ خَانَ',
            latin: 'Āyatul-munāfiqi ṡalāṡun: iżā ḥaddaṡa każaba, wa iżā wa‘ada akhlafa, wa iżā’tumina khān.',
            terjemah: 'Tanda orang munafik ada tiga: apabila berbicara ia dusta, apabila berjanji ia mengingkari, dan apabila dipercaya ia berkhianat.',
            hikmahPedagogis: 'Mengingatkan bahaya tiga penyakit integritas yang harus dijauhi calon pemimpin masa depan.',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-4',
      nomorBab: 4,
      judulBab: 'Ketentuan Pernikahan (Munakahat) & Keluarga Sakinah',
      kelas: 'Kelas 12',
      semester: 'Ganjil',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Mengkaji hikmah, rukun, syarat pernikahan dalam Islam, hak dan kewajiban suami-istri, serta kesesuaiannya dengan UU Perkawinan di Indonesia.',
      atpList: [
        {
          kode: 'ATP-F.4.1',
          kelas: 'Kelas 12',
          semester: 'Ganjil',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Menganalisis rukun, syarat sah pernikahan dalam Islam, serta urgensi kesiapan mental, ekonomi, dan usia dewasa.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'f-4-m1',
          kode: 'MAT-F.4.1',
          judul: 'Prinsip Sakinah, Mawaddah, Rahmah dan Rukun Nikah',
          ringkasan:
            'Membahas tujuan luhur pernikahan (mitsaqan ghalizhan), syarat wali dan saksi, mahar, serta pencegahan pernikahan usia anak.',
          kataKunci: ['Munakahat', 'Sakinah Mawaddah Rahmah', 'Rukun Nikah', 'Mitsaqan Ghalizhan'],
          ayatUtama: {
            surah: 'QS. Ar-Rum',
            ayat: '21',
            arab: 'وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً',
            latin: 'Wa min āyātihī an khalaqa lakum min anfusikum azwājal litaskunū ilaihā wa ja‘ala bainakum mawaddataw wa raḥmah.',
            terjemah:
              'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
            tafsirSingkat: 'Keluarga dibangun di atas ketenteraman jiwa (sakinah), cinta tulus, dan kasih sayang.',
            keterkaitanMateri: 'Membekali siswa kelas XII perspektif fikih keluarga yang matang dan bertanggung jawab.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 5066) dan Muslim (No. 1400)',
            kitab: 'Sahih Al-Bukhari, Kitab An-Nikah',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'يَا مَعْشَرَ الشَّبَابِ مَنِ اسْتَطَاعَ مِنْكُمُ الْبَاءَةَ فَلْيَتَزَوَّجْ فَإِنَّهُ أَغَضُّ لِلْبَصَرِ وَأَحْصَنُ لِلْفَرْجِ',
            latin: 'Yā ma‘syarasy-syabābi manistaṭā‘a minkumul-bā’ata falyatazawwaj, fa innahū agaḍḍu lil-baṣari wa aḥṣanu lil-farj.',
            terjemah:
              'Wahai para pemuda, barangsiapa di antara kalian telah mampu (kesiapan fisik, mental, dan nafkah), hendaklah ia menikah.',
            hikmahPedagogis: 'Menegaskan perlunya kesiapan menyeluruh (al-ba’ah) sebelum berkeluarga.',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-5',
      nomorBab: 5,
      judulBab: 'Peradaban Islam Masa Modern & Tokoh Pembaharu Dunia Islam',
      kelas: 'Kelas 11',
      semester: 'Ganjil',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Mengkaji gagasan pembaruan Islam modern (Jamaluddin Al-Afghani, Muhammad Abduh, Rasyid Ridha, KH Ahmad Dahlan, KH Hasyim Asy’ari) dalam merespons tantangan zaman.',
      atpList: [
        {
          kode: 'ATP-F.5.1',
          kelas: 'Kelas 11',
          semester: 'Ganjil',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Mengevaluasi pemikiran tokoh pembaharu Islam masa modern dan dampaknya terhadap kebangkitan pendidikan Islam di Indonesia.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Kreativitas', 'Kewargaan'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'f-5-m1',
          kode: 'MAT-F.5.1',
          judul: 'Tajdid (Pembaruan) Pendidikan & Kebangkitan Intelektual Islam',
          ringkasan:
            'Menelusuri bagaimana pembaruan pendidikan memadukan ilmu agama dan sains modern demi kemandirian umat.',
          kataKunci: ['Pembaharuan Islam', 'Tajdid', 'Muhammad Abduh', 'KH Ahmad Dahlan'],
          ayatUtama: {
            surah: 'QS. Al-Hasyr',
            ayat: '18',
            arab: 'يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوا اتَّقُوا اللّٰهَ وَلْتَنْظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ',
            latin: 'Yā ayyuhal-lażīna āmanuttaqullāha waltanẓur nafsum mā qaddamat ligad.',
            terjemah: 'Wahai orang-orang yang beriman! Bertakwalah kepada Allah dan hendaklah setiap orang memperhatikan apa yang telah diperbuatnya untuk hari esok (masa depan).',
            tafsirSingkat: 'Umat Islam diperintahkan bersikap visioner, melakukan evaluasi diri, dan menyiapkan peradaban masa depan.',
            keterkaitanMateri: 'Mendorong sikap terbuka terhadap inovasi pendidikan yang tetap berakar pada tauhid.',
          },
          hadisUtama: {
            perawi: 'HR. Abu Dawud (No. 4291)',
            kitab: 'Sunan Abi Dawud, Kitab Al-Malahim',
            derajat: 'Shahih',
            arab: 'إِنَّ اللَّهَ يَبْعَثُ لِهَذِهِ الْأُمَّةِ عَلَى رَأْسِ كُلِّ مِائَةِ سَنَةٍ مَنْ يُجَدِّدُ لَهَا دِينَهَا',
            latin: 'Innallāha yab‘aṡu lihāżihil-ummati ‘alā ra’si kulli mi’ati sanatin man yujaddidu lahā dīnahā.',
            terjemah: 'Sesungguhnya Allah mengutus bagi umat ini pada setiap penghujung seratus tahun seorang yang memperbarui (pemahaman dan pengamalan) agamanya.',
            hikmahPedagogis: 'Menjelaskan legitimasi tradisi pembaruan (tajdid) yang konstruktif dalam Islam.',
          },
        },
      ],
    },

    // SEMESTER 2 (GENAP)
    {
      id: 'fase-f-bab-6',
      nomorBab: 6,
      judulBab: 'Musyawarah (QS. Asy-Syura: 38) & Toleransi (QS. Yunus: 40–41)',
      kelas: 'Kelas 12',
      semester: 'Genap',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Mengkaji prinsip kepemimpinan partisipatif dalam QS. Asy-Syura: 38 serta batas dan etika toleransi beragama dalam QS. Yunus: 40–41.',
      atpList: [
        {
          kode: 'ATP-F.6.1',
          kelas: 'Kelas 12',
          semester: 'Genap',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Menganalisis konsep syura (musyawarah demokratis) dan tasamuh dalam QS. Asy-Syura: 38 serta QS. Yunus: 40–41 untuk menjaga persatuan bangsa.',
          dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis', 'Komunikasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'f-6-m1',
          kode: 'MAT-F.6.1',
          judul: 'Demokrasi Bermartabat dan Toleransi dalam Al-Qur’an',
          ringkasan:
            'Membedah nilai kesetaraan warga negara dalam musyawarah serta penghormatan atas kebebasan berkeyakinan tanpa mengorbankan akidah.',
          kataKunci: ['Syura', 'Asy-Syura 38', 'Yunus 40-41', 'Toleransi'],
          ayatUtama: {
            surah: 'QS. Yunus',
            ayat: '40 – 41',
            arab: 'وَمِنْهُمْ مَّنْ يُّؤْمِنُ بِهٖ وَمِنْهُمْ مَّنْ لَّا يُؤْمِنُ بِهٖۗ وَرَبُّكَ اَعْلَمُ بِالْمُفْسِدِيْنَ ۝ وَاِنْ كَذَّبُوْكَ فَقُلْ لِّيْ عَمَلِيْ وَلَكُمْ عَمَلُكُمْ',
            latin: 'Wa minhum may yu’minu bihī wa minhum mal lā yu’minu bih, wa rabbuka a‘lamu bil-mufsidīn. Wa in każżabūka faqul lī ‘amalī wa lakum ‘amalukum.',
            terjemah:
              'Dan di antara mereka ada orang-orang yang beriman kepadanya (Al-Qur’an), dan di antaranya ada (pula) orang-orang yang tidak beriman kepadanya. Sedangkan Tuhanmu lebih mengetahui tentang orang-orang yang berbuat kerusakan. Dan jika mereka mendustakanmu (Muhammad), maka katakanlah, “Bagiku pekerjaanku dan bagimu pekerjaanmu.”',
            tafsirSingkat: 'Perbedaan keyakinan dihormati dengan tegas tanpa kekerasan maupun paksaan.',
            keterkaitanMateri: 'Memperkuat wawasan kebangsaan Bhinneka Tunggal Ika berbasis dalil Al-Qur’an.',
          },
          hadisUtama: {
            perawi: 'HR. Ahmad (No. 2107) & Al-Bukhari dalam Al-Adab Al-Mufrad',
            kitab: 'Musnad Ahmad',
            derajat: 'Hasan Shahih',
            arab: 'أَحَبُّ الْأَدْيَانِ إِلَى اللَّهِ الْحَنِيفِيَّةُ السَّمْحَةُ',
            latin: 'Aḥabbul-adyāni ilallāhil-ḥanīfiyyatus-samḥah.',
            terjemah: 'Agama yang paling dicintai oleh Allah adalah agama yang lurus (tauhid) lagi penuh toleransi dan kelapangan.',
            hikmahPedagogis: 'Menunjukkan harmoni antara keteguhan akidah (hanif) dan kelapangan sikap sosial (samhah).',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-7',
      nomorBab: 7,
      judulBab: 'Menjaga Kemurnian Akidah dan Spiritualitas di Era Modern',
      kelas: 'Kelas 12',
      semester: 'Genap',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Mengkaji tantangan materialisme, sekularisme ekstrem, dan radikalisme pemikiran serta menjaga keseimbangan akidah Ahlussunnah yang moderat.',
      atpList: [
        {
          kode: 'ATP-F.7.1',
          kelas: 'Kelas 12',
          semester: 'Genap',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Mengevaluasi paham ekstrem maupun permisif di era digital dengan tolok ukur akidah Islam yang lurus dan ramah.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'f-7-m1',
          kode: 'MAT-F.7.1',
          judul: 'Benteng Akidah Seimbang di Tengah Arus Globalisasi',
          ringkasan:
            'Menjaga keteguhan tauhid sekaligus sikap terbuka terhadap kemajuan zaman tanpa kehilangan jati diri Muslim.',
          kataKunci: ['Akidah Moderat', 'Globalisasi', 'Anti-Ekstremisme', 'Tauhid'],
          ayatUtama: {
            surah: 'QS. Al-Fatihah',
            ayat: '6 – 7',
            arab: 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ ۝ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ۝',
            latin: 'Ihdinaṣ-ṣirāṭal-mustaqīm. Ṣirāṭal-lażīna an‘amta ‘alaihim gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn.',
            terjemah: 'Tunjukilah kami jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
            tafsirSingkat: 'Jalan lurus (siratal mustaqim) berada di posisi tengah yang terjaga dari penyimpangan.',
            keterkaitanMateri: 'Memperkuat kejelasan orientasi hidup generasi muda saat lulus SMA/MA.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 6146) dan Muslim (No. 2816)',
            kitab: 'Sahih Al-Bukhari, Kitab Ar-Riqaq',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'سَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا',
            latin: 'Saddidū wa qāribū wa absyirū.',
            terjemah: 'Bersikaplah lurus (tepat), mendekatilah (kesempurnaan), dan berilah kabar gembira.',
            hikmahPedagogis: 'Mengajarkan sikap istikamah yang realistis dan penuh optimisme.',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-8',
      nomorBab: 8,
      judulBab: 'Moderasi Beragama (Wasathiyah) & Harmoni Kebangsaan',
      kelas: 'Kelas 12',
      semester: 'Genap',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Menganalisis konsep ummatan wasathan dalam Al-Qur’an dan praktik tawazun, i’tidal, serta tasamuh dalam kehidupan berbangsa.',
      atpList: [
        {
          kode: 'ATP-F.8.1',
          kelas: 'Kelas 12',
          semester: 'Genap',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Mengevaluasi sikap ekstremisme serta merumuskan strategi penguatan moderasi beragama dalam kehidupan bermasyarakat.',
          dimensiProfilLulusan: ['Kewargaan', 'Penalaran Kritis', 'Komunikasi'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'f-8-m1',
          kode: 'MAT-F.8.1',
          judul: 'Ummatan Wasathan dan Etika Hidup Damai (QS. Al-Baqarah: 143)',
          ringkasan:
            'Menggali prinsip keadilan, keseimbangan, dan penghormatan terhadap keragaman budaya dan agama di Indonesia.',
          kataKunci: ['Moderasi Beragama', 'Wasathiyah', 'Tasamuh', 'Persatuan Bangsa'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '143',
            arab: 'وَكَذٰلِكَ جَعَلْنٰكُمْ اُمَّةً وَّسَطًا لِّتَكُوْنُوْا شُهَدَاۤءَ عَلَى النَّاسِ وَيَكُوْنَ الرَّسُوْلُ عَلَيْكُمْ شَهِيْدًا',
            latin: 'Wa każālika ja‘alnākum ummataw wasaṭal litakūnū syuhadā’a ‘alan-nāsi wa yakūnar-rasūlu ‘alaikum syahīdā.',
            terjemah:
              'Dan demikian pula Kami telah menjadikan kamu (umat Islam) umat pertengahan (adil dan terpilih) agar kamu menjadi saksi atas (perbuatan) manusia.',
            tafsirSingkat: 'Ummatan wasathan bermakna umat yang adil, seimbang, dan jauh dari sikap ekstrem.',
            keterkaitanMateri: 'Pilar utama pendidikan karakter Kebangsaan dan Moderasi Beragama 2026.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 39)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Iman',
            derajat: 'Shahih',
            arab: 'إِنَّ الدِّينَ يُسْرٌ وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلَّا غَلَبَهُ',
            latin: 'Innad-dīna yusrun, wa lan yusyāddad-dīna aḥadun illā galabah.',
            terjemah: 'Sesungguhnya agama (Islam) ini mudah. Tidaklah seseorang mempersulit agama melainkan ia akan dikalahkan olehnya.',
            hikmahPedagogis: 'Mengajak pelajar menampilkan wajah Islam yang ramah dan menyejukkan.',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-9',
      nomorBab: 9,
      judulBab: 'Ketentuan Waris dalam Islam (Mawaris) & Keadilan Keluarga',
      kelas: 'Kelas 12',
      semester: 'Genap',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami ketentuan ahli waris dzawil furudh dan ashabah, penghitungan bagian harta waris (1/2, 1/4, 1/8, 2/3, 1/3, 1/6), serta hikmah pencegahan sengketa keluarga.',
      atpList: [
        {
          kode: 'ATP-F.9.1',
          kelas: 'Kelas 12',
          semester: 'Genap',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Menghitung pembagian harta waris (mawaris) secara matematis pada kasus sederhana dan menjelaskan prinsip keadilan proporsional Islam.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'f-9-m1',
          kode: 'MAT-F.9.1',
          judul: 'Ilmu Faraid (Mawaris): Ahli Waris, Furudh Muqaddarah & Hisab',
          ringkasan:
            'Mempelajari langkah penyelesaian harta peninggalan (biaya jenazah, utang, wasiat, lalu waris) beserta contoh perhitungan bagian waris.',
          kataKunci: ['Mawaris', 'Faraid', 'Ahli Waris', 'Keadilan Keluarga'],
          ayatUtama: {
            surah: 'QS. An-Nisa’',
            ayat: '7',
            arab: 'لِلرِّجَالِ نَصِيْبٌ مِّمَّا تَرَكَ الْوَالِدٰنِ وَالْاَقْرَبُوْنَ وَلِلنِّسَاۤءِ نَصِيْبٌ مِّمَّا تَرَكَ الْوَالِدٰنِ وَالْاَقْرَبُوْنَ مِمَّا قَلَّ مِنْهُ اَوْ كَثُرَ',
            latin: 'Lir-rijāli naṣībum mimmā tarakal-wālidāni wal-aqrabūna wa lin-nisā’i naṣībum mimmā tarakal-wālidāni wal-aqrabūna mimmā qalla minhu au kaṡur.',
            terjemah:
              'Bagi laki-laki ada hak bagian dari harta peninggalan kedua orang tua dan kerabatnya, dan bagi perempuan ada hak bagian (pula) dari harta peninggalan kedua orang tua dan kerabatnya, baik sedikit atau banyak menurut bagian yang telah ditetapkan.',
            tafsirSingkat: 'Islam menetapkan hak waris yang adil baik bagi laki-laki maupun perempuan secara transparan.',
            keterkaitanMateri: 'Integrasi fikih mawaris dengan literasi numerasi pecahan matematika.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 6732) dan Muslim (No. 1615)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Fara’id',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ',
            latin: 'Alḥiqul-farā’iḍa bi’ahlihā famā baqiya fahuwa li’aulā rajulin żakar.',
            terjemah: 'Berikanlah bagian-bagian waris yang telah ditentukan kepada pemiliknya, lalu sisanya bagi kerabat laki-laki yang paling dekat (ashabah).',
            hikmahPedagogis: 'Menjadi kaidah pokok dalam pembagian harta warisan sesuai syariat.',
          },
        },
      ],
    },
    {
      id: 'fase-f-bab-10',
      nomorBab: 10,
      judulBab: 'Kontribusi Umat & Organisasi Islam Indonesia bagi Peradaban Bangsa',
      kelas: 'Kelas 12',
      semester: 'Genap',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Mengkaji peran organisasi Islam (Nahdlatul Ulama, Muhammadiyah, Persis, Al-Washliyah, NW, dll.) dalam kemerdekaan, pendidikan, kesehatan, dan perdamaian dunia.',
      atpList: [
        {
          kode: 'ATP-F.10.1',
          kelas: 'Kelas 12',
          semester: 'Genap',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menganalisis kontribusi nyata organisasi dan tokoh Islam Indonesia dalam membangun NKRI dan peradaban ilmu.',
          dimensiProfilLulusan: ['Kewargaan', 'Kolaborasi', 'Penalaran Kritis'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'f-10-m1',
          kode: 'MAT-F.10.1',
          judul: 'Islam Rahmatan lil ‘Alamin & Pilar Kebangsaan Indonesia',
          ringkasan:
            'Menelusuri peran pesantren, sekolah Islam, rumah sakit, dan perguruan tinggi Islam dalam mencerdaskan kehidupan bangsa.',
          kataKunci: ['Organisasi Islam', 'Hubbul Wathan', 'Peradaban Indonesia', 'Kemerdekaan'],
          ayatUtama: {
            surah: 'QS. Al-Ma’idah',
            ayat: '2',
            arab: 'وَتَعَاوَنُوْا عَلَى الْبِرِّ وَالتَّقْوٰىۖ وَلَا تَعَاوَنُوْا عَلَى الْاِثْمِ وَالْعُدْوَانِ',
            latin: 'Wa ta‘āwanū ‘alal-birri wat-taqwā, wa lā ta‘āwanū ‘alal-iṡmi wal-‘udwān.',
            terjemah: 'Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan jangan tolong-menolong dalam berbuat dosa dan permusuhan.',
            tafsirSingkat: 'Sinergi antargolongan dalam kebaikan melahirkan kemajuan bangsa dan kedamaian dunia.',
            keterkaitanMateri: 'Mendorong pelajar aktif dalam kegiatan sosial kemasyarakatan yang konstruktif.',
          },
          hadisUtama: {
            perawi: 'HR. Ath-Thabrani dalam Al-Mu’jam Al-Awsath (No. 5787)',
            kitab: 'Al-Mu’jam Al-Awsath & Musnad Asy-Syihab',
            derajat: 'Hasan',
            arab: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
            latin: 'Khairun-nāsi anfa‘uhum lin-nās.',
            terjemah: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.',
            hikmahPedagogis: 'Mengukuhkan visi pengabdian pelajar Muslim setelah lulus SMA/MA.',
          },
        },
      ],
    },
  ],
};
