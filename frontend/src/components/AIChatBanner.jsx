import { Bot, SendHorizontal, Sparkles, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import api from "../api/api"

export default function AIChatBanner() {

    const [message, setMessage] = useState("")
    const [reply, setReply] = useState("")
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {

        if (!message.trim() || loading) return

        try {
            setLoading(true)
            setReply("")
            const response = await api.post("/ai/chat", { message })
            setReply(response.data.reply)
        } catch (error) {
            setReply("AI assistant is temporarily unavailable, please try again shortly")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="w-full py-24 px-6 lg:px-16 bg-white">

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-green-700 to-green-500 rounded-[45px] p-10 lg:p-16 text-white shadow-2xl overflow-hidden relative"
            >

                <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">

                    <div className="flex-1">

                        <div className="inline-flex items-center gap-3 bg-white/20 px-5 py-2 rounded-full">
                            <Sparkles size={22} />
                            <p className="font-semibold">AI Farming Support</p>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-extrabold mt-8 leading-tight">
                            Smart AI Assistant<br />For Every Farmer
                        </h2>

                        <p className="text-lg text-green-100 leading-8 mt-8 max-w-2xl">
                            Ask questions about crops, fertilizers, irrigation, weather and pest control with instant AI guidance.
                        </p>

                        <div className="bg-white rounded-full p-3 flex items-center gap-3 mt-10 shadow-xl">

                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") sendMessage() }}
                                placeholder="Ask your farming question..."
                                className="flex-1 px-5 text-gray-700 outline-none bg-transparent text-lg"
                            />

                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                aria-label="Send message to AI assistant"
                                className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 transition-all text-white flex items-center justify-center disabled:opacity-60"
                            >
                                {loading ? <Loader2 className="animate-spin" size={26} /> : <SendHorizontal size={26} />}
                            </button>

                        </div>

                        {
                            reply && (
                                <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-[30px] p-8">
                                    <h3 className="text-2xl font-bold mb-4">AI Response</h3>
                                    <p className="text-lg text-green-50 leading-8">{reply}</p>
                                </div>
                            )
                        }

                    </div>

                    <div className="flex-1 flex justify-center">
                        <div className="w-[340px] h-[340px] rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                            <Bot size={180} />
                        </div>
                    </div>

                </div>

            </motion.div>

        </section>
    )
}
