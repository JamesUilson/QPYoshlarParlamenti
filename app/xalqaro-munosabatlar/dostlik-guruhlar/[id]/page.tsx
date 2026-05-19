"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Users, Calendar } from "lucide-react";
import { getFriendshipGroupById, initializeData, type FriendshipGroup } from "@/lib/data-store";
import PageSidebar from "@/components/page-sidebar";

const sidebarLinks = [
  { title: "Xalqaro tadbirlar", href: "/xalqaro-munosabatlar/xalqaro-tadbirlar" },
  { title: "Do'stlik guruhlar", href: "/xalqaro-munosabatlar/dostlik-guruhlar" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DostlikGuruhDetail({ params }: PageProps) {
  const { id } = use(params);
  const [group, setGroup] = useState<FriendshipGroup | null>(null);

  useEffect(() => {
    initializeData();
    setGroup(getFriendshipGroupById(id));
  }, [id]);

  if (!group) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16">
        <div className="container mx-auto px-4 py-8">
          <Link href="/xalqaro-munosabatlar/dostlik-guruhlar" className="inline-flex items-center text-[#0047AB] hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Ortga qaytish
          </Link>
          <div className="text-lg text-gray-500 bg-white p-8 rounded-lg border">Guruh topilmadi.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <Link href="/xalqaro-munosabatlar/dostlik-guruhlar" className="inline-flex items-center text-blue-200 hover:text-white mb-4 text-sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Do'stlik guruhlarga qaytish
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">
            O'zbekiston-{group.country} do'stlik guruhi
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {group.image ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={group.image}
                    alt={`O'zbekiston-${group.country} do'stlik guruhi`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <Globe className="h-20 w-20 text-[#0047AB] opacity-20" />
                </div>
              )}

              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-[#0047AB]" />
                  O'zbekiston-{group.country} do'stlik guruhi
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[#0047AB]" />
                    <div>
                      <p className="text-gray-500 text-xs">A'zolar soni</p>
                      <p className="font-semibold">{group.members} ta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-[#0047AB]" />
                    <div>
                      <p className="text-gray-500 text-xs">Rais</p>
                      <p className="font-semibold">{group.chair}</p>
                    </div>
                  </div>
                  {group.established && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-[#0047AB]" />
                      <div>
                        <p className="text-gray-500 text-xs">Tashkil etilgan</p>
                        <p className="font-semibold">{group.established}-yil</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {group.description}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <PageSidebar links={sidebarLinks} />
        </div>
      </section>
    </main>
  );
}
