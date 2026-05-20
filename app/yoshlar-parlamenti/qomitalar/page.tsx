"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { getCommittees, getMembers, initializeData, type Committee, type Member } from "@/lib/data-store";
import PageSidebar from "@/components/page-sidebar";
import { useLang } from "@/lib/lang-context";
import { getLocalized } from "@/lib/get-localized";

export default function YoshlarParlamentiQomitalar() {
  const { tr, lang } = useLang();
  const SIDEBAR_LINKS = [
    { title: tr("tarixi"), href: "/yoshlar-parlamenti/tarixi" },
    { title: tr("kengashi"), href: "/yoshlar-parlamenti/kengashi" },
    { title: tr("rahbariyati"), href: "/yoshlar-parlamenti/rahbariyati" },
    { title: tr("azolar-page-title"), href: "/yoshlar-parlamenti-azolari" },
    { title: tr("qomitalar"), href: "/yoshlar-parlamenti/qomitalar" },
    { title: tr("yoshlar-guruxlari"), href: "/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari" },
    { title: tr("nizomi"), href: "/yoshlar-parlamenti/nizomi" },
  ];
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<Committee | null>(null);

  useEffect(() => {
    initializeData();
    const c = getCommittees();
    setCommittees(c);
    setMembers(getMembers());
    if (c.length > 0) setSelected(c[0]);
  }, []);

  const committeeMembers = selected
    ? members.filter(m => m.committee === selected.name)
    : [];

  const committeeName = (c: Committee) => getLocalized(c, "name", lang) || c.name;

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-1">{tr("qomitalar-page-title")}</h1>
          <p className="text-sm text-white/80">{tr("qomitalar-page-desc")}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: Committee list */}
          <div className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-[#0047AB] text-white rounded-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-blue-500">
                <h2 className="font-bold text-sm">{tr("qomitalar")}</h2>
              </div>
              <ul className="divide-y divide-blue-500/40">
                {committees.map(c => (
                  <li key={c.id}>
                    <button
                      onClick={() => setSelected(c)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-blue-700 leading-snug ${
                        selected?.id === c.id ? "bg-blue-700 font-medium" : ""
                      }`}
                    >
                      {committeeName(c)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center: Selected committee content */}
          <div className="flex-1 min-w-0">
            {selected ? (
              <>
                <div className="bg-white border border-gray-200 rounded-sm p-5 mb-5">
                  <h2 className="text-xl font-bold mb-3 text-[#0047AB]">{committeeName(selected)}</h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {selected.chair && (
                      <span className="bg-blue-50 text-[#0047AB] border border-blue-200 px-3 py-1 rounded text-sm font-medium">
                        Rais: {selected.chair}
                      </span>
                    )}
                    {committeeMembers.length > 0 && (
                      <span className="bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded text-sm flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {committeeMembers.length} nafar a'zo
                      </span>
                    )}
                  </div>
                  {(getLocalized(selected, "description", lang) || selected.description) && (
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {getLocalized(selected, "description", lang) || selected.description}
                    </p>
                  )}
                  <div className="text-sm text-gray-600 space-y-1 border-t border-gray-100 pt-4">
                    <p><strong>{tr("qomita-label")}:</strong></p>
                    <ul className="list-disc ml-4 space-y-1 text-gray-600 text-sm">
                      <li>Qonun loyihalarini ishlab chiqish va muhokama qilish;</li>
                      <li>Tegishli sohadagi muammolarni o'rganish va takliflar tayyorlash;</li>
                      <li>Parlament majlislarida qo'mita xulosalarini taqdim etish;</li>
                      <li>Vazirliklar va idoralar bilan hamkorlik qilish.</li>
                    </ul>
                  </div>
                </div>

                {/* Committee members */}
                <div>
                  <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0047AB]" />
                    {tr("qomita-azolari")}
                    {committeeMembers.length > 0 && (
                      <span className="text-xs font-normal text-gray-500">({committeeMembers.length} nafar)</span>
                    )}
                  </h3>
                  {committeeMembers.length === 0 ? (
                    <div className="bg-white border border-dashed border-gray-300 rounded-sm p-8 text-center text-gray-400 text-sm">
                      {tr("qomita-azol-yoq")}
                      <br />
                      <span className="text-xs mt-1 block">{tr("qomita-azol-yoq-hint")}</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {committeeMembers.map(m => (
                        <Link
                          key={m.id}
                          href={`/yoshlar-parlamenti-azolari/${m.id}`}
                          className="bg-white border border-gray-200 rounded-sm flex overflow-hidden h-28 hover:border-[#0047AB] transition"
                        >
                          <div className="relative w-24 flex-shrink-0">
                            <Image src={m.image || "/placeholder.svg"} alt={m.name} fill className="object-cover object-top" />
                          </div>
                          <div className="p-2.5 flex flex-col justify-center gap-1 min-w-0">
                            <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">{m.name}</p>
                            <p className="text-[10px] text-[#0047AB]">{m.fraction}</p>
                            <p className="text-[10px] text-gray-500 line-clamp-1">{m.region}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-sm p-10 text-center text-gray-500 text-sm">
                {tr("qomita-tanlang")}
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <PageSidebar links={SIDEBAR_LINKS} />
        </div>
      </section>
    </main>
  );
}
