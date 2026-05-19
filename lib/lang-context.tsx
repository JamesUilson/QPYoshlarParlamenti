"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, t, LANG_LABELS } from "./translations";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: string) => string;
  langLabel: string;
}

const LangContext = createContext<LangContextType>({
  lang: "uz",
  setLang: () => {},
  tr: (key) => key,
  langLabel: "O'zbek",
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = localStorage.getItem("yp_lang") as Lang | null;
    if (saved && saved in LANG_LABELS) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("yp_lang", l);
  };

  const tr = (key: string): string => t[lang][key] ?? t["uz"][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, tr, langLabel: LANG_LABELS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
