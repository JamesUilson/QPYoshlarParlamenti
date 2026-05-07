"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { getEvents, initializeData, type EventItem } from "@/lib/data-store";

export default function YalpiMajlislar() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    initializeData();
    const allEvents = getEvents();
    setEvents(allEvents.filter(e => e.category === "Yalpi majlislar"));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Yalpi majlislar</h1>
          <p className="text-lg max-w-3xl">
            O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi yalpi majlislari haqida ma'lumot
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Hozircha yalpi majlislar mavjud emas</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
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
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
