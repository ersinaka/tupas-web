import type { Localized } from "./types";

/**
 * TODO: doğrulanmalı — Bu metinler şablon niteliğindedir ve yayından önce bir hukuk danışmanı
 * tarafından incelenmelidir (veri sorumlusu bilgileri, VERBİS kaydı, saklama süreleri vb.).
 */

export type LegalSection = { heading: Localized; body: Localized<string[]> };
export type LegalDoc = {
  key: "kvkk" | "gizlilik" | "cerez";
  title: Localized;
  description: Localized;
  updated: string;
  sections: LegalSection[];
};

const L = (tr: string, en: string): Localized => ({ tr, en });

export const legalDocs: Record<LegalDoc["key"], LegalDoc> = {
  kvkk: {
    key: "kvkk",
    title: L("KVKK Aydınlatma Metni", "KVKK Privacy Notice"),
    description: L(
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin nasıl işlendiğine ilişkin aydınlatma metni.",
      "Information on how we process your personal data under Turkish Personal Data Protection Law No. 6698 (KVKK).",
    ),
    updated: "2026-11-20",
    sections: [
      {
        heading: L("Veri sorumlusu", "Data controller"),
        body: {
          tr: [
            "Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca veri sorumlusu sıfatıyla Tüpaş Yangın Güvenlik Sistemleri (\"Tüpaş\") tarafından hazırlanmıştır.",
          ],
          en: [
            "This notice is issued by Tüpaş Yangın Güvenlik Sistemleri (\"Tüpaş\") as data controller under Turkish Personal Data Protection Law No. 6698 (\"KVKK\").",
          ],
        },
      },
      {
        heading: L("İşlenen kişisel veriler", "Personal data we process"),
        body: {
          tr: [
            "Teklif ve iletişim formları aracılığıyla ilettiğiniz ad-soyad, firma adı, telefon numarası, e-posta adresi, ilgilendiğiniz ürün veya hizmet ve mesaj içeriğiniz; ayrıca web sitesinin güvenli çalışması için gerekli teknik kayıtlar (IP adresi, tarayıcı bilgisi gibi).",
          ],
          en: [
            "Your name, company, phone number, e-mail address, the product or service you are interested in and your message, as submitted through our quote and contact forms; and technical logs required to operate the website securely (such as IP address and browser details).",
          ],
        },
      },
      {
        heading: L("İşleme amaçları ve hukuki sebep", "Purposes and legal basis"),
        body: {
          tr: [
            "Kişisel verileriniz; talebinize yanıt vermek, teklif hazırlamak, keşif randevusu planlamak ve sizinle iletişim kurmak amaçlarıyla, KVKK m.5/2-c (bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması) ve m.5/2-f (meşru menfaat) hukuki sebeplerine dayanılarak işlenir.",
          ],
          en: [
            "We process your data to respond to your request, prepare quotes, schedule site surveys and communicate with you, on the legal bases set out in KVKK Art. 5/2-c (necessary to enter into or perform a contract) and Art. 5/2-f (legitimate interest).",
          ],
        },
      },
      {
        heading: L("Aktarım", "Transfers"),
        body: {
          tr: [
            "Form bildirimleri, e-posta iletimi için hizmet aldığımız altyapı sağlayıcısı aracılığıyla iletilir. Bu sağlayıcının sunucuları yurt dışında bulunabilir. Verileriniz bunun dışında, yasal zorunluluklar haricinde üçüncü kişilerle paylaşılmaz.",
          ],
          en: [
            "Form submissions are delivered through the e-mail infrastructure provider we use, whose servers may be located abroad. Apart from this and any legal obligations, your data is not shared with third parties.",
          ],
        },
      },
      {
        heading: L("Haklarınız", "Your rights"),
        body: {
          tr: [
            "KVKK m.11 kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Taleplerinizi iletişim sayfamızdaki kanallar üzerinden bize iletebilirsiniz.",
          ],
          en: [
            "Under KVKK Art. 11 you have the right to learn whether your data is processed, request information, ask for correction or deletion and object to processing. You can send requests through the channels on our contact page.",
          ],
        },
      },
    ],
  },
  gizlilik: {
    key: "gizlilik",
    title: L("Gizlilik Politikası", "Privacy Policy"),
    description: L(
      "Tüpaş web sitesini kullanırken toplanan bilgiler ve bu bilgilerin nasıl korunduğu hakkında.",
      "What information is collected when you use the Tüpaş website and how it is protected.",
    ),
    updated: "2026-11-20",
    sections: [
      {
        heading: L("Topladığımız bilgiler", "Information we collect"),
        body: {
          tr: [
            "Web sitemizi ziyaret etmek için kişisel bilgi vermeniz gerekmez. Yalnızca teklif veya iletişim formunu doldurduğunuzda girdiğiniz bilgileri alırız.",
          ],
          en: [
            "You do not need to provide personal information to browse our website. We only receive the details you enter when you submit the quote or contact form.",
          ],
        },
      },
      {
        heading: L("Bilgilerin kullanımı", "How we use information"),
        body: {
          tr: [
            "İlettiğiniz bilgileri yalnızca talebinizi yanıtlamak için kullanırız; pazarlama listelerine eklemeyiz ve satmayız.",
          ],
          en: [
            "We use the information you send only to respond to your request. We do not add it to marketing lists and we do not sell it.",
          ],
        },
      },
      {
        heading: L("Güvenlik", "Security"),
        body: {
          tr: [
            "Site trafiği HTTPS ile şifrelenir. Form gönderimleri sunucu tarafında doğrulanır ve kötüye kullanıma karşı sınırlandırılır.",
          ],
          en: [
            "All traffic is encrypted with HTTPS. Form submissions are validated on the server and rate-limited to prevent abuse.",
          ],
        },
      },
      {
        heading: L("Üçüncü taraf hizmetler", "Third-party services"),
        body: {
          tr: [
            "İletişim sayfasındaki harita, yalnızca siz yüklemeyi seçtiğinizde Google Maps üzerinden gösterilir. Bu durumda Google'ın gizlilik politikası geçerlidir.",
          ],
          en: [
            "The map on our contact page is loaded from Google Maps only when you choose to load it. Google's privacy policy then applies.",
          ],
        },
      },
    ],
  },
  cerez: {
    key: "cerez",
    title: L("Çerez Politikası", "Cookie Policy"),
    description: L(
      "Tüpaş web sitesinde kullanılan çerezler ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgi.",
      "Which cookies the Tüpaş website uses and how you can manage your preferences.",
    ),
    updated: "2026-11-20",
    sections: [
      {
        heading: L("Zorunlu çerezler ve yerel depolama", "Essential cookies and local storage"),
        body: {
          tr: [
            "Sitemiz; dil tercihinizi (NEXT_LOCALE çerezi), tema tercihinizi ve çerez onay seçiminizi hatırlamak için zorunlu çerez ve tarayıcı yerel depolamasını kullanır. Bu kayıtlar sitenin çalışması için gereklidir ve kişisel profil oluşturmak için kullanılmaz.",
          ],
          en: [
            "Our site uses essential cookies and browser local storage to remember your language (NEXT_LOCALE cookie), theme and cookie consent choice. These are required for the site to work and are not used to build a personal profile.",
          ],
        },
      },
      {
        heading: L("Analitik ve pazarlama çerezleri", "Analytics and marketing cookies"),
        body: {
          tr: [
            "Şu anda analitik veya pazarlama amaçlı çerez kullanmıyoruz. İleride kullanılması hâlinde bu çerezler yalnızca onay vermeniz durumunda etkinleştirilecek ve bu politika güncellenecektir.",
          ],
          en: [
            "We do not currently use analytics or marketing cookies. If we introduce them, they will only be enabled with your consent and this policy will be updated.",
          ],
        },
      },
      {
        heading: L("Tercihlerinizi yönetme", "Managing your preferences"),
        body: {
          tr: [
            "Çerez tercihinizi sayfanın altındaki \"Çerez tercihleri\" bağlantısından istediğiniz zaman değiştirebilirsiniz. Tarayıcı ayarlarınızdan da çerezleri silebilir veya engelleyebilirsiniz.",
          ],
          en: [
            "You can change your choice at any time using the \"Cookie preferences\" link in the footer. You can also delete or block cookies in your browser settings.",
          ],
        },
      },
    ],
  },
};
