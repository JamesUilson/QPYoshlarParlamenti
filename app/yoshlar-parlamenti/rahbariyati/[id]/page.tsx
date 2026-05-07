import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MemberInfo from "@/components/page-components/MemberInfo";
import RightSidebar from "@/components/page-components/RightSidebar";

interface PageProps {
  params: {
    id: string;
  };
}

const leaders = [
  {
    id: "1",
    name: "Sobitov Otabekxo‘ja Yo‘ldoshovich",
    position:
      "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamentining Spikeri",
    birthYear: "1997",
    birthPlace: "Toshkent shahar",
    nationality: "o‘zbek",
    education: "oliy ma'lumotli",
    university: "Toshkent davlat pedagogika universiteti",
    specialization: "amaliy psixolog",
    degree: "yo’q",
    languages: "rus tili",
    email: "zpom@parliament.gov.uz",
    image: "/images/deputatlar/photo_2025-05-03_20-38-24.jpg",
    articles: [],
  },
  {
    id: "2",
    name: "Axadova Husnora Akbar qizi",
    position:
      "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari",
    birthYear: "2000",
    birthPlace: "Samarqand viloyati",
    nationality: "o‘zbek",
    education: "oliy ma'lumotli",
    university: "Toshkent davlat pedagogika universiteti",
    specialization: "Tabiiy fanlar",
    degree: "yo’q",
    languages: "rus tili, ingliz tili",
    email: "zpom@parliament.gov.uz",
    image: "/images/deputatlar/image_2025-05-03_19-34-15.png",
    articles: [],
  },
  {
    id: "3",
    name: "Suyarov Komiljon Sattarovich",
    position:
      "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Liberal demokratik partiyasi yoshlar guruhi rahbari",
    birthYear: "2002",
    birthPlace: "Samarqand viloyati",
    nationality: "o‘zbek",
    education: "oliy ma'lumotli",
    university: "Toshkent davlat sharqshunoslik universiteti",
    specialization: "siyosatshunoslik",
    degree: "yo’q",
    languages: "ingliz tili",
    email: "zpom@parliament.gov.uz",
    image: "/images/deputatlar/image_2025-05-03_19-35-29.png",
    articles: [],
  },
  {
    id: "4",
    name: "Murodov Nodir Oybek o‘g‘li",
    position:
      "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Milliy tiklanish demokratik partiyasi yoshlar guruhi rahbari",
    birthYear: "1998",
    birthPlace: "Jizzax viloyati",
    nationality: "o‘zbek",
    education: "oliy ma'lumotli",
    university: "Toshkent davlat pedagogika universiteti",
    specialization:
      "harbiy taʼlim fani o‘qituvchisi, taʼlim muassasalari boshqaruvi",
    degree: "yo’q",
    languages: "rus tili",
    email: "zpom@parliament.gov.uz",
    image: "/images/deputatlar/image_2025-05-03_19-34-28.png",
    articles: [],
  },
  {
    id: "5",
    name: "Аdilova Farzona Аlisher qizi",
    position:
      "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Adolat sotsial demokratik partiyasi yoshlar guruhi rahbari",
    birthYear: "2001",
    birthPlace: "Jizzax viloyati",
    nationality: "o‘zbek",
    education: "oliy ma'lumotli",
    university: "Jizzax davlat pedagogika universiteti",
    specialization: "Pedagogika va psixologiya",
    degree: "yo’q",
    languages: "rus tili",
    email: "zpom@parliament.gov.uz",
    image: "/images/deputatlar/image_2025-05-03_19-34-38.png",
    articles: [],
  },

  {
    id: "6",
    name: "Oʼktamov Shoxruxbek Ulugʼbek oʼgʼli",
    position:
      "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Xalq demokratik partiyasi yoshlar guruhi rahbari",
    birthYear: "1996",
    birthPlace: "Fargʼona viloyati",
    nationality: "o‘zbek",
    education: "oliy ma'lumotli",
    university: "Fargʼona shahridagi Koreya Xalqaro universiteti",
    specialization: "Arxitektura muhandisligi",
    degree: "yo’q",
    languages: "koreys tili",
    email: "zpom@parliament.gov.uz",
    image: "/images/deputatlar/image_2025-05-03_19-35-18.png",
    articles: [],
  },
  {
    id: "7",
    name: "Ergash Moxinurxon Odilxon qizi",
    position:
      "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamenti rais o‘rinbosari, O‘zbekiston Ekologik partiyasi yoshlar guruhi rahbari",
    birthYear: "1997",
    birthPlace: "Toshkent shahri",
    nationality: "o‘zbek",
    education: "oliy ma'lumotli",
    university: "Toshkent davlat texnika universiteti",
    specialization: "Ekologiya va atrof-muhit muhofazasi",
    degree: "yo’q",
    languages: "Ingliz va rus tili",
    email: "zpom@parliament.gov.uz",
    image: "/images/deputatlar/image_2025-05-03_19-34-53.png",
    articles: [],
  },
];

export default function MemberDetail({ params }: PageProps) {
  const member = leaders.find((leader) => leader.id === params.id);

  if (!member) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">A'zo topilmadi</h1>
          <Link
            href="/yoshlar-parlamenti/rahbariyati"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Rahbariyat sahifasiga qaytish
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
            href="/yoshlar-parlamenti/rahbariyati"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Rahbariyat sahifasiga qaytish
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <MemberInfo member={member} />

          {/* Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </main>
  );
}
