"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import ParliamentLogo from "./parliament-logo";

const Header = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const dropdownMenus = {
    "yoshlar-parlamenti": [
      {
        title: "Yoshlar parlamenti tarixi",
        href: "/yoshlar-parlamenti/tarixi",
      },
      {
        title: "Yoshlar parlamenti Kengashi",
        href: "/yoshlar-parlamenti/kengashi",
      },
      {
        title: "Yoshlar parlamenti Rahbariyati",
        href: "/yoshlar-parlamenti/rahbariyati",
      },
      {
        title: "Yoshlar parlamenti Qo'mitalar",
        href: "/yoshlar-parlamenti/qomitalar",
      },
      {
        title: "Parlamentning yoshlar guruxlari",
        href: "/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari",
      },
      {
        title: "Yoshlar parlamenti Nizomi va Reglamenti",
        href: "/yoshlar-parlamenti/nizomi",
      },
    ],
    tadbirlar: [
      { title: "Yalpi majlislar", href: "/tadbirlar/yalpi-majlislar" },
      {
        title: "Siyosiy partiyalarning yoshlar guruhlari yig'ilishlari",
        href: "/tadbirlar/siyosiy-partiyalar",
      },
      {
        title: "Qo'mitalar yig'ilishi",
        href: "/tadbirlar/qomitalar-yigilishi",
      },
      { title: "Boshqa tadbirlar", href: "/tadbirlar/boshqa" },
    ],
    yangiliklar: [
      { title: "Yangiliklar", href: "/yangiliklar" },
      { title: "Maqolalar", href: "/maqolalar" },
      { title: "Munosabatlar", href: "/munosabatlar" },
    ],
    "xalqaro-munosabatlar": [
      {
        title: "Xalqaro tadbirlar",
        href: "/xalqaro-munosabatlar/xalqaro-tadbirlar",
      },
      {
        title: "Do'stlik guruhlar",
        href: "/xalqaro-munosabatlar/dostlik-guruhlar",
      },
    ],
  };

  return (
    <header className="w-full shadow-sm">
      {/* Main Header with Logo and Navigation */}
      <div className="bg-white" ref={dropdownRef}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 py-1">
              <ParliamentLogo className="h-10 w-auto object-contain" />
              <div className="hidden sm:block">
                <div className="text-xs text-gray-600 leading-tight">
                  O'ZBEKISTON RESPUBLIKASI OLIY MAJLISI
                </div>
                <div className="text-xs text-gray-600 leading-tight">
                  QONUNCHILIK PALATASI HUZURIDAGI
                </div>
                <div className="text-base font-bold text-[#0047AB] leading-tight">
                  YOSHLAR PARLAMENTI
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="relative">
                <button
                  className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0047AB] flex items-center transition ${
                    activeDropdown === "yoshlar-parlamenti" ? "text-[#0047AB]" : ""
                  }`}
                  onClick={() => toggleDropdown("yoshlar-parlamenti")}
                >
                  Yoshlar parlamenti
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === "yoshlar-parlamenti" && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg border rounded-md mt-1 z-50">
                    <div className="py-1">
                      {dropdownMenus["yoshlar-parlamenti"].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0047AB]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/yoshlar-parlamenti-azolari"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0047AB] transition"
              >
                A'zolar
              </Link>

              <div className="relative">
                <button
                  className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0047AB] flex items-center transition ${
                    activeDropdown === "tadbirlar" ? "text-[#0047AB]" : ""
                  }`}
                  onClick={() => toggleDropdown("tadbirlar")}
                >
                  Tadbirlar
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === "tadbirlar" && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg border rounded-md mt-1 z-50">
                    <div className="py-1">
                      {dropdownMenus["tadbirlar"].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0047AB]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0047AB] flex items-center transition ${
                    activeDropdown === "yangiliklar" ? "text-[#0047AB]" : ""
                  }`}
                  onClick={() => toggleDropdown("yangiliklar")}
                >
                  Yangiliklar
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === "yangiliklar" && (
                  <div className="absolute left-0 top-full w-48 bg-white shadow-lg border rounded-md mt-1 z-50">
                    <div className="py-1">
                      {dropdownMenus["yangiliklar"].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0047AB]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0047AB] flex items-center transition ${
                    activeDropdown === "xalqaro-munosabatlar" ? "text-[#0047AB]" : ""
                  }`}
                  onClick={() => toggleDropdown("xalqaro-munosabatlar")}
                >
                  Xalqaro
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === "xalqaro-munosabatlar" && (
                  <div className="absolute left-0 top-full w-56 bg-white shadow-lg border rounded-md mt-1 z-50">
                    <div className="py-1">
                      {dropdownMenus["xalqaro-munosabatlar"].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0047AB]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/mediateka"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0047AB] transition"
              >
                Mediateka
              </Link>

              <Link
                href="/admin/login"
                className="ml-2 px-4 py-2 text-sm font-medium bg-[#0047AB] text-white rounded-md hover:bg-blue-700 transition"
              >
                Kirish
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Blue bar below */}
        <div className="bg-[#0047AB] h-1"></div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <div className="border-b pb-2">
                <p className="font-medium text-gray-500 px-2 py-1">Yoshlar parlamenti</p>
                {dropdownMenus["yoshlar-parlamenti"].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/yoshlar-parlamenti-azolari"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                A'zolar
              </Link>
              <div className="border-b pb-2">
                <p className="font-medium text-gray-500 px-2 py-1">Tadbirlar</p>
                {dropdownMenus["tadbirlar"].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="border-b pb-2">
                <p className="font-medium text-gray-500 px-2 py-1">Yangiliklar</p>
                {dropdownMenus["yangiliklar"].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="border-b pb-2">
                <p className="font-medium text-gray-500 px-2 py-1">Xalqaro munosabatlar</p>
                {dropdownMenus["xalqaro-munosabatlar"].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/mediateka"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mediateka
              </Link>
              <Link
                href="/admin/login"
                className="block px-4 py-2 text-sm font-medium text-white bg-[#0047AB] hover:bg-blue-700 rounded mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kirish
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
