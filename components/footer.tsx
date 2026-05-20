"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";

const Footer = () => {
  const { tr } = useLang();
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} (GMT+5)`;

  return (
    <footer className="bg-[#0047AB] text-white">
      {/* ── Main grid ─────────────────────────────────────── */}
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Col 1 – Logo + social */}
          <div className="flex flex-col gap-5">
            {/* Logo block */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-white/10 p-1">
                <Image
                  src="/images/logos/image.png"
                  alt="Yoshlar parlamenti logo"
                  width={52}
                  height={52}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold leading-snug opacity-90 group-hover:opacity-100">
                O&apos;zbekiston Respublikasi<br />
                Yoshlar parlamenti
              </span>
            </Link>

            {/* Diqqat */}
            <p className="text-xs opacity-70 leading-relaxed">
              {tr("footer-diqqat")}
            </p>

            {/* Social icons */}
            <div>
              <p className="text-xs font-medium mb-2 opacity-80">{tr("footer-social")}</p>
              <div className="flex items-center gap-2">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/channel/UCUpPi6_52QzOs4gLUJ-o7hw?view_as=subscriber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/people/Yoshlar-Parlamenti/pfbid0HDYq4MmzRnWJVKsDDAr3TiYNfdZYudAE2qXJGTBHxCPKCAGzN9XUU5L7xdm9vSMpl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Telegram */}
                <a
                  href="https://t.me/yoshlar_parlamenti_qp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition"
                  aria-label="Telegram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/yoshlar_parlamenti_qp?igshid=MzNlNGNkZWQ4Mg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 – Yoshlar parlamenti */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-60">{tr("yoshlar-parlamenti")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/yoshlar-parlamenti/tarixi" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("tarixi")}</Link></li>
              <li><Link href="/yoshlar-parlamenti/kengashi" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("kengashi")}</Link></li>
              <li><Link href="/yoshlar-parlamenti/rahbariyati" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("rahbariyati")}</Link></li>
              <li><Link href="/yoshlar-parlamenti/qomitalar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("qomitalar")}</Link></li>
              <li><Link href="/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("yoshlar-guruxlari")}</Link></li>
              <li><Link href="/yoshlar-parlamenti/nizomi" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("nizomi")}</Link></li>
            </ul>
          </div>

          {/* Col 3 – Yangiliklar */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-60">{tr("yangiliklar")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/yangiliklar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("yangiliklar-sub")}</Link></li>
              <li><Link href="/maqolalar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("maqolalar")}</Link></li>
              <li><Link href="/munosabatlar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("munosabatlar")}</Link></li>
              <li><Link href="/mediateka" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("mediateka")}</Link></li>
            </ul>
          </div>

          {/* Col 4 – Tadbirlar */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-60">{tr("tadbirlar")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tadbirlar/yalpi-majlislar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("yalpi-majlislar")}</Link></li>
              <li><Link href="/tadbirlar/siyosiy-partiyalar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("siyosiy-partiyalar")}</Link></li>
              <li><Link href="/tadbirlar/qomitalar-yigilishi" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("qomitalar-yigilishi")}</Link></li>
              <li><Link href="/tadbirlar/boshqa" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("boshqa-tadbirlar")}</Link></li>
            </ul>
          </div>

          {/* Col 5 – Parlament diplomatiyasi */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-60">{tr("parlament-diplomatiyasi")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/xalqaro-munosabatlar/xalqaro-tadbirlar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("xalqaro-tadbirlar")}</Link></li>
              <li><Link href="/xalqaro-munosabatlar/dostlik-guruhlar" className="opacity-85 hover:opacity-100 hover:underline transition">{tr("dostlik-guruhlar")}</Link></li>
            </ul>
          </div>
        </div>

        {/* ── Aloqa ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/20 pt-6 mt-8 text-sm">
          <div>
            <p className="font-semibold mb-1 text-xs uppercase tracking-wide opacity-60">{tr("footer-address")}</p>
            <p className="opacity-85">{tr("footer-address-val")}</p>
          </div>
          <div>
            <p className="font-semibold mb-1 text-xs uppercase tracking-wide opacity-60">{tr("footer-devonxona")}</p>
            <a href="tel:+998782382294" className="opacity-85 hover:opacity-100">+998 782382294</a>
          </div>
          <div>
            <p className="font-semibold mb-1 text-xs uppercase tracking-wide opacity-60">{tr("footer-murojaat")}</p>
            <a href="tel:+998782382294" className="opacity-85 hover:opacity-100">+998 782382294</a>
          </div>
        </div>

        {/* ── Copyright bar ───────────────────────────────── */}
        <div className="border-t border-white/20 mt-6 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs opacity-75">
          <span>© {now.getFullYear()} {tr("footer-rights")}</span>
          <span className="text-center">{tr("footer-last-update")}: {formattedDate}</span>
          <span className="md:text-right">
            {tr("footer-creator")}:{" "}
            <a
              href="https://t.me/BaxaTech25"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-200 font-semibold"
            >
              BaxaTech25
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
