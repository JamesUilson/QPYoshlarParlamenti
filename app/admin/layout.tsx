"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  LogOut,
  Menu,
  X,
  Globe
} from "lucide-react";
import { isAdminLoggedIn, logoutAdmin } from "@/lib/data-store";
import { Button } from "@/components/ui/button";
import ParliamentLogo from "@/components/parliament-logo";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!isAdminLoggedIn() && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Bosh sahifa" },
    { href: "/admin/news", icon: Newspaper, label: "Yangiliklar" },
    { href: "/admin/events", icon: Calendar, label: "Tadbirlar" },
    { href: "/admin/members", icon: Users, label: "A'zolar" },
    { href: "/admin/kengash", icon: Users, label: "Kengash tarkibi" },
    { href: "/admin/rahbariyat", icon: Users, label: "Rahbariyat" },
    { href: "/admin/districts", icon: LayoutDashboard, label: "Saylov okruglari" },
    { href: "/admin/friendship-groups", icon: Globe, label: "Do'stlik guruhlar" },
    { href: "/admin/articles", icon: FileText, label: "Maqolalar" },
    { href: "/admin/media", icon: ImageIcon, label: "Mediateka" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0047AB] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ParliamentLogo className="w-8 h-8 object-contain" />
          <h1 className="font-bold text-lg">Admin Panel</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0047AB] text-white pb-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 hover:bg-blue-700 ${
                (pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))) ? "bg-blue-700" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 hover:bg-blue-700 w-full text-left"
          >
            <LogOut size={20} className="mr-3" />
            Chiqish
          </button>
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-[#0047AB] text-white min-h-screen fixed">
          <div className="p-4 border-b border-blue-700">
            <div className="flex items-center gap-2 mb-1">
              <ParliamentLogo className="w-8 h-8 object-contain" />
              <h1 className="font-bold text-xl">Admin Panel</h1>
            </div>
            <p className="text-sm text-blue-200">Yoshlar Parlamenti</p>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 hover:bg-blue-700 transition ${
                  (pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))) ? "bg-blue-700" : ""
                }`}
              >
                <item.icon size={20} className="mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full text-white hover:bg-blue-700 flex items-center justify-start"
            >
              <LogOut size={20} className="mr-3" />
              Chiqish
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
