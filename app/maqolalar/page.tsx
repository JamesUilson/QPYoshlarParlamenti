"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getArticles, initializeData, type Article } from "@/lib/data-store";
import { getLocalized } from "@/lib/get-localized";
import { useLang } from "@/lib/lang-context";

export default function Maqolalar() {
  const { tr, lang } = useLang();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    initializeData();
    setArticles(getArticles());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Page Header */}
      <section className="bg-[#0047AB] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{tr("articles-page-title")}</h1>
          <p className="text-lg max-w-3xl">{tr("articles-page-desc")}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative h-[200px] w-full">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{getLocalized(article, "title", lang)}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {article.date} — {article.author}, {article.position}
                </p>
                <p className="text-gray-700 mb-3">{getLocalized(article, "description", lang)}</p>
                <Link
                  href={`/maqolalar/${article.id}`}
                  className="inline-block bg-[#0047AB] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {tr("korish")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
