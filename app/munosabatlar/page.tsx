import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react"

export default function Munosabatlar() {
  const relations = [
    {
      id: 1,
      title: "Yoshlar parlamenti va ta'lim tizimi: hamkorlik istiqbollari",
      date: "15.02.2025",
      author: "Alisher Karimov",
      position: "Yoshlar parlamenti raisi",
      image: "/placeholder.svg?height=200&width=400&text=Relation+1",
      description:
        "Ushbu maqolada Yoshlar parlamenti va ta'lim tizimi o'rtasidagi hamkorlik, uning istiqbollari, ta'lim sohasidagi islohotlarda yoshlarning ishtiroki haqida so'z yuritiladi. Yoshlar parlamenti ta'lim sohasidagi islohotlarda faol ishtirok etmoqda.",
    },
    {
      id: 2,
      title: "Yoshlar parlamenti va yoshlar bandligi: muammolar va yechimlar",
      date: "10.02.2025",
      author: "Malika Rahimova",
      position: "Yoshlar parlamenti rais o'rinbosari",
      image: "/placeholder.svg?height=200&width=400&text=Relation+2",
      description:
        "Ushbu maqolada yoshlar bandligi masalalari, mavjud muammolar va ularning yechimlari, Yoshlar parlamentining bu boradagi faoliyati haqida so'z yuritiladi. Yoshlar parlamenti yoshlar bandligini ta'minlash masalasiga alohida e'tibor qaratmoqda.",
    },
    {
      id: 3,
      title: "Yoshlar parlamenti va yoshlar tadbirkorligi: imkoniyatlar va istiqbollar",
      date: "05.02.2025",
      author: "Bobur Toshmatov",
      position: "Yoshlar parlamenti kotibi",
      image: "/placeholder.svg?height=200&width=400&text=Relation+3",
      description:
        "Ushbu maqolada yoshlar tadbirkorligi, mavjud imkoniyatlar va istiqbollar, Yoshlar parlamentining bu boradagi faoliyati haqida so'z yuritiladi. Yoshlar parlamenti yoshlar tadbirkorligini rivojlantirish uchun qator takliflarni ishlab chiqqan.",
    },
    {
      id: 4,
      title: "Yoshlar parlamenti va yoshlar huquqlari: himoya mexanizmlari",
      date: "01.02.2025",
      author: "Dilshod Ahmedov",
      position: "Ta'lim va fan qo'mitasi raisi",
      image: "/placeholder.svg?height=200&width=400&text=Relation+4",
      description:
        "Ushbu maqolada yoshlar huquqlari, ularni himoya qilish mexanizmlari, Yoshlar parlamentining bu boradagi faoliyati haqida so'z yuritiladi. Yoshlar parlamenti yoshlar huquqlarini himoya qilish masalasiga alohida e'tibor qaratmoqda.",
    },
    {
      id: 5,
      title: "Yoshlar parlamenti va yoshlar siyosati: yangi bosqich",
      date: "25.01.2025",
      author: "Nilufar Karimova",
      position: "Madaniyat va sport qo'mitasi raisi",
      image: "/placeholder.svg?height=200&width=400&text=Relation+5",
      description:
        "Ushbu maqolada yoshlar siyosati, uning yangi bosqichi, Yoshlar parlamentining bu boradagi faoliyati haqida so'z yuritiladi. Yoshlar parlamenti yoshlar siyosatini yanada takomillashtirish uchun qator takliflarni ishlab chiqqan.",
    },
    {
      id: 6,
      title: "Yoshlar parlamenti va yoshlar innovatsiyalari: qo'llab-quvvatlash mexanizmlari",
      date: "20.01.2025",
      author: "Jahongir Rasulov",
      position: "Innovatsion rivojlanish qo'mitasi raisi",
      image: "/placeholder.svg?height=200&width=400&text=Relation+6",
      description:
        "Ushbu maqolada yoshlar innovatsiyalari, ularni qo'llab-quvvatlash mexanizmlari, Yoshlar parlamentining bu boradagi faoliyati haqida so'z yuritiladi. Yoshlar parlamenti yoshlar innovatsiyalarini qo'llab-quvvatlash uchun qator takliflarni ishlab chiqqan.",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Munosabatlar</h1>
          <p className="text-lg max-w-3xl">O'zbekiston Respublikasi Yoshlar parlamenti a'zolarining munosabatlari</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relations.map((relation) => (
            <div key={relation.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-[200px] w-full">
                <Image src={relation.image || "/placeholder.svg"} alt={relation.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{relation.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{relation.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{relation.description}</p>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                    <span className="font-bold text-gray-700">{relation.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{relation.author}</p>
                    <p className="text-sm text-gray-500">{relation.position}</p>
                  </div>
                </div>
                <Link
                  href={`/munosabatlar/${relation.id}`}
                  className="text-blue-600 hover:underline flex items-center text-sm font-medium"
                >
                  Batafsil o'qish <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav className="flex items-center">
            <button className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100">&laquo; Oldingi</button>
            <button className="px-3 py-1 border-t border-b border-gray-300 bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100">Keyingi &raquo;</button>
          </nav>
        </div>
      </section>
    </main>
  )
}
