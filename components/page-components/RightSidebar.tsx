import Link from "next/link";
import React from "react";

const RightSidebar = () => {
  return (
    <div className="w-full lg:w-1/4">
      <div className="bg-blue-600 text-white rounded-lg overflow-hidden">
        <div className="p-4 border-b border-blue-500">
          <h2 className="font-bold">Parlament tarixi</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                Qonunchilik palatasi kengashi tarixi
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Qonunchilik palatasi rahbariyati
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Fraksiyalar
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Qo'mitalar
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Komissiyalar
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Deputatlar
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Saylov okruglari
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Qonunchilik palatasi Devoni
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
