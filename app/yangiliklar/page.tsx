"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getNews, initializeData, type NewsItem } from "@/lib/data-store";
import { getLocalized } from "@/lib/get-localized";
import { useLang } from "@/lib/lang-context";

export default function Yangiliklar() {
  const { tr, lang } = useLang();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    initializeData();
    setNews(getNews());
  }, []);

  const categories = [
    { key: "cat-all", value: "" },
    { key: "cat-qonunchilik", value: "Qonunchilik palatasi" },
    { key: "cat-yoshlar", value: "Yoshlar parlamenti" },
    { key: "cat-xalqaro", value: "Xalqaro aloqalar" },
  ];

  const filteredNews = selectedCategory === ""
    ? news
    : news.filter(item => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{tr("news-page-title")}</h1>
          <p className="text-lg max-w-3xl">{tr("news-page-desc")}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{tr("news-latest")}</h2>
              <div className="relative">
                <select
                  className="bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.value}>
                      {tr(cat.key)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {filteredNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {item.date} | {item.time}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {getLocalized(item, "title", lang)}
                      </h3>
                      <p className="text-gray-700 mb-4">{getLocalized(item, "description", lang)}</p>
                      <Link
                        href={`/yangiliklar/${item.id}`}
                        className="text-blue-600 hover:underline flex items-center text-sm font-medium"
                      >
                        {tr("batafsil-oqish")}{" "}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <nav className="flex items-center">
                <button className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100">
                  &laquo; {tr("oldingi")}
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 bg-blue-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100">
                  2
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100">
                  {tr("keyingi")} &raquo;
                </button>
              </nav>
            </div>
          </div>

          <div className="md:w-1/4 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">{tr("kategoriyalar")}</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <button
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`flex items-center text-left w-full hover:text-blue-600 transition ${
                        selectedCategory === cat.value ? 'text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {tr(cat.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">{tr("arxiv")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/yangiliklar?year=2025&month=2"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Fevral, 2025
                  </Link>
                </li>
                <li>
                  <Link
                    href="/yangiliklar?year=2025&month=1"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Yanvar, 2025
                  </Link>
                </li>
                <li>
                  <Link
                    href="/yangiliklar?year=2024&month=12"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Dekabr, 2024
                  </Link>
                </li>
                <li>
                  <Link
                    href="/yangiliklar?year=2024&month=11"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Noyabr, 2024
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">{tr("teglar")}</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/yangiliklar?tag=parlament"
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-800"
                >
                  Parlament
                </Link>
                <Link
                  href="/yangiliklar?tag=yoshlar"
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-800"
                >
                  Yoshlar
                </Link>
                <Link
                  href="/yangiliklar?tag=qonun"
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-800"
                >
                  Qonun
                </Link>
                <Link
                  href="/yangiliklar?tag=majlis"
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-800"
                >
                  Majlis
                </Link>
                <Link
                  href="/yangiliklar?tag=xalqaro"
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-800"
                >
                  Xalqaro
                </Link>
                <Link
                  href="/yangiliklar?tag=uchrashuv"
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-800"
                >
                  Uchrashuv
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
