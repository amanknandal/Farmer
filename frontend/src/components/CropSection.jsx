import { Wheat, Leaf, Apple } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const crops = [
    {
        name: "Wheat",
        icon: <Wheat size={42} />,
        desc: "Complete wheat farming guide with irrigation and fertilizer support.",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop"
    },
    {
        name: "Rice",
        icon: <Leaf size={42} />,
        desc: "Modern rice cultivation methods for maximum productivity.",
        image: "https://images.unsplash.com/photo-1536054504803-6bd270ad1ffb?q=80&w=1200&auto=format&fit=crop"
    },
    {
        name: "Fruits",
        icon: <Apple size={42} />,
        desc: "Fruit farming techniques and disease prevention guidance.",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop"
    }
]

export default function CropSection() {
    return (
        <section className="w-full py-24 px-6 lg:px-16 bg-white">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                <div>
                    <h2 className="text-5xl font-extrabold text-gray-800">Smart Crop Guidance</h2>
                    <p className="text-lg text-gray-600 mt-5 max-w-2xl leading-8">
                        Learn modern farming techniques, crop management and better cultivation methods.
                    </p>
                </div>

                <Link to="/crops">
                    <button className="bg-green-600 hover:bg-green-700 transition-all text-white px-8 py-4 rounded-full font-bold shadow-lg">
                        Explore Crops
                    </button>
                </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-20">

                {crops.map((crop, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#f5fff4] rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
                    >
                        <div className="overflow-hidden">
                            <img src={crop.image} alt={crop.name} loading="lazy" className="w-full h-[280px] object-cover hover:scale-110 transition-all duration-500" />
                        </div>

                        <div className="p-8">
                            <div className="w-20 h-20 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-6">
                                {crop.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800">{crop.name}</h3>
                            <p className="text-gray-600 mt-5 leading-8 text-lg">{crop.desc}</p>
                            <Link to="/crops">
                                <button className="mt-8 w-full bg-green-600 hover:bg-green-700 transition-all text-white py-4 rounded-2xl font-bold text-lg">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}

            </div>

        </section>
    )
}
