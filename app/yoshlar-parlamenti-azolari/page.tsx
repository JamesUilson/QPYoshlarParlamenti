"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMembers, initializeData, type Member } from "@/lib/data-store";

export default function YoshlarParlamentiAzolari() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("Barcha hududlar");

  useEffect(() => {
    initializeData();
    setMembers(getMembers());
  }, []);

  const filteredMembers = selectedRegion === "Barcha hududlar"
    ? members
    : members.filter(m => m.region.toLowerCase().includes(selectedRegion.toLowerCase()));

  const regions = [
    "Barcha hududlar",
    "Toshkent shahri",
    "Toshkent viloyati",
    "Samarqand viloyati",
    "Andijon viloyati",
    "Buxoro viloyati",
    "Farg'ona viloyati",
    "Namangan viloyati",
    "Xorazm viloyati",
    "Qashqadaryo viloyati",
    "Surxondaryo viloyati",
    "Navoiy viloyati",
    "Jizzax viloyati",
    "Sirdaryo viloyati",
    "Qoraqalpog'iston Respublikasi",
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Yoshlar parlamenti a'zolari</h1>
          <p className="text-lg max-w-3xl">O'zbekiston Respublikasi Yoshlar parlamenti a'zolari haqida ma'lumot</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">A'zolar ro'yxati</h2>
            <div className="relative">
              <select 
                className="bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Link
                key={member.id}
                href={`/yoshlar-parlamenti-azolari/${member.id}`}
                className="bg-white flex rounded-lg shadow-sm overflow-hidden h-48 hover:shadow-md transition"
              >
                <div className="relative w-40">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold">Saylov okrugi</p>
                    <p className="text-blue-600">{member.region}</p>
                  </div>
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold">Fraksiyaga a'zoligi</p>
                    <p className="text-blue-600">{member.fraction}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
