import Image from "next/image"
import Link from "next/link"
import { Globe, Users } from "lucide-react"

export default function DostlikGuruhlar() {
  const friendshipGroups = [
    {
      id: 1,
      country: "Rossiya",
      flag: "/placeholder.svg?height=60&width=100&text=RU",
      members: 15,
      chair: "Alisher Karimov",
      image: "/placeholder.svg?height=200&width=400&text=Rossiya",
      description:
        "O'zbekiston-Rossiya do'stlik guruhi 2019-yilda tashkil etilgan. Guruh Rossiya Federatsiyasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish bilan shug'ullanadi.",
    },
    {
      id: 2,
      country: "Turkiya",
      flag: "/placeholder.svg?height=60&width=100&text=TR",
      members: 12,
      chair: "Malika Rahimova",
      image: "/placeholder.svg?height=200&width=400&text=Turkiya",
      description:
        "O'zbekiston-Turkiya do'stlik guruhi 2019-yilda tashkil etilgan. Guruh Turkiya Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish bilan shug'ullanadi.",
    },
    {
      id: 3,
      country: "Xitoy",
      flag: "/placeholder.svg?height=60&width=100&text=CN",
      members: 10,
      chair: "Bobur Toshmatov",
      image: "/placeholder.svg?height=200&width=400&text=Xitoy",
      description:
        "O'zbekiston-Xitoy do'stlik guruhi 2020-yilda tashkil etilgan. Guruh Xitoy Xalq Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish bilan shug'ullanadi.",
    },
    {
      id: 4,
      country: "Koreya",
      flag: "/placeholder.svg?height=60&width=100&text=KR",
      members: 8,
      chair: "Dilshod Ahmedov",
      image: "/placeholder.svg?height=200&width=400&text=Koreya",
      description:
        "O'zbekiston-Koreya do'stlik guruhi 2020-yilda tashkil etilgan. Guruh Koreya Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish bilan shug'ullanadi.",
    },
    {
      id: 5,
      country: "Germaniya",
      flag: "/placeholder.svg?height=60&width=100&text=DE",
      members: 7,
      chair: "Nilufar Karimova",
      image: "/placeholder.svg?height=200&width=400&text=Germaniya",
      description:
        "O'zbekiston-Germaniya do'stlik guruhi 2021-yilda tashkil etilgan. Guruh Germaniya Federativ Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish bilan shug'ullanadi.",
    },
    {
      id: 6,
      country: "Fransiya",
      flag: "/placeholder.svg?height=60&width=100&text=FR",
      members: 6,
      chair: "Jahongir Rasulov",
      image: "/placeholder.svg?height=200&width=400&text=Fransiya",
      description:
        "O'zbekiston-Fransiya do'stlik guruhi 2021-yilda tashkil etilgan. Guruh Fransiya Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish bilan shug'ullanadi.",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Do'stlik guruhlar</h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi Yoshlar parlamenti do'stlik guruhlari haqida ma'lumot
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Do'stlik guruhlari haqida</h2>
          <p className="text-gray-700 mb-4">
            O'zbekiston Respublikasi Yoshlar parlamenti xorijiy mamlakatlar yoshlar tashkilotlari bilan hamkorlikni
            rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish maqsadida do'stlik guruhlarini
            tashkil etgan.
          </p>
          <div className="flex items-center justify-center my-8">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=600&text=Do'stlik+guruhlar"
                alt="Do'stlik guruhlar"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-gray-700">
            Do'stlik guruhlari Yoshlar parlamenti a'zolari tomonidan tashkil etiladi va ular oldida hisobot beradi.
            Guruhlar o'z faoliyatini Yoshlar parlamenti Kengashi rahbarligida amalga oshiradi.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Do'stlik guruhlari</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friendshipGroups.map((group) => (
            <Link
              key={group.id}
              href={`/xalqaro-munosabatlar/dostlik-guruhlar/${group.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-[200px] w-full">
                <Image
                  src={group.image || "/placeholder.svg"}
                  alt={`O'zbekiston-${group.country} do'stlik guruhi`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Image
                    src={group.flag || "/placeholder.svg"}
                    alt={`${group.country} bayrog'i`}
                    width={60}
                    height={40}
                    className="rounded-md shadow-md"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  O'zbekiston-{group.country} do'stlik guruhi
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <Users className="h-4 w-4 mr-2" />
                  <span>A'zolar soni: {group.members}</span>
                </div>
                <p className="text-gray-700 mb-3">Rais: {group.chair}</p>
                <p className="text-gray-600 line-clamp-3">{group.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
