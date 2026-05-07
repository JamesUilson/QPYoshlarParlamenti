import Image from "next/image";
import Link from "next/link";

export default function YoshlarParlamentiRahbariyati() {
  const leaders = [
    {
      id: 1,
      name: "Sobitov Otabekxo‘ja Yo‘ldoshovich",
      position:
        "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamentining Spikeri",
      image: "/images/deputatlar/photo_2025-05-03_20-38-24.jpg", // Replace with actual image filename if available
    },
    {
      id: 2,
      name: "Axadova Husnora Akbar qizi",
      position:
        "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari",
      image: "/images/deputatlar/image_2025-05-03_19-34-15.png", // Replace with actual image filename if available
    },
    {
      id: 3,
      name: "Suyarov Komiljon Sattarovich",
      position:
        "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Liberal demokratik partiyasi yoshlar guruhi rahbari",
      image: "/images/deputatlar/image_2025-05-03_19-35-29.png", // Replace with actual image filename if available
    },
    {
      id: 4,
      name: "Murodov Nodir Oybek o‘g‘li",
      position:
        "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Milliy tiklanish demokratik partiyasi yoshlar guruhi rahbari",
      image: "/images/deputatlar/image_2025-05-03_19-34-28.png", // Replace with actual image filename if available
    },
    {
      id: 5,
      name: "Adilova Farzona Alisher qizi",
      position:
        "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Adolat sotsial demokratik partiyasi yoshlar guruhi rahbari",
      image: "/images/deputatlar/image_2025-05-03_19-34-38.png", // Replace with actual image filename if available
    },
    {
      id: 6,
      name: "Oʼktamov Shoxruxbek Ulugʼbek oʼgʼli",
      position:
        "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Xalq demokratik partiyasi yoshlar guruhi rahbari",
      image: "/images/deputatlar/image_2025-05-03_19-35-18.png", // Replace with actual image filename if available
    },
    {
      id: 7,
      name: "Ergash Moxinurxon Odilxon qizi",
      position:
        "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Ekologik partiyasi yoshlar guruhi rahbari",
      image: "/images/deputatlar/image_2025-05-03_19-34-53.png", // Replace with actual image filename if available
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">
            Yoshlar parlamenti Rahbariyati
          </h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi Yoshlar parlamenti rahbariyati haqida
            ma'lumot
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Rahbariyat a'zolari</h2>
        <div className="space-y-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="flex md:flex-row flex-col items-center p-6  ">
                <div className="flex items-center justify-center">
                  {/* Reduced height */}
                  <Image
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    width={200}
                    height={200}
                    className="object-contain " // ensures full image is shown without cropping
                  />
                </div>

                <div className="p-3 md:ml-10 md:mt-0 mt-6">
                  <h3 className="text-2xl font-bold mb-2">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {leader.position}
                  </p>

                  <Link
                    href={`/yoshlar-parlamenti/rahbariyati/${leader.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Batafsil ma'lumot
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
