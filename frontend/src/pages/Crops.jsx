import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import api from "../api/api"
import { Wheat, Droplets, ThermometerSun, Sprout } from "lucide-react"
import { motion } from "framer-motion"

export default function Crops() {

    const [crops, setCrops] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchCrops()
    }, [])

    const fetchCrops = async () => {
        try {
            const response = await api.get("/crops/")
            setCrops(response.data.data || [])
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-6xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-4">Crop Information</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Explore crop details, farming seasons, soil requirements, fertilizers and irrigation guidance for smarter farming.
                    </p>
                </div>

                {
                    loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => <div key={i} className="h-72 rounded-card bg-neutral-100 dark:bg-neutral-800 animate-pulse" />)}
                        </div>
                    ) : error ? (
                        <p className="text-center text-neutral-500 dark:text-neutral-400 py-24">Unable to load crop data right now</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {crops.map((crop, index) => (
                                <motion.div
                                    key={crop.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                                    className="bg-white dark:bg-neutral-900 rounded-card p-7 shadow-soft hover:shadow-lifted transition-shadow duration-300"
                                >

                                    <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center mb-6">
                                        <Wheat size={30} />
                                    </div>

                                    <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-50 mb-5">{crop.name}</h2>

                                    <div className="space-y-4">

                                        <div className="flex items-center gap-3">
                                            <Sprout className="text-primary-600 dark:text-primary-400 shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Season</p>
                                                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{crop.season}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Droplets className="text-accent-500 shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Water Requirement</p>
                                                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{crop.water_requirement}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <ThermometerSun className="text-secondary-600 shrink-0" size={20} />
                                            <div>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Temperature</p>
                                                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{crop.temperature}</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Recommended Fertilizer</p>
                                        <p className="text-primary-700 dark:text-primary-300 font-semibold text-sm">{crop.fertilizer}</p>
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
