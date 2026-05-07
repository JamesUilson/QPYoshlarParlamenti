import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Article {
  id: string | number;
  title: string;
  image?: string;
}

interface Member {
  name: string;
  image?: string;
  position?: string;
  birthYear?: string | number;
  birthPlace?: string;
  nationality?: string;
  education?: string;
  university?: string;
  specialization?: string;
  degree?: string;
  languages?: string;
  email?: string;
  articles?: Article[];
}

const MemberInfo = ({ member }: { member: Member }) => {
  return (
    <div className="md:w-3/4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="relative h-[400px] w-full">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 bg-blue-600 text-white text-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>Virtual qabulxona</span>
              </Link>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold mb-6">{member.name}</h1>

            <div className="space-y-4">
              <div className="border-b border-gray-300 pb-3 border-t pt-3">
                <h2 className="font-semibold mb-1">Lavozimi:</h2>
                <p>{member.position}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">Tug'ilgan yili:</h2>
                <p>{member.birthYear}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">Tug'ilgan joyi:</h2>
                <p>{member.birthPlace}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">Millati:</h2>
                <p>{member.nationality}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">Ma'lumoti:</h2>
                <p>{member.education}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">O'qish joyi:</h2>
                <p>{member.university}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">Mutaxasisligi:</h2>
                <p>{member.specialization}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">Ilmiy darajasi:</h2>
                <p>{member.degree}</p>
              </div>

              <div className="border-b border-gray-300 pb-3">
                <h2 className="font-semibold mb-1">Chet tillarini bilishi:</h2>
                <p>{member.languages}</p>
              </div>

              <div>
                <h2 className="font-semibold mb-1">Pochta manzili:</h2>
                <a
                  href={`mailto:${member.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {member.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Qo'shimcha ma'lumotlar</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-700 mb-4">
            {member.name} {member.position} lavozimida faoliyat yuritib
            kelmoqda. U o'z faoliyati davomida yoshlar manfaatlarini ifoda
            etish, yoshlar siyosatini takomillashtirish, yoshlarning
            ijtimoiy-siyosiy faolligini oshirish yo'nalishlarida samarali ishlar
            olib bormoqda.
          </p>
          <p className="text-gray-700">
            {member.name} bir qator xalqaro konferensiyalarda ishtirok etgan,
            yoshlar masalalari bo'yicha bir qancha maqolalar va ilmiy ishlar
            muallifi hisoblanadi.
          </p>
        </div>
      </div>

      {/* Articles */}
      {member.articles && member.articles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Deputat maqolalari</h2>
          <div className="space-y-4">
            {member.articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex">
                  <div className="w-1/4">
                    <div className="relative h-[100px] w-full">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-3/4 p-4">
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <Link
                      href="#"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Batafsil o'qish
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberInfo;
