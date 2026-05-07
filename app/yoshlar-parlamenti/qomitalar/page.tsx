import LeftSidebar from "@/components/page-components/LeftSidebar";
import RightSidebar from "@/components/page-components/RightSidebar";
import Image from "next/image";

export default function YoshlarParlamentiQomitalar() {
  const committees = [
    {
      id: 1,
      name: "Ta'lim va fan qo'mitasi",
      chair: "Dilshod Ahmedov",
      members: 15,
      image: "/placeholder.svg?height=200&width=400&text=Ta'lim+va+fan",
      description:
        "Ta'lim va fan qo'mitasi ta'lim va fan sohasidagi qonun loyihalarini ishlab chiqish va muhokama qilish, ta'lim va fan sohasidagi muammolarni o'rganish va ularni hal etish bo'yicha takliflar tayyorlash bilan shug'ullanadi.",
      link: "#",
    },
    {
      id: 2,
      name: "Madaniyat va sport qo'mitasi",
      chair: "Nilufar Karimova",
      members: 12,
      image: "/placeholder.svg?height=200&width=400&text=Madaniyat+va+sport",
      description:
        "Madaniyat va sport qo'mitasi madaniyat va sport sohasidagi qonun loyihalarini ishlab chiqish va muhokama qilish, madaniyat va sport sohasidagi muammolarni o'rganish va ularni hal etish bo'yicha takliflar tayyorlash bilan shug'ullanadi.",
      link: "#",
    },
    {
      id: 3,
      name: "Innovatsion rivojlanish qo'mitasi",
      chair: "Jahongir Rasulov",
      members: 14,
      image:
        "/placeholder.svg?height=200&width=400&text=Innovatsion+rivojlanish",
      description:
        "Innovatsion rivojlanish qo'mitasi innovatsion rivojlanish sohasidagi qonun loyihalarini ishlab chiqish va muhokama qilish, innovatsion rivojlanish sohasidagi muammolarni o'rganish va ularni hal etish bo'yicha takliflar tayyorlash bilan shug'ullanadi.",
      link: "#",
    },
    {
      id: 4,
      name: "Ijtimoiy masalalar qo'mitasi",
      chair: "Zarina Umarova",
      members: 13,
      image: "/placeholder.svg?height=200&width=400&text=Ijtimoiy+masalalar",
      description:
        "Ijtimoiy masalalar qo'mitasi ijtimoiy masalalar sohasidagi qonun loyihalarini ishlab chiqish va muhokama qilish, ijtimoiy masalalar sohasidagi muammolarni o'rganish va ularni hal etish bo'yicha takliflar tayyorlash bilan shug'ullanadi.",
      link: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">
            Yoshlar parlamenti Qo'mitalar
          </h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi Yoshlar parlamenti qo'mitalari haqida
            ma'lumot
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto flex lg:flex-row flex-col lg:justify-evenly lg:gap-0 gap-4 px-4 py-8">
        <div className="flex lg:flex-row flex-col-reverse">
          <LeftSidebar elements={committees} title="Qo'mitalar" />
          <div className="bg-white rounded-lg shadow-sm p-6 mb-5 lg:mb-0 mx-0 lg:mx-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Yoshlar parlamenti qo'mitalari haqida
            </h2>
            <p className="text-gray-700 mb-4">
              O'zbekiston Respublikasi Yoshlar parlamenti qo'mitalari Yoshlar
              parlamentining asosiy ishchi organlari hisoblanadi. Qo'mitalar o'z
              yo'nalishlari bo'yicha qonun loyihalarini ishlab chiqish va
              muhokama qilish, tegishli sohalardagi muammolarni o'rganish va
              ularni hal etish bo'yicha takliflar tayyorlash bilan
              shug'ullanadi.
            </p>
            <p className="text-gray-700">
              Yoshlar parlamenti qo'mitalari Yoshlar parlamenti a'zolari
              tomonidan tashkil etiladi va ular oldida hisobot beradi.
              Qo'mitalar o'z faoliyatini Yoshlar parlamenti Kengashi
              rahbarligida amalga oshiradi.
            </p>
          </div>
        </div>

        <RightSidebar />

        {/* <h2 className="text-2xl font-bold mb-6">Qo'mitalar</h2>
        <div className="space-y-8">
          {committees.map((committee) => (
            <div key={committee.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={committee.image || "/placeholder.svg"}
                      alt={committee.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold mb-2">{committee.name}</h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Rais: {committee.chair}
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      A'zolar soni: {committee.members}
                    </div>
                  </div>
                  <p className="text-gray-700">{committee.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </section>
    </main>
  );
}
