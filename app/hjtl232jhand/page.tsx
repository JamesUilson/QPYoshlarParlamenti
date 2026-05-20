"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Newspaper, 
  Calendar, 
  Users, 
  FileText, 
  Image as ImageIcon,
  ArrowRight,
  Eye,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNews, getEvents, getMembers, getArticles, getMedia, getVisitorStats, initializeData, VisitorStats } from "@/lib/data-store";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    news: 0,
    events: 0,
    members: 0,
    articles: 0,
    media: 0,
  });
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
    lastVisit: "",
    pageViews: {}
  });

  useEffect(() => {
    initializeData();
    setStats({
      news: getNews().length,
      events: getEvents().length,
      members: getMembers().length,
      articles: getArticles().length,
      media: getMedia().length,
    });
    setVisitorStats(getVisitorStats());
  }, []);

  const quickLinks = [
    {
      title: "Yangiliklar",
      count: stats.news,
      icon: Newspaper,
      href: "/hjtl232jhand/news",
      color: "bg-blue-500",
      description: "Yangiliklar qo'shish, tahrirlash va o'chirish",
    },
    {
      title: "Tadbirlar",
      count: stats.events,
      icon: Calendar,
      href: "/hjtl232jhand/events",
      color: "bg-green-500",
      description: "Tadbirlar qo'shish, tahrirlash va o'chirish",
    },
    {
      title: "A'zolar",
      count: stats.members,
      icon: Users,
      href: "/hjtl232jhand/members",
      color: "bg-purple-500",
      description: "Parlament a'zolarini boshqarish",
    },
    {
      title: "Maqolalar",
      count: stats.articles,
      icon: FileText,
      href: "/hjtl232jhand/articles",
      color: "bg-orange-500",
      description: "Maqolalar qo'shish va boshqarish",
    },
    {
      title: "Mediateka",
      count: stats.media,
      icon: ImageIcon,
      href: "/hjtl232jhand/media",
      color: "bg-pink-500",
      description: "Foto va video materiallar",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Boshqaruv paneli</h1>
        <p className="text-gray-600">
          Yoshlar Parlamenti veb-saytini boshqarish uchun quyidagi bo'limlardan foydalaning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Card key={link.title} className="hover:shadow-lg transition">
            <CardHeader>
              <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <link.icon className="text-white" size={24} />
              </div>
              <CardTitle>{link.title}</CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{link.count}</span>
                <Link href={link.href}>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    Boshqarish <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visitor Statistics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="mr-2" /> Tashrif statistikasi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Jami tashriflar</p>
                  <p className="text-3xl font-bold">{visitorStats.totalVisits}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Eye className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Bugungi tashriflar</p>
                  <p className="text-3xl font-bold">{visitorStats.todayVisits}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unikal tashrif buyuruvchilar</p>
                  <p className="text-3xl font-bold">{visitorStats.uniqueVisitors}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Page Views Stats */}
        {Object.keys(visitorStats.pageViews).length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sahifalar bo'yicha ko'rishlar</CardTitle>
              <CardDescription>Eng mashhur sahifalar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(visitorStats.pageViews)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([page, count]) => (
                    <div key={page} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm">{page}</span>
                      <span className="font-semibold text-blue-600">{count} marta</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Yordam</h2>
        <p className="text-gray-700 mb-4">
          Barcha o'zgarishlar brauzeringizning localStorage'ida saqlanadi. 
          Sahifani yangilaganingizda ma'lumotlar o'chib ketmaydi.
        </p>
        <p className="text-gray-700">
          Yangi ma'lumot qo'shish uchun tegishli bo'limga o'ting va "Yangi qo'shish" tugmasini bosing.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
