import type { Localized, Service } from "./types";

const L = (tr: string, en: string): Localized => ({ tr, en });

export const services: Service[] = [
  {
    slug: "ucretsiz-kesif",
    icon: "survey",
    name: L("Ücretsiz Keşif", "Free Site Survey"),
    summary: L(
      "Mekânınızı yerinde inceleyip ihtiyacınız olan cihaz ve sistemleri birlikte belirliyoruz.",
      "We visit your premises and work out together which equipment and systems you need.",
    ),
    seoTitle: L("Ücretsiz Yangın Güvenliği Keşfi – İstanbul", "Free Fire Safety Site Survey in Istanbul"),
    seoDescription: L(
      "İstanbul genelinde ücretsiz yangın güvenliği keşfi: cihaz sayısı, tipi ve yerleşimi için yerinde inceleme ve net teklif.",
      "Free fire safety site survey across Istanbul: on-site review of extinguisher types, quantities and placement, followed by a clear quote.",
    ),
    intro: {
      tr: [
        "Doğru yangın güvenliği, doğru tespitle başlar. Ücretsiz keşif hizmetimizde uzman ekibimiz iş yerinizi, deponuzu ya da binanızı yerinde inceler; yangın risklerini, mevcut ekipmanın durumunu ve eksikleri sizinle birlikte değerlendirir.",
        "Keşif sonunda hangi tip ve kaç adet cihaza ihtiyaç duyduğunuzu, nereye konumlandırılması gerektiğini ve varsa sistem ihtiyaçlarını içeren net bir teklif hazırlıyoruz. Keşif için herhangi bir ücret ya da satın alma zorunluluğu yoktur.",
      ],
      en: [
        "Good fire safety starts with an accurate assessment. During a free site survey our team visits your workplace, warehouse or building, reviews fire risks and the condition of existing equipment, and walks you through any gaps.",
        "Afterwards we prepare a clear quote covering the type and number of extinguishers you need, where they should go and any system requirements. There is no charge for the survey and no obligation to buy.",
      ],
    },
    sections: [
      {
        heading: L("Keşifte neleri inceliyoruz?", "What we look at"),
        body: {
          tr: [
            "Alanın kullanım amacı, yangın yükü ve bulunan yanıcı madde türleri; mevcut yangın tüplerinin tipi, sayısı, dolum ve bakım tarihleri; yangın dolapları, algılama ve söndürme sistemlerinin durumu; kaçış yolları, yönlendirme levhaları ve acil aydınlatma.",
          ],
          en: [
            "How the space is used, its fire load and the types of combustibles present; the type, number and service dates of existing extinguishers; the condition of hose cabinets, detection and suppression systems; escape routes, signage and emergency lighting.",
          ],
        },
      },
      {
        heading: L("Hangi bölgelerde hizmet veriyoruz?", "Where we work"),
        body: {
          tr: [
            "Yenibosna'daki tesisimizden İstanbul genelinde keşif yapıyoruz. Bahçelievler, Bakırköy, Küçükçekmece, Esenyurt ve Başakşehir gibi yakın ilçelerde randevuları genellikle daha kısa sürede planlayabiliyoruz.",
          ],
          en: [
            "We carry out surveys across Istanbul from our facility in Yenibosna. In nearby districts such as Bahçelievler, Bakırköy, Küçükçekmece, Esenyurt and Başakşehir we can usually schedule visits sooner.",
          ],
        },
      },
    ],
    includes: {
      tr: [
        "Yerinde risk ve ekipman değerlendirmesi",
        "Cihaz tipi, adedi ve yerleşim önerisi",
        "Mevcut cihazların dolum ve bakım durumu kontrolü",
        "Yazılı ve net fiyat teklifi",
      ],
      en: [
        "On-site risk and equipment assessment",
        "Recommended extinguisher types, quantities and positions",
        "Service status check of existing equipment",
        "A clear written quote",
      ],
    },
    relatedCategories: ["yangin-sondurme-cihazlari", "yangin-dolaplari", "acil-aydinlatma-ve-yonlendirme"],
  },
  {
    slug: "dolum-ve-bakim",
    icon: "refill",
    name: L("Yangın Tüpü Dolumu ve Bakımı", "Extinguisher Refilling and Servicing"),
    summary: L(
      "Yangın tüplerinizin periyodik bakımını, dolumunu ve takibini düzenli olarak yapıyoruz.",
      "We service, refill and track your extinguishers on a regular schedule.",
    ),
    seoTitle: L("Yangın Tüpü Dolumu ve Bakımı – İstanbul", "Fire Extinguisher Refilling in Istanbul"),
    seoDescription: L(
      "İstanbul'da yangın tüpü dolumu ve periyodik bakım: kendi tesisimizde dolum, kontrol etiketi ve bakım takibi. Ücretsiz keşif için arayın.",
      "Fire extinguisher refilling and periodic servicing in Istanbul, done in our own facility with service labels and maintenance tracking.",
    ),
    intro: {
      tr: [
        "Bir yangın tüpü ancak ihtiyaç anında çalışırsa işe yarar. Zamanla basınç kaybı, söndürücü maddenin topaklanması veya valf arızası gibi sorunlar ortaya çıkabilir; bu nedenle cihazların düzenli aralıklarla kontrol edilmesi ve gerektiğinde dolumunun yapılması gerekir.",
        "Yangın tüpü dolumunu Yenibosna'daki kendi tesisimizde yapıyoruz. Bakımı yapılan her cihaza kontrol tarihini ve bir sonraki bakım zamanını gösteren etiket uyguluyor, kurumsal müşterilerimiz için bakım tarihlerini takip ederek zamanı geldiğinde hatırlatıyoruz.",
      ],
      en: [
        "An extinguisher is only useful if it works when needed. Over time it can lose pressure, the agent can cake or a valve can fail, so units need regular inspection and refilling when required.",
        "We refill extinguishers in our own facility in Yenibosna. Every serviced unit gets a label showing the inspection date and next service date, and for business customers we track due dates and remind you when it is time.",
      ],
    },
    sections: [
      {
        heading: L("Ne sıklıkla bakım gerekir?", "How often is servicing needed?"),
        body: {
          tr: [
            "Genel uygulama, cihazların en az yılda bir kez yetkili bir servis tarafından kontrol edilmesidir. Kullanılan ya da basıncı düşen cihazların ise beklemeden dolumu yapılmalıdır. Dolum ve hidrostatik test periyotları cihaz tipine ve ilgili standarda göre değişir; ayrıntılar için blog yazımıza göz atabilirsiniz.",
          ],
          en: [
            "As a rule, extinguishers should be inspected by an authorised service at least once a year. Any unit that has been used or has lost pressure should be refilled straight away. Refill and hydrostatic test intervals depend on the extinguisher type and the applicable standard; see our blog post for details.",
          ],
        },
      },
      {
        heading: L("Bakım sürecinde neler yapılır?", "What servicing involves"),
        body: {
          tr: [
            "Gövde ve bağlantı parçalarının görsel kontrolü, manometre ve basınç kontrolü, hortum ve valf kontrolü, gerekiyorsa söndürücü maddenin yenilenmesi ve yeniden basınçlandırma, mühür ve kontrol etiketinin yenilenmesi.",
          ],
          en: [
            "Visual check of the body and fittings, gauge and pressure check, hose and valve inspection, agent replacement and re-pressurisation where needed, and a new tamper seal and service label.",
          ],
        },
      },
    ],
    includes: {
      tr: [
        "Kendi tesisimizde dolum",
        "Basınç, valf ve hortum kontrolü",
        "Bakım tarihi etiketi ve mühür",
        "Kurumsal müşteriler için periyodik bakım takibi",
      ],
      en: [
        "Refilling in our own facility",
        "Pressure, valve and hose checks",
        "Service label and tamper seal",
        "Scheduled maintenance tracking for businesses",
      ],
    },
    relatedCategories: ["yangin-sondurme-cihazlari", "yangin-tupu-aksesuarlari"],
  },
  {
    slug: "itfaiye-ruhsati",
    icon: "permit",
    name: L("İtfaiye Ruhsatı Danışmanlığı", "Fire Permit Support"),
    summary: L(
      "İtfaiye uygunluk raporu sürecinde gereken ekipmanı ve düzenlemeleri eksiksiz hazırlamanıza yardımcı oluyoruz.",
      "We help you get the equipment and arrangements in place for a fire department compliance report.",
    ),
    seoTitle: L("İtfaiye Ruhsatı Danışmanlığı – İstanbul", "Fire Department Permit Support in Istanbul"),
    seoDescription: L(
      "İtfaiye ruhsatı (uygunluk raporu) öncesi yerinde ön kontrol, eksik ekipman tespiti, temin ve montaj. İstanbul genelinde hizmet.",
      "Pre-inspection checks, missing equipment, supply and installation before your fire department compliance inspection in Istanbul.",
    ),
    intro: {
      tr: [
        "İş yeri açma ve çalışma ruhsatı süreçlerinde pek çok işletmeden itfaiye uygunluk raporu istenir. Rapor için yapılan denetimde yangın söndürme cihazları, yönlendirme levhaları, acil aydınlatma ve gerekli durumlarda algılama veya söndürme sistemleri kontrol edilir.",
        "Denetimden önce iş yerinizi yerinde inceleyerek eksikleri tespit ediyor, gerekli ekipmanı temin edip montajını yapıyoruz. Böylece denetime hazırlıklı girmenize yardımcı oluyoruz.",
      ],
      en: [
        "Many businesses need a fire department compliance report as part of their operating licence. The inspection covers extinguishers, signage, emergency lighting and, where required, detection or suppression systems.",
        "Before the inspection we visit your premises, identify what is missing, then supply and install the required equipment so you go into the inspection prepared.",
      ],
    },
    sections: [
      {
        heading: L("Süreç nasıl işler?", "How it works"),
        body: {
          tr: [
            "Başvuru ve denetim, ilgili belediyenin itfaiye birimi tarafından yürütülür. Biz başvurunuzdan önce ön kontrol yapar, eksik ekipmanı tamamlar ve gerekli belgeleri (ör. cihazların bakım kayıtları) hazırlamanıza destek oluruz. Başvuru adımları ve istenen belgeler belediyeye ve işletme türüne göre değişebilir.",
          ],
          en: [
            "Applications and inspections are handled by the fire department of the relevant municipality. Before you apply, we carry out a pre-check, complete any missing equipment and help you prepare supporting documents such as equipment service records. Steps and required documents can vary by municipality and type of business.",
          ],
        },
      },
    ],
    includes: {
      tr: [
        "Denetim öncesi yerinde ön kontrol",
        "Eksik ekipman listesi ve teklif",
        "Cihaz, levha ve acil aydınlatma montajı",
        "Bakım kayıtları ve belgeler için destek",
      ],
      en: [
        "On-site pre-inspection check",
        "List of missing equipment and a quote",
        "Installation of extinguishers, signs and emergency lighting",
        "Help with service records and documents",
      ],
    },
    relatedCategories: ["yangin-sondurme-cihazlari", "acil-aydinlatma-ve-yonlendirme", "fosforlu-levhalar"],
  },
  {
    slug: "yangin-tatbikati",
    icon: "drill",
    name: L("Yangın Tatbikatı ve Eğitim", "Fire Drills and Training"),
    summary: L(
      "Çalışanlarınızın yangın tüpünü doğru kullanmasını ve tahliyeyi güvenle yapmasını sağlayan uygulamalı tatbikatlar.",
      "Hands-on drills so your staff can use extinguishers correctly and evacuate safely.",
    ),
    seoTitle: L("Yangın Tatbikatı ve Söndürme Eğitimi", "Fire Drills and Extinguisher Training"),
    seoDescription: L(
      "İş yerinize özel yangın tatbikatı ve uygulamalı yangın tüpü kullanım eğitimi. Tahliye planı ve acil durum ekipleri için destek.",
      "On-site fire drills and hands-on extinguisher training tailored to your workplace, with support for evacuation plans and emergency teams.",
    ),
    intro: {
      tr: [
        "En iyi ekipman bile kullanılmayı bilinmediğinde işe yaramaz. Yangın tatbikatlarımızda çalışanlarınız, kontrollü bir ortamda yangın tüpünü bizzat kullanarak pratik kazanır; tahliye adımlarını ve toplanma alanını uygulamalı olarak öğrenir.",
        "Tatbikatı iş yerinizin yapısına, çalışan sayısına ve risklerine göre planlıyor, sonrasında gözlemlerimizi ve iyileştirme önerilerimizi sizinle paylaşıyoruz.",
      ],
      en: [
        "Even the best equipment is useless if no one knows how to use it. In our drills your staff practise with real extinguishers in a controlled setting and walk through the evacuation steps and assembly point.",
        "We plan each drill around your building, headcount and risks, then share our observations and recommendations afterwards.",
      ],
    },
    sections: [
      {
        heading: L("Tatbikat içeriği", "What a drill covers"),
        body: {
          tr: [
            "Yangın sınıfları ve doğru cihaz seçimi, yangın tüpünün kullanım adımları, kontrollü ortamda uygulamalı söndürme, tahliye ve toplanma alanı uygulaması, tatbikat sonrası değerlendirme.",
          ],
          en: [
            "Fire classes and choosing the right extinguisher, the steps for using an extinguisher, hands-on practice in a controlled setting, evacuation and assembly point practice, and a debrief afterwards.",
          ],
        },
      },
    ],
    includes: {
      tr: [
        "İş yerine özel tatbikat planı",
        "Uygulamalı yangın tüpü kullanımı",
        "Tahliye ve toplanma alanı uygulaması",
        "Tatbikat sonrası değerlendirme notları",
      ],
      en: [
        "A drill plan tailored to your site",
        "Hands-on extinguisher use",
        "Evacuation and assembly point practice",
        "Post-drill observations and notes",
      ],
    },
    // TODO: doğrulanmalı — tatbikat sonunda katılım belgesi/sertifika verilip verilmediği.
    relatedCategories: ["yangin-sondurme-cihazlari"],
  },
  {
    slug: "davlumbaz-sondurme-sistemleri",
    icon: "kitchen",
    name: L("Davlumbaz Söndürme Sistemleri", "Kitchen Hood Suppression"),
    summary: L(
      "Restoran ve otel mutfakları için davlumbaz söndürme sistemi kurulumu ve periyodik bakımı.",
      "Installation and periodic maintenance of hood suppression systems for restaurant and hotel kitchens.",
    ),
    seoTitle: L("Davlumbaz Söndürme Sistemi – Kurulum ve Bakım", "Kitchen Hood Suppression Systems Istanbul"),
    seoDescription: L(
      "Restoran, otel ve yemekhaneler için davlumbaz söndürme sistemi: keşif, projelendirme, kurulum ve periyodik bakım. İstanbul genelinde.",
      "Kitchen hood fire suppression for restaurants, hotels and canteens in Istanbul: survey, design, installation and periodic maintenance.",
    ),
    intro: {
      tr: [
        "Ticari mutfaklardaki yangınların önemli bir bölümü ocak, fritöz ve davlumbaz kanalında biriken yağlardan kaynaklanır. Bu yangınlar çok hızlı yayılabilir ve suyla söndürülmeye çalışıldığında daha da büyüyebilir.",
        "Davlumbaz söndürme sistemi, pişirme alanını sürekli izler; yangın algılandığında ıslak kimyasal söndürücü maddeyi doğrudan ocak, fritöz ve kanal içine püskürtür ve gaz vanasını otomatik olarak kapatabilir. Keşiften kuruluma ve periyodik bakıma kadar tüm süreci üstleniyoruz.",
      ],
      en: [
        "A large share of commercial kitchen fires start on cooktops, fryers and grease build-up in hood ducts. These fires spread fast and can grow violently if someone tries to put them out with water.",
        "A hood suppression system watches the cooking line continuously. When it detects fire it discharges wet chemical agent directly onto the appliances and into the duct, and can shut off the gas supply automatically. We handle everything from the survey to installation and periodic maintenance.",
      ],
    },
    sections: [
      {
        heading: L("Kimler için gerekli?", "Who needs it"),
        body: {
          tr: [
            "Restoranlar, oteller, hastane ve fabrika yemekhaneleri, okul mutfakları ve AVM yemek alanları gibi profesyonel pişirme yapılan tüm mekânlar için önerilir. Sistem kapasitesi; ocak ve fritöz sayısına, davlumbaz ve kanal ölçülerine göre belirlenir.",
          ],
          en: [
            "Recommended for any professional cooking area: restaurants, hotels, hospital and factory canteens, school kitchens and shopping centre food courts. System capacity is based on the number of appliances and the size of the hood and duct.",
          ],
        },
      },
      {
        heading: L("Bakım neden önemli?", "Why maintenance matters"),
        body: {
          tr: [
            "Algılama elemanları ve nozullar zamanla yağ ile kaplanabilir. Sistemin ihtiyaç anında doğru çalışması için periyodik kontrol ve bakım şarttır; bakım takvimini sizin için takip ediyoruz.",
          ],
          en: [
            "Detection elements and nozzles can become coated with grease over time. Periodic inspection and maintenance are essential for the system to work when needed, and we keep track of the schedule for you.",
          ],
        },
      },
    ],
    includes: {
      tr: [
        "Mutfakta ücretsiz keşif ve kapasite hesabı",
        "Islak kimyasal söndürme sistemi kurulumu",
        "Gaz kesme entegrasyonu",
        "Periyodik bakım ve kontrol",
      ],
      en: [
        "Free kitchen survey and capacity calculation",
        "Wet chemical system installation",
        "Gas shut-off integration",
        "Periodic inspection and maintenance",
      ],
    },
    relatedCategories: ["sondurme-sistemleri"],
  },
];
