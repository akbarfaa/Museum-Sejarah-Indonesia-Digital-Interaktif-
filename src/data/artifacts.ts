export type RoomId = "ancient" | "kingdom" | "colonial" | "independence" | "modern" | "cinema" | "studio";

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
    descEn: "Explore the prehistoric origins of early humans and ancient tools in the Indonesian archipelago.",
    descId: "Jelajahi asal-usul prasejarah manusia purba dan peralatan kuno di kepulauan Indonesia.",
    objectivesEn: [
      "Examine the Sangiran early human Java Man skull fossil",
      "Inspect the Pacitan Neolithic stone hand axe tool",
      "Discover the Megalithic Menhir standing stone from Sulawesi"
    ],
    objectivesId: [
      "Periksa fosil tengkorak manusia purba Sangiran (Manusia Jawa)",
      "Lihat alat kapak genggam batu Neolitik Pacitan",
      "Temukan batu berdiri Menhir Megalitik dari Sulawesi"
    ]
  },
  {
    id: "kingdom",
    nameEn: "Kingdom Era Hall",
    nameId: "Ruang Era Kerajaan",
    accent: "#c9a14a",
    ambient: "0.07 0.05 0.04",
    descEn: "Witness the golden age of Hindu-Buddhist maritime empires and Islamic sultanates across Nusantara.",
    descId: "Saksikan masa keemasan kerajaan maritim Hindu-Buddha dan Kesultanan Islam di Nusantara.",
    objectivesEn: [
      "Examine the sacred wavy-bladed Majapahit Royal Keris",
      "Read the stone Kedukan Bukit Inscription of Srivijaya",
      "Inspect the volcanic stone Ganesha Temple Statue",
      "View the gold gilded ceremonial Mataram Royal Crown"
    ],
    objectivesId: [
      "Periksa keris pusaka berlekuk peninggalan Majapahit",
      "Baca batu bersejarah Prasasti Kedukan Bukit dari Sriwijaya",
      "Lihat Arca Candi Ganesha dari batu vulkanik",
      "Saksikan Mahkota Emas seremonial Kerajaan Mataram"
    ]
  },
  {
    id: "colonial",
    nameEn: "Colonial History Hall",
    nameId: "Ruang Sejarah Kolonial",
    accent: "#7a8a9c",
    ambient: "0.05 0.05 0.06",
    descEn: "Understand the period of spice trade, European exploration, and the rise of local resistances.",
    descId: "Pahami masa perdagangan rempah, penjelajahan Eropa, dan bangkitnya perlawanan lokal.",
    objectivesEn: [
      "Examine the VOC Spice Trade Routes navigation map",
      "Inspect Prince Diponegoro's legendary Java War keris",
      "View historical albumen prints of the old harbor of Batavia"
    ],
    objectivesId: [
      "Periksa peta navigasi jalur perdagangan rempah-rempah VOC",
      "Lihat keris pusaka perang legendaris Pangeran Diponegoro",
      "Saksikan cetakan foto album kuno pelabuhan Batavia"
    ]
  },
  {
    id: "independence",
    nameEn: "Independence Hall",
    nameId: "Ruang Kemerdekaan",
    accent: "#c0392b",
    ambient: "0.07 0.04 0.04",
    descEn: "Relive the historic steps of the Indonesian struggle for sovereignty and national proclamation.",
    descId: "Ikuti langkah bersejarah perjuangan bangsa Indonesia merebut kedaulatan dan proklamasi nasional.",
    objectivesEn: [
      "Read the typed text of the Proclamation of Independence",
      "Examine the original Merah Putih flag sewn by Fatmawati",
      "Read historic speech logs of President Soekarno"
    ],
    objectivesId: [
      "Baca naskah ketikan teks Proklamasi Kemerdekaan RI",
      "Saksikan bendera pusaka merah-putih jepitan Fatmawati",
      "Baca kumpulan arsip pidato bersejarah Presiden Soekarno"
    ]
  },
  {
    id: "modern",
    nameEn: "Modern Indonesia Hall",
    nameId: "Ruang Indonesia Modern",
    accent: "#4aa3c9",
    ambient: "0.04 0.05 0.07",
    descEn: "Celebrate contemporary cultural heritage, national symbols, and modern technological integration.",
    descId: "Rayakan warisan budaya kontemporer, simbol negara, dan integrasi teknologi modern.",
    objectivesEn: [
      "View the gold-crowned miniature National Monument (Monas)",
      "Examine UNESCO-recognized wax-resist Batik cloth art",
      "Inspect the Palapa Satellite model that unified the islands"
    ],
    objectivesId: [
      "Saksikan miniatur Monumen Nasional (Monas) bermahkota emas",
      "Periksa kain kerajinan Batik warisan budaya UNESCO",
      "Lihat model Satelit Palapa pemersatu ribuan pulau"
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
    descEn: "Customize your profile and create a personalized Polaroid souvenir photograph of your journey inside the History Of Indonesia Virtual Museum.",
    descId: "Kustomisasi profil Anda dan buatlah foto suvenir Polaroid personal dari perjalanan Anda di History Of Indonesia Virtual Museum.",
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

export const artifacts: Artifact[] = [
  {
    "id": "homo-erectus",
    "room": "ancient",
    "shape": "texture",
    "color": "#8b6f47",
    "position": [
      -6,
      -4
    ],
    "name": {
      "en": "Java Man Skull",
      "id": "Tengkorak Manusia Jawa"
    },
    "origin": {
      "en": "Sangiran, Central Java",
      "id": "Sangiran, Jawa Tengah"
    },
    "era": {
      "en": "c. 1.5 million years ago",
      "id": "± 1,5 juta tahun lalu"
    },
    "description": {
      "en": "Java Man (Homo erectus erectus, formerly also Anthropopithecus erectus or Pithecanthropus erectus) is an early human fossil discovered in 1891 and 1892 on the island of Java (Indonesia). Estimated to be between 700,000 and 1,490,000 years old, it was, at the time of its discovery, the oldest hominid fossil ever found, and it remains the type specimen for Homo erectus. Led by Eugène Dubois, the excavation team uncovered a tooth, a skullcap, and a thighbone at Trinil on the banks of the Solo River in East Java. Arguing that the fossils represented the \"missing link\" between apes and humans, Dubois gave the species the scientific name Anthropopithecus erectus, then later renamed it Pithecanthropus erectus.",
      "id": "Manusia Jawa (Homo erectus erectus) adalah jenis Homo erectus yang pertama kali ditemukan. Pada awal penemuan, makhluk mirip manusia ini diberi nama ilmiah Pithecanthropus erectus oleh Eugène Dubois, pemimpin tim yang berhasil menemukan fosil tengkoraknya di Trinil, Ngawi pada tahun 1891. Nama Pithecanthropus erectus sendiri berasal dari akar bahasa Yunani dan latin dan memiliki arti manusia-kera yang dapat berdiri."
    }
  },
  {
    "id": "stone-axe",
    "room": "ancient",
    "shape": "sword",
    "color": "#6b5a3a",
    "position": [
      6,
      -4
    ],
    "name": {
      "en": "Neolithic Hand Axe",
      "id": "Kapak Genggam Neolitik"
    },
    "origin": {
      "en": "Pacitan, East Java",
      "id": "Pacitan, Jawa Timur"
    },
    "era": {
      "en": "c. 8000 BCE",
      "id": "± 8000 SM"
    },
    "description": {
      "en": "A hand axe (or handaxe or  Acheulean hand axe) is a prehistoric stone tool with two faces that is the longest-used tool in human history. It is made from stone, usually flint or chert that has been \"reduced\" and shaped from a larger piece by knapping, or hitting against another stone. They are characteristic of the lower Acheulean and middle Palaeolithic (Mousterian) periods, roughly 1.6 million years ago to about 100,000 years ago, and used by Homo erectus and other early humans, but rarely by Homo sapiens. Their technical name (biface) comes from the fact that the archetypical model is a generally bifacial (with two wide sides or faces) and almond-shaped (amygdaloid) lithic flake.",
      "id": "Kapak genggam adalah sebuah batu yang mirip dengan kapak, tetapi tidak bertangkai dan cara mempergunakannya dengan cara menggenggam. Kapak genggam terkenal juga dengan sebutan kapak perimbas, dalam ilmu prasejarah disebut chopper artinya alat penetak. Kapak genggam pernah ditemukan oleh Gustav Heinrich Ralph von Koenigswald pada 1935 di Pacitan, Jawa Timur. Batu genggam biasanya dibuat dari batu gamping."
    }
  },
  {
    "id": "megalith",
    "room": "ancient",
    "shape": "tablet",
    "color": "#7a7062",
    "position": [
      -6,
      4
    ],
    "name": {
      "en": "Megalithic Menhir",
      "id": "Menhir Megalitik"
    },
    "origin": {
      "en": "Lore Lindu, Central Sulawesi",
      "id": "Lore Lindu, Sulawesi Tengah"
    },
    "era": {
      "en": "c. 1500 BCE",
      "id": "± 1500 SM"
    },
    "description": {
      "en": "A menhir (; from Brittonic languages: maen or men, \"stone\" and hir or hîr, \"long\"), standing stone, orthostat, or lith is a large upright stone, emplaced in the ground by humans, typically dating from the European middle Bronze Age. They can be found individually as monoliths, or as part of a group of similar stones. Menhirs' sizes can vary considerably, but they often taper toward the top. Menhirs are found across Europe, Africa, and Asia, with a concentration in Western Europe, notably in Ireland, Great Britain, and Brittany.",
      "id": "Menhir adalah batu tunggal, biasanya berukuran besar, yang ditatah seperlunya sehingga berbentuk tugu dan biasanya diletakkan berdiri tegak di atas tanah. Istilah menhir diambil dari bahasa Keltik, dari kata men (batu) dan hir (panjang).Jadi,artinya adalah batu Panjang. Menhir biasanya didirikan secara tunggal atau berkelompok sejajar di atas tanah, tetapi pada beberapa tradisi juga ada yang diletakkan terlentang di tanah. Menhir, bersama-sama dengan dolmen dan sarkofagus, adalah megalit."
    }
  },
  {
    "id": "sangiran-site",
    "room": "ancient",
    "shape": "wall",
    "color": "#7c5c3c",
    "position": [
      -10.85,
      -2
    ],
    "name": {
      "en": "Sangiran Archaeological Site",
      "id": "Situs Arkeologi Sangiran"
    },
    "origin": {
      "en": "Sangiran Dome, Central Java",
      "id": "Kubah Sangiran, Jawa Tengah"
    },
    "era": {
      "en": "Pleistocene Epoch",
      "id": "Kala Pleistosen"
    },
    "description": {
      "en": "Sangiran is an archaeological excavation site in Java in Indonesia. According to a UNESCO report (1995) \"Sangiran is recognized by scientists to be one of the most important sites in the world for studying fossil man, ranking alongside Zhoukoudian (China), Willandra Lakes (Australia), Olduvai Gorge (Tanzania), and Sterkfontein (South Africa), and more fruitful in finds than any of these.\"\nThe area comprises about 56 km2 (7 km x 8 km). It is located in Central Java, about 15 kilometers north of Surakarta in the Solo River valley. Administratively, Sangiran area is divided between 2 regencies: Sragen (districts of Gemolong, Kalijambe, and Plupuh) and Karanganyar (district of Gondangrejo).",
      "id": "Sangiran adalah situs arkeologi di Jawa, Indonesia. Menurut laporan UNESCO (1995) \"Sangiran diakui oleh para ilmuwan untuk menjadi salah satu situs yang paling penting di dunia untuk mempelajari fosil manusia, disejajarkan bersama situs Zhoukoudian (Cina), Willandra Lakes (Australia), Olduvai Gorge (Tanzania), dan Sterkfontein (Afrika Selatan), dan lebih baik dalam penemuan daripada yang lain.\"\nDaerah terdiri dari sekitar 56 km² (7 km x 8 km). Lokasi ini terletak di Jawa Tengah, sekitar 15 kilometer sebelah utara Surakarta di lembah Sungai Bengawan Solo. Secara administratif, kawasan Sangiran terbagi antara 2 kabupaten: Kabupaten Sragen (Kecamatan Gemolong, Kecamatan Kalijambe, dan Plupuh) dan Kabupaten Karanganyar (Kecamatan Gondangrejo)."
    }
  },
  {
    "id": "nias-megalith",
    "room": "ancient",
    "shape": "wall",
    "color": "#8a8275",
    "position": [
      10.85,
      -2
    ],
    "name": {
      "en": "Nias Megalithic Site",
      "id": "Situs Megalitik Nias"
    },
    "origin": {
      "en": "Nias Island, North Sumatra",
      "id": "Pulau Nias, Sumatera Utara"
    },
    "era": {
      "en": "c. 500 BCE - 1000 CE",
      "id": "± 500 SM - 1000 M"
    },
    "description": {
      "en": "The Nias (Nias: Ono Niha, lit. 'descendants of humans'; Indonesian: Orang Nias) or Niasans, are an Austronesian ethnic group native to Nias, an island off the west coast of North Sumatra, Indonesia. In the Nias language Nias Island is known as Tanö Niha, with Tanö meaning 'land' in the Nias language. The Nias people are a community that continues living within the norms and practices of their indigenous culture.",
      "id": "Tradisi Megalitik Nias mewakili kebudayaan monumen batu hidup di mana struktur batu besar didirikan untuk menghormati kepala suku dan ritual adat. Berasal dari 500 SM hingga 1000 M, meja dan pilar batu ini mencerminkan struktur sosial suku yang terorganisir, terkenal dengan tradisi lompat batu."
    }
  },
  {
    "id": "keris",
    "room": "kingdom",
    "shape": "texture",
    "color": "#3a2e1f",
    "position": [
      -6,
      -4
    ],
    "name": {
      "en": "Royal Keris",
      "id": "Keris Pusaka"
    },
    "origin": {
      "en": "Majapahit Empire, Java",
      "id": "Kekaisaran Majapahit, Jawa"
    },
    "era": {
      "en": "14th Century",
      "id": "Abad ke-14"
    },
    "description": {
      "en": "The kris or keris is a Javanese asymmetrical dagger with a distinctive blade-patterning achieved through alternating laminations of iron and nickelous iron (pamor). The kris is famous for its distinctive wavy blade, although many have straight blades as well, and is one of the weapons commonly used in the pencak silat martial art native to Indonesia. Kris have been produced in many regions of Indonesia for centuries, but nowhere—although the island of Bali comes close—is the kris so embedded in a mutually-connected whole of ritual prescriptions and acts, ceremonies, storied backgrounds, and epic poetry as in Central Java. Within Indonesia the kris is commonly associated with Javanese culture, although other ethnicities in the surrounding regions are familiar with the weapon as part of their cultures, such as the Balinese, Sundanese, Malay, Madurese, Banjar, Buginese, and Makassar people.",
      "id": "Keris merupakan senjata tajam golongan belati dari suku Jawa yang memiliki ragam fungsi budaya yang dikenal di kawasan Nusantara bagian barat dan tengah. Bentuknya khas dan mudah dibedakan dari senjata tajam lainnya karena tidak simetris di bagian pangkal yang melebar, sering kali bilahnya berkelok-kelok, dan banyak di antaranya memiliki pamor (damascene), yaitu terlihat serat-serat lapisan logam pada helai bilah. Keris bagi orang Jawa adalah senjata pemungkas/terakhir setelah pedang, tombak, dan panah. Sejatinya keris bukanlah senjata utama dalam peperangan tetapi juga senjata yang disukai untuk dibawa pergi ke mana pun."
    }
  },
  {
    "id": "ganesha",
    "room": "kingdom",
    "shape": "texture",
    "color": "#6e5a2f",
    "position": [
      6,
      -4
    ],
    "name": {
      "en": "Ganesha Statue",
      "id": "Arca Ganesha"
    },
    "origin": {
      "en": "Singosari Temple, East Java",
      "id": "Candi Singosari, Jawa Timur"
    },
    "era": {
      "en": "10th Century",
      "id": "Abad ke-10"
    },
    "description": {
      "en": "Ganesha, or Ganesh (Sanskrit: गणेश, IAST: Gaṇeśa, IPA: [ɡɐˈɳeːɕɐ]), also known as Ganapati, Vinayaka and Pillaiyar, is one of the best-known and most revered and worshipped deities in the Hindu pantheon and is the Supreme god in the Ganapatya sect. His depictions are found throughout India. Hindu denominations worship him regardless of affiliations. Ganesha also holds the Title of \"Pratham Pujya\" (the god to be worshipped initially before the worship of any other Deity).",
      "id": "Ganesa  (Dewanagari: गणेश; ,IAST: Gaṇeśa,; ) adalah salah satu dewa terkenal dalam agama Hindu dan banyak dipuja oleh umat Hindu, yang memiliki gelar sebagai Dewa pengetahuan dan kecerdasan, Dewa pelindung, Dewa penolak bala/bencana dan Dewa kebijaksanaan. Lukisan dan patungnya banyak ditemukan di berbagai penjuru India; termasuk Nepal, Tibet dan Asia Tenggara. Dalam relief, patung dan lukisan, ia sering digambarkan berkepala gajah, berlengan empat dan berbadan gemuk. Ia dikenal pula dengan nama Ganapati, Winayaka dan Pilleyar."
    }
  },
  {
    "id": "inscription",
    "room": "kingdom",
    "shape": "tablet",
    "color": "#4a3f2a",
    "position": [
      -6,
      4
    ],
    "name": {
      "en": "Kedukan Bukit Inscription",
      "id": "Prasasti Kedukan Bukit"
    },
    "origin": {
      "en": "Srivijaya, South Sumatra",
      "id": "Sriwijaya, Sumatera Selatan"
    },
    "era": {
      "en": "682 CE",
      "id": "682 M"
    },
    "description": {
      "en": "The Kedukan Bukit inscription (Indonesian: Prasasti Kedukan Bukit) is an inscription discovered by the Dutchman C.J. Batenburg on 29 November 1920 at Kedukan Bukit, South Sumatra, Dutch East Indies (now Indonesia), on the banks of Tatang River, a tributary of Musi River. It is the oldest surviving specimen of the Malay language, in a form known as Old Malay. It is a small stone of 45 cm × 80 cm (18 in × 31 in).",
      "id": "Prasasti Kedukan Bukit ditemukan oleh C.J. Batenburg pada tanggal 29 November 1920 di Kampung Kedukan Bukit, Kelurahan 35 Ilir, Palembang, Sumatera Selatan, di tepi Sungai Tatang yang mengalir ke Sungai Musi. Prasasti ini berbentuk batu kecil berukuran 45 × 80 cm, ditulis dalam aksara Pallawa, menggunakan Bahasa Melayu Kuno Prasasti ini sekarang disimpan di Museum Nasional Indonesia dengan nomor D.146."
    }
  },
  {
    "id": "crown",
    "room": "kingdom",
    "shape": "texture",
    "color": "#c9a14a",
    "position": [
      6,
      4
    ],
    "name": {
      "en": "Mataram Royal Crown",
      "id": "Mahkota Kerajaan Mataram"
    },
    "origin": {
      "en": "Mataram Sultanate, Java",
      "id": "Kesultanan Mataram, Jawa"
    },
    "era": {
      "en": "17th Century",
      "id": "Abad ke-17"
    },
    "description": {
      "en": "The Sultanate of Mataram () was an early modern state based on the island of Java that lasted from the late 16th century to the 18th century. At its peak, Mataram was one of the most powerful kingdoms in the Indonesian archipelago and Southeast Asia. Along with Aceh and Makassar, it has been referred to as one of Southeast Asia's major \"gunpowder empires.\" At its greatest extent, Mataram's territory spanned most of mainland Java and Madura, with vassals in Palembang, Sukadana, and Jambi. Mataram reached its peak of power during the reign of Sultan Agung Anyokrokusumo (r.",
      "id": "Kesultanan Mataram atau Kesunanan Mataram (bahasa Jawa: ꧋ꦤꦒꦫꦶꦏꦱꦸꦭ꧀ꦠꦤꦤ꧀ꦩꦠꦫꦩ꧀, Pegon: نڮاري كسولتانن متارامcode: jv is deprecated , translit. Nagari Kasultanan Mataram) adalah sebuah kerajaan Islam di Pulau Jawa dari akhir abad ke-16, ketika Panembahan Senapati dinobatkan menjadi raja, hingga 1755, ketika Mataram dibagi menjadi negara-negara lebih kecil dalam Perjanjian Giyanti. Kerajaan ini dipimpin oleh Wangsa Mataram. Sepanjang abad ke-17, tepatnya di bawah pemerintahan Sultan Agung, Mataram adalah salah satu negara terkuat di Jawa yang menyatukan Jawa Tengah, Yogyakarta, sebagian besar Jawa Barat (kecuali Banten) dan Jawa Timur (termasuk Madura), Sukadana (Kalimantan Barat), Makassar, hingga Pulau Sumatra (Palembang dan Jambi)."
    }
  },
  {
    "id": "borobudur",
    "room": "kingdom",
    "shape": "wall",
    "color": "#706a58",
    "position": [
      -10.85,
      0
    ],
    "name": {
      "en": "Borobudur Temple Photo",
      "id": "Foto Candi Borobudur"
    },
    "origin": {
      "en": "Magelang, Central Java",
      "id": "Magelang, Jawa Tengah"
    },
    "era": {
      "en": "9th Century",
      "id": "Abad ke-9"
    },
    "description": {
      "en": "Borobudur, also transcribed Barabudur (Indonesian: Candi Borobudur, Javanese: ꦕꦤ꧀ꦝꦶꦧꦫꦧꦸꦝꦸꦂ, romanized: Candhi Barabudhur), is a 9th-century Mahayana Buddhist temple in Magelang Regency, near the town of Muntilan, northwest of the city of Yogyakarta, in Central Java, Indonesia. Constructed of gray andesite-like stone, the temple consists of nine stacked platforms, six square and three circular, topped by a central dome. It is decorated with 2,672 relief panels and originally 504 Buddha statues. The central dome is surrounded by 72 Buddha statues, each seated inside a perforated stupa.",
      "id": "Candi Borobudur (bahasa Jawa: ꦕꦟ꧀ꦝꦶꦧꦫꦧꦸꦝꦸꦂcode: jv is deprecated , translit. Candhi Båråbudhur) adalah sebuah candi Buddha yang terletak di Borobudur, Magelang, Jawa Tengah, Indonesia. Candi ini terletak kurang lebih 100 km di sebelah barat daya Semarang, 86 km di sebelah barat Surakarta, dan 40 km di sebelah barat laut Yogyakarta. Candi dengan banyak stupa ini didirikan oleh para penganut agama Buddha Mahayana sekitar tahun 800-an Masehi pada masa pemerintahan wangsa Syailendra, dan diperkirakan baru rampung sekitar tahun 825 M."
    }
  },
  {
    "id": "prambanan",
    "room": "kingdom",
    "shape": "wall",
    "color": "#7e786b",
    "position": [
      10.85,
      0
    ],
    "name": {
      "en": "Prambanan Temple Relief",
      "id": "Relief Candi Prambanan"
    },
    "origin": {
      "en": "Sleman, Yogyakarta",
      "id": "Sleman, Yogyakarta"
    },
    "era": {
      "en": "10th Century",
      "id": "Abad ke-10"
    },
    "description": {
      "en": "Prambanan (Indonesian: Candi Prambanan, Javanese: Rara Jonggrang, Hanacaraka: ꦫꦫꦗꦺꦴꦁꦒꦿꦁ) is a 9th-century Hindu temple compound in the Special Region of Yogyakarta, in southern Java, Indonesia, dedicated to the Trimūrti, the expression of God as the Creator (Brahma), the Preserver (Vishnu) and the Destroyer (Shiva). The temple compound is located approximately 17 kilometres (11 mi) northeast of the city of Yogyakarta on the boundary between Central Java and Yogyakarta provinces. The temple compound, a UNESCO World Heritage Site, is the largest Hindu temple site in Indonesia and the second-largest in Southeast Asia after Angkor Wat. It is characterized by its tall and pointed architecture, typical of Hindu architecture, and by the towering 47-metre-high (154 ft) central building inside a large complex of individual temples.",
      "id": "Candi Prambanan (bahasa Jawa: ꦕꦟ꧀ꦝꦶꦥꦿꦩ꧀ꦧꦤꦤ꧀code: jv is deprecated , translit. Caṇḍi Prambanan) adalah bangunan candi bercorak agama Hindu terbesar di Indonesia yang dibangun pada abad ke-9 Masehi. Candi yang juga disebut sebagai Rara Jonggrang ini dipersembahkan untuk Trimurti, tiga dewa utama Hindu yaitu dewa Brahma sebagai dewa pencipta, dewa Wisnu sebagai dewa pemelihara, dan dewa Siwa sebagai dewa pemusnah. Berdasarkan prasasti Siwagrha nama asli kompleks candi ini adalah Siwagrha (bahasa Sanskerta yang bermakna 'Rumah Siwa'), dan memang di garbagriha (ruang utama) candi ini bersemayam arca Siwa Mahadewa setinggi tiga meter, karena aliran Syaiwa mengutamakan pemujaan dewa Siwa di candi ini."
    }
  },
  {
    "id": "voc-map",
    "room": "colonial",
    "shape": "wall",
    "color": "#a89373",
    "position": [
      -10.85,
      -2
    ],
    "name": {
      "en": "VOC Trade Map",
      "id": "Peta Dagang VOC"
    },
    "origin": {
      "en": "Dutch East India Company",
      "id": "Vereenigde Oostindische Compagnie"
    },
    "era": {
      "en": "1670",
      "id": "1670"
    },
    "description": {
      "en": "The United East India Company (Dutch: Vereenigde Oostindische Compagnie [vərˈeːnɪɣdə oːstˈɪndisə kɔmpɑˈɲi]; abbr. VOC [veː(j)oːˈseː]), commonly known as the Dutch East India Company, was a chartered trading company and one of the first joint-stock companies in the world. Established on 20 March 1602 by the States General of the Netherlands amalgamating existing companies, it was granted a 21-year monopoly to carry out trade activities in Asia. Shares in the company could be purchased by any citizen of the Dutch Republic and bought and sold in open-air secondary markets, one of which became the Amsterdam Stock Exchange.",
      "id": "Perusahaan Hindia Timur Belanda, secara resmi bernama Perserikatan Perusahaan Hindia Timur (bahasa Belanda: Vereenigde Oostindische Compagniecode: nl is deprecated ; disingkat VOC) didirikan pada 20 Maret 1602. VOC adalah persekutuan dagang asal Belanda yang memiliki monopoli untuk aktivitas perdagangan di Asia. Disebut Hindia Timur karena ada pula Geoctroyeerde Westindische Compagnie yang merupakan persekutuan dagang untuk kawasan Hindia Barat. Perusahaan ini dianggap sebagai perusahaan multinasional pertama di dunia  sekaligus merupakan perusahaan pertama yang mengeluarkan sistem pembagian saham."
    }
  },
  {
    "id": "diponegoro-kris",
    "room": "colonial",
    "shape": "sword",
    "color": "#2f2418",
    "position": [
      -6,
      -4
    ],
    "name": {
      "en": "Kiai Naga Siluman",
      "id": "Kiai Naga Siluman"
    },
    "origin": {
      "en": "Java War, Yogyakarta",
      "id": "Perang Jawa, Yogyakarta"
    },
    "era": {
      "en": "1825–1830",
      "id": "1825–1830"
    },
    "description": {
      "en": "Prince Diponegoro (Javanese: ꦢꦶꦥꦤꦼꦒꦫ, romanized: Dipånegårå; born Bendara Raden Mas Mustahar, ꦧꦼꦤ꧀ꦢꦫꦫꦢꦺꦤ꧀ꦩꦱ꧀ꦩꦸꦱ꧀ꦠꦲꦂ; later Bendara Raden Mas Antawirya, ꦧꦼꦤ꧀ꦢꦫꦫꦢꦺꦤ꧀ꦩꦱ꧀ꦲꦤ꧀ꦠꦮꦶꦂꦪ; 11 November 1785 – 8 January 1855), also known as Dipanegara and Dipa Negara, was a Javanese prince who opposed the Dutch colonial rule. The eldest son of the Yogyakarta Sultan Hamengkubuwono III, he played an important role in the Java War between 1825 and 1830. After his defeat and capture, he was exiled to Makassar, where he died at 69 years old. His five-year struggle against the Dutch control of Java has become celebrated by Indonesians throughout the years, acting as a source of inspiration for the fighters in the Indonesian National Revolution and nationalism in modern-day Indonesia among others.",
      "id": "Pangeran Diponegoro (Bahasa Jawa: ꦣꦶꦥꦤꦒꦫ, Dipanagara; lahir sebagai Bendara Raden Mas Mustahar; kemudian Bendara Raden Mas Antawirya ꦧꦼꦤ꧀ꦢꦫꦫꦢꦺꦤ꧀ꦩꦱ꧀ꦲꦤ꧀ꦠꦮꦶꦂꦪ; 11 November 1785 – 8 Januari 1855) adalah seorang pangeran Jawa yang menentang pemerintahan kolonial Belanda. Putra sulung Hamengkubuwana III ini memegang peranan penting dalam Perang Jawa tahun 1825 hingga 1830. Setelah kalah dan tertangkap, ia diasingkan ke Manado dan Makassar, dan meninggal di Makassar pada usia 69 tahun. Perjuangannya selama lima tahun melawan kekuasaan Belanda di Jawa telah dirayakan oleh masyarakat Indonesia selama bertahun-tahun, menjadi sumber inspirasi bagi para pejuang Revolusi Nasional Indonesia dan nasionalisme di Indonesia modern antara lain."
    }
  },
  {
    "id": "old-photo",
    "room": "colonial",
    "shape": "wall",
    "color": "#7a6a5a",
    "position": [
      10.85,
      -2
    ],
    "name": {
      "en": "Batavia Photograph",
      "id": "Foto Batavia"
    },
    "origin": {
      "en": "Batavia (Jakarta)",
      "id": "Batavia (Jakarta)"
    },
    "era": {
      "en": "c. 1890",
      "id": "± 1890"
    },
    "description": {
      "en": "Batavia was an imperial Dutch port city that eventually, after two centuries of Dutch occupation, became the capital of the Dutch East Indies. The area corresponds to present-day Jakarta, Indonesia. Batavia can refer to the city proper or its suburbs and hinterland, the Ommelanden, which included the much larger area of the Residency of Batavia in the present-day Indonesian provinces of Jakarta Banten and West Java. The founding of Batavia by the Dutch in 1619, on the site of the ruins of Jayakarta, led to the establishment of a Dutch colony; Batavia became the center of the Dutch East India Company's trading network in Asia.",
      "id": "Batavia adalah ibu kota Hindia Belanda. Wilayahnya setara dengan Jakarta saat ini, Indonesia. Batavia dapat merujuk pada kota itu sendiri atau pinggiran kota dan daerah pedalamannya, Ommelanden, yang mencakup wilayah yang jauh lebih luas dari Keresidenan Batavia di provinsi-provinsi Indonesia saat ini, yaitu Jakarta, Banten, dan Jawa Barat. Pendirian Batavia oleh Belanda pada tahun 1619, di lokasi reruntuhan Jayakarta, menyebabkan berdirinya koloni Belanda; Batavia menjadi pusat jaringan perdagangan Perusahaan Hindia Timur Belanda di Asia."
    }
  },
  {
    "id": "hasanuddin-helmet",
    "room": "colonial",
    "shape": "texture",
    "color": "#6b583f",
    "position": [
      6,
      -4
    ],
    "name": {
      "en": "Sultan Hasanuddin Helmet",
      "id": "Helm Sultan Hasanuddin"
    },
    "origin": {
      "en": "Kingdom of Gowa, South Sulawesi",
      "id": "Kerajaan Gowa, Sulawesi Selatan"
    },
    "era": {
      "en": "17th Century",
      "id": "Abad ke-17"
    },
    "description": {
      "en": "Sultan Hasanuddin (Sultan Hasanuddin Tumenanga Ri Balla Pangkana; (12 January 1631 – 12 June 1670) was the 16th Ruler of The Sultanate of Gowa as Sombaya Ri Gowa XVI from 1653 to 1669. He was proclaimed as Indonesian National Hero on 6 November 1973. The Dutch called Sultan Hasanuddin \"the Rooster of the East\" as he was described as aggressive in battle.",
      "id": "Sultan Hasanuddin (Dijuluki Ayam Jantan dari Timur oleh Belanda) (12 Januari 1631 – 12 Juni 1670) adalah Sultan Gowa ke-16 dan pahlawan nasional Indonesia yang terlahir dengan nama Muhammad Bakir I Mallombasi Daeng Mattawang Karaeng Bonto Mangape. Setelah menaiki takhta, ia diberi gelar Sultan Hasanuddin, setelah meninggal ia digelar Tumenanga Ri Balla Pangkana. Karena keberaniannya, ia dijuluki De Haantjes van Het Osten oleh Belanda yang artinya Ayam Jantan dari Timur. Ia dimakamkan di Katangka, Kabupaten Gowa."
    }
  },
  {
    "id": "banda-spices",
    "room": "colonial",
    "shape": "texture",
    "color": "#5c704f",
    "position": [
      -6,
      4
    ],
    "name": {
      "en": "Banda Nutmeg Artifact",
      "id": "Artefak Pala Banda"
    },
    "origin": {
      "en": "Banda Islands, Maluku",
      "id": "Kepulauan Banda, Maluku"
    },
    "era": {
      "en": "16th-18th Century",
      "id": "Abad ke-16 - ke-18"
    },
    "description": {
      "en": "The Banda Islands (Indonesian: Kepulauan Banda) are a volcanic group of ten small islands in the Banda Sea, about 140 km (87 mi) south of Seram Island and about 2,000 km (1,243 mi) east of Java, and constitute an administrative district (kecamatan) within the Central Maluku Regency in the Indonesian province of Maluku. The islands rise out of 4-to-6-kilometre (2.5 to 3.7 mi) deep ocean and have a total land area of approximately 172 square kilometres (66 sq mi); with associated maritime area this reaches 736.3 square kilometres (284.3 sq mi). They had a population of 18,544 at the 2010 Census and 20,924 at the 2020 Census; the official estimate as of mid-2023 was 21,902. Until the mid-19th century the Banda Islands were the world's only source of the spices nutmeg and mace, produced from the nutmeg tree.",
      "id": "Kepulauan Banda adalah salah satu gugusan pulau yang berada dalam wilayah Maluku, Indonesia. Kepulauan Banda termasuk dalam wilayah Kecamatan Banda dengan wilayah administratif daratan seluas 55,3 km2. Pada tahun 2000, mayoritas produksi pala dunia masih berasal dari Kepulauan Banda. Kepulauan Banda terdiri atas beberapa pulau, seperti Pulau Lontor, Pulau Banda, Pulau Banda Api, Pulau Ai, Pulau Run, Pulau Pisang, Pulau Hatta, dan Pulau Karaba."
    }
  },
  {
    "id": "proklamasi",
    "room": "independence",
    "shape": "wall",
    "color": "#e8d6a3",
    "position": [
      -10.85,
      -2
    ],
    "name": {
      "en": "Proclamation Text",
      "id": "Teks Proklamasi"
    },
    "origin": {
      "en": "Jakarta",
      "id": "Jakarta"
    },
    "era": {
      "en": "17 August 1945",
      "id": "17 Agustus 1945"
    },
    "description": {
      "en": "The Proclamation of Indonesian Independence (Indonesian: Proklamasi Kemerdekaan Indonesia, or simply Proklamasi) was read at 10:00 Tokyo Standard Time on Friday, 17 August 1945 in Jakarta. The declaration marked the start of the diplomatic and armed resistance of the Indonesian National Revolution, fighting against the forces of the Netherlands and pro-Dutch civilians, until the latter officially acknowledged Indonesia's independence in 1949. The document was signed by Sukarno and Mohammad Hatta, who were appointed president and vice-president respectively the following day. The date of the Proclamation of Indonesian Independence was made a public holiday by a government decree issued on 18 June 1946.",
      "id": "Proklamasi Kemerdekaan Indonesia dibacakan oleh Soekarno dengan didampingi oleh Mohammad Hatta pada pukul 10:00 Waktu Standar Tokyo hari Jumat, 17 Agustus 1945 di sebuah rumah di Jalan Pegangsaan Timur No. 56, Jakarta Pusat. Pembacaan proklamasi ini menandai dimulainya perlawanan diplomatik dan bersenjata dari Revolusi Nasional Indonesia, yang berperang melawan pasukan Belanda dan warga sipil pro-Belanda, hingga Belanda secara resmi mengakui kemerdekaan Indonesia pada tahun 1949. Naskah Proklamasi ditandatangani oleh Soekarno dan Mohammad Hatta, yang masing-masing diangkat menjadi presiden dan wakil presiden keesokan harinya."
    }
  },
  {
    "id": "merah-putih",
    "room": "independence",
    "shape": "wall",
    "color": "#c0392b",
    "position": [
      10.85,
      -2
    ],
    "name": {
      "en": "Sang Saka Merah Putih",
      "id": "Sang Saka Merah Putih"
    },
    "origin": {
      "en": "Sewn by Fatmawati",
      "id": "Dijahit oleh Fatmawati"
    },
    "era": {
      "en": "1945",
      "id": "1945"
    },
    "description": {
      "en": "The national flag of Indonesia is bicolor, with two horizontal bands, red (top) and white (bottom) with an overall ratio of 2:3. It was introduced and hoisted in public during the proclamation of independence on 17 August 1945 at 56 Jalan Proklamasi (formerly Jalan Pegangsaan Timur) in Jakarta, and again when the Dutch formally transferred sovereignty on 27 December 1949. The design of the flag has remained unchanged since. The flag of Indonesia is graphically similar to the flag of Monaco, with a slight difference in the shade of red, and ratio of its dimensions.",
      "id": "Bendera Indonesia (disingkat bendera negara) atau biasa juga disebut Sang Merah Putih, (Sang Saka Merah Putih, Merah Putih, atau kadang Sang Dwiwarna (dua warna)) adalah bendera negara Indonesia dengan dua warna, dengan dua garis horizontal, merah (atas) dan putih (bawah) dengan rasio keseluruhan 2:3. Bendera negara berbentuk empat persegi panjang dengan ukuran lebar 2/3 (dua-pertiga) dari panjang dengan bagian atas berwarna merah dan bagian bawah berwarna putih yang kedua bagiannya berukuran sama. Bendera ini diperkenalkan dan dikibarkan di depan umum pada saat proklamasi kemerdekaan pada 17 Agustus 1945 di Jalan Proklamasi 56 (sebelumnya Jalan Pegangsaan Timur) di Jakarta, dan sekali lagi ketika Belanda secara resmi menyerahkan kedaulatan pada 27 Desember 1949. Desain bendera tersebut tetap tidak berubah sejak saat itu."
    }
  },
  {
    "id": "soekarno-speech",
    "room": "independence",
    "shape": "book",
    "color": "#3a2a1a",
    "position": [
      -6,
      -4
    ],
    "name": {
      "en": "Soekarno's Speeches",
      "id": "Pidato Soekarno"
    },
    "origin": {
      "en": "Office of the President",
      "id": "Kantor Presiden"
    },
    "era": {
      "en": "1945–1965",
      "id": "1945–1965"
    },
    "description": {
      "en": "Sukarno (born Koesno Sosrodihardjo; 6 June 1901 – 21 June 1970) was an Indonesian statesman, activist, and revolutionary who served as the first president of Indonesia from 1945 to 1967. Sukarno was the leader of the Indonesian struggle for independence from the Dutch colonialists. He was a prominent leader of Indonesia's nationalist movement during the colonial period and spent over a decade under Dutch detention until released by the invading Japanese forces in World War II. Sukarno and his fellow nationalists collaborated to garner support for the Japanese war effort from the population, in exchange for Japanese aid in spreading nationalist ideas.",
      "id": "Ir. Soekarno (Ejaan Republik: Sukarno; 6 Juni 1901 – 21 Juni 1970), dikenal juga dengan sapaan Bung Karno, adalah seorang negarawan, orator, dan Presiden Indonesia pertama yang menjabat sejak tahun 1945 sampai 1967. Ia menjabat sebagai presiden setelah memproklamasikan kemerdekaan Indonesia bersama wakilnya, Mohammad Hatta. Selain dikenal sebagai \"Bapak Proklamator\", Soekarno dikenal juga sebagai pencetus Pancasila, dasar negara dan ideologi bangsa Indonesia."
    }
  },
  {
    "id": "surabaya-spear",
    "room": "independence",
    "shape": "texture",
    "color": "#9c3b28",
    "position": [
      6,
      -4
    ],
    "name": {
      "en": "Surabaya Bamboo Spear",
      "id": "Bambu Runcing Surabaya"
    },
    "origin": {
      "en": "Surabaya, East Java",
      "id": "Surabaya, Jawa Timur"
    },
    "era": {
      "en": "November 1945",
      "id": "November 1945"
    },
    "description": {
      "en": "The Battle of Surabaya (Javanese: ꦦꦺꦂꦠꦺꦩ꧀ꦥꦸꦫꦤ꧀ ꦯꦸꦫꦧꦪ; Indonesian: Pertempuran Surabaya) was a major battle in the Indonesian National Revolution fought between regular infantry and militia of the Indonesian nationalist movement and British and British Indian troops against the re-imposition of Dutch colonial rule. The peak of the battle was in November 1945, and was the largest single battle of the revolution and became a national symbol of Indonesian resistance. Considered a heroic effort by Indonesians, the battle helped galvanise Indonesian and international support for Indonesian independence. 10 November is celebrated annually as Heroes' Day (Hari Pahlawan).",
      "id": "Pertempuran Surabaya (Jawa: ꦦꦺꦂꦠꦺꦩ꧀ꦥꦸꦫꦤ꧀ ꦯꦸꦫꦧꦪ; Inggris: Battle of Surabaya) merupakan pertempuran antara pasukan pejuang Indonesia yang diorganisasi oleh mantan pasukan anggota Pembela Tanah Air yang dibentuk oleh Pasukan Jepang dan Polisi Istimewa di waktu masa Pendudukan Jepang di Indonesia (yang dulunya Hindia Belanda) pada saat itu, yang bertujuan untuk mencegah pasukan sekutu pasca Jepang menyerah tanpa syarat kepada sekutu  di Perang Pasifik yang mendarat di kota Surabaya yang terdiri dari pasukan Kekaisaran Britania dengan sukarelawan Persemakmuran Britania yakni Angkatan Darat India Britania dengan mendapatkan dukungan khusus oleh tentara Kekaisaran Belanda. Puncaknya terjadi pada tanggal 10 November 1945. Pertempuran ini adalah perang pertama pasukan Indonesia dengan pasukan Sekutu  setelah Proklamasi Kemerdekaan Indonesia dan satu pertempuran terbesar dan terberat dalam sejarah Revolusi Nasional Indonesia yang menjadi simbol nasional atas perlawanan Indonesia terhadap kolonialisme dan Imperialisme. Usai pertempuran ini, dukungan rakyat Indonesia dan dunia internasional terhadap perjuangan kemerdekaan Indonesia makin kuat."
    }
  },
  {
    "id": "bung-tomo-radio",
    "room": "independence",
    "shape": "texture",
    "color": "#52433f",
    "position": [
      -6,
      4
    ],
    "name": {
      "en": "Bung Tomo's Radio Transceiver",
      "id": "Pemancar Radio Bung Tomo"
    },
    "origin": {
      "en": "Surabaya Broadcast Studio",
      "id": "Studio Siaran Surabaya"
    },
    "era": {
      "en": "1945 Resistance",
      "id": "Perjuangan 1945"
    },
    "description": {
      "en": "Sutomo (3 October 1920 – 7 October 1981), also known as Bung Tomo (meaning Comrade or Brother Tomo), was an Indonesian revolutionary and military leader best known for his role in the Indonesian National Revolution against Dutch colonial rule. He played a central role in the Battle of Surabaya, which was fought between British and Indonesian forces from October to November 1945.",
      "id": "Sutomo (3 Oktober 1920 – 7 Oktober 1981), juga dikenal sebagai Bung Tomo, adalah seorang pemimpin revolusioner dan militer Indonesia yang terkenal karena perannya dalam Revolusi Nasional Indonesia melawan pemerintahan kolonial Belanda. Dia memainkan peran sentral dalam Pertempuran Surabaya, yang terjadi antara pasukan Britania Raya dan Indonesia dari bulan Oktober hingga November 1945."
    }
  },
  {
    "id": "monas",
    "room": "modern",
    "shape": "crown",
    "color": "#d6c47a",
    "position": [
      -6,
      -4
    ],
    "name": {
      "en": "Monas Miniature",
      "id": "Miniatur Monas"
    },
    "origin": {
      "en": "Jakarta",
      "id": "Jakarta"
    },
    "era": {
      "en": "1975",
      "id": "1975"
    },
    "description": {
      "en": "The National Monument (Indonesian: Monumen Nasional, abbreviated Monas) is a 132 m (433 ft) obelisk in the centre of Merdeka Square, Central Jakarta. It is the national monument of the Republic of Indonesia, built to commemorate the struggle for Indonesian independence. This monument is crowned with a flame covered in gold leaf which symbolizes the burning spirit of struggle of the Indonesian people. Construction began in 1961 under the direction of President Sukarno, and the monument was opened to the public in 1975.",
      "id": "Monumen Nasional yang disingkat dengan Monas atau Tugu Monas adalah monumen peringatan setinggi 132 meter (433 kaki), terletak tepat di tengah Lapangan Medan Merdeka, Jakarta Pusat. Monas didirikan untuk mengenang perlawanan dan perjuangan rakyat Indonesia dalam merebut kemerdekaan dari pemerintahan kolonial Kerajaan Belanda. Pembangunan dimulai pada  17 Agustus 1961 di bawah perintah Presiden Soekarno dan diresmikan hingga dibuka untuk umum pada  12 Juli 1975 oleh Presiden Soeharto. Tugu ini dimahkotai lidah api yang dilapisi lembaran emas yang melambangkan semangat perjuangan dari rakyat Indonesia."
    }
  },
  {
    "id": "batik",
    "room": "modern",
    "shape": "wall",
    "color": "#8e5a2e",
    "position": [
      -10.85,
      -2
    ],
    "name": {
      "en": "Batik Cloth",
      "id": "Kain Batik"
    },
    "origin": {
      "en": "UNESCO Heritage, 2009",
      "id": "Warisan UNESCO, 2009"
    },
    "era": {
      "en": "Contemporary",
      "id": "Kontemporer"
    },
    "description": {
      "en": "Batik is a dyeing technique using wax resist. The term is also used to describe patterned textiles created with that technique. Batik is made by drawing or stamping wax on a cloth to prevent colour absorption during the dyeing process. This creates a patterned negative when the wax is removed from the dyed cloth.",
      "id": "Batik (bahasa Jawa: ꦧꦛꦶꦏ꧀code: jv is deprecated , translit. Bathik) adalah kain bergambar yang pembuatannya secara khusus dengan menuliskan atau menerakan malam pada kain itu, kemudian pengolahannya diproses dengan cara tertentu yang memiliki kekhasan. sebagai keseluruhan teknik, teknologi, serta pengembangan motif dan budaya yang terkait, oleh UNESCO telah ditetapkan sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi (Masterpieces of the Oral and Intangible Heritage of Humanity) sejak 2 Oktober 2009. Sejak saat itu, 2 Oktober ditetapkan sebagai Hari Batik Nasional."
    }
  },
  {
    "id": "satellite",
    "room": "modern",
    "shape": "vase",
    "color": "#7aa8d6",
    "position": [
      6,
      -4
    ],
    "name": {
      "en": "Palapa Satellite Model",
      "id": "Model Satelit Palapa"
    },
    "origin": {
      "en": "PT Telkom Indonesia",
      "id": "PT Telkom Indonesia"
    },
    "era": {
      "en": "1976",
      "id": "1976"
    },
    "description": {
      "en": "Palapa is a series of communications satellites owned by Indosat, an Indonesian telecommunications company (formerly by Perumtel and then by PT Satelit Palapa Indonesia/Satelindo). The first satellite was launched in July 1976, at which time Indonesia became the first developing country to operate its own domestic satellite system. The estimated cost for the project was US$1 billion (equivalent to $4.28 billion in 2024).",
      "id": "Palapa ialah nama bagi sejumlah satelit telekomunikasi geostasioner Indonesia. Nama ini diambil dari \"Sumpah Palapa\", yang pernah dicetuskan oleh Patih Gajah Mada dari Majapahit pada tahun 1334. Satelit pertama diluncurkan pada tanggal 8 Juli 1976 oleh roket Amerika Serikat dan dilepas di atas Samudra Hindia pada 83° BT. Satelit pertama dari 2 satelit itu bertipe HS-333 dan bermassa 574 kg."
    }
  },
  {
    "id": "angklung",
    "room": "modern",
    "shape": "texture",
    "color": "#9c7f55",
    "position": [
      -6,
      4
    ],
    "name": {
      "en": "Bamboo Angklung Instrument",
      "id": "Instrumen Musik Angklung"
    },
    "origin": {
      "en": "UNESCO Heritage, 2010",
      "id": "Warisan UNESCO, 2010"
    },
    "era": {
      "en": "Traditional & Modern",
      "id": "Tradisional & Modern"
    },
    "description": {
      "en": "The angklung (Sundanese: ᮃᮀᮊᮣᮥᮀ) is a musical instrument from the Sundanese in Indonesia that is made of a varying number of bamboo tubes attached to a bamboo frame. The tubes are carved to produce a resonant pitch when struck and are tuned to octaves, similar to Western handbells. The base of the frame is held in one hand, while the other hand shakes the instrument, causing a repeating note to sound. Each performer in an angklung ensemble is typically responsible for just one pitch, sounding their individual angklung at the appropriate times to produce complete melodies (see Kotekan).",
      "id": "Angklung (Aksara Sunda Baku: ᮃᮀᮊᮣᮥᮀ) adalah alat musik multitonal (bernada ganda) yang berkembang dari masyarakat Sunda. Alat musik ini dibuat dari bambu, dibunyikan dengan cara digoyangkan (bunyi disebabkan oleh benturan badan pipa bambu) sehingga menghasilkan bunyi yang bergetar dalam susunan nada 2, 3, sampai 4 nada dalam setiap ukuran, baik besar maupun kecil. Dictionary of the Sunda Language karya Jonathan Rigg yang diterbitkan pada tahun 1862 di Batavia, menuliskan bahwa angklung adalah alat musik yang terbuat dari pipa-pipa bambu yang dipotong ujung-ujungnya menyerupai pipa-pipa dalam suatu organ, dan diikat bersama dalam suatu bingkai, digetarkan atau digoyangkan untuk menghasilkan bunyi. Angklung terdaftar sebagai Karya Agung Warisan Budaya Lisan dan Nonbendawi Manusia dari UNESCO sejak November 2010."
    }
  },
  {
    "id": "wayang",
    "room": "modern",
    "shape": "texture",
    "color": "#b07358",
    "position": [
      6,
      4
    ],
    "name": {
      "en": "Wayang Kulit Shadow Puppet",
      "id": "Wayang Kulit Warisan Dunia"
    },
    "origin": {
      "en": "UNESCO Heritage, 2003",
      "id": "Warisan UNESCO, 2003"
    },
    "era": {
      "en": "Classical & Modern",
      "id": "Klasik & Modern"
    },
    "description": {
      "en": "Wayang (from Javanese  ꦮꦪꦁ, wayang (in the ngoko register), ꦫꦶꦁꦒꦶꦠ꧀ (in the krama register), Balinese: ᬯᬬᬂ, Sundanese: ᮝᮚᮀcode: sun promoted to code: su , ultimately from Old Javanese wayaṅ) is a traditional Java-origin (dramatic) performance in which a story is represented (by puppets, by dancers) invented by the indigenous Javans (the Javanese and Sundanese) — the Native Indonesian ethnic groups. The term wayang refers both to the show as a whole and the puppet in particular. Performances of wayang puppet theatre are accompanied by a gamelan orchestra in Java, and by gender wayang in Bali. The dramatic stories depict mythologies, such as episodes from the Hindu epics the Ramayana and the Mahabharata, as well as local adaptations of cultural legends.",
      "id": "Wayang (berasal dari bahasa Jawa: ꦮꦪꦁcode: jv is deprecated , translit. wayang, har. 'bayangan') adalah seni pertunjukan tradisional asli Indonesia yang berasal dari  Suku Jawa dan berkembang pesat di Pulau Jawa hingga menyebar luas ke berbagai wilayah di Nusantara. UNESCO, lembaga yang membawahi kebudayaan dari PBB, pada 7 November 2003 menetapkan wayang sebagai pertunjukan boneka bayangan tersohor dari Indonesia, sebuah Warisan Maha-karya Dunia yang Tak Ternilai dalam Seni Bertutur (bahasa Inggris: Masterpiece of Oral and Intangible Heritage of Humanitycode: en is deprecated )."
    }
  },
  {
    "id": "garuda",
    "room": "modern",
    "shape": "wall",
    "color": "#d6b158",
    "position": [
      10.85,
      -2
    ],
    "name": {
      "en": "Garuda Pancasila",
      "id": "Garuda Pancasila"
    },
    "origin": {
      "en": "Designed by Sultan Hamid II",
      "id": "Dirancang oleh Sultan Hamid II"
    },
    "era": {
      "en": "Adopted in 1950",
      "id": "Diresmikan 1950"
    },
    "description": {
      "en": "The national emblem of Indonesia is called Garuda Pancasila. The main part is the Garuda with a heraldic shield on its chest and a scroll gripped by its legs. The shield's five emblems represent Pancasila, the five principles of Indonesia's national ideology. The Garuda claws gripping a white ribbon scroll inscribed with the national motto Bhinneka Tunggal Ika written in black text, which can be loosely translated as \"Unity in Diversity\".",
      "id": "Lambang negara Indonesia adalah Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika. Lambang negara Indonesia berbentuk burung Garuda yang kepalanya menoleh ke sebelah kanan heraldik, perisai berbentuk menyerupai jantung yang digantung dengan rantai pada leher Garuda, dan semboyan Bhinneka Tunggal Ika yang berarti “berbeda-beda tetapi tetap satu” ditulis di atas pita yang dicengkeram oleh Garuda. Dalam prosesnya, dibentuklah Panitia Lambang Negara yang diketuai oleh Muhammad Yamin. Lambang Garuda dirancang oleh Sultan Hamid II dari Pontianak."
    }
  }
];

export const timeline: TimelineMoment[] = [
  {
    year: "1.5M BCE",
    titleEn: "Java Man",
    titleId: "Manusia Jawa",
    bodyEn: "Homo erectus walks the island of Java.",
    bodyId: "Homo erectus berjalan di Pulau Jawa.",
    room: "ancient",
  },
  {
    year: "682",
    titleEn: "Srivijaya Rises",
    titleId: "Sriwijaya Bangkit",
    bodyEn: "A Buddhist maritime empire controls the Strait of Malacca.",
    bodyId: "Kerajaan maritim Buddhis menguasai Selat Malaka.",
    room: "kingdom",
  },
  {
    year: "1293",
    titleEn: "Majapahit Founded",
    titleId: "Majapahit Berdiri",
    bodyEn: "The greatest Hindu-Buddhist empire of the archipelago begins.",
    bodyId: "Kekaisaran Hindu-Buddha terbesar Nusantara dimulai.",
    room: "kingdom",
  },
  {
    year: "1602",
    titleEn: "Arrival of the VOC",
    titleId: "Kedatangan VOC",
    bodyEn: "The Dutch East India Company begins three centuries of colonial trade.",
    bodyId: "VOC memulai tiga abad perdagangan kolonial.",
    room: "colonial",
  },
  {
    year: "1825",
    titleEn: "Java War",
    titleId: "Perang Jawa",
    bodyEn: "Prince Diponegoro leads a five-year rebellion against colonial rule.",
    bodyId: "Pangeran Diponegoro memimpin pemberontakan lima tahun.",
    room: "colonial",
  },
  {
    year: "1928",
    titleEn: "Youth Pledge",
    titleId: "Sumpah Pemuda",
    bodyEn: "One nation, one homeland, one language — Indonesia.",
    bodyId: "Satu bangsa, satu tanah air, satu bahasa — Indonesia.",
    room: "independence",
  },
  {
    year: "1945",
    titleEn: "Proclamation",
    titleId: "Proklamasi",
    bodyEn: "Independence is declared on the morning of 17 August.",
    bodyId: "Kemerdekaan diproklamasikan pagi 17 Agustus.",
    room: "independence",
  },
  {
    year: "1976",
    titleEn: "Palapa Satellite",
    titleId: "Satelit Palapa",
    bodyEn: "Indonesia unites its 17,000 islands by satellite.",
    bodyId: "Indonesia menyatukan 17.000 pulau melalui satelit.",
    room: "modern",
  },
  {
    year: "2009",
    titleEn: "Batik Heritage",
    titleId: "Warisan Batik",
    bodyEn: "UNESCO recognizes Batik as Intangible Cultural Heritage.",
    bodyId: "UNESCO mengakui Batik sebagai Warisan Budaya Takbenda.",
    room: "modern",
  },
];

export const quizQuestions = [
  {
    q: {
      en: "Which kingdom was one of the largest maritime powers of the archipelago?",
      id: "Kerajaan apakah yang menjadi salah satu kekuatan maritim terbesar Nusantara?",
    },
    options: [
      { en: "Srivijaya", id: "Sriwijaya" },
      { en: "Mataram", id: "Mataram" },
      { en: "Kutai", id: "Kutai" },
      { en: "Banten", id: "Banten" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "When was the Indonesian Independence proclaimed?",
      id: "Kapan kemerdekaan Indonesia diproklamasikan?",
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
      en: "Which UNESCO-listed textile art uses wax-resist dyeing?",
      id: "Seni tekstil mana yang terdaftar di UNESCO dan menggunakan teknik canting lilin?",
    },
    options: [
      { en: "Songket", id: "Songket" },
      { en: "Batik", id: "Batik" },
      { en: "Ikat", id: "Ikat" },
      { en: "Tenun", id: "Tenun" },
    ],
    correct: 1,
  },
  {
    q: {
      en: "Where were the Homo erectus 'Java Man' fossils discovered?",
      id: "Di mana fosil Homo erectus 'Manusia Jawa' ditemukan?",
    },
    options: [
      { en: "Sangiran", id: "Sangiran" },
      { en: "Pacitan", id: "Pacitan" },
      { en: "Borobudur", id: "Borobudur" },
      { en: "Toraja", id: "Toraja" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Who led the Java War against colonial rule?",
      id: "Siapa yang memimpin Perang Jawa melawan penjajahan?",
    },
    options: [
      { en: "Prince Diponegoro", id: "Pangeran Diponegoro" },
      { en: "Sultan Agung", id: "Sultan Agung" },
      { en: "Cut Nyak Dhien", id: "Cut Nyak Dhien" },
      { en: "Imam Bonjol", id: "Imam Bonjol" },
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
    id: "independence",
    titleEn: "Independence Witness",
    titleId: "Saksi Kemerdekaan",
    descEn: "Visited the Independence Hall.",
    descId: "Mengunjungi Ruang Kemerdekaan.",
  },
  {
    id: "modern",
    titleEn: "Modern Citizen",
    titleId: "Warga Modern",
    descEn: "Visited the Modern Indonesia Hall.",
    descId: "Mengunjungi Ruang Indonesia Modern.",
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
    titleEn: "Heritage Guardian",
    titleId: "Penjaga Warisan",
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
