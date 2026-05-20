"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MessageSquare, User, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import ParliamentLogo from "./parliament-logo";
import { useLang } from "@/lib/lang-context";
import { type Lang, LANG_LABELS } from "@/lib/translations";

const FONT_SIZES = { normal: "16px", large: "18px", xlarge: "20px" };
const FONT_STEPS = ["normal", "large", "xlarge"] as const;

const Header = () => {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { lang, setLang, tr, langLabel } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [fontStep, setFontStep] = useState(0);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const accessRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZES[FONT_STEPS[fontStep]];
  }, [fontStep]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accessRef.current && !accessRef.current.contains(e.target as Node)) setShowAccessibility(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setShowLang(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const dropdownMenus = {
    "yoshlar-parlamenti": [
      { title: tr("tarixi"),           href: "/yoshlar-parlamenti/tarixi" },
      { title: tr("kengashi"),         href: "/yoshlar-parlamenti/kengashi" },
      { title: tr("rahbariyati"),      href: "/yoshlar-parlamenti/rahbariyati" },
      { title: tr("qomitalar"),        href: "/yoshlar-parlamenti/qomitalar" },
      { title: tr("yoshlar-guruxlari"),href: "/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari" },
      { title: tr("nizomi"),           href: "/yoshlar-parlamenti/nizomi" },
    ],
    tadbirlar: [
      { title: tr("yalpi-majlislar"),    href: "/tadbirlar/yalpi-majlislar" },
      { title: tr("siyosiy-partiyalar"), href: "/tadbirlar/siyosiy-partiyalar" },
      { title: tr("qomitalar-yigilishi"),href: "/tadbirlar/qomitalar-yigilishi" },
      { title: tr("boshqa-tadbirlar"),   href: "/tadbirlar/boshqa" },
    ],
    yangiliklar: [
      { title: tr("yangiliklar-sub"), href: "/yangiliklar" },
      { title: tr("maqolalar"),       href: "/maqolalar" },
      { title: tr("munosabatlar"),    href: "/munosabatlar" },
    ],
    "xalqaro-munosabatlar": [
      { title: tr("xalqaro-tadbirlar"), href: "/xalqaro-munosabatlar/xalqaro-tadbirlar" },
      { title: tr("dostlik-guruhlar"),  href: "/xalqaro-munosabatlar/dostlik-guruhlar" },
    ],
  };

  const navItems = [
    { key: "yoshlar-parlamenti",   label: tr("yoshlar-parlamenti"),     items: dropdownMenus["yoshlar-parlamenti"],   width: "w-64" },
    { key: "tadbirlar",            label: tr("tadbirlar"),              items: dropdownMenus["tadbirlar"],           width: "w-64" },
    { key: "yangiliklar",          label: tr("yangiliklar"),            items: dropdownMenus["yangiliklar"],         width: "w-48" },
    { key: "xalqaro-munosabatlar", label: tr("parlament-diplomatiyasi"),items: dropdownMenus["xalqaro-munosabatlar"],width: "w-56" },
  ];

  const fontPct = ["0%", "12%", "25%"];

  return (
    <header className="w-full shadow-sm sticky top-0 z-40">
      {/* ── Top Utility Bar ─────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 xs:gap-3 flex-shrink-1 min-w-0">
              <ParliamentLogo className="h-8 xs:h-10 w-auto object-contain flex-shrink-0" />
              <div className="leading-none xs:leading-tight min-w-0">
                <div className="text-[6px] xs:text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wide truncate">O'ZBEKISTON RESPUBLIKASI OLIY MAJLISI</div>
                <div className="text-[6px] xs:text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wide truncate">QONUNCHILIK PALATASI HUZURIDAGI</div>
                <div className="text-[9px] xs:text-[11px] sm:text-[13px] font-bold text-[#0047AB] uppercase tracking-wide truncate">YOSHLAR PARLAMENTI</div>
              </div>
            </Link>

            {/* Right controls — desktop */}
            <div className="hidden md:flex items-center gap-2">

              {/* Search */}
              <form
                onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/yangiliklar?q=${encodeURIComponent(searchQuery)}`; }}
                className="flex items-center border border-gray-300 rounded overflow-hidden"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tr("search")}
                  className="px-3 py-1.5 text-xs outline-none w-44 bg-transparent"
                />
                <button type="submit" className="px-2 py-1.5 bg-white hover:bg-gray-100 text-gray-500 border-l border-gray-300">
                  <Search className="h-3.5 w-3.5" />
                </button>
              </form>

              {/* Ko'rinish dropdown */}
              <div className="relative" ref={accessRef}>
                <button
                  onClick={() => { setShowAccessibility(v => !v); setShowLang(false); }}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-600 hover:text-[#0047AB] border border-transparent hover:border-gray-200 rounded transition"
                >
                  {tr("korinish")} <ChevronDown className="h-3 w-3" />
                </button>
                {showAccessibility && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 w-64">
                    <p className="text-xs font-bold text-gray-700 mb-3">{tr("korinish")}</p>

                    {/* Font size buttons */}
                    <div className="flex items-center gap-2 mb-4">
                      {([0,1,2] as const).map(i => (
                        <button key={i} onClick={() => setFontStep(i)}
                          className={`w-9 h-9 border rounded font-semibold transition ${fontStep === i ? "border-[#0047AB] text-[#0047AB] bg-blue-50" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
                          style={{ fontSize: i === 0 ? "11px" : i === 1 ? "14px" : "17px" }}
                        >A</button>
                      ))}
                      {/* Dark mode toggle */}
                      <button
                        onClick={toggleTheme}
                        title={isDark ? tr("oddiy-rejim") : tr("qorongu-rejim")}
                        className={`w-9 h-9 border rounded flex items-center justify-center transition ${isDark ? "bg-gray-900 text-yellow-300 border-gray-900" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
                      >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Slider */}
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{tr("shrift-olchami")}</p>
                    <input
                      type="range" min={0} max={2} step={1}
                      value={fontStep}
                      onChange={(e) => setFontStep(Number(e.target.value))}
                      className="w-full accent-[#0047AB] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                      <span>{fontPct[fontStep]} ga kattalashtirish</span>
                      <span>{fontPct[fontStep]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Virtual qabulxona */}
              <a href="https://t.me/yoshlar_qp_murojaat_bot" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#0047AB] border border-[#0047AB] rounded hover:bg-[#0047AB] hover:text-white transition">
                <MessageSquare className="h-3.5 w-3.5" />
                {tr("virtual-qabulxona")}
              </a>

              {/* Language */}
              <div className="relative" ref={langRef}>
                <button onClick={() => { setShowLang(v => !v); setShowAccessibility(false); }}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-600 hover:text-[#0047AB] transition">
                  <Globe className="h-3.5 w-3.5" />{langLabel}<ChevronDown className="h-3 w-3" />
                </button>
                {showLang && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 py-1 w-28">
                    {(Object.keys(LANG_LABELS) as Lang[]).map(l => (
                      <button key={l} onClick={() => { setLang(l); setShowLang(false); }}
                        className={`block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 ${lang === l ? "text-[#0047AB] font-medium" : "text-gray-700"}`}>
                        {LANG_LABELS[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Kirish */}
              <Link href="/admin/login" className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:text-[#0047AB] transition">
                <User className="h-3.5 w-3.5" /> {tr("kirish")}
              </Link>
            </div>

            {/* Mobile controls — Accessibility and Language */}
            <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">

              {/* Accessibility */}
              <div className="relative" ref={accessRef}>
                <button
                  onClick={() => { setShowAccessibility(v => !v); setShowLang(false); }}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:border-[#0047AB] hover:text-[#0047AB] transition text-gray-600"
                  title={tr("korinish")}
                >
                  <span className="text-[14px] font-bold">A</span>
                </button>
                {showAccessibility && (
                  <div className="absolute right-[-40px] top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 w-60">
                    <p className="text-xs font-bold text-gray-700 mb-3">{tr("korinish")}</p>

                    {/* Font size buttons */}
                    <div className="flex items-center gap-2 mb-4">
                      {([0,1,2] as const).map(i => (
                        <button key={i} onClick={() => setFontStep(i)}
                          className={`w-9 h-9 border rounded font-semibold transition ${fontStep === i ? "border-[#0047AB] text-[#0047AB] bg-blue-50" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
                          style={{ fontSize: i === 0 ? "11px" : i === 1 ? "14px" : "17px" }}
                        >A</button>
                      ))}
                      {/* Dark mode toggle */}
                      <button
                        onClick={toggleTheme}
                        title={isDark ? tr("oddiy-rejim") : tr("qorongu-rejim")}
                        className={`w-9 h-9 border rounded flex items-center justify-center transition ${isDark ? "bg-gray-900 text-yellow-300 border-gray-900" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
                      >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Slider */}
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{tr("shrift-olchami")}</p>
                    <input
                      type="range" min={0} max={2} step={1}
                      value={fontStep}
                      onChange={(e) => setFontStep(Number(e.target.value))}
                      className="w-full accent-[#0047AB] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                      <span>{fontPct[fontStep]} ga</span>
                      <span>{fontPct[fontStep]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Language */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => { setShowLang(v => !v); setShowAccessibility(false); }}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-[#0047AB] hover:text-[#0047AB] transition"
                >
                  <Globe className="h-4 w-4" />
                </button>
                {showLang && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 py-1 w-28">
                    {(Object.keys(LANG_LABELS) as Lang[]).map(l => (
                      <button key={l} onClick={() => { setLang(l); setShowLang(false); }}
                        className={`block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 ${lang === l ? "text-[#0047AB] font-medium" : "text-gray-700"}`}>
                        {LANG_LABELS[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Main Nav Bar (blue) ──────────────────────────── */}
      <div className="bg-[#0047AB]">
        {/* Desktop nav — centered */}
        <div className="hidden lg:flex justify-center">
          <nav className="flex items-center">

            {navItems.map(nav => (
              <div key={nav.key} className="relative group">
                <button className="px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-1 transition">
                  {nav.label}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Hover dropdown */}
                <div className={`absolute left-0 top-full ${nav.width} bg-white shadow-xl border-t-2 border-[#0047AB] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150`}>
                  {nav.items.map(item => (
                    <Link key={item.href} href={item.href}
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0047AB] border-b border-gray-100 last:border-0">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link href="/yoshlar-parlamenti-azolari" className="px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 transition">
              {tr("azolar")}
            </Link>
            <Link href="/mediateka" className="px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 transition">
              {tr("mediateka")}
            </Link>
          </nav>
        </div>

        {/* Mobile nav toggle */}
        <div className="lg:hidden flex items-center justify-between px-4 py-2">
          <span className="text-white text-sm font-medium">{tr("menyu")}</span>
          <button className="p-2 text-white" onClick={() => setIsMobileMenuOpen(v => !v)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu (Right Slide-out Drawer) ───────────────── */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Dark backdrop overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
        
        {/* Drawer panel */}
        <div className={`absolute inset-y-0 right-0 w-3/4 sm:w-1/2 bg-white dark:bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Header of Drawer */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{tr("menyu")}</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-850 dark:hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable list of links */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2">
            {navItems.map(nav => (
              <div key={nav.key} className="border-b border-gray-50 dark:border-gray-800 pb-2">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === nav.key ? null : nav.key)}
                  className="flex items-center justify-between w-full py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-[#0047AB]"
                >
                  {nav.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === nav.key ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === nav.key && (
                  <div className="pl-4 border-l-2 border-[#0047AB] ml-1 mt-1 space-y-1">
                    {nav.items.map(item => (
                      <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#0047AB] transition-colors">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/yoshlar-parlamenti-azolari" onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-50 dark:border-gray-800 hover:text-[#0047AB]">{tr("azolar")}</Link>
            <Link href="/mediateka" onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-50 dark:border-gray-800 hover:text-[#0047AB]">{tr("mediateka")}</Link>
            <a href="https://t.me/yoshlar_qp_murojaat_bot" target="_blank" rel="noopener noreferrer"
              className="block py-3 text-sm font-bold text-[#0047AB] hover:underline">{tr("virtual-qabulxona")}</a>
            <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center mt-6 px-4 py-2.5 text-sm font-semibold text-white bg-[#0047AB] hover:bg-blue-700 rounded-lg shadow-sm transition">{tr("kirish")}</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
