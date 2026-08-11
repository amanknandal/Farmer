import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import CropSection from "../components/CropSection"
import FertilizerSection from "../components/FertilizerSection"
import ToolsSection from "../components/ToolsSection"
import WeatherCard from "../components/WeatherCard"
import MarketPrices from "../components/MarketPrices"
import AIChatBanner from "../components/AIChatBanner"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className="w-full overflow-hidden">
            <Navbar />
            <Hero />
            <Features />
            <CropSection />
            <FertilizerSection />
            <ToolsSection />
            <WeatherCard />
            <MarketPrices />
            <AIChatBanner />
            <Testimonials />
            <Footer />
        </div>
    )
}
