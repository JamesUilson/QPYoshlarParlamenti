"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { Calendar, ChevronRight, ArrowLeft } from "lucide-react";
import { getNewsById, getNews, initializeData, type NewsItem } from "@/lib/data-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NewsDetail({ params }: PageProps) {
  const { id } = use(params);
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    initializeData();
    const item = getNewsById(id);
    if (item) {
      setNewsItem(item);
      const allNews = getNews().filter((n) => n.id !== id);
      setRelatedNews(allNews.slice(0, 4));
    }
  }, [id]);

  if (!newsItem) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Yangilik topilmadi</h1>
          <Link
            href="/yangiliklar"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Yangiliklar sahifasiga qaytish
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/yangiliklar"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Yangiliklar sahifasiga qaytish
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">{newsItem.title}</h1>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{newsItem.date} | {newsItem.time}</span>
                  <span className="mx-2">|</span>
                  <span>{newsItem.location}</span>
                </div>

                <div className="relative h-[400px] w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={newsItem.image || "/placeholder.svg"}
                    alt={newsItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  {newsItem.description}
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-blue-600">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                        </svg>
                        Ulashish
                      </button>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                      {newsItem.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">O'xshash yangiliklar</h2>
              <div className="space-y-4">
                {relatedNews.map((related) => (
                  <div key={related.id} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        width={80}
                        height={60}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium line-clamp-2 mb-1">
                        <Link
                          href={`/yangiliklar/${related.id}`}
                          className="hover:text-blue-600"
                        >
                          {related.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-500">{related.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Kategoriyalar</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/yangiliklar?category=all"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Barchasi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/yangiliklar?category=qonunchilik-palatasi"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Qonunchilik palatasi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/yangiliklar?category=yoshlar-parlamenti"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Yoshlar parlamenti
                  </Link>
                </li>
                <li>
                  <Link
                    href="/yangiliklar?category=xalqaro-aloqalar"
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Xalqaro aloqalar
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Teglar</h2>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
