"use client";

import MemberInfo from "@/components/page-components/MemberInfo";
import Sidebar from "@/components/page-components/RightSidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import { getMemberById, initializeData, type Member } from "@/lib/data-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

const MemberDetail = ({ params }: PageProps) => {
  const { id } = use(params);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    initializeData();
    const found = getMemberById(id);
    setMember(found);
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/yoshlar-parlamenti-azolari"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ortga qaytish
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {member ? (
            <MemberInfo member={member} />
          ) : (
            <div className="text-lg">A'zo topilmadi.</div>
          )}
          <Sidebar />
        </div>
      </div>
    </main>
  );
};

export default MemberDetail;
