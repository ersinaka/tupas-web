import type { Category } from "./types";

export const fireCategories: Category[] = [
  {
    slug: "yangin-sondurme-cihazlari",
    line: "fire",
    icon: "extinguisher",
    featured: true,
    name: { tr: "Yangın Söndürme Cihazları", en: "Fire Extinguishers" },
    summary: {
      tr: "Kuru kimyevi tozlu, CO2'li, köpüklü ve sulu cihazlar; 1989'dan beri kendi tesisimizde üretiliyor.",
      en: "Dry powder, CO2, foam and water extinguishers, made in our own facility since 1989.",
    },
    description: {
      tr: [
        "Taşınabilir yangın söndürme cihazları, bir yangına ilk dakikalarda müdahale etmenin en pratik yoludur. Kuru kimyevi tozlu, CO2'li, köpüklü ve sulu cihazlarımızı Yenibosna'daki tesisimizde üretiyor; her cihazı sevkiyattan önce basınç, yorulma ve çökme testlerinden geçiriyoruz.",
        "Doğru cihaz, korunacak alandaki yangın sınıfına göre seçilir. Ofis ve depolar için çoğunlukla ABC tozlu, elektrik panoları için CO2'li, sıvı yakıtların bulunduğu alanlar için köpüklü cihazlar tercih edilir. Hangi cihazın size uygun olduğundan emin değilseniz ücretsiz keşifte birlikte belirleyelim.",
      ],
      en: [
        "Portable extinguishers are the most practical way to tackle a fire in its first minutes. We manufacture dry powder, CO2, foam and water extinguishers at our facility in Yenibosna, and every unit goes through pressure, fatigue and collapse testing before it leaves the plant.",
        "The right extinguisher depends on the fire classes present in the area you are protecting. Offices and warehouses typically use ABC powder, electrical rooms use CO2, and areas with flammable liquids use foam. If you are unsure, we can work it out together during a free site survey.",
      ],
    },
    subtypes: [
      { slug: "kuru-kimyevi-tozlu", name: { tr: "Kuru kimyevi tozlu", en: "Dry chemical powder" } },
      { slug: "co2", name: { tr: "CO2 gazlı", en: "CO2" } },
      { slug: "kopuklu", name: { tr: "Köpüklü", en: "Foam" } },
      { slug: "halokarbon", name: { tr: "Halokarbon gazlı", en: "Halocarbon" } },
      { slug: "sulu", name: { tr: "Sulu", en: "Water" } },
      { slug: "metal-tozlu", name: { tr: "Metal tozlu", en: "Metal powder (Class D)" } },
      { slug: "romorklu", name: { tr: "Römorklu", en: "Wheeled / trailer" } },
      { slug: "nikelaj-kaplama", name: { tr: "Nikelaj kaplama", en: "Chrome-plated" } },
    ],
  },
  {
    slug: "yangin-dolaplari",
    line: "fire",
    icon: "cabinet",
    featured: true,
    name: { tr: "Yangın Dolapları", en: "Fire Hose Cabinets" },
    summary: {
      tr: "Sulu ve kuru sistem yangın dolapları, tüp kabinleri ve malzeme dolapları.",
      en: "Wet and dry riser hose cabinets, extinguisher cabinets and equipment lockers.",
    },
    description: {
      tr: [
        "Yangın dolapları; hortum, makara ve söndürme cihazını tek bir noktada, kolay ulaşılır ve korunaklı biçimde bir arada tutar. Binanın tesisat yapısına göre sulu sistem veya kuru sistem dolap seçilir.",
        "Sıva altı ve sıva üstü montaja uygun modellerin yanı sıra yangın tüpü kabinleri, malzeme dolapları ve plastik tüp kabinleri de sunuyoruz. Ölçü ve donanım seçeneklerini projenize göre birlikte netleştiriyoruz.",
      ],
      en: [
        "Fire hose cabinets keep the hose, reel and extinguisher together in one protected, easy-to-reach place. The choice between a wet riser and a dry riser cabinet depends on the building's pipework.",
        "Alongside recessed and surface-mounted cabinets we supply extinguisher cabinets, equipment lockers and plastic extinguisher housings. We confirm sizes and fittings with you for each project.",
      ],
    },
    subtypes: [
      { slug: "sulu-sistem", name: { tr: "Sulu sistem", en: "Wet riser" } },
      { slug: "kuru-sistem", name: { tr: "Kuru sistem", en: "Dry riser" } },
      { slug: "kabin-ve-dolap", name: { tr: "Tüp kabini ve malzeme dolabı", en: "Extinguisher & equipment cabinets" } },
    ],
  },
  {
    slug: "hortum-makaralari",
    line: "fire",
    icon: "reel",
    featured: true,
    name: { tr: "Hortum Makaraları ve Makara Arabaları", en: "Hose Reels and Reel Carts" },
    seoTitle: { tr: "Yangın Hortum Makaraları ve Arabaları", en: "Fire Hose Reels and Reel Carts" },
    summary: {
      tr: "Duvar tipi sabit ve hareketli makaralar ile geniş alanlar için tekerlekli makara arabaları.",
      en: "Fixed and swing-out wall reels, plus wheeled reel carts for large sites.",
    },
    description: {
      tr: [
        "Yangın hortum makaraları, hortumun düğümlenmeden hızla açılmasını sağlar. Duvar tipi sabit makaralar dolap içinde ya da duvarda kullanılırken, hareketli (dönebilen) makaralar hortumun farklı yönlere çekilmesine izin verir.",
        "Fabrika sahası, şantiye ve depo gibi geniş alanlarda tekerlekli makara arabaları, hortumu ihtiyaç duyulan noktaya taşımayı kolaylaştırır.",
      ],
      en: [
        "Fire hose reels let the hose pay out quickly without kinking. Fixed wall reels sit inside a cabinet or on the wall, while swing-out reels can be pulled in different directions.",
        "On large sites such as factory yards, construction sites and warehouses, wheeled reel carts make it easy to bring the hose to where it is needed.",
      ],
    },
    subtypes: [
      { slug: "duvar-tipi", name: { tr: "Duvar tipi makara", en: "Wall reel" } },
      { slug: "makara-arabasi", name: { tr: "Makara arabası", en: "Reel cart" } },
    ],
  },
  {
    slug: "yangin-hortumlari",
    line: "fire",
    icon: "hose",
    name: { tr: "Yangın Hortumları", en: "Fire Hoses" },
    summary: {
      tr: "Yarı sert dolap hortumları ile içi kauçuk astarlı yassı yangın hortumları.",
      en: "Semi-rigid cabinet hoses and rubber-lined lay-flat fire hoses.",
    },
    description: {
      tr: [
        "Yangın dolaplarında kullanılan yarı sert hortumlar, tamamen açılmadan da su verebilir; bu da ilk müdahaleyi tek kişinin yapabilmesini kolaylaştırır.",
        "Yassı yangın hortumları ise içi kauçuk astarlı olup dış yüzeyi kullanım ortamına göre farklı kaplamalarla sunulur. Çap ve uzunluk seçeneklerini mevcut rakor ve vanalarınıza uygun olacak şekilde belirliyoruz.",
      ],
      en: [
        "Semi-rigid hoses used in hose cabinets can deliver water before they are fully unrolled, which makes first response by a single person much easier.",
        "Lay-flat fire hoses are rubber-lined on the inside, with outer coatings chosen for the environment they will be used in. We match diameters and lengths to your existing couplings and valves.",
      ],
    },
    subtypes: [
      { slug: "yari-sert", name: { tr: "Yarı sert", en: "Semi-rigid" } },
      { slug: "yassi", name: { tr: "Yassı", en: "Lay-flat" } },
    ],
  },
  {
    slug: "mobil-kopuk-uniteleri",
    line: "fire",
    icon: "foam",
    name: { tr: "Mobil Köpük Üniteleri", en: "Mobile Foam Units" },
    summary: {
      tr: "Akaryakıt ve kimyasal depolama alanları için tekerlekli köpük üniteleri ve römorklu köpük topları.",
      en: "Wheeled foam units and trailer-mounted foam monitors for fuel and chemical storage areas.",
    },
    description: {
      tr: [
        "Mobil köpük üniteleri, yanıcı sıvıların bulunduğu alanlarda köpük konsantresini hızla yangın noktasına ulaştırmak için kullanılır. Tekerlekli yapıları sayesinde tek kişi tarafından taşınabilir.",
        "Daha büyük riskler için römorklu köpük ve su topları sunuyoruz. Uygun kapasite ve köpük tipi, korunacak tesisin özelliklerine göre seçilmelidir.",
      ],
      en: [
        "Mobile foam units deliver foam concentrate quickly to fires involving flammable liquids. Their wheeled design means one person can move them into position.",
        "For larger risks we supply trailer-mounted foam and water monitors. Capacity and foam type should be selected according to the site being protected.",
      ],
    },
  },
  {
    slug: "hidrant-sistemleri",
    line: "fire",
    icon: "hydrant",
    featured: true,
    name: { tr: "Hidrant Sistemleri", en: "Hydrant Systems" },
    summary: {
      tr: "Yerüstü yangın hidrantları ve saha hidrant sistemlerinin tasarım ve kurulumu.",
      en: "Above-ground fire hydrants and site hydrant system design and installation.",
    },
    description: {
      tr: [
        "Hidrant sistemleri, bina dışından yapılacak müdahaleler için itfaiyeye ve tesis ekiplerine güvenilir bir su kaynağı sağlar. Özellikle fabrika, depo ve site gibi geniş yerleşimlerde temel bir gerekliliktir.",
        "Yerüstü hidrantların temininin yanı sıra hidrant hattı, vana ve bağlantı elemanlarını içeren sistem çözümleri de sunuyoruz. Proje ihtiyacı keşif sonrasında netleşir.",
      ],
      en: [
        "Hydrant systems give fire brigades and on-site teams a reliable water supply for firefighting from outside the building. They are a core requirement on large sites such as factories, warehouses and residential complexes.",
        "Besides supplying above-ground hydrants, we provide complete systems including hydrant mains, valves and fittings. Exact requirements are defined after a site survey.",
      ],
    },
  },
  {
    slug: "itfaiye-malzemeleri",
    line: "fire",
    icon: "tools",
    featured: true,
    name: { tr: "İtfaiye Malzemeleri", en: "Firefighting Equipment" },
    summary: {
      tr: "Köpük lansları, nozullar, melanjörler, rakorlar, siyam ikizi ve yangın vanaları.",
      en: "Foam branches, nozzles, inductors, couplings, Siamese connections and fire valves.",
    },
    description: {
      tr: [
        "Bir yangın tesisatının verimli çalışması, hortumu suya ve suyu yangına bağlayan ekipmanların doğru seçilmesine bağlıdır. Lanslar, nozullar, köpük melanjörleri, dağıtıcılar, rakorlar ve itfaiye bağlantı ağızları bu zincirin parçalarıdır.",
        "İtfaiye ekiplerinin, tesis acil durum ekiplerinin ve yangın tesisatı yapan firmaların ihtiyaç duyduğu bu malzemeleri tek noktadan temin ediyoruz.",
      ],
      en: [
        "A fire installation only performs well when the parts connecting hose to water and water to fire are chosen correctly. Branches, nozzles, foam inductors, dividing breechings, couplings and fire brigade inlets are all links in that chain.",
        "We supply this equipment from a single source to fire brigades, in-house emergency teams and fire installation contractors.",
      ],
    },
    subtypes: [
      { slug: "lans-ve-nozul", name: { tr: "Lans ve nozul", en: "Branches & nozzles" } },
      { slug: "kopuk-ekipmani", name: { tr: "Köpük ekipmanı", en: "Foam equipment" } },
      { slug: "baglanti-elemanlari", name: { tr: "Bağlantı elemanları", en: "Couplings & connections" } },
    ],
  },
  {
    slug: "yangin-algilama-sistemleri",
    line: "fire",
    icon: "detection",
    featured: true,
    name: { tr: "Yangın Algılama Sistemleri", en: "Fire Detection Systems" },
    summary: {
      tr: "Adresli ve konvansiyonel yangın algılama ve alarm sistemlerinin projelendirme ve kurulumu.",
      en: "Design and installation of addressable and conventional fire detection and alarm systems.",
    },
    description: {
      tr: [
        "Yangın algılama sistemi, yangını henüz küçükken fark edip binadaki kişileri uyarır ve gerekirse söndürme sistemlerini devreye alır. Erken uyarı, can ve mal kaybını önlemede belirleyici etkendir.",
        "Küçük ve orta ölçekli işletmeler için bölge bazlı çalışan konvansiyonel sistemler, büyük ve çok katlı yapılar için ise alarmın tam yerini gösteren adresli sistemler kuruyoruz. Sistem tipi, binanın kullanım amacı ve büyüklüğüne göre belirlenir.",
      ],
      en: [
        "A fire detection system spots a fire while it is still small, alerts the people in the building and, where needed, triggers suppression systems. Early warning is the deciding factor in preventing loss of life and property.",
        "We install zone-based conventional systems for small and mid-sized premises and addressable systems — which pinpoint the exact device in alarm — for larger and multi-storey buildings. The right type depends on the building's use and size.",
      ],
    },
    subtypes: [
      { slug: "adresli", name: { tr: "Adresli", en: "Addressable" } },
      { slug: "konvansiyonel", name: { tr: "Konvansiyonel", en: "Conventional" } },
    ],
  },
  {
    slug: "sondurme-sistemleri",
    line: "fire",
    icon: "suppression",
    featured: true,
    name: { tr: "Otomatik Söndürme Sistemleri", en: "Fire Suppression Systems" },
    summary: {
      tr: "FM200 gazlı, su sisi, sprinkler, tozlu ve davlumbaz söndürme sistemleri.",
      en: "FM200 clean agent, water mist, sprinkler, powder and kitchen hood suppression systems.",
    },
    description: {
      tr: [
        "Otomatik söndürme sistemleri, yangını insan müdahalesi beklemeden algılayıp söndürmek için tasarlanır. Hangi sistemin kullanılacağı, korunan alanın içeriğine bağlıdır: sunucu odaları ve arşivler için gazlı sistemler, genel alanlar için sprinkler, ticari mutfaklar için davlumbaz söndürme sistemleri öne çıkar.",
        "FM200 gazlı söndürme sistemi gibi temiz gaz çözümleri, elektronik ekipmana zarar vermeden söndürme yapar. Keşif sonrası alanınıza uygun sistemi projelendirip kurulumunu ve periyodik bakımını üstleniyoruz.",
      ],
      en: [
        "Automatic suppression systems detect and extinguish a fire without waiting for anyone to act. The right system depends on what is being protected: clean agent systems for server rooms and archives, sprinklers for general areas, and hood suppression systems for commercial kitchens.",
        "Clean agent solutions such as FM200 extinguish fires without damaging electronic equipment. After a site survey we design the right system for your space, install it and take care of periodic maintenance.",
      ],
    },
    subtypes: [
      { slug: "gazli", name: { tr: "Gazlı (FM200)", en: "Clean agent (FM200)" } },
      { slug: "su-sisi", name: { tr: "Su sisi", en: "Water mist" } },
      { slug: "sprinkler", name: { tr: "Sprinkler", en: "Sprinkler" } },
      { slug: "tozlu", name: { tr: "Tozlu", en: "Powder" } },
      { slug: "davlumbaz", name: { tr: "Davlumbaz", en: "Kitchen hood" } },
    ],
  },
  {
    slug: "acil-aydinlatma-ve-yonlendirme",
    line: "fire",
    icon: "lighting",
    featured: true,
    name: { tr: "Acil Aydınlatma ve Yönlendirme", en: "Emergency Lighting and Exit Signs" },
    summary: {
      tr: "Acil aydınlatma armatürleri ve LED'li çıkış/yönlendirme levhaları.",
      en: "Emergency luminaires and LED exit and wayfinding signs.",
    },
    description: {
      tr: [
        "Elektrik kesildiğinde kaçış yollarının görünür kalması, tahliyenin güvenle yapılabilmesi için şarttır. Acil aydınlatma armatürleri ve LED'li yönlendirme levhaları, dahili bataryalarıyla bu görevi üstlenir.",
        "Duvar, tavan ve asma tipi montaja uygun, tek veya çift yüzlü yönlendirme levhaları sunuyoruz. Levhaların yerleşimi kaçış planınızla uyumlu olacak şekilde belirlenmelidir.",
      ],
      en: [
        "When the power fails, escape routes must stay visible so people can evacuate safely. Emergency luminaires and LED exit signs handle this with built-in batteries.",
        "We supply single- and double-sided signs for wall, ceiling and suspended mounting. Sign placement should follow your evacuation plan.",
      ],
    },
  },
  {
    slug: "fosforlu-levhalar",
    line: "fire",
    icon: "sign",
    name: { tr: "Fosforlu Yangın ve Acil Çıkış Levhaları", en: "Photoluminescent Safety Signs" },
    seoTitle: { tr: "Fosforlu Yangın ve Acil Çıkış Levhaları", en: "Photoluminescent Fire Safety Signs" },
    summary: {
      tr: "Karanlıkta görünür kalan yangın ekipmanı, acil çıkış ve toplanma alanı levhaları.",
      en: "Glow-in-the-dark signs for fire equipment, exits and assembly points.",
    },
    description: {
      tr: [
        "Fotolümenli (fosforlu) levhalar ortam ışığından enerji depolar ve karanlıkta bir süre görünür kalır. Yangın tüpü, yangın dolabı, ihbar butonu, acil çıkış ve toplanma alanı gibi noktaların işaretlenmesinde kullanılır.",
        "Elektrik bağlantısı gerektirmedikleri için acil aydınlatmayı tamamlayan, düşük maliyetli bir önlemdir.",
      ],
      en: [
        "Photoluminescent signs store energy from ambient light and stay visible in the dark for a period of time. They mark fire extinguishers, hose cabinets, call points, exits and assembly points.",
        "Because they need no wiring, they are a low-cost measure that complements emergency lighting.",
      ],
    },
  },
  {
    slug: "yangin-kapisi-ve-merdiveni",
    line: "fire",
    icon: "door",
    name: { tr: "Yangın Kapısı ve Yangın Merdiveni", en: "Fire Doors and Fire Escapes" },
    summary: {
      tr: "Panik barlı yangın kapıları ve dış cephe yangın merdivenleri.",
      en: "Panic-bar fire doors and external fire escape stairs.",
    },
    description: {
      tr: [
        "Yangın kapıları, yangının ve dumanın bina içinde yayılmasını sınırlarken kaçış yolunun açık kalmasını sağlar. Panik barlı modeller, kalabalık bir tahliyede bile kapının tek hareketle açılmasına olanak tanır.",
        "Yangın merdivenleri ise mevcut binalarda ek kaçış yolu ihtiyacını karşılar. Her iki ürün de binanın projesine ve mevzuat gereksinimlerine göre ölçülendirilmelidir.",
      ],
      en: [
        "Fire doors limit the spread of fire and smoke inside a building while keeping escape routes usable. Panic-bar models open with a single push, even during a crowded evacuation.",
        "External fire escapes provide an additional means of escape for existing buildings. Both need to be sized to the building's design and regulatory requirements.",
      ],
    },
  },
  {
    slug: "yangin-tupu-aksesuarlari",
    line: "fire",
    icon: "accessory",
    name: { tr: "Yangın Tüpü Aksesuarları", en: "Extinguisher Accessories" },
    summary: {
      tr: "Yangın tüpü sehpaları ve duvar askı aparatları.",
      en: "Extinguisher stands and wall brackets.",
    },
    description: {
      tr: [
        "Yangın tüpünün kolayca görülebilir ve ulaşılabilir bir noktada sabit durması, ilk müdahalenin hızını doğrudan etkiler. Sehpa ve duvar askı aparatları, cihazın devrilmesini ve yerinden oynamasını önler.",
      ],
      en: [
        "Keeping an extinguisher fixed in a visible, reachable place directly affects how quickly someone can use it. Stands and wall brackets stop the unit from tipping over or being moved.",
      ],
    },
  },
  {
    slug: "trafik-setleri-ve-ilk-yardim",
    line: "fire",
    icon: "firstAid",
    name: { tr: "Trafik Setleri ve İlk Yardım", en: "Vehicle Safety Kits and First Aid" },
    summary: {
      tr: "Araç trafik setleri, ilk yardım çantaları ve ecza dolapları.",
      en: "Vehicle safety kits, first aid kits and medicine cabinets.",
    },
    description: {
      tr: [
        "Araçlarda bulundurulması gereken trafik setleri ile iş yerleri için ilk yardım çantaları ve ecza dolaplarını sunuyoruz.",
        "İçerik listesi ilgili mevzuata göre değişebileceği için güncel gereksinimleri teklif aşamasında birlikte kontrol ediyoruz.",
      ],
      en: [
        "We supply vehicle safety kits as well as first aid kits and medicine cabinets for workplaces.",
        "Since required contents can change with regulations, we check the current requirements with you when preparing the quote.",
      ],
    },
  },
];
