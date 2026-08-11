import { Sun, Moon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle({ className = "" }) {

    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 ${className}`}
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}
