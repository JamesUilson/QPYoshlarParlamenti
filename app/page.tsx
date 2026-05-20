"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Calendar, ChevronRight, Clock, ChevronLeft } from "lucide-react";
import { getNews, getEvents, getArticles, getMembers, getMedia, getCommittees, getYoshlarGuruhlari, initializeData, type NewsItem, type EventItem, type Article, type Member, type MediaItem, type Committee, type YoshlarGuruhi } from "@/lib/data-store";
import UzbekistanMap from "@/components/uzbekistan-map";
import { useLang } from "@/lib/lang-context";

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
  const { tr } = useLang();
  const MONTH_NAMES = [
    tr("month-1"), tr("month-2"), tr("month-3"), tr("month-4"), tr("month-5"), tr("month-6"),
    tr("month-7"), tr("month-8"), tr("month-9"), tr("month-10"), tr("month-11"), tr("month-12"),
  ];
  const DAY_NAMES = [tr("day-1"), tr("day-2"), tr("day-3"), tr("day-4"), tr("day-5"), tr("day-6"), tr("day-7")];
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [yoshlarGuruhlari, setYoshlarGuruhlari] = useState<YoshlarGuruhi[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());

  useEffect(() => {
    initializeData();
    setNewsItems(getNews());
    setEvents(getEvents());
    setArticles(getArticles());
    setMembers(getMembers());
    setMedia(getMedia());
    setCommittees(getCommittees());
    setYoshlarGuruhlari(getYoshlarGuruhlari());
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
                    {tr("batafsil")}
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

      {/* ===== YANGILIKLAR ===== */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{tr("yangiliklar")}</h2>
            <Link href="/yangiliklar" className="text-[#0047AB] hover:underline flex items-center text-sm font-medium">
              {tr("barchasi-korish")} <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 3 big news cards (first 3) */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {newsItems.slice(0, 3).map((item) => (
                <Link key={item.id} href={`/yangiliklar/${item.id}`} className="group block">
                  <div className="relative h-44 w-full rounded overflow-hidden mb-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    {item.category && (
                      <span className="absolute top-2 left-2 bg-[#0047AB] text-white text-xs px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#0047AB] font-medium mb-1">{item.category}</p>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#0047AB] transition line-clamp-3 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-1">{item.description}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </Link>
              ))}
              {/* Second row: next 3 big cards */}
              {newsItems.slice(3, 6).map((item) => (
                <Link key={item.id} href={`/yangiliklar/${item.id}`} className="group block">
                  <div className="relative h-44 w-full rounded overflow-hidden mb-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    {item.category && (
                      <span className="absolute top-2 left-2 bg-[#0047AB] text-white text-xs px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#0047AB] font-medium mb-1">{item.category}</p>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#0047AB] transition line-clamp-3 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-1">{item.description}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </Link>
              ))}
            </div>
            {/* Side list: items 6-12 (fallback to 3-6 if fewer) */}
            <div className="lg:col-span-1 space-y-4 border-l border-gray-100 lg:pl-4">
              {(newsItems.length > 6 ? newsItems.slice(6, 12) : newsItems.slice(3, 9)).map((item) => (
                <Link key={item.id} href={`/yangiliklar/${item.id}`} className="flex gap-3 group">
                  <div className="relative w-16 h-14 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-400 mb-0.5">{item.date}</p>
                    <p className="text-xs font-medium text-gray-800 group-hover:text-[#0047AB] transition line-clamp-3 leading-snug">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TADBIRLAR ===== */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{tr("tadbirlar")}</h2>
            <Link href="/tadbirlar" className="text-[#0047AB] hover:underline flex items-center text-sm font-medium">
              {tr("barchasi-korish")} <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <div className="text-sm font-bold">{MONTH_NAMES[calMonth]}</div>
                  <div className="text-xs text-gray-500">{calYear}</div>
                </div>
                <button
                  onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
                {DAY_NAMES.map((d) => <div key={d} className="p-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 text-center text-xs">
                {calendarDays.map((d, i) => {
                  const isToday = isCurrentMonth && d.current && d.day === today.getDate();
                  const hasEvent = d.current && hasEventOnDay(d.day);
                  return (
                    <div key={i} className={`p-1 rounded-full ${!d.current ? "text-gray-300" : isToday ? "bg-[#0047AB] text-white font-bold" : hasEvent ? "bg-blue-100 text-[#0047AB] font-medium" : "text-gray-700"}`}>
                      {d.day}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Event cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {events.slice(0, 6).map((event) => (
                <Link key={event.id} href={`/tadbirlar/${event.id}`} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition group">
                  <div className="flex justify-between items-start text-xs text-gray-400 mb-2">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#0047AB] transition line-clamp-3 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{event.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAQOLALAR ===== */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{tr("maqolalar")}</h2>
            <Link href="/maqolalar" className="text-[#0047AB] hover:underline flex items-center text-sm font-medium">
              {tr("barchasi-korish")} <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 3 big article cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {articles.slice(0, 6).map((article) => (
                <Link key={article.id} href={article.fileUrl ? "#" : `/maqolalar/${article.id}`}
                  {...(article.fileUrl ? { onClick: (e) => { e.preventDefault(); window.open(article.fileUrl, "_blank"); } } : {})}
                  className="group block"
                >
                  <div className="relative h-44 w-full rounded overflow-hidden mb-3">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{article.date}</p>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#0047AB] transition line-clamp-2 mb-1">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-[#0047AB] flex items-center justify-center text-white text-[8px]">
                        {article.author?.[0] || "A"}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{article.author}</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* Side list */}
            <div className="lg:col-span-1 space-y-4">
              {articles.slice(6, 12).map((article) => (
                <Link key={article.id} href={`/maqolalar/${article.id}`} className="flex gap-3 group">
                  <div className="relative w-16 h-14 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">{article.date}</p>
                    <p className="text-xs font-medium text-gray-800 group-hover:text-[#0047AB] transition line-clamp-2">
                      {article.title}
                    </p>
                    <p className="text-[11px] text-gray-400">{article.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERAKTIV XARITA ===== */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-7 bg-[#0047AB] rounded" />
            <h2 className="text-2xl font-bold text-gray-900">{tr("section-xarita")}</h2>
          </div>
          <UzbekistanMap members={members} committees={committees} yoshlarGuruhlari={yoshlarGuruhlari} />
        </div>
      </section>

      {/* ===== MEDIATEKA ===== */}
      {media.length > 0 && (() => {
        const recent = [...media].slice(0, 5);
        const featured = recent[0];
        const rest = recent.slice(1, 5);
        return (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{tr("mediateka")}</h2>
                <Link href="/mediateka" className="text-[#0047AB] hover:underline flex items-center text-sm font-medium">
                  {tr("barchasi-korish")} <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Featured (large left) */}
                <div className="lg:col-span-1 relative rounded-xl overflow-hidden group cursor-pointer" style={{ minHeight: 280 }}>
                  <Link href="/mediateka">
                    <Image
                      src={featured.image || "/placeholder.svg"}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {featured.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-sm leading-snug line-clamp-2">{featured.title}</p>
                      <p className="text-white/70 text-xs mt-1">{featured.date}</p>
                    </div>
                  </Link>
                </div>
                {/* 2x2 grid (right) */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  {rest.map((item) => (
                    <Link
                      key={item.id}
                      href="/mediateka"
                      className="relative rounded-xl overflow-hidden group cursor-pointer"
                      style={{ minHeight: 130 }}
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/50 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      )}
                      {item.type === "photo" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/50 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ===== OTHERS (rasmli overlay kartalar) ===== */}
      <OthersSection />

      {/* ===== FOYDALI HAVOLALAR (slider) ===== */}
      <UsefullSection />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  OTHERS SECTION                                                      */
/* ------------------------------------------------------------------ */
const OTHERS = [
  {
    href: "https://pri.oliymajlis.uz",
    bg: "https://parliament.gov.uz/_nuxt/img/others1.0f7ac04.jpg",
    logo: "https://parliament.gov.uz/_nuxt/img/others-logo1.4dd6056.png",
    // fallbackBg: "#1a3a5c",
    label: "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Parlament tadqiqotlari instituti",
  },
  {
    href: "https://ngo.gov.uz/oz",
    bg: "https://parliament.gov.uz/_nuxt/img/others3.3c0df1e.jpg",
    logo: "https://ngo.gov.uz/favicon.ico",
    // fallbackBg: "#1e4a2d",
    label: "Oliy Majlis huzuridagi Fuqarolik jamiyati institutlarini qo'llab-quvvatlash jamoat fondi",
  },
  {
    href: "http://www.ombudsman.uz/",
    bg: "https://i.pinimg.com/originals/0a/08/c5/0a08c5c3fb7ec15475c94815c23b7865.jpg?nii=t",
    logo: "https://parliament.gov.uz/media/interactive_services/usefulll.png",
    fallbackBg: "#2d3a5c",
    label: "O'zbekiston Respublikasi Oliy Majlisining Inson huquqlari bo'yicha vakili (Ombudsman)",
  },
  {
    href: "https://bolalarvakili.uz/",
    bg: "https://parliament.gov.uz/_nuxt/img/others2.f9bcd51.jpg",
    logo: "https://bolalarvakili.uz/favicon.ico",
    fallbackBg: "#3a2d5c",
    label: "O'zbekiston Respublikasi Oliy Majlisining Bola huquqlari bo'yicha vakili (Bolalar ombudsmani)",
  },
];

function OthersSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {OTHERS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-xl overflow-hidden group block"
              style={{ minHeight: 180, background: item.fallbackBg }}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.bg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition" />
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-start">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center mb-3 flex-shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.logo} alt="" className="w-7 h-7 object-contain" />
                </div>
                <p className="text-white text-xs font-semibold leading-snug line-clamp-4">{item.label}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOYDALI HAVOLALAR SLIDER                                            */
/* ------------------------------------------------------------------ */
const USEFULL_LINKS = [
  {
    href: "https://my.gov.uz",
    logo: "https://parliament.gov.uz/media/interactive_services/usefull4.png",
    label: "Yagona interaktiv davlat xizmatlari portali",
    url: "www.my.gov.uz",
  },
  {
    href: "http://ombudsman.uz",
    logo: "https://parliament.gov.uz/media/interactive_services/usefulll.png",
    label: "O'zbekiston Respublikasi Oliy Majlisining Inson huquqlari bo'yicha vakili",
    url: "www.ombudsman.uz",
  },
  {
    href: "https://president.uz",
    logo: "https://parliament.gov.uz/media/interactive_services/usefull5_T39hHvI.png",
    label: "O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti",
    url: "www.president.uz",
  },
  {
    href: "https://senat.uz",
    logo: "https://parliament.gov.uz/media/interactive_services/senat-build_tFdRS5u.png",
    label: "O'zbekiston Respublikasi Oliy Majlisi Senati",
    url: "www.senat.uz",
  },
  {
    href: "https://gov.uz",
    logo: "https://parliament.gov.uz/media/interactive_services/favicon_31jjx8x.png",
    label: "O'zbekiston Respublikasi hukumat portali",
    url: "www.gov.uz",
  },
  {
    href: "https://dba.uz",
    logo: "https://parliament.gov.uz/media/interactive_services/favicon.png",
    label: "O'zbekiston Respublikasi Prezidenti huzuridagi Davlat boshqaruvi akademiyasi",
    url: "www.dba.uz",
  },
  {
    href: "http://data.gov.uz",
    logo: "https://parliament.gov.uz/media/interactive_services/usefull3.png",
    label: "O'zbekiston Respublikasi ochiq ma'lumotlar portali",
    url: "www.data.gov.uz",
  },
];

const VISIBLE = 5;

function UsefullSection() {
  const { tr } = useLang();
  const [start, setStart] = useState(0);
  const total = USEFULL_LINKS.length;
  const prev = () => setStart((s) => (s - 1 + total) % total);
  const next = () => setStart((s) => (s + 1) % total);
  const visible = Array.from({ length: VISIBLE }, (_, i) => USEFULL_LINKS[(start + i) % total]);

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{tr("section-foydali")}</h2>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full bg-[#0047AB] text-white flex items-center justify-center hover:bg-blue-700 transition"
              aria-label="Oldingi"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full bg-[#0047AB] text-white flex items-center justify-center hover:bg-blue-700 transition"
              aria-label="Keyingi"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {visible.map((item, i) => (
            <a
              key={`${item.href}-${i}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition group border border-gray-100"
            >
              <div className="w-14 h-14 flex items-center justify-center mb-3">
                <Image
                  src={item.logo}
                  alt={item.label}
                  width={56}
                  height={56}
                  className="object-contain h-14 w-14"
                />
              </div>
              <p className="text-xs font-medium text-gray-700 leading-snug line-clamp-3 mb-2">{item.label}</p>
              <span className="text-xs text-[#0047AB] group-hover:underline mt-auto">{item.url}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
