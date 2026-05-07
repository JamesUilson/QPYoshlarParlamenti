"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getEvents, initializeData, type EventItem } from "@/lib/data-store";

export default function XalqaroTadbirlar() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    initializeData();
    const allEvents = getEvents();
    setEvents(allEvents.filter((e) => e.category === "Xalqaro tadbirlar"));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Xalqaro tadbirlar</h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi Yoshlar parlamenti tomonidan tashkil
            etiladigan xalqaro tadbirlar haqida ma'lumot
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Hozircha xalqaro tadbirlar mavjud emas.</p>
            <p className="text-sm mt-2">
              Admin panel orqali "Xalqaro tadbirlar" kategoriyasida tadbir
              qo'shing.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3">{event.title}</h2>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#0047AB]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#0047AB]" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-[#0047AB]" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
