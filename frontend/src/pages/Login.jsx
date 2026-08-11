import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useAuth } from "../context/AuthContext"
import { Phone, Lock, Loader2 } from "lucide-react"

export default function Login() {

    const navigate = useNavigate()
    const { login } = useAuth()
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!phone.trim() || !password) {
            setError("Please enter your phone number and password")
            return
        }

        try {
            setLoading(true)
            const response = await api.post("/auth/login", { phone, password })
            login(response.data.token, response.data.user)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed, please try again")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">

            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">

                <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-card shadow-lifted p-8 sm:p-10">

                    <h1 className="text-2xl sm:text-3xl font-display font-semibold text-primary-800 dark:text-primary-200 mb-2">Welcome Back</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-8">Login to your AgroSmart account</p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 h-14 focus-within:ring-2 focus-within:ring-primary-400">
                            <Phone size={18} className="text-neutral-400 shrink-0" />
                            <input
                                type="tel"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-1 outline-none bg-transparent text-neutral-800 dark:text-neutral-100"
                            />
                        </div>

                        <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 h-14 focus-within:ring-2 focus-within:ring-primary-400">
                            <Lock size={18} className="text-neutral-400 shrink-0" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 outline-none bg-transparent text-neutral-800 dark:text-neutral-100"
                            />
                        </div>

                        {error && <p role="alert" className="text-red-500 text-sm font-medium">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-xl bg-primary-700 hover:bg-primary-800 transition-colors text-white font-semibold flex items-center justify-center gap-3 disabled:opacity-60"
                        >
                            {loading && <Loader2 className="animate-spin" size={20} />}
                            Login
                        </button>

                    </form>

                    <p className="text-center text-neutral-600 dark:text-neutral-400 mt-8 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary-700 dark:text-primary-300 font-semibold">Sign up</Link>
                    </p>

                </div>

            </div>

            <Footer />

        </div>
    )
}
