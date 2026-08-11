import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

const Home = lazy(() => import("./pages/Home"))
const Crops = lazy(() => import("./pages/Crops"))
const Fertilizers = lazy(() => import("./pages/Fertilizers"))
const Tools = lazy(() => import("./pages/Tools"))
const Weather = lazy(() => import("./pages/Weather"))
const Market = lazy(() => import("./pages/Market"))
const AIAssistant = lazy(() => import("./pages/AIAssistant"))
const Community = lazy(() => import("./pages/Community"))
const Contact = lazy(() => import("./pages/Contact"))
const Schemes = lazy(() => import("./pages/Schemes"))
const Login = lazy(() => import("./pages/Login"))
const Signup = lazy(() => import("./pages/Signup"))
const Admin = lazy(() => import("./pages/Admin"))
const NotFound = lazy(() => import("./pages/NotFound"))

function RouteFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default function App() {
    return (
        <Suspense fallback={<RouteFallback />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crops" element={<Crops />} />
                <Route path="/fertilizers" element={<Fertilizers />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/market" element={<Market />} />
                <Route path="/assistant" element={<AIAssistant />} />
                <Route path="/community" element={<Community />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}
