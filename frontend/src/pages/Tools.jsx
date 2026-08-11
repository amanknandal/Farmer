import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Tractor, Wrench, Shovel } from "lucide-react"
import { motion } from "framer-motion"

export default function Tools() {

    const [tools, setTools] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchTools()
    }, [])

    const fetchTools = async () => {
        try {
            const response = await api.get("/tools/")
            setTools(response.data.data || [])
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const getIcon = (name) => {
        const tool = name.toLowerCase()
        if (tool.includes("tractor")) return <Tractor size={28} />
        if (tool.includes("sprayer") || tool.includes("sprinkler")) return <Wrench size={28} />
        return <Shovel size={28} />
    }

    return (

        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-6xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-4">Farming Tools</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Farming equipment catalog and pricing</p>
                </div>

                {
                    loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => <div key={i} className="h-56 rounded-card bg-neutral-100 dark:bg-neutral-800 animate-pulse" />)}
                        </div>
                    ) : error ? (
                        <p className="text-center text-neutral-500 dark:text-neutral-400">Unable to load tools right now</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {tools.map((tool, index) => (
                                <motion.div
                                    key={tool.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                                    className="bg-white dark:bg-neutral-900 rounded-card p-7 shadow-soft hover:shadow-lifted transition-shadow duration-300"
                                >

                                    <div className="w-14 h-14 rounded-2xl bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 flex items-center justify-center mb-6">
                                        {getIcon(tool.name)}
                                    </div>

                                    <h2 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{tool.name}</h2>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-6 mb-4">{tool.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                        <span className="text-primary-700 dark:text-primary-300 font-bold">{tool.price}</span>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">{tool.category}</span>
                                    </div>

                                </motion.div>
                            ))}

                        </div>
                    )
                }

            </section>

            <Footer />

        </div>

    )
}
