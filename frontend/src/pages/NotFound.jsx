import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
                <h1 className="text-display-lg font-display font-semibold text-primary-700 dark:text-primary-300 mb-4">404</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">This page does not exist</p>
                <Link to="/" className="bg-primary-700 hover:bg-primary-800 transition-colors text-white px-8 py-3.5 rounded-pill font-semibold">
                    Back to Home
                </Link>
            </div>
            <Footer />
        </div>
    )
}
