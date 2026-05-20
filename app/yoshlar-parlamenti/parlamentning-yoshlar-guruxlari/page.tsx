"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import PageSidebar from "@/components/page-sidebar";
import { useLang } from "@/lib/lang-context";
import { getLocalized } from "@/lib/get-localized";
import {
  getYoshlarGuruhlari, getMembers, initializeData,
  type YoshlarGuruhi, type Member,
} from "@/lib/data-store";

const YOSHLAR_GURUHI_KEYS: Record<string, string> = {
  ozlidep: "O'zLiDeP yoshlar guruhi",
  milliy: "Milliy tiklanish yoshlar guruhi",
  adolat: "Adolat yoshlar guruhi",
  xdp: "XDP yoshlar guruhi",
  ekologiya: "Ekologik partiya yoshlar guruhi",
};

export default function ParlamentningYoshlarGuruxlari() {
  const { tr, lang } = useLang();
  const [guruhlari, setGuruhlari] = useState<YoshlarGuruhi[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<YoshlarGuruhi | null>(null);

  useEffect(() => {
    initializeData();
    const g = getYoshlarGuruhlari();
    setGuruhlari(g);
    setMembers(getMembers());
    if (g.length > 0) setSelected(g[0]);
  }, []);

  const guruhMembers = selected
    ? members.filter(m => m.yoshlarGuruhi === YOSHLAR_GURUHI_KEYS[selected.key])
    : [];

  const guruhName = (g: YoshlarGuruhi) => getLocalized(g, "name", lang) || g.name;
  const guruhDesc = (g: YoshlarGuruhi) => getLocalized(g, "description", lang) || g.description || "";

  const SIDEBAR_LINKS = [
    { title: tr("tarixi"), href: "/yoshlar-parlamenti/tarixi" },
    { title: tr("kengashi"), href: "/yoshlar-parlamenti/kengashi" },
    { title: tr("rahbariyati"), href: "/yoshlar-parlamenti/rahbariyati" },
    { title: tr("azolar-page-title"), href: "/yoshlar-parlamenti-azolari" },
    { title: tr("qomitalar"), href: "/yoshlar-parlamenti/qomitalar" },
    { title: tr("yoshlar-guruxlari"), href: "/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari" },
    { title: tr("nizomi"), href: "/yoshlar-parlamenti/nizomi" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-1">{tr("guruxlar-page-title")}</h1>
          <p className="text-sm text-white/80">{tr("guruxlar-page-desc")}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: Party list */}
          <div className="w-full lg:w-56 flex-shrink-0">
            <div className="flex flex-col gap-3">
              {guruhlari.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelected(g)}
                  className={`w-full bg-white rounded-lg shadow-sm flex flex-col items-center justify-center p-5 gap-3 transition border-2 ${
                    selected?.id === g.id
                      ? "border-[#0047AB] shadow-md"
                      : "border-transparent hover:border-blue-200 hover:shadow-md"
                  }`}
                >
                  <div className="relative w-24 h-16">
                    <Image src={g.image} alt={g.name} fill className="object-contain" />
                  </div>
                  <p className="text-center text-xs text-gray-700 leading-snug">{guruhName(g)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Center: Selected group content */}
          <div className="flex-1 min-w-0">
            {selected ? (
              <>
                <div className="bg-white border border-gray-200 rounded-sm p-5 mb-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-full overflow-hidden">
                      <Image src={selected.image} alt={selected.name} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#0047AB] leading-snug">{guruhName(selected)}</h2>
                      {guruhMembers.length > 0 && (
                        <span className="inline-flex items-center gap-1 mt-1 text-sm text-gray-500">
                          <Users className="h-3.5 w-3.5" /> {guruhMembers.length} nafar a'zo
                        </span>
                      )}
                    </div>
                  </div>
                  {guruhDesc(selected) ? (
                    <p className="text-gray-700 text-sm leading-relaxed">{guruhDesc(selected)}</p>
                  ) : (
                    <p className="text-gray-400 text-sm italic">{tr("guruh-tavsif-yoq")}</p>
                  )}
                </div>

                {/* Members */}
                <div className="bg-white border border-gray-200 rounded-sm p-5">
                  <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0047AB]" />
                    {tr("guruh-azolari")}
                    {guruhMembers.length > 0 && (
                      <span className="text-xs font-normal text-gray-500">({guruhMembers.length} nafar)</span>
                    )}
                  </h3>
                  {guruhMembers.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-sm p-8 text-center text-gray-400 text-sm">
                      {tr("guruh-azol-yoq")}
                      <br />
                      <span className="text-xs mt-1 block">{tr("guruh-azol-yoq-hint")}</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {guruhMembers.map(m => (
                        <Link
                          key={m.id}
                          href={`/yoshlar-parlamenti-azolari/${m.id}`}
                          className="bg-white border border-gray-200 rounded-sm flex overflow-hidden h-28 hover:border-[#0047AB] transition"
                        >
                          <div className="relative w-24 flex-shrink-0">
                            <Image
                              src={m.image || "/placeholder.svg"}
                              alt={m.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3 flex flex-col justify-center min-w-0">
                            <p className="font-semibold text-sm line-clamp-2 text-gray-800">{m.name}</p>
                            <p className="text-xs text-[#0047AB] mt-1 line-clamp-1">{m.position}</p>
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
                {tr("guruh-tanlang")}
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
