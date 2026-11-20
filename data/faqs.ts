import type { Faq, Localized, Sector } from "./types";

const L = (tr: string, en: string): Localized => ({ tr, en });

export const homeFaqs: Faq[] = [
  {
    question: L("Yangın tüpü ne sıklıkla kontrol edilmeli?", "How often should extinguishers be inspected?"),
    // TODO: doğrulanmalı — güncel mevzuat ve TS ISO 11602-2 periyotları.
    answer: L(
      "Genel uygulama, yangın tüplerinin en az yılda bir kez yetkili servis tarafından kontrol edilmesidir. Bunun yanında manometrenin yeşil bölgede olduğunu, mührün sağlam olduğunu ve cihazın yerinde durduğunu ayda bir kendiniz kontrol etmenizi öneririz. Kullanılan cihazın ise hemen dolumu yapılmalıdır.",
      "As a rule, extinguishers should be inspected by an authorised service at least once a year. We also recommend a quick monthly check of your own: the gauge needle is in the green, the seal is intact and the unit is in its place. Any extinguisher that has been used should be refilled straight away.",
    ),
  },
  {
    question: L("Ücretsiz keşif neyi kapsıyor, bir ücret ödüyor muyum?", "What does the free survey include, and is there a cost?"),
    answer: L(
      "Keşifte mekânınızı yerinde inceleyip ihtiyaç duyduğunuz cihaz tipini, adedini ve yerleşimini belirliyor, mevcut ekipmanınızın durumunu kontrol ediyoruz. Keşif ücretsizdir ve satın alma zorunluluğu yoktur.",
      "We visit your premises, work out the type, number and placement of the equipment you need and check the condition of what you already have. The survey is free and there is no obligation to buy.",
    ),
  },
  {
    question: L("Neden sitede fiyat göremiyorum?", "Why aren't prices shown on the website?"),
    answer: L(
      "Fiyat; cihaz tipine, adedine, montaj ihtiyacına ve bakım planına göre değişiyor. Size gerçekten uygun olan çözümü önermek için ihtiyacınızı dinleyip net bir teklif hazırlıyoruz. Teklif formunu doldurmanız ya da bizi aramanız yeterli.",
      "Prices depend on the type and number of units, installation needs and the maintenance plan. To recommend what genuinely fits, we listen to your needs and prepare a clear quote. Just fill in the quote form or give us a call.",
    ),
  },
  {
    question: L("İtfaiye ruhsatı sürecinde yardımcı oluyor musunuz?", "Can you help with the fire department permit?"),
    answer: L(
      "Evet. Denetimden önce iş yerinizi inceleyip eksik ekipmanı tespit ediyor, temin ve montajını yapıyor, bakım kayıtları gibi belgeleri hazırlamanıza destek oluyoruz. Başvuru ve denetim ilgili belediyenin itfaiye birimi tarafından yapılır.",
      "Yes. Before the inspection we review your premises, identify missing equipment, supply and install it, and help you prepare documents such as service records. The application and inspection are handled by the local municipality's fire department.",
    ),
  },
  {
    question: L("Hangi bölgelere hizmet veriyorsunuz?", "Which areas do you cover?"),
    answer: L(
      "Yenibosna'daki tesisimizden İstanbul'un tamamına hizmet veriyoruz. Bahçelievler, Bakırköy, Küçükçekmece, Esenyurt ve Başakşehir gibi yakın ilçelerde keşif ve servis randevularını genellikle daha kısa sürede planlayabiliyoruz.",
      "We serve all of Istanbul from our facility in Yenibosna. In nearby districts such as Bahçelievler, Bakırköy, Küçükçekmece, Esenyurt and Başakşehir we can usually schedule surveys and service visits sooner.",
    ),
  },
  {
    question: L("Restoran mutfağım için hangi önlemler gerekli?", "What does a restaurant kitchen need?"),
    answer: L(
      "Ticari mutfaklarda pişirme yağı yangınlarına karşı davlumbaz söndürme sistemi en etkili önlemdir. Buna ek olarak mutfakta yangın battaniyesi ve uygun tipte taşınabilir söndürücü bulundurulmalıdır. Ücretsiz keşifte mutfağınıza uygun kapasiteyi belirleyebiliriz.",
      "For commercial kitchens, a hood suppression system is the most effective protection against cooking oil fires, backed up by a fire blanket and a suitable portable extinguisher. We can size the system for your kitchen during a free survey.",
    ),
  },
  {
    question: L("Ürünleriniz hangi belgelere sahip?", "What certifications do your products have?"),
    // TODO: doğrulanmalı — belge kapsamları ve geçerlilik tarihleri.
    answer: L(
      "Kendi tesisimizde ürettiğimiz yangın söndürme cihazları TSE belgelidir ve TS 862 EN3 standardına göre üretilir; ürünlerimizde CE işareti, firmamızda ISO 9001 kalite yönetim sistemi bulunur. Güncel belgelerin kopyalarını talep etmeniz hâlinde paylaşıyoruz.",
      "The extinguishers we manufacture in-house are TSE certified and produced to TS 862 EN3; our products carry CE marking and our company operates an ISO 9001 quality management system. We are happy to share copies of current certificates on request.",
    ),
  },
  {
    question: L("Mevcut cihazlarımın dolumunu yapıyor musunuz?", "Do you refill extinguishers I already own?"),
    answer: L(
      "Evet, yangın tüpü dolumu ve bakımını Yenibosna'daki tesisimizde yapıyoruz. Farklı marka ve tipteki cihazlar için uygunluğu cihazı gördükten sonra değerlendiriyoruz.",
      "Yes, we refill and service extinguishers at our facility in Yenibosna. For other brands and types we confirm suitability once we have seen the unit.",
    ),
  },
];

export const sectors: Sector[] = [
  {
    slug: "restoran",
    name: L("Restoran ve kafeler", "Restaurants and cafés"),
    note: L("Davlumbaz söndürme, yangın battaniyesi, K/F sınıfı uygun cihazlar", "Hood suppression, fire blankets, kitchen-rated extinguishers"),
  },
  {
    slug: "fabrika",
    name: L("Fabrika ve depolar", "Factories and warehouses"),
    note: L("Yüksek kapasiteli cihazlar, hidrant, algılama sistemleri", "High-capacity extinguishers, hydrants, detection"),
  },
  {
    slug: "otel",
    name: L("Oteller", "Hotels"),
    note: L("Adresli algılama, sprinkler, acil aydınlatma", "Addressable detection, sprinklers, emergency lighting"),
  },
  {
    slug: "avm",
    name: L("AVM ve mağazalar", "Shopping centres and retail"),
    note: L("Yangın dolapları, yönlendirme, nikelaj kaplama cihazlar", "Hose cabinets, wayfinding, chrome-finish extinguishers"),
  },
  {
    slug: "okul",
    name: L("Okullar", "Schools"),
    note: L("Periyodik bakım takibi, tatbikat ve eğitim", "Maintenance tracking, drills and training"),
  },
  {
    slug: "hastane",
    name: L("Hastaneler ve klinikler", "Hospitals and clinics"),
    note: L("CO2 ve gazlı sistemler, acil aydınlatma, tahliye planlaması", "CO2 and clean agent systems, emergency lighting, evacuation planning"),
  },
];
