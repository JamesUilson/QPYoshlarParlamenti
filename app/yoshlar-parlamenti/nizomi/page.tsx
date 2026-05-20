"use client";

import { useLang } from "@/lib/lang-context";

export default function YoshlarParlamentiNizomi() {
  const { tr } = useLang();
  const documents = [
    {
      id: 1,
      title: "Yoshlar parlamenti nizomi",
      date: "2019-yil 15-mart",
      size: "1.2 MB",
      type: "PDF",
    },
    {
      id: 2,
      title: "Yoshlar parlamenti reglamenti",
      date: "2019-yil 15-mart",
      size: "0.8 MB",
      type: "PDF",
    },
    {
      id: 3,
      title: "Yoshlar parlamenti a'zolarini saylash tartibi",
      date: "2019-yil 20-mart",
      size: "0.5 MB",
      type: "PDF",
    },
    {
      id: 4,
      title: "Yoshlar parlamenti qo'mitalari to'g'risida nizom",
      date: "2019-yil 25-mart",
      size: "0.7 MB",
      type: "PDF",
    },
    {
      id: 5,
      title: "Yoshlar parlamenti Kengashi to'g'risida nizom",
      date: "2019-yil 25-mart",
      size: "0.6 MB",
      type: "PDF",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{tr("nizomi-page-title")}</h1>
          <p className="text-lg max-w-3xl">{tr("nizomi-page-desc")}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{tr("nizomi-section-title")}</h2>
          <p className="text-gray-700 mb-4">{tr("nizomi-section-p1")}</p>
          <p className="text-gray-700 mb-4">{tr("nizomi-section-p2")}</p>
          <p className="text-gray-700">{tr("nizomi-section-p3")}</p>
        </div>

        <h2 className="text-2xl font-bold mb-6">{tr("nizomi-docs-title")}</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">{tr("nizomi-ilova1-title")}</h3>
            <h4 className="text-lg font-bold mb-4 text-center">{tr("nizomi-ilova1-subtitle")}</h4>

            <div className="space-y-6 text-gray-700">
              <div>
                <h5 className="font-bold mb-2">{tr("nizomi-ilova1-bob1")}</h5>
                <p className="mb-2">{tr("nizomi-ilova1-1")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-2")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-3")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-4")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-5")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-6")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-6a")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-6a-text")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-6b")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-6b-text")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-6v")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-6v-text")}</p>
              </div>

              <div>
                <h5 className="font-bold mb-2">{tr("nizomi-ilova1-bob2")}</h5>
                <p className="mb-2">{tr("nizomi-ilova1-7")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-1")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-2")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-3")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-4")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-5")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-6")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-7")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-8-8")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-1")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-2")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-3")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-4")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-5")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-6")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-7")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-8")}</p>
                <p className="mb-2">{tr("nizomi-ilova1-9-9")}</p>
              </div>

              <div className="text-right mt-8">
                <a href="/nizomi/1-ilova-nizom.docx" download className="text-blue-600 hover:underline">
                  {tr("nizomi-download")}
                </a>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-12 mb-4">{tr("nizomi-ilova2-title")}</h3>
            <h4 className="text-lg font-bold mb-4 text-center">{tr("nizomi-ilova2-subtitle")}</h4>

            <div className="space-y-6 text-gray-700">
              <div>
                <h5 className="font-bold mb-2">{tr("nizomi-ilova2-bob1")}</h5>
                <p className="mb-2">{tr("nizomi-ilova2-1")}</p>
                <p className="mb-2">{tr("nizomi-ilova2-2")}</p>
                <p className="mb-2">{tr("nizomi-ilova2-3")}</p>
                <p className="mb-2">{tr("nizomi-ilova2-4")}</p>
              </div>

              <div className="text-right mt-8">
                <a href="/nizomi/2-ilova-reglament.docx" download className="text-blue-600 hover:underline">
                  {tr("nizomi-download")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
