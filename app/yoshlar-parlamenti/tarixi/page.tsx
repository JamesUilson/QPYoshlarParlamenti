"use client";

import Image from "next/image"
import PageSidebar from "@/components/page-sidebar";
import { useLang } from "@/lib/lang-context";

export default function YoshlarParlamentiTarixi() {
  const { tr } = useLang();
  const SIDEBAR_LINKS = [
    { title: tr("tarixi"), href: "/yoshlar-parlamenti/tarixi" },
    { title: tr("kengashi"), href: "/yoshlar-parlamenti/kengashi" },
    { title: tr("rahbariyati"), href: "/yoshlar-parlamenti/rahbariyati" },
    { title: tr("azolar-page-title"), href: "/yoshlar-parlamenti-azolari" },
    { title: tr("qomitalar"), href: "/yoshlar-parlamenti/qomitalar" },
    { title: tr("nizomi"), href: "/yoshlar-parlamenti/nizomi" },
  ];
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-1">{tr("tarixi-page-title")}</h1>
          <p className="text-sm text-white/80">{tr("tarixi-page-desc")}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{tr("tarixi-h1")}</h2>
          <p className="text-gray-700 mb-4">{tr("tarixi-p1")}</p>
          <div className="flex items-center justify-center my-8">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="https://parliament.gov.uz/media/photo_gallery/8027379278197252_CxJygTq.jpg"
                alt="Yoshlar Parlamenti Tarixi"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-gray-700 mb-4">{tr("tarixi-p2")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-p3")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-p4")}</p>
          <p className="text-gray-700">{tr("tarixi-p5")}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">{tr("tarixi-chaqiriq1")}</h2>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq1-p1")}</p>
          <p className="text-gray-700">{tr("tarixi-chaqiriq1-p2")}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">{tr("tarixi-chaqiriq2")}</h2>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq2-p1")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq2-p2")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq2-proposals")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq2-activities")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq2-international")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq2-p3")}</p>
          <p className="text-gray-700">{tr("tarixi-chaqiriq2-speaker")}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">{tr("tarixi-chaqiriq3")}</h2>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq3-p1")}</p>
          <p className="text-gray-700 mb-4">{tr("tarixi-chaqiriq3-reform")}</p>
          <p className="text-gray-700">{tr("tarixi-chaqiriq3-p2")}</p>
        </div>
        </div>
        <PageSidebar links={SIDEBAR_LINKS} />
        </div>
      </section>
    </main>
  )
}
