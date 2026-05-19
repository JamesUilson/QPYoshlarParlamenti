import React from "react";
import PageSidebar from "@/components/page-sidebar";

const QOMITA_SIDEBAR_LINKS = [
  { title: "Yoshlar parlamenti tarixi", href: "/yoshlar-parlamenti/tarixi" },
  { title: "Yoshlar parlamenti Kengashi", href: "/yoshlar-parlamenti/kengashi" },
  { title: "Yoshlar parlamenti Rahbariyati", href: "/yoshlar-parlamenti/rahbariyati" },
  { title: "Yoshlar parlamenti a'zolari", href: "/yoshlar-parlamenti-azolari" },
  { title: "Yoshlar parlamenti Qo'mitalari", href: "/yoshlar-parlamenti/qomitalar" },
  { title: "Yoshlar guruhlari", href: "/yoshlar-parlamenti/parlamentning-yoshlar-guruxlari" },
  { title: "Yoshlar parlamenti Nizomi", href: "/yoshlar-parlamenti/nizomi" },
];

const RightSidebar = () => {
  return <PageSidebar links={QOMITA_SIDEBAR_LINKS} />;
};

export default RightSidebar;
