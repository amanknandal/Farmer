import { useEffect, useState } from "react"
import api from "../api/api"
import { TrendingUp, TrendingDown, RefreshCcw } from "lucide-react"
import { motion } from "framer-motion"

export default function MarketPrices() {

    const [prices, setPrices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        try {
            const response = await api.get("/market/")
            setPrices(response.data.data || [])
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (

        <section className="w-full py-24 px-6 lg:px-16 bg-[#f5fff4]">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                <div>
                    <h2 className="text-5xl font-extrabold text-gray-800">Live Market Prices</h2>
                    <p className="text-lg text-gray-600 mt-5 max-w-2xl leading-8">
                        Track real-time mandi crop prices across India.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold shadow-md">
                    <TrendingUp size={24} />
                    Live Updates
                </div>

            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-20 bg-white rounded-[40px] overflow-hidden shadow-2xl"
            >

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        <thead className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                            <tr>
                                <th className="text-left p-6 text-lg">Crop</th>
                                <th className="text-left p-6 text-lg">State</th>
                                <th className="text-left p-6 text-lg">Market</th>
                                <th className="text-left p-6 text-lg">Min Price</th>
                                <th className="text-left p-6 text-lg">Max Price</th>
                                <th className="text-left p-6 text-lg">Modal Price</th>
                                <th className="text-left p-6 text-lg">Trend</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                loading ? (
                                    <tr>
                                        <td colSpan="7" className="py-16">
                                            <div className="flex items-center justify-center gap-4 text-2xl font-bold text-green-700">
                                                <RefreshCcw className="animate-spin" />
                                                Loading Market Prices...
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-lg text-gray-500">
                                            Market data is temporarily unavailable
                                        </td>
                                    </tr>
                                ) : prices.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-lg text-gray-500">
                                            No market data available right now
                                        </td>
                                    </tr>
                                ) : (
                                    prices.slice(0, 10).map((item, index) => (
                                        <motion.tr
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-gray-100 hover:bg-green-50 transition-all"
                                        >
                                            <td className="p-6 text-xl font-bold text-gray-800">{item.crop}</td>
                                            <td className="p-6 text-gray-700 font-medium">{item.state}</td>
                                            <td className="p-6 text-gray-700">{item.market}</td>
                                            <td className="p-6 text-red-500 font-bold">₹{item.min_price}</td>
                                            <td className="p-6 text-blue-600 font-bold">₹{item.max_price}</td>
                                            <td className="p-6 text-green-700 font-extrabold text-lg">₹{item.modal_price}</td>
                                            <td className="p-6">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${Number(item.max_price) >= Number(item.min_price) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>
                                                    {Number(item.max_price) >= Number(item.min_price) ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </motion.div>

        </section>

    )

}
