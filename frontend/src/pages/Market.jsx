import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ResponsiveTable from "../components/ResponsiveTable"
import { TrendingUp, TrendingDown, Search } from "lucide-react"

export default function Market() {

    const [prices, setPrices] = useState([])
    const [filteredPrices, setFilteredPrices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchMarketPrices()
    }, [])

    useEffect(() => {
        if (search === "") {
            setFilteredPrices(prices)
        } else {
            setFilteredPrices(prices.filter((item) => item.crop.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search, prices])

    const fetchMarketPrices = async () => {
        try {
            const response = await api.get("/market/")
            setPrices(response.data.data || [])
            setFilteredPrices(response.data.data || [])
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const trendCell = (item) => {
        const up = Number(item.max_price) >= Number(item.min_price)
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${up ? "bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}>
                {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {up ? "Up" : "Down"}
            </span>
        )
    }

    const columns = [
        { key: "crop", label: "Crop" },
        { key: "state", label: "State" },
        { key: "market", label: "Market" },
        { key: "min_price", label: "Min Price", render: (r) => `₹${r.min_price}` },
        { key: "max_price", label: "Max Price", render: (r) => `₹${r.max_price}` },
        { key: "modal_price", label: "Modal Price", render: (r) => `₹${r.modal_price}` },
        { key: "trend", label: "Trend", render: trendCell }
    ]

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-6xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-3">Live Market Prices</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Real mandi prices from different markets across India</p>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-4 flex items-center gap-3 mb-8">
                    <Search className="text-neutral-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search crop..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full outline-none bg-transparent text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
                    />
                </div>

                {
                    loading ? (
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-16 rounded-card bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-10 text-center text-neutral-500 dark:text-neutral-400">
                            Market data is temporarily unavailable
                        </div>
                    ) : (
                        <ResponsiveTable columns={columns} rows={filteredPrices} emptyMessage="No matching crops found" />
                    )
                }

            </section>

            <Footer />

        </div>
    )
}
