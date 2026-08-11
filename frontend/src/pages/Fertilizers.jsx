import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Sprout, FlaskConical, ShieldCheck, Bug } from "lucide-react"
import { motion } from "framer-motion"

const fertilizers = [
    {
        name: "Organic Fertilizer",
        icon: Sprout,
        desc: "Improves soil fertility naturally and supports healthier crop growth.",
        benefits: ["Eco Friendly", "Improves Soil Health", "Better Water Retention"]
    },
    {
        name: "Nitrogen Fertilizer",
        icon: FlaskConical,
        desc: "Boosts leaf growth and increases crop productivity quickly.",
        benefits: ["Fast Growth", "Higher Yield", "Stronger Plants"]
    },
    {
        name: "Crop Protection",
        icon: ShieldCheck,
        desc: "Protects crops from diseases and improves farming quality.",
        benefits: ["Disease Prevention", "Healthy Crops", "Longer Crop Life"]
    },
    {
        name: "Pest Control",
        icon: Bug,
        desc: "Advanced solutions for controlling harmful insects and pests.",
        benefits: ["Pest Reduction", "Crop Safety", "Improved Production"]
    }
]

export default function Fertilizers() {

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-6xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-4">Fertilizer Guide</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Explore modern fertilizers and crop protection methods for healthy farming and better crop yield.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {fertilizers.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="bg-white dark:bg-neutral-900 rounded-card p-8 shadow-soft hover:shadow-lifted transition-shadow duration-300"
                            >

                                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center mb-6">
                                    <Icon size={30} />
                                </div>

                                <h2 className="text-2xl font-display font-semibold text-neutral-900 dark:text-neutral-50 mb-3">{item.name}</h2>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>

                                <div className="mt-6 space-y-2">
                                    {item.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl px-4 py-3">
                                            <div className="w-2 h-2 rounded-full bg-primary-600" />
                                            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">{benefit}</p>
                                        </div>
                                    ))}
                                </div>

                            </motion.div>
                        )
                    })}

                </div>

            </section>

            <Footer />

        </div>
    )
}
