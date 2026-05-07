import Link from "next/link";
import React from "react";

interface ElementType {
  link: string;
  id: string | number;
  name: string;
}

interface LeftSidebarProps {
  elements: ElementType[];
  title: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ elements, title }) => {
  return (
    <div className="w-full">
      <div className="bg-blue-600 text-white rounded-lg overflow-hidden">
        <div className="p-4 border-b border-blue-500">
          <h2 className="font-bold">{title}</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-2 ">
            {elements.map((element) => (
              <li key={element.id}>
                <Link href={element.link} className="hover:underline">
                  {element.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
