import { motion } from "framer-motion"

const testimonials = [
    {
        name: "Ramesh Kumar",
        location: "Punjab",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        review: "This platform helped me improve crop production and understand modern farming methods easily."
    },
    {
        name: "Suresh Patel",
        location: "Gujarat",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        review: "Weather updates and fertilizer recommendations are very useful for daily farming decisions."
    },
    {
        name: "Arun Raj",
        location: "Tamil Nadu",
        image: "https://randomuser.me/api/portraits/men/64.jpg",
        review: "The AI farming assistant gives quick answers and helps solve crop problems instantly."
    }
]

export default function Testimonials() {
    return (
        <section className="w-full py-24 px-6 lg:px-16 bg-[#f5fff4]">

            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-5xl font-extrabold text-gray-800">What Farmers Say</h2>
                <p className="text-lg text-gray-600 mt-6 leading-8">
                    Thousands of farmers are using AgroSmart to improve productivity and modernize farming.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-20">

                {testimonials.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[35px] p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >

                        <div className="flex items-center gap-5">
                            <img src={item.image} alt={item.name} loading="lazy" className="w-20 h-20 rounded-full object-cover" />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                                <p className="text-gray-500 mt-1">{item.location}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg leading-8 mt-8">"{item.review}"</p>

                        <div className="flex items-center gap-1 mt-8 text-yellow-500 text-2xl">★ ★ ★ ★ ★</div>

                    </motion.div>
                ))}

            </div>

        </section>
    )
}
