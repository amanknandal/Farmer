import { createContext, useContext, useEffect, useMemo, useState } from "react"

const LanguageContext = createContext(null)

const STORAGE_KEY = "agroLang"
const DEFAULT_LANGUAGE = "en"

const TRANSLATIONS = {
  en: {
    subtitle: "Modern Farming Intelligence",
    admin: "Admin Panel",
    logout: "Logout",
    login: "Login",
    getStarted: "Get Started",
    language: "Language",
    nav: {
      home: "Home",
      crops: "Crops",
      fertilizers: "Fertilizers",
      tools: "Tools",
      weather: "Weather",
      market: "Market",
      assistant: "AI Assistant",
      schemes: "Schemes",
      community: "Community",
      contact: "Contact"
    }
  },
  hi: {
    subtitle: "आधुनिक कृषि तकनीक",
    admin: "एडमिन पैनल",
    logout: "लॉगआउट",
    login: "लॉगिन",
    getStarted: "शुरू करें",
    language: "भाषा",
    nav: {
      home: "मुख्य पृष्ठ",
      crops: "फसलें",
      fertilizers: "खाद/उर्वरक",
      tools: "उपकरण",
      weather: "मौसम",
      market: "मंडी भाव",
      assistant: "एआई सहायक",
      schemes: "सरकारी योजनाएं",
      community: "समुदाय",
      contact: "संपर्क करें"
    }
  },
  pa: {
    subtitle: "ਆਧੁਨਿਕ ਖੇਤੀਬਾੜੀ ਗਿਆਨ",
    admin: "ਐਡਮਿਨ ਪੈਨਲ",
    logout: "ਲੌਗਆਊਟ",
    login: "ਲੌਗਇਨ",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    language: "ਭਾਸ਼ਾ",
    nav: {
      home: "ਮੁੱਖ ਪੰਨਾ",
      crops: "ਫਸਲਾਂ",
      fertilizers: "ਖਾਦਾਂ",
      tools: "ਸੰਦ",
      weather: "ਮੌਸਮ",
      market: "ਮੰਡੀ ਦਾ ਭਾਅ",
      assistant: "ਏਆਈ ਸਹਾਇਕ",
      schemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
      community: "ਭਾਈਚਾਰਾ",
      contact: "ਸੰਪਰਕ ਕਰੋ"
    }
  }
}

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "pa", label: "ਪੰਜਾਬੀ" }
]

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved || DEFAULT_LANGUAGE
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE],
      languages: LANGUAGE_OPTIONS
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
