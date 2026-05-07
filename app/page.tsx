"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Calendar, ChevronRight, Clock, ChevronLeft } from "lucide-react";
import { getNews, getEvents, initializeData, type NewsItem, type EventItem } from "@/lib/data-store";

const MONTH_NAMES = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];

const DAY_NAMES = ["Ya", "Du", "Se", "Cho", "Pa", "Ju", "Sha"];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const days: { day: number; current: boolean }[] = [];
  for (let i = offset - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, current: true });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, current: false });
  }
  return days;
}

const HERO_SLIDES = [
  {
    image: "/images/media/IMG_8125.JPG",
    title: "Yuqori daromadli mahsulotlarni yetishtirish bo'yicha na'munaviy loyihalar amalga oshiriladi",
    description: "Oliy Majlis Qonunchilik palatasi Agrar va suv xo'jaligi masalalari qo'mitasining kengaytirilgan yig'ilishi bo'lib o'tdi.",
    link: "/yangiliklar",
  },
  {
    image: "/images/media/IMG_3950.JPG",
    title: "Yoshlar parlamenti Raisi talabalar bilan ochiq muloqotda ishtirok etdi",
    description: "Buxoro davlat universitetida faol va tashabbuskor talabalar bilan ochiq muloqot tashkil etildi.",
    link: "/yangiliklar",
  },
  {
    image: "/images/media/IMG_8069.JPG",
    title: "Yoshlar parlamenti yalpi majlisi bo'lib o'tdi",
    description: "Oliy Majlis Qonunchilik palatasi huzuridagi Yoshlar parlamenti yalpi majlisida muhim masalalar ko'rib chiqildi.",
    link: "/tadbirlar",
  },
];

export default function Home() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());

  useEffect(() => {
    initializeData();
    setNewsItems(getNews());
    setEvents(getEvents());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const calendarDays = getCalendarDays(calYear, calMonth);
  const today = new Date();
  const isCurrentMonth = calYear === today.getFullYear() && calMonth === today.getMonth();

  const eventDates = events.map((e) => {
    const parts = e.date.split(".");
    if (parts.length === 3) {
      return { day: parseInt(parts[0]), month: parseInt(parts[1]) - 1, year: parseInt(parts[2]) };
    }
    return null;
  }).filter(Boolean) as { day: number; month: number; year: number }[];

  const hasEventOnDay = useCallback(
    (day: number) => {
      return eventDates.some((ed) => ed.day === day && ed.month === calMonth && ed.year === calYear);
    },
    [eventDates, calMonth, calYear]
  );

  return (
    <main className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative">
        <div className="relative h-[500px] w-full overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                <div className="container mx-auto">
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-white mb-4 sm:mb-6 max-w-full md:max-w-3xl">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-block bg-blue-600 text-white text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-blue-700 transition"
                  >
                    Batafsil
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {/* Slider Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition ${idx === currentSlide ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">So'nggi yangiliklar</h2>
              <div className="space-y-6">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-6"
                  >
                    <div className="md:w-1/4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={150}
                        height={100}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>
                          {item.date} | {item.time}
                        </span>
                        <span className="mx-2">|</span>
                        <span>{item.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <Link
                        href={`/yangiliklar/${item.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Batafsil o'qish
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/yangiliklar"
                  className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-600 hover:text-white transition"
                >
                  Barcha yangiliklar
                </Link>
              </div>
            </div>

            {/* <div>
              <h2 className="text-2xl font-bold mb-6">
                Qonunchilik palatasi majlislari
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xl font-bold text-blue-600">
                        {15 + item}
                      </div>
                      <div className="text-sm text-gray-500">May, 2025</div>
                    </div>
                    <h3 className="font-medium mb-2">
                      {item === 1
                        ? "Yalpi majlis"
                        : item === 2
                        ? "Qo'mita yig'ilishi"
                        : "Xalqaro uchrashuv"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item === 1
                        ? "Qonunchilik palatasi yalpi majlisi"
                        : item === 2
                        ? "Qonunchilik palatasi qo'mitasi yig'ilishi"
                        : "Xalqaro parlament delegatsiyasi bilan uchrashuv"}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">10:00 - 13:00</span>
                      <Link
                        href={`/tadbirlar/${item}`}
                        className="text-blue-600 hover:underline"
                      >
                        Batafsil
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-6">
                  <Link
                    href="/tadbirlar"
                    className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-600 hover:text-white transition"
                  >
                    Barcha tadbirlar
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Tadbirlar Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Tadbirlar</h2>
            <Link
              href="/tadbirlar"
              className="text-blue-600 hover:underline flex items-center"
            >
              Barchasini ko'rish <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => {
                        if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
                        else setCalMonth(calMonth - 1);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="text-center">
                      <div className="text-sm font-bold">{MONTH_NAMES[calMonth]}</div>
                      <div className="text-xs text-gray-500">{calYear}</div>
                    </div>
                    <button
                      onClick={() => {
                        if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
                        else setCalMonth(calMonth + 1);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Day Names */}
                  <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
                    {DAY_NAMES.map((d) => (
                      <div key={d} className="p-1">{d}</div>
                    ))}
                  </div>
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 text-center text-sm">
                    {calendarDays.map((d, i) => {
                      const isToday = isCurrentMonth && d.current && d.day === today.getDate();
                      const hasEvent = d.current && hasEventOnDay(d.day);
                      return (
                        <div
                          key={i}
                          className={`p-1 rounded-full ${
                            !d.current ? "text-gray-300" :
                            isToday ? "bg-[#0047AB] text-white font-bold" :
                            hasEvent ? "bg-blue-100 text-[#0047AB] font-medium" :
                            "text-gray-700"
                          }`}
                        >
                          {d.day}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="border-b border-gray-200 pb-4"
                      >
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{event.date}</span>
                          <span className="mx-2">|</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <h3 className="font-medium mb-1 line-clamp-2">
                          {event.title}
                        </h3>
                        <Link
                          href={`/tadbirlar/${event.id}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Batafsil
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {events.slice(3, 5).map((event) => (
                  <div
                    key={event.id}
                    className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                      <span className="mx-2">|</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <h3 className="font-medium mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {event.description}
                    </p>
                    <Link
                      href={`/tadbirlar/${event.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Batafsil
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mediateka Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Mediateka</h2>
            <Link
              href="/mediateka"
              className="text-blue-600 hover:underline flex items-center"
            >
              Barchasini ko'rish <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/media/IMG_8069.JPG"
                  alt="Media Gallery"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-[#0F4C81] flex items-center justify-center pl-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-6 h-6"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="relative h-[140px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/IMG_3875.JPG"
                  alt="Photo 1"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#0F4C81"
                      className="w-6 h-6"
                    >
                      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative h-[140px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/IMG_3997.JPG"
                  alt="Photo 2"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#0F4C81"
                      className="w-6 h-6"
                    >
                      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative h-[140px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/IMG_3998.JPG"
                  alt="Photo 3"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#0F4C81"
                      className="w-6 h-6"
                    >
                      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative h-[140px] rounded-lg overflow-hidden">
                <Image
                  src="/images/media/IMG_3999.JPG"
                  alt="Photo 4"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#0F4C81"
                      className="w-6 h-6"
                    >
                      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 mt-12">Foydali havolalar</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <a href="https://president.uz/oz/pages/view/about_staff?menu_id=15">
                <div className="mb-3">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/1200px-Emblem_of_Uzbekistan.svg.png"
                    alt="President.uz"
                    width={60}
                    height={60}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-sm font-medium mb-1">
                  O'zbekiston Respublikasi Prezidenti
                </h3>
              </a>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <a href="https://parliament.gov.uz/">
                <div className="mb-3">
                  <Image
                    src="https://senat.uz/media/post/images/1678712800626015.jpg"
                    alt="Parliament.gov.uz"
                    width={60}
                    height={60}
                    className="mx-auto mt-6"
                  />
                </div>
                <h3 className="text-sm font-medium mb-1">
                  O'zbekiston Respublikasi Oliy Majlisi
                </h3>
              </a>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <a href="https://gov.uz/oz/yoshlar">
                <div className="mb-3">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoMtJb1iPPysvVP-XwNiU3MAikGD9Bgju1KGAwSiYNj1gZGdzfgXfx9xOjixwk9ya9Xrg&usqp=CAU"
                    alt="Gov.uz"
                    width={60}
                    height={60}
                    className="mx-auto mt-6"
                  />
                </div>
                <h3 className="text-sm font-medium mb-1">
                  O'zbekiston Respublikasi Hukumati portali
                </h3>
              </a>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <a href="https://pri.oliymajlis.uz/">
                <div className="mb-3">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJIxc4j2_KzTRl2xoJiCa5tsGzTOjxW1LOQ&s"
                    alt="PRI Oliy Majlis"
                    width={60}
                    height={60}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-sm font-medium mb-1">
                  O'zbekiston Respublikasi Oliy Majlisi huzuridagi Parlament
                  tadqiqotlari instituti
                </h3>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
