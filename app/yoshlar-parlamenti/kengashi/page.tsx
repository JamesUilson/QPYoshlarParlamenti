"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getKengash, initializeData, type KengashMember } from "@/lib/data-store";
import PageSidebar from "@/components/page-sidebar";

const SIDEBAR_LINKS = [
  { title: "Yoshlar parlamenti tarixi", href: "/yoshlar-parlamenti/tarixi" },
  { title: "Yoshlar parlamenti Kengashi", href: "/yoshlar-parlamenti/kengashi" },
  { title: "Yoshlar parlamenti Rahbariyati", href: "/yoshlar-parlamenti/rahbariyati" },
  { title: "Yoshlar parlamenti a'zolari", href: "/yoshlar-parlamenti-azolari" },
  { title: "Yoshlar parlamenti Qo'mitalari", href: "/yoshlar-parlamenti/qomitalar" },
  { title: "Yoshlar parlamenti Nizomi", href: "/yoshlar-parlamenti/nizomi" },
];

export default function YoshlarParlamentiKengashi() {
  const [members, setMembers] = useState<KengashMember[]>([]);

  useEffect(() => {
    initializeData();
    setMembers(getKengash());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-1">Yoshlar parlamenti Kengashi</h1>
          <p className="text-sm text-white/80">O'zbekiston Respublikasi Yoshlar parlamenti Kengashi tarkibi</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-sm p-5 mb-6">
              <h2 className="text-lg font-bold mb-3">Yoshlar parlamenti Kengashi haqida</h2>
              <p className="text-gray-700 text-sm mb-2">
                O'zbekiston Respublikasi Yoshlar parlamenti Kengashi Yoshlar parlamentining kollegial boshqaruv organi
                hisoblanadi. Kengash Yoshlar parlamenti raisi, rais o'rinbosarlari va qo'mitalar raislaridan iborat.
              </p>
              <p className="text-gray-700 text-sm">
                Yoshlar parlamenti Kengashi har oyda kamida bir marta yig'iladi va Yoshlar parlamenti faoliyatiga doir
                masalalarni muhokama qiladi.
              </p>
            </div>

            <h2 className="text-xl font-bold mb-4">Kengash tarkibi</h2>
            {members.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-sm p-10 text-center text-gray-500">
                <p className="text-base font-medium">Ma'lumot yuklanmoqda...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((m) => (
                  <div key={m.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-[#0047AB] transition">
                    <div className="relative h-52 w-full">
                      <Image
                        src={m.image || "/placeholder.svg"}
                        alt={m.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-800 mb-1">{m.name}</h3>
                      <p className="text-xs text-[#0047AB] leading-snug">{m.position}</p>
                      {m.description && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{m.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <PageSidebar links={SIDEBAR_LINKS} />
        </div>
      </section>
    </main>
  );
}
