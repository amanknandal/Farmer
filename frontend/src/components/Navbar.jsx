import { Link, useLocation } from "react-router-dom"
import { Leaf, Menu, X, ShieldCheck, Languages } from "lucide-react"
import { useState } from "react"
import ThemeToggle from "./ThemeToggle"
import { useAuth } from "../context/AuthContext"
import { useLanguage } from "../context/LanguageContext"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)
    const location = useLocation()
    const { user, logout, isAdmin } = useAuth()
    const { lang, t, setLang, languages } = useLanguage()

    const navItems = [
        { name: t.nav.home, path: "/" },
        { name: t.nav.crops, path: "/crops" },
        { name: t.nav.fertilizers, path: "/fertilizers" },
        { name: t.nav.tools, path: "/tools" },
        { name: t.nav.weather, path: "/weather" },
        { name: t.nav.market, path: "/market" },
        { name: t.nav.assistant, path: "/assistant" },
        { name: t.nav.schemes, path: "/schemes" },
        { name: t.nav.community, path: "/community" },
        { name: t.nav.contact, path: "/contact" }
    ]

    const handleLogout = () => {
        logout()
        window.location.href = "/"
    }

    const handleLanguageSelect = (newLang) => {
        setLang(newLang)
        setLangOpen(false)
        setOpen(false)
    }

    return (
        <nav className="w-full sticky top-0 z-50 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
            <div className="h-20 flex items-center justify-between px-4 sm:px-6 lg:px-10 max-w-[1920px] mx-auto">
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-primary-700 flex items-center justify-center text-white">
                        <Leaf size={20} />
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-lg font-display font-semibold text-primary-800 dark:text-primary-200 leading-none">AgroSmart</h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{t.subtitle}</p>
                    </div>
                </Link>

                <div className="hidden xl:flex items-center gap-1">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${location.pathname === item.path
                                ? "text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950"
                                : "text-neutral-600 dark:text-neutral-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden xl:flex items-center gap-3">
                    <ThemeToggle />

                    <div className="relative">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="w-11 h-11 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                            aria-label="Change language"
                        >
                            <Languages size={20} />
                        </button>
                        {langOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl py-1 z-50">
                                {languages.map((option) => (
                                    <button
                                        key={option.code}
                                        onClick={() => handleLanguageSelect(option.code)}
                                        className={`w-full text-left px-4 py-2 text-sm ${lang === option.code ? "font-bold text-primary-700" : "text-neutral-700 dark:text-neutral-300"}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {isAdmin && (
                        <Link to="/admin" className="w-11 h-11 rounded-full flex items-center justify-center bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300" aria-label="Admin panel">
                            <ShieldCheck size={20} />
                        </Link>
                    )}

                    {user ? (
                        <button onClick={handleLogout} className="px-5 py-2.5 rounded-pill border border-primary-600 text-primary-700 dark:text-primary-300 dark:border-primary-400 font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
                            {t.logout}
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="px-5 py-2.5 rounded-pill border border-primary-600 text-primary-700 dark:text-primary-300 dark:border-primary-400 font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors">
                                {t.login}
                            </Link>
                            <Link to="/signup" className="px-5 py-2.5 rounded-pill bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm shadow-soft transition-colors">
                                {t.getStarted}
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 xl:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="w-11 h-11 flex items-center justify-center text-primary-700 dark:text-primary-300"
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="xl:hidden bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 px-4 py-4 flex flex-col gap-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className={`min-h-[44px] flex items-center px-4 rounded-lg font-medium ${location.pathname === item.path ? "text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950" : "text-neutral-700 dark:text-neutral-300"}`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {isAdmin && (
                        <Link to="/admin" onClick={() => setOpen(false)} className="min-h-[44px] flex items-center px-4 rounded-lg font-medium text-secondary-700 dark:text-secondary-300">
                            {t.admin}
                        </Link>
                    )}

                    <div className="relative px-4 py-2 border-t border-neutral-200 dark:border-neutral-800">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-left text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                            {t.language}: {lang.toUpperCase()}
                        </button>
                        {langOpen && (
                            <div className="mt-2 space-y-1">
                                {languages.map((option) => (
                                    <button
                                        key={option.code}
                                        onClick={() => handleLanguageSelect(option.code)}
                                        className={`w-full text-left rounded-xl px-4 py-2 text-sm ${lang === option.code ? "font-bold text-primary-700" : "text-neutral-700 dark:text-neutral-300"}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-3 mt-2 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
                        {user ? (
                            <button onClick={handleLogout} className="min-h-[44px] rounded-xl border border-primary-600 text-primary-700 dark:text-primary-300 font-semibold">
                                {t.logout}
                            </button>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setOpen(false)} className="min-h-[44px] flex items-center justify-center rounded-xl border border-primary-600 text-primary-700 dark:text-primary-300 font-semibold">
                                    {t.login}
                                </Link>
                                <Link to="/signup" onClick={() => setOpen(false)} className="min-h-[44px] flex items-center justify-center rounded-xl bg-primary-700 text-white font-semibold">
                                    {t.getStarted}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
