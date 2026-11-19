import type { FaseKurikulum2026 } from '../../types/curriculum';

export const MADRASAH_MI_FASES: FaseKurikulum2026[] = [
  {
    fase: 'A',
    jenjang: 'SD/MI',
    jalur: 'Madrasah (Kemenag RI)',
    kelasRentang: 'Kelas 1 – 2 MI',
    labelLengkap: 'Fase A · Madrasah Ibtidaiyah (MI Kelas I & II)',
    rasional2026:
      'Kurikulum Madrasah Ibtidaiyah Fase A (Kemenag RI 2026) membagi rumpun PAI menjadi mata pelajaran khusus: Al-Qur’an Hadis, Akidah Akhlak, Fikih, Sejarah Kebudayaan Islam (SKI pengenalan kisah nabi), dan Bahasa Arab dasar secara utuh pada Semester 1 (Ganjil) dan Semester 2 (Genap).',
    capaianPembelajaran: [
      {
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiCP:
          'Peserta didik MI mengenal huruf hijaiyah, harakat, Surah Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlas, Al-Lahab, serta hadis tentang kebersihan dan berbakti kepada orang tua.',
      },
      {
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiCP:
          'Peserta didik MI memahami kalimat tayyibah (Basmalah, Hamdalah, Ta’awuz), dua kalimat syahadat, Asmaul Husna (Al-Ahad, Al-Khaliq, Al-Hafiz, Al-Wali), serta adab belajar dan hidup rukun.',
      },
      {
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiCP:
          'Peserta didik MI memahami rukun Islam, tata cara istinja, wudu, tayamum sederhana, azan, ikamah, serta gerakan dan bacaan salat fardu.',
      },
      {
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiCP:
          'Peserta didik MI mengenal kisah kelahiran, masa kanak-kanak (Al-Amin), serta akhlak mulia keluarga Nabi Muhammad saw. sebagai fondasi awal Sejarah Kebudayaan Islam.',
      },
      {
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiCP:
          'Peserta didik MI mampu menyimak, mengucapkan, membaca, dan menyalin kosakata bahasa Arab tema Ta’aruf (perkenalan), Usrati (keluarga), dan Adawatul Madrasah (perlengkapan sekolah).',
      },
    ],
    babList: [
      {
        id: 'mi-a-qh-1',
        nomorBab: 1,
        judulBab: 'Al-Qur’an Hadis: Huruf Hijaiyah, Surah Al-Fatihah & An-Nas',
        kelas: 'Kelas 1 MI',
        semester: 'Ganjil',
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiSingkat:
          'Mengenal huruf hijaiyah bertanda baca fathah, kasrah, dammah serta menghafal dan memahami Surah Al-Fatihah dan An-Nas.',
        atpList: [
          {
            kode: 'ATP-MI.QH.A1',
            kelas: 'Kelas 1 MI',
            semester: 'Ganjil',
            elemen: 'Al-Qur’an dan Hadis',
            mapel: 'Al-Qur’an Hadis',
            tujuanPembelajaran:
              'Melafalkan huruf hijaiyah berharakat dan Surah Al-Fatihah dengan makhraj tepat sebagai pembiasaan membaca Al-Qur’an setiap hari.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-a-qh-m1',
            kode: 'MAT-MI.QH.A1',
            judul: 'Mengenal Surah Al-Fatihah sebagai Ummul Qur’an',
            ringkasan:
              'Membaca, menghafal, dan meneladani kandungan kasih sayang Allah (Ar-Rahman Ar-Rahim) dalam Surah Al-Fatihah.',
            kataKunci: ['Ummul Qur’an', 'Al-Fatihah', 'Harakat', 'Makharijul Huruf'],
            ayatUtama: {
              surah: 'QS. Al-Fatihah',
              ayat: '1 – 4',
              arab: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ۝ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ ۝ الرَّحْمٰنِ الرَّحِيْمِ ۝ مٰلِكِ يَوْمِ الدِّيْنِ ۝',
              latin:
                'Bismillāhir-raḥmānir-raḥīm. Al-ḥamdu lillāhi rabbil-‘ālamīn. Ar-raḥmānir-raḥīm. Māliki yaumid-dīn.',
              terjemah:
                'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam, Yang Maha Pengasih, Maha Penyayang, Pemilik hari pembalasan.',
              tafsirSingkat:
                'Surah Al-Fatihah merupakan induk Al-Qur’an yang wajib dibaca dalam setiap rakaat salat.',
              keterkaitanMateri:
                'Menjadi bahan utama talaqqi membaca Al-Qur’an pada mapel Al-Qur’an Hadis MI Kelas 1.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 5027)',
              kitab: 'Sahih Al-Bukhari',
              derajat: 'Shahih',
              arab: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
              latin: 'Khairukum man ta‘allamal-Qur’āna wa ‘allamah.',
              terjemah:
                'Sebaik-baik kalian adalah orang yang belajar Al-Qur’an dan mengajarkannya.',
              hikmahPedagogis:
                'Menumbuhkan kebanggaan siswa MI sebagai pelajar yang mencintai Al-Qur’an.',
            },
          },
        ],
      },
      {
        id: 'mi-a-aa-1',
        nomorBab: 2,
        judulBab: 'Akidah Akhlak: Kalimat Tayyibah Basmalah, Hamdalah & Adab Hidup Bersih',
        kelas: 'Kelas 1 MI',
        semester: 'Ganjil',
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiSingkat:
          'Membiasakan mengucap Basmalah sebelum memulai kegiatan, Hamdalah sesudah mendapat nikmat, dan menjaga kebersihan.',
        atpList: [
          {
            kode: 'ATP-MI.AA.A1',
            kelas: 'Kelas 1 MI',
            semester: 'Ganjil',
            elemen: 'Akidah',
            mapel: 'Akidah Akhlak',
            tujuanPembelajaran:
              'Membiasakan pengucapan kalimat Basmalah dan Hamdalah dalam aktivitas harian disertai adab bersyukur dan menjaga kebersihan.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kesehatan'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-a-aa-m1',
            kode: 'MAT-MI.AA.A1',
            judul: 'Membiasakan Kalimat Tayyibah (Basmalah & Hamdalah)',
            ringkasan:
              'Mengenal keutamaan mengawali pekerjaan baik dengan Bismillahirrahmanirrahim dan mengakhirinya dengan Alhamdulillah.',
            kataKunci: ['Kalimat Tayyibah', 'Basmalah', 'Hamdalah', 'Syukur'],
            ayatUtama: {
              surah: 'QS. Al-An’am',
              ayat: '121',
              arab: 'وَلَا تَأْكُلُوْا مِمَّا لَمْ يُذْكَرِ اسْمُ اللّٰهِ عَلَيْهِ',
              latin: 'Wa lā ta’kulū mimmā lam yużkarismullāhi ‘alaihi.',
              terjemah: 'Dan janganlah kamu memakan dari apa yang tidak disebut nama Allah atasnya.',
              tafsirSingkat:
                'Menyebut nama Allah (Basmalah) mendatangkan keberkahan dalam makanan, belajar, dan segala aktivitas baik.',
              keterkaitanMateri:
                'Membiasakan siswa MI membaca basmalah dan doa sebelum makan serta belajar.',
            },
            hadisUtama: {
              perawi: 'HR. Ibnu Hibban & An-Nasa’i',
              kitab: 'As-Sunan Al-Kubra',
              derajat: 'Hasan',
              arab: 'كُلُّ أَمْرٍ ذِي بَالٍ لَا يُبْدَأُ فِيهِ بِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ فَهُوَ أَقْطَعُ',
              latin:
                'Kullu amrin żī bālin lā yubda’u fīhi bibismillāhir-raḥmānir-raḥīm fahuwa aqṭa‘.',
              terjemah:
                'Setiap perkara penting yang tidak dimulai dengan Bismillahirrahmanirrahim maka terputus (kurang berkahnya).',
              hikmahPedagogis:
                'Melatih anak memulai setiap tugas sekolah dengan kesadaran spiritual.',
            },
          },
        ],
      },
      {
        id: 'mi-a-fk-2',
        nomorBab: 3,
        judulBab: 'Fikih: Tata Cara Wudu, Tayamum, dan Azan-Ikamah',
        kelas: 'Kelas 2 MI',
        semester: 'Genap',
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiSingkat:
          'Memahami rukun, sunah, hal yang membatalkan wudu, praktik tayamum saat darurat, serta lafal azan dan ikamah.',
        atpList: [
          {
            kode: 'ATP-MI.FK.A2',
            kelas: 'Kelas 2 MI',
            semester: 'Genap',
            elemen: 'Fikih',
            mapel: 'Fikih',
            tujuanPembelajaran:
              'Mempraktikkan urutan wudu secara tertib beserta doanya serta melafalkan azan dan ikamah dengan benar.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-a-fk-m2',
            kode: 'MAT-MI.FK.A2',
            judul: 'Rukun Wudu dan Kesucian Sebelum Salat',
            ringkasan:
              'Membedakan rukun dan sunah wudu, menjaga tertib anggota wudu, serta adab menjawab azan.',
            kataKunci: ['Rukun Wudu', 'Sunah Wudu', 'Azan', 'Ikamah'],
            ayatUtama: {
              surah: 'QS. Al-Ma’idah',
              ayat: '6',
              arab: 'يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْٓا اِذَا قُمْتُمْ اِلَى الصَّلٰوةِ فَاغْسِلُوْا وُجُوْهَكُمْ وَاَيْدِيَكُمْ اِلَى الْمَرَافِقِ وَامْسَحُوْا بِرُءُوْسِكُمْ وَاَرْجُلَكُمْ اِلَى الْكَعْبَيْنِ',
              latin:
                'Yā ayyuhal-lażīna āmanū iżā qumtum ilaṣ-ṣalāti fagsilū wujūhakum wa aidiyakum ilal-marāfiqi wamsaḥū biru’ūsikum wa arjulakum ilal-ka‘bain.',
              terjemah:
                'Wahai orang-orang yang beriman! Apabila kamu hendak melaksanakan salat, maka basuhlah wajahmu dan tanganmu sampai ke siku, dan usaplah kepalamu dan (basuh) kedua kakimu sampai ke kedua mata kaki.',
              tafsirSingkat:
                'Ayat ini menetapkan empat anggota pokok wudu yang wajib dibasuh/diusap secara tertib.',
              keterkaitanMateri:
                'Menjadi pedoman langsung praktik wudu siswa Madrasah Ibtidaiyah.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 135) & Muslim (No. 225)',
              kitab: 'Sahih Al-Bukhari & Muslim',
              derajat: 'Shahih (Muttafaq ‘Alaih)',
              arab: 'لَا تُقْبَلُ صَلَاةُ مَنْ أَحْدَثَ حَتَّى يَتَوَضَّأَ',
              latin: 'Lā tuqbalu ṣalātu man aḥdaṡa ḥattā yatawaḍḍa’.',
              terjemah:
                'Tidak diterima salat seseorang yang berhadas hingga ia berwudu terlebih dahulu.',
              hikmahPedagogis:
                'Menekankan pentingnya kesucian sebagai syarat sah salat.',
            },
          },
        ],
      },
      {
        id: 'mi-a-ba-2',
        nomorBab: 4,
        judulBab: 'Bahasa Arab: أَدَوَاتُ الْمَدْرَسَةِ وَأَفْرَادُ الْأُسْرَةِ (Perlengkapan Sekolah & Keluarga)',
        kelas: 'Kelas 1 – 2 MI',
        semester: 'Genap',
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiSingkat:
          'Mengenal kosakata benda di kelas (Kitabun, Qalamun, Maktabun) dan anggota keluarga (Abun, Ummun, Akhun) melalui lagu dan dialog sederhana.',
        atpList: [
          {
            kode: 'ATP-MI.BA.A2',
            kelas: 'Kelas 2 MI',
            semester: 'Genap',
            elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
            mapel: 'Bahasa Arab',
            tujuanPembelajaran:
              'Mengidentifikasi makna kosakata bahasa Arab tentang perlengkapan sekolah dan keluarga serta mempraktikkan sapaan sederhana (Hāżā qalamun).',
            dimensiProfilLulusan: ['Komunikasi', 'Kreativitas'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-a-ba-m2',
            kode: 'MAT-MI.BA.A2',
            judul: 'Kosakata Peralatan Belajar (Adawatul Madrasah) & Kalimat Isyarat Hāżā/Hāżihi',
            ringkasan:
              'Berlatih istima’ dan kalam menggunakan pola tunjuk Hāżā (muzakkar) dan Hāżihi (mu’annats) untuk benda-benda di kelas.',
            kataKunci: ['Adawatul Madrasah', 'Muzakkar', 'Mu’annats', 'Kalam'],
            ayatUtama: {
              surah: 'QS. Al-‘Alaq',
              ayat: '4 – 5',
              arab: 'الَّذِيْ عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْاِنْسَانَ مَا لَمْ يَعْلَمْ ۝',
              latin: 'Allażī ‘allama bil-qalam. ‘Allamal-insāna mā lam ya‘lam.',
              terjemah:
                'Yang mengajar (manusia) dengan pena. Dia mengajarkan manusia apa yang tidak diketahuinya.',
              tafsirSingkat:
                'Kata Al-Qalam (pena) dalam Al-Qur’an menjadi simbol alat tulis dan literasi ilmu pengetahuan.',
              keterkaitanMateri:
                'Menghubungkan kosakata bahasa Arab "Qalamun" (قَلَمٌ) dengan semangat menulis dan mencintai Al-Qur’an.',
            },
            hadisUtama: {
              perawi: 'HR. At-Tirmidzi (No. 3689)',
              kitab: 'Jami’ At-Tirmidzi',
              derajat: 'Hasan Shahih',
              arab: 'أَحِبُّوا الْعَرَبَ لِثَلَاثٍ لِأَنِّي عَرَبِيٌّ وَالْقُرْآنُ عَرَبِيٌّ وَكَلَامُ أَهْلِ الْجَنَّةِ عَرَبِيٌّ',
              latin:
                'Aḥibbul-‘araba liṡalāṡin: li’annī ‘arabiyyun, wal-Qur’ānu ‘arabiyyun, wa kalāmu ahlil-jannati ‘arabiyyun.',
              terjemah:
                'Cintailah bahasa/bangsa Arab karena tiga hal: karena aku berbangsa Arab, Al-Qur’an berbahasa Arab, dan ucapan ahli surga berbahasa Arab.',
              hikmahPedagogis:
                'Menumbuhkan motivasi siswa MI mencintai pelajaran Bahasa Arab sebagai kunci memahami Al-Qur’an.',
            },
          },
        ],
      },
      {
        id: 'mi-a-ski-1',
        nomorBab: 5,
        judulBab: 'SKI: Peristiwa Tahun Gajah dan Kelahiran Nabi Muhammad saw.',
        kelas: 'Kelas 1 – 2 MI',
        semester: 'Ganjil',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Mengenal kisah penjagaan Ka’bah dari pasukan bergajah Abrahah serta kelahiran Nabi Muhammad saw. sebagai pembawa rahmat bagi alam semesta.',
        atpList: [
          {
            kode: 'ATP-MI.SKI.A1',
            kelas: 'Kelas 1 – 2 MI',
            semester: 'Ganjil',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Menceritakan kembali peristiwa Tahun Gajah dan kisah kelahiran Nabi Muhammad saw. dengan penuh rasa syukur dan cinta Rasul.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Komunikasi'],
            alokasiJP: 3,
          },
        ],
        materiList: [
          {
            id: 'mi-a-ski-m1',
            kode: 'MAT-MI.SKI.A1',
            judul: 'Kisah Tahun Gajah (Surah Al-Fil) dan Kelahiran Sang Pembawa Rahmat',
            ringkasan:
              'Mempelajari bagaimana Allah swt. menjaga Baitullah dari pasukan Abrahah menjelang kelahiran Nabi Muhammad saw. pada 12 Rabiul Awal Tahun Gajah.',
            kataKunci: ['Tahun Gajah', 'Kelahiran Nabi', 'Surah Al-Fil', 'Cinta Rasul'],
            ayatUtama: {
              surah: 'QS. Al-Fil',
              ayat: '1 – 3',
              arab: 'اَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِاَصْحٰبِ الْفِيْلِۗ ۝ اَلَمْ يَجْعَلْ كَيْدَهُمْ فِيْ تَضْلِيْلٍۙ ۝ وَّاَرْسَلَ عَلَيْهِمْ طَيْرًا اَبَابِيْلَۙ ۝',
              latin:
                'Alam tara kaifa fa‘ala rabbuka bi’aṣḥābil-fīl. Alam yaj‘al kaidahum fī taḍlīl. Wa arsala ‘alaihim ṭairan abābīl.',
              terjemah:
                'Tidakkah engkau (Muhammad) perhatikan bagaimana Tuhanmu telah bertindak terhadap pasukan bergajah? Bukankah Dia telah menjadikan tipu daya mereka itu sia-sia? Dan Dia mengirimkan kepada mereka burung yang berbondong-bondong.',
              tafsirSingkat:
                'Peristiwa Tahun Gajah menjadi bukti nyata kekuasaan Allah melindungi kota suci Makkah sebelum kelahiran Rasulullah saw.',
              keterkaitanMateri:
                'Menjadi kisah pembuka pengenalan Sejarah Kebudayaan Islam (SKI) jenjang MI Kelas 1–2.',
            },
            hadisUtama: {
              perawi: 'HR. Muslim (No. 1162)',
              kitab: 'Sahih Muslim, Kitab As-Siyam',
              derajat: 'Shahih',
              arab: 'ذَاكَ يَوْمٌ وُلِدْتُ فِيهِ وَيَوْمٌ بُعِثْتُ أَوْ أُنْزِلَ عَلَيَّ فِيهِ',
              latin: 'Żāka yaumun wulidtu fīhi wa yaumun bu‘iṡtu au unzila ‘alayya fīh.',
              terjemah:
                'Hari Senin itu adalah hari aku dilahirkan, hari aku diutus, atau hari diturunkannya wahyu kepadaku.',
              hikmahPedagogis:
                'Menanamkan kegembiraan dan rasa syukur siswa mengenal hari kelahiran Nabi Muhammad saw.',
            },
          },
        ],
      },
      {
        id: 'mi-a-ski-2',
        nomorBab: 6,
        judulBab: 'SKI: Masa Kecil Nabi Muhammad saw. & Keteladanan Gelar Al-Amin',
        kelas: 'Kelas 2 MI',
        semester: 'Genap',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Meneladani akhlak jujur, amanah, mandiri, dan penyayang Nabi Muhammad saw. sejak diasuh Halimah Sa’diyah, Abdul Muthalib, hingga Abu Thalib.',
        atpList: [
          {
            kode: 'ATP-MI.SKI.A2',
            kelas: 'Kelas 2 MI',
            semester: 'Genap',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Mengidentifikasi keteladanan sifat jujur (Al-Amin), sabar, dan mandiri pada masa kanak-kanak Nabi Muhammad saw. untuk dipraktikkan di sekolah dan rumah.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
            alokasiJP: 3,
          },
        ],
        materiList: [
          {
            id: 'mi-a-ski-m2',
            kode: 'MAT-MI.SKI.A2',
            judul: 'Kejujuran & Kemandirian Masa Kecil Muhammad saw. (Al-Amin)',
            ringkasan:
              'Mengisahkan masa kecil Nabi sebagai penggembala kambing yang amanah dan berakhlak mulia hingga mendapat gelar Al-Amin (orang yang tepercaya).',
            kataKunci: ['Masa Kecil Nabi', 'Al-Amin', 'Mandiri', 'Amanah'],
            ayatUtama: {
              surah: 'QS. Ad-Duha',
              ayat: '6 – 8',
              arab: 'اَلَمْ يَجِدْكَ يَتِيْمًا فَاٰوٰىۖ ۝ وَوَجَدَكَ ضَاۤلًّا فَهَدٰىۖ ۝ وَوَجَدَكَ عَاۤىِٕلًا فَاَغْنٰىۗ ۝',
              latin:
                'Alam yajidka yatīman fa’āwā. Wa wajadaka ḍāllan fahadā. Wa wajadaka ‘ā’ilan fa’agnā.',
              terjemah:
                'Bukankah Dia mendapatimu sebagai seorang yatim, lalu Dia melindungi(mu), dan Dia mendapatimu sebagai seorang yang bingung, lalu Dia memberikan petunjuk, dan Dia mendapatimu sebagai seorang yang kekurangan, lalu Dia memberikan kecukupan.',
              tafsirSingkat:
                'Allah swt. senantiasa memelihara masa kecil Nabi Muhammad saw. yang tumbuh sebagai anak yatim penuh kemuliaan.',
              keterkaitanMateri:
                'Mengaitkan sejarah pengasuhan masa kecil Rasulullah saw. dengan rasa syukur dan kasih sayang kepada anak yatim.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 2262)',
              kitab: 'Sahih Al-Bukhari, Kitab Al-Ijarah',
              derajat: 'Shahih',
              arab: 'مَا بَعَثَ اللَّهُ نَبِيًّا إِلَّا رَعَى الْغَنَمَ',
              latin: 'Mā ba‘aṡallāhu nabiyyan illā ra‘al-ganam.',
              terjemah:
                'Tidaklah Allah mengutus seorang nabi melainkan ia pernah menggembalakan kambing.',
              hikmahPedagogis:
                'Melatih kemandirian, kesabaran, dan tanggung jawab siswa MI melalui kisah masa kecil Rasulullah saw.',
            },
          },
        ],
      },
    ],
  },
  {
    fase: 'B',
    jenjang: 'SD/MI',
    jalur: 'Madrasah (Kemenag RI)',
    kelasRentang: 'Kelas 3 – 4 MI',
    labelLengkap: 'Fase B · Madrasah Ibtidaiyah (MI Kelas III & IV)',
    rasional2026:
      'Kurikulum Madrasah Ibtidaiyah Fase B memperdalam Al-Qur’an Hadis (tajwid hukum izhar/ikhfa dan hadis silaturahmi), Akidah Akhlak (Asmaul Husna & adab berteman), Fikih (salat sunah, zakat fitrah awal, tanda balig), SKI (dakwah awal Rasulullah saw. di Makkah dan hijrah ke Habasyah), serta Bahasa Arab tema sekolah dan hobi pada Semester 1 & 2.',
    capaianPembelajaran: [
      {
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiCP:
          'Peserta didik memahami hukum bacaan Qalqalah, Izhar, dan Ikhfa, Surah Al-‘Asr, At-Takasur, Al-Qari’ah, serta hadis tentang keutamaan salat berjemaah dan silaturahmi.',
      },
      {
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiCP:
          'Peserta didik memahami kalimat tayyibah Subhanallah, Masyaallah, Allahu Akbar, iman kepada malaikat dan kitab-kitab Allah, serta akhlak amanah dan pantang menyerah.',
      },
      {
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiCP:
          'Peserta didik memahami ketentuan salat sunah rawatib, salat Jumat, rukhsah salat bagi musafir dan orang sakit, serta tanda-tanda balig.',
      },
      {
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiCP:
          'Peserta didik memahami tradisi masyarakat Arab pra-Islam, masa kerasulan Nabi Muhammad saw., ketabahan menghadapi kaum Quraisy, dan peristiwa Isra’ Mikraj.',
      },
      {
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiCP:
          'Peserta didik memahami dan mempraktikkan dialog bahasa Arab sederhana tentang Asma’ul Hayawanat (hewan), Al-Mihnatu (profesi), dan Al-Amalul Yaumiyyah (aktivitas harian).',
      },
    ],
    babList: [
      {
        id: 'mi-b-qh-1',
        nomorBab: 1,
        judulBab: 'Al-Qur’an Hadis: Hukum Bacaan Qalqalah & Surah Al-‘Asr',
        kelas: 'Kelas 3 – 4 MI',
        semester: 'Ganjil',
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiSingkat:
          'Memahami lima huruf qalqalah (Qalqalah Sugra & Kubra) serta menghargai waktu dalam Surah Al-‘Asr.',
        atpList: [
          {
            kode: 'ATP-MI.QH.B1',
            kelas: 'Kelas 4 MI',
            semester: 'Ganjil',
            elemen: 'Al-Qur’an dan Hadis',
            mapel: 'Al-Qur’an Hadis',
            tujuanPembelajaran:
              'Mengidentifikasi bacaan Qalqalah Sugra dan Kubra dalam surah pendek serta membiasakan disiplin waktu sesuai QS. Al-‘Asr.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-b-qh-m1',
            kode: 'MAT-MI.QH.B1',
            judul: 'Manajemen Waktu dan Amal Saleh dalam QS. Al-‘Asr',
            ringkasan:
              'Membaca tartil QS. Al-‘Asr ayat 1–3, mempraktikkan hukum tajwid, dan menyusun jadwal disiplin belajar-ibadah.',
            kataKunci: ['Al-‘Asr', 'Qalqalah', 'Disiplin Waktu', 'Amal Saleh'],
            ayatUtama: {
              surah: 'QS. Al-‘Asr',
              ayat: '1 – 3',
              arab: 'وَالْعَصْرِۙ ۝ اِنَّ الْاِنْسَانَ لَفِيْ خُسْرٍۙ ۝ اِلَّا الَّذِيْنَ اٰمَنُوْا وَعَمِلُوا الصّٰلِحٰتِ وَتَوَاصَوْا بِالْحَقِّ ەۙ وَتَوَاصَوْا بِالصَّبْرِ ۝',
              latin:
                'Wal-‘aṣr. Innal-insāna lafī khusr. Illal-lażīna āmanū wa ‘amiluṣ-ṣāliḥāti wa tawāṣau bil-ḥaqqi wa tawāṣau biṣ-ṣabr.',
              terjemah:
                'Demi masa. Sungguh, manusia berada dalam kerugian, kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran.',
              tafsirSingkat:
                'Empat kunci agar manusia tidak merugi sepanjang hidupnya: iman, amal saleh, saling menasihati dalam kebenaran, dan kesabaran.',
              keterkaitanMateri:
                'Menjadi landasan pembentukan karakter disiplin dan saling mengingatkan dalam kebaikan.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 6412)',
              kitab: 'Sahih Al-Bukhari, Kitab Ar-Riqaq',
              derajat: 'Shahih',
              arab: 'نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ الصِّحَّةُ وَالْفَرَاغُ',
              latin: 'Ni‘matāni magbūnun fīhimā kaṡīrun minan-nās: aṣ-ṣiḥḥatu wal-farāg.',
              terjemah:
                'Dua nikmat yang sering membuat banyak manusia tertipu (lalai): nikmat sehat dan waktu luang.',
              hikmahPedagogis:
                'Mengajak siswa MI memanfaatkan waktu luang untuk belajar dan membantu orang tua.',
            },
          },
        ],
      },
      {
        id: 'mi-b-ski-1',
        nomorBab: 2,
        judulBab: 'SKI: Ketabahan Rasulullah saw. & Para Sahabat dalam Dakwah Awal di Makkah',
        kelas: 'Kelas 3 – 4 MI',
        semester: 'Ganjil',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Mempelajari dakwah sirriyah dan jahriyah Nabi Muhammad saw., ketabahan Bilal bin Rabah, keluarga Yasir, serta hijrah ke Habasyah.',
        atpList: [
          {
            kode: 'ATP-MI.SKI.B1',
            kelas: 'Kelas 4 MI',
            semester: 'Ganjil',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Menganalisis ketabahan Nabi Muhammad saw. dan para sahabat pada awal dakwah Makkah serta meneladani sikap sabar dalam kebenaran.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Komunikasi'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-b-ski-m1',
            kode: 'MAT-MI.SKI.B1',
            judul: 'Keteguhan Dakwah Rasulullah saw. di Makkah dan Peristiwa Isra’ Mikraj',
            ringkasan:
              'Menelusuri awal turunnya wahyu pertama, dakwah penuh kasih sayang Rasulullah saw., hingga hiburan Allah berupa Isra’ Mikraj.',
            kataKunci: ['Dakwah Makkah', 'Assabiqunal Awwalun', 'Isra’ Mikraj', 'Ketabahan'],
            ayatUtama: {
              surah: 'QS. Al-Isra’',
              ayat: '1',
              arab: 'سُبْحٰنَ الَّذِيْٓ اَسْرٰى بِعَبْدِهٖ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ اِلَى الْمَسْجِدِ الْاَقْصَا',
              latin: 'Subḥānal-lażī asrā bi‘abdihī lailam minal-masjidil-ḥarāmi ilal-masjidil-aqṣā.',
              terjemah:
                'Mahasuci (Allah), yang telah memperjalankan hamba-Nya (Muhammad) pada malam hari dari Masjidilharam ke Masjidilaqsa.',
              tafsirSingkat:
                'Isra’ Mikraj adalah mukjizat agung yang menguatkan hati Nabi Muhammad saw. sekaligus membawa perintah salat lima waktu.',
              keterkaitanMateri:
                'Mengaitkan sejarah SKI dengan kecintaan terhadap ibadah salat lima waktu.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 349) & Muslim (No. 162)',
              kitab: 'Sahih Al-Bukhari, Kitab As-Salah',
              derajat: 'Shahih (Muttafaq ‘Alaih)',
              arab: 'فَأَوْحَى اللَّهُ إِلَيَّ مَا أَوْحَى فَفَرَضَ عَلَيَّ خَمْسِينَ صَلَاةً فِي كُلِّ يَوْمٍ وَلَيْلَةٍ ثُمَّ خُفِّفَتْ إِلَى خَمْسٍ',
              latin:
                'Fa auḥallāhu ilayya mā auḥā fafaraḍa ‘alayya khamsīna ṣalātan fī kulli yaumin wa lailatin ṡumma khuffifat ilā khams.',
              terjemah:
                'Lalu Allah mewahyukan kepadaku kewajiban lima puluh salat dalam sehari semalam, kemudian diringankan menjadi lima waktu (namun pahalanya tetap lima puluh).',
              hikmahPedagogis:
                'Menyadarkan siswa bahwa salat adalah oleh-oleh terindah dari perjalanan Isra’ Mikraj.',
            },
          },
        ],
      },
      {
        id: 'mi-b-fk-2',
        nomorBab: 3,
        judulBab: 'Fikih: Salat Jumat, Salat Duha, dan Rukhsah bagi Orang Sakit',
        kelas: 'Kelas 4 MI',
        semester: 'Genap',
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiSingkat:
          'Memahami syarat sah salat Jumat, keutamaan salat Duha, serta kemudahan (rukhsah) salat dengan duduk atau berbaring saat sakit.',
        atpList: [
          {
            kode: 'ATP-MI.FK.B2',
            kelas: 'Kelas 4 MI',
            semester: 'Genap',
            elemen: 'Fikih',
            mapel: 'Fikih',
            tujuanPembelajaran:
              'Mempraktikkan tata cara salat Duha dan salat saat sakit (rukhsah) sebagai bukti kasih sayang syariat Islam.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kesehatan'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-b-fk-m2',
            kode: 'MAT-MI.FK.B2',
            judul: 'Kemudahan Syariat (Rukhsah Salat) dan Keutamaan Salat Duha',
            ringkasan:
              'Mempelajari tata cara salat bagi orang yang sedang sakit dan pembiasaan salat Duha sebelum pelajaran pagi di madrasah.',
            kataKunci: ['Rukhsah Salat', 'Salat Duha', 'Salat Jumat', 'Taisir'],
            ayatUtama: {
              surah: 'QS. Al-Baqarah',
              ayat: '185',
              arab: 'يُرِيْدُ اللّٰهُ بِكُمُ الْيُسْرَ وَلَا يُرِيْدُ بِكُمُ الْعُسْرَ',
              latin: 'Yurīdullāhu bikumul-yusra wa lā yurīdu bikumul-‘usr.',
              terjemah:
                'Allah menghendaki kemudahan bagimu, dan tidak menghendaki kesukaran bagimu.',
              tafsirSingkat:
                'Syariat Islam selalu memberi jalan kemudahan (rukhsah) tanpa menggugurkan kewajiban utama beribadah kepada Allah.',
              keterkaitanMateri:
                'Menjadi dasar pemahaman fikih rukhsah dalam salat dan puasa di MI.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 1117)',
              kitab: 'Sahih Al-Bukhari, Kitab Taqsir As-Salah',
              derajat: 'Shahih',
              arab: 'صَلِّ قَائِمًا فَإِنْ لَمْ تَسْتَطِعْ فَقَاعِدًا فَإِنْ لَمْ تَسْتَطِعْ فَعَلَى جَنْبٍ',
              latin: 'Ṣalli qā’iman, fa in lam tastaṭi‘ faqā‘idan, fa in lam tastaṭi‘ fa ‘alā janb.',
              terjemah:
                'Salatlah dengan berdiri; jika tidak mampu maka sambil duduk; dan jika tidak mampu maka sambil berbaring miring.',
              hikmahPedagogis:
                'Mengajarkan fleksibilitas dan konsistensi ibadah kepada anak madrasah.',
            },
          },
        ],
      },
      {
        id: 'mi-b-ba-2',
        nomorBab: 4,
        judulBab: 'Bahasa Arab: اَلْمِهْنَةُ وَالْأَمَلُ (Cita-Cita dan Profesi Mulia)',
        kelas: 'Kelas 4 MI',
        semester: 'Genap',
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiSingkat:
          'Menguasai kosakata profesi (Mudarrisun, Thabibun, Muhandisun, Fallahun) serta menyusun kalimat cita-cita sederhana.',
        atpList: [
          {
            kode: 'ATP-MI.BA.B2',
            kelas: 'Kelas 4 MI',
            semester: 'Genap',
            elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
            mapel: 'Bahasa Arab',
            tujuanPembelajaran:
              'Mengungkapkan cita-cita dan profesi dalam bahasa Arab sederhana secara lisan (kalam) dan tulisan (kitabah).',
            dimensiProfilLulusan: ['Komunikasi', 'Kreativitas', 'Kemandirian'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-b-ba-m2',
            kode: 'MAT-MI.BA.B2',
            judul: 'Kosakata Profesi (Al-Mihnatu) dan Etos Bermanfaat bagi Sesama',
            ringkasan:
              'Berlatih tanya jawab "Mā mihnatuka?" dan menuliskan kalimat sederhana tentang profesi yang memberi manfaat bagi masyarakat.',
            kataKunci: ['Al-Mihnatu', 'Kalam', 'Kitabah', 'Cita-Cita'],
            ayatUtama: {
              surah: 'QS. At-Taubah',
              ayat: '105',
              arab: 'وَقُلِ اعْمَلُوْا فَسَيَرَى اللّٰهُ عَمَلَكُمْ وَرَسُوْلُهٗ وَالْمُؤْمِنُوْنَ',
              latin: 'Wa quli‘malū fasayarallāhu ‘amalakum wa rasūluhū wal-mu’minūn.',
              terjemah:
                'Dan katakanlah, “Bekerjalah kamu, maka Allah akan melihat pekerjaanmu, begitu juga Rasul-Nya dan orang-orang mukmin.”',
              tafsirSingkat:
                'Setiap profesi halal yang ditekuni dengan niat ibadah dan kerja keras bernilai mulia di sisi Allah.',
              keterkaitanMateri:
                'Menanamkan nilai etos karya islami saat belajar kosakata profesi dalam Bahasa Arab.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 2072)',
              kitab: 'Sahih Al-Bukhari, Kitab Al-Buyu’',
              derajat: 'Shahih',
              arab: 'مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ',
              latin: 'Mā akala aḥadun ṭa‘āman qaṭṭu khairan min an ya’kula min ‘amali yadih.',
              terjemah:
                'Tidaklah seseorang memakan makanan yang lebih baik daripada makanan hasil jerih payah tangannya sendiri.',
              hikmahPedagogis:
                'Memupuk penghormatan terhadap berbagai profesi halal di masyarakat.',
            },
          },
        ],
      },
      {
        id: 'mi-b-ski-2',
        nomorBab: 5,
        judulBab: 'SKI: Hijrah ke Habasyah, Keteguhan di Thaif & Awal Perjalanan Hijrah ke Yatsrib',
        kelas: 'Kelas 4 MI',
        semester: 'Genap',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Mempelajari strategi penyelamatan umat melalui hijrah ke Habasyah (Raja Najasyi), doa kasih sayang di Thaif, serta Baiat Aqabah menuju Yatsrib.',
        atpList: [
          {
            kode: 'ATP-MI.SKI.B2',
            kelas: 'Kelas 4 MI',
            semester: 'Genap',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Menganalisis sebab dan hikmah hijrah ke Habasyah serta keteladanan sifat pemaaf Nabi Muhammad saw. saat berdakwah di Thaif.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kewargaan'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-b-ski-m2',
            kode: 'MAT-MI.SKI.B2',
            judul: 'Sifat Pemaaf Rasulullah saw. di Thaif & Hijrah ke Habasyah',
            ringkasan:
              'Meneladani kesabaran Nabi Muhammad saw. yang memilih mendoakan kebaikan bagi penduduk Thaif daripada membalas keburukan serta perlindungan Raja Najasyi di Habasyah.',
            kataKunci: ['Hijrah Habasyah', 'Dakwah Thaif', 'Sifat Pemaaf', 'Raja Najasyi'],
            ayatUtama: {
              surah: 'QS. Al-Anbiya’',
              ayat: '107',
              arab: 'وَمَآ اَرْسَلْنٰكَ اِلَّا رَحْمَةً لِّلْعٰلَمِيْنَ',
              latin: 'Wa mā arsalnāka illā raḥmatal lil-‘ālamīn.',
              terjemah:
                'Dan Kami tidak mengutus engkau (Muhammad) melainkan untuk (menjadi) rahmat bagi seluruh alam.',
              tafsirSingkat:
                'Misi dakwah Nabi Muhammad saw. selalu membawa kasih sayang dan keselamatan bahkan kepada pihak yang memusuhi beliau.',
              keterkaitanMateri:
                'Menjelaskan dasar sikap pemaaf Nabi saat peristiwa Thaif pada mapel SKI MI Kelas 4.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 3231) & Muslim (No. 1795)',
              kitab: 'Sahih Al-Bukhari, Kitab Bad’il Khalq',
              derajat: 'Shahih (Muttafaq ‘Alaih)',
              arab: 'بَلْ أَرْجُو أَنْ يُخْرِجَ اللَّهُ مِنْ أَصْلَابِهِمْ مَنْ يَعْبُدُ اللَّهَ وَحْدَهُ لَا يُشْرِكُ بِهِ شَيْئًا',
              latin:
                'Bal arjū an yukhrijallāhu min aṣlābihim man ya‘budullāha waḥdahū lā yusyriku bihī syai’ā.',
              terjemah:
                'Justru aku berharap semoga Allah melahirkan dari keturunan mereka orang-orang yang menyembah Allah semata dan tidak menyekutukan-Nya dengan sesuatu apa pun.',
              hikmahPedagogis:
                'Menanamkan keteladanan membalas keburukan dengan doa dan harapan kebaikan.',
            },
          },
        ],
      },
    ],
  },
  {
    fase: 'C',
    jenjang: 'SD/MI',
    jalur: 'Madrasah (Kemenag RI)',
    kelasRentang: 'Kelas 5 – 6 MI',
    labelLengkap: 'Fase C · Madrasah Ibtidaiyah (MI Kelas V & VI)',
    rasional2026:
      'Kurikulum Madrasah Ibtidaiyah Fase C membekali siswa kelas 5–6 kompetensi khusus madrasah pada Al-Qur’an Hadis (hukum Mim Sukun, Waqaf, Surah Al-‘Alaq, Ad-Duha, Al-Insyirah, hadis amal jariyah & menyayangi yatim), Akidah Akhlak (qada-qadar, kalimah istirja/tahlil, sifat sabar-taubat), Fikih (zakat, kurban, haji, jual beli & pinjam-meminjam), SKI (dakwah Madinah, Fathu Makkah, Khulafaurasyidin), dan Bahasa Arab aktif.',
    capaianPembelajaran: [
      {
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiCP:
          'Peserta didik memahami hukum Mim Sukun (Ikhfa Syafawi, Idgam Mimi, Izhar Syafawi), Tafkhim-Tarqiq, QS. Ad-Duha, Al-Insyirah, serta hadis tentang amal saleh dan menyayangi anak yatim.',
      },
      {
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiCP:
          'Peserta didik memahami kalimat tayyibah Hauqalah, Istighfar, dan Tahlil, Asmaul Husna (Al-Qawiyyu, Al-Qayyum, Al-Ghaffar, Al-Afuw), serta iman kepada qada dan qadar.',
      },
      {
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiCP:
          'Peserta didik memahami ketentuan zakat fitrah, infak-sedekah, kurban, ibadah haji, makanan-minuman halal-haram, serta prinsip dasar jual beli dan ‘ariyah (pinjam-meminjam).',
      },
      {
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiCP:
          'Peserta didik menganalisis perjuangan Nabi Muhammad saw. membangun masyarakat Madinah, peristiwa Fathu Makkah, serta keteladanan Khulafaurasyidin (Abu Bakar, Umar, Usman, Ali).',
      },
      {
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiCP:
          'Peserta didik memahami teks dan menyusun paragraf sederhana berbahasa Arab bertema As-Sa’ah (jam/waktu), Uhibbul Lughatal Arabiyyah, dan Fi Maktabatil Madrasah.',
      },
    ],
    babList: [
      {
        id: 'mi-c-qh-1',
        nomorBab: 1,
        judulBab: 'Al-Qur’an Hadis: Hukum Mim Sukun & Hadis Amal Saleh yang Mengalir',
        kelas: 'Kelas 5 – 6 MI',
        semester: 'Ganjil',
        elemen: 'Al-Qur’an dan Hadis',
        mapel: 'Al-Qur’an Hadis',
        deskripsiSingkat:
          'Menerapkan hukum bacaan Mim Sukun (Ikhfa Syafawi, Idgam Mimi, Izhar Syafawi) serta memahami tiga amal yang tidak terputus pahalanya.',
        atpList: [
          {
            kode: 'ATP-MI.QH.C1',
            kelas: 'Kelas 6 MI',
            semester: 'Ganjil',
            elemen: 'Al-Qur’an dan Hadis',
            mapel: 'Al-Qur’an Hadis',
            tujuanPembelajaran:
              'Mengidentifikasi hukum bacaan Mim Sukun dalam Al-Qur’an serta mempraktikkan pembiasaan amal jariyah, ilmu bermanfaat, dan doa untuk orang tua.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Penalaran Kritis'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-c-qh-m1',
            kode: 'MAT-MI.QH.C1',
            judul: 'Hukum Mim Sukun dan Tiga Amal Saleh Jariyah',
            ringkasan:
              'Membedakan Ikhfa Syafawi, Idgam Mimi, dan Izhar Syafawi sekaligus merancang aksi sedekah jariyah dan doa anak saleh.',
            kataKunci: ['Mim Sukun', 'Amal Jariyah', 'Ilmu Bermanfaat', 'Anak Saleh'],
            ayatUtama: {
              surah: 'QS. Al-Baqarah',
              ayat: '261',
              arab: 'مَثَلُ الَّذِيْنَ يُنْفِقُوْنَ اَمْوَالَهُمْ فِيْ سَبِيْلِ اللّٰهِ كَمَثَلِ حَبَّةٍ اَنْۢبَتَتْ سَبْعَ سَنَابِلَ فِيْ كُلِّ سُنْۢبُلَةٍ مِّائَةُ حَبَّةٍ',
              latin:
                'Maṡalul-lażīna yunfiqūna amwālahum fī sabīlillāhi kamaṡali ḥabbatin ambatat sab‘a sanābila fī kulli sumbulatim mi’atu ḥabbah.',
              terjemah:
                'Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji.',
              tafsirSingkat:
                'Allah melipatgandakan pahala sedekah dan amal kebaikan yang dilakukan dengan ikhlas hingga tujuh ratus kali lipat.',
              keterkaitanMateri:
                'Ayat ini juga memuat contoh hukum Mim Sukun (أَمْوَالَهُمْ فِيْ = Izhar Syafawi) sehingga terpadu antara tajwid dan kandungan nilai.',
            },
            hadisUtama: {
              perawi: 'HR. Muslim (No. 1631)',
              kitab: 'Sahih Muslim, Kitab Al-Washiyyah',
              derajat: 'Shahih',
              arab: 'إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
              latin:
                'Iżā mātal-insānunqaṭa‘a ‘amaluhū illā min ṡalāṡatin: ṣadaqatin jāriyatin, au ‘ilmin yuntafa‘u bihī, au waladin ṣāliḥin yad‘ū lah.',
              terjemah:
                'Apabila manusia meninggal dunia, terputuslah amalnya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, atau anak saleh yang mendoakannya.',
              hikmahPedagogis:
                'Hadis wajib hafalan siswa MI Kelas 6 yang membentuk kesadaran berbakti kepada orang tua.',
            },
          },
        ],
      },
      {
        id: 'mi-c-fk-1',
        nomorBab: 2,
        judulBab: 'Fikih: Prinsip Jual Beli (Al-Bai’) dan Pinjam-Meminjam (‘Ariyah) dalam Islam',
        kelas: 'Kelas 6 MI',
        semester: 'Ganjil',
        elemen: 'Fikih',
        mapel: 'Fikih',
        deskripsiSingkat:
          'Memahami rukun dan syarat jual beli yang jujur, menjauhi gharar/kecurangan timbangan, serta etika meminjam dan mengembalikan barang.',
        atpList: [
          {
            kode: 'ATP-MI.FK.C1',
            kelas: 'Kelas 6 MI',
            semester: 'Ganjil',
            elemen: 'Fikih',
            mapel: 'Fikih',
            tujuanPembelajaran:
              'Mempraktikkan simulasi akad jual beli dan pinjam-meminjam (‘ariyah) secara jujur, amanah, dan sesuai rukun syariat.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kolaborasi'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-c-fk-m1',
            kode: 'MAT-MI.FK.C1',
            judul: 'Akad Jual Beli Sah dan Amanah Pinjam-Meminjam (‘Ariyah)',
            ringkasan:
              'Mengenal rukun jual beli (penjual, pembeli, barang halal, harga jelas, ijab kabul) serta tanggung jawab menjaga barang pinjaman.',
            kataKunci: ['Al-Bai’', '‘Ariyah', 'Ijab Kabul', 'Kejujuran Muamalah'],
            ayatUtama: {
              surah: 'QS. Al-Baqarah',
              ayat: '275',
              arab: 'وَاَحَلَّ اللّٰهُ الْبَيْعَ وَحَرَّمَ الرِّبٰوا',
              latin: 'Wa aḥallallāhul-bai‘a wa ḥarramar-ribā.',
              terjemah: 'Dan Allah telah menghalalkan jual beli dan mengharamkan riba.',
              tafsirSingkat:
                'Transaksi ekonomi yang sah harus berlandaskan kerelaan, kejelasan barang, serta bebas dari riba dan penipuan.',
              keterkaitanMateri:
                'Memberikan dasar fikih muamalah aplikatif untuk siswa kelas 6 MI di kantin atau koperasi madrasah.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 2079) & Muslim (No. 1532)',
              kitab: 'Sahih Al-Bukhari, Kitab Al-Buyu’',
              derajat: 'Shahih (Muttafaq ‘Alaih)',
              arab: 'الْبَيِّعَانِ بِالْخِيَارِ مَا لَمْ يَتَفَرَّقَا فَإِنْ صَدَقَا وَبَيَّنَا بُورِكَ لَهُمَا فِي بَيْعِهِمَا',
              latin:
                'Al-bayyi‘āni bil-khiyāri mā lam yatafarraqā, fa in ṣadaqā wa bayyanā būrika lahumā fī bai‘ihimā.',
              terjemah:
                'Penjual dan pembeli memiliki hak memilih (khiyar) selama belum berpisah. Jika keduanya jujur dan menjelaskan kondisi barang secara terbuka, jual beli mereka akan diberkahi.',
              hikmahPedagogis:
                'Menanamkan kejujuran ekonomi sejak usia madrasah ibtidaiyah.',
            },
          },
        ],
      },
      {
        id: 'mi-c-aa-2',
        nomorBab: 3,
        judulBab: 'Akidah Akhlak: Kalimat Tahlil, Sifat Sabar & Taubat dalam Beriman kepada Qada-Qadar',
        kelas: 'Kelas 6 MI',
        semester: 'Genap',
        elemen: 'Akidah',
        mapel: 'Akidah Akhlak',
        deskripsiSingkat:
          'Memperdalam makna kalimat Lā ilāha illallāh, Asmaul Husna Al-Ghaffar dan Al-Afuw, serta sikap tawakal dan sabar menghadapi ujian.',
        atpList: [
          {
            kode: 'ATP-MI.AA.C2',
            kelas: 'Kelas 6 MI',
            semester: 'Genap',
            elemen: 'Akidah',
            mapel: 'Akidah Akhlak',
            tujuanPembelajaran:
              'Menganalisis hikmah beriman kepada takdir Allah serta membiasakan zikir tahlil dan istigfar dengan penuh kesadaran.',
            dimensiProfilLulusan: ['Keimanan dan Ketakwaan terhadap Tuhan YME', 'Kemandirian'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-c-aa-m2',
            kode: 'MAT-MI.AA.C2',
            judul: 'Sifat Pemaaf (Al-Afuw), Istigfar, dan Sikap Tawakal',
            ringkasan:
              'Mengenal luasnya ampunan Allah Swt., keutamaan bertaubat segera, dan keteguhan hati menerima ketetapan Allah setelah berikhtiar.',
            kataKunci: ['Al-Ghaffar', 'Al-Afuw', 'Tahlil', 'Tawakal'],
            ayatUtama: {
              surah: 'QS. Az-Zumar',
              ayat: '53',
              arab: 'لَا تَقْنَطُوْا مِنْ رَّحْمَةِ اللّٰهِ ۗ اِنَّ اللّٰهَ يَغْفِرُ الذُّنُوْبَ جَمِيْعًا',
              latin: 'Lā taqnaṭū mir raḥmatillāh, innallāha yagfiruż-żunūba jamī‘ā.',
              terjemah:
                'Janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya.',
              tafsirSingkat:
                'Pintu rahmat dan ampunan Allah selalu terbuka bagi hamba yang bersungguh-sungguh memohon ampun dan memperbaiki diri.',
              keterkaitanMateri:
                'Menguatkan kesehatan mental dan optimisme spiritual peserta didik MI.',
            },
            hadisUtama: {
              perawi: 'HR. At-Tirmidzi (No. 3383) & Ibnu Majah',
              kitab: 'Jami’ At-Tirmidzi',
              derajat: 'Hasan',
              arab: 'أَفْضَلُ الذِّكْرِ لَا إِلَهَ إِلَّا اللَّهُ وَأَفْضَلُ الدُّعَاءِ الْحَمْدُ لِلَّهِ',
              latin: 'Afḍaluż-żikri lā ilāha illallāh, wa afḍalud-du‘ā’il-ḥamdu lillāh.',
              terjemah:
                'Zikir yang paling utama adalah Lā ilāha illallāh dan doa yang paling utama adalah Alḥamdulillāh.',
              hikmahPedagogis:
                'Membiasakan kalimat tahlil dan syukur sebagai penenang jiwa.',
            },
          },
        ],
      },
      {
        id: 'mi-c-ski-2',
        nomorBab: 4,
        judulBab: 'SKI: Kepemimpinan Khulafaurasyidin & Pelajaran Keadilan Sosial',
        kelas: 'Kelas 5 – 6 MI',
        semester: 'Genap',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Meneladani ketegasan Abu Bakar Ash-Shiddiq, keadilan Umar bin Khattab, kedermawanan Usman bin Affan, dan kecerdasan Ali bin Abi Thalib.',
        atpList: [
          {
            kode: 'ATP-MI.SKI.C2',
            kelas: 'Kelas 5 MI',
            semester: 'Genap',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Membandingkan keteladanan kepemimpinan Abu Bakar, Umar, Usman, dan Ali r.a. serta menerapkannya dalam tanggung jawab organisasi kelas.',
            dimensiProfilLulusan: ['Kewargaan', 'Kolaborasi', 'Penalaran Kritis'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-c-ski-m2',
            kode: 'MAT-MI.SKI.C2',
            judul: 'Amanah Kepemimpinan dan Musyawarah pada Masa Khulafaurasyidin',
            ringkasan:
              'Menggali kisah kejujuran, kesederhanaan, dan perhatian para khalifah terhadap rakyat kecil serta kodifikasi mushaf Al-Qur’an.',
            kataKunci: ['Khulafaurasyidin', 'Musyawarah', 'Keadilan', 'Kodifikasi Mushaf'],
            ayatUtama: {
              surah: 'QS. Asy-Syura',
              ayat: '38',
              arab: 'وَاَمْرُهُمْ شُوْرٰى بَيْنَهُمْۖ وَمِمَّا رَزَقْنٰهُمْ يُنْفِقُوْنَ',
              latin: 'Wa amruhum syūrā bainahum wa mimmā razaqnāhum yunfiqūn.',
              terjemah:
                'Sedang urusan mereka (diputuskan) dengan musyawarah antara mereka; dan mereka menginfakkan sebagian dari rezeki yang Kami berikan kepada mereka.',
              tafsirSingkat:
                'Musyawarah dan kedermawanan merupakan prinsip utama kepemimpinan Islam yang dijalankan Khulafaurasyidin.',
              keterkaitanMateri:
                'Menghubungkan sejarah Islam dengan praktik demokrasi musyawarah pemilihan ketua kelas di MI.',
            },
            hadisUtama: {
              perawi: 'HR. Abu Dawud (No. 4607) & At-Tirmidzi (No. 2676)',
              kitab: 'Sunan Abi Dawud',
              derajat: 'Shahih',
              arab: 'فَعَلَيْكُمْ بِسُنَّتِي وَسُنَّةِ الْخُلَفَاءِ الرَّاشِدِينَ الْمَهْدِيِّينَ',
              latin: 'Fa ‘alaikum bisunnatī wa sunnatil-khulafā’ir-rāsyidīnal-mahdiyyīn.',
              terjemah:
                'Maka berpegangteguhlah kalian pada sunahku dan sunah Khulafaurasyidin yang mendapat petunjuk.',
              hikmahPedagogis:
                'Menjadikan keteladanan empat khalifah sebagai inspirasi kepemimpinan berakhlak.',
            },
          },
        ],
      },
      {
        id: 'mi-c-ba-2',
        nomorBab: 5,
        judulBab: 'Bahasa Arab: السَّاعَةُ وَأُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ (Waktu & Cinta Bahasa Arab)',
        kelas: 'Kelas 5 – 6 MI',
        semester: 'Genap',
        elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
        mapel: 'Bahasa Arab',
        deskripsiSingkat:
          'Memahami ungkapan jam/waktu (As-Sa’ah) serta kata kerja dasar (Fi’il Madi & Mudhari’ sederhana) dalam aktivitas belajar harian.',
        atpList: [
          {
            kode: 'ATP-MI.BA.C2',
            kelas: 'Kelas 6 MI',
            semester: 'Genap',
            elemen: 'Bahasa Arab (Istima’, Kalam, Qira’ah, Kitabah)',
            mapel: 'Bahasa Arab',
            tujuanPembelajaran:
              'Menyampaikan jadwal kegiatan harian menggunakan ungkapan jam (As-Sa’ah) dan kata kerja sederhana dalam bahasa Arab.',
            dimensiProfilLulusan: ['Komunikasi', 'Kemandirian'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-c-ba-m2',
            kode: 'MAT-MI.BA.C2',
            judul: 'Mengungkapkan Waktu (As-Sa’ah) dan Kedisiplinan Pelajar Madrasah',
            ringkasan:
              'Menguasai bilangan jam 1–12 dalam bahasa Arab (As-Sā‘atul Wāḥidah hingga Aṡ-Ṡāniyata ‘Asyrah) dalam dialog jadwal harian.',
            kataKunci: ['As-Sa’ah', 'Adad Tartibi', 'Fi’il Mudhari’', 'Disiplin'],
            ayatUtama: {
              surah: 'QS. Yusuf',
              ayat: '2',
              arab: 'اِنَّآ اَنْزَلْنٰهُ قُرْاٰنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُوْنَ',
              latin: 'Innā anzalnāhu qur’ānan ‘arabiyyal la‘allakum ta‘qilūn.',
              terjemah:
                'Sesungguhnya Kami menurunkannya berupa Al-Qur’an berbahasa Arab, agar kamu mengerti.',
              tafsirSingkat:
                'Bahasa Arab dipilih Allah untuk Al-Qur’an karena ketelitian maknanya agar manusia mampu berpikir dan memahami wahyu.',
              keterkaitanMateri:
                'Menjadi motivasi utama penguasaan Qira’ah dan Kitabah Bahasa Arab di kelas akhir MI.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 528)',
              kitab: 'Sahih Al-Bukhari, Kitab Mawaqit As-Salah',
              derajat: 'Shahih',
              arab: 'أَيُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ قَالَ الصَّلَاةُ عَلَى وَقْتِهَا',
              latin: 'Ayyul-‘amali aḥabbu ilallāh? Qāla: Aṣ-ṣalātu ‘alā waqtihā.',
              terjemah:
                'Amalan apakah yang paling dicintai Allah? Nabi menjawab: Salat pada waktunya.',
              hikmahPedagogis:
                'Mengaitkan pelajaran menyebutkan waktu (As-Sa’ah) dengan kedisiplinan menunaikan salat lima waktu.',
            },
          },
        ],
      },
      {
        id: 'mi-c-ski-1',
        nomorBab: 6,
        judulBab: 'SKI: Pembinaan Masyarakat Madinah & Peristiwa Agung Fathu Makkah',
        kelas: 'Kelas 5 MI',
        semester: 'Ganjil',
        elemen: 'Sejarah Peradaban Islam',
        mapel: 'Sejarah Kebudayaan Islam (SKI)',
        deskripsiSingkat:
          'Mempelajari langkah Rasulullah saw. membangun Masjid Nabawi, mempersaudarakan Muhajirin-Anshar, menjaga Madinah, hingga pembebasan kota Makkah tanpa pertumpahan darah.',
        atpList: [
          {
            kode: 'ATP-MI.SKI.C1',
            kelas: 'Kelas 5 MI',
            semester: 'Ganjil',
            elemen: 'Sejarah Peradaban Islam',
            mapel: 'Sejarah Kebudayaan Islam (SKI)',
            tujuanPembelajaran:
              'Menganalisis strategi damai Nabi Muhammad saw. dalam membina masyarakat Madinah dan menjaga kehormatan saat peristiwa Fathu Makkah.',
            dimensiProfilLulusan: ['Kewargaan', 'Kolaborasi', 'Penalaran Kritis'],
            alokasiJP: 4,
          },
        ],
        materiList: [
          {
            id: 'mi-c-ski-m1',
            kode: 'MAT-MI.SKI.C1',
            judul: 'Persaudaraan Muhajirin–Anshar dan Pengampunan Agung Fathu Makkah',
            ringkasan:
              'Menggali nilai ukhuwah di Madinah dan sikap rendah hati Rasulullah saw. memaafkan penduduk Makkah pada peristiwa Fathu Makkah.',
            kataKunci: ['Muhajirin Anshar', 'Fathu Makkah', 'Ukhuwah', 'Pemaaf'],
            ayatUtama: {
              surah: 'QS. An-Nasr',
              ayat: '1 – 3',
              arab: 'اِذَا جَاۤءَ نَصْرُ اللّٰهِ وَالْفَتْحُۙ ۝ وَرَاَيْتَ النَّاسَ يَدْخُلُوْنَ فِيْ دِيْنِ اللّٰهِ اَفْوَاجًاۙ ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُۗ اِنَّهٗ كَانَ تَوَّابًا ۝',
              latin:
                'Iżā jā’a naṣrullāhi wal-fatḥ. Wa ra’aitan-nāsa yadkhulūna fī dīnillāhi afwājā. Fasabbiḥ biḥamdi rabbika wastagfirh, innahū kāna tawwābā.',
              terjemah:
                'Apabila telah datang pertolongan Allah dan kemenangan (Fathu Makkah), dan engkau melihat manusia berbondong-bondong masuk agama Allah, maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya. Sungguh, Dia Maha Penerima tobat.',
              tafsirSingkat:
                'Kemenangan besar dalam Islam disambut bukan dengan kesombongan, melainkan tasbih, syukur, dan istigfar.',
              keterkaitanMateri:
                'Menjadi pokok bahasan utama SKI MI Kelas 5 Semester 1 tentang Fathu Makkah.',
            },
            hadisUtama: {
              perawi: 'HR. Al-Bukhari (No. 4287) & Sirah Nabawiyah',
              kitab: 'Sahih Al-Bukhari, Kitab Al-Maghazi',
              derajat: 'Shahih',
              arab: 'اذْهَبُوا فَأَنْتُمُ الطُّلَقَاءُ',
              latin: 'Iżhabū fa antumuṭ-ṭulaqā’.',
              terjemah: 'Pergilah kalian semua, karena hari ini kalian bebas (dimaafkan).',
              hikmahPedagogis:
                'Menanamkan kebesaran jiwa pemaaf saat berada pada posisi unggul atau menang.',
            },
          },
        ],
      },
    ],
  },
];
