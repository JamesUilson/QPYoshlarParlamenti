"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getEvents, initializeData, type EventItem } from "@/lib/data-store";
import PageSidebar from "@/components/page-sidebar";
import { useLang } from "@/lib/lang-context";

export default function XalqaroTadbirlar() {
  const { tr } = useLang();
  const sidebarLinks = [
    { title: tr("xalqaro-tadbirlar"), href: "/xalqaro-munosabatlar/xalqaro-tadbirlar" },
    { title: tr("dostlik-guruhlar"), href: "/xalqaro-munosabatlar/dostlik-guruhlar" },
  ];
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    initializeData();
    const allEvents = getEvents();
    setEvents(allEvents.filter((e) => e.category === "Xalqaro tadbirlar"));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{tr("xalqaro-page-title")}</h1>
          <p className="text-blue-100 max-w-3xl">{tr("xalqaro-page-desc")}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {events.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-lg border">
                <p className="text-lg font-medium">{tr("hozircha-yoq")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/tadbirlar/${event.id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
                  >
                    {event.image ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-[#0047AB] text-white text-xs px-2 py-1 rounded">
                          {event.category}
                        </span>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <span className="text-[#0047AB] text-4xl font-bold opacity-20">YP</span>
                      </div>
                    )}
                    <div className="p-5">
                      <h2 className="text-base font-semibold mb-3 line-clamp-2 group-hover:text-[#0047AB] transition-colors">
                        {event.title}
                      </h2>
                      <div className="space-y-1.5 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#0047AB]" />
                          <span>{event.date}</span>
                          <Clock className="h-3.5 w-3.5 text-[#0047AB] ml-2" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#0047AB]" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                      <span className="mt-3 inline-block text-[#0047AB] text-sm font-medium">
                        Batafsil →
                      </span>
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
