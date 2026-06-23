export type RoomId = "ancient" | "kingdom" | "colonial" | "national" | "modern" | "heritage" | "cinema" | "studio";

/** @deprecated Use "modern" instead — independence content is merged into the modern hall */
export type LegacyRoomId = RoomId | "independence";

export interface TimelineMoment {
  year: string;
  titleEn: string;
  titleId: string;
  bodyEn: string;
  bodyId: string;
  room: RoomId;
}

export interface Artifact {
  id: string;
  room: RoomId;
  section: string;
  name: { en: string; id: string };
  era: { en: string; id: string };
  origin: { en: string; id: string };
  description: { en: string; id: string };
  color: string;
  shape: "bust" | "sword" | "scroll" | "flag" | "vase" | "tablet" | "crown" | "book" | "wall" | "texture";
  position: [number, number];
}

export const rooms: {
  id: RoomId;
  nameEn: string;
  nameId: string;
  accent: string;
  ambient: string;
  descEn: string;
  descId: string;
  objectivesEn: string[];
  objectivesId: string[];
}[] = [
  {
    id: "ancient",
    nameEn: "Ancient Indonesia Hall",
    nameId: "Ruang Indonesia Kuno",
    accent: "#a87a3d",
    ambient: "0.05 0.04 0.06",
    descEn: "Explore 1.5 million years of prehistory — from the earliest Homo erectus fossils at Sangiran, through Neolithic tools and megalithic monuments, to the great Austronesian migration that populated the archipelago.",
    descId: "Jelajahi 1,5 juta tahun prasejarah — dari fosil Homo erectus tertua di Sangiran, peralatan Neolitik dan monumen megalitik, hingga migrasi besar Austronesia yang mendiami kepulauan Nusantara.",
    objectivesEn: [
      "Examine fossils of Java Man, Homo floresiensis 'Hobbit', and Homo wajakensis",
      "Inspect Paleolithic, Neolithic, and Bronze Age tools and cave paintings",
      "Discover megalithic sites including the mysterious Gunung Padang",
      "Trace the Austronesian migration routes across the Pacific"
    ],
    objectivesId: [
      "Periksa fosil Manusia Jawa, Homo floresiensis 'Hobbit', dan Homo wajakensis",
      "Lihat peralatan Paleolitik, Neolitik, dan Zaman Perunggu beserta lukisan gua",
      "Temukan situs megalitik termasuk Gunung Padang yang misterius",
      "Telusuri rute migrasi Austronesia melintasi Pasifik"
    ]
  },
  {
    id: "kingdom",
    nameEn: "Kingdom Era Hall",
    nameId: "Ruang Era Kerajaan",
    accent: "#c9a14a",
    ambient: "0.07 0.05 0.04",
    descEn: "Witness 1,200 years of kingdoms — from the earliest Hindu polities of Kutai and Tarumanagara, through the Buddhist maritime empire of Sriwijaya, the magnificent temples of Borobudur and Prambanan, the golden age of Majapahit, to the rise of Islamic sultanates across the archipelago.",
    descId: "Saksikan 1.200 tahun kerajaan — dari kerajaan Hindu pertama Kutai dan Tarumanagara, kekaisaran maritim Buddha Sriwijaya, candi-candi megah Borobudur dan Prambanan, masa keemasan Majapahit, hingga kebangkitan kesultanan Islam di seluruh Nusantara.",
    objectivesEn: [
      "Explore inscriptions from Kutai, Tarumanagara, and Sriwijaya",
      "Marvel at Borobudur, Prambanan, and other classical temples",
      "Learn about Majapahit's golden age and Gajah Mada's Sumpah Palapa",
      "Discover 15+ Islamic sultanates from Samudera Pasai to Ternate"
    ],
    objectivesId: [
      "Jelajahi prasasti dari Kutai, Tarumanagara, dan Sriwijaya",
      "Kagumi Borobudur, Prambanan, dan candi-candi klasik lainnya",
      "Pelajari masa keemasan Majapahit dan Sumpah Palapa Gajah Mada",
      "Temukan 15+ kesultanan Islam dari Samudera Pasai hingga Ternate"
    ]
  },
  {
    id: "colonial",
    nameEn: "Colonial History Hall",
    nameId: "Ruang Sejarah Kolonial",
    accent: "#7a8a9c",
    ambient: "0.05 0.05 0.06",
    descEn: "Understand four centuries of colonialism — from the Portuguese capture of Malacca in 1511, through the VOC monopoly, the brutal Cultivation System, heroic resistance wars across the archipelago, to the dark years of Japanese occupation.",
    descId: "Pahami empat abad kolonialisme — dari penaklukan Malaka oleh Portugis tahun 1511, monopoli VOC, Sistem Tanam Paksa yang brutal, perang perlawanan heroik di seluruh Nusantara, hingga tahun-tahun kelam pendudukan Jepang.",
    objectivesEn: [
      "Learn how the spice trade drew European powers to Indonesia",
      "Examine the VOC system, Tanam Paksa, and Dutch colonial mechanisms",
      "Honor 11+ resistance heroes from Diponegoro to Cut Nyak Dhien",
      "Understand the Japanese occupation and its lasting impact"
    ],
    objectivesId: [
      "Pelajari bagaimana perdagangan rempah menarik kekuatan Eropa ke Indonesia",
      "Periksa sistem VOC, Tanam Paksa, dan mekanisme kolonial Belanda",
      "Hormati 11+ pahlawan perlawanan dari Diponegoro hingga Cut Nyak Dhien",
      "Pahami pendudukan Jepang dan dampaknya yang berlangsung lama"
    ]
  },
  {
    id: "national",
    nameEn: "National Movement Hall",
    nameId: "Ruang Pergerakan Nasional",
    accent: "#d4a017",
    ambient: "0.06 0.05 0.04",
    descEn: "Follow the birth of modern Indonesian nationalism — from the founding of Budi Utomo in 1908, through the Youth Pledge of 1928, to the formation of BPUPKI and PPKI that prepared the foundation of an independent Indonesia.",
    descId: "Ikuti lahirnya nasionalisme Indonesia modern — dari pendirian Budi Utomo tahun 1908, Sumpah Pemuda 1928, hingga pembentukan BPUPKI dan PPKI yang menyiapkan fondasi Indonesia merdeka.",
    objectivesEn: [
      "Discover the pioneering organizations: Budi Utomo, Sarekat Islam, PNI",
      "Relive the historic Youth Pledge of October 28, 1928",
      "Learn about unsung heroes like Tan Malaka and Ki Hajar Dewantara",
      "Understand BPUPKI, the birth of Pancasila, and PPKI"
    ],
    objectivesId: [
      "Temukan organisasi perintis: Budi Utomo, Sarekat Islam, PNI",
      "Hidupkan kembali Sumpah Pemuda bersejarah 28 Oktober 1928",
      "Pelajari pahlawan tak dikenal seperti Tan Malaka dan Ki Hajar Dewantara",
      "Pahami BPUPKI, lahirnya Pancasila, dan PPKI"
    ]
  },
  {
    id: "modern",
    nameEn: "Modern Indonesia Hall",
    nameId: "Ruang Indonesia Modern",
    accent: "#4aa3c9",
    ambient: "0.04 0.05 0.07",
    descEn: "From the Proclamation of Independence in 1945 through revolution, nation-building, the Old Order, the New Order, Reformation, and into 21st-century democratic Indonesia — every major event that shaped the nation.",
    descId: "Dari Proklamasi Kemerdekaan 1945 melalui revolusi, pembangunan bangsa, Orde Lama, Orde Baru, Reformasi, hingga Indonesia demokratis abad ke-21 — setiap peristiwa besar yang membentuk bangsa.",
    objectivesEn: [
      "Relive the Proclamation and the revolutionary struggle (1945-1949)",
      "Understand the Old Order, G30S, and the transition to the New Order",
      "Examine the 32-year New Order era: development, control, and crisis",
      "Follow the Reformation era from 1998 to the present day",
      "Celebrate national symbols: Pancasila, Garuda, and Bhinneka Tunggal Ika"
    ],
    objectivesId: [
      "Hidupkan kembali Proklamasi dan perjuangan revolusi (1945-1949)",
      "Pahami Orde Lama, G30S, dan transisi ke Orde Baru",
      "Periksa era Orde Baru 32 tahun: pembangunan, kontrol, dan krisis",
      "Ikuti era Reformasi dari 1998 hingga saat ini",
      "Rayakan simbol negara: Pancasila, Garuda, dan Bhinneka Tunggal Ika"
    ]
  },
  {
    id: "heritage",
    nameEn: "Cultural Heritage & Nature Hall",
    nameId: "Ruang Warisan Budaya & Alam",
    accent: "#2ecc71",
    ambient: "0.04 0.06 0.05",
    descEn: "Celebrate Indonesia's extraordinary cultural diversity and natural wonders — from UNESCO-recognized intangible heritage like Batik and Wayang, to World Heritage Sites like Komodo and Lorentz, to the living traditions of hundreds of ethnic groups.",
    descId: "Rayakan keragaman budaya luar biasa dan keajaiban alam Indonesia — dari warisan takbenda UNESCO seperti Batik dan Wayang, Situs Warisan Dunia seperti Komodo dan Lorentz, hingga tradisi hidup ratusan kelompok etnis.",
    objectivesEn: [
      "Discover 9+ UNESCO Intangible Cultural Heritage items from Indonesia",
      "Visit World Heritage Sites from Komodo to the Tropical Rainforests of Sumatra",
      "Explore traditional arts: Tenun Ikat, Songket, Toraja rituals, and more"
    ],
    objectivesId: [
      "Temukan 9+ item Warisan Budaya Takbenda UNESCO dari Indonesia",
      "Kunjungi Situs Warisan Dunia dari Komodo hingga Hutan Hujan Tropis Sumatera",
      "Jelajahi seni tradisional: Tenun Ikat, Songket, ritual Toraja, dan lainnya"
    ]
  },
  {
    id: "cinema",
    nameEn: "Cinema Studio Hall",
    nameId: "Ruang Studio Bioskop",
    accent: "#e94560",
    ambient: "0.06 0.04 0.04",
    descEn: "Take a seat and watch beautifully produced audio-visual documentary films about the history and heritage of Indonesia.",
    descId: "Duduk dan tontonlah film dokumenter audio-visual yang mengisahkan sejarah dan warisan budaya Indonesia.",
    objectivesEn: [
      "Click the large cinema screen to open the theater player",
      "Select and watch historical documentary videos"
    ],
    objectivesId: [
      "Klik layar bioskop besar untuk membuka pemutar teater",
      "Pilih dan tonton video dokumenter sejarah Nusantara"
    ]
  },
  {
    id: "studio",
    nameEn: "Virtual Photo Studio",
    nameId: "Studio Foto Virtual",
    accent: "#9b5de5",
    ambient: "0.06 0.04 0.06",
    descEn: "Customize your profile and create a personalized Polaroid souvenir photograph of your journey inside MuseumVerse Indonesia.",
    descId: "Kustomisasi profil Anda dan buatlah foto suvenir Polaroid personal dari perjalanan Anda di MuseumVerse Indonesia.",
    objectivesEn: [
      "Input your name and select from 4 traditional attire costumes",
      "Choose from 6 themed virtual background layouts",
      "Generate and download a free PNG Polaroid souvenir card"
    ],
    objectivesId: [
      "Masukkan nama Anda dan pilih dari 4 busana pakaian adat",
      "Pilih dari 6 desain latar belakang bertema",
      "Buat dan unduh kartu suvenir Polaroid gratis format PNG"
    ]
  }
];

import { artifactsData } from "./artifacts-data";

export const artifacts: Artifact[] = artifactsData;

export const timeline: TimelineMoment[] = [
  {
    year: "1.5M BCE",
    titleEn: "Java Man (Homo erectus)",
    titleId: "Manusia Jawa (Homo erectus)",
    bodyEn: "Homo erectus arrives and settles in Java, marking the dawn of human presence.",
    bodyId: "Homo erectus tiba dan tinggal di Jawa, menandai awal kehadiran manusia.",
    room: "ancient",
  },
  {
    year: "60,000 BCE",
    titleEn: "Homo floresiensis 'Hobbit'",
    titleId: "Homo floresiensis 'Hobbit'",
    bodyEn: "The tiny species lives and hunts in Flores alongside dwarf stegodons.",
    bodyId: "Spesimen bertubuh kecil hidup dan berburu di Flores bersama stegodon kerdil.",
    room: "ancient",
  },
  {
    year: "45,500 BCE",
    titleEn: "World's Oldest Cave Art",
    titleId: "Seni Gua Tertua di Dunia",
    bodyEn: "Saddled pig cave painting created in Leang Tedongnge, South Sulawesi.",
    bodyId: "Lukisan babi hutan sulawesi dibuat di Leang Tedongnge, Sulawesi Selatan.",
    room: "ancient",
  },
  {
    year: "40,000 BCE",
    titleEn: "Borneo Cave Hand Stencils",
    titleId: "Stensil Tangan Gua Kalimantan",
    bodyEn: "Red-orange hand stencils painted on the limestone cave walls of East Kalimantan.",
    bodyId: "Stensil tangan merah-jingga dilukis di dinding gua batu kapur Kalimantan Timur.",
    room: "ancient",
  },
  {
    year: "2500 BCE",
    titleEn: "Austronesian Migration",
    titleId: "Migrasi Austronesia",
    bodyEn: "Seafaring Austronesians migrate from Taiwan, bringing agriculture and languages.",
    bodyId: "Pelaut Austronesia bermigrasi dari Taiwan, membawa pertanian dan bahasa.",
    room: "ancient",
  },
  {
    year: "1500 BCE",
    titleEn: "Megalithic Menhirs",
    titleId: "Menhir Megalitik",
    bodyEn: "Ancient communities erect megalithic statues and menhirs in Sulawesi.",
    bodyId: "Masyarakat purba mendirikan patung megalitik dan menhir di Sulawesi.",
    room: "ancient",
  },
  {
    year: "4th Century",
    titleEn: "Kutai Kingdom",
    titleId: "Kerajaan Kutai",
    bodyEn: "First written records in Indonesia appear on the sacrificial stone Yupas.",
    bodyId: "Catatan tertulis pertama di Indonesia muncul pada tiang batu Yupa.",
    room: "kingdom",
  },
  {
    year: "5th Century",
    titleEn: "Tarumanagara Kingdom",
    titleId: "Kerajaan Tarumanagara",
    bodyEn: "King Purnawarman builds canals and leaves his footprint inscriptions.",
    bodyId: "Raja Purnawarman membangun saluran air dan meninggalkan prasasti tapak kaki.",
    room: "kingdom",
  },
  {
    year: "682",
    titleEn: "Srivijaya Maritime Empire",
    titleId: "Kekaisaran Maritim Sriwijaya",
    bodyEn: "Dapunta Hyang leads a military campaign, establishing Buddhist hegemony.",
    bodyId: "Dapunta Hyang memimpin ekspedisi militer, menegakkan hegemoni Buddha.",
    room: "kingdom",
  },
  {
    year: "732",
    titleEn: "Mataram Kingdom Founded",
    titleId: "Pendirian Kerajaan Mataram",
    bodyEn: "King Sanjaya establishes the Hindu Mataram Kingdom in Central Java.",
    bodyId: "Raja Sanjaya mendirikan Kerajaan Mataram Hindu di Jawa Tengah.",
    room: "kingdom",
  },
  {
    year: "825",
    titleEn: "Borobudur Completed",
    titleId: "Borobudur Selesai",
    bodyEn: "The massive Buddhist monument is finished under the Syailendra dynasty.",
    bodyId: "Monumen Buddha raksasa selesai dibangun di bawah Wangsa Syailendra.",
    room: "kingdom",
  },
  {
    year: "856",
    titleEn: "Prambanan Dedicated",
    titleId: "Prambanan Diresmikan",
    bodyEn: "The grand Shiva temple complex is built, showing Hindu artistic heights.",
    bodyId: "Kompleks candi Siwa megah dibangun, menunjukkan seni tinggi Hindu.",
    room: "kingdom",
  },
  {
    year: "1025",
    titleEn: "Chola Naval Raid",
    titleId: "Serangan Angkatan Laut Chola",
    bodyEn: "South Indian Chola empire raids Srivijaya ports, weakening its monopoly.",
    bodyId: "Kekaisaran Chola India Selatan menyerang pelabuhan Sriwijaya, melemahkan monopoli.",
    room: "kingdom",
  },
  {
    year: "1157",
    titleEn: "Kakawin Bharatayuddha",
    titleId: "Kakawin Bharatayuddha",
    bodyEn: "The epic Javanese poem is composed during the golden age of Kediri.",
    bodyId: "Puisi epik Jawa Kuno digubah pada masa keemasan Kerajaan Kediri.",
    room: "kingdom",
  },
  {
    year: "1222",
    titleEn: "Singasari Kingdom",
    titleId: "Kerajaan Singasari",
    bodyEn: "Ken Arok defeats Kediri and establishes the Singasari Dynasty.",
    bodyId: "Ken Arok mengalahkan Kediri dan mendirikan Dinasti Singasari.",
    room: "kingdom",
  },
  {
    year: "1267",
    titleEn: "Samudera Pasai",
    titleId: "Samudera Pasai",
    bodyEn: "The first Islamic Sultanate in Indonesia is founded in Aceh.",
    bodyId: "Kesultanan Islam pertama di Indonesia didirikan di Aceh.",
    room: "kingdom",
  },
  {
    year: "1293",
    titleEn: "Majapahit Empire Founded",
    titleId: "Kemaharajaan Majapahit Berdiri",
    bodyEn: "Raden Wijaya defeats the Mongols and founds the archipelago's largest empire.",
    bodyId: "Raden Wijaya mengalahkan Mongol dan mendirikan kerajaan terbesar Nusantara.",
    room: "kingdom",
  },
  {
    year: "1331",
    titleEn: "Gajah Mada's Oath",
    titleId: "Sumpah Palapa Gajah Mada",
    bodyEn: "Mahapatih Gajah Mada vows to unite the entire Nusantara archipelago.",
    bodyId: "Mahapatih Gajah Mada bersumpah menyatukan seluruh kepulauan Nusantara.",
    room: "kingdom",
  },
  {
    year: "1365",
    titleEn: "Nagarakretagama Written",
    titleId: "Nagarakretagama Ditulis",
    bodyEn: "Mpu Prapanca writes the chronicle of Majapahit's territory and administration.",
    bodyId: "Mpu Prapanca menulis kronik wilayah dan administrasi Majapahit.",
    room: "kingdom",
  },
  {
    year: "1475",
    titleEn: "Demak Sultanate Founded",
    titleId: "Kesultanan Demak Berdiri",
    bodyEn: "The first Islamic kingdom in Java is founded, replacing Majapahit's influence.",
    bodyId: "Kerajaan Islam pertama di Jawa didirikan, menggantikan pengaruh Majapahit.",
    room: "kingdom",
  },
  {
    year: "1511",
    titleEn: "Fall of Malacca",
    titleId: "Jatuhnya Malaka",
    bodyEn: "Portuguese forces capture Malacca, marking the start of European colonization.",
    bodyId: "Pasukan Portugis merebut Malaka, menandai awal kolonisasi Eropa.",
    room: "colonial",
  },
  {
    year: "1521",
    titleEn: "Spanish in Tidore",
    titleId: "Spanyol di Tidore",
    bodyEn: "Spanish expedition under Elcano arrives in Tidore to trade cloves.",
    bodyId: "Ekspedisi Spanyol di bawah Elcano tiba di Tidore untuk dagang cengkih.",
    room: "colonial",
  },
  {
    year: "1527",
    titleEn: "Jayakarta Founded",
    titleId: "Jayakarta Didirikan",
    bodyEn: "Fatahillah expels Portuguese and renames Sunda Kelapa to Jayakarta.",
    bodyId: "Fatahillah mengusir Portugis dan mengubah nama Sunda Kelapa menjadi Jayakarta.",
    room: "kingdom",
  },
  {
    year: "1575",
    titleEn: "Sultan Baabullah's Victory",
    titleId: "Kemenangan Sultan Baabullah",
    bodyEn: "Ternate expels the Portuguese, securing control over North Maluku spices.",
    bodyId: "Ternate mengusir Portugis, mengamankan kendali atas rempah Maluku Utara.",
    room: "kingdom",
  },
  {
    year: "1596",
    titleEn: "First Dutch Fleet",
    titleId: "Armada Belanda Pertama",
    bodyEn: "Cornelis de Houtman lands in Banten, opening trade negotiations.",
    bodyId: "Cornelis de Houtman mendarat di Banten, membuka negosiasi dagang.",
    room: "colonial",
  },
  {
    year: "1602",
    titleEn: "VOC Established",
    titleId: "Pembentukan VOC",
    bodyEn: "The Dutch East India Company is formed to monopolize the spice trade.",
    bodyId: "Kongsi Dagang Hindia Timur Belanda dibentuk untuk monopoli rempah.",
    room: "colonial",
  },
  {
    year: "1619",
    titleEn: "Batavia Founded",
    titleId: "Batavia Didirikan",
    bodyEn: "J.P. Coen destroys Jayakarta and builds Batavia as the VOC capital.",
    bodyId: "J.P. Coen menghancurkan Jayakarta dan membangun Batavia sebagai ibu kota VOC.",
    room: "colonial",
  },
  {
    year: "1628",
    titleEn: "Siege of Batavia",
    titleId: "Pengepungan Batavia",
    bodyEn: "Sultan Agung of Mataram launches major military campaigns against Batavia.",
    bodyId: "Sultan Agung dari Mataram melancarkan kampanye militer besar melawan Batavia.",
    room: "colonial",
  },
  {
    year: "1667",
    titleEn: "Treaty of Bongaya",
    titleId: "Perjanjian Bongaya",
    bodyEn: "Makassar War ends, forcing Sultan Hasanuddin to sign a treaty with the VOC.",
    bodyId: "Perang Makassar berakhir, memaksa Sultan Hasanuddin tanda tangani perjanjian.",
    room: "colonial",
  },
  {
    year: "1799",
    titleEn: "VOC Dissolved",
    titleId: "Pembubaran VOC",
    bodyEn: "Bankruptcy forces VOC's dissolution; Dutch government takes direct control.",
    bodyId: "Kebangkrutan memaksa VOC bubar; pemerintah Belanda mengambil alih langsung.",
    room: "colonial",
  },
  {
    year: "1808",
    titleEn: "Great Post Road",
    titleId: "Jalan Raya Pos",
    bodyEn: "Daendels builds a 1,000 km road across Java using forced labor.",
    bodyId: "Daendels membangun jalan 1.000 km melintasi Jawa menggunakan kerja paksa.",
    room: "colonial",
  },
  {
    year: "1825",
    titleEn: "Java War Begins",
    titleId: "Perang Jawa Dimulai",
    bodyEn: "Prince Diponegoro leads a massive rebellion against Dutch colonial rule.",
    bodyId: "Pangeran Diponegoro memimpin pemberontakan massal melawan kolonial Belanda.",
    room: "colonial",
  },
  {
    year: "1830",
    titleEn: "Cultivation System",
    titleId: "Sistem Tanam Paksa",
    bodyEn: "Dutch introduce Cultuurstelsel, forcing farmers to grow export crops.",
    bodyId: "Belanda memperkenalkan Cultuurstelsel, memaksa petani menanam komoditas ekspor.",
    room: "colonial",
  },
  {
    year: "1873",
    titleEn: "Aceh War Begins",
    titleId: "Perang Aceh Dimulai",
    bodyEn: "Aceh Sultanate fiercely resists Dutch invasion for over 30 years.",
    bodyId: "Kesultanan Aceh dengan sengit melawan invasi Belanda selama 30 tahun.",
    room: "colonial",
  },
  {
    year: "1901",
    titleEn: "Ethical Policy",
    titleId: "Politik Etis",
    bodyEn: "Queen Wilhelmina declares a debt of honor, focusing on education.",
    bodyId: "Ratu Wilhelmina menyatakan utang budi, fokus pada pendidikan bumiputera.",
    room: "colonial",
  },
  {
    year: "1908",
    titleEn: "Budi Utomo Founded",
    titleId: "Budi Utomo Berdiri",
    bodyEn: "First indigenous nationalist organization marks National Awakening.",
    bodyId: "Organisasi nasionalis pribumi pertama menandai Kebangkitan Nasional.",
    room: "national",
  },
  {
    year: "1912",
    titleEn: "Sarekat Islam & Muhammadiyah",
    titleId: "Sarekat Islam & Muhammadiyah",
    bodyEn: "Islamic mass organizations emerge, mobilizing political consciousness.",
    bodyId: "Organisasi massa Islam lahir, memobilisasi kesadaran politik.",
    room: "national",
  },
  {
    year: "1928",
    titleEn: "Youth Pledge",
    titleId: "Sumpah Pemuda",
    bodyEn: "Youth declare one motherland, one nation, and one language: Indonesia.",
    bodyId: "Pemuda menyatakan satu tanah air, satu bangsa, dan satu bahasa: Indonesia.",
    room: "national",
  },
  {
    year: "1942",
    titleEn: "Japanese Occupation",
    titleId: "Pendudukan Jepang",
    bodyEn: "Japanese military forces invade and occupy the East Indies.",
    bodyId: "Pasukan militer Jepang menyerbu dan menduduki Hindia Belanda.",
    room: "colonial",
  },
  {
    year: "1945",
    titleEn: "Proclamation of Independence",
    titleId: "Proklamasi Kemerdekaan",
    bodyEn: "Soekarno and Hatta declare independence on August 17.",
    bodyId: "Soekarno dan Hatta memproklamasikan kemerdekaan pada 17 Agustus.",
    room: "modern",
  },
  {
    year: "1945",
    titleEn: "Battle of Surabaya",
    titleId: "Pertempuran Surabaya",
    bodyEn: "Indonesian fighters resist Allied troops, commemorated as Heroes' Day.",
    bodyId: "Pejuang Indonesia melawan pasukan Sekutu, diperingati sebagai Hari Pahlawan.",
    room: "modern",
  },
  {
    year: "1949",
    titleEn: "Sovereignty Transfer",
    titleId: "Pengakuan Kedaulatan",
    bodyEn: "Dutch formally transfer sovereignty to Indonesia after the Round Table.",
    bodyId: "Belanda menyerahkan kedaulatan kepada Indonesia setelah Konferensi Meja Bundar.",
    room: "modern",
  },
  {
    year: "1955",
    titleEn: "Asia-Africa Conference",
    titleId: "Konferensi Asia-Afrika",
    bodyEn: "Indonesia hosts the historic Bandung Conference for post-colonial solidarity.",
    bodyId: "Indonesia menjamu Konferensi Bandung untuk solidaritas pasca-kolonial.",
    room: "modern",
  },
  {
    year: "1965",
    titleEn: "G30S Tragedy",
    titleId: "Tragedi G30S",
    bodyEn: "A failed coup attempt triggers a major political and social upheaval.",
    bodyId: "Upaya kudeta yang gagal memicu pergolakan politik dan sosial besar.",
    room: "modern",
  },
  {
    year: "1966",
    titleEn: "Supersemar",
    titleId: "Supersemar",
    bodyEn: "President Soekarno transfers executive authority to Soeharto, starting New Order.",
    bodyId: "Presiden Soekarno memberikan wewenang eksekutif ke Soeharto, memulai Orde Baru.",
    room: "modern",
  },
  {
    year: "1976",
    titleEn: "Palapa Satellite",
    titleId: "Satelit Palapa",
    bodyEn: "Indonesia launches Palapa A1, unifying communication across the islands.",
    bodyId: "Indonesia meluncurkan Palapa A1, menyatukan komunikasi di seluruh pulau.",
    room: "modern",
  },
  {
    year: "1998",
    titleEn: "Reformation Era",
    titleId: "Era Reformasi",
    bodyEn: "President Soeharto resigns, launching Indonesia's democratic transition.",
    bodyId: "Presiden Soeharto mundur, memulai transisi demokrasi Indonesia.",
    room: "modern",
  },
  {
    year: "2004",
    titleEn: "Direct Elections & Tsunami",
    titleId: "Pemilu Langsung & Tsunami",
    bodyEn: "First direct presidential election and the tragic Indian Ocean Tsunami.",
    bodyId: "Pemilu presiden langsung pertama dan bencana Tsunami Samudera Hindia.",
    room: "modern",
  },
  {
    year: "2009",
    titleEn: "UNESCO Batik Recognition",
    titleId: "Pengakuan Batik UNESCO",
    bodyEn: "UNESCO designates Indonesian Batik as Intangible Cultural Heritage.",
    bodyId: "UNESCO menetapkan Batik Indonesia sebagai Warisan Budaya Takbenda.",
    room: "heritage",
  },
  {
    year: "2024",
    titleEn: "New Capital Nusantara",
    titleId: "Ibu Kota Baru Nusantara",
    bodyEn: "Indonesia begins relocation of the national capital to East Kalimantan.",
    bodyId: "Indonesia mulai memindahkan ibu kota negara ke Kalimantan Timur.",
    room: "modern",
  }
];

export const quizQuestions = [
  {
    q: {
      en: "Which temple is recognized as the largest Buddhist temple in the world?",
      id: "Candi manakah yang diakui sebagai candi Buddha terbesar di dunia?",
    },
    options: [
      { en: "Borobudur", id: "Borobudur" },
      { en: "Prambanan", id: "Prambanan" },
      { en: "Mendut", id: "Mendut" },
      { en: "Sewu", id: "Sewu" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "When was the Proclamation of Indonesian Independence declared?",
      id: "Kapan Proklamasi Kemerdekaan Indonesia dideklarasikan?",
    },
    options: [
      { en: "17 August 1945", id: "17 Agustus 1945" },
      { en: "28 October 1928", id: "28 Oktober 1928" },
      { en: "1 June 1945", id: "1 Juni 1945" },
      { en: "20 May 1908", id: "20 Mei 1908" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Which UNESCO-listed Indonesian textile art uses wax-resist dyeing techniques?",
      id: "Seni tekstil Indonesia terdaftar di UNESCO yang menggunakan teknik rintangan lilin malam?",
    },
    options: [
      { en: "Songket", id: "Songket" },
      { en: "Batik", id: "Batik" },
      { en: "Ikat", id: "Ikat" },
      { en: "Tenun Sumba", id: "Tenun Sumba" },
    ],
    correct: 1,
  },
  {
    q: {
      en: "Where were the early human fossils of Homo erectus (Java Man) found?",
      id: "Di manakah fosil manusia purba Homo erectus (Manusia Jawa) ditemukan?",
    },
    options: [
      { en: "Sangiran", id: "Sangiran" },
      { en: "Pacitan", id: "Pacitan" },
      { en: "Liang Bua", id: "Liang Bua" },
      { en: "Gunung Padang", id: "Gunung Padang" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Who was the national hero that led the Java War (1825–1830)?",
      id: "Siapakah pahlawan nasional yang memimpin Perang Jawa (1825–1830)?",
    },
    options: [
      { en: "Prince Diponegoro", id: "Pangeran Diponegoro" },
      { en: "Sultan Agung", id: "Sultan Agung" },
      { en: "Tuanku Imam Bonjol", id: "Tuanku Imam Bonjol" },
      { en: "Pattimura", id: "Pattimura" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "What are the oldest known written inscriptions in Indonesia called?",
      id: "Apakah nama prasasti tertua yang diketahui di Indonesia?",
    },
    options: [
      { en: "Yupa Inscriptions", id: "Prasasti Yupa" },
      { en: "Ciaruteun Inscription", id: "Prasasti Ciaruteun" },
      { en: "Kedukan Bukit Inscription", id: "Prasasti Kedukan Bukit" },
      { en: "Tugu Inscription", id: "Prasasti Tugu" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Which Majapatih is famous for the Sumpah Palapa oath to unite Nusantara?",
      id: "Patih Majapahit siapakah yang terkenal dengan Sumpah Palapa untuk menyatukan Nusantara?",
    },
    options: [
      { en: "Gajah Mada", id: "Gajah Mada" },
      { en: "Hayam Wuruk", id: "Hayam Wuruk" },
      { en: "Mpu Prapanca", id: "Mpu Prapanca" },
      { en: "Raden Wijaya", id: "Raden Wijaya" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Which was the first Islamic Sultanate established in the Indonesian archipelago?",
      id: "Apakah kesultanan Islam pertama yang berdiri di kepulauan Nusantara?",
    },
    options: [
      { en: "Samudera Pasai", id: "Samudera Pasai" },
      { en: "Demak", id: "Demak" },
      { en: "Aceh Darussalam", id: "Aceh Darussalam" },
      { en: "Ternate", id: "Ternate" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "In which year was the Dutch East India Company (VOC) officially dissolved?",
      id: "Pada tahun berapakah Kongsi Dagang Hindia Timur Belanda (VOC) resmi dibubarkan?",
    },
    options: [
      { en: "1799", id: "1799" },
      { en: "1602", id: "1602" },
      { en: "1811", id: "1811" },
      { en: "1942", id: "1942" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "The founding of which organization in 1908 marks the National Awakening of Indonesia?",
      id: "Pendirian organisasi apa pada 1908 yang menandai Kebangkitan Nasional Indonesia?",
    },
    options: [
      { en: "Budi Utomo", id: "Budi Utomo" },
      { en: "Sarekat Islam", id: "Sarekat Islam" },
      { en: "Indische Partij", id: "Indische Partij" },
      { en: "PNI", id: "PNI" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "On which historic date was the Youth Pledge (Sumpah Pemuda) declared?",
      id: "Pada tanggal bersejarah manakah Sumpah Pemuda diikrarkan?",
    },
    options: [
      { en: "28 October 1928", id: "28 Oktober 1928" },
      { en: "20 May 1908", id: "20 Mei 1908" },
      { en: "17 August 1945", id: "17 Agustus 1945" },
      { en: "10 November 1945", id: "10 November 1945" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "In which year did Indonesia hold its first direct presidential election?",
      id: "Pada tahun berapakah Indonesia menyelenggarakan pemilu presiden langsung pertamanya?",
    },
    options: [
      { en: "2004", id: "2004" },
      { en: "1999", id: "1999" },
      { en: "1955", id: "1955" },
      { en: "2014", id: "2014" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Who designed the national emblem, Garuda Pancasila?",
      id: "Siapakah yang merancang lambang negara, Garuda Pancasila?",
    },
    options: [
      { en: "Sultan Hamid II", id: "Sultan Hamid II" },
      { en: "Muhammad Yamin", id: "Muhammad Yamin" },
      { en: "Soekarno", id: "Soekarno" },
      { en: "Ki Hajar Dewantara", id: "Ki Hajar Dewantara" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Which UNESCO-recognized musical instrument is made of tuned bamboo tubes?",
      id: "Alat musik terdaftar UNESCO manakah yang terbuat dari tabung bambu bernada?",
    },
    options: [
      { en: "Angklung", id: "Angklung" },
      { en: "Gamelan", id: "Gamelan" },
      { en: "Sasando", id: "Sasando" },
      { en: "Kolintang", id: "Kolintang" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "In which cave on the island of Flores were the Homo floresiensis ('Hobbit') fossils found?",
      id: "Di gua manakah di Pulau Flores fosil Homo floresiensis ('Hobbit') ditemukan?",
    },
    options: [
      { en: "Liang Bua Cave", id: "Gua Liang Bua" },
      { en: "Leang Tedongnge", id: "Leang Tedongnge" },
      { en: "Sangiran Dome", id: "Kubah Sangiran" },
      { en: "Cipari Cave", id: "Gua Cipari" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Who built the 1,000-kilometer Great Post Road (Jalan Raya Pos) across Java?",
      id: "Siapakah yang membangun Jalan Raya Pos sepanjang 1.000 kilometer melintasi Jawa?",
    },
    options: [
      { en: "Herman Willem Daendels", id: "Herman Willem Daendels" },
      { en: "Thomas Stamford Raffles", id: "Thomas Stamford Raffles" },
      { en: "Jan Pieterszoon Coen", id: "Jan Pieterszoon Coen" },
      { en: "Johannes van den Bosch", id: "Johannes van den Bosch" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Which Indonesian city hosted the historic 1955 Asia-Africa Conference?",
      id: "Kota Indonesia manakah yang menjadi tuan rumah Konferensi Asia-Afrika 1955?",
    },
    options: [
      { en: "Bandung", id: "Bandung" },
      { en: "Jakarta", id: "Jakarta" },
      { en: "Yogyakarta", id: "Yogyakarta" },
      { en: "Surabaya", id: "Surabaya" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "What was the name of the first communications satellite launched by Indonesia in 1976?",
      id: "Apakah nama satelit komunikasi pertama yang diluncurkan oleh Indonesia pada 1976?",
    },
    options: [
      { en: "Palapa A1", id: "Palapa A1" },
      { en: "Garuda 1", id: "Garuda 1" },
      { en: "Nusantara Satu", id: "Nusantara Satu" },
      { en: "Telkom-1", id: "Telkom-1" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Which island region is famous for maintaining a living megalithic stone culture today?",
      id: "Wilayah pulau manakah yang terkenal karena masih mempertahankan budaya batu megalitik hidup saat ini?",
    },
    options: [
      { en: "Nias Island", id: "Pulau Nias" },
      { en: "Bali Island", id: "Pulau Bali" },
      { en: "Sumba Island", id: "Pulau Sumba" },
      { en: "Flores Island", id: "Pulau Flores" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "In which Majapahit-era literary work is the national motto 'Bhinneka Tunggal Ika' found?",
      id: "Dalam karya sastra era Majapahit manakah semboyan negara 'Bhinneka Tunggal Ika' ditemukan?",
    },
    options: [
      { en: "Kakawin Sutasoma", id: "Kakawin Sutasoma" },
      { en: "Nagarakretagama", id: "Nagarakretagama" },
      { en: "Kakawin Bharatayuddha", id: "Kakawin Bharatayuddha" },
      { en: "Pararaton", id: "Pararaton" },
    ],
    correct: 0,
  },
];

export const achievements = [
  {
    id: "ancient",
    titleEn: "Ancient Explorer",
    titleId: "Penjelajah Kuno",
    descEn: "Visited the Ancient Indonesia Hall.",
    descId: "Mengunjungi Ruang Indonesia Kuno.",
  },
  {
    id: "kingdom",
    titleEn: "Kingdom Historian",
    titleId: "Sejarawan Kerajaan",
    descEn: "Visited the Kingdom Era Hall.",
    descId: "Mengunjungi Ruang Era Kerajaan.",
  },
  {
    id: "colonial",
    titleEn: "Colonial Witness",
    titleId: "Saksi Kolonial",
    descEn: "Visited the Colonial History Hall.",
    descId: "Mengunjungi Ruang Sejarah Kolonial.",
  },
  {
    id: "national",
    titleEn: "National Pioneer",
    titleId: "Pionir Nasional",
    descEn: "Visited the National Movement Hall.",
    descId: "Mengunjungi Ruang Pergerakan Nasional.",
  },
  {
    id: "modern",
    titleEn: "Modern Citizen",
    titleId: "Warga Modern",
    descEn: "Visited the Modern Indonesia Hall.",
    descId: "Mengunjungi Ruang Indonesia Modern.",
  },
  {
    id: "heritage",
    titleEn: "Heritage Guardian",
    titleId: "Penjaga Warisan",
    descEn: "Visited the Cultural Heritage & Nature Hall.",
    descId: "Mengunjungi Ruang Warisan Budaya & Alam.",
  },
  {
    id: "cinema",
    titleEn: "Cinema Goer",
    titleId: "Penonton Bioskop",
    descEn: "Visited the Cinema Studio Hall.",
    descId: "Mengunjungi Ruang Studio Bioskop.",
  },
  {
    id: "quiz",
    titleEn: "Quiz Master",
    titleId: "Master Kuis",
    descEn: "Completed the Heritage Quiz.",
    descId: "Menyelesaikan Kuis Warisan.",
  },
  {
    id: "master",
    titleEn: "Museum Master",
    titleId: "Maestro Museum",
    descEn: "Unlocked every other achievement.",
    descId: "Membuka semua pencapaian lain.",
  },
];
