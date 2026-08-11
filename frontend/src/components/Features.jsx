import { CloudSun, Bot, Wheat, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        title: "Live Weather",
        icon: <CloudSun size={38} />,
        desc: "Get real-time weather updates and farming forecasts for better crop planning."
    },
    {
        title: "AI Farming Assistant",
        icon: <Bot size={38} />,
        desc: "Ask farming questions and receive instant smart guidance powered by AI."
    },
    {
        title: "Crop Guidance",
        icon: <Wheat size={38} />,
        desc: "Explore crop recommendations, irrigation timing and fertilizer suggestions."
    },
    {
        title: "Crop Protection",
        icon: <ShieldCheck size={38} />,
        desc: "Protect crops from pests and diseases with smart prevention methods."
    }
]

export default function Features() {
    return (
        <section className="w-full py-24 px-6 lg:px-16 bg-white">

            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-5xl font-extrabold text-gray-800">Smart Farming Features</h2>
                <p className="text-lg text-gray-600 mt-6 leading-8">
                    AgroSmart provides modern farming solutions with AI technology and real-time agriculture insights.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20">

                {features.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#f5fff4] rounded-[35px] p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="w-20 h-20 rounded-3xl bg-green-100 text-green-700 flex items-center justify-center mb-8">
                            {item.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-5">{item.title}</h3>
                        <p className="text-gray-600 leading-8 text-lg">{item.desc}</p>
                    </motion.div>
                ))}

            </div>

        </section>
    )
}
