import { useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Bot, SendHorizontal, Loader2 } from "lucide-react"

export default function AIAssistant() {

    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {

        if (!message.trim() || loading) return

        const userMessage = { role: "user", text: message }
        setChat((prev) => [...prev, userMessage])
        setLoading(true)

        try {
            const response = await api.post("/ai/chat", { message })
            setChat((prev) => [...prev, { role: "ai", text: response.data.reply }])
        } catch (error) {
            setChat((prev) => [...prev, { role: "ai", text: "Unable to connect to AI assistant" }])
        } finally {
            setLoading(false)
            setMessage("")
        }
    }

    return (

        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-4xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-4">AI Farming Assistant</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Ask farming questions and get instant AI help</p>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-card shadow-lifted overflow-hidden">

                    <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-6 sm:p-8 text-white flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                            <Bot size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-semibold">AgroSmart AI</h2>
                            <p className="text-primary-200 text-sm mt-1">Smart farming guidance assistant</p>
                        </div>
                    </div>

                    <div className="h-[420px] sm:h-[500px] overflow-y-auto p-6 sm:p-8 bg-neutral-50 dark:bg-neutral-950">

                        {
                            chat.length === 0 && (
                                <div className="text-center mt-16 sm:mt-24">
                                    <Bot size={64} className="mx-auto text-primary-600 dark:text-primary-400" />
                                    <h2 className="text-xl font-display font-semibold text-neutral-800 dark:text-neutral-100 mt-6">Ask Your Farming Questions</h2>
                                    <p className="text-neutral-500 dark:text-neutral-400 mt-3">Crop care, fertilizer, weather, irrigation and more</p>
                                </div>
                            )
                        }

                        <div className="space-y-5">

                            {chat.map((item, index) => (
                                <div key={index} className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] sm:max-w-[80%] px-5 py-3.5 rounded-2xl text-sm sm:text-base leading-7 shadow-soft ${item.role === "user" ? "bg-primary-700 text-white rounded-br-md" : "bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 rounded-bl-md"}`}>
                                        {item.text}
                                    </div>
                                </div>
                            ))}

                            {
                                loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white dark:bg-neutral-900 px-5 py-3.5 rounded-2xl rounded-bl-md shadow-soft flex items-center gap-3 text-primary-700 dark:text-primary-300">
                                            <Loader2 className="animate-spin" size={20} />
                                            Thinking...
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </div>

                    <div className="p-4 sm:p-6 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">

                        <div className="flex items-center gap-3">

                            <input
                                type="text"
                                placeholder="Ask farming question..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") sendMessage() }}
                                className="flex-1 h-12 rounded-pill border border-neutral-200 dark:border-neutral-700 bg-transparent px-5 outline-none focus:ring-2 focus:ring-primary-400 text-neutral-800 dark:text-neutral-100"
                            />

                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                aria-label="Send message"
                                className="w-12 h-12 rounded-full bg-primary-700 hover:bg-primary-800 text-white flex items-center justify-center transition-colors disabled:opacity-60 shrink-0"
                            >
                                <SendHorizontal size={20} />
                            </button>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </div>
    )
}
