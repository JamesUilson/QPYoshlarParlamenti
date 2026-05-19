"use client";

import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { getEventById, initializeData, type EventItem } from "@/lib/data-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetail({ params }: PageProps) {
  const { id } = use(params);
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    initializeData();
    const found = getEventById(id);
    setEvent(found);
  }, [id]);

  if (!event) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16">
        <div className="container mx-auto px-4 py-8">
          <Link href="/tadbirlar" className="inline-flex items-center text-blue-600 hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Ortga qaytish
          </Link>
          <div className="text-lg text-gray-500">Tadbir topilmadi.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/tadbirlar" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Tadbirlarga qaytish
          </Link>
          <span className="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded mb-3">
            {event.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-4xl">
          {event.image && (
            <div className="relative h-[300px] w-full">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
            </div>
          )}
          <div className="p-6">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#0047AB]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0047AB]" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0047AB]" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
