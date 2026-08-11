import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const tools = [
    {
        name: "Smart Tractor",
        image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop",
        price: "₹8,50,000"
    },
    {
        name: "Water Sprinkler",
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=1200&auto=format&fit=crop",
        price: "₹12,000"
    },
    {
        name: "Harvest Machine",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
        price: "₹5,40,000"
    },
    {
        name: "Irrigation System",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
        price: "₹25,000"
    }
]

export default function ToolsSection() {
    return (
        <section className="w-full py-24 px-6 lg:px-16 bg-[#f5fff4]">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div>
                    <h2 className="text-5xl font-extrabold text-gray-800">Modern Farming Tools</h2>
                    <p className="text-lg text-gray-600 mt-5 max-w-2xl leading-8">
                        Explore modern farming equipment and technology to improve productivity and save time.
                    </p>
                </div>

                <Link to="/tools">
                    <button className="bg-green-600 hover:bg-green-700 transition-all text-white px-8 py-4 rounded-full font-bold shadow-lg">
                        Explore Tools
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20">

                {tools.map((tool, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
                    >
                        <div className="overflow-hidden">
                            <img src={tool.image} alt={tool.name} loading="lazy" className="w-full h-[280px] object-cover hover:scale-110 transition-all duration-500" />
                        </div>

                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-gray-800">{tool.name}</h3>
                            <p className="text-green-700 text-2xl font-extrabold mt-4">{tool.price}</p>
                            <p className="text-gray-600 mt-4 leading-7">
                                Advanced farming equipment designed for modern agriculture and better efficiency.
                            </p>
                            <Link to="/tools">
                                <button className="mt-8 w-full bg-green-600 hover:bg-green-700 transition-all text-white py-4 rounded-2xl font-bold text-lg">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}

            </div>

        </section>
    )
}
