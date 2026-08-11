import { useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Phone, Mail, MapPin, SendHorizontal, Loader2 } from "lucide-react"

export default function Contact() {

    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState("")

    const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

    const submit = async (e) => {
        e.preventDefault()
        setError("")
        setStatus("loading")
        try {
            await api.post("/contact/", form)
            setStatus("success")
            setForm({ name: "", email: "", message: "" })
        } catch (err) {
            setStatus("idle")
            setError(err.response?.data?.message || "Something went wrong, please try again")
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-5xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-3">Contact Us</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Get help, support and farming guidance from our team</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-8">

                        {
                            status === "success" ? (
                                <div className="text-center py-10">
                                    <p className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">Message sent</p>
                                    <p className="text-neutral-600 dark:text-neutral-400">We will get back to you shortly</p>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={form.name}
                                        onChange={updateField("name")}
                                        className="w-full h-12 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-primary-400 text-neutral-800 dark:text-neutral-100"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={form.email}
                                        onChange={updateField("email")}
                                        className="w-full h-12 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-primary-400 text-neutral-800 dark:text-neutral-100"
                                    />
                                    <textarea
                                        placeholder="Your Message"
                                        rows={5}
                                        value={form.message}
                                        onChange={updateField("message")}
                                        className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent p-4 outline-none focus:ring-2 focus:ring-primary-400 text-neutral-800 dark:text-neutral-100 resize-none"
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full h-12 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                                    >
                                        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <SendHorizontal size={18} />}
                                        Send Message
                                    </button>
                                </form>
                            )
                        }

                    </div>

                    <div className="space-y-5">

                        <ContactCard icon={Phone} title="Phone Support" value="+91 9876543210" />
                        <ContactCard icon={Mail} title="Email Support" value="support@agrosmart.com" />
                        <ContactCard icon={MapPin} title="Office Address" value="Chennai, Tamil Nadu, India" />

                    </div>

                </div>

            </section>

            <Footer />

        </div>
    )
}

function ContactCard({ icon: Icon, title, value }) {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center shrink-0">
                <Icon size={26} />
            </div>
            <div>
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">{title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{value}</p>
            </div>
        </div>
    )
}
