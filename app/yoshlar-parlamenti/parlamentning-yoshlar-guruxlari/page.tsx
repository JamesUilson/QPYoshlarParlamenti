import Party from "@/components/page-components/Party";
import RightSidebar from "@/components/page-components/RightSidebar";

const parties = [
  {
    id: 1,
    name: "Tadbirkorlar va ishbilarmonlar harakati - O'zbekiston Liberal-Demokratik partiyasining fraksiyasi",
    image: "/images/parties/ozlidep.png",
    link: "#",
  },
  {
    id: 2,
    name: "O'zbekiston «Milliy tiklanish» demokratik partiyasining fraksiyasi",
    image: "/images/parties/milliy.png",
    link: "#",
  },
  {
    id: 3,
    name: "O'zbekiston «Adolat» sotsial-demokratik partiyasining fraksiyasi",
    image: "/images/parties/adolat.png",
    link: "#",
  },
  {
    id: 4,
    name: "O'zbekiston Xalq demokratik partiyasining fraksiyasi",
    image: "/images/parties/xalq.png",
    link: "#",
  },
  {
    id: 5,
    name: "O'zbekiston Ekologik partiyasining fraksiyasi",
    image: "/images/parties/ekologiya.png",
    link: "#",
  },
];

export default function ParlamentningYoshlarGuruxlari() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">
            Parlamentning yoshlar guruhlari
          </h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi Parlamentning yoshlar guruhlari haqida
            ma'lumot
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto flex md:flex-row flex-col md:justify-evenly lg:gap-0 gap-4 px-4 py-8">
        <div className="flex md:flex-row md:gap-5 lg:gap-0 flex-col-reverse">
          <div className="flex flex-col gap-4">
            {parties.map((party) => (
              <Party key={party.id} party={party} />
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-sm mb-5 lg:mb-0 p-6 mx-0 lg:mx-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Yoshlar parlamentidagi siyosiy partiyalarning yoshlar guruhlari
            </h2>
            <p className="text-gray-700 mb-4">
              Ushbu yoshlar guruhlari siyosiy partiyadan ko'rsatiladigan deputatlar tomonidan
              partiya manfaatlarini Qonunchilik palatasida ifodalash maqsadida
              tuziladigan deputatlar birlashmasidir. Qonunchilik palatasining
              kamida besh nafar deputati fraksiya tuzish huquqiga ega.
              Qonunchilik palatasining deputati qaysi siyosiy partiyadan
              ko'rsatilgan va Qonunchilik palatasiga saylangan bo'lsa, faqat shu
              partiya fraksiyasining a'zosi bo'lishi mumkin. Qonunchilik
              palatasida ko'pchilik o'rinni egallagan fraksiya parlamentdagi
              ko'pchilikni tashkil etadi. O'z dasturiy maqsadli vazifalarining
              yaqinligidan yoki mosligidan kelib chiqqan holda blok tuzadigan
              bir nechta fraksiyalar parlamentdagi ko'pchilikni tashkil etishi
              mumkin. Yangitdan shakllantirilgan hukumatning tutgan yo'li va
              dasturiga yoki uning ayrim yo'nalishlariga qo'shilmaydigan
              fraksiyalar o'zlarini muxolifat deb e'lon qilishi mumkin.
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Yoshlar guruhlari:</span> <br />
              Qonunchilik palatasi majlisining kun tartibi, muhokama
              qilinayotgan masalalarni ko'rib chiqish tartibi va mohiyati
              yuzasidan takliflar hamda fikr-mulohazalar kiritadi; Qonunchilik
              palatasi majlisida muhokama qilinayotgan har bir masala yuzasidan
              muzokaralarda fraksiya vakiliga kafolatlangan tarzda so'z
              berilishi huquqidan foydalanadi; Qonunchilik palatasi muhokamasiga
              qo'yilgan qonun loyihalari, qonunchilik takliflari va boshqa
              qarorlar loyihalari yuzasidan o'z takliflarni kiritadi,
              Qonunchilik palatasining Kengashi, qo'mitalari va komissiyalari
              ishida ishtirok etadi, kelishuv komissiyasi va boshqa komissiyalar
              tuzish to'g'risida masala qo'yadi; Qonunchilik palatasi majlisida
              davlat hokimiyati organlarining va respublika ijro etuvchi
              hokimiyat organlarining mansabdor shaxslariga ularning tasarrufiga
              kiradigan masalalar yuzasidan asoslantirilgan tushuntirish berish
              yoki o'z nuqtai nazarini bayon etish talabi bilan murojaat etadi,
              hukumat a'zolarini palata majlisida eshitish to'g'risida masala
              qo'yadi.
            </p>
          </div>
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
