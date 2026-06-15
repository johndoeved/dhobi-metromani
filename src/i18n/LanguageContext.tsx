import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import translations, { Lang } from "./translations";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, fallback?: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "EN",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("app_lang") as Lang) || "EN";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("app_lang", l);
  };

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key];
    if (!entry) return fallback || key;
    return entry[lang] || entry["EN"] || fallback || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export default LangContext;
