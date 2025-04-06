import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const defaultLanguage = localStorage.getItem("selected-language") || "en";

export const LanguageContext = createContext<{
  language: string;
  setLanguage: (lang: string) => void;
}>({
  language: defaultLanguage,
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    localStorage.setItem("selected-language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
