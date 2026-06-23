/**
 * MuseumVerse Indonesia — Complete Artifact Data
 * 150+ artifacts covering all periods of Indonesian history
 * Organized by Hall → Section Room
 */


module.exports = [
  // ═══════════════════════════════════════════════════════════════════
  // HALL 1: INDONESIA KUNO — Section: Manusia Purba & Fosil
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "meganthropus",
    room: "ancient",
    section: "ancient-fossils",
    shape: "texture",
    color: "#7a5c3c",
    position: [-8, -6],
    name: { en: "Meganthropus paleojavanicus", id: "Meganthropus paleojavanicus" },
    origin: { en: "Sangiran, Central Java", id: "Sangiran, Jawa Tengah" },
    era: { en: "c. 2 million years ago", id: "± 2 juta tahun lalu" },
    description: {
      en: "Meganthropus paleojavanicus is one of the oldest known hominid fossils found in Indonesia. Discovered by Gustav Heinrich Ralph von Koenigswald in 1941 at Sangiran, Central Java, this massive jaw fragment suggests a very large-bodied early human. The name means 'great human of ancient Java.' While its exact taxonomic classification remains debated — some researchers consider it a robust variant of Homo erectus rather than a separate species — its discovery was groundbreaking for understanding human evolution in Southeast Asia.",
      id: "Meganthropus paleojavanicus adalah salah satu fosil hominid tertua yang ditemukan di Indonesia. Ditemukan oleh Gustav Heinrich Ralph von Koenigswald pada tahun 1941 di Sangiran, Jawa Tengah, fragmen rahang besar ini menunjukkan manusia purba bertubuh sangat besar. Nama ilmiahnya berarti 'manusia besar dari Jawa kuno.' Meskipun klasifikasi taksonominya masih diperdebatkan — beberapa peneliti menganggapnya varian robust dari Homo erectus — penemuannya sangat penting bagi pemahaman evolusi manusia di Asia Tenggara."
    }
  },
  {
    id: "homo-erectus",
    room: "ancient",
    section: "ancient-fossils",
    shape: "texture",
    color: "#8b6f47",
    position: [-6, -4],
    name: { en: "Java Man Skull (Homo erectus)", id: "Tengkorak Manusia Jawa (Homo erectus)" },
    origin: { en: "Trinil, Ngawi, East Java", id: "Trinil, Ngawi, Jawa Timur" },
    era: { en: "c. 1.5 million years ago", id: "± 1,5 juta tahun lalu" },
    description: {
      en: "Java Man (Homo erectus erectus) is an early human fossil discovered in 1891 by Eugène Dubois at Trinil on the banks of the Solo River. Dubois named it Pithecanthropus erectus, arguing it was the 'missing link' between apes and humans. Estimated to be between 700,000 and 1,490,000 years old, it was the oldest hominid fossil ever found at the time. The discovery revolutionized our understanding of human evolution and established Java as one of the most important sites for paleoanthropology.",
      id: "Manusia Jawa (Homo erectus erectus) adalah fosil manusia purba yang ditemukan pada 1891 oleh Eugène Dubois di Trinil, Ngawi, di tepi Sungai Bengawan Solo. Dubois memberi nama Pithecanthropus erectus yang berarti 'manusia-kera yang berjalan tegak.' Penemuan ini merevolusi pemahaman evolusi manusia dan menjadikan Jawa sebagai salah satu situs terpenting untuk paleoantropologi."
    }
  },
  {
    id: "homo-soloensis",
    room: "ancient",
    section: "ancient-fossils",
    shape: "bust",
    color: "#6d553e",
    position: [-4, -6],
    name: { en: "Homo soloensis (Solo Man)", id: "Homo soloensis (Manusia Solo)" },
    origin: { en: "Ngandong, Blora, Central Java", id: "Ngandong, Blora, Jawa Tengah" },
    era: { en: "c. 100,000–50,000 years ago", id: "± 100.000–50.000 tahun lalu" },
    description: {
      en: "Homo soloensis, also known as Solo Man, was discovered between 1931 and 1933 at Ngandong on the banks of the Solo River. Eleven skull caps and two tibiae were found. These specimens represent some of the youngest known Homo erectus fossils in the world, suggesting that Homo erectus survived far longer in Southeast Asia than elsewhere.",
      id: "Homo soloensis, dikenal juga sebagai Manusia Solo, ditemukan antara 1931 dan 1933 di Ngandong di tepi Sungai Bengawan Solo. Sebelas atap tengkorak dan dua tulang kering ditemukan. Spesimen ini merupakan fosil Homo erectus termuda yang diketahui di dunia."
    }
  },
  {
    id: "homo-floresiensis",
    room: "ancient",
    section: "ancient-fossils",
    shape: "bust",
    color: "#8a7259",
    position: [-2, -4],
    name: { en: "Homo floresiensis ('Hobbit')", id: "Homo floresiensis ('Hobbit')" },
    origin: { en: "Liang Bua Cave, Flores, NTT", id: "Gua Liang Bua, Flores, NTT" },
    era: { en: "c. 60,000 years ago", id: "± 60.000 tahun lalu" },
    description: {
      en: "Homo floresiensis, nicknamed 'Hobbit', was discovered in 2003 in Liang Bua Cave on the island of Flores. This extraordinary find shocked the scientific world: an adult human standing only about 1 meter tall with a brain the size of a grapefruit, yet capable of making stone tools and hunting Stegodon (dwarf elephants). They lived alongside giant Komodo dragons. The discovery challenged fundamental assumptions about human evolution.",
      id: "Homo floresiensis, dijuluki 'Hobbit', ditemukan pada 2003 di Gua Liang Bua, Pulau Flores, NTT. Penemuan ini mengejutkan dunia ilmiah: manusia dewasa setinggi hanya 1 meter dengan otak sekecil jeruk bali, namun mampu membuat alat batu dan berburu Stegodon. Penemuan ini menantang asumsi fundamental tentang evolusi manusia."
    }
  },
  {
    id: "homo-wajakensis",
    room: "ancient",
    section: "ancient-fossils",
    shape: "bust",
    color: "#7e6648",
    position: [0, -6],
    name: { en: "Homo wajakensis (Wajak Man)", id: "Homo wajakensis (Manusia Wajak)" },
    origin: { en: "Wajak, Tulungagung, East Java", id: "Wajak, Tulungagung, Jawa Timur" },
    era: { en: "c. 40,000 years ago", id: "± 40.000 tahun lalu" },
    description: {
      en: "Homo wajakensis was discovered by B.D. van Rietschoten in 1889 — actually before the famous Java Man discovery. With a brain capacity of 1,300–1,630 cc close to modern humans, Wajak Man shows characteristics of both Austromelanesoid and Mongoloid races. Scientists believe it may be an ancestor of Aboriginal Australians and the Malay sub-race.",
      id: "Homo wajakensis ditemukan oleh B.D. van Rietschoten pada 1889 — sebenarnya sebelum penemuan Manusia Jawa. Dengan kapasitas otak 1.300–1.630 cc mendekati manusia modern, Manusia Wajak menunjukkan ciri-ciri ras Austromelanesoid dan Mongoloid."
    }
  },
  {
    id: "sangiran-site",
    room: "ancient",
    section: "ancient-fossils",
    shape: "wall",
    color: "#7c5c3c",
    position: [-10.85, -2],
    name: { en: "Sangiran Archaeological Site (UNESCO)", id: "Situs Arkeologi Sangiran (UNESCO)" },
    origin: { en: "Sangiran Dome, Central Java", id: "Kubah Sangiran, Jawa Tengah" },
    era: { en: "Pleistocene Epoch", id: "Kala Pleistosen" },
    description: {
      en: "Sangiran is a UNESCO World Heritage archaeological site recognized in 1996 as one of the most important sites for studying fossil man. The 56 km² area has yielded over 100 Homo erectus fossils — more than 50% of all Homo erectus fossils ever found worldwide.",
      id: "Sangiran adalah situs arkeologi Warisan Dunia UNESCO, diakui pada 1996. Area seluas 56 km² telah menghasilkan lebih dari 100 fosil Homo erectus — lebih dari 50% semua fosil Homo erectus yang pernah ditemukan di seluruh dunia."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 1: INDONESIA KUNO — Section: Peralatan & Kehidupan Prasejarah
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "stone-axe",
    room: "ancient",
    section: "ancient-tools",
    shape: "sword",
    color: "#6b5a3a",
    position: [6, -4],
    name: { en: "Paleolithic Hand Axe (Chopper)", id: "Kapak Perimbas Paleolitik" },
    origin: { en: "Pacitan, East Java", id: "Pacitan, Jawa Timur" },
    era: { en: "c. 800,000 BCE", id: "± 800.000 SM" },
    description: {
      en: "This Paleolithic chopping tool was discovered by von Koenigswald in 1935 in Pacitan. Made from limestone through knapping (chipping away flakes), these hand axes are among the oldest known tools in Southeast Asia, representing the material culture of Homo erectus.",
      id: "Kapak perimbas Paleolitik ini ditemukan oleh von Koenigswald pada 1935 di Pacitan. Dibuat dari batu gamping melalui teknik pemangkasan, kapak ini termasuk peralatan tertua di Asia Tenggara."
    }
  },
  {
    id: "neolithic-axe",
    room: "ancient",
    section: "ancient-tools",
    shape: "sword",
    color: "#5e5040",
    position: [8, -6],
    name: { en: "Neolithic Polished Axe (Beliung Persegi)", id: "Kapak Persegi Neolitik (Beliung)" },
    origin: { en: "Various sites across Indonesia", id: "Berbagai situs di Indonesia" },
    era: { en: "c. 4000 BCE", id: "± 4000 SM" },
    description: {
      en: "The Neolithic polished rectangular axe represents a major technological leap. Unlike crude Paleolithic choppers, these were carefully ground and polished. Square axes are associated with the Austronesian cultural sphere in western Indonesia, while oval axes are found in eastern Indonesia.",
      id: "Kapak persegi Neolitik mewakili lompatan teknologi besar. Kapak persegi terkait dengan lingkup budaya Austronesia di Indonesia barat, sementara kapak lonjong ditemukan di Indonesia timur."
    }
  },
  {
    id: "nekara-pejeng",
    room: "ancient",
    section: "ancient-tools",
    shape: "vase",
    color: "#8a7a5a",
    position: [4, -6],
    name: { en: "Nekara Pejeng (Moon of Pejeng)", id: "Nekara Pejeng (Bulan Pejeng)" },
    origin: { en: "Pejeng, Gianyar, Bali", id: "Pejeng, Gianyar, Bali" },
    era: { en: "c. 300 BCE (Bronze Age)", id: "± 300 SM (Zaman Perunggu)" },
    description: {
      en: "The Moon of Pejeng is the largest single-cast bronze kettledrum in the world, measuring 186.5 cm. Housed in Pura Penataran Sasih temple in Bali, it represents the pinnacle of Dong Son bronze culture influence in Indonesia. According to Balinese legend, it was a wheel from a celestial chariot.",
      id: "Bulan Pejeng adalah nekara perunggu tuangan tunggal terbesar di dunia, berukuran panjang 186,5 cm. Disimpan di Pura Penataran Sasih, Bali, mewakili puncak pengaruh budaya perunggu Dong Son di Indonesia."
    }
  },
  {
    id: "cave-painting-sulawesi",
    room: "ancient",
    section: "ancient-tools",
    shape: "wall",
    color: "#9c7a5a",
    position: [10.85, -2],
    name: { en: "Leang Tedongnge Cave Painting (World's Oldest)", id: "Lukisan Gua Leang Tedongnge (Tertua di Dunia)" },
    origin: { en: "Maros-Pangkep, South Sulawesi", id: "Maros-Pangkep, Sulawesi Selatan" },
    era: { en: "c. 45,500 years ago", id: "± 45.500 tahun lalu" },
    description: {
      en: "In 2019, archaeologists confirmed that a cave painting in South Sulawesi is at least 45,500 years old — the oldest known figurative cave painting in the world. The painting depicts a Sulawesi warty pig. These discoveries overturned the assumption that cave art originated only in Europe.",
      id: "Pada 2019, arkeolog mengkonfirmasi lukisan gua di Sulawesi Selatan berusia setidaknya 45.500 tahun — lukisan gua figuratif tertua di dunia. Penemuan ini membantah asumsi bahwa seni gua hanya berasal dari Eropa."
    }
  },
  {
    id: "cave-painting-kalimantan",
    room: "ancient",
    section: "ancient-tools",
    shape: "wall",
    color: "#8e6e4e",
    position: [10.85, 2],
    name: { en: "Borneo Hand Stencil Cave Art", id: "Lukisan Gua Tangan Kalimantan" },
    origin: { en: "Lubang Jeriji Saléh, East Kalimantan", id: "Lubang Jeriji Saléh, Kalimantan Timur" },
    era: { en: "c. 40,000 years ago", id: "± 40.000 tahun lalu" },
    description: {
      en: "The Lubang Jeriji Saléh cave in East Kalimantan contains some of the oldest known hand stencils in the world, dated to approximately 40,000 years ago. These red-orange hand prints were created by blowing pigment around hands placed on the cave wall.",
      id: "Gua Lubang Jeriji Saléh di Kalimantan Timur berisi stensil tangan tertua yang diketahui di dunia, bertanggal sekitar 40.000 tahun lalu."
    }
  },
  {
    id: "moko-alor",
    room: "ancient",
    section: "ancient-tools",
    shape: "vase",
    color: "#6e5e3e",
    position: [6, -2],
    name: { en: "Moko Bronze Drum (Alor)", id: "Moko Nekara Perunggu (Alor)" },
    origin: { en: "Alor Island, NTT", id: "Pulau Alor, NTT" },
    era: { en: "Bronze Age (c. 500 BCE)", id: "Zaman Perunggu (± 500 SM)" },
    description: {
      en: "The Moko is a small bronze kettle drum unique to Alor Island in NTT. For the Alorese people, mokos serve as sacred heirlooms and bride-price objects, with some mokos valued more than gold. Their origin remains debated — some may have been locally produced, others traded from mainland Southeast Asia.",
      id: "Moko adalah nekara perunggu kecil yang unik di Pulau Alor, NTT. Bagi masyarakat Alor, moko berfungsi sebagai pusaka sakral dan mas kawin, dengan beberapa moko dinilai lebih tinggi dari emas."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 1: INDONESIA KUNO — Section: Tradisi Megalitik
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "megalith",
    room: "ancient",
    section: "ancient-megalith",
    shape: "tablet",
    color: "#7a7062",
    position: [-6, 4],
    name: { en: "Megalithic Menhir (Lore Lindu)", id: "Menhir Megalitik (Lore Lindu)" },
    origin: { en: "Lore Lindu, Central Sulawesi", id: "Lore Lindu, Sulawesi Tengah" },
    era: { en: "c. 1500 BCE", id: "± 1500 SM" },
    description: {
      en: "The Bada Valley in Lore Lindu National Park contains over 400 ancient megalithic statues, some standing over 4.5 meters tall. The largest, known as Palindo ('The Entertainer'), is among the most enigmatic archaeological sites in Southeast Asia.",
      id: "Lembah Bada di Taman Nasional Lore Lindu berisi lebih dari 400 patung megalitik kuno, beberapa berdiri lebih dari 4,5 meter. Yang terbesar, Palindo, termasuk situs arkeologi paling misterius di Asia Tenggara."
    }
  },
  {
    id: "nias-megalith",
    room: "ancient",
    section: "ancient-megalith",
    shape: "wall",
    color: "#8a8275",
    position: [-10.85, 4],
    name: { en: "Nias Stone Jumping (Hombo Batu)", id: "Lompat Batu Nias (Hombo Batu)" },
    origin: { en: "Nias Island, North Sumatra", id: "Pulau Nias, Sumatera Utara" },
    era: { en: "c. 500 BCE – present", id: "± 500 SM – sekarang" },
    description: {
      en: "Nias represents a living megalithic culture. The most famous tradition is Hombo Batu — stone jumping — where young men leap over a 2-meter high stone pillar as a rite of passage. The stone architecture of South Nias villages is one of the best-preserved megalithic cultures in the world.",
      id: "Nias mewakili kebudayaan megalitik hidup. Tradisi paling terkenal adalah Hombo Batu — lompat batu — di mana para pemuda melompati pilar batu setinggi 2 meter sebagai ritual kedewasaan."
    }
  },
  {
    id: "gunung-padang",
    room: "ancient",
    section: "ancient-megalith",
    shape: "wall",
    color: "#6b6558",
    position: [-10.85, 2],
    name: { en: "Gunung Padang Megalithic Site", id: "Situs Megalitik Gunung Padang" },
    origin: { en: "Cianjur, West Java", id: "Cianjur, Jawa Barat" },
    era: { en: "Possibly 5000+ BCE (debated)", id: "Kemungkinan 5000+ SM (diperdebatkan)" },
    description: {
      en: "Gunung Padang is Indonesia's largest megalithic site, covering 3,135 m² at 885 meters elevation. A 2023 study suggested buried structures could date back to 25,000 BCE, making it the oldest known pyramid-like structure — but these claims remain highly controversial.",
      id: "Gunung Padang adalah situs megalitik terbesar di Indonesia, meliputi 3.135 m² di ketinggian 885 meter. Studi 2023 menyatakan struktur terkubur bisa bertanggal hingga 25.000 SM — namun klaim ini masih sangat kontroversial."
    }
  },
  {
    id: "waruga-minahasa",
    room: "ancient",
    section: "ancient-megalith",
    shape: "tablet",
    color: "#8a7e6e",
    position: [-4, 6],
    name: { en: "Waruga Stone Sarcophagus (Minahasa)", id: "Sarkofagus Batu Waruga (Minahasa)" },
    origin: { en: "Sawangan, North Sulawesi", id: "Sawangan, Sulawesi Utara" },
    era: { en: "c. 900 CE – 1800s", id: "± 900 M – 1800-an" },
    description: {
      en: "Waruga are ancient box-shaped stone burial coffins unique to the Minahasan people, with triangular lids resembling rooftops. The dead were buried in a squatting position. The largest collection of 140+ waruga is in Sawangan.",
      id: "Waruga adalah peti mati batu kuno berbentuk kotak yang unik bagi masyarakat Minahasa, dengan tutup segitiga menyerupai atap. Jenazah dimakamkan dalam posisi jongkok. Koleksi terbesar 140+ waruga ada di Sawangan."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 1: INDONESIA KUNO — Section: Migrasi Austronesia
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "austronesian-map",
    room: "ancient",
    section: "ancient-migration",
    shape: "wall",
    color: "#4a7a8a",
    position: [-10.85, 6],
    name: { en: "Austronesian Migration Map", id: "Peta Migrasi Austronesia" },
    origin: { en: "Taiwan → Maritime Southeast Asia", id: "Taiwan → Asia Tenggara Maritim" },
    era: { en: "c. 5000–2000 BCE", id: "± 5000–2000 SM" },
    description: {
      en: "The Austronesian expansion is one of the most remarkable maritime migrations in human history. Beginning from Taiwan around 5,000 years ago, seafaring peoples spread across Maritime Southeast Asia and the Pacific. Indonesia sits at the heart with over 700 living Austronesian languages.",
      id: "Ekspansi Austronesia adalah salah satu migrasi maritim paling luar biasa. Dimulai dari Taiwan sekitar 5.000 tahun lalu. Indonesia berada di jantung migrasi ini dengan lebih dari 700 bahasa Austronesia hidup."
    }
  },
  {
    id: "outrigger-canoe",
    room: "ancient",
    section: "ancient-migration",
    shape: "texture",
    color: "#5a7a6a",
    position: [6, 6],
    name: { en: "Ancient Outrigger Canoe", id: "Perahu Bercadik Kuno" },
    origin: { en: "Maritime Southeast Asia", id: "Asia Tenggara Maritim" },
    era: { en: "c. 3000 BCE", id: "± 3000 SM" },
    description: {
      en: "The outrigger canoe was the revolutionary maritime technology that enabled the Austronesian expansion. By attaching stabilizing floats to dugout canoes, ancient seafarers could navigate open ocean swells safely, colonizing islands hundreds of kilometers apart.",
      id: "Perahu bercadik adalah teknologi maritim revolusioner yang memungkinkan ekspansi Austronesia. Teknologi ini mendahului kapal lautan Eropa ribuan tahun."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 2: ERA KERAJAAN — Section: Kerajaan Hindu Pertama (Abad 4-8)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "yupa-kutai",
    room: "kingdom",
    section: "kingdom-hindu-early",
    shape: "tablet",
    color: "#8a7a5a",
    position: [-8, -6],
    name: { en: "Yupa Inscription (Kutai Kingdom)", id: "Prasasti Yupa (Kerajaan Kutai)" },
    origin: { en: "Muara Kaman, East Kalimantan", id: "Muara Kaman, Kalimantan Timur" },
    era: { en: "4th Century CE", id: "Abad ke-4 M" },
    description: {
      en: "The seven Yupa inscriptions from Kutai are the oldest known written records in Indonesia, dating to the 4th century CE. Written in Sanskrit using Pallava script, they describe King Mulawarman's Vedic sacrifices. Kutai Martadipura is considered the oldest Hindu kingdom in the archipelago.",
      id: "Tujuh prasasti Yupa dari Kutai adalah catatan tertulis tertua yang diketahui di Indonesia, abad ke-4 M. Ditulis dalam Sanskerta menggunakan aksara Pallawa, menggambarkan upacara korban Veda Raja Mulawarman."
    }
  },
  {
    id: "ciaruteun-taruma",
    room: "kingdom",
    section: "kingdom-hindu-early",
    shape: "tablet",
    color: "#7a6a4a",
    position: [-6, -4],
    name: { en: "Ciaruteun Inscription (Tarumanagara)", id: "Prasasti Ciaruteun (Tarumanagara)" },
    origin: { en: "Bogor, West Java", id: "Bogor, Jawa Barat" },
    era: { en: "5th Century CE", id: "Abad ke-5 M" },
    description: {
      en: "The Ciaruteun Inscription bears the footprints of King Purnawarman of Tarumanagara, one of the earliest Hindu kingdoms in western Java (5th century CE). The Sanskrit inscription compares the king's footprints to those of Vishnu, legitimizing his divine authority.",
      id: "Prasasti Ciaruteun memuat tapak kaki Raja Purnawarman dari Tarumanagara, salah satu kerajaan Hindu paling awal di Jawa barat (abad ke-5 M)."
    }
  },
  {
    id: "kalingga-shima",
    room: "kingdom",
    section: "kingdom-hindu-early",
    shape: "scroll",
    color: "#6e5e3e",
    position: [-4, -6],
    name: { en: "Queen Shima of Kalingga (Ho-ling)", id: "Ratu Shima dari Kalingga (Ho-ling)" },
    origin: { en: "Central Java", id: "Jawa Tengah" },
    era: { en: "6th–7th Century CE", id: "Abad ke-6–7 M" },
    description: {
      en: "Kalingga kingdom (Ho-ling in Chinese records) flourished in Central Java. Queen Shima was renowned for her strict justice — according to Chinese chronicles, when she placed gold on a road, no one dared touch it for three years. When her own son touched it, she ordered his hand cut off.",
      id: "Kerajaan Kalingga berkembang di Jawa Tengah. Ratu Shima terkenal karena keadilannya yang ketat — menurut kronik Tiongkok, ketika meletakkan emas di jalan, tidak ada yang berani menyentuhnya selama tiga tahun."
    }
  },
  {
    id: "canggal-inscription",
    room: "kingdom",
    section: "kingdom-hindu-early",
    shape: "tablet",
    color: "#5e4e2e",
    position: [-2, -4],
    name: { en: "Canggal Inscription (Mataram Hindu)", id: "Prasasti Canggal (Mataram Hindu)" },
    origin: { en: "Kedu, Central Java", id: "Kedu, Jawa Tengah" },
    era: { en: "732 CE", id: "732 M" },
    description: {
      en: "The Canggal inscription (732 CE) marks the beginning of the Mataram kingdom in Central Java founded by King Sanjaya. It establishes the competition between the Hindu Sanjaya dynasty and the Buddhist Syailendra dynasty that would produce both Prambanan and Borobudur.",
      id: "Prasasti Canggal (732 M) menandai awal kerajaan Mataram di Jawa Tengah yang didirikan Raja Sanjaya."
    }
  },
  {
    id: "galuh-kingdom",
    room: "kingdom",
    section: "kingdom-hindu-early",
    shape: "scroll",
    color: "#7a7a5a",
    position: [0, -6],
    name: { en: "Galuh Kingdom (Kawali Inscriptions)", id: "Kerajaan Galuh (Prasasti Kawali)" },
    origin: { en: "Ciamis, West Java", id: "Ciamis, Jawa Barat" },
    era: { en: "7th Century CE onward", id: "Abad ke-7 M dan seterusnya" },
    description: {
      en: "The Kingdom of Galuh was established by Wretikandayun in 612 CE after separating from Tarumanagara. Based in Kawali, Ciamis, Galuh was intertwined with the Sunda kingdom. Their complex relationship is documented in the Carita Parahyangan manuscript.",
      id: "Kerajaan Galuh didirikan oleh Wretikandayun pada 612 M setelah memisahkan diri dari Tarumanagara. Hubungan kompleksnya dengan Kerajaan Sunda didokumentasikan dalam manuskrip Carita Parahyangan."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 2: ERA KERAJAAN — Section: Sriwijaya & Kerajaan Maritim
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "inscription",
    room: "kingdom",
    section: "kingdom-sriwijaya",
    shape: "tablet",
    color: "#4a3f2a",
    position: [2, -4],
    name: { en: "Kedukan Bukit Inscription (Sriwijaya)", id: "Prasasti Kedukan Bukit (Sriwijaya)" },
    origin: { en: "Palembang, South Sumatra", id: "Palembang, Sumatera Selatan" },
    era: { en: "682 CE", id: "682 M" },
    description: {
      en: "The Kedukan Bukit inscription (682 CE) is the oldest surviving specimen of the Malay language. This stone records a military expedition by the ruler of Sriwijaya with 20,000 soldiers. Sriwijaya was a major Buddhist maritime empire that controlled trade routes across Southeast Asia for over six centuries.",
      id: "Prasasti Kedukan Bukit (682 M) adalah spesimen tertua bahasa Melayu. Batu ini mencatat ekspedisi militer penguasa Sriwijaya dengan 20.000 prajurit."
    }
  },
  {
    id: "muaro-jambi",
    room: "kingdom",
    section: "kingdom-sriwijaya",
    shape: "wall",
    color: "#8a7a6a",
    position: [4, -6],
    name: { en: "Muaro Jambi Temple Complex", id: "Kompleks Candi Muaro Jambi" },
    origin: { en: "Jambi, Sumatra", id: "Jambi, Sumatera" },
    era: { en: "7th–13th Century CE", id: "Abad ke-7–13 M" },
    description: {
      en: "Muaro Jambi is the largest Buddhist temple complex in Southeast Asia, with over 80 temple ruins spanning 12 km. The Chinese monk I-Tsing studied here in 671 CE, recording over 1,000 monks in residence.",
      id: "Muaro Jambi adalah kompleks candi Buddha terbesar di Asia Tenggara, dengan lebih dari 80 reruntuhan candi. Biksu Tiongkok I-Tsing belajar di sini pada 671 M."
    }
  },
  {
    id: "chola-raid",
    room: "kingdom",
    section: "kingdom-sriwijaya",
    shape: "scroll",
    color: "#9a6a4a",
    position: [6, -4],
    name: { en: "Chola Raid on Sriwijaya (1025)", id: "Serangan Chola ke Sriwijaya (1025)" },
    origin: { en: "Sriwijaya vs Chola Dynasty", id: "Sriwijaya vs Dinasti Chola" },
    era: { en: "1025 CE", id: "1025 M" },
    description: {
      en: "In 1025 CE, the Chola dynasty of South India launched a devastating naval raid against Sriwijaya, capturing its capital and king. This severely weakened Sriwijaya's control over the Strait of Malacca trade routes — one of the most significant turning points in Southeast Asian maritime history.",
      id: "Pada 1025 M, Dinasti Chola dari India Selatan melancarkan serangan laut yang menghancurkan terhadap Sriwijaya. Ini sangat melemahkan kontrol Sriwijaya atas jalur perdagangan Selat Malaka."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 2: ERA KERAJAAN — Section: Candi Hindu-Buddha Klasik
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "borobudur",
    room: "kingdom",
    section: "kingdom-classical",
    shape: "wall",
    color: "#706a58",
    position: [-10.85, 0],
    name: { en: "Borobudur Temple (UNESCO)", id: "Candi Borobudur (UNESCO)" },
    origin: { en: "Magelang, Central Java", id: "Magelang, Jawa Tengah" },
    era: { en: "9th Century CE (c. 800-825)", id: "Abad ke-9 M (± 800-825)" },
    description: {
      en: "Borobudur is the world's largest Buddhist temple. Built by the Syailendra dynasty, it has nine stacked platforms, 2,672 relief panels, and 504 Buddha statues. Abandoned under volcanic ash for centuries, it was rediscovered in 1814 by Raffles.",
      id: "Borobudur adalah candi Buddha terbesar di dunia. Dibangun oleh Wangsa Syailendra, memiliki sembilan teras, 2.672 panel relief, dan 504 arca Buddha. Ditemukan kembali pada 1814 oleh Raffles."
    }
  },
  {
    id: "prambanan",
    room: "kingdom",
    section: "kingdom-classical",
    shape: "wall",
    color: "#7e786b",
    position: [10.85, 0],
    name: { en: "Prambanan Temple (UNESCO)", id: "Candi Prambanan (UNESCO)" },
    origin: { en: "Sleman, Yogyakarta", id: "Sleman, Yogyakarta" },
    era: { en: "9th–10th Century CE", id: "Abad ke-9–10 M" },
    description: {
      en: "Prambanan is the largest Hindu temple complex in Indonesia. Its 47-meter central temple houses a 3-meter Shiva Mahadeva statue. The complex originally contained 240 temples with Ramayana reliefs among the finest in classical Javanese sculpture.",
      id: "Prambanan adalah kompleks candi Hindu terbesar di Indonesia. Candi sentral setinggi 47 meter menyimpan arca Siwa Mahadewa setinggi 3 meter."
    }
  },
  {
    id: "dieng-temple",
    room: "kingdom",
    section: "kingdom-classical",
    shape: "wall",
    color: "#6a6458",
    position: [-10.85, 4],
    name: { en: "Dieng Plateau Temples", id: "Candi Dataran Tinggi Dieng" },
    origin: { en: "Wonosobo, Central Java", id: "Wonosobo, Jawa Tengah" },
    era: { en: "8th Century CE", id: "Abad ke-8 M" },
    description: {
      en: "The Dieng temples at 2,093 meters elevation are the oldest standing Hindu temples in Java, predating Borobudur and Prambanan. Originally over 400 temples, only 8 survive, named after Mahabharata characters.",
      id: "Candi Dieng di ketinggian 2.093 meter adalah candi Hindu tertua yang masih berdiri di Jawa. Awalnya lebih dari 400 candi, hanya 8 yang bertahan."
    }
  },
  {
    id: "ganesha",
    room: "kingdom",
    section: "kingdom-classical",
    shape: "texture",
    color: "#6e5a2f",
    position: [8, -4],
    name: { en: "Ganesha Statue (Singasari)", id: "Arca Ganesha (Singasari)" },
    origin: { en: "Singasari Temple, East Java", id: "Candi Singasari, Jawa Timur" },
    era: { en: "13th Century CE", id: "Abad ke-13 M" },
    description: {
      en: "This magnificent Ganesha statue from Singasari temple is one of the finest examples of classical Javanese Hindu sculpture. Ganesha, the elephant-headed deity, was adopted as the emblem of Bandung Institute of Technology (ITB).",
      id: "Arca Ganesha dari Candi Singasari ini adalah salah satu contoh terbaik seni pahat Hindu Jawa klasik. Ganesha diadopsi sebagai lambang Institut Teknologi Bandung (ITB)."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 2: ERA KERAJAAN — Section: Kediri, Singasari & Majapahit
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "kediri-bharatayudha",
    room: "kingdom",
    section: "kingdom-majapahit",
    shape: "book",
    color: "#8a6a3a",
    position: [-8, 2],
    name: { en: "Kakawin Bharatayuddha (Kediri)", id: "Kakawin Bharatayuddha (Kediri)" },
    origin: { en: "Kediri Kingdom, East Java", id: "Kerajaan Kediri, Jawa Timur" },
    era: { en: "1157 CE", id: "1157 M" },
    description: {
      en: "A masterpiece of Old Javanese literature written in 1157 CE during the Kediri kingdom. Under King Jayabaya, Kediri became renowned for literary patronage. Jayabaya is also famous for his prophecies (Jangka Jayabaya), still referenced today.",
      id: "Mahakarya sastra Jawa Kuno ditulis pada 1157 M. Di bawah Raja Jayabaya, Kediri terkenal karena patronase sastra. Jayabaya juga terkenal karena ramalannya (Jangka Jayabaya)."
    }
  },
  {
    id: "ken-dedes",
    room: "kingdom",
    section: "kingdom-majapahit",
    shape: "texture",
    color: "#7a5a2a",
    position: [-6, 4],
    name: { en: "Prajnaparamita Statue (Ken Dedes)", id: "Arca Prajnaparamita (Ken Dedes)" },
    origin: { en: "Singasari Kingdom", id: "Kerajaan Singasari" },
    era: { en: "13th Century CE", id: "Abad ke-13 M" },
    description: {
      en: "The Prajnaparamita statue from Singasari is considered the masterpiece of classical Javanese sculpture. Believed to be a posthumous portrait of Ken Dedes, queen of Ken Arok (founder of Singasari), it depicts the Buddhist goddess of transcendent wisdom.",
      id: "Arca Prajnaparamita dari Singasari dianggap sebagai mahakarya seni pahat Jawa klasik. Diyakini sebagai potret anumerta Ken Dedes, permaisuri Ken Arok."
    }
  },
  {
    id: "keris",
    room: "kingdom",
    section: "kingdom-majapahit",
    shape: "texture",
    color: "#3a2e1f",
    position: [-4, 2],
    name: { en: "Royal Keris (Majapahit)", id: "Keris Pusaka (Majapahit)" },
    origin: { en: "Majapahit Empire, Java", id: "Kekaisaran Majapahit, Jawa" },
    era: { en: "14th Century CE", id: "Abad ke-14 M" },
    description: {
      en: "The kris is a distinctive Javanese asymmetrical dagger with wavy blade and pamor patterns. Recognized by UNESCO in 2005 as Intangible Heritage, each kris is believed to possess its own spiritual energy. During Majapahit, the finest kris makers (empu) were revered.",
      id: "Keris adalah senjata tajam khas Jawa yang memiliki bilah asimetris berkelok-kelok dan pamor. Diakui UNESCO pada 2005, setiap keris diyakini memiliki energi spiritual sendiri."
    }
  },
  {
    id: "negarakertagama",
    room: "kingdom",
    section: "kingdom-majapahit",
    shape: "book",
    color: "#5a4a2a",
    position: [-2, 4],
    name: { en: "Nagarakretagama (1365)", id: "Negarakertagama (1365)" },
    origin: { en: "Majapahit Empire", id: "Kekaisaran Majapahit" },
    era: { en: "1365 CE", id: "1365 M" },
    description: {
      en: "Written by Mpu Prapanca in 1365, this is Indonesia's most important historical literary work. Listed as UNESCO Memory of the World in 2013, it provides the most detailed account of Majapahit at its zenith, describing its territorial extent across modern Indonesia and beyond.",
      id: "Ditulis oleh Mpu Prapanca pada 1365, ini adalah karya sastra sejarah terpenting Indonesia. Terdaftar sebagai UNESCO Memory of the World pada 2013."
    }
  },
  {
    id: "gajah-mada",
    room: "kingdom",
    section: "kingdom-majapahit",
    shape: "bust",
    color: "#6a5a3a",
    position: [0, 2],
    name: { en: "Gajah Mada & Sumpah Palapa", id: "Gajah Mada & Sumpah Palapa" },
    origin: { en: "Majapahit Empire", id: "Kekaisaran Majapahit" },
    era: { en: "1331–1364 CE", id: "1331–1364 M" },
    description: {
      en: "Gajah Mada was the legendary Mahapatih who vowed not to enjoy spiced food until he united all of Nusantara. Under his leadership, Majapahit became the largest pre-colonial state in Southeast Asian history, controlling most of modern Indonesia and beyond.",
      id: "Gajah Mada adalah Mahapatih legendaris yang bersumpah tidak akan menikmati palapa sampai menyatukan seluruh Nusantara. Di bawah kepemimpinannya, Majapahit menjadi negara pra-kolonial terbesar di sejarah Asia Tenggara."
    }
  },
  {
    id: "sutasoma",
    room: "kingdom",
    section: "kingdom-majapahit",
    shape: "book",
    color: "#4a3a1a",
    position: [2, 2],
    name: { en: "Kakawin Sutasoma — Bhinneka Tunggal Ika", id: "Kakawin Sutasoma — Bhinneka Tunggal Ika" },
    origin: { en: "Majapahit Empire", id: "Kekaisaran Majapahit" },
    era: { en: "14th Century CE", id: "Abad ke-14 M" },
    description: {
      en: "Written by Mpu Tantular, this work contains the immortal phrase 'Bhinneka Tunggal Ika' — Indonesia's national motto meaning 'Unity in Diversity.' Originally meaning the truth of Shiva and Buddha is one, it now unites hundreds of ethnic groups.",
      id: "Ditulis oleh Mpu Tantular, memuat ungkapan abadi 'Bhinneka Tunggal Ika' — semboyan nasional Indonesia. Awalnya bermakna kebenaran Siwa dan Buddha adalah satu."
    }
  },
  {
    id: "crown",
    room: "kingdom",
    section: "kingdom-majapahit",
    shape: "texture",
    color: "#c9a14a",
    position: [4, 4],
    name: { en: "Mataram Sultanate Royal Crown", id: "Mahkota Kesultanan Mataram" },
    origin: { en: "Mataram Sultanate, Java", id: "Kesultanan Mataram, Jawa" },
    era: { en: "17th Century CE", id: "Abad ke-17 M" },
    description: {
      en: "At its peak under Sultan Agung (1613-1645), Mataram controlled most of Java. It was split into Surakarta and Yogyakarta by the Treaty of Giyanti (1755), both of which still exist ceremonially today.",
      id: "Pada puncaknya di bawah Sultan Agung (1613-1645), Mataram menguasai hampir seluruh Jawa. Dipecah oleh Perjanjian Giyanti (1755) menjadi Surakarta dan Yogyakarta."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 2: ERA KERAJAAN — Section: Kesultanan Islam Nusantara
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "samudera-pasai",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "tablet",
    color: "#6a8a5a",
    position: [-8, 6],
    name: { en: "Samudera Pasai Sultanate", id: "Kesultanan Samudera Pasai" },
    origin: { en: "Aceh Utara, Sumatra", id: "Aceh Utara, Sumatera" },
    era: { en: "1267–1521 CE", id: "1267–1521 M" },
    description: {
      en: "The first Islamic sultanate in Indonesia, founded c. 1267. Sultan Malik as-Saleh's tombstone (1297) is the oldest Muslim gravestone found in Indonesia. Ibn Battuta visited in 1345 and described it as a prosperous port.",
      id: "Kesultanan Islam pertama di Indonesia, didirikan sekitar 1267. Nisan Sultan Malik as-Saleh (1297) adalah nisan Muslim tertua di Indonesia. Ibnu Battuta mengunjunginya pada 1345."
    }
  },
  {
    id: "demak-mosque",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "wall",
    color: "#5a7a4a",
    position: [-6, 6],
    name: { en: "Demak Sultanate & Grand Mosque", id: "Kesultanan Demak & Masjid Agung" },
    origin: { en: "Demak, Central Java", id: "Demak, Jawa Tengah" },
    era: { en: "1475–1554 CE", id: "1475–1554 M" },
    description: {
      en: "The first Islamic sultanate on Java, successor to Majapahit. Masjid Agung Demak is the oldest mosque in Java, traditionally attributed to the Wali Songo — the nine Islamic saints who spread Islam across Java.",
      id: "Kesultanan Islam pertama di Jawa, penerus Majapahit. Masjid Agung Demak adalah masjid tertua di Jawa, dikaitkan dengan Wali Songo."
    }
  },
  {
    id: "aceh-iskandar-muda",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "crown",
    color: "#4a6a3a",
    position: [-4, 6],
    name: { en: "Aceh Darussalam — Sultan Iskandar Muda", id: "Aceh Darussalam — Sultan Iskandar Muda" },
    origin: { en: "Banda Aceh, Sumatra", id: "Banda Aceh, Sumatera" },
    era: { en: "Peak: 1607-1636", id: "Puncak: 1607-1636" },
    description: {
      en: "Aceh reached its golden age under Sultan Iskandar Muda, becoming one of the most powerful states in Southeast Asia. It controlled the pepper trade and maintained diplomatic relations with the Ottoman Empire. Aceh was famously never fully conquered by the Dutch.",
      id: "Aceh mencapai masa keemasannya di bawah Sultan Iskandar Muda. Menguasai perdagangan lada dan menjalin hubungan diplomatik dengan Kekaisaran Ottoman. Aceh terkenal tidak pernah sepenuhnya ditaklukkan Belanda."
    }
  },
  {
    id: "ternate-baabullah",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "crown",
    color: "#3a5a4a",
    position: [-2, 6],
    name: { en: "Ternate — Sultan Baabullah", id: "Ternate — Sultan Baabullah" },
    origin: { en: "Ternate, North Maluku", id: "Ternate, Maluku Utara" },
    era: { en: "Peak: 16th Century", id: "Puncak: Abad ke-16" },
    description: {
      en: "The Sultanate of Ternate controlled the global clove trade. Sultan Baabullah (1570-1583) is a national hero for expelling the Portuguese from Ternate in 1575 after a five-year siege.",
      id: "Kesultanan Ternate menguasai perdagangan cengkih global. Sultan Baabullah (1570-1583) mengusir Portugis dari Ternate pada 1575 setelah pengepungan lima tahun."
    }
  },
  {
    id: "banten-sultanate",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "wall",
    color: "#5a6a5a",
    position: [0, 6],
    name: { en: "Banten Sultanate", id: "Kesultanan Banten" },
    origin: { en: "Banten, West Java", id: "Banten, Jawa Barat" },
    era: { en: "1526–1813 CE", id: "1526–1813 M" },
    description: {
      en: "One of the most important maritime trading kingdoms, strategically located controlling the Sunda Strait. Founded by Sunan Gunung Jati (one of the Wali Songo), Banten became a major international pepper port.",
      id: "Salah satu kerajaan perdagangan maritim terpenting, menguasai Selat Sunda. Didirikan oleh Sunan Gunung Jati (salah satu Wali Songo)."
    }
  },
  {
    id: "gowa-tallo",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "crown",
    color: "#6a5a4a",
    position: [2, 6],
    name: { en: "Gowa-Tallo (Makassar)", id: "Gowa-Tallo (Makassar)" },
    origin: { en: "Makassar, South Sulawesi", id: "Makassar, Sulawesi Selatan" },
    era: { en: "16th–17th Century", id: "Abad ke-16–17" },
    description: {
      en: "Sultan Hasanuddin of Gowa, nicknamed 'The Rooster of the East' by the Dutch, fought the Dutch-Bugis alliance in the Makassar War. The Treaty of Bongaya (1667) marked the end of Makassar's independence.",
      id: "Sultan Hasanuddin dari Gowa, dijuluki 'Ayam Jantan dari Timur' oleh Belanda, melawan aliansi Belanda-Bugis dalam Perang Makassar."
    }
  },
  {
    id: "banjar-sultanate",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "scroll",
    color: "#5a5a3a",
    position: [4, 6],
    name: { en: "Banjar Sultanate", id: "Kesultanan Banjar" },
    origin: { en: "South Kalimantan", id: "Kalimantan Selatan" },
    era: { en: "1526–1860 CE", id: "1526–1860 M" },
    description: {
      en: "The dominant Islamic kingdom in southeastern Borneo, wealthy through the diamond and pepper trade. The Banjar War (1859-1905) led by Prince Antasari was one of the longest resistance wars in Indonesian history.",
      id: "Kerajaan Islam dominan di Kalimantan tenggara, kaya melalui perdagangan intan dan lada. Perang Banjar (1859-1905) dipimpin Pangeran Antasari."
    }
  },
  {
    id: "cirebon-sultanate",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "wall",
    color: "#7a6a4a",
    position: [6, 6],
    name: { en: "Cirebon Sultanate", id: "Kesultanan Cirebon" },
    origin: { en: "Cirebon, West Java", id: "Cirebon, Jawa Barat" },
    era: { en: "15th Century CE onward", id: "Abad ke-15 M" },
    description: {
      en: "Founded by Sunan Gunung Jati, Cirebon played a crucial role in spreading Islam in West Java. The unique Mega Mendung batik pattern reflects the blend of Javanese, Sundanese, Chinese, and Islamic influences.",
      id: "Didirikan oleh Sunan Gunung Jati, berperan krusial dalam penyebaran Islam di Jawa Barat. Motif batik Mega Mendung yang unik mencerminkan perpaduan pengaruh Jawa, Sunda, Tionghoa, dan Islam."
    }
  },
  {
    id: "pajajaran-siliwangi",
    room: "kingdom",
    section: "kingdom-islamic",
    shape: "crown",
    color: "#8a7a5a",
    position: [8, 6],
    name: { en: "Sunda Kingdom (Prabu Siliwangi)", id: "Kerajaan Sunda (Prabu Siliwangi)" },
    origin: { en: "Pakuan, West Java", id: "Pakuan, Jawa Barat" },
    era: { en: "Peak: 1482-1521", id: "Puncak: 1482-1521" },
    description: {
      en: "The dominant Hindu-Buddhist kingdom in western Java. The fall of Pajajaran around 1579 marked the end of Hindu kingdoms in Java after the Muslim coalition of Demak defeated a joint Sunda-Portuguese force at Sunda Kelapa (1527).",
      id: "Kerajaan Hindu-Buddha dominan di Jawa Barat. Jatuhnya Pajajaran sekitar 1579 menandai akhir kerajaan Hindu di Jawa."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 3: ERA KOLONIAL — Section: Kedatangan Eropa
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "portuguese-malacca",
    room: "colonial",
    section: "colonial-arrival",
    shape: "wall",
    color: "#8a7a5a",
    position: [-10.85, -4],
    name: { en: "Portuguese Conquest of Malacca (1511)", id: "Penaklukan Portugis atas Malaka (1511)" },
    origin: { en: "Malacca", id: "Malaka" },
    era: { en: "1511", id: "1511" },
    description: {
      en: "The Portuguese conquest of Malacca in 1511 under Alfonso de Albuquerque marked the beginning of European colonialism in Southeast Asia, giving Portugal control over the spice trade route to the Moluccas.",
      id: "Penaklukan Portugis atas Malaka pada 1511 menandai awal kolonialisme Eropa di Asia Tenggara."
    }
  },
  {
    id: "voc-map",
    room: "colonial",
    section: "colonial-arrival",
    shape: "wall",
    color: "#a89373",
    position: [-10.85, -2],
    name: { en: "VOC Spice Trade Map", id: "Peta Perdagangan Rempah VOC" },
    origin: { en: "Dutch East India Company", id: "VOC" },
    era: { en: "1602–1799", id: "1602–1799" },
    description: {
      en: "The VOC (1602) was the world's first multinational corporation, with its own army, navy, and the right to wage war. At its peak it controlled the global trade in nutmeg, mace, cloves, and pepper.",
      id: "VOC (1602) adalah perusahaan multinasional pertama di dunia, dengan tentara dan angkatan laut sendiri. Menguasai perdagangan global pala, fuli, cengkih, dan lada."
    }
  },
  {
    id: "banda-spices",
    room: "colonial",
    section: "colonial-arrival",
    shape: "texture",
    color: "#5c704f",
    position: [-6, -4],
    name: { en: "Banda Islands Nutmeg", id: "Pala Kepulauan Banda" },
    origin: { en: "Banda Islands, Maluku", id: "Kepulauan Banda, Maluku" },
    era: { en: "16th–18th Century", id: "Abad ke-16–18" },
    description: {
      en: "The Banda Islands were the ONLY source of nutmeg in the world. In 1621, the VOC massacred virtually the entire Bandanese population. The Treaty of Breda (1667) saw England trade Banda's Run Island for Manhattan — history's most lopsided land swap.",
      id: "Kepulauan Banda adalah SATU-SATUNYA sumber pala di dunia. Pada 1621, VOC membantai hampir seluruh penduduk Banda. Perjanjian Breda (1667): Inggris menukar Pulau Run dengan Manhattan."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 3: ERA KOLONIAL — Section: VOC & Pemerintahan Kolonial
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "batavia-founding",
    room: "colonial",
    section: "colonial-voc",
    shape: "wall",
    color: "#7a6a5a",
    position: [10.85, -4],
    name: { en: "Founding of Batavia (1619)", id: "Pendirian Batavia (1619)" },
    origin: { en: "Batavia (Jakarta)", id: "Batavia (Jakarta)" },
    era: { en: "1619", id: "1619" },
    description: {
      en: "In 1619, Jan Pieterszoon Coen razed Jayakarta and built Batavia as the VOC's Asian headquarters. It became the administrative center of the Dutch East Indies for over three centuries, eventually becoming Jakarta.",
      id: "Pada 1619, J.P. Coen menghancurkan Jayakarta dan membangun Batavia sebagai markas besar VOC di Asia. Menjadi Jakarta modern."
    }
  },
  {
    id: "tanam-paksa",
    room: "colonial",
    section: "colonial-voc",
    shape: "scroll",
    color: "#6a5a4a",
    position: [6, -4],
    name: { en: "Cultuurstelsel (Forced Cultivation)", id: "Sistem Tanam Paksa (Cultuurstelsel)" },
    origin: { en: "Dutch East Indies", id: "Hindia Belanda" },
    era: { en: "1830–1870", id: "1830–1870" },
    description: {
      en: "One of the most exploitative colonial policies in history. Farmers were forced to grow export crops (coffee, sugar, indigo), causing widespread famine. Abolished after Multatuli's novel 'Max Havelaar' exposed its horrors.",
      id: "Salah satu kebijakan kolonial paling eksploitatif dalam sejarah. Petani dipaksa menanam tanaman ekspor, menyebabkan kelaparan luas."
    }
  },
  {
    id: "daendels-road",
    room: "colonial",
    section: "colonial-voc",
    shape: "wall",
    color: "#8a7a6a",
    position: [10.85, -2],
    name: { en: "Great Post Road (1,000 km)", id: "Jalan Raya Pos (1.000 km)" },
    origin: { en: "Anyer to Panarukan", id: "Anyer ke Panarukan" },
    era: { en: "1808", id: "1808" },
    description: {
      en: "A 1,000 km road from Anyer to Panarukan built in one year under Daendels. An estimated 12,000 forced laborers died during construction. Despite brutal origins, it became the backbone of Java's infrastructure.",
      id: "Jalan sepanjang 1.000 km dari Anyer ke Panarukan, dibangun dalam satu tahun. Diperkirakan 12.000 pekerja paksa meninggal."
    }
  },
  {
    id: "politik-etis",
    room: "colonial",
    section: "colonial-voc",
    shape: "book",
    color: "#5a6a7a",
    position: [8, -6],
    name: { en: "Ethical Policy (Politik Etis)", id: "Politik Etis" },
    origin: { en: "Dutch East Indies", id: "Hindia Belanda" },
    era: { en: "1901", id: "1901" },
    description: {
      en: "The Ethical Policy (1901) aimed to 'repay the debt of honor' through Education, Irrigation, and Emigration. Ironically, it produced the educated elite who would lead the independence movement.",
      id: "Politik Etis (1901) bertujuan 'membayar utang kehormatan' melalui Edukasi, Irigasi, dan Emigrasi. Ironisnya, justru menghasilkan elit terdidik yang memimpin gerakan kemerdekaan."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 3: ERA KOLONIAL — Section: Perlawanan Rakyat
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "diponegoro-kris",
    room: "colonial",
    section: "colonial-resistance",
    shape: "sword",
    color: "#2f2418",
    position: [-6, 2],
    name: { en: "Prince Diponegoro — Java War", id: "Pangeran Diponegoro — Perang Jawa" },
    origin: { en: "Yogyakarta", id: "Yogyakarta" },
    era: { en: "1825–1830", id: "1825–1830" },
    description: {
      en: "The Java War (1825-1830) resulted in 200,000 Javanese and 8,000 European deaths. Diponegoro was captured through treachery during peace negotiations in 1830. His image appears on the 50,000 rupiah banknote.",
      id: "Perang Jawa (1825-1830) mengakibatkan 200.000 korban Jawa dan 8.000 Eropa. Diponegoro ditangkap melalui pengkhianatan dalam negosiasi perdamaian. Wajahnya pada uang Rp 50.000."
    }
  },
  {
    id: "imam-bonjol",
    room: "colonial",
    section: "colonial-resistance",
    shape: "bust",
    color: "#4a5a3a",
    position: [-4, 4],
    name: { en: "Tuanku Imam Bonjol — Padri War", id: "Tuanku Imam Bonjol — Perang Padri" },
    origin: { en: "Minangkabau, West Sumatra", id: "Minangkabau, Sumatera Barat" },
    era: { en: "1803–1838", id: "1803–1838" },
    description: {
      en: "The Padri War was one of the longest colonial wars. Imam Bonjol fought the Dutch for decades until his capture in 1837 and exile to Minahasa.",
      id: "Perang Padri adalah salah satu perang kolonial terlama. Imam Bonjol melawan Belanda puluhan tahun hingga tertangkap 1837."
    }
  },
  {
    id: "cut-nyak-dhien",
    room: "colonial",
    section: "colonial-resistance",
    shape: "bust",
    color: "#5a4a3a",
    position: [-2, 2],
    name: { en: "Cut Nyak Dhien — Aceh War", id: "Cut Nyak Dhien — Perang Aceh" },
    origin: { en: "Aceh, Sumatra", id: "Aceh, Sumatera" },
    era: { en: "1873–1904", id: "1873–1904" },
    description: {
      en: "The Aceh War (1873-1904) was the longest, bloodiest Dutch colonial war. Cut Nyak Dhien continued fighting after her husband Teuku Umar's death in 1899, resulting in 60,000-70,000 Acehnese deaths.",
      id: "Perang Aceh (1873-1904) adalah perang kolonial Belanda terlama dan terberdarah. Cut Nyak Dhien terus berjuang setelah suaminya Teuku Umar gugur."
    }
  },
  {
    id: "pattimura",
    room: "colonial",
    section: "colonial-resistance",
    shape: "bust",
    color: "#6a5a4a",
    position: [0, 4],
    name: { en: "Thomas Matulessy (Pattimura)", id: "Thomas Matulessy (Pattimura)" },
    origin: { en: "Saparua, Maluku", id: "Saparua, Maluku" },
    era: { en: "1817", id: "1817" },
    description: {
      en: "Pattimura captured Fort Duurstede and killed the Dutch resident on Saparua in 1817. Though executed, his sacrifice inspired continued resistance in eastern Indonesia. National hero since 1973.",
      id: "Pattimura merebut Benteng Duurstede pada 1817. Meski dieksekusi, pengorbanannya menginspirasi perlawanan berkelanjutan. Pahlawan nasional sejak 1973."
    }
  },
  {
    id: "sisingamangaraja",
    room: "colonial",
    section: "colonial-resistance",
    shape: "bust",
    color: "#5a5a4a",
    position: [2, 2],
    name: { en: "Sisingamangaraja XII", id: "Sisingamangaraja XII" },
    origin: { en: "Bakara, North Sumatra", id: "Bakara, Sumatera Utara" },
    era: { en: "1877–1907", id: "1877–1907" },
    description: {
      en: "The last priest-king of the Batak people who led a 30-year guerrilla resistance. Killed in battle in 1907 along with his son and two daughters. National hero since 1961.",
      id: "Raja-pendeta terakhir bangsa Batak yang memimpin perlawanan gerilya 30 tahun. Terbunuh dalam pertempuran 1907 bersama putra dan dua putrinya."
    }
  },
  {
    id: "puputan-bali",
    room: "colonial",
    section: "colonial-resistance",
    shape: "scroll",
    color: "#7a5a3a",
    position: [4, 4],
    name: { en: "Puputan Badung & Klungkung (Bali)", id: "Puputan Badung & Klungkung (Bali)" },
    origin: { en: "Bali", id: "Bali" },
    era: { en: "1906–1908", id: "1906–1908" },
    description: {
      en: "Rather than submit to Dutch rule, Balinese royal families dressed in ceremonial white marched into Dutch gunfire in ritual mass suicide. These images shocked European public opinion.",
      id: "Alih-alih tunduk, keluarga kerajaan Bali berpakaian putih seremonial berjalan ke tembakan Belanda dalam pengorbanan diri ritual."
    }
  },
  {
    id: "hasanuddin-helmet",
    room: "colonial",
    section: "colonial-resistance",
    shape: "texture",
    color: "#6b583f",
    position: [6, 2],
    name: { en: "Sultan Hasanuddin — Rooster of the East", id: "Sultan Hasanuddin — Ayam Jantan dari Timur" },
    origin: { en: "Gowa, South Sulawesi", id: "Gowa, Sulawesi Selatan" },
    era: { en: "1653–1669", id: "1653–1669" },
    description: {
      en: "The Dutch called him 'The Rooster of the East' for his aggressive fighting spirit against the VOC spice trade monopoly in eastern Indonesia. National hero since 1973.",
      id: "Belanda menjulukinya 'Ayam Jantan dari Timur' karena semangat bertarungnya terhadap monopoli VOC. Pahlawan nasional sejak 1973."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 3: ERA KOLONIAL — Section: Pendudukan Jepang
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "romusha",
    room: "colonial",
    section: "colonial-japan",
    shape: "scroll",
    color: "#4a4a4a",
    position: [-8, 6],
    name: { en: "Romusha — Japanese Forced Labor", id: "Romusha — Kerja Paksa Jepang" },
    origin: { en: "Japanese-occupied Indies", id: "Hindia pendudukan Jepang" },
    era: { en: "1942–1945", id: "1942–1945" },
    description: {
      en: "An estimated 4-10 million Indonesians were conscripted as romusha for brutal forced labor. Hundreds of thousands to millions died from exhaustion, disease, and starvation. This dark chapter remains deeply embedded in Indonesian collective memory.",
      id: "Diperkirakan 4-10 juta orang Indonesia dipaksa sebagai romusha. Ratusan ribu hingga jutaan orang meninggal akibat kelelahan, penyakit, dan kelaparan."
    }
  },
  {
    id: "peta-formation",
    room: "colonial",
    section: "colonial-japan",
    shape: "flag",
    color: "#5a5a3a",
    position: [-6, 6],
    name: { en: "PETA & Blitar Revolt", id: "PETA & Pemberontakan Blitar" },
    origin: { en: "Java", id: "Jawa" },
    era: { en: "1943–1945", id: "1943–1945" },
    description: {
      en: "PETA (Defenders of the Homeland) inadvertently trained the core of Indonesia's future military. The Blitar revolt (1945) led by Supriyadi demonstrated Indonesian soldiers' will to fight for independence.",
      id: "PETA secara tidak sengaja melatih inti militer Indonesia masa depan. Pemberontakan Blitar (1945) yang dipimpin Supriyadi menunjukkan tekad prajurit Indonesia."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 4: PERGERAKAN NASIONAL — Section: Kebangkitan Nasional
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "budi-utomo",
    room: "national",
    section: "national-awakening",
    shape: "book",
    color: "#8a7a5a",
    position: [-8, -4],
    name: { en: "Budi Utomo (1908)", id: "Budi Utomo (1908)" },
    origin: { en: "Jakarta (STOVIA)", id: "Jakarta (STOVIA)" },
    era: { en: "20 May 1908", id: "20 Mei 1908" },
    description: {
      en: "The first Indonesian nationalist organization, founded by Dr. Sutomo at STOVIA medical school. May 20 is now celebrated as National Awakening Day (Hari Kebangkitan Nasional).",
      id: "Organisasi nasionalis Indonesia pertama, didirikan dr. Sutomo di STOVIA. 20 Mei dirayakan sebagai Hari Kebangkitan Nasional."
    }
  },
  {
    id: "sarekat-islam",
    room: "national",
    section: "national-awakening",
    shape: "flag",
    color: "#4a7a4a",
    position: [-6, -6],
    name: { en: "Sarekat Islam (1912)", id: "Sarekat Islam (1912)" },
    origin: { en: "Surakarta", id: "Surakarta" },
    era: { en: "1912", id: "1912" },
    description: {
      en: "The first mass political organization in Indonesia, claiming 2.5 million members by 1919. Led by H.O.S. Tjokroaminoto (Soekarno's mentor), it combined Islamic identity with anti-colonial economic nationalism.",
      id: "Organisasi politik massa pertama di Indonesia, dengan 2,5 juta anggota pada 1919. Dipimpin H.O.S. Tjokroaminoto (guru Soekarno)."
    }
  },
  {
    id: "indische-partij",
    room: "national",
    section: "national-awakening",
    shape: "scroll",
    color: "#7a5a3a",
    position: [-4, -4],
    name: { en: "Indische Partij — Three Musketeers", id: "Indische Partij — Tiga Serangkai" },
    origin: { en: "Bandung", id: "Bandung" },
    era: { en: "1912", id: "1912" },
    description: {
      en: "The first political party to openly call for Indonesian independence. Founded by the 'Tiga Serangkai': Douwes Dekker, Tjipto Mangunkusumo, and Suwardi Suryaningrat (Ki Hajar Dewantara). Motto: 'The Indies for its People.'",
      id: "Partai politik pertama yang secara terbuka menyerukan kemerdekaan Indonesia. Didirikan oleh 'Tiga Serangkai.' Moto: 'Hindia untuk Rakyatnya.'"
    }
  },
  {
    id: "taman-siswa",
    room: "national",
    section: "national-awakening",
    shape: "book",
    color: "#6a7a5a",
    position: [-2, -6],
    name: { en: "Taman Siswa — Ki Hajar Dewantara", id: "Taman Siswa — Ki Hajar Dewantara" },
    origin: { en: "Yogyakarta", id: "Yogyakarta" },
    era: { en: "1922", id: "1922" },
    description: {
      en: "Ki Hajar Dewantara's educational philosophy — 'Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani' — became the foundation of Indonesia's educational philosophy. His birthday May 2 is National Education Day.",
      id: "Filosofi pendidikan Ki Hajar Dewantara — 'Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani' — menjadi fondasi pendidikan Indonesia. 2 Mei adalah Hari Pendidikan Nasional."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 4: PERGERAKAN NASIONAL — Section: Perjuangan Politik
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "pni-soekarno",
    room: "national",
    section: "national-struggle",
    shape: "flag",
    color: "#c0392b",
    position: [0, -4],
    name: { en: "PNI — Ir. Soekarno (1927)", id: "PNI — Ir. Soekarno (1927)" },
    origin: { en: "Bandung", id: "Bandung" },
    era: { en: "1927", id: "1927" },
    description: {
      en: "The most radical and influential political party of the colonial era. Soekarno's 1930 trial defense speech 'Indonesia Menggugat' (Indonesia Accuses) became a powerful indictment of colonialism.",
      id: "Partai politik paling radikal dan berpengaruh era kolonial. Pidato pembelaan Soekarno 1930 'Indonesia Menggugat' menjadi dakwaan kuat terhadap kolonialisme."
    }
  },
  {
    id: "sumpah-pemuda",
    room: "national",
    section: "national-struggle",
    shape: "scroll",
    color: "#e74c3c",
    position: [2, -6],
    name: { en: "Youth Pledge (Sumpah Pemuda)", id: "Sumpah Pemuda" },
    origin: { en: "Jakarta", id: "Jakarta" },
    era: { en: "28 October 1928", id: "28 Oktober 1928" },
    description: {
      en: "The pivotal moment when young Indonesians declared: ONE motherland, ONE nation, ONE language — Indonesia. During the congress, W.R. Supratman performed 'Indonesia Raya' for the first time. October 28 is Youth Pledge Day.",
      id: "Momen krusial ketika pemuda Indonesia menyatakan: SATU tanah air, SATU bangsa, SATU bahasa — Indonesia. W.R. Supratman memperdengarkan 'Indonesia Raya' untuk pertama kalinya."
    }
  },
  {
    id: "tan-malaka",
    room: "national",
    section: "national-struggle",
    shape: "book",
    color: "#5a4a3a",
    position: [4, -4],
    name: { en: "Tan Malaka — Hidden Revolutionary", id: "Tan Malaka — Revolusioner Tersembunyi" },
    origin: { en: "West Sumatra", id: "Sumatera Barat" },
    era: { en: "1897–1949", id: "1897–1949" },
    description: {
      en: "One of Indonesia's most brilliant yet controversial revolutionaries. Living as a fugitive for over 20 years across Southeast Asia, he wrote 'Madilog' (Materialism, Dialectics, Logic). His mysterious execution in 1949 remains debated.",
      id: "Salah satu revolusioner paling cerdas dan kontroversial Indonesia. Hidup sebagai buronan selama 20+ tahun. Eksekusinya yang misterius pada 1949 masih diperdebatkan."
    }
  },
  {
    id: "nahdlatul-ulama",
    room: "national",
    section: "national-struggle",
    shape: "book",
    color: "#4a6a4a",
    position: [6, -6],
    name: { en: "Nahdlatul Ulama (NU) — 1926", id: "Nahdlatul Ulama (NU) — 1926" },
    origin: { en: "Surabaya, East Java", id: "Surabaya, Jawa Timur" },
    era: { en: "1926", id: "1926" },
    description: {
      en: "Founded by KH Hasyim Asy'ari in 1926, NU is the largest Islamic organization in the world with an estimated 90+ million members. It played a crucial role in defending Indonesian independence and promoting moderate Islam.",
      id: "Didirikan oleh KH Hasyim Asy'ari pada 1926, NU adalah organisasi Islam terbesar di dunia dengan 90+ juta anggota. Berperan krusial dalam mempertahankan kemerdekaan."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 4: PERGERAKAN NASIONAL — Section: Persiapan Kemerdekaan
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "bpupki-pancasila",
    room: "national",
    section: "national-preparation",
    shape: "scroll",
    color: "#d4a017",
    position: [8, -4],
    name: { en: "BPUPKI & Birth of Pancasila", id: "BPUPKI & Lahirnya Pancasila" },
    origin: { en: "Jakarta", id: "Jakarta" },
    era: { en: "1 June 1945", id: "1 Juni 1945" },
    description: {
      en: "On 1 June 1945, Soekarno proposed Pancasila as the philosophical foundation of Indonesia. The Jakarta Charter (22 June) nearly included an obligation for Muslims to follow Sharia — this clause was removed to preserve national unity.",
      id: "Pada 1 Juni 1945, Soekarno mengusulkan Pancasila sebagai dasar filosofis negara Indonesia. Piagam Jakarta (22 Juni) hampir mencantumkan kewajiban syariah — klausul ini dihapus demi persatuan."
    }
  },
  {
    id: "rengasdengklok",
    room: "national",
    section: "national-preparation",
    shape: "scroll",
    color: "#b8860b",
    position: [8, 2],
    name: { en: "Rengasdengklok Incident", id: "Peristiwa Rengasdengklok" },
    origin: { en: "Rengasdengklok, West Java", id: "Rengasdengklok, Jawa Barat" },
    era: { en: "16 August 1945", id: "16 Agustus 1945" },
    description: {
      en: "Young revolutionaries 'kidnapped' Soekarno and Hatta to push for immediate independence declaration after Japan's surrender. This demonstrates the critical role of youth in Indonesian independence.",
      id: "Para pemuda revolusioner 'menculik' Soekarno dan Hatta untuk mendorong proklamasi segera. Menunjukkan peran kritis pemuda dalam kemerdekaan Indonesia."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 5: INDONESIA MODERN — Section: Proklamasi & Revolusi
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "proklamasi",
    room: "modern",
    section: "modern-revolution",
    shape: "wall",
    color: "#e8d6a3",
    position: [-10.85, -6],
    name: { en: "Proclamation of Independence", id: "Teks Proklamasi Kemerdekaan" },
    origin: { en: "Jl. Pegangsaan Timur 56, Jakarta", id: "Jl. Pegangsaan Timur 56, Jakarta" },
    era: { en: "17 August 1945", id: "17 Agustus 1945" },
    description: {
      en: "Read by Soekarno at 10:00 AM on 17 August 1945. The text was drafted the night before at Rear Admiral Maeda's house. Signed by Soekarno and Hatta 'on behalf of the Indonesian people.'",
      id: "Dibacakan oleh Soekarno pukul 10:00 pada 17 Agustus 1945. Naskahnya disusun malam sebelumnya di rumah Laksamana Muda Maeda."
    }
  },
  {
    id: "merah-putih",
    room: "modern",
    section: "modern-revolution",
    shape: "flag",
    color: "#c0392b",
    position: [-10.85, -4],
    name: { en: "Sang Saka Merah Putih", id: "Sang Saka Merah Putih" },
    origin: { en: "Sewn by Fatmawati", id: "Dijahit oleh Fatmawati" },
    era: { en: "17 August 1945", id: "17 Agustus 1945" },
    description: {
      en: "The original flag sewn by Fatmawati. The red-white motif predates European contact — it appeared on Majapahit flags in the 13th century. Now preserved in a nitrogen-sealed case at the Monas museum.",
      id: "Bendera asli yang dijahit oleh Fatmawati. Motif merah-putih mendahului kontak Eropa — muncul pada panji Majapahit abad ke-13. Kini disimpan dalam wadah nitrogen di museum Monas."
    }
  },
  {
    id: "surabaya-spear",
    room: "modern",
    section: "modern-revolution",
    shape: "texture",
    color: "#9c3b28",
    position: [-8, -4],
    name: { en: "Battle of Surabaya — Bamboo Spears", id: "Pertempuran Surabaya — Bambu Runcing" },
    origin: { en: "Surabaya, East Java", id: "Surabaya, Jawa Timur" },
    era: { en: "10 November 1945", id: "10 November 1945" },
    description: {
      en: "The largest single battle of the Indonesian revolution. Armed with bamboo spears and inspired by Bung Tomo's radio broadcasts, fighters held off British forces for three weeks. November 10 is Heroes' Day.",
      id: "Pertempuran tunggal terbesar revolusi Indonesia. Bersenjata bambu runcing dan diinspirasi Bung Tomo, para pejuang bertahan tiga minggu. 10 November adalah Hari Pahlawan."
    }
  },
  {
    id: "soekarno-speech",
    room: "modern",
    section: "modern-revolution",
    shape: "book",
    color: "#3a2a1a",
    position: [-6, -6],
    name: { en: "Soekarno's Speeches", id: "Pidato-Pidato Soekarno" },
    origin: { en: "Office of the President", id: "Kantor Presiden" },
    era: { en: "1945–1967", id: "1945–1967" },
    description: {
      en: "One of the greatest orators of the 20th century. Key speeches include the Pancasila speech, the Proclamation, and the 'Ganyang Malaysia' speech. Known as 'Bapak Proklamator.'",
      id: "Salah satu orator terbesar abad ke-20. Dikenal sebagai 'Bapak Proklamator.'"
    }
  },
  {
    id: "sudirman",
    room: "modern",
    section: "modern-revolution",
    shape: "bust",
    color: "#4a5a3a",
    position: [-4, -4],
    name: { en: "General Sudirman", id: "Jenderal Sudirman" },
    origin: { en: "Purbalingga, Central Java", id: "Purbalingga, Jawa Tengah" },
    era: { en: "1945–1950", id: "1945–1950" },
    description: {
      en: "The first Commander-in-Chief, appointed at age 29. Despite tuberculosis, he led a legendary guerrilla campaign, carried on a stretcher through Java's jungles. He died at 34 shortly after independence.",
      id: "Panglima Besar pertama, diangkat usia 29 tahun. Meski menderita TBC, memimpin gerilya legendaris, ditandu melalui hutan Jawa. Meninggal usia 34."
    }
  },
  {
    id: "kmb",
    room: "modern",
    section: "modern-revolution",
    shape: "scroll",
    color: "#5a6a7a",
    position: [-2, -6],
    name: { en: "Round Table Conference (KMB)", id: "Konferensi Meja Bundar (KMB)" },
    origin: { en: "The Hague, Netherlands", id: "Den Haag, Belanda" },
    era: { en: "1949", id: "1949" },
    description: {
      en: "The Dutch recognized Indonesian sovereignty on 27 December 1949, but Indonesia had to assume 4.3 billion guilders in colonial debt. Indonesians were essentially forced to pay for their own colonization.",
      id: "Belanda mengakui kedaulatan Indonesia 27 Desember 1949, namun Indonesia harus menanggung utang kolonial 4,3 miliar gulden."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 5: INDONESIA MODERN — Section: Orde Lama
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "kaa-bandung",
    room: "modern",
    section: "modern-oldorder",
    shape: "wall",
    color: "#8a7a5a",
    position: [0, -4],
    name: { en: "Asia-Africa Conference Bandung", id: "Konferensi Asia-Afrika Bandung" },
    origin: { en: "Gedung Merdeka, Bandung", id: "Gedung Merdeka, Bandung" },
    era: { en: "April 1955", id: "April 1955" },
    description: {
      en: "A landmark gathering of 29 newly independent nations. It produced the Dasasila Bandung, was a precursor to the Non-Aligned Movement, and established Indonesia as a leader of the developing world.",
      id: "Pertemuan bersejarah 29 negara merdeka baru. Menghasilkan Dasasila Bandung, cikal bakal Gerakan Non-Blok."
    }
  },
  {
    id: "g30s",
    room: "modern",
    section: "modern-oldorder",
    shape: "scroll",
    color: "#4a3a2a",
    position: [2, -4],
    name: { en: "G30S Incident (30 September 1965)", id: "Peristiwa G30S (30 September 1965)" },
    origin: { en: "Jakarta", id: "Jakarta" },
    era: { en: "30 September 1965", id: "30 September 1965" },
    description: {
      en: "Six senior Army generals were kidnapped and killed. The mass killings that followed — estimated at 500,000 to over 1 million people — remain the most traumatic and contested chapter of Indonesian history. The aftermath led to Soeharto's rise.",
      id: "Enam jenderal senior diculik dan dibunuh. Pembunuhan massal yang menyusul — diperkirakan 500.000 hingga lebih dari 1 juta orang — tetap menjadi bab paling traumatis dalam sejarah Indonesia."
    }
  },
  {
    id: "supersemar",
    room: "modern",
    section: "modern-oldorder",
    shape: "scroll",
    color: "#5a4a3a",
    position: [4, -6],
    name: { en: "Supersemar — Transfer of Power", id: "Supersemar — Alih Kekuasaan" },
    origin: { en: "Jakarta", id: "Jakarta" },
    era: { en: "11 March 1966", id: "11 Maret 1966" },
    description: {
      en: "Soeharto used this document to ban the PKI and effectively seize power — beginning the New Order era. The original document has never been found, making it one of Indonesia's greatest historical mysteries.",
      id: "Soeharto menggunakan dokumen ini untuk melarang PKI dan merebut kekuasaan. Naskah aslinya tidak pernah ditemukan."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 5: INDONESIA MODERN — Section: Orde Baru
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "palapa-satellite",
    room: "modern",
    section: "modern-neworder",
    shape: "texture",
    color: "#3a5a7a",
    position: [6, -4],
    name: { en: "Palapa Satellite", id: "Satelit Palapa" },
    origin: { en: "Cape Canaveral → Orbit", id: "Cape Canaveral → Orbit" },
    era: { en: "8 July 1976", id: "8 Juli 1976" },
    description: {
      en: "Indonesia became the first developing country to operate its own domestic communication satellite. Named after Gajah Mada's Sumpah Palapa, it connected 17,000+ islands for the first time.",
      id: "Indonesia menjadi negara berkembang pertama yang mengoperasikan satelit komunikasi domestik sendiri. Menghubungkan 17.000+ pulau untuk pertama kalinya."
    }
  },
  {
    id: "tragedi-1998",
    room: "modern",
    section: "modern-neworder",
    shape: "wall",
    color: "#3a3a3a",
    position: [10.85, -4],
    name: { en: "May 1998 Tragedy & Fall of Soeharto", id: "Tragedi Mei 1998 & Jatuhnya Soeharto" },
    origin: { en: "Jakarta & major cities", id: "Jakarta & kota besar" },
    era: { en: "May 1998", id: "Mei 1998" },
    description: {
      en: "The Asian Financial Crisis triggered massive protests. On May 12, four Trisakti students were shot dead. On 21 May 1998, Soeharto resigned after 32 years, ending the New Order.",
      id: "Krisis moneter memicu protes massal. 12 Mei, empat mahasiswa Trisakti ditembak. 21 Mei 1998, Soeharto mundur setelah 32 tahun."
    }
  },
  {
    id: "santa-cruz",
    room: "modern",
    section: "modern-neworder",
    shape: "scroll",
    color: "#4a4a3a",
    position: [8, -4],
    name: { en: "Santa Cruz Massacre (Dili, 1991)", id: "Tragedi Santa Cruz (Dili, 1991)" },
    origin: { en: "Dili, East Timor", id: "Dili, Timor Timur" },
    era: { en: "12 November 1991", id: "12 November 1991" },
    description: {
      en: "Indonesian troops opened fire on a peaceful pro-independence demonstration at the Santa Cruz Cemetery in Dili, killing an estimated 250+ people. Captured on film by foreign journalists, the massacre drew worldwide condemnation and became a turning point for the East Timor independence movement.",
      id: "Tentara Indonesia menembaki demonstrasi damai pro-kemerdekaan di Pemakaman Santa Cruz, Dili. Terekam kamera wartawan asing, tragedi ini menjadi titik balik gerakan kemerdekaan Timor Timur."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 5: INDONESIA MODERN — Section: Era Reformasi
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "habibie-reformasi",
    room: "modern",
    section: "modern-reformasi",
    shape: "bust",
    color: "#6a7a8a",
    position: [-8, 2],
    name: { en: "President B.J. Habibie", id: "Presiden B.J. Habibie" },
    origin: { en: "Jakarta", id: "Jakarta" },
    era: { en: "1998–1999", id: "1998–1999" },
    description: {
      en: "Indonesia's third president shepherded the transition to democracy: freeing political prisoners, allowing press freedom, and — most controversially — allowing East Timor's independence referendum.",
      id: "Presiden ketiga Indonesia memandu transisi ke demokrasi: membebaskan tahanan politik, mengizinkan kebebasan pers, dan mengizinkan referendum Timor Timur."
    }
  },
  {
    id: "tsunami-aceh",
    room: "modern",
    section: "modern-reformasi",
    shape: "wall",
    color: "#4a6a8a",
    position: [-6, 4],
    name: { en: "2004 Tsunami & Aceh Peace", id: "Tsunami 2004 & Perdamaian Aceh" },
    origin: { en: "Banda Aceh", id: "Banda Aceh" },
    era: { en: "26 December 2004", id: "26 Desember 2004" },
    description: {
      en: "A magnitude 9.1 earthquake triggered the deadliest tsunami in history, killing 170,000 Indonesians. Paradoxically, it helped end the Aceh insurgency through the 2005 MoU Helsinki peace agreement.",
      id: "Gempa 9,1 memicu tsunami paling mematikan dalam sejarah, menewaskan 170.000 orang Indonesia. Secara paradoks, membantu mengakhiri konflik Aceh melalui MoU Helsinki 2005."
    }
  },
  {
    id: "ikn-nusantara",
    room: "modern",
    section: "modern-reformasi",
    shape: "wall",
    color: "#3a7a5a",
    position: [-4, 2],
    name: { en: "New Capital — Nusantara (IKN)", id: "Ibu Kota Baru — Nusantara (IKN)" },
    origin: { en: "East Kalimantan", id: "Kalimantan Timur" },
    era: { en: "2022–ongoing", id: "2022–berlangsung" },
    description: {
      en: "Indonesia is relocating its capital from Jakarta to 'Nusantara' in East Kalimantan. The 256,142-hectare project envisions a green, smart city. The most ambitious urban development in Indonesian history.",
      id: "Indonesia memindahkan ibu kota dari Jakarta ke 'Nusantara' di Kalimantan Timur. Proyek seluas 256.142 hektar, pengembangan perkotaan paling ambisius dalam sejarah Indonesia."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 5: INDONESIA MODERN — Section: Simbol & Identitas Negara
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "monas",
    room: "modern",
    section: "modern-symbols",
    shape: "crown",
    color: "#d6c47a",
    position: [-2, 2],
    name: { en: "National Monument (Monas)", id: "Monumen Nasional (Monas)" },
    origin: { en: "Merdeka Square, Jakarta", id: "Lapangan Medan Merdeka, Jakarta" },
    era: { en: "1961–1975", id: "1961–1975" },
    description: {
      en: "A 132-meter obelisk crowned with a flame covered in 50 kg of gold leaf. The interior houses 51 dioramas depicting Indonesian history.",
      id: "Obelis setinggi 132 meter dimahkotai lidah api dilapisi 50 kg emas. Interiornya berisi 51 diorama sejarah Indonesia."
    }
  },
  {
    id: "garuda",
    room: "modern",
    section: "modern-symbols",
    shape: "wall",
    color: "#d6b158",
    position: [0, 4],
    name: { en: "Garuda Pancasila", id: "Garuda Pancasila" },
    origin: { en: "Designed by Sultan Hamid II", id: "Dirancang Sultan Hamid II" },
    era: { en: "Adopted 1950", id: "Diresmikan 1950" },
    description: {
      en: "Indonesia's national emblem. The 17 wing feathers, 8 tail feathers, and 45 breast feathers represent 17-8-45 (Independence Day). The banner reads 'Bhinneka Tunggal Ika.'",
      id: "Lambang negara Indonesia. 17 helai bulu sayap, 8 ekor, dan 45 dada mewakili tanggal 17-8-45. Pita bertuliskan 'Bhinneka Tunggal Ika.'"
    }
  },
  {
    id: "indonesia-raya",
    room: "modern",
    section: "modern-symbols",
    shape: "book",
    color: "#c0392b",
    position: [2, 2],
    name: { en: "Indonesia Raya — National Anthem", id: "Indonesia Raya — Lagu Kebangsaan" },
    origin: { en: "W.R. Supratman", id: "W.R. Supratman" },
    era: { en: "First performed 28 Oct 1928", id: "Pertama 28 Okt 1928" },
    description: {
      en: "Composed by W.R. Supratman, first performed during the 1928 Youth Congress on violin because the Dutch banned its public performance. Supratman died at 35, never seeing the independent Indonesia his anthem inspired.",
      id: "Digubah oleh W.R. Supratman, pertama dimainkan dengan biola pada Kongres Pemuda 1928 karena Belanda melarangnya. Supratman meninggal usia 35 tahun."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 6: WARISAN BUDAYA — Section: UNESCO Intangible Heritage
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "wayang",
    room: "heritage",
    section: "heritage-intangible",
    shape: "texture",
    color: "#b07358",
    position: [-8, -4],
    name: { en: "Wayang Kulit (Shadow Puppets)", id: "Wayang Kulit" },
    origin: { en: "Java & Bali — UNESCO 2003", id: "Jawa & Bali — UNESCO 2003" },
    era: { en: "UNESCO 2003", id: "UNESCO 2003" },
    description: {
      en: "A single dalang (puppeteer) narrates, voices all characters, and cues the gamelan for up to 8 hours. Over 300 puppet characters exist in the Javanese tradition. Stories from Ramayana and Mahabharata.",
      id: "Seorang dalang menarasikan, menyuarakan semua karakter, dan memberi isyarat gamelan hingga 8 jam. Lebih dari 300 karakter wayang dalam tradisi Jawa."
    }
  },
  {
    id: "batik",
    room: "heritage",
    section: "heritage-intangible",
    shape: "wall",
    color: "#8e5a2e",
    position: [-10.85, -2],
    name: { en: "Batik — Wax-Resist Textile Art", id: "Batik — Seni Tekstil Canting Lilin" },
    origin: { en: "Java — UNESCO 2009", id: "Jawa — UNESCO 2009" },
    era: { en: "UNESCO 2009", id: "UNESCO 2009" },
    description: {
      en: "Each region has distinctive motifs: Solo's Parang, Yogyakarta's geometric patterns, Pekalongan's vibrant coastal designs. Fine batik tulis can take months. October 2 is National Batik Day.",
      id: "Setiap daerah memiliki motif khas. Proses batik tulis halus bisa memakan waktu berbulan-bulan. 2 Oktober adalah Hari Batik Nasional."
    }
  },
  {
    id: "angklung",
    room: "heritage",
    section: "heritage-intangible",
    shape: "texture",
    color: "#7a9a5a",
    position: [-6, -6],
    name: { en: "Angklung — Bamboo Music", id: "Angklung — Musik Bambu" },
    origin: { en: "Sundanese, West Java — UNESCO 2010", id: "Sunda, Jawa Barat — UNESCO 2010" },
    era: { en: "UNESCO 2010", id: "UNESCO 2010" },
    description: {
      en: "Each angklung plays one note, requiring an ensemble for melodies — inherently communal and cooperative. In ancient Sundanese kingdoms, angklung was used in rice harvesting ceremonies to honor Dewi Sri.",
      id: "Setiap angklung memainkan satu nada, memerlukan ansambel — secara inheren komunal dan kooperatif."
    }
  },
  {
    id: "gamelan",
    room: "heritage",
    section: "heritage-intangible",
    shape: "texture",
    color: "#c9a14a",
    position: [-4, -4],
    name: { en: "Gamelan Orchestra", id: "Orkestra Gamelan" },
    origin: { en: "Java & Bali — UNESCO 2021", id: "Jawa & Bali — UNESCO 2021" },
    era: { en: "UNESCO 2021", id: "UNESCO 2021" },
    description: {
      en: "Gamelan predates Hinduism in Indonesia. A full set can contain 75+ instruments and require 30+ musicians. The tuning systems (slendro and pelog) are unique — no two sets are tuned exactly alike.",
      id: "Gamelan mendahului Hinduisme di Indonesia. Sistem tuning (slendro dan pelog) unik — tidak ada dua set yang bernada persis sama."
    }
  },
  {
    id: "pencak-silat",
    room: "heritage",
    section: "heritage-intangible",
    shape: "texture",
    color: "#8a4a2a",
    position: [-2, -6],
    name: { en: "Pencak Silat", id: "Pencak Silat" },
    origin: { en: "Nusantara — UNESCO 2019", id: "Nusantara — UNESCO 2019" },
    era: { en: "UNESCO 2019", id: "UNESCO 2019" },
    description: {
      en: "The indigenous martial art with hundreds of styles. Became an official sport at the 2018 Asian Games in Jakarta-Palembang. Used by freedom fighters against colonial forces.",
      id: "Seni bela diri asli Nusantara dengan ratusan gaya. Menjadi cabang resmi Asian Games 2018 Jakarta-Palembang."
    }
  },
  {
    id: "tari-saman",
    room: "heritage",
    section: "heritage-intangible",
    shape: "texture",
    color: "#2a7a4a",
    position: [0, -4],
    name: { en: "Saman Dance (Aceh)", id: "Tari Saman (Aceh)" },
    origin: { en: "Gayo, Aceh — UNESCO 2011", id: "Gayo, Aceh — UNESCO 2011" },
    era: { en: "UNESCO 2011", id: "UNESCO 2011" },
    description: {
      en: "15-21 dancers sitting in a row create rhythm through body percussion alone: clapping, chest-slapping, thigh-hitting, and finger-snapping. Performances accelerate to incredible speeds.",
      id: "15-21 penari duduk berjajar menciptakan irama melalui perkusi tubuh saja. Pertunjukan berakselerasi hingga kecepatan luar biasa."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 6: WARISAN BUDAYA — Section: UNESCO World Heritage Sites
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "komodo-national-park",
    room: "heritage",
    section: "heritage-sites",
    shape: "wall",
    color: "#5a8a4a",
    position: [2, -4],
    name: { en: "Komodo National Park (UNESCO)", id: "Taman Nasional Komodo (UNESCO)" },
    origin: { en: "Flores, NTT", id: "Flores, NTT" },
    era: { en: "UNESCO 1991", id: "UNESCO 1991" },
    description: {
      en: "Home to the Komodo dragon — the world's largest living lizard (up to 3 meters, 70 kg). These apex predators exist nowhere else on Earth in the wild. Unknown to Western science until 1910.",
      id: "Rumah bagi Komodo — kadal terbesar di dunia (hingga 3 meter, 70 kg). Tidak diketahui ilmu pengetahuan Barat hingga 1910."
    }
  },
  {
    id: "lorentz-park",
    room: "heritage",
    section: "heritage-sites",
    shape: "wall",
    color: "#3a6a3a",
    position: [4, -6],
    name: { en: "Lorentz National Park — Papua", id: "Taman Nasional Lorentz — Papua" },
    origin: { en: "Papua, Indonesia", id: "Papua, Indonesia" },
    era: { en: "UNESCO 1999", id: "UNESCO 1999" },
    description: {
      en: "The largest protected area in Southeast Asia (2.35 million hectares). The only tropical area with a continuous transect from snowcapped Puncak Jaya (4,884 m) to tropical marine waters.",
      id: "Kawasan lindung terbesar di Asia Tenggara (2,35 juta hektar). Satu-satunya kawasan tropis dengan transek dari Puncak Jaya bersalju (4.884 m) ke laut tropis."
    }
  },
  {
    id: "subak-bali",
    room: "heritage",
    section: "heritage-sites",
    shape: "wall",
    color: "#4a8a5a",
    position: [6, -6],
    name: { en: "Subak Irrigation — Bali", id: "Sistem Irigasi Subak — Bali" },
    origin: { en: "Bali", id: "Bali" },
    era: { en: "UNESCO 2012", id: "UNESCO 2012" },
    description: {
      en: "A traditional cooperative water management system dating to the 9th century, reflecting the Balinese philosophy of Tri Hita Karana. About 1,200 subak institutions manage 20,000 hectares of rice paddies.",
      id: "Sistem pengelolaan air koperatif tradisional sejak abad ke-9, mencerminkan filosofi Bali Tri Hita Karana. Sekitar 1.200 lembaga subak mengelola 20.000 hektar sawah."
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // HALL 6: WARISAN BUDAYA — Section: Seni Tradisional & Kearifan Lokal
  // ═══════════════════════════════════════════════════════════════════
  {
    id: "tenun-ikat",
    room: "heritage",
    section: "heritage-arts",
    shape: "texture",
    color: "#8a5a3a",
    position: [8, -4],
    name: { en: "Tenun Ikat — Sumba Weaving", id: "Tenun Ikat — Tenunan Sumba" },
    origin: { en: "Sumba, NTT", id: "Sumba, NTT" },
    era: { en: "Ancient tradition", id: "Tradisi kuno" },
    description: {
      en: "The ikat technique requires extraordinary skill — a single cloth can take months. Sumbanese textiles serve as currency, bride-price, and ceremonial objects with motifs representing ancestors and spiritual power.",
      id: "Teknik ikat memerlukan keterampilan luar biasa — satu kain bisa memakan waktu berbulan-bulan. Tekstil Sumba berfungsi sebagai mata uang, mas kawin, dan benda seremonial."
    }
  },
  {
    id: "toraja-tongkonan",
    room: "heritage",
    section: "heritage-arts",
    shape: "wall",
    color: "#6a4a2a",
    position: [10.85, -2],
    name: { en: "Toraja Tongkonan & Ma'nene", id: "Tongkonan Toraja & Ma'nene" },
    origin: { en: "Tana Toraja, South Sulawesi", id: "Tana Toraja, Sulawesi Selatan" },
    era: { en: "Ancient tradition", id: "Tradisi kuno" },
    description: {
      en: "The Ma'nene ritual involves exhuming ancestors, re-dressing them, and parading them through the village — a unique expression of the belief that death is not the end of the relationship with loved ones.",
      id: "Ritual Ma'nene melibatkan penggalian jasad leluhur, memakaikan baju baru, dan mengarak mereka melalui desa."
    }
  },
  {
    id: "asmat-carving",
    room: "heritage",
    section: "heritage-arts",
    shape: "texture",
    color: "#4a3a2a",
    position: [8, 2],
    name: { en: "Asmat Wood Carving — Papua", id: "Ukiran Kayu Asmat — Papua" },
    origin: { en: "Asmat, Papua", id: "Asmat, Papua" },
    era: { en: "Ancient tradition", id: "Tradisi kuno" },
    description: {
      en: "Among the world's greatest woodcarvers. Their bisj poles reach 5-9 meters tall. Michael Rockefeller's 1961 disappearance while collecting Asmat art remains one of the 20th century's great mysteries.",
      id: "Termasuk pemahat kayu terhebat di dunia. Tiang bisj mereka mencapai 5-9 meter. Hilangnya Michael Rockefeller pada 1961 saat mengoleksi seni Asmat tetap menjadi misteri besar."
    }
  },
  {
    id: "noken-papua",
    room: "heritage",
    section: "heritage-arts",
    shape: "texture",
    color: "#7a5a4a",
    position: [6, 4],
    name: { en: "Noken Bag — Papua (UNESCO)", id: "Noken — Papua (UNESCO)" },
    origin: { en: "Papua — UNESCO 2012", id: "Papua — UNESCO 2012" },
    era: { en: "UNESCO 2012", id: "UNESCO 2012" },
    description: {
      en: "Hand-woven bags from tree bark fibers. UNESCO recognized them as Intangible Heritage in Need of Urgent Safeguarding. During elections, the 'Noken system' allows traditional community voting.",
      id: "Tas tenun tangan dari serat kulit kayu. UNESCO mengakuinya sebagai Warisan Takbenda yang Memerlukan Perlindungan Mendesak."
    }
  },
  {
    id: "tari-kecak",
    room: "heritage",
    section: "heritage-arts",
    shape: "texture",
    color: "#9a6a3a",
    position: [4, 2],
    name: { en: "Kecak Dance — Bali", id: "Tari Kecak — Bali" },
    origin: { en: "Bali", id: "Bali" },
    era: { en: "1930s (modern form)", id: "1930-an" },
    description: {
      en: "50-150 men rhythmically chant 'cak-cak-cak' while acting out the Ramayana — no musical instruments, only human voice. Typically performed at sunset at Uluwatu Temple overlooking the ocean.",
      id: "50-150 pria berirama 'cak-cak-cak' sambil memeragakan Ramayana — tanpa instrumen, hanya suara manusia. Biasanya di Pura Uluwatu saat senja."
    }
  },
];
