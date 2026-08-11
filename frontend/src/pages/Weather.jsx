import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ResponsiveTable from "../components/ResponsiveTable"
import { CloudSun, Wind, Droplets, ThermometerSun, MapPin } from "lucide-react"

export default function Weather() {

    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState("Delhi")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchWeather(city)
    }, [])

    const fetchWeather = async (selectedCity) => {
        try {
            setLoading(true)
            setError("")
            const response = await api.get(`/weather/${selectedCity}`)
            setWeather(response.data.data)
        } catch (err) {
            setError(err.response?.data?.message || "Could not fetch weather for this city")
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        if (!city.trim()) return
        fetchWeather(city)
    }

    const columns = [
        { key: "time", label: "Time" },
        { key: "temperature", label: "Temp", render: (r) => `${r.temperature}°C` },
        { key: "weather", label: "Weather" },
        { key: "chance_of_rain", label: "Rain Chance", render: (r) => `${r.chance_of_rain}%` }
    ]

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-6xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-3">Live Weather Forecast</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Real-time farming weather updates</p>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-4 flex flex-col sm:flex-row gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
                        className="flex-1 h-12 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent px-4 outline-none focus:ring-2 focus:ring-primary-400 text-neutral-800 dark:text-neutral-100"
                    />
                    <button onClick={handleSearch} className="h-12 px-8 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold transition-colors">
                        Search
                    </button>
                </div>

                {
                    loading ? (
                        <div className="h-40 rounded-card bg-neutral-100 dark:bg-neutral-800 animate-pulse mb-8" />
                    ) : error ? (
                        <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-10 text-center text-neutral-500 dark:text-neutral-400">
                            {error}
                        </div>
                    ) : (
                        weather && (
                            <>
                                <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-card p-8 sm:p-10 text-white mb-8 shadow-lifted">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-primary-200">
                                                <MapPin size={20} />
                                                <p className="text-lg">{weather.city}</p>
                                            </div>
                                            <h2 className="text-display-lg font-display font-semibold mb-2">{weather.current.temperature}°C</h2>
                                            <p className="text-lg text-primary-200">{weather.current.weather}</p>
                                        </div>
                                        <div className="w-32 h-32 rounded-full bg-white/15 flex items-center justify-center">
                                            <CloudSun size={64} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

                                    <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-5">
                                        <ThermometerSun className="text-primary-600 mb-3" size={28} />
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Temperature</p>
                                        <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{weather.current.temperature}°C</p>
                                    </div>

                                    <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-5">
                                        <Droplets className="text-accent-500 mb-3" size={28} />
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Humidity</p>
                                        <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{weather.current.humidity}%</p>
                                    </div>

                                    <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-5">
                                        <Wind className="text-secondary-600 mb-3" size={28} />
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Wind Speed</p>
                                        <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{weather.current.wind_speed} km/h</p>
                                    </div>

                                    <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-5">
                                        <CloudSun className="text-primary-600 mb-3" size={28} />
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Feels Like</p>
                                        <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{weather.current.feels_like}°C</p>
                                    </div>

                                </div>

                                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Today's Forecast</h2>
                                <ResponsiveTable columns={columns} rows={weather.today_forecast} keyField="time" />
                            </>
                        )
                    )
                }

            </section>

            <Footer />

        </div>
    )
}
