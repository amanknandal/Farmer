import { ArrowUpRight, Wheat, CloudSun } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <section className="w-full bg-neutral-50 dark:bg-neutral-950 px-4 sm:px-6 lg:px-10 pt-12 pb-16 sm:pt-16 sm:pb-24">

            <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >

                    <div className="inline-flex items-center gap-2 text-primary-700 dark:text-primary-300 font-medium text-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary-600" />
                        Trusted by farmers across India
                    </div>

                    <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-display font-semibold leading-[1.05] text-neutral-900 dark:text-neutral-50">
                        Farming decisions,
                        <br />
                        backed by real data.
                    </h1>

                    <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-6 max-w-xl leading-relaxed">
                        Crop guidance, live mandi prices, weather forecasting and an AI assistant built specifically for the decisions farmers make every day.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-10">
                        <Link to="/crops" className="group inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 transition-colors text-white px-7 py-3.5 rounded-pill font-semibold shadow-lifted">
                            Explore Crops
                            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                        <Link to="/assistant" className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-primary-600 hover:text-primary-700 dark:hover:text-primary-300 transition-colors px-7 py-3.5 rounded-pill font-semibold">
                            Ask AI Assistant
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-10 mt-14">
                        <div>
                            <p className="text-3xl font-display font-semibold text-neutral-900 dark:text-neutral-50">500+</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Crop guides</p>
                        </div>
                        <div>
                            <p className="text-3xl font-display font-semibold text-neutral-900 dark:text-neutral-50">Live</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Mandi prices</p>
                        </div>
                        <div>
                            <p className="text-3xl font-display font-semibold text-neutral-900 dark:text-neutral-50">24/7</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">AI assistance</p>
                        </div>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >

                    <div className="rounded-card overflow-hidden shadow-lifted">
                        <img
                            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
                            srcSet="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop 600w, https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop 1200w"
                            sizes="(max-width: 1024px) 90vw, 45vw"
                            alt="Farmer working in a green field at sunrise"
                            className="w-full aspect-[4/5] object-cover"
                            loading="eager"
                        />
                    </div>

                    <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lifted p-5 flex items-center gap-4 max-w-[240px]">
                        <div className="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 flex items-center justify-center shrink-0">
                            <Wheat size={22} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">98% satisfaction</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">From verified farmers</p>
                        </div>
                    </div>

                    <div className="absolute -top-4 -right-4 sm:right-6 bg-accent-600 text-white rounded-2xl shadow-lifted p-4 flex items-center gap-3">
                        <CloudSun size={22} />
                        <p className="text-sm font-semibold">Live weather</p>
                    </div>

                </motion.div>

            </div>

        </section>
    )
}
