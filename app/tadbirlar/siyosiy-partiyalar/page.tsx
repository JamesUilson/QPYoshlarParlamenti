"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getEvents, initializeData, type EventItem } from "@/lib/data-store";

export default function SiyosiyPartiyalar() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    initializeData();
    const allEvents = getEvents();
    setEvents(allEvents.filter(e => e.category === "Siyosiy partiyalar"));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Siyosiy partiyalarning yoshlar guruhlari yig'ilishlari</h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi siyosiy partiyalarining yoshlar guruhlari yig'ilishlari haqida ma'lumot
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Hozircha siyosiy partiyalar yig'ilishlari mavjud emas</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="md:flex">
                  {event.image && (
                    <div className="md:w-1/3">
                      <div className="relative h-[200px] w-full">
                        <Image src={event.image} alt={event.title} fill className="object-cover" />
                      </div>
                    </div>
                  )}
                  <div className={event.image ? "md:w-2/3 p-6" : "p-6"}>
                    <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <Link
                      href={`/tadbirlar/${event.id}`}
                      className="inline-block bg-[#0047AB] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Batafsil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
