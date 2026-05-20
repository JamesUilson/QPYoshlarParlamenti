"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Users, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getFriendshipGroups, initializeData, type FriendshipGroup } from "@/lib/data-store";
import PageSidebar from "@/components/page-sidebar";
import { useLang } from "@/lib/lang-context";

export default function DostlikGuruhlar() {
  const { tr } = useLang();
  const sidebarLinks = [
    { title: tr("xalqaro-tadbirlar"), href: "/xalqaro-munosabatlar/xalqaro-tadbirlar" },
    { title: tr("dostlik-guruhlar"), href: "/xalqaro-munosabatlar/dostlik-guruhlar" },
  ];
  const [groups, setGroups] = useState<FriendshipGroup[]>([]);

  useEffect(() => {
    initializeData();
    setGroups(getFriendshipGroups());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{tr("dostlik-page-title")}</h1>
          <p className="text-blue-100 max-w-3xl">{tr("dostlik-page-desc")}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {groups.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-lg border">
                <p className="text-lg font-medium">{tr("hozircha-yoq")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                  <Link
                    key={group.id}
                    href={`/xalqaro-munosabatlar/dostlik-guruhlar/${group.id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
                  >
                    {group.image ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={group.image}
                          alt={`O'zbekiston-${group.country} do'stlik guruhi`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <Globe className="h-16 w-16 text-[#0047AB] opacity-30" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-bold mb-2 flex items-center gap-2 group-hover:text-[#0047AB] transition-colors">
                        <Globe className="h-4 w-4 text-[#0047AB] flex-shrink-0" />
                        O'zbekiston-{group.country} do'stlik guruhi
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-[#0047AB]" />
                          A'zolar: {group.members} ta
                        </span>
                        {group.established && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-[#0047AB]" />
                            {group.established}-yil
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 font-medium mb-2">Rais: {group.chair}</p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{group.description}</p>
                      <span className="text-[#0047AB] text-sm font-medium">Batafsil →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <PageSidebar links={sidebarLinks} />
        </div>
      </section>
    </main>
  );
}
