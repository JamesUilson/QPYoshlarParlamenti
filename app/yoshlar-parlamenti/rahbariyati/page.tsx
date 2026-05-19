"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getRahbariyat, initializeData, type RahbariyatMember } from "@/lib/data-store";
import PageSidebar from "@/components/page-sidebar";

const SIDEBAR_LINKS = [
  { title: "Yoshlar parlamenti tarixi", href: "/yoshlar-parlamenti/tarixi" },
  { title: "Yoshlar parlamenti Kengashi", href: "/yoshlar-parlamenti/kengashi" },
  { title: "Yoshlar parlamenti Rahbariyati", href: "/yoshlar-parlamenti/rahbariyati" },
  { title: "Yoshlar parlamenti a'zolari", href: "/yoshlar-parlamenti-azolari" },
  { title: "Yoshlar parlamenti Qo'mitalari", href: "/yoshlar-parlamenti/qomitalar" },
  { title: "Yoshlar parlamenti Nizomi", href: "/yoshlar-parlamenti/nizomi" },
];

export default function YoshlarParlamentiRahbariyati() {
  const [leaders, setLeaders] = useState<RahbariyatMember[]>([]);

  useEffect(() => {
    initializeData();
    setLeaders(getRahbariyat());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-1">Yoshlar parlamenti Rahbariyati</h1>
          <p className="text-sm text-white/80">O'zbekiston Respublikasi Yoshlar parlamenti rahbariyati haqida ma'lumot</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold mb-5">Rahbariyat tarkibi</h2>
            {leaders.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-sm p-10 text-center text-gray-500">
                <p className="text-base font-medium">Ma'lumot yuklanmoqda...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaders.map((leader, idx) => (
                  <div key={leader.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-[#0047AB] transition">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-0">
                      <div className="relative w-full sm:w-44 h-52 sm:h-44 flex-shrink-0">
                        <Image
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          fill
                          className="object-cover object-top"
                        />
                        {idx === 0 && (
                          <span className="absolute top-2 left-2 bg-[#0047AB] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                            Spiker
                          </span>
                        )}
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col justify-center">
                        <h3 className="text-base font-bold text-gray-800 mb-1">{leader.name}</h3>
                        <p className="text-sm text-[#0047AB] font-medium mb-2 leading-snug">{leader.position}</p>
                        {leader.description && (
                          <p className="text-sm text-gray-600 leading-relaxed">{leader.description}</p>
                        )}
                      </div>
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
