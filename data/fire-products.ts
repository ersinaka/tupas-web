import type { Localized, Product, Spec } from "./types";

const L = (tr: string, en: string): Localized => ({ tr, en });

const FIRE_CLASSES = {
  ABC: L("A (katı), B (sıvı), C (gaz)", "A (solids), B (liquids), C (gases)"),
  CO2: L("B (sıvı) ve elektrikli ekipman yangınları", "B (liquids) and fires involving electrical equipment"),
  FOAM: L("A (katı), B (sıvı)", "A (solids), B (liquids)"),
  WATER: L("A (katı)", "A (solids)"),
  D: L("D (yanıcı metaller)", "D (combustible metals)"),
};

const STORED_PRESSURE = L("Daimi basınçlı", "Stored pressure");

function extinguisherSpecs(agent: Localized, capacity: string, classes: Localized, operation = STORED_PRESSURE): Spec[] {
  return [
    { key: "agent", value: agent },
    { key: "capacity", value: L(capacity, capacity) },
    { key: "fireClasses", value: classes },
    { key: "operation", value: operation },
  ];
}

const POWDER = L("ABC kuru kimyevi toz", "ABC dry chemical powder");
const CO2 = L("Karbondioksit (CO2)", "Carbon dioxide (CO2)");
const FOAM = L("AFFF köpük solüsyonu", "AFFF foam solution");
const WATER = L("Su", "Water");

// TODO: doğrulanmalı — her model için TSE/TS 862 EN3 belge kapsamı ve söndürme etkinlik değerleri (ör. 43A 233B) belgeden kontrol edilmeli.
const IN_HOUSE_STANDARDS = ["TSE", "TS 862 EN3", "CE"];

const testedFeature = L(
  "Sevkiyat öncesi basınç, yorulma ve çökme testlerinden geçirilir",
  "Pressure, fatigue and collapse tested before shipping",
);
const madeFeature = L(
  "Yenibosna'daki kendi tesisimizde üretilir",
  "Manufactured in our own facility in Yenibosna",
);
const gaugeFeature = L(
  "Manometre ile basınç durumu kolayca kontrol edilir",
  "Pressure gauge for quick status checks",
);

const feats = (...items: Localized[]): Localized<string[]> => ({
  tr: items.map((i) => i.tr),
  en: items.map((i) => i.en),
});

function powderExtinguisher(kg: number, extra?: { uses: Localized }): Product {
  return {
    slug: `${kg}-kg-abc-kuru-kimyevi-tozlu-yangin-sondurme-cihazi`,
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "kuru-kimyevi-tozlu",
    inHouse: true,
    name: L(`${kg} kg ABC Kuru Kimyevi Tozlu Yangın Söndürme Cihazı`, `${kg} kg ABC Dry Powder Fire Extinguisher`),
    summary: L(
      `A, B ve C sınıfı yangınlara karşı çok amaçlı, ${kg} kg kapasiteli tozlu yangın tüpü.`,
      `Multi-purpose ${kg} kg powder extinguisher for Class A, B and C fires.`,
    ),
    description: {
      tr: [
        `${kg} kg ABC kuru kimyevi tozlu yangın söndürme cihazı; katı maddeler, yanıcı sıvılar ve gazların neden olduğu yangınlara karşı kullanılabilen çok amaçlı bir cihazdır.`,
        extra?.uses.tr ?? "İş yerleri, depolar, ortak alanlar ve araçlar gibi pek çok farklı ortamda temel yangın güvenliği ekipmanı olarak tercih edilir.",
      ],
      en: [
        `This ${kg} kg ABC dry powder extinguisher is a multi-purpose unit for fires involving solid materials, flammable liquids and gases.`,
        extra?.uses.en ?? "It is the go-to first-response extinguisher for workplaces, warehouses, common areas and vehicles.",
      ],
    },
    features: feats(madeFeature, testedFeature, gaugeFeature),
    specs: extinguisherSpecs(POWDER, `${kg} kg`, FIRE_CLASSES.ABC),
    standards: IN_HOUSE_STANDARDS,
  };
}

function co2Extinguisher(kg: number): Product {
  return {
    slug: `${kg}-kg-co2-gazli-yangin-sondurme-cihazi`,
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "co2",
    inHouse: true,
    name: L(`${kg} kg CO2 Gazlı Yangın Söndürme Cihazı`, `${kg} kg CO2 Fire Extinguisher`),
    summary: L(
      "Elektrik panoları ve hassas ekipman için iz bırakmayan karbondioksitli söndürücü.",
      "Residue-free carbon dioxide extinguisher for switchboards and sensitive equipment.",
    ),
    description: {
      tr: [
        `${kg} kg CO2 gazlı yangın söndürme cihazı, söndürme sonrasında kalıntı bırakmadığı için elektrik panoları, sunucu odaları, laboratuvarlar ve hassas cihazların bulunduğu alanlar için uygundur.`,
        "Karbondioksit oksijeni seyrelterek ve soğutarak söndürme yapar. Kapalı ve dar alanlarda kullanımdan sonra ortamın havalandırılması gerekir.",
      ],
      en: [
        `This ${kg} kg CO2 extinguisher leaves no residue, which makes it a good fit for switchboards, server rooms, laboratories and areas with sensitive equipment.`,
        "Carbon dioxide works by displacing oxygen and cooling the fire. Small enclosed spaces should be ventilated after use.",
      ],
    },
    features: feats(
      madeFeature,
      testedFeature,
      L("Söndürme sonrası kalıntı bırakmaz", "Leaves no residue after discharge"),
    ),
    specs: extinguisherSpecs(CO2, `${kg} kg`, FIRE_CLASSES.CO2, L("Gaz basınçlı (tüp içi)", "Self-pressurised")),
    standards: IN_HOUSE_STANDARDS,
  };
}

function foamExtinguisher(litre: number): Product {
  return {
    slug: `${litre}-lt-kopuklu-yangin-sondurme-cihazi`,
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "kopuklu",
    inHouse: true,
    name: L(`${litre} lt Köpüklü Yangın Söndürme Cihazı`, `${litre} L Foam Fire Extinguisher`),
    summary: L(
      "Yanıcı sıvıların bulunduğu alanlar için yüzeyi örterek yeniden tutuşmayı önleyen köpüklü cihaz.",
      "Foam extinguisher that blankets burning liquids and helps prevent re-ignition.",
    ),
    description: {
      tr: [
        `${litre} lt köpüklü yangın söndürme cihazı, yanan sıvının yüzeyini bir köpük tabakasıyla örterek oksijenle temasını keser ve yeniden tutuşma riskini azaltır.`,
        "Akaryakıt istasyonları, otoparklar, atölyeler ve boya-solvent depolanan alanlar için uygundur. Tozlu cihazlara göre daha az kirlilik bırakır.",
      ],
      en: [
        `This ${litre} L foam extinguisher smothers burning liquids under a foam blanket, cutting off oxygen and reducing the risk of re-ignition.`,
        "It suits fuel stations, car parks, workshops and paint or solvent stores, and leaves less mess than powder.",
      ],
    },
    features: feats(madeFeature, testedFeature, gaugeFeature),
    specs: extinguisherSpecs(FOAM, `${litre} lt`, FIRE_CLASSES.FOAM),
    standards: IN_HOUSE_STANDARDS,
  };
}

export const fireProducts: Product[] = [
  powderExtinguisher(1, {
    uses: L(
      "Kompakt boyutu sayesinde araçlarda, teknelerde ve mutfak dışındaki küçük alanlarda kolayca bulundurulur.",
      "Its compact size makes it easy to keep in cars, boats and other small spaces.",
    ),
  }),
  powderExtinguisher(2),
  powderExtinguisher(6),
  powderExtinguisher(12, {
    uses: L(
      "Yüksek kapasitesi sayesinde depo, atölye ve üretim alanları gibi yangın yükü yüksek mekânlarda tercih edilir.",
      "Its higher capacity makes it the preferred choice for warehouses, workshops and production areas with a higher fire load.",
    ),
  }),
  co2Extinguisher(2),
  co2Extinguisher(5),
  foamExtinguisher(6),
  foamExtinguisher(9),
  {
    slug: "9-lt-sulu-yangin-sondurme-cihazi",
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "sulu",
    inHouse: true,
    name: L("9 lt Sulu Yangın Söndürme Cihazı", "9 L Water Fire Extinguisher"),
    summary: L(
      "Kâğıt, ahşap ve tekstil gibi katı madde yangınları için soğutarak söndüren cihaz.",
      "Cools and extinguishes fires involving paper, wood and textiles.",
    ),
    description: {
      tr: [
        "Sulu yangın söndürme cihazı, A sınıfı (katı madde) yangınlarda yanan malzemeyi soğutarak etkili sonuç verir. Okullar, ofisler ve konaklama tesisleri gibi katı yanıcıların yoğun olduğu yerler için uygundur.",
        "Elektrikli ekipman ve yanıcı sıvı yangınlarında kullanılmamalıdır.",
      ],
      en: [
        "Water extinguishers are effective on Class A fires by cooling the burning material. They suit schools, offices and hotels where solid combustibles dominate.",
        "They must not be used on electrical equipment or flammable liquid fires.",
      ],
    },
    features: feats(madeFeature, testedFeature, gaugeFeature),
    specs: extinguisherSpecs(WATER, "9 lt", FIRE_CLASSES.WATER),
    standards: IN_HOUSE_STANDARDS,
  },
  {
    slug: "halokarbon-gazli-yangin-sondurme-cihazi",
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "halokarbon",
    name: L("Halokarbon Gazlı Yangın Söndürme Cihazı", "Halocarbon Clean Agent Extinguisher"),
    summary: L(
      "Elektronik ve değerli ekipmanın bulunduğu alanlar için temiz gazlı söndürücü.",
      "Clean agent extinguisher for areas with electronics and valuable equipment.",
    ),
    description: {
      tr: [
        "Halokarbon gazlı cihazlar, iletken olmayan ve kalıntı bırakmayan temiz bir söndürücü madde kullanır. Bilgi işlem odaları, kontrol odaları, arşivler ve müzeler gibi su veya tozun zarar verebileceği alanlar için uygundur.",
        "Kapasite ve gaz tipi seçenekleri için lütfen teklif isteyin.",
      ],
      en: [
        "Halocarbon extinguishers use a clean, non-conductive agent that leaves no residue. They suit IT rooms, control rooms, archives and museums where water or powder could cause damage.",
        "Please request a quote for available capacities and agent types.",
      ],
    },
    // TODO: doğrulanmalı — gaz tipi (ör. FE-36), kapasiteler ve belge bilgisi.
    specs: [
      { key: "agent", value: L("Halokarbon temiz gaz", "Halocarbon clean agent") },
      { key: "use", value: L("Elektronik ve hassas ekipman bulunan alanlar", "Areas with electronics and sensitive equipment") },
    ],
  },
  {
    slug: "metal-tozlu-yangin-sondurme-cihazi",
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "metal-tozlu",
    name: L("Metal Tozlu (D Sınıfı) Yangın Söndürme Cihazı", "Class D Metal Powder Extinguisher"),
    summary: L(
      "Magnezyum, alüminyum talaşı ve lityum gibi yanıcı metal yangınları için özel tozlu cihaz.",
      "Special powder extinguisher for combustible metals such as magnesium, aluminium swarf and lithium.",
    ),
    description: {
      tr: [
        "Yanıcı metal yangınları, standart söndürücülerle kontrol altına alınamaz ve su ile tehlikeli tepkimeler verebilir. Metal tozlu cihazlar bu tür yangınlar için özel olarak geliştirilmiş söndürme tozu içerir.",
        "Metal işleme atölyeleri, döküm tesisleri ve laboratuvarlar için uygundur.",
      ],
      en: [
        "Combustible metal fires cannot be controlled with standard extinguishers and may react dangerously with water. Class D extinguishers contain a powder developed specifically for these fires.",
        "They suit metalworking shops, foundries and laboratories.",
      ],
    },
    // TODO: doğrulanmalı — toz tipi, kapasite seçenekleri ve belge bilgisi.
    specs: [
      { key: "agent", value: L("D sınıfı metal yangın tozu", "Class D metal fire powder") },
      { key: "fireClasses", value: FIRE_CLASSES.D },
    ],
  },
  {
    slug: "50-kg-abc-kuru-kimyevi-tozlu-tekerlekli-yangin-sondurme-cihazi",
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "romorklu",
    name: L("50 kg ABC Tozlu Tekerlekli Yangın Söndürme Cihazı", "50 kg ABC Wheeled Powder Extinguisher"),
    summary: L(
      "Geniş alanlar ve yüksek yangın yükü için tekerlekli, yüksek kapasiteli tozlu söndürücü.",
      "High-capacity wheeled powder extinguisher for large areas and high fire loads.",
    ),
    description: {
      tr: [
        "Tekerlekli yangın söndürme cihazları, taşınabilir tüplerin yetersiz kalabileceği akaryakıt istasyonu, depo, şantiye ve fabrika sahaları için tasarlanmıştır.",
        "Uzun hortumu sayesinde güvenli mesafeden müdahale yapılabilir.",
      ],
      en: [
        "Wheeled extinguishers are designed for fuel stations, warehouses, construction sites and factory yards where portable units may not be enough.",
        "The long hose allows operators to work from a safe distance.",
      ],
    },
    // TODO: doğrulanmalı — tekerlekli/römorklu modellerin kendi üretim olup olmadığı ve belge kapsamı.
    specs: [
      { key: "agent", value: POWDER },
      { key: "capacity", value: L("50 kg", "50 kg") },
      { key: "fireClasses", value: FIRE_CLASSES.ABC },
    ],
  },
  {
    slug: "250-kg-abc-kuru-kimyevi-tozlu-romorklu-yangin-sondurme-cihazi",
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "romorklu",
    name: L("250 kg ABC Tozlu Römorklu Yangın Söndürme Cihazı", "250 kg ABC Trailer-Mounted Powder Unit"),
    summary: L(
      "Rafineri, liman ve büyük depolama sahaları için römorklu, çok yüksek kapasiteli söndürme ünitesi.",
      "Very high-capacity trailer-mounted unit for refineries, ports and large storage yards.",
    ),
    description: {
      tr: [
        "Römorklu yangın söndürme cihazı, araçla çekilerek sahanın farklı noktalarına hızla taşınabilir. Büyük miktarda söndürme tozunu uzun süre boyunca kullanma imkânı verir.",
      ],
      en: [
        "The trailer-mounted unit can be towed quickly to any point on site and delivers a large quantity of powder over a sustained period.",
      ],
    },
    // TODO: doğrulanmalı — teknik değerler ve belge kapsamı.
    specs: [
      { key: "agent", value: POWDER },
      { key: "capacity", value: L("250 kg", "250 kg") },
      { key: "fireClasses", value: FIRE_CLASSES.ABC },
    ],
  },
  {
    slug: "6-kg-abc-nikelaj-kaplama-yangin-sondurme-cihazi",
    line: "fire",
    category: "yangin-sondurme-cihazlari",
    subtype: "nikelaj-kaplama",
    inHouse: true,
    name: L("6 kg ABC Nikelaj Kaplama Yangın Söndürme Cihazı", "6 kg ABC Chrome-Plated Fire Extinguisher"),
    summary: L(
      "Otel lobisi, mağaza ve ofis gibi görünürlüğün önemli olduğu mekânlar için parlak kaplamalı tozlu cihaz.",
      "Chrome-finish powder extinguisher for hotel lobbies, shops and offices where appearance matters.",
    ),
    description: {
      tr: [
        "Nikelaj kaplama yangın söndürme cihazı, standart ABC tozlu cihazın söndürme kabiliyetini dekoratif bir gövdeyle birleştirir. İç mimarisi özenle tasarlanmış mekânlarda güvenlikten ödün vermeden estetik bütünlüğü korur.",
      ],
      en: [
        "The chrome-plated extinguisher combines the performance of a standard ABC powder unit with a decorative body, keeping interiors tidy without compromising on safety.",
      ],
    },
    features: feats(madeFeature, testedFeature, gaugeFeature),
    specs: [
      ...extinguisherSpecs(POWDER, "6 kg", FIRE_CLASSES.ABC),
      { key: "body", value: L("Nikelaj kaplama", "Chrome-plated") },
    ],
    // TODO: doğrulanmalı — nikelaj modelin belge kapsamı.
    standards: ["TSE"],
  },

  // Yangın dolapları
  {
    slug: "sulu-sistem-yangin-dolabi",
    line: "fire",
    category: "yangin-dolaplari",
    subtype: "sulu-sistem",
    name: L("Sulu Sistem Yangın Dolabı", "Wet Riser Fire Hose Cabinet"),
    summary: L(
      "Hortum makarası, vana ve yangın tüpü bölmeli; şebekeye bağlı, her an kullanıma hazır dolap.",
      "Cabinet connected to the water supply, with reel, valve and extinguisher compartment — always ready.",
    ),
    description: {
      tr: [
        "Sulu sistem yangın dolabı, sürekli basınçlı su hattına bağlıdır; vana açıldığında hortumdan anında su alınır. Bina içinde ilk müdahalenin temel ekipmanıdır.",
        "Sıva altı, sıva üstü ve yarı gömme montaj seçenekleri bulunur. Hortum uzunluğu ve dolap ölçüsü proje gereksinimine göre belirlenir.",
      ],
      en: [
        "A wet riser cabinet is connected to a permanently pressurised water main, so water flows from the hose the moment the valve opens. It is the core first-response equipment inside a building.",
        "Recessed, surface-mounted and semi-recessed versions are available. Hose length and cabinet size are set to suit the project.",
      ],
    },
    specs: [
      { key: "type", value: L("Sulu sistem", "Wet riser") },
      { key: "scope", value: L("Hortum makarası, vana, lans; isteğe bağlı tüp bölmesi", "Hose reel, valve, branch; optional extinguisher compartment") },
    ],
  },
  {
    slug: "kuru-sistem-yangin-dolabi",
    line: "fire",
    category: "yangin-dolaplari",
    subtype: "kuru-sistem",
    name: L("Kuru Sistem Yangın Dolabı", "Dry Riser Fire Hose Cabinet"),
    summary: L(
      "Su beslemesi itfaiye bağlantısı üzerinden yapılan, yassı hortumlu yangın dolabı.",
      "Hose cabinet with lay-flat hose, supplied with water through the fire brigade inlet.",
    ),
    description: {
      tr: [
        "Kuru sistem yangın dolaplarında hat normalde boştur; yangın anında su, itfaiye bağlantı ağzı üzerinden sisteme verilir. Su deposu veya basınçlı hat bulunmayan yapılar için kullanılır.",
      ],
      en: [
        "In a dry riser system the pipework is normally empty; during a fire, water is pumped in through the fire brigade inlet. It is used in buildings without a tank or pressurised main.",
      ],
    },
    specs: [
      { key: "type", value: L("Kuru sistem", "Dry riser") },
      { key: "scope", value: L("Yassı hortum, lans, vana", "Lay-flat hose, branch, valve") },
    ],
  },
  {
    slug: "yangin-tupu-kabini",
    line: "fire",
    category: "yangin-dolaplari",
    subtype: "kabin-ve-dolap",
    name: L("Yangın Tüpü Kabini", "Fire Extinguisher Cabinet"),
    summary: L(
      "Yangın tüpünü toz, darbe ve yetkisiz kullanıma karşı koruyan metal kabin.",
      "Metal cabinet that protects extinguishers from dust, impact and tampering.",
    ),
    description: {
      tr: [
        "Yangın tüpü kabini, cihazı dış etkenlerden korurken görünür ve hızla erişilebilir tutar. Otopark, koridor ve dış mekân gibi alanlarda tüplerin ömrünü uzatır.",
      ],
      en: [
        "An extinguisher cabinet shields the unit from the environment while keeping it visible and quick to reach. It extends extinguisher life in car parks, corridors and outdoor areas.",
      ],
    },
  },
  {
    slug: "yangin-malzeme-dolabi",
    line: "fire",
    category: "yangin-dolaplari",
    subtype: "kabin-ve-dolap",
    name: L("Yangın Malzeme Dolabı", "Fire Equipment Locker"),
    summary: L(
      "Balta, kürek, kova ve kişisel koruyucu ekipmanı bir arada tutan yangın malzeme dolabı.",
      "Locker that keeps axes, shovels, buckets and protective gear together.",
    ),
    description: {
      tr: [
        "Yangın malzeme dolabı, acil durum ekiplerinin ihtiyaç duyacağı el aletlerini ve koruyucu donanımı düzenli ve ulaşılabilir biçimde saklar. Fabrika, şantiye ve büyük işletmelerde acil durum istasyonu olarak kullanılır.",
      ],
      en: [
        "A fire equipment locker keeps the hand tools and protective gear an emergency team needs organised and within reach. Factories, construction sites and large businesses use it as an emergency station.",
      ],
    },
  },
  {
    slug: "plastik-yangin-tupu-kabini",
    line: "fire",
    category: "yangin-dolaplari",
    subtype: "kabin-ve-dolap",
    name: L("Plastik Yangın Tüpü Kabini", "Plastic Extinguisher Cabinet"),
    summary: L(
      "Nemli ve korozif ortamlarda paslanma sorunu yaşamayan hafif plastik tüp kabini.",
      "Lightweight plastic housing that will not rust in damp or corrosive environments.",
    ),
    description: {
      tr: [
        "Plastik yangın tüpü kabinleri; liman, tersane, havuz çevresi ve kimyasal tesis gibi nemli ya da korozif ortamlarda metal kabinlere hafif ve paslanmaz bir alternatif sunar.",
      ],
      en: [
        "Plastic extinguisher cabinets are a light, rust-free alternative to metal cabinets in damp or corrosive locations such as ports, shipyards, pool areas and chemical plants.",
      ],
    },
  },

  // Hortum makaraları
  {
    slug: "duvar-tipi-sabit-yangin-hortum-makarasi",
    line: "fire",
    category: "hortum-makaralari",
    subtype: "duvar-tipi",
    name: L("Duvar Tipi Sabit Yangın Hortum Makarası", "Fixed Wall-Mounted Hose Reel"),
    summary: L("Dolap içine veya doğrudan duvara monte edilen sabit hortum makarası.", "Fixed hose reel for cabinet or direct wall mounting."),
    description: {
      tr: ["Sabit makaralar, yarı sert hortumun düzenli sarılmasını ve hızla açılmasını sağlar. Yangın dolaplarının standart bileşenidir."],
      en: ["Fixed reels keep semi-rigid hose neatly wound and ready to pay out fast. They are a standard component of hose cabinets."],
    },
  },
  {
    slug: "duvar-tipi-hareketli-yangin-hortum-makarasi",
    line: "fire",
    category: "hortum-makaralari",
    subtype: "duvar-tipi",
    name: L("Duvar Tipi Hareketli Yangın Hortum Makarası", "Swing-Out Wall-Mounted Hose Reel"),
    summary: L("Dönebilen gövdesiyle hortumun farklı yönlere rahatça çekilmesini sağlayan makara.", "Pivoting reel that lets the hose be pulled in different directions."),
    description: {
      tr: ["Hareketli makaralar, dolaptan dışarı doğru dönebilir; böylece hortum köşe ve koridorlarda dönerek ilerlerken kıvrılmaz."],
      en: ["Swing-out reels pivot out of the cabinet so the hose can turn corners and run along corridors without kinking."],
    },
  },
  {
    slug: "yangin-hortum-makara-arabasi",
    line: "fire",
    category: "hortum-makaralari",
    subtype: "makara-arabasi",
    name: L("Yangın Hortum Makara Arabası", "Fire Hose Reel Cart"),
    summary: L("Kauçuk hortumlu, tekerlekli ve taşınabilir yangın hortum makarası.", "Wheeled, portable reel with rubber hose."),
    description: {
      tr: ["Makara arabaları, geniş açık alanlarda hortumu hidrant veya vanaya kadar hızla taşımak için kullanılır. Fabrika sahaları, şantiyeler ve lojistik merkezleri için uygundur."],
      en: ["Reel carts are used to bring hose quickly to a hydrant or valve across large open areas. They suit factory yards, construction sites and logistics centres."],
    },
    // TODO: doğrulanmalı — eski katalogda 60 m kauçuk hortumlu modeller vardı; güncel hortum çapı/uzunluk seçenekleri.
    specs: [{ key: "length", value: L("Seçeneğe göre (ör. 40–60 m)", "Depending on option (e.g. 40–60 m)") }],
  },

  // Yangın hortumları
  {
    slug: "yari-sert-yangin-dolabi-hortumu",
    line: "fire",
    category: "yangin-hortumlari",
    subtype: "yari-sert",
    name: L("Yarı Sert Yangın Dolabı Hortumu", "Semi-Rigid Hose Reel Hose"),
    summary: L("Makarada şeklini koruyan, tamamen açılmadan su verebilen dolap hortumu.", "Holds its shape on the reel and delivers water before fully unrolled."),
    description: {
      tr: ["Yarı sert hortumlar, yangın dolabı makaralarında kullanılır. Kesiti yuvarlak kaldığı için hortumun tamamı açılmadan da su akışı sağlanır."],
      en: ["Semi-rigid hoses are used on hose cabinet reels. Their round cross-section allows water to flow before the whole length is unrolled."],
    },
  },
  {
    slug: "kaucuk-astarli-beyaz-yangin-hortumu",
    line: "fire",
    category: "yangin-hortumlari",
    subtype: "yassi",
    name: L("Kauçuk Astarlı Beyaz Yangın Hortumu", "Rubber-Lined White Fire Hose"),
    summary: L("İçi kauçuk astarlı, dışı tekstil örgülü yassı yangın hortumu.", "Lay-flat fire hose with rubber lining and textile jacket."),
    description: {
      tr: ["Bina içi kuru sistem dolapları ve genel amaçlı kullanım için uygun, hafif ve kolay katlanabilen yassı hortum."],
      en: ["A light, easy-to-fold lay-flat hose for dry riser cabinets and general use."],
    },
  },
  {
    slug: "poliuretan-kapli-kirmizi-yangin-hortumu",
    line: "fire",
    category: "yangin-hortumlari",
    subtype: "yassi",
    name: L("Poliüretan Kaplı Kırmızı Yangın Hortumu", "Polyurethane-Coated Red Fire Hose"),
    summary: L("Dış yüzeyi poliüretan kaplı, aşınmaya karşı dayanıklı yassı hortum.", "Lay-flat hose with abrasion-resistant polyurethane coating."),
    description: {
      tr: ["Dış kaplaması sayesinde sürtünme, kir ve nem emilimine karşı daha dayanıklıdır; dış mekân ve itfaiye kullanımında tercih edilir."],
      en: ["Its outer coating resists abrasion, dirt and water absorption, making it a good choice outdoors and for fire brigade use."],
    },
  },
  {
    slug: "kaucuk-kapli-kirmizi-yangin-hortumu",
    line: "fire",
    category: "yangin-hortumlari",
    subtype: "yassi",
    name: L("İçi ve Dışı Kauçuk Kaplı Yangın Hortumu", "Rubber-Covered Fire Hose"),
    summary: L("İç ve dış yüzeyi kauçuk kaplı, zorlu koşullar için ağır hizmet hortumu.", "Heavy-duty hose with rubber lining and rubber cover."),
    description: {
      tr: ["Kimyasal, yağ ve yüksek aşınma riski olan endüstriyel alanlarda uzun ömürlü kullanım için tasarlanmıştır."],
      en: ["Designed for long service life in industrial areas exposed to chemicals, oil and heavy abrasion."],
    },
  },

  // Mobil köpük
  {
    slug: "120-lt-mobil-kopuk-unitesi",
    line: "fire",
    category: "mobil-kopuk-uniteleri",
    name: L("120 lt Mobil Köpük Ünitesi", "120 L Mobile Foam Unit"),
    summary: L("Tekerlekli, 120 litre köpük konsantresi kapasiteli taşınabilir ünite.", "Wheeled portable unit holding 120 L of foam concentrate."),
    description: {
      tr: ["Hidrant veya yangın vanasına bağlanarak köpük üretir. Akaryakıt depolama, dolum ve kimyasal tesislerde hızlı müdahale için kullanılır."],
      en: ["Connects to a hydrant or fire valve to produce foam. Used for rapid response at fuel storage, filling and chemical facilities."],
    },
    specs: [{ key: "capacity", value: L("120 lt köpük konsantresi", "120 L foam concentrate") }],
  },
  {
    slug: "romorklu-kopuk-ve-su-topu",
    line: "fire",
    category: "mobil-kopuk-uniteleri",
    name: L("Römorklu Köpük ve Su Topu", "Trailer-Mounted Foam and Water Monitor"),
    summary: L("Büyük yangın risklerine uzak mesafeden müdahale için römorklu monitör.", "Trailer-mounted monitor for tackling large fires from a distance."),
    description: {
      tr: ["Römorklu köpük topu, yüksek debide köpük veya su atarak tank sahaları ve büyük depolama alanlarında güvenli mesafeden müdahale imkânı verir."],
      en: ["The trailer-mounted monitor discharges foam or water at high flow, allowing safe-distance attack at tank farms and large storage areas."],
    },
    // TODO: doğrulanmalı — eski sitede 1200 lt/dk modeli listeleniyordu.
    specs: [{ key: "capacity", value: L("Model seçeneğine göre (ör. 1200 lt/dk)", "Depending on model (e.g. 1200 L/min)") }],
  },

  // Hidrant
  {
    slug: "yerustu-yangin-hidranti",
    line: "fire",
    category: "hidrant-sistemleri",
    name: L("Yerüstü Yangın Hidrantı", "Above-Ground Fire Hydrant"),
    summary: L("İtfaiye ve tesis ekipleri için bina dışında su alma noktası.", "External water take-off point for fire brigades and site teams."),
    description: {
      tr: ["Yerüstü hidrantlar, hidrant hattına bağlanarak hortum bağlantısı için kolay erişilebilir çıkışlar sunar. Fabrika, site ve lojistik alanlarında çevre yangın güvenliğinin temelini oluşturur."],
      en: ["Above-ground hydrants connect to the hydrant main and provide easily accessible hose outlets. They form the backbone of perimeter fire protection on factory, residential and logistics sites."],
    },
  },
  {
    slug: "yangin-hidrant-sistemi",
    line: "fire",
    category: "hidrant-sistemleri",
    name: L("Yangın Hidrant Sistemi Kurulumu", "Fire Hydrant System Installation"),
    summary: L("Hat, vana, hidrant ve hortum dolaplarından oluşan anahtar teslim sistem.", "Turnkey system of mains, valves, hydrants and hose houses."),
    description: {
      tr: ["Keşif ile başlayan süreçte hidrant yerleşimi, hat güzergâhı ve ekipman seçimini belirleyip kurulumu tamamlıyoruz. Devreye alma sonrası periyodik bakım planı oluşturuyoruz."],
      en: ["Starting with a site survey, we plan hydrant positions, pipe routes and equipment, then complete the installation and set up a periodic maintenance plan after commissioning."],
    },
  },

  // İtfaiye malzemeleri
  {
    slug: "kopuk-lansi",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "kopuk-ekipmani",
    name: L("Köpük Lansı", "Foam Branch Pipe"),
    summary: L("Köpük solüsyonunu havalandırarak genleşmiş köpük üreten lans.", "Branch that aerates foam solution to produce expanded foam."),
    description: {
      tr: ["Köpük lansı, melanjörden gelen solüsyonu hava ile karıştırarak yanıcı sıvı yüzeyini örtecek köpüğü oluşturur."],
      en: ["A foam branch mixes the solution from the inductor with air to produce the foam that blankets a burning liquid."],
    },
  },
  {
    slug: "kopuk-melanjoru",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "kopuk-ekipmani",
    name: L("Köpük Melanjörü (Köpük Mikseri)", "Foam Inductor"),
    summary: L("Köpük konsantresini su hattına belirli oranda karıştıran ekipman.", "Mixes foam concentrate into the water line at a set ratio."),
    description: {
      tr: ["Melanjör, hortum hattı üzerine takılarak köpük konsantresini emer ve suya karıştırır. Doğru karışım oranı köpüğün etkinliği için kritiktir."],
      en: ["Fitted in the hose line, the inductor draws foam concentrate and mixes it into the water. The correct mix ratio is critical to foam performance."],
    },
  },
  {
    slug: "afff-yangin-sondurme-kopugu",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "kopuk-ekipmani",
    name: L("AFFF Yangın Söndürme Köpüğü", "AFFF Firefighting Foam Concentrate"),
    summary: L("B sınıfı yangınlar için film oluşturan köpük konsantresi.", "Film-forming foam concentrate for Class B fires."),
    description: {
      tr: ["AFFF köpük konsantresi, yanıcı sıvı yüzeyinde ince bir film tabakası oluşturarak buhar çıkışını sınırlar. Polar çözücüler için AR (alkole dayanıklı) tipleri kullanılır."],
      en: ["AFFF concentrate forms a thin film on the surface of flammable liquids, limiting vapour release. Alcohol-resistant (AR) grades are used for polar solvents."],
    },
    // TODO: doğrulanmalı — karışım oranları (%1 / %3 / %6) ve ambalaj seçenekleri.
  },
  {
    slug: "yangin-hortum-nozulu",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "lans-ve-nozul",
    name: L("Yangın Hortum Nozulu", "Fire Hose Nozzle"),
    summary: L("Hüzme ve sis arasında ayarlanabilen, kapama vanalı nozul.", "Shut-off nozzle adjustable between jet and spray."),
    description: {
      tr: ["Ayarlanabilir nozullar, uzak mesafe için düz hüzme ve soğutma ile koruma için sis püskürtme arasında geçiş yapılmasını sağlar."],
      en: ["Adjustable nozzles switch between a straight jet for reach and a fog pattern for cooling and protection."],
    },
  },
  {
    slug: "yangin-rakoru",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "baglanti-elemanlari",
    name: L("Yangın Rakoru", "Fire Hose Coupling"),
    summary: L("Hortum, vana ve ekipmanları birbirine bağlayan hızlı bağlantı elemanı.", "Quick coupling that joins hoses, valves and equipment."),
    description: {
      tr: ["Rakorlar, hortumların vana, hidrant ve lanslara hızlıca bağlanmasını sağlar. Mevcut sisteminizle uyumlu tip ve çapı birlikte belirleriz."],
      en: ["Couplings connect hoses quickly to valves, hydrants and branches. We help you choose the type and size that matches your existing system."],
    },
  },
  {
    slug: "siyam-ikizi-itfaiye-baglanti-agzi",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "baglanti-elemanlari",
    name: L("Siyam İkizi İtfaiye Bağlantı Ağzı", "Siamese Fire Brigade Inlet"),
    summary: L("İtfaiyenin bina yangın tesisatına dışarıdan su basmasını sağlayan bağlantı.", "Inlet that lets the fire brigade pump water into the building's system."),
    description: {
      tr: ["Siyam ikizi, bina cephesine monte edilir ve itfaiye araçlarının kuru veya sulu sisteme dışarıdan su vermesini sağlar."],
      en: ["Mounted on the building facade, the Siamese inlet lets fire appliances feed water into dry or wet riser systems from outside."],
    },
  },
  {
    slug: "yangin-vanasi",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "baglanti-elemanlari",
    name: L("Yangın Vanası", "Fire Valve"),
    summary: L("Yangın dolabı ve hidrant hatlarında suyu kontrol eden vana.", "Valve controlling water in hose cabinet and hydrant lines."),
    description: {
      tr: ["Yangın vanaları, dolap ve hidrant hatlarında su akışını açıp kapatmak için kullanılır. Kolay kullanım ve sızdırmazlık önceliklidir."],
      en: ["Fire valves open and close water flow in cabinet and hydrant lines, with an emphasis on ease of use and leak-tightness."],
    },
  },
  {
    slug: "dagitici-fikrasyon",
    line: "fire",
    category: "itfaiye-malzemeleri",
    subtype: "baglanti-elemanlari",
    name: L("Dağıtıcı (Fıkrasyon)", "Dividing Breeching"),
    summary: L("Tek hattan gelen suyu birden fazla hortuma ayıran dağıtıcı.", "Splits one supply line into multiple hose lines."),
    description: {
      tr: ["Dağıtıcılar, ana hattan gelen suyu iki veya üç hortuma bölerek aynı anda farklı noktalara müdahale edilmesini sağlar."],
      en: ["A dividing breeching splits the main supply into two or three hose lines so crews can attack from several points at once."],
    },
  },

  // Algılama
  {
    slug: "adresli-yangin-algilama-sistemi",
    line: "fire",
    category: "yangin-algilama-sistemleri",
    subtype: "adresli",
    name: L("Adresli Yangın Algılama Sistemi", "Addressable Fire Detection System"),
    summary: L("Her dedektörün yerini ayrı ayrı bildiren, büyük yapılar için algılama sistemi.", "Detection system that identifies each device individually, for larger buildings."),
    description: {
      tr: [
        "Adresli sistemlerde her dedektör ve buton panele kendi adresiyle bağlanır; alarm geldiğinde tam konum panelde görünür. Hastane, otel, AVM ve çok katlı ofis binaları için uygundur.",
        "Projelendirme, kablolama, cihaz montajı, devreye alma ve periyodik bakımı birlikte sunuyoruz.",
      ],
      en: [
        "In an addressable system every detector and call point reports to the panel with its own address, so the exact location of an alarm is shown. It suits hospitals, hotels, shopping centres and multi-storey offices.",
        "We cover design, cabling, device installation, commissioning and periodic maintenance.",
      ],
    },
    specs: [{ key: "scope", value: L("Panel, dedektörler, ihbar butonları, siren/flaşörler", "Panel, detectors, call points, sounders/beacons") }],
  },
  {
    slug: "konvansiyonel-yangin-algilama-sistemi",
    line: "fire",
    category: "yangin-algilama-sistemleri",
    subtype: "konvansiyonel",
    name: L("Konvansiyonel Yangın Algılama Sistemi", "Conventional Fire Detection System"),
    summary: L("Alarmı bölge bazında bildiren, küçük ve orta ölçekli işletmeler için ekonomik sistem.", "Cost-effective zone-based system for small and mid-sized premises."),
    description: {
      tr: [
        "Konvansiyonel sistemlerde dedektörler bölgelere ayrılır; alarm, ilgili bölge üzerinden bildirilir. Mağaza, restoran, küçük ofis ve atölyeler için ekonomik ve güvenilir bir çözümdür.",
      ],
      en: [
        "Conventional systems group detectors into zones, and alarms are reported by zone. It is an economical, reliable solution for shops, restaurants, small offices and workshops.",
      ],
    },
    specs: [{ key: "scope", value: L("Panel, dedektörler, ihbar butonları, siren", "Panel, detectors, call points, sounders") }],
  },

  // Söndürme sistemleri
  {
    slug: "fm200-gazli-sondurme-sistemi",
    line: "fire",
    category: "sondurme-sistemleri",
    subtype: "gazli",
    name: L("FM200 Gazlı Söndürme Sistemi", "FM200 Clean Agent Suppression System"),
    summary: L("Sunucu odası, arşiv ve kontrol odaları için ekipmana zarar vermeyen gazlı söndürme.", "Equipment-safe gas suppression for server rooms, archives and control rooms."),
    description: {
      tr: [
        "FM200 gazlı söndürme sistemi, korunan hacmi kısa sürede söndürücü gazla doldurarak yangını bastırır. Gaz elektriği iletmez ve kalıntı bırakmaz; bu nedenle veri merkezleri ve elektronik ekipman içeren odalar için yaygın olarak tercih edilir.",
        "Sistem; algılama, kontrol paneli, gaz tüpleri, boru hattı ve nozullardan oluşur. Gaz miktarı hacim hesabına göre belirlenir ve odanın sızdırmazlığı sistemin etkinliği için önemlidir.",
      ],
      en: [
        "An FM200 system suppresses fire by rapidly filling the protected room with clean agent. The gas is non-conductive and leaves no residue, which is why it is widely used for data centres and rooms full of electronics.",
        "The system includes detection, a control panel, agent cylinders, pipework and nozzles. The agent quantity is calculated from the room volume, and room integrity is important for performance.",
      ],
    },
    specs: [
      { key: "agent", value: L("HFC-227ea (FM200)", "HFC-227ea (FM200)") },
      { key: "use", value: L("Sunucu ve elektrik odaları, arşivler, kontrol odaları", "Server and electrical rooms, archives, control rooms") },
    ],
  },
  {
    slug: "su-sisi-sondurme-sistemi",
    line: "fire",
    category: "sondurme-sistemleri",
    subtype: "su-sisi",
    name: L("Su Sisi Söndürme Sistemi", "Water Mist Suppression System"),
    summary: L("Çok ince su damlacıklarıyla az su kullanarak soğutan ve söndüren sistem.", "Fine droplets cool and suppress fire using little water."),
    description: {
      tr: ["Su sisi sistemleri, suyu çok küçük damlacıklara ayırarak geniş bir yüzey alanında hızlı soğutma sağlar. Geleneksel sprinklere göre daha az su kullanır ve su hasarını sınırlar."],
      en: ["Water mist systems break water into very fine droplets, cooling a large surface area quickly. They use less water than conventional sprinklers and limit water damage."],
    },
  },
  {
    slug: "sprinkler-sistemi",
    line: "fire",
    category: "sondurme-sistemleri",
    subtype: "sprinkler",
    name: L("Sprinkler (Yağmurlama) Sistemi", "Sprinkler System"),
    summary: L("Isıyla açılan başlıklarla yalnızca yangın bölgesine su veren otomatik sistem.", "Heat-activated heads discharge water only where the fire is."),
    description: {
      tr: ["Sprinkler başlıkları belirli bir sıcaklıkta tek tek açılır; böylece yalnızca yangının olduğu bölgeye su verilir. Otel, AVM, depo ve otopark gibi alanlarda yaygın kullanılır."],
      en: ["Sprinkler heads open individually at a set temperature, so water is discharged only over the fire. They are common in hotels, shopping centres, warehouses and car parks."],
    },
  },
  {
    slug: "tozlu-sondurme-sistemi",
    line: "fire",
    category: "sondurme-sistemleri",
    subtype: "tozlu",
    name: L("Tozlu Otomatik Söndürme Sistemi", "Automatic Powder Suppression System"),
    summary: L("Jeneratör, kazan dairesi ve makine odaları için otomatik tozlu sistem.", "Automatic powder system for generator, boiler and plant rooms."),
    description: {
      tr: ["Tozlu otomatik söndürme sistemleri, insan bulunmayan teknik hacimlerde yangını algılayarak kuru kimyevi toz ile söndürme yapar."],
      en: ["Automatic powder systems detect and suppress fire with dry chemical powder in unoccupied technical spaces."],
    },
  },
  {
    slug: "davlumbaz-sondurme-sistemi",
    line: "fire",
    category: "sondurme-sistemleri",
    subtype: "davlumbaz",
    name: L("Davlumbaz Söndürme Sistemi", "Kitchen Hood Suppression System"),
    summary: L("Ticari mutfaklarda ocak, fritöz ve davlumbaz kanalını koruyan otomatik sistem.", "Automatic protection for cooking appliances, fryers and hood ducts in commercial kitchens."),
    description: {
      tr: [
        "Davlumbaz söndürme sistemi, pişirme yağı yangınlarını algılayıp ıslak kimyasal söndürücü madde ile söndürür ve aynı anda gaz vanasını kapatabilir. Restoran, otel ve yemekhane mutfakları için kritik bir güvenlik önlemidir.",
        "Kurulum ve bakım hizmeti için hizmet sayfamızı inceleyebilir veya ücretsiz keşif talep edebilirsiniz.",
      ],
      en: [
        "A kitchen hood suppression system detects cooking oil fires, extinguishes them with a wet chemical agent and can shut off the gas supply at the same time. It is a critical safety measure for restaurant, hotel and canteen kitchens.",
        "See our service page for installation and maintenance, or request a free site survey.",
      ],
    },
    specs: [
      { key: "agent", value: L("Islak kimyasal", "Wet chemical") },
      { key: "use", value: L("Ticari mutfaklar", "Commercial kitchens") },
    ],
  },

  // Acil aydınlatma
  {
    slug: "acil-aydinlatma-armaturu",
    line: "fire",
    category: "acil-aydinlatma-ve-yonlendirme",
    name: L("Acil Aydınlatma Armatürü", "Emergency Luminaire"),
    summary: L("Elektrik kesintisinde kaçış yollarını aydınlatan bataryalı armatür.", "Battery-backed luminaire that lights escape routes during power cuts."),
    description: {
      tr: ["Şebeke elektriği kesildiğinde otomatik devreye girer ve tahliye süresince kaçış yolunun aydınlık kalmasını sağlar."],
      en: ["Switches on automatically when mains power fails and keeps the escape route lit during evacuation."],
    },
  },
  {
    slug: "led-exit-yonlendirme-levhasi",
    line: "fire",
    category: "acil-aydinlatma-ve-yonlendirme",
    name: L("LED'li Exit Yönlendirme Levhası", "LED Exit Sign"),
    summary: L("Tek veya çift yüzlü, bataryalı LED çıkış yönlendirme levhası.", "Single or double-sided battery-backed LED exit sign."),
    description: {
      tr: ["Koşan adam ve yön oku piktogramlarıyla kaçış yönünü gösterir. Duvar, tavan veya asma montaj seçenekleri bulunur."],
      en: ["Shows the escape direction with running-man and arrow pictograms. Available for wall, ceiling or suspended mounting."],
    },
  },

  // Fosforlu levhalar
  {
    slug: "fosforlu-yangin-ekipmani-levhalari",
    line: "fire",
    category: "fosforlu-levhalar",
    name: L("Fosforlu Yangın Ekipmanı Levhaları", "Photoluminescent Fire Equipment Signs"),
    summary: L("Yangın tüpü, yangın dolabı, hortum ve ihbar butonu konumunu gösteren levhalar.", "Signs marking extinguishers, hose cabinets, hoses and call points."),
    description: {
      tr: ["Yangın ekipmanının yerini karanlıkta da görünür kılar. Ekipmanın hemen üzerine, görüş hattında olacak şekilde konumlandırılmalıdır."],
      en: ["Keeps the location of fire equipment visible in the dark. Mount directly above the equipment, within the line of sight."],
    },
  },
  {
    slug: "fosforlu-acil-cikis-ve-toplanma-levhalari",
    line: "fire",
    category: "fosforlu-levhalar",
    name: L("Fosforlu Acil Çıkış ve Toplanma Alanı Levhaları", "Photoluminescent Exit and Assembly Point Signs"),
    summary: L("Kaçış yönü, yangın merdiveni ve acil toplanma alanı levhaları.", "Escape direction, fire stair and assembly point signs."),
    description: {
      tr: ["Kaçış güzergâhı boyunca yön gösterir; zemin ve duvar uygulamalarına uygun seçenekler sunulur."],
      en: ["Guide people along the escape route; options are available for wall and floor application."],
    },
  },

  // Kapı ve merdiven
  {
    slug: "panik-barli-yangin-kapisi",
    line: "fire",
    category: "yangin-kapisi-ve-merdiveni",
    name: L("Panik Barlı Yangın Kapısı", "Panic-Bar Fire Door"),
    summary: L("Tahliye yönünde tek hareketle açılan, yangına dayanıklı kapı.", "Fire-resistant door that opens with a single push in the escape direction."),
    description: {
      tr: ["Yangın kapıları, bölmeler arasında yangın ve duman geçişini sınırlar. Panik bar, kapının basılarak hızla açılmasını sağlar."],
      en: ["Fire doors limit the passage of fire and smoke between compartments. The panic bar lets the door be opened quickly with a push."],
    },
    // TODO: doğrulanmalı — yangın dayanım süreleri (ör. 60/90/120 dk) ve test belgeleri.
  },
  {
    slug: "yangin-merdiveni",
    line: "fire",
    category: "yangin-kapisi-ve-merdiveni",
    name: L("Dış Cephe Yangın Merdiveni", "External Fire Escape Stair"),
    summary: L("Mevcut binalar için ek kaçış yolu sağlayan çelik yangın merdiveni.", "Steel fire escape providing an additional means of escape for existing buildings."),
    description: {
      tr: ["Bina ölçülerine göre projelendirilir ve imal edilir. Keşif sonrası yerleşim ve ölçüler netleştirilir."],
      en: ["Designed and fabricated to suit the building; layout and dimensions are confirmed after a site survey."],
    },
  },

  // Aksesuar
  {
    slug: "yangin-tupu-sehpasi",
    line: "fire",
    category: "yangin-tupu-aksesuarlari",
    name: L("Yangın Tüpü Sehpası", "Extinguisher Stand"),
    summary: L("Duvara montaj yapılamayan alanlarda tüpü zeminde sabit tutan sehpa.", "Floor stand that keeps extinguishers upright where wall mounting is not possible."),
    description: {
      tr: ["Cam cepheli mağazalar, fuar alanları ve showroomlar gibi duvara montajın zor olduğu yerler için uygundur."],
      en: ["Ideal for glass-fronted shops, exhibition halls and showrooms where wall mounting is difficult."],
    },
  },
  {
    slug: "yangin-tupu-duvar-aski-aparati",
    line: "fire",
    category: "yangin-tupu-aksesuarlari",
    name: L("Yangın Tüpü Duvar Askı Aparatı", "Extinguisher Wall Bracket"),
    summary: L("Tüpü duvarda güvenle ve kolay alınabilir şekilde tutan askı.", "Bracket that holds the extinguisher securely on the wall and releases it easily."),
    description: {
      tr: ["Tüpün yerden uygun yükseklikte ve görünür biçimde konumlanmasını sağlar."],
      en: ["Keeps the extinguisher visible and at a suitable height above the floor."],
    },
  },

  // Trafik & ilk yardım
  {
    slug: "arac-trafik-seti",
    line: "fire",
    category: "trafik-setleri-ve-ilk-yardim",
    name: L("Araç Trafik Seti", "Vehicle Safety Kit"),
    summary: L("Reflektör, ilk yardım çantası ve isteğe bağlı yangın tüpü içeren set.", "Kit with warning triangle, first aid kit and optional extinguisher."),
    description: {
      tr: ["Araçta bulundurulması gereken temel güvenlik ekipmanını tek bir çantada toplar. Yangın tüplü ve tüpsüz seçenekleri bulunur."],
      en: ["Brings the basic safety equipment required in a vehicle together in one bag, with or without an extinguisher."],
    },
    // TODO: doğrulanmalı — güncel mevzuata göre zorunlu içerik listesi.
  },
  {
    slug: "duvara-monte-ilk-yardim-cantasi",
    line: "fire",
    category: "trafik-setleri-ve-ilk-yardim",
    name: L("Duvara Monte İlk Yardım Çantası", "Wall-Mounted First Aid Kit"),
    summary: L("İş yerleri için duvara asılabilen, düzenli bölmeli ilk yardım çantası.", "Wall-mountable first aid kit with organised compartments for workplaces."),
    description: {
      tr: ["Görünür ve ulaşılabilir bir noktaya asılarak ilk yardım malzemelerinin düzenli kalmasını sağlar."],
      en: ["Mounted in a visible, accessible spot to keep first aid supplies organised."],
    },
  },
  {
    slug: "metal-ecza-dolabi",
    line: "fire",
    category: "trafik-setleri-ve-ilk-yardim",
    name: L("Metal Ecza Dolabı", "Metal Medicine Cabinet"),
    summary: L("Kilitlenebilir, duvara monte metal ecza dolabı.", "Lockable wall-mounted metal medicine cabinet."),
    description: {
      tr: ["İlaç ve ilk yardım malzemelerini tozdan koruyarak düzenli biçimde saklar."],
      en: ["Keeps medicines and first aid supplies organised and protected from dust."],
    },
  },
];
