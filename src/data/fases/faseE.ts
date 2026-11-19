import type { FaseKurikulum2026 } from '../../types/curriculum';

export const FASE_E_DATA: FaseKurikulum2026 = {
  fase: 'E',
  jenjang: 'SMA/MA',
  kelasRentang: 'Kelas 10',
  labelLengkap: 'Fase E · SMA/MA (Kelas X)',
  rasional2026:
    'Pada Fase E Kurikulum Merdeka 2026, peserta didik SMA/MA kelas X menganalisis ayat dan hadis tentang kompetisi dalam kebaikan (fastabiqul khairat), etos kerja, dan menjauhi pergaulan bebas/zina; menginternalisasi Syu’abul Iman; menghindari gaya hidup berfoya-foya, riya, sum’ah, takabur, dan hasad; menguasai fikih pengurusan jenazah serta prinsip ekonomi syariah; dan meneladani dakwah Islam di Nusantara serta Wali Songo pada Semester 1 dan Semester 2.',
  capaianPembelajaran: [
    {
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiCP:
        'Peserta didik menganalisis QS. Al-Ma’idah: 48, QS. At-Taubah: 105, QS. Al-Isra’: 32, dan QS. An-Nur: 2 beserta hadis terkait secara kontekstual dan tartil.',
    },
    {
      elemen: 'Akidah',
      deskripsiCP:
        'Peserta didik menganalisis hakikat dan implementasi Syu’abul Iman (cabang-cabang iman) dalam dimensi hati, lisan, dan perbuatan di kehidupan remaja modern.',
    },
    {
      elemen: 'Akhlak',
      deskripsiCP:
        'Peserta didik mengevaluasi bahaya gaya hidup hedonis/berfoya-foya, riya, sum’ah, takabur, dan hasad serta membiasakan sikap qanaah, tawadu, dan ikhlas.',
    },
    {
      elemen: 'Fikih',
      deskripsiCP:
        'Peserta didik menganalisis ketentuan pengurusan jenazah serta prinsip muamalah syariah (perbankan, asuransi, dan koperasi syariah) yang bebas riba.',
    },
    {
      elemen: 'Sejarah Peradaban Islam',
      deskripsiCP:
        'Peserta didik menganalisis strategi dakwah kultural dan damai para ulama serta Wali Songo di Nusantara dan meneladani kearifan dakwahnya pada era kontemporer.',
    },
  ],
  babList: [
    // SEMESTER 1 (GANJIL)
    {
      id: 'fase-e-bab-1',
      nomorBab: 1,
      judulBab: 'Kompetisi dalam Kebaikan (Fastabiqul Khairat) & Etos Kerja',
      kelas: 'Kelas 10',
      semester: 'Ganjil',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Mengkaji QS. Al-Ma’idah ayat 48 dan QS. At-Taubah ayat 105 untuk membangun etos prestasi, integritas, dan produktivitas generasi muda Muslim.',
      atpList: [
        {
          kode: 'ATP-E.1.1',
          kelas: 'Kelas 10',
          semester: 'Ganjil',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Menganalisis makna dan asbabun nuzul QS. Al-Ma’idah ayat 48 serta menerapkannya dalam etos belajar dan berkarya.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'e-1-m1',
          kode: 'MAT-E.1.1',
          judul: 'Berlomba dalam Kebaikan & Etos Kerja Islami',
          ringkasan:
            'Menelaah perintah berlomba dalam amal saleh (QS. Al-Ma’idah: 48) serta nilai kerja profesional.',
          kataKunci: ['Fastabiqul Khairat', 'Etos Kerja', 'Profesionalisme', 'Al-Ma’idah 48'],
          ayatUtama: {
            surah: 'QS. Al-Ma’idah',
            ayat: '48',
            arab: 'لِكُلٍّ جَعَلْنَا مِنْكُمْ شِرْعَةً وَّمِنْهَاجًا ۗ وَلَوْ شَاۤءَ اللّٰهُ لَجَعَلَكُمْ اُمَّةً وَّاحِدَةً وَّلٰكِنْ لِّيَبْلُوَكُمْ فِيْ مَآ اٰتٰىكُمْ فَاسْتَبِقُوا الْخَيْرٰتِ',
            latin: 'Likullin ja‘alnā minkum syir‘ataw wa minhājā, walau syā’allāhu laja‘alakum ummataw wāḥidataw walākil liyabluwakum fī mā ātākum fastabiqul-khairāt.',
            terjemah:
              'Untuk setiap umat di antara kamu, Kami berikan aturan dan jalan yang terang. Kalau Allah menghendaki, niscaya kamu dijadikan-Nya satu umat (saja), tetapi Allah hendak menguji kamu terhadap karunia yang telah diberikan-Nya kepadamu, maka berlomba-lombalah berbuat kebajikan.',
            tafsirSingkat: 'Kompetisi dalam Islam adalah perlombaan memperbanyak kontribusi positif dan kemanfaatan.',
            keterkaitanMateri: 'Membangun pola pikir bertumbuh dan budaya prestasi beretika pada siswa SMA/MA.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 2072)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Buyu’',
            derajat: 'Shahih',
            arab: 'مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ وَإِنَّ نَبِيَّ اللَّهِ دَاوُدَ عَلَيْهِ السَّلَامُ كَانَ يَأْكُلُ مِنْ عَمَلِ يَدِهِ',
            latin: 'Mā akala aḥadun ṭa‘āman qaṭṭu khairan min an ya’kula min ‘amali yadihī, wa inna nabiyyallāhi Dāwūda ‘alaihis-salāmu kāna ya’kulu min ‘amali yadih.',
            terjemah:
              'Tidak ada makanan yang lebih baik yang dimakan seseorang selain makanan dari hasil jerih payah tangannya sendiri.',
            hikmahPedagogis: 'Menguatkan kemandirian ekonomi dan penghargaan terhadap kerja keras.',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-2',
      nomorBab: 2,
      judulBab: 'Memahami Hakikat dan Cabang-Cabang Iman (Syu’abul Iman)',
      kelas: 'Kelas 10',
      semester: 'Ganjil',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Menganalisis tiga dimensi Syu’abul Iman (niat/hati, ucapan lisan, dan perbuatan anggota badan) dalam kehidupan pelajar SMA/MA.',
      atpList: [
        {
          kode: 'ATP-E.2.1',
          kelas: 'Kelas 10',
          semester: 'Ganjil',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Mengklasifikasikan cabang-cabang iman menurut Al-Baihaqi serta merancang pembiasaan iman dalam hati, lisan, dan tindakan.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'e-2-m1',
          kode: 'MAT-E.2.1',
          judul: 'Syu’abul Iman: Kesatuan Hati, Lisan, dan Amal Nyata',
          ringkasan:
            'Memahami bahwa cabang iman membentang dari ucapan Lā ilāha illallāh hingga menyingkirkan gangguan di jalan.',
          kataKunci: ['Syu’abul Iman', 'Hati', 'Lisan', 'Rasa Malu'],
          ayatUtama: {
            surah: 'QS. Al-Anfal',
            ayat: '2',
            arab: 'اِنَّمَا الْمُؤْمِنُوْنَ الَّذِيْنَ اِذَا ذُكِرَ اللّٰهُ وَجِلَتْ قُلُوْبُهُمْ وَاِذَا تُلِيَتْ عَلَيْهِمْ اٰيٰتُهٗ زَادَتْهُمْ اِيْمَانًا وَّعَلٰى رَبِّهِمْ يَتَوَكَّلُوْنَ',
            latin: 'Innamal-mu’minūnal-lażīna iżā żukirallāhu wajilat qulūbuhum wa iżā tuliyat ‘alaihim āyātuhū zādat-hum īmānaw wa ‘alā rabbihim yatawakkalūn.',
            terjemah:
              'Sesungguhnya orang-orang yang beriman adalah mereka yang apabila disebut nama Allah gemetar hatinya, dan apabila dibacakan ayat-ayat-Nya kepada mereka, bertambah (kuat) imannya dan hanya kepada Tuhan mereka bertawakal.',
            tafsirSingkat: 'Iman bersifat dinamis; ia bertambah melalui tadabbur wahyu, zikir, dan amal saleh.',
            keterkaitanMateri: 'Mengajak siswa merawat fluktuasi iman melalui pembiasaan positif.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 35) & Al-Bukhari (No. 9)',
            kitab: 'Sahih Muslim, Kitab Al-Iman',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'الْإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً فَأَفْضَلُهَا قَوْلُ لَا إِلَهَ إِلَّا اللَّهُ وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ وَالْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ',
            latin: 'Al-īmānu biḍ‘un wa sab‘ūna syu‘batan, fa afḍaluhā qaulu lā ilāha illallāhu, wa adnāhā imāṭatul-ażā ‘aniṭ-ṭarīq, wal-ḥayā’u syu‘batun minal-īmān.',
            terjemah:
              'Iman itu ada tujuh puluh sekian cabang. Yang paling utama adalah ucapan Lā ilāha illallāh, yang paling rendah adalah menyingkirkan gangguan dari jalan, dan rasa malu itu bagian dari iman.',
            hikmahPedagogis: 'Menegaskan bahwa menjaga kebersihan lingkungan dan etika rasa malu adalah bagian dari iman.',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-3',
      nomorBab: 3,
      judulBab: 'Menjalani Hidup Penuh Manfaat: Menjauhi Hedonisme, Riya, Takabur & Hasad',
      kelas: 'Kelas 10',
      semester: 'Ganjil',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Mengevaluasi bahaya perilaku berfoya-foya (israf/tabzir), pamer (riya/sum’ah), sombong, dan dengki serta melatih qanaah dan ikhlas.',
      atpList: [
        {
          kode: 'ATP-E.3.1',
          kelas: 'Kelas 10',
          semester: 'Ganjil',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Menganalisis akar psikologis dan sosial dari perilaku flexing/berfoya-foya, riya, dan hasad serta merumuskan terapi akhlaknya.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Kemandirian', 'Kesehatan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'e-3-m1',
          kode: 'MAT-E.3.1',
          judul: 'Anti-Hedonisme, Ikhlas dari Riya, dan Terapi Penyakit Hati',
          ringkasan:
            'Menelaah fenomena pamer gaya hidup (flexing) dan iri dengki di media sosial dalam perspektif akhlak tasawuf modern.',
          kataKunci: ['Anti-Tabzir', 'Ikhlas', 'Qanaah', 'Tawadu'],
          ayatUtama: {
            surah: 'QS. Al-Isra’',
            ayat: '26 – 27',
            arab: 'وَلَا تُبَذِّرْ تَبْذِيْرًا ۝ اِنَّ الْمُبَذِّرِيْنَ كَانُوْٓا اِخْوَانَ الشَّيٰطِيْنِ',
            latin: 'Wa lā tubażżir tabżīrā. Innal-mubażżirīna kānū ikhwānasy-syayāṭīn.',
            terjemah: 'Dan janganlah kamu menghambur-hamburkan (hartamu) secara boros. Sesungguhnya orang-orang yang pemboros itu adalah saudara setan.',
            tafsirSingkat: 'Gaya hidup konsumtif dan berfoya-foya menjauhkan manusia dari syukur dan kepedulian sosial.',
            keterkaitanMateri: 'Membangun literasi finansial sederhana dan kesederhanaan di kalangan remaja.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 91)',
            kitab: 'Sahih Muslim, Kitab Al-Iman',
            derajat: 'Shahih',
            arab: 'لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ',
            latin: 'Lā yadkhulul-jannata man kāna fī qalbihī miṡqālu żarratin min kibr.',
            terjemah: 'Tidak akan masuk surga orang yang di dalam hatinya terdapat kesombongan walau sebesar biji sawi.',
            hikmahPedagogis: 'Mengingatkan bahaya merendahkan orang lain dan menolak kebenaran (takabur).',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-4',
      nomorBab: 4,
      judulBab: 'Kewajiban Umat: Tata Cara Pengurusan Jenazah (Fardu Kifayah)',
      kelas: 'Kelas 10',
      semester: 'Ganjil',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Memahami dan mensimulasikan empat kewajiban terhadap jenazah Muslim: memandikan, mengafani, menyalatkan, dan menguburkan.',
      atpList: [
        {
          kode: 'ATP-E.4.1',
          kelas: 'Kelas 10',
          semester: 'Ganjil',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Mempraktikkan tata cara pengurusan jenazah (memandikan, mengafani, salat jenazah 4 takbir) sesuai tuntunan fikih.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kolaborasi', 'Kemandirian'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'e-4-m1',
          kode: 'MAT-E.4.1',
          judul: 'Fardu Kifayah Pengurusan Jenazah dan Takziah Berempati',
          ringkasan:
            'Mempelajari bacaan salat jenazah empat takbir serta adab bertakziah untuk menguatkan keluarga yang berduka.',
          kataKunci: ['Pengurusan Jenazah', 'Fardu Kifayah', 'Salat Jenazah', 'Takziah'],
          ayatUtama: {
            surah: 'QS. Ali ‘Imran',
            ayat: '185',
            arab: 'كُلُّ نَفْسٍ ذَاۤىِٕقَةُ الْمَوْتِۗ وَاِنَّمَا تُوَفَّوْنَ اُجُوْرَكُمْ يَوْمَ الْقِيٰمَةِ',
            latin: 'Kullu nafsin żā’iqatul-maut, wa innamā tuwaffauna ujūrakum yaumal-qiyāmah.',
            terjemah: 'Setiap yang bernyawa akan merasakan mati. Dan hanya pada hari Kiamat sajalah diberikan dengan sempurna balasanmu.',
            tafsirSingkat: 'Kematian adalah kepastian yang mengingatkan manusia untuk memuliakan sesama hingga akhir hayatnya.',
            keterkaitanMateri: 'Membangun kesiapan pelajar berperan aktif dalam kepedulian sosial masyarakat.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 1325) dan Muslim (No. 945)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Jana’iz',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'مَنْ شَهِدَ الْجَنَازَةَ حَتَّى يُصَلَّى عَلَيْهَا فَلَهُ قِيرَاطٌ وَمَنْ شَهِدَهَا حَتَّى تُدْفَنَ فَلَهُ قِيرَاطَانِ',
            latin: 'Man syahidal-janāzata ḥattā yuṣallā ‘alaihā falahū qīrāṭ, wa man syahidahā ḥattā tudfana falahū qīrāṭān.',
            terjemah:
              'Barangsiapa menghadiri jenazah hingga menyalatkannya, maka baginya pahala satu qirath; dan barangsiapa menyaksikannya hingga dimakamkan, maka baginya dua qirath.',
            hikmahPedagogis: 'Memotivasi solidaritas sosial umat saat ada warga yang tertimpa musibah kematian.',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-5',
      nomorBab: 5,
      judulBab: 'Sejarah & Kearifan Masuknya Islam di Nusantara',
      kelas: 'Kelas 10',
      semester: 'Ganjil',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Mengkaji teori masuknya Islam ke Nusantara (Gujarat, Makkah, Persia, Cina) serta jalur perdagangan, pendidikan pesantren, dan perkawinan.',
      atpList: [
        {
          kode: 'ATP-E.5.1',
          kelas: 'Kelas 10',
          semester: 'Ganjil',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Menganalisis bukti sejarah jalur masuk dan berkembangnya Islam di Nusantara secara damai tanpa paksaan.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'e-5-m1',
          kode: 'MAT-E.5.1',
          judul: 'Jalur Damai Penyebaran Islam dan Peran Kerajaan Islam Awal',
          ringkasan:
            'Menelusuri peran Samudera Pasai, Kesultanan Demak, hingga jaringan ulama Nusantara dalam membumikan Islam.',
          kataKunci: ['Islam Nusantara', 'Samudera Pasai', 'Kesultanan Islam', 'Dakwah Damai'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '256',
            arab: 'لَآ اِكْرَاهَ فِى الدِّيْنِۗ قَدْ تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ',
            latin: 'Lā ikrāha fid-dīn, qat tabayyanar-rusydu minal-gayy.',
            terjemah: 'Tidak ada paksaan dalam (menganut) agama (Islam), sesungguhnya telah jelas jalan yang benar dari jalan yang sesat.',
            tafsirSingkat: 'Prinsip tiadanya paksaan menjadi alasan historis mengapa masyarakat Nusantara memeluk Islam secara sukarela.',
            keterkaitanMateri: 'Menjawab kesalahpahaman sejarah dengan fakta dakwah kultural dan perdagangan yang etis.',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 2594)',
            kitab: 'Sahih Muslim, Kitab Al-Birr was-Silah',
            derajat: 'Shahih',
            arab: 'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ',
            latin: 'Innar-rifqa lā yakūnu fī syai’in illā zānahū, wa lā yunza‘u min syai’in illā syānah.',
            terjemah: 'Sesungguhnya kelemahlembutan tidak berada pada sesuatu melainkan akan menghiasinya, dan tidak dicabut dari sesuatu melainkan akan memperburuknya.',
            hikmahPedagogis: 'Menjelaskan kunci sukses dakwah ulama Nusantara melalui akhlak yang santun.',
          },
        },
      ],
    },

    // SEMESTER 2 (GENAP)
    {
      id: 'fase-e-bab-6',
      nomorBab: 6,
      judulBab: 'Menjaga Kehormatan Diri & Menjauhi Pergaulan Bebas (QS. Al-Isra’: 32)',
      kelas: 'Kelas 10',
      semester: 'Genap',
      elemen: 'Al-Qur’an dan Hadis',
      deskripsiSingkat:
        'Mengkaji QS. Al-Isra’ ayat 32 dan QS. An-Nur ayat 2 tentang larangan mendekati perbuatan zina serta strategi menjaga kehormatan remaja.',
      atpList: [
        {
          kode: 'ATP-E.6.1',
          kelas: 'Kelas 10',
          semester: 'Genap',
          elemen: 'Al-Qur’an dan Hadis',
          tujuanPembelajaran:
            'Menganalisis hikmah larangan mendekati zina dalam QS. Al-Isra’: 32 serta merancang batasan pergaulan sehat dan bermartabat.',
          dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kesehatan', 'Penalaran Kritis'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'e-6-m1',
          kode: 'MAT-E.6.1',
          judul: 'Menjaga Iffah (Kehormatan Diri) & Pergaulan Remaja Sehat',
          ringkasan:
            'Memahami makna preventif "lā taqrabuz-zinā" (jangan dekati pintu-pintu zina) serta bahaya medis dan sosial pergaulan bebas.',
          kataKunci: ['Iffah', 'Al-Isra’ 32', 'Pergaulan Sehat', 'Menjaga Pandangan'],
          ayatUtama: {
            surah: 'QS. Al-Isra’',
            ayat: '32',
            arab: 'وَلَا تَقْرَبُوا الزِّنٰىٓ اِنَّهٗ كَانَ فَاحِشَةً ۗ وَسَاۤءَ سَبِيْلًا',
            latin: 'Wa lā taqrabuz-zinā innahū kāna fāḥisyah, wa sā’a sabīlā.',
            terjemah: 'Dan janganlah kamu mendekati zina; (zina) itu sungguh suatu perbuatan keji, dan suatu jalan yang buruk.',
            tafsirSingkat: 'Al-Qur’an melarang mendekati segala pemicunya, termasuk khalwat, konten pornografi, dan relasi tidak sehat.',
            keterkaitanMateri: 'Memberikan edukasi preventif kesehatan mental, sosial, dan moral pelajar SMA.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 660) dan Muslim (No. 1031)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Adzan',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'سَبْعَةٌ يُظِلُّهُمُ اللَّهُ فِي ظِلِّهِ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّهُ ... وَشَابٌّ نَشَأَ فِي عِبَادَةِ رَبِّهِ',
            latin: 'Sab‘atun yuẓilluhumullāhu fī ẓillihī yauma lā ẓilla illā ẓilluh... wa syābbun nasya’a fī ‘ibādati rabbih.',
            terjemah:
              'Tujuh golongan yang akan dinaungi Allah pada hari tiada naungan selain naungan-Nya... (di antaranya) seorang pemuda yang tumbuh dalam ibadah kepada Tuhannya.',
            hikmahPedagogis: 'Memotivasi pelajar SMA menjadikan masa muda produktif dan terhormat.',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-7',
      nomorBab: 7,
      judulBab: 'Menguatkan Akidah Tauhid di Era Transformasi Digital',
      kelas: 'Kelas 10',
      semester: 'Genap',
      elemen: 'Akidah',
      deskripsiSingkat:
        'Mengkaji cara menjaga kemurnian tauhid dari takhayul, ramalan digital, dan ketergantungan selain Allah Swt.',
      atpList: [
        {
          kode: 'ATP-E.7.1',
          kelas: 'Kelas 10',
          semester: 'Genap',
          elemen: 'Akidah',
          tujuanPembelajaran:
            'Mengevaluasi fenomena ramalan/klenik modern secara kritis berlandaskan tauhid uluhiyah dan rububiyah.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Keimanan dan Ketakwaan terhadap Tuhan YME'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'e-7-m1',
          kode: 'MAT-E.7.1',
          judul: 'Tauhid Rasional dan Menolak Praktik Syirik Modern',
          ringkasan:
            'Mengenal pentingnya berpikir ilmiah dan berpegang pada doa serta ikhtiar dibanding mempercayai zodiak/ramalan.',
          kataKunci: ['Tauhid', 'Anti-Khurafat', 'Berpikir Ilmiah', 'Tawakal'],
          ayatUtama: {
            surah: 'QS. An-Nahl',
            ayat: '53',
            arab: 'وَمَا بِكُمْ مِّنْ نِّعْمَةٍ فَمِنَ اللّٰهِ ثُمَّ اِذَا مَسَّكُمُ الضُّرُّ فَاِلَيْهِ تَجْـَٔرُوْنَ',
            latin: 'Wa mā bikum min ni‘matin faminallāhi ṡumma iżā massakumuḍ-ḍurru fa ilaihi taj’arūn.',
            terjemah: 'Dan segala nikmat yang ada padamu (datangnya) dari Allah, kemudian apabila kamu ditimpa kesengsaraan, maka kepada-Nyalah kamu meminta pertolongan.',
            tafsirSingkat: 'Sumber segala nikmat dan penolak mudarat hanya Allah Swt.',
            keterkaitanMateri: 'Melatih nalar sehat remaja agar tidak terjebak mitos irasional.',
          },
          hadisUtama: {
            perawi: 'HR. Ahmad (No. 9532) & At-Tirmidzi',
            kitab: 'Musnad Ahmad',
            derajat: 'Shahih',
            arab: 'مَنْ أَتَى عَرَّافًا أَوْ كَاهِنًا فَصَدَّقَهُ بِمَا يَقُولُ فَقَدْ كَفَرَ بِمَا أُنْزِلَ عَلَى مُحَمَّدٍ',
            latin: 'Man atā ‘arrāfan au kāhinan faṣaddaqahū bimā yaqūlu faqad kafara bimā unzila ‘alā Muḥammad.',
            terjemah: 'Barangsiapa mendatangi peramal atau dukun lalu membenarkan apa yang dikatakannya, maka ia telah mengingkari wahyu yang diturunkan kepada Nabi Muhammad saw.',
            hikmahPedagogis: 'Meneguhkan kemurnian iman dan rasionalitas pelajar.',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-8',
      nomorBab: 8,
      judulBab: 'Mengendalikan Amarah (Ghadab), Berani Membela Kebenaran (Syaja’ah)',
      kelas: 'Kelas 10',
      semester: 'Genap',
      elemen: 'Akhlak',
      deskripsiSingkat:
        'Melatih kecerdasan emosional Islami dalam meredam amarah dan menumbuhkan keberanian moral (syaja’ah) menghadapi tekanan teman sebaya.',
      atpList: [
        {
          kode: 'ATP-E.8.1',
          kelas: 'Kelas 10',
          semester: 'Genap',
          elemen: 'Akhlak',
          tujuanPembelajaran:
            'Mempraktikkan strategi pengendalian amarah (mujahadah an-nafs) dan sikap syaja’ah dalam menolak perundungan serta ketidakadilan.',
          dimensiProfilLulusan: ['Kesehatan', 'Kemandirian', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'e-8-m1',
          kode: 'MAT-E.8.1',
          judul: 'Mujahadah an-Nafs dan Syaja’ah dalam Kehidupan Pelajar',
          ringkasan:
            'Membedakan keberanian terpuji (syaja’ah) dengan nekat/tawuran, serta teknik mengelola emosi saat terprovokasi.',
          kataKunci: ['Syaja’ah', 'Mujahadah an-Nafs', 'Anti-Tawuran', 'Kecerdasan Emosi'],
          ayatUtama: {
            surah: 'QS. Ali ‘Imran',
            ayat: '134',
            arab: 'الَّذِيْنَ يُنْفِقُوْنَ فِى السَّرَّۤاءِ وَالضَّرَّۤاءِ وَالْكٰظِمِيْنَ الْغَيْظَ وَالْعَافِيْنَ عَنِ النَّاسِ',
            latin: 'Allażīna yunfiqūna fis-sarrā’i waḍ-ḍarrā’i wal-kāẓimīnal-gaiẓa wal-‘āfīna ‘anin-nās.',
            terjemah: '(Yaitu) orang-orang yang berinfak, baik di waktu lapang maupun sempit, dan orang-orang yang menahan amarahnya dan memaafkan (kesalahan) orang lain.',
            tafsirSingkat: 'Kekuatan karakter sejati tampak ketika seseorang mampu menguasai emosinya dan memaafkan.',
            keterkaitanMateri: 'Mendukung iklim sekolah aman dan pencegahan kekerasan remaja.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 6114) dan Muslim (No. 2609)',
            kitab: 'Sahih Al-Bukhari, Kitab Al-Adab',
            derajat: 'Shahih (Muttafaq ‘Alaih)',
            arab: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
            latin: 'Laisasy-syadīdu biṣ-ṣura‘ah, innamasy-syadīdul-lażī yamliku nafsahū ‘indal-gaḍab.',
            terjemah: 'Orang yang kuat bukanlah yang menang bergulat, melainkan orang yang mampu mengendalikan dirinya ketika marah.',
            hikmahPedagogis: 'Mengubah definisi "kuat" bagi remaja dari kekerasan fisik menjadi kematangan kendali diri.',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-9',
      nomorBab: 9,
      judulBab: 'Ekonomi Syariah: Bank, Asuransi, dan Koperasi Syariah',
      kelas: 'Kelas 10',
      semester: 'Genap',
      elemen: 'Fikih',
      deskripsiSingkat:
        'Menganalisis prinsip bebas riba, gharar, dan maisir dalam lembaga keuangan syariah serta membandingkannya dengan praktik ekonomi kontemporer.',
      atpList: [
        {
          kode: 'ATP-E.9.1',
          kelas: 'Kelas 10',
          semester: 'Genap',
          elemen: 'Fikih',
          tujuanPembelajaran:
            'Menganalisis akad-akad muamalah dalam bank, asuransi, dan koperasi syariah serta mengevaluasi urgensinya bagi keadilan ekonomi umat.',
          dimensiProfilLulusan: ['Penalaran Kritis', 'Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kewargaan'],
          alokasiJP: 6,
        },
      ],
      materiList: [
        {
          id: 'e-9-m1',
          kode: 'MAT-E.9.1',
          judul: 'Prinsip Akad Syariah dan Penghindaran Riba',
          ringkasan:
            'Mengenal perbedaan jual beli/bagi hasil (mudharabah, musyarakah, murabahah) dengan praktik riba sesuai fikih muamalah.',
          kataKunci: ['Ekonomi Syariah', 'Anti-Riba', 'Mudharabah', 'Murabahah'],
          ayatUtama: {
            surah: 'QS. Al-Baqarah',
            ayat: '275',
            arab: 'وَاَحَلَّ اللّٰهُ الْبَيْعَ وَحَرَّمَ الرِّبٰوا',
            latin: 'Wa aḥallallāhul-bai‘a wa ḥarramar-ribā.',
            terjemah: 'Padahal Allah telah menghalalkan jual beli dan mengharamkan riba.',
            tafsirSingkat: 'Jual beli dan kemitraan usaha menggerakkan sektor riil secara adil, sedangkan riba mengeksploitasi.',
            keterkaitanMateri: 'Fondasi literasi keuangan syariah (termasuk menghindari pinjaman online berbunga tinggi).',
          },
          hadisUtama: {
            perawi: 'HR. Muslim (No. 1598)',
            kitab: 'Sahih Muslim, Kitab Al-Musaqah',
            derajat: 'Shahih',
            arab: 'لَعَنَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ آكِلَ الرِّبَا وَمُؤْكِلَهُ وَكَاتِبَهُ وَشَاهِدَيْهِ وَقَالَ هُمْ سَوَاءٌ',
            latin: 'La‘ana rasūlullāhi ṣallallāhu ‘alaihi wa sallama ākilār-ribā wa mūkilahū wa kātibahū wa syāhidaihi wa qāla: hum sawā’.',
            terjemah: 'Rasulullah saw. melaknat pemakan riba, pemberi makan riba, penulisnya, dan dua saksinya.',
            hikmahPedagogis: 'Menyadarkan siswa pentingnya akad transaksi yang adil dan transparan.',
          },
        },
      ],
    },
    {
      id: 'fase-e-bab-10',
      nomorBab: 10,
      judulBab: 'Keteladanan Dakwah Kultural Wali Songo di Tanah Jawa',
      kelas: 'Kelas 10',
      semester: 'Genap',
      elemen: 'Sejarah Peradaban Islam',
      deskripsiSingkat:
        'Mengkaji strategi dakwah bijaksana Wali Songo (Sunan Kalijaga, Sunan Ampel, Sunan Gunung Jati, dll.) melalui pendidikan, seni, dan pemberdayaan ekonomi.',
      atpList: [
        {
          kode: 'ATP-E.10.1',
          kelas: 'Kelas 10',
          semester: 'Genap',
          elemen: 'Sejarah Peradaban Islam',
          tujuanPembelajaran:
            'Mengevaluasi strategi dakwah kultural Wali Songo dan merumuskan relevansinya untuk dakwah kreatif di era media digital.',
          dimensiProfilLulusan: ['Kreativitas', 'Kewargaan', 'Komunikasi'],
          alokasiJP: 4,
        },
      ],
      materiList: [
        {
          id: 'e-10-m1',
          kode: 'MAT-E.10.1',
          judul: 'Akulturasi Budaya dan Dakwah Kreatif Wali Songo',
          ringkasan:
            'Mempelajari filosofi Moh Limo Sunan Ampel serta pendekatan seni tembang dan wayang Sunan Kalijaga dalam menyebarkan tauhid.',
          kataKunci: ['Wali Songo', 'Dakwah Kultural', 'Moh Limo', 'Kearifan Lokal'],
          ayatUtama: {
            surah: 'QS. Ali ‘Imran',
            ayat: '104',
            arab: 'وَلْتَكُنْ مِّنْكُمْ اُمَّةٌ يَّدْعُوْنَ اِلَى الْخَيْرِ وَيَأْمُرُوْنَ بِالْمَعْرُوْفِ وَيَنْهَوْنَ عَنِ الْمُنْكَرِ',
            latin: 'Waltakum minkum ummatuy yad‘ūna ilal-khairi wa ya’murūna bil-ma‘rūfi wa yanhauna ‘anil-munkar.',
            terjemah:
              'Dan hendaklah ada di antara kamu segolongan umat yang menyeru kepada kebajikan, menyuruh kepada yang makruf, dan mencegah dari yang mungkar.',
            tafsirSingkat: 'Dakwah menyeru kepada kebaikan membutuhkan metode yang dapat diterima hati masyarakat.',
            keterkaitanMateri: 'Menginspirasi dakwah konten kreatif dan santun oleh generasi muda.',
          },
          hadisUtama: {
            perawi: 'HR. Al-Bukhari (No. 3461)',
            kitab: 'Sahih Al-Bukhari, Kitab Ahadits Al-Anbiya’',
            derajat: 'Shahih',
            arab: 'بَلِّغُوا عَنِّي وَلَوْ آيَةً',
            latin: 'Balligū ‘annī walau āyah.',
            terjemah: 'Sampaikanlah dariku walau hanya satu ayat.',
            hikmahPedagogis: 'Mendorong setiap pelajar berani menebar kebaikan yang dipahaminya dengan cara yang bijak.',
          },
        },
      ],
    },
  ],
};
