import Link from "next/link"

export default function Tadbirlar() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Tadbirlar</h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi Yoshlar parlamenti tomonidan tashkil etiladigan tadbirlar haqida ma'lumot
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/tadbirlar/yalpi-majlislar"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-4">Yalpi majlislar</h2>
            <p className="text-gray-700 mb-4">
              O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi yalpi majlislari haqida ma'lumot
            </p>
            <div className="flex justify-end">
              <span className="text-blue-600 font-medium">Batafsil &rarr;</span>
            </div>
          </Link>

          <Link
            href="/tadbirlar/siyosiy-partiyalar"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-4">Siyosiy partiyalarning yoshlar guruhlari yig'ilishlari</h2>
            <p className="text-gray-700 mb-4">
              O'zbekiston Respublikasi siyosiy partiyalarining yoshlar guruhlari yig'ilishlari haqida ma'lumot
            </p>
            <div className="flex justify-end">
              <span className="text-blue-600 font-medium">Batafsil &rarr;</span>
            </div>
          </Link>

          <Link
            href="/tadbirlar/qomitalar-yigilishi"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-4">Qo'mitalar yig'ilishi</h2>
            <p className="text-gray-700 mb-4">
              O'zbekiston Respublikasi Yoshlar parlamenti qo'mitalari yig'ilishlari haqida ma'lumot
            </p>
            <div className="flex justify-end">
              <span className="text-blue-600 font-medium">Batafsil &rarr;</span>
            </div>
          </Link>

          <Link href="/tadbirlar/boshqa" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold mb-4">Boshqa tadbirlar</h2>
            <p className="text-gray-700 mb-4">
              O'zbekiston Respublikasi Yoshlar parlamenti tomonidan tashkil etiladigan boshqa tadbirlar haqida ma'lumot
            </p>
            <div className="flex justify-end">
              <span className="text-blue-600 font-medium">Batafsil &rarr;</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  )
}
