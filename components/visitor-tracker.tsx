"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/lib/data-store";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (!pathname.startsWith("/hjtl232jhand")) {
      trackVisit(pathname);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
