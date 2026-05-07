"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getArticleById, initializeData, type Article } from "@/lib/data-store";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ArticleDetail({ params }: PageProps) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    initializeData();
    const found = getArticleById(params.id);
    setArticle(found);
  }, [params.id]);

  if (!article) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/maqolalar"
            className="inline-flex items-center text-blue-600 hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ortga qaytish
          </Link>
          <div className="text-lg text-gray-500">Maqola topilmadi.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/maqolalar"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ortga qaytish
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-4xl mx-auto">
          <div className="relative h-[300px] w-full">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {article.date} — {article.author}, {article.position}
            </p>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {article.description}
            </div>

            {article.fileUrl && (
              <div className="mt-6 pt-4 border-t">
                <a
                  href={article.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0047AB] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  📄 {article.fileName || "Faylni yuklab olish"}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
