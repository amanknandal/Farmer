import { motion } from "framer-motion"
import { Sprout, FlaskConical, ShieldCheck, Bug } from "lucide-react"
import { Link } from "react-router-dom"

const fertilizers = [
    {
        name: "Organic Fertilizer",
        icon: <Sprout size={42} />,
        desc: "Improves soil fertility naturally and supports healthy crop growth.",
        image: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1200&auto=format&fit=crop"
    },
    {
        name: "Nitrogen Fertilizer",
        icon: <FlaskConical size={42} />,
        desc: "Boosts plant growth and improves crop productivity effectively.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop"
    },
    {
        name: "Crop Protection",
        icon: <ShieldCheck size={42} />,
        desc: "Protect crops from diseases and improve long-term farm health.",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop"
    },
    {
        name: "Pest Control",
        icon: <Bug size={42} />,
        desc: "Advanced pest management solutions for safer and better farming.",
        image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1200&auto=format&fit=crop"
    }
]

export default function FertilizerSection() {
    return (
        <section className="w-full py-24 px-6 lg:px-16 bg-white">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                <div>
                    <h2 className="text-5xl font-extrabold text-gray-800">Fertilizer & Crop Care</h2>
                    <p className="text-lg text-gray-600 mt-5 max-w-2xl leading-8">
                        Explore modern fertilizers and crop protection solutions for healthier farming and better yield.
                    </p>
                </div>

                <Link to="/fertilizers">
                    <button className="bg-green-600 hover:bg-green-700 transition-all text-white px-8 py-4 rounded-full font-bold shadow-lg">
                        Explore Fertilizers
                    </button>
                </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20">

                {fertilizers.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#f5fff4] rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
                    >
                        <div className="overflow-hidden">
                            <img src={item.image} alt={item.name} loading="lazy" className="w-full h-[260px] object-cover hover:scale-110 transition-all duration-500" />
                        </div>

                        <div className="p-8">
                            <div className="w-18 h-18 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800">{item.name}</h3>
                            <p className="text-gray-600 mt-5 leading-8 text-lg">{item.desc}</p>
                            <Link to="/fertilizers">
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
