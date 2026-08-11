import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useAuth } from "../context/AuthContext"
import { User, Phone, Mail, Lock, Loader2 } from "lucide-react"

export default function Signup() {

    const navigate = useNavigate()
    const { login } = useAuth()
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!form.name.trim() || !form.phone.trim() || !form.password) {
            setError("Name, phone and password are required")
            return
        }

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }

        try {
            setLoading(true)
            const response = await api.post("/auth/signup", form)
            login(response.data.token, response.data.user)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed, please try again")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">

            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">

                <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-card shadow-lifted p-8 sm:p-10">

                    <h1 className="text-2xl sm:text-3xl font-display font-semibold text-primary-800 dark:text-primary-200 mb-2">Create Account</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-8">Join AgroSmart and start farming smarter</p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 h-14 focus-within:ring-2 focus-within:ring-primary-400">
                            <User size={18} className="text-neutral-400 shrink-0" />
                            <input type="text" placeholder="Full name" value={form.name} onChange={updateField("name")} className="flex-1 outline-none bg-transparent text-neutral-800 dark:text-neutral-100" />
                        </div>

                        <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 h-14 focus-within:ring-2 focus-within:ring-primary-400">
                            <Phone size={18} className="text-neutral-400 shrink-0" />
                            <input type="tel" placeholder="Phone number" value={form.phone} onChange={updateField("phone")} className="flex-1 outline-none bg-transparent text-neutral-800 dark:text-neutral-100" />
                        </div>

                        <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 h-14 focus-within:ring-2 focus-within:ring-primary-400">
                            <Mail size={18} className="text-neutral-400 shrink-0" />
                            <input type="email" placeholder="Email (optional)" value={form.email} onChange={updateField("email")} className="flex-1 outline-none bg-transparent text-neutral-800 dark:text-neutral-100" />
                        </div>

                        <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 h-14 focus-within:ring-2 focus-within:ring-primary-400">
                            <Lock size={18} className="text-neutral-400 shrink-0" />
                            <input type="password" placeholder="Password" value={form.password} onChange={updateField("password")} className="flex-1 outline-none bg-transparent text-neutral-800 dark:text-neutral-100" />
                        </div>

                        {error && <p role="alert" className="text-red-500 text-sm font-medium">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-xl bg-primary-700 hover:bg-primary-800 transition-colors text-white font-semibold flex items-center justify-center gap-3 disabled:opacity-60"
                        >
                            {loading && <Loader2 className="animate-spin" size={20} />}
                            Create Account
                        </button>

                    </form>

                    <p className="text-center text-neutral-600 dark:text-neutral-400 mt-8 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary-700 dark:text-primary-300 font-semibold">Login</Link>
                    </p>

                </div>

            </div>

            <Footer />

        </div>
    )
}
