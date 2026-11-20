import type { Category, Localized, Product } from "./types";

const L = (tr: string, en: string): Localized => ({ tr, en });
const P = (tr: string, en: string): Localized<string[]> => ({ tr: [tr], en: [en] });

export const safetyCategories: Category[] = [
  {
    slug: "itfaiyeci-giysileri",
    line: "safety",
    icon: "garment",
    name: L("İtfaiyeci ve Yangına Yaklaşma Giysileri", "Firefighter and Proximity Clothing"),
    seoTitle: L("İtfaiyeci ve Yangına Yaklaşma Giysileri", "Firefighter and Proximity Clothing"),
    summary: L(
      "Alev almaz itfaiyeci elbiseleri, aluminize yangına yaklaşma giysileri ve yağmurluklar.",
      "Flame-resistant firefighter suits, aluminised proximity clothing and rain gear.",
    ),
    description: {
      tr: [
        "İtfaiye ekipleri ve tesis acil durum ekipleri için yüksek ısıya ve alevle temasa karşı koruma sağlayan giysiler. Aluminize giysiler, yoğun radyant ısının bulunduğu döküm ve yangına yaklaşma uygulamaları içindir.",
      ],
      en: [
        "Clothing for fire brigades and in-house emergency teams that protects against high heat and flame contact. Aluminised garments are intended for foundry work and fire proximity tasks with intense radiant heat.",
      ],
    },
    subtypes: [
      { slug: "itfaiyeci-elbisesi", name: L("İtfaiyeci elbisesi", "Firefighter suit") },
      { slug: "aluminize", name: L("Aluminize", "Aluminised") },
    ],
  },
  {
    slug: "bas-koruyucular",
    line: "safety",
    icon: "helmet",
    name: L("Baş Koruyucular", "Head Protection"),
    summary: L("İtfaiyeci migferleri, endüstriyel baretler ve ısıya dayanıklı örgü başlıklar.", "Firefighter helmets, industrial hard hats and heat-resistant hoods."),
    description: {
      tr: ["Darbe, düşen cisimler, ısı ve elektriğe karşı baş koruması. Kullanım ortamına göre itfaiyeci migferi, endüstriyel baret veya elektrikçi bareti seçilir."],
      en: ["Head protection against impact, falling objects, heat and electricity. Choose a firefighter helmet, industrial hard hat or electrician's helmet depending on the job."],
    },
    subtypes: [
      { slug: "itfaiyeci-migferi", name: L("İtfaiyeci migferi", "Firefighter helmet") },
      { slug: "baret", name: L("Baret", "Hard hat") },
      { slug: "baslik", name: L("Örgü başlık", "Hood") },
    ],
  },
  {
    slug: "eldivenler",
    line: "safety",
    icon: "glove",
    name: L("Koruyucu Eldivenler", "Protective Gloves"),
    summary: L("İtfaiyeci, kaynakçı, ısıya, kesilmeye ve kimyasallara karşı eldivenler.", "Firefighting, welding, heat, cut and chemical-resistant gloves."),
    description: {
      tr: ["Elleri ısı, alev, keskin kenarlar ve kimyasallardan koruyan eldivenler. Doğru seçim için riskin türü ve gerekli el becerisi birlikte değerlendirilmelidir."],
      en: ["Gloves that protect hands from heat, flame, sharp edges and chemicals. The right choice balances the type of hazard with the dexterity the task needs."],
    },
    subtypes: [
      { slug: "itfaiyeci", name: L("İtfaiyeci", "Firefighting") },
      { slug: "isiya-dayanikli", name: L("Isıya dayanıklı / kaynak", "Heat / welding") },
      { slug: "genel-is", name: L("Genel iş", "General work") },
    ],
  },
  {
    slug: "ayak-koruyucular",
    line: "safety",
    icon: "boot",
    name: L("İtfaiyeci Çizmeleri ve İş Ayakkabıları", "Firefighter Boots and Safety Shoes"),
    seoTitle: L("İtfaiyeci Çizmeleri ve İş Ayakkabıları", "Firefighter Boots and Safety Shoes"),
    summary: L("Alev almaz itfaiyeci çizmeleri ile çelik/kompozit burunlu iş ayakkabıları.", "Flame-resistant firefighter boots and steel or composite toe safety shoes."),
    description: {
      tr: ["Ayakları ezilme, delinme, ısı ve kaymaya karşı koruyan ayakkabı ve çizmeler. S1, S2, S3 gibi sınıflar korumanın kapsamını belirtir."],
      en: ["Footwear that protects against crushing, penetration, heat and slips. Classes such as S1, S2 and S3 indicate the level of protection."],
    },
  },
  {
    slug: "solunum-koruma",
    line: "safety",
    icon: "respiratory",
    name: L("Solunum Koruma", "Respiratory Protection"),
    summary: L("Tam ve yarım yüz maskeler, filtreler, temiz hava solunum setleri ve kaçış maskeleri.", "Full and half masks, filters, breathing apparatus and escape hoods."),
    description: {
      tr: [
        "Duman, toz, gaz ve buhar içeren ortamlarda solunum yolunu koruyan ekipmanlar. Filtreli maskeler yeterli oksijen bulunan ortamlarda kullanılırken, oksijen eksikliği veya bilinmeyen konsantrasyon durumlarında temiz hava tüplü solunum setleri gerekir.",
      ],
      en: [
        "Equipment that protects the airways from smoke, dust, gases and vapours. Filter masks are for atmospheres with sufficient oxygen; self-contained breathing apparatus is required where oxygen is deficient or concentrations are unknown.",
      ],
    },
    subtypes: [
      { slug: "maske", name: L("Tam / yarım yüz maske", "Full / half mask") },
      { slug: "filtre", name: L("Filtre", "Filter") },
      { slug: "solunum-seti", name: L("Solunum seti", "Breathing apparatus") },
      { slug: "kacis", name: L("Kaçış maskesi", "Escape hood") },
      { slug: "toz-maskesi", name: L("Toz maskesi", "Dust mask") },
    ],
  },
  {
    slug: "kimyasal-koruyucu-giysiler",
    line: "safety",
    icon: "chemical",
    name: L("Kimyasal Koruyucu Giysiler", "Chemical Protective Clothing"),
    summary: L("Gaz geçirmez giysiler, kimyasal koruyucu tulumlar ve sıçramaya karşı giysiler.", "Gas-tight suits, chemical coveralls and splash protection."),
    description: {
      tr: ["Tehlikeli madde müdahalesi, kimyasal üretim ve laboratuvar çalışmaları için koruyucu giysiler. Giysi tipi, kimyasalın türüne ve maruziyet şekline göre seçilir."],
      en: ["Protective clothing for hazmat response, chemical production and laboratory work. The suit type depends on the chemical and how exposure may occur."],
    },
  },
  {
    slug: "goz-yuz-ve-kulak-koruma",
    line: "safety",
    icon: "eye",
    name: L("Göz, Yüz ve Kulak Koruma", "Eye, Face and Hearing Protection"),
    summary: L("Koruyucu gözlükler, yüz siperleri, kaynak maskeleri, kulaklık ve kulak tıkaçları.", "Safety glasses, face shields, welding masks, ear defenders and plugs."),
    description: {
      tr: ["Çapak, sıçrama, UV ve gürültüye karşı koruma sağlayan ekipmanlar."],
      en: ["Protection against flying particles, splashes, UV and noise."],
    },
  },
  {
    slug: "dusus-durdurucular",
    line: "safety",
    icon: "harness",
    name: L("Düşüş Durdurucular ve Emniyet Kemerleri", "Fall Arrest and Safety Harnesses"),
    seoTitle: L("Düşüş Durdurucular ve Emniyet Kemerleri", "Fall Arrest Harnesses and Belts"),
    summary: L("Paraşüt tipi emniyet kemerleri, itfaiyeci kemerleri ve kurtarma halatları.", "Full-body harnesses, firefighter belts and rescue ropes."),
    description: {
      tr: ["Yüksekte çalışma ve kurtarma operasyonlarında düşmeyi önleyen ya da durduran ekipmanlar."],
      en: ["Equipment that prevents or arrests falls during work at height and rescue operations."],
    },
  },
  {
    slug: "yangin-battaniyeleri",
    line: "safety",
    icon: "blanket",
    name: L("Yangın Battaniyeleri", "Fire Blankets"),
    summary: L("Mutfak, laboratuvar ve kaynak alanları için yangın ve kaynak battaniyeleri.", "Fire and welding blankets for kitchens, labs and hot work areas."),
    description: {
      tr: ["Yangın battaniyesi, küçük başlangıç yangınlarını oksijenle temasını keserek boğar. Mutfaklarda yağ tavası yangınları ve üzerinde alev olan kişilerin söndürülmesi için de kullanılır."],
      en: ["A fire blanket smothers small fires by cutting off oxygen. It is also used for pan fires in kitchens and to wrap a person whose clothing is on fire."],
    },
  },
  {
    slug: "aydinlatma-ve-el-fenerleri",
    line: "safety",
    icon: "flashlight",
    name: L("El Fenerleri ve Işıldaklar", "Torches and Floodlights"),
    summary: L("Ex-proof el fenerleri, kafa lambaları ve şarjlı LED ışıldaklar.", "Ex-proof torches, head lamps and rechargeable LED floodlights."),
    description: {
      tr: ["Patlayıcı ortamlarda kullanıma uygun (ATEX) el fenerleri ile acil durum ve saha çalışmaları için taşınabilir aydınlatma."],
      en: ["Torches suitable for explosive atmospheres (ATEX) and portable lighting for emergencies and field work."],
    },
  },
  {
    slug: "gaz-olcum-cihazlari",
    line: "safety",
    icon: "gauge",
    name: L("Gaz Ölçüm Cihazları", "Gas Detectors"),
    summary: L("Tekli ve çoklu gaz ölçüm cihazları ile kişisel hareketsizlik uyarıcıları.", "Single and multi-gas detectors and personal distress units."),
    description: {
      tr: ["Kapalı alan çalışmaları ve tehlikeli ortamlarda yanıcı ve zehirli gazlar ile oksijen seviyesini izleyen taşınabilir cihazlar."],
      en: ["Portable devices that monitor flammable and toxic gases and oxygen levels in confined spaces and hazardous areas."],
    },
  },
  {
    slug: "kurtarma-ekipmanlari",
    line: "safety",
    icon: "rescue",
    name: L("Kurtarma Ekipmanları ve Sedyeler", "Rescue Equipment and Stretchers"),
    seoTitle: L("Kurtarma Ekipmanları ve Sedyeler", "Rescue Equipment and Stretchers"),
    summary: L("Yangın baltası, kazma, kürek, zorla giriş aletleri ve acil durum sedyeleri.", "Fire axes, picks, shovels, forcible entry tools and emergency stretchers."),
    description: {
      tr: ["Acil durum ekiplerinin müdahale ve tahliye sırasında ihtiyaç duyduğu el aletleri ve taşıma ekipmanları."],
      en: ["Hand tools and carrying equipment emergency teams need during response and evacuation."],
    },
  },
];

export const safetyProducts: Product[] = [
  {
    slug: "alev-almaz-itfaiyeci-elbisesi",
    line: "safety",
    category: "itfaiyeci-giysileri",
    subtype: "itfaiyeci-elbisesi",
    name: L("Alev Almaz İtfaiyeci Elbisesi", "Flame-Resistant Firefighter Suit"),
    summary: L("Ceket ve pantolondan oluşan, çok katmanlı itfaiyeci koruyucu elbisesi.", "Multi-layer firefighter turnout jacket and trousers."),
    description: P(
      "Dış kumaş, nem bariyeri ve ısı yalıtım katmanlarından oluşan yapısıyla yangın müdahalesinde ısı ve alevle temasa karşı koruma sağlar. Reflektif bantlar düşük görüşte fark edilmeyi kolaylaştırır.",
      "With an outer shell, moisture barrier and thermal liner, it protects against heat and flame contact during firefighting. Reflective tape improves visibility in low light.",
    ),
    // TODO: doğrulanmalı — model bazında EN 469 vb. standart belgeleri.
  },
  {
    slug: "aluminize-yangina-yaklasma-elbisesi",
    line: "safety",
    category: "itfaiyeci-giysileri",
    subtype: "aluminize",
    name: L("Aluminize Yangına Yaklaşma Elbisesi", "Aluminised Fire Proximity Suit"),
    summary: L("Radyant ısıyı yansıtan aluminize yüzeyli koruyucu elbise.", "Protective suit with an aluminised surface that reflects radiant heat."),
    description: P(
      "Aluminize yüzey, yoğun radyant ısının büyük bölümünü yansıtır. Döküm tesisleri, ergimiş metal ile çalışılan alanlar ve yangına yakın mesafeden müdahale için kullanılır.",
      "The aluminised surface reflects most intense radiant heat. Used in foundries, molten metal areas and for close-range firefighting.",
    ),
  },
  {
    slug: "itfaiyeci-migferi",
    line: "safety",
    category: "bas-koruyucular",
    subtype: "itfaiyeci-migferi",
    name: L("Vizörlü İtfaiyeci Migferi", "Firefighter Helmet with Visor"),
    summary: L("Darbe ve ısıya karşı koruyan, yüz vizörlü itfaiyeci kaskı.", "Firefighter helmet with face visor, protecting against impact and heat."),
    description: P(
      "Yangın müdahalesinde baş ve yüzü düşen cisimlere, ısıya ve sıçramalara karşı korur. Ense koruyucu ve fener aparatı seçenekleri bulunur.",
      "Protects head and face from falling objects, heat and splashes during firefighting. Neck curtain and torch mount options are available.",
    ),
  },
  {
    slug: "endustriyel-baret",
    line: "safety",
    category: "bas-koruyucular",
    subtype: "baret",
    name: L("Endüstriyel Baret", "Industrial Hard Hat"),
    summary: L("Şantiye ve üretim alanları için ayarlanabilir iç bantlı baret.", "Hard hat with adjustable harness for construction and production sites."),
    description: P(
      "Düşen cisimlere ve darbelere karşı baş koruması sağlar. Kulaklık ve siperlik takılabilen modeller mevcuttur.",
      "Protects against falling objects and impact. Models accepting ear defenders and visors are available.",
    ),
  },
  {
    slug: "isiya-dayanikli-orgu-baslik",
    line: "safety",
    category: "bas-koruyucular",
    subtype: "baslik",
    name: L("Isıya Dayanıklı Örgü Başlık", "Heat-Resistant Firefighter Hood"),
    summary: L("Migfer altında boyun ve yüz çevresini koruyan alev almaz başlık.", "Flame-resistant hood protecting neck and face under the helmet."),
    description: P(
      "Migfer ile elbise arasında açıkta kalan bölgeleri ısı ve alevden korur.",
      "Covers the gap between helmet and suit, protecting exposed skin from heat and flame.",
    ),
  },
  {
    slug: "itfaiyeci-eldiveni",
    line: "safety",
    category: "eldivenler",
    subtype: "itfaiyeci",
    name: L("İtfaiyeci Eldiveni", "Firefighting Gloves"),
    summary: L("Isı, alev ve kesilmeye karşı koruyan çok katmanlı itfaiyeci eldiveni.", "Multi-layer gloves protecting against heat, flame and cuts."),
    description: P(
      "Yangın müdahalesi sırasında elleri yüksek sıcaklık ve keskin yüzeylere karşı korurken kavrama hissini korumaya yönelik tasarlanmıştır.",
      "Designed to protect hands from high temperatures and sharp surfaces while keeping a good grip during firefighting.",
    ),
  },
  {
    slug: "kaynakci-eldiveni",
    line: "safety",
    category: "eldivenler",
    subtype: "isiya-dayanikli",
    name: L("Deri Kaynakçı Eldiveni", "Leather Welding Gloves"),
    summary: L("Kaynak sıçramaları ve ısıya karşı uzun konçlu deri eldiven.", "Long-cuff leather gloves against welding spatter and heat."),
    description: P(
      "Kaynak, kesme ve sıcak işlerde elleri ve bilekleri korur.",
      "Protects hands and wrists during welding, cutting and other hot work.",
    ),
  },
  {
    slug: "itfaiyeci-cizmesi",
    line: "safety",
    category: "ayak-koruyucular",
    name: L("İtfaiyeci Çizmesi", "Firefighter Boots"),
    summary: L("Alev almaz, çelik burunlu ve delinmeye dayanıklı itfaiyeci çizmesi.", "Flame-resistant firefighter boots with steel toe and penetration resistance."),
    description: P(
      "Isı, su ve keskin cisimlere karşı koruma sağlayan, kaymaz tabanlı çizme.",
      "Slip-resistant boots protecting against heat, water and sharp objects.",
    ),
  },
  {
    slug: "s3-is-ayakkabisi",
    line: "safety",
    category: "ayak-koruyucular",
    name: L("S3 Çelik Burunlu İş Ayakkabısı", "S3 Steel Toe Safety Shoe"),
    summary: L("Su itici, delinmeye dayanıklı tabanlı S3 sınıfı iş ayakkabısı.", "Water-resistant S3 safety shoe with puncture-resistant midsole."),
    description: P(
      "Üretim, depo ve şantiye ortamları için ezilme ve delinmeye karşı koruma sağlar.",
      "Protects against crushing and puncture in production, warehouse and construction settings.",
    ),
  },
  {
    slug: "tam-yuz-gaz-maskesi",
    line: "safety",
    category: "solunum-koruma",
    subtype: "maske",
    name: L("Tam Yüz Gaz Maskesi", "Full-Face Gas Mask"),
    summary: L("Göz ve solunum yolunu birlikte koruyan, filtre takılabilen tam yüz maske.", "Full-face mask protecting eyes and airways, with replaceable filters."),
    description: P(
      "Gaz, buhar ve partiküllere karşı uygun filtre ile kullanılır. Filtre seçimi ortamdaki kirleticiye göre yapılmalıdır.",
      "Used with the appropriate filter against gases, vapours and particles. Choose the filter based on the contaminant present.",
    ),
  },
  {
    slug: "abek-kombine-gaz-filtresi",
    line: "safety",
    category: "solunum-koruma",
    subtype: "filtre",
    name: L("ABEK Kombine Gaz Filtresi", "ABEK Combined Gas Filter"),
    summary: L("Organik, inorganik, asit gaz ve amonyağa karşı kombine filtre.", "Combined filter for organic, inorganic, acid gases and ammonia."),
    description: P(
      "Farklı gaz gruplarının bir arada bulunabildiği endüstriyel ortamlarda tam yüz maskelerle kullanılır.",
      "Used with full-face masks in industrial settings where several gas groups may be present.",
    ),
  },
  {
    slug: "temiz-hava-tuplu-solunum-seti",
    line: "safety",
    category: "solunum-koruma",
    subtype: "solunum-seti",
    name: L("Temiz Hava Tüplü Solunum Seti", "Self-Contained Breathing Apparatus"),
    summary: L("Oksijen eksikliği olan ortamlar için basınçlı hava tüplü solunum cihazı.", "Compressed-air breathing apparatus for oxygen-deficient atmospheres."),
    description: P(
      "Kullanıcıyı ortam havasından tamamen bağımsız kılar. İtfaiye, kurtarma ve kapalı alan müdahalelerinde kullanılır. Çelik veya kompozit tüp seçenekleri bulunur.",
      "Makes the wearer fully independent of the surrounding air. Used for firefighting, rescue and confined space entry, with steel or composite cylinder options.",
    ),
  },
  {
    slug: "yangin-kacis-maskesi",
    line: "safety",
    category: "solunum-koruma",
    subtype: "kacis",
    name: L("Yangın Kaçış Maskesi", "Fire Escape Hood"),
    summary: L("Yangında dumandan korunarak tahliye için tek kullanımlık kaçış başlığı.", "Single-use escape hood for evacuating through smoke."),
    description: P(
      "Otel odaları, ofisler ve yüksek binalarda tahliye sırasında duman ve zehirli gazlara karşı kısa süreli koruma sağlar.",
      "Provides short-term protection against smoke and toxic gases during evacuation from hotel rooms, offices and high-rise buildings.",
    ),
  },
  {
    slug: "ffp2-ventilli-toz-maskesi",
    line: "safety",
    category: "solunum-koruma",
    subtype: "toz-maskesi",
    name: L("FFP2 Ventilli Toz Maskesi", "FFP2 Valved Dust Mask"),
    summary: L("Toz ve partiküllere karşı ventilli, katlanabilir maske.", "Folding valved mask against dust and particles."),
    description: P(
      "Ventil, nefes verirken ısı ve nem birikimini azaltarak uzun süreli kullanımda konfor sağlar.",
      "The valve reduces heat and moisture build-up when exhaling, improving comfort during long wear.",
    ),
  },
  {
    slug: "kimyasal-koruyucu-tulum",
    line: "safety",
    category: "kimyasal-koruyucu-giysiler",
    name: L("Kimyasal Koruyucu Tulum", "Chemical Protective Coverall"),
    summary: L("Sıvı sıçramalarına ve partiküllere karşı tek parça koruyucu tulum.", "One-piece coverall against liquid splashes and particles."),
    description: P(
      "Kimyasal üretim, temizlik ve laboratuvar uygulamalarında vücudu sıvı ve partikül maruziyetine karşı korur.",
      "Protects the body from liquid and particle exposure in chemical production, cleaning and laboratory work.",
    ),
  },
  {
    slug: "gaz-gecirmez-kimyasal-koruyucu-giysi",
    line: "safety",
    category: "kimyasal-koruyucu-giysiler",
    name: L("Gaz Geçirmez Kimyasal Koruyucu Giysi", "Gas-Tight Chemical Protective Suit"),
    summary: L("Tehlikeli madde müdahalesi için solunum setiyle kullanılan gaz geçirmez giysi.", "Gas-tight hazmat suit worn with breathing apparatus."),
    description: P(
      "Gaz, buhar ve sıvı kimyasallara karşı tam vücut koruması sağlar; solunum seti giysinin içinde kullanılır.",
      "Gives full-body protection against gases, vapours and liquid chemicals, with the breathing apparatus worn inside the suit.",
    ),
  },
  {
    slug: "koruyucu-gozluk",
    line: "safety",
    category: "goz-yuz-ve-kulak-koruma",
    name: L("Koruyucu İş Gözlüğü", "Safety Glasses"),
    summary: L("Çapak ve sıçramalara karşı darbe dayanımlı iş gözlüğü.", "Impact-resistant glasses against flying particles and splashes."),
    description: P(
      "Buğulanma önleyici ve UV korumalı lens seçenekleriyle günlük iş güvenliği ihtiyacını karşılar.",
      "Anti-fog and UV-protective lens options cover everyday workplace needs.",
    ),
  },
  {
    slug: "gurultu-onleyici-kulaklik",
    line: "safety",
    category: "goz-yuz-ve-kulak-koruma",
    name: L("Gürültü Önleyici Kulaklık", "Ear Defenders"),
    summary: L("Baş bantlı veya barete takılabilir gürültü önleyici kulaklık.", "Headband or helmet-mounted ear defenders."),
    description: P(
      "Gürültülü üretim alanlarında işitme kaybı riskini azaltır.",
      "Reduces the risk of hearing loss in noisy production areas.",
    ),
  },
  {
    slug: "parasut-tipi-emniyet-kemeri",
    line: "safety",
    category: "dusus-durdurucular",
    name: L("Paraşüt Tipi Emniyet Kemeri", "Full-Body Safety Harness"),
    summary: L("Yüksekte çalışmalar için tam vücut emniyet kemeri.", "Full-body harness for work at height."),
    description: P(
      "Düşüş anında yükü vücuda dengeli dağıtır; uygun lanyard ve ankraj noktasıyla birlikte kullanılmalıdır.",
      "Distributes fall forces across the body; must be used with a suitable lanyard and anchor point.",
    ),
  },
  {
    slug: "itfaiyeci-kemeri",
    line: "safety",
    category: "dusus-durdurucular",
    name: L("İtfaiyeci Kemeri", "Firefighter Belt"),
    summary: L("Karabinalı, balta kılıflı itfaiyeci kurtarma kemeri.", "Firefighter rescue belt with karabiner and axe holster."),
    description: P(
      "Müdahale sırasında konumlandırma ve ekipman taşıma için kullanılır.",
      "Used for work positioning and carrying equipment during operations.",
    ),
  },
  {
    slug: "180x180-cm-yangin-battaniyesi",
    line: "safety",
    category: "yangin-battaniyeleri",
    name: L("180x180 cm Yangın Battaniyesi", "180x180 cm Fire Blanket"),
    summary: L("Geniş alanlı, kılıflı yangın battaniyesi.", "Large fire blanket in a quick-release pouch."),
    description: P(
      "Laboratuvar, endüstriyel mutfak ve atölyelerde küçük yangınları boğmak ve kişileri alevden korumak için kullanılır.",
      "Used in labs, commercial kitchens and workshops to smother small fires and protect people from flames.",
    ),
    // TODO: doğrulanmalı — eski sitede TS EN 1869 belgeli model listeleniyordu.
  },
  {
    slug: "120x180-cm-yangin-battaniyesi",
    line: "safety",
    category: "yangin-battaniyeleri",
    name: L("120x180 cm Yangın Battaniyesi", "120x180 cm Fire Blanket"),
    summary: L("Mutfak ve ofisler için kompakt kılıflı yangın battaniyesi.", "Compact fire blanket in a pouch for kitchens and offices."),
    description: P(
      "Duvara asılan kılıfından tek hareketle çekilerek kullanılır.",
      "Pulls out of its wall-mounted pouch in one movement.",
    ),
  },
  {
    slug: "ex-proof-el-feneri",
    line: "safety",
    category: "aydinlatma-ve-el-fenerleri",
    name: L("Ex-Proof (ATEX) El Feneri", "Ex-Proof (ATEX) Torch"),
    summary: L("Patlayıcı ortamlarda kullanıma uygun LED el feneri.", "LED torch suitable for explosive atmospheres."),
    description: P(
      "Rafineri, kimya tesisi ve tank sahaları gibi patlama riski olan alanlarda güvenli aydınlatma sağlar. Bölge (zone) sınıfı modele göre değişir.",
      "Provides safe lighting in refineries, chemical plants and tank farms where explosive atmospheres may occur. The zone rating depends on the model.",
    ),
  },
  {
    slug: "sarjli-led-isildak",
    line: "safety",
    category: "aydinlatma-ve-el-fenerleri",
    name: L("Şarjlı LED Işıldak", "Rechargeable LED Floodlight"),
    summary: L("Acil durum ve saha çalışmaları için taşınabilir şarjlı ışıldak.", "Portable rechargeable floodlight for emergencies and field work."),
    description: P(
      "Elektrik kesintisi, gece çalışması ve kurtarma operasyonlarında geniş alan aydınlatması sağlar.",
      "Lights wide areas during power cuts, night work and rescue operations.",
    ),
  },
  {
    slug: "coklu-gaz-olcum-cihazi",
    line: "safety",
    category: "gaz-olcum-cihazlari",
    name: L("Çoklu Gaz Ölçüm Cihazı", "Multi-Gas Detector"),
    summary: L("Yanıcı gaz, oksijen ve zehirli gazları eş zamanlı ölçen taşınabilir dedektör.", "Portable detector measuring flammable gas, oxygen and toxic gases simultaneously."),
    description: P(
      "Kapalı alanlara girişten önce ve çalışma süresince ortam havasını izler; sesli ve titreşimli alarm verir.",
      "Monitors the atmosphere before and during confined space entry, with audible and vibrating alarms.",
    ),
  },
  {
    slug: "yangin-baltasi",
    line: "safety",
    category: "kurtarma-ekipmanlari",
    name: L("Yangın Baltası", "Fire Axe"),
    summary: L("Zorla giriş ve enkaz kaldırma için itfaiyeci baltası.", "Firefighter's axe for forcible entry and debris removal."),
    description: P(
      "Yangın malzeme dolapları ve acil durum istasyonlarının temel ekipmanlarındandır.",
      "A core item in fire equipment lockers and emergency stations.",
    ),
  },
  {
    slug: "portatif-katlanabilir-sedye",
    line: "safety",
    category: "kurtarma-ekipmanlari",
    name: L("Portatif Katlanabilir Sedye", "Portable Folding Stretcher"),
    summary: L("Hafif, katlanabilir brandalı acil durum sedyesi.", "Lightweight folding canvas stretcher for emergencies."),
    description: P(
      "İş yerlerinde yaralıların güvenli taşınması için kolay depolanan bir çözümdür.",
      "An easy-to-store solution for moving injured people safely at work.",
    ),
  },
];
