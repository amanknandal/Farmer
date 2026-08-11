import { Leaf, Loader2 } from "lucide-react"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useState } from "react"
import api from "../api/api"

export default function Footer() {

    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("idle")

    const subscribe = async (e) => {
        e.preventDefault()
        if (!email.trim()) return
        setStatus("loading")
        try {
            await api.post("/newsletter/subscribe", { email })
            setStatus("success")
            setEmail("")
        } catch (err) {
            setStatus("error")
        }
    }

    return (
        <footer className="w-full bg-primary-950 text-white px-4 sm:px-6 lg:px-10 pt-20 pb-8">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 border-b border-primary-800 pb-14 max-w-[1920px] mx-auto">

                <div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center">
                            <Leaf size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-semibold">AgroSmart</h2>
                            <p className="text-primary-300 text-sm mt-1">Smart Farming Platform</p>
                        </div>
                    </div>

                    <p className="text-primary-200 leading-7 mt-6 text-sm">
                        Helping farmers with modern technology, crop guidance, AI support and real-time farming solutions.
                    </p>

                    <div className="flex items-center gap-3 mt-8">
                        {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                            <a key={i} href="/" aria-label="Social link" className="w-11 h-11 rounded-full bg-primary-800 hover:bg-primary-600 transition-colors flex items-center justify-center">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>

                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                    <div className="flex flex-col gap-3 text-primary-200 text-sm">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/crops" className="hover:text-white transition-colors">Crops</Link>
                        <Link to="/fertilizers" className="hover:text-white transition-colors">Fertilizers</Link>
                        <Link to="/tools" className="hover:text-white transition-colors">Tools</Link>
                        <Link to="/market" className="hover:text-white transition-colors">Market Prices</Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-6">Resources</h3>
                    <div className="flex flex-col gap-3 text-primary-200 text-sm">
                        <Link to="/weather" className="hover:text-white transition-colors">Weather</Link>
                        <Link to="/assistant" className="hover:text-white transition-colors">AI Assistant</Link>
                        <Link to="/schemes" className="hover:text-white transition-colors">Government Schemes</Link>
                        <Link to="/community" className="hover:text-white transition-colors">Farmer Community</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
                    <p className="text-primary-200 text-sm leading-7 mb-6">
                        Get farming updates, weather alerts and smart agriculture tips.
                    </p>

                    <form onSubmit={subscribe} className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 rounded-xl px-4 bg-primary-900 border border-primary-700 outline-none text-white placeholder:text-primary-400 text-sm"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full h-12 rounded-xl bg-primary-600 hover:bg-primary-500 transition-colors text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {status === "loading" && <Loader2 className="animate-spin" size={16} />}
                            Subscribe
                        </button>
                        {status === "success" && <p className="text-primary-300 text-sm">Subscribed successfully</p>}
                        {status === "error" && <p className="text-red-300 text-sm">Something went wrong, try again</p>}
                    </form>

                </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-primary-300 text-sm max-w-[1920px] mx-auto">
                <p>© 2026 AgroSmart. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/" className="hover:text-white transition-colors">Terms & Conditions</Link>
                </div>
            </div>

        </footer>
    )
}
