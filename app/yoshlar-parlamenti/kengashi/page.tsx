import Image from "next/image"

export default function YoshlarParlamentiKengashi() {
  const councilMembers = [
    {
      id: 1,
      name: "Alisher Karimov",
      position: "Yoshlar parlamenti raisi",
      image: "/placeholder.svg?height=200&width=200&text=Alisher",
    },
    {
      id: 2,
      name: "Malika Rahimova",
      position: "Yoshlar parlamenti rais o'rinbosari",
      image: "/placeholder.svg?height=200&width=200&text=Malika",
    },
    {
      id: 3,
      name: "Bobur Toshmatov",
      position: "Yoshlar parlamenti kotibi",
      image: "/placeholder.svg?height=200&width=200&text=Bobur",
    },
    {
      id: 4,
      name: "Dilshod Ahmedov",
      position: "Ta'lim va fan qo'mitasi raisi",
      image: "/placeholder.svg?height=200&width=200&text=Dilshod",
    },
    {
      id: 5,
      name: "Nilufar Karimova",
      position: "Madaniyat va sport qo'mitasi raisi",
      image: "/placeholder.svg?height=200&width=200&text=Nilufar",
    },
    {
      id: 6,
      name: "Jahongir Rasulov",
      position: "Innovatsion rivojlanish qo'mitasi raisi",
      image: "/placeholder.svg?height=200&width=200&text=Jahongir",
    },
    {
      id: 7,
      name: "Zarina Umarova",
      position: "Ijtimoiy masalalar qo'mitasi raisi",
      image: "/placeholder.svg?height=200&width=200&text=Zarina",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Yoshlar parlament Kengashi</h1>
          <p className="text-lg max-w-3xl">O'zbekiston Respublikasi Yoshlar parlamenti Kengashi haqida ma'lumot</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Yoshlar parlamenti Kengashi haqida</h2>
          <p className="text-gray-700 mb-4">
            O'zbekiston Respublikasi Yoshlar parlamenti Kengashi Yoshlar parlamentining kollegial boshqaruv organi
            hisoblanadi. Kengash Yoshlar parlamenti raisi, rais o'rinbosari, kotibi va qo'mitalar raislaridan iborat.
          </p>
          <p className="text-gray-700 mb-4">
            Yoshlar parlamenti Kengashi Yoshlar parlamenti faoliyatini tashkil etish, uning oldida turgan vazifalarni
            bajarish, qo'mitalar faoliyatini muvofiqlashtirish va Yoshlar parlamenti majlislarini tayyorlash bilan
            shug'ullanadi.
          </p>
          <div className="flex items-center justify-center my-8">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600&text=Yoshlar+Parlamenti+Kengashi"
                alt="Yoshlar Parlamenti Kengashi"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-gray-700">
            Yoshlar parlamenti Kengashi har oyda kamida bir marta yig'iladi va Yoshlar parlamenti faoliyatiga doir
            masalalarni muhokama qiladi. Kengash qarorlari Yoshlar parlamenti a'zolari uchun majburiy hisoblanadi.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Kengash a'zolari</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {councilMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-[200px] w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
