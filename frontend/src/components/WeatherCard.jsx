import { useEffect, useState } from "react"
import api from "../api/api"
import { CloudSun, Wind, Droplets, ThermometerSun } from "lucide-react"
import { motion } from "framer-motion"

export default function WeatherCard() {

    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchWeather()
    }, [])

    const fetchWeather = async () => {
        try {
            const response = await api.get("/weather/Delhi")
            setWeather(response.data.data)
        } catch (err) {
            setError(true)
        }
    }

    return (
        <section className="w-full py-24 px-6 lg:px-16 bg-white">

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-600 to-green-800 rounded-[45px] p-10 lg:p-16 text-white shadow-2xl"
            >

                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    <div className="flex-1">

                        <div className="inline-flex items-center gap-3 bg-white/20 px-5 py-2 rounded-full">
                            <CloudSun size={24} />
                            <p className="font-semibold">Live Weather Forecast</p>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-extrabold mt-8 leading-tight">
                            Weather Insights<br />For Smart Farming
                        </h2>

                        <p className="text-green-100 text-lg leading-8 mt-8 max-w-2xl">
                            Track rainfall, humidity, temperature and wind speed.
                        </p>

                        <button className="mt-10 bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl">
                            {error ? "Weather unavailable" : (weather?.city || "Loading...")}
                        </button>

                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">

                        <div className="bg-white/10 backdrop-blur-lg rounded-[35px] p-8 border border-white/20">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                                <ThermometerSun size={34} />
                            </div>
                            <h3 className="text-5xl font-extrabold mt-6">{weather?.current?.temperature || "--"}°C</h3>
                            <p className="text-green-100 mt-3 text-lg">Temperature</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-[35px] p-8 border border-white/20">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                                <Droplets size={34} />
                            </div>
                            <h3 className="text-5xl font-extrabold mt-6">{weather?.current?.humidity || "--"}%</h3>
                            <p className="text-green-100 mt-3 text-lg">Humidity</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-[35px] p-8 border border-white/20">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                                <Wind size={34} />
                            </div>
                            <h3 className="text-5xl font-extrabold mt-6">{weather?.current?.wind_speed || "--"} km/h</h3>
                            <p className="text-green-100 mt-3 text-lg">Wind Speed</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-[35px] p-8 border border-white/20">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                                <CloudSun size={34} />
                            </div>
                            <h3 className="text-3xl font-extrabold mt-6">{weather?.current?.weather || "--"}</h3>
                            <p className="text-green-100 mt-3 text-lg">Forecast</p>
                        </div>

                    </div>

                </div>

            </motion.div>

        </section>
    )
}
