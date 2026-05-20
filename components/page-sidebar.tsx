"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang-context";

interface SidebarLink {
  title: string;
  href: string;
}

interface PageSidebarProps {
  links: SidebarLink[];
}

export default function PageSidebar({ links }: PageSidebarProps) {
  const pathname = usePathname();
  const { tr } = useLang();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
      {/* Nav links */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-4 py-3 text-sm transition hover:bg-blue-50 hover:text-[#0047AB] border-l-4 ${
                  pathname === link.href
                    ? "border-[#0047AB] bg-blue-50 text-[#0047AB] font-medium"
                    : "border-transparent text-gray-700"
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Virtual qabulxona */}
      <a
        href="https://t.me/yoshlar_qp_murojaat_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#0047AB] text-white rounded-sm p-4 hover:bg-blue-700 transition"
      >
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.94z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs text-white/70">{tr("footer-murojaat")}</p>
          <p className="text-sm font-semibold">{tr("virtual-qabulxona")}</p>
        </div>
      </a>

      {/* Ombudsman */}
      <a
        href="https://ombudsman.uz/uz"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-white border border-gray-200 rounded-sm p-4 hover:border-[#0047AB] transition"
      >
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-[#0047AB] font-bold text-xs">OMB</div>
        <div>
          <p className="text-sm font-semibold text-gray-800">"Ombudsman"</p>
          <p className="text-xs text-gray-500 leading-tight">O&apos;zbekiston Respublikasi Oliy Majlisining Inson huquqlari bo&apos;yicha vakili</p>
        </div>
      </a>

      {/* Bolalar ombudsmani */}
      <a
        href="https://bolalarvakili.uz/uz"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-white border border-gray-200 rounded-sm p-4 hover:border-[#0047AB] transition"
      >
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-700 font-bold text-xs">BO</div>
        <div>
          <p className="text-sm font-semibold text-gray-800">"Bolalar ombudsmani"</p>
          <p className="text-xs text-gray-500 leading-tight">Bola huquqlari bo'yicha vakili</p>
        </div>
      </a>

      {/* Social */}
      <div className="bg-white border border-gray-200 rounded-sm p-4 space-y-3">
        <a
          href="https://t.me/yoshlar_parlamenti"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#0047AB] transition"
        >
          <span className="w-8 h-8 bg-[#29ABE2] rounded-full flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.94z"/>
            </svg>
          </span>
          Telegram kanaliga obuna bo'lish
        </a>
        <a
          href="https://www.youtube.com/@yoshlarparlamenti"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-gray-700 hover:text-red-600 transition"
        >
          <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
            </svg>
          </span>
          YouTube kanaliga obuna bo'lish
        </a>
      </div>
    </aside>
  );
}
