"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { getMembers, getCommittees, getDistricts, initializeData, type Member, type Committee, type ElectionDistrict } from "@/lib/data-store";
import PageSidebar from "@/components/page-sidebar";

const YOSHLAR_GURUHLARI = [
  "Barcha yoshlar guruhlari",
  "O'zLiDeP yoshlar guruhi",
  "Milliy tiklanish yoshlar guruhi",
  "Adolat yoshlar guruhi",
  "XDP yoshlar guruhi",
  "Ekologik partiya yoshlar guruhi",
];

const SIDEBAR_LINKS = [
  { title: "Yoshlar parlamenti tarixi", href: "/yoshlar-parlamenti/tarixi" },
  { title: "Yoshlar parlamenti Kengashi", href: "/yoshlar-parlamenti/kengashi" },
  { title: "Yoshlar parlamenti Rahbariyati", href: "/yoshlar-parlamenti/rahbariyati" },
  { title: "Yoshlar parlamenti a'zolari", href: "/yoshlar-parlamenti-azolari" },
  { title: "Yoshlar parlamenti Qo'mitalari", href: "/yoshlar-parlamenti/qomitalar" },
  { title: "Yoshlar guruhlari", href: "/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari" },
  { title: "Yoshlar parlamenti Nizomi", href: "/yoshlar-parlamenti/nizomi" },
];

export default function YoshlarParlamentiAzolari() {
  const [members, setMembers] = useState<Member[]>([]);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [districts, setDistricts] = useState<ElectionDistrict[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("Barcha hududlar");
  const [selectedCommittee, setSelectedCommittee] = useState("Barcha qo'mitalar");
  const [selectedGuruhi, setSelectedGuruhi] = useState("Barcha yoshlar guruhlari");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Member[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeData();
    setMembers(getMembers());
    setCommittees(getCommittees());
    setDistricts(getDistricts());
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim().length > 0) {
      const q = val.toLowerCase();
      const found = members.filter(m => m.name.toLowerCase().includes(q)).slice(0, 6);
      setSuggestions(found);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const regions = [
    "Barcha hududlar",
    "Qoraqalpog'iston Respublikasi",
    "Toshkent shahri",
    "Toshkent viloyati",
    "Samarqand viloyati",
    "Andijon viloyati",
    "Buxoro viloyati",
    "Farg'ona viloyati",
    "Namangan viloyati",
    "Xorazm viloyati",
    "Qashqadaryo viloyati",
    "Surxondaryo viloyati",
    "Navoiy viloyati",
    "Jizzax viloyati",
    "Sirdaryo viloyati",
  ];

  const filteredMembers = members.filter(m => {
    let matchRegion = true;
    if (selectedRegion !== "Barcha hududlar") {
      // Direct match (region value stored as-is)
      const directMatch = m.region.toLowerCase().includes(selectedRegion.toLowerCase());
      // Indirect match via district lookup: member's region = district name, find that district's region
      const district = districts.find(d => d.name === m.region);
      const districtRegionMatch = district ? district.region.toLowerCase().includes(selectedRegion.toLowerCase()) : false;
      matchRegion = directMatch || districtRegionMatch;
    }
    const matchSearch = searchQuery.trim() === "" || m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCommittee = selectedCommittee === "Barcha qo'mitalar" || m.committee === selectedCommittee;
    const matchGuruhi = selectedGuruhi === "Barcha yoshlar guruhlari" || m.yoshlarGuruhi === selectedGuruhi;
    return matchRegion && matchSearch && matchCommittee && matchGuruhi;
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-[#0047AB] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-1">Yoshlar parlamenti a'zolari</h1>
          <p className="text-sm text-white/80">O'zbekiston Respublikasi Yoshlar parlamenti a'zolari haqida ma'lumot</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search + filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Autocomplete search */}
              <div className="relative flex-1" ref={searchRef}>
                <div className="flex items-center border border-gray-300 rounded bg-white overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                    onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                    placeholder="A'zo ismini kiriting..."
                    className="flex-1 px-4 py-2.5 text-sm outline-none"
                  />
                  <span className="px-3 text-gray-400">
                    <Search className="h-4 w-4" />
                  </span>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded shadow-lg z-30 mt-0.5">
                    {suggestions.map(m => (
                      <Link
                        key={m.id}
                        href={`/yoshlar-parlamenti-azolari/${m.id}`}
                        onClick={() => { setSearchQuery(m.name); setShowSuggestions(false); }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={m.image || "/placeholder.svg"} alt={m.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{m.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{m.region}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Region filter */}
              <select
                className="bg-white border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-44"
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}
              >
                {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Committee + guruhi filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <select
                className="bg-white border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                value={selectedCommittee}
                onChange={e => setSelectedCommittee(e.target.value)}
              >
                <option value="Barcha qo'mitalar">Barcha qo'mitalar</option>
                {committees.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <select
                className="bg-white border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                value={selectedGuruhi}
                onChange={e => setSelectedGuruhi(e.target.value)}
              >
                {YOSHLAR_GURUHLARI.map((g, i) => <option key={i} value={g}>{g}</option>)}
              </select>
            </div>

            {filteredMembers.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center text-gray-500 border border-gray-200">
                <p className="text-lg font-medium mb-2">Ma'lumot topilmadi</p>
                <p className="text-sm">Iltimos, qidiruv so'zini yoki hududni o'zgartiring</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={`/yoshlar-parlamenti-azolari/${member.id}`}
                    className="bg-white flex rounded border border-gray-200 overflow-hidden h-44 hover:border-[#0047AB] hover:shadow-sm transition"
                  >
                    <div className="relative w-36 flex-shrink-0">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="p-3 flex flex-col justify-center gap-1.5 min-w-0">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">{member.name}</h3>
                      <div className="text-xs">
                        <p className="text-gray-500">Saylov okrugi</p>
                        <p className="text-[#0047AB] font-medium line-clamp-1">{member.region}</p>
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-500">Fraksiya</p>
                        <p className="text-[#0047AB] font-medium">{member.fraction}</p>
                      </div>
                      {member.committee && (
                        <div className="text-xs">
                          <p className="text-gray-500">Qo'mitasi</p>
                          <p className="text-gray-700 line-clamp-1">{member.committee}</p>
                        </div>
                      )}
                      {member.yoshlarGuruhi && (
                        <div className="text-xs">
                          <p className="text-gray-500">Yoshlar guruhi</p>
                          <p className="text-gray-700 line-clamp-1">{member.yoshlarGuruhi}</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-4">Jami: {filteredMembers.length} ta a'zo</p>
          </div>

          {/* Sidebar */}
          <PageSidebar links={SIDEBAR_LINKS} />
        </div>
      </section>
    </main>
  );
}
