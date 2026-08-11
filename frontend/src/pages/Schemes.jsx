// import Navbar from "../components/Navbar"
// import Footer from "../components/Footer"
// import { BadgeIndianRupee, Landmark, ShieldCheck, Tractor } from "lucide-react"
// import { motion } from "framer-motion"

// const schemes = [
//     { title: "PM-KISAN Scheme", icon: BadgeIndianRupee, desc: "Financial support scheme providing direct income assistance to farmers." },
//     { title: "Agriculture Loan", icon: Landmark, desc: "Low interest farming loans for seeds, machinery and crop production." },
//     { title: "Crop Insurance", icon: ShieldCheck, desc: "Insurance protection against crop loss due to weather and disasters." },
//     { title: "Machinery Subsidy", icon: Tractor, desc: "Government subsidy support for buying modern farming equipment." }
// ]

// export default function Schemes() {
//     return (
//         <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

//             <Navbar />

//             <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-6xl mx-auto">

//                 <div className="text-center mb-12">
//                     <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-4">Government Schemes</h1>
//                     <p className="text-neutral-600 dark:text-neutral-400">Support programs and subsidies for farmers and agriculture growth</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {schemes.map((item, index) => {
//                         const Icon = item.icon
//                         return (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 16 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true }}
//                                 transition={{ duration: 0.4, delay: index * 0.08 }}
//                                 className="bg-white dark:bg-neutral-900 rounded-card p-7 shadow-soft hover:shadow-lifted transition-shadow duration-300"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 flex items-center justify-center mb-5">
//                                     <Icon size={26} />
//                                 </div>
//                                 <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-50 mb-3">{item.title}</h2>
//                                 <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
//                             </motion.div>
//                         )
//                     })}
//                 </div>

//             </section>

//             <Footer />

//         </div>
//     )
// }
import { useEffect, useMemo, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import {
    BadgeIndianRupee,
    Landmark,
    ShieldCheck,
    Tractor,
    FileText,
    ExternalLink,
    Search,
    RefreshCw,
    Filter,
    X,
    Sprout,
    ChevronRight
} from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"


// ======================================================
// API CONFIGURATION
// ======================================================

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000"


// ======================================================
// ICON SELECTION
// ======================================================

function getSchemeIcon(title = "") {

    const name = title.toLowerCase()

    if (
        name.includes("kisan") ||
        name.includes("income") ||
        name.includes("samman") ||
        name.includes("pension") ||
        name.includes("maan dhan")
    ) {
        return BadgeIndianRupee
    }

    if (
        name.includes("loan") ||
        name.includes("credit") ||
        name.includes("finance") ||
        name.includes("kcc")
    ) {
        return Landmark
    }

    if (
        name.includes("insurance") ||
        name.includes("bima") ||
        name.includes("crop insurance")
    ) {
        return ShieldCheck
    }

    if (
        name.includes("machinery") ||
        name.includes("equipment") ||
        name.includes("irrigation") ||
        name.includes("sinchai") ||
        name.includes("tractor")
    ) {
        return Tractor
    }

    return FileText
}


// ======================================================
// CATEGORY DETECTION
// ======================================================

function getCategory(title = "") {

    const name = title.toLowerCase()

    if (
        name.includes("insurance") ||
        name.includes("bima")
    ) {
        return "Insurance"
    }

    if (
        name.includes("loan") ||
        name.includes("credit") ||
        name.includes("kcc") ||
        name.includes("finance")
    ) {
        return "Finance"
    }

    if (
        name.includes("machinery") ||
        name.includes("equipment") ||
        name.includes("tractor")
    ) {
        return "Machinery"
    }

    if (
        name.includes("irrigation") ||
        name.includes("sinchai") ||
        name.includes("water")
    ) {
        return "Irrigation"
    }

    if (
        name.includes("kisan") ||
        name.includes("farmer") ||
        name.includes("pension")
    ) {
        return "Farmer Support"
    }

    return "Agriculture"
}


// ======================================================
// LOADING CARD
// ======================================================

function LoadingCard() {

    return (
        <div
            className="
                bg-white
                dark:bg-neutral-900
                rounded-3xl
                p-7
                shadow-soft
                animate-pulse
            "
        >

            <div
                className="
                    w-14 h-14
                    rounded-2xl
                    bg-neutral-200
                    dark:bg-neutral-800
                    mb-5
                "
            />

            <div
                className="
                    h-6
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded
                    w-3/4
                    mb-4
                "
            />

            <div
                className="
                    h-4
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded
                    w-full
                    mb-2
                "
            />

            <div
                className="
                    h-4
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded
                    w-5/6
                    mb-6
                "
            />

            <div
                className="
                    h-10
                    bg-neutral-200
                    dark:bg-neutral-800
                    rounded-xl
                    w-32
                "
            />

        </div>
    )
}


// ======================================================
// SCHEME CARD
// ======================================================

function SchemeCard({ scheme, index }) {

    const Icon = getSchemeIcon(scheme.title)

    const category = getCategory(scheme.title)

    return (

        <motion.article

            initial={{
                opacity: 0,
                y: 24
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: 0.4,
                delay: Math.min(index * 0.05, 0.5)
            }}

            whileHover={{
                y: -5
            }}

            className="
                group
                bg-white
                dark:bg-neutral-900
                rounded-3xl
                p-6
                sm:p-7
                shadow-soft
                hover:shadow-lifted
                border
                border-neutral-100
                dark:border-neutral-800
                transition-all
                duration-300
                flex
                flex-col
            "
        >

            {/* Top section */}

            <div className="flex items-start justify-between gap-4 mb-6">

                <div
                    className="
                        w-14 h-14
                        rounded-2xl
                        bg-secondary-100
                        dark:bg-secondary-900
                        text-secondary-700
                        dark:text-secondary-300
                        flex
                        items-center
                        justify-center
                        shrink-0
                        group-hover:scale-105
                        transition-transform
                    "
                >

                    <Icon size={26} />

                </div>


                <span
                    className="
                        inline-flex
                        items-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        bg-primary-50
                        dark:bg-primary-950
                        text-primary-700
                        dark:text-primary-300
                        border
                        border-primary-100
                        dark:border-primary-900
                    "
                >

                    {category}

                </span>

            </div>


            {/* Title */}

            <h2
                className="
                    text-xl
                    sm:text-2xl
                    font-display
                    font-semibold
                    text-neutral-900
                    dark:text-neutral-50
                    leading-snug
                    mb-3
                "
            >

                {scheme.title}

            </h2>


            {/* Description */}

            <p
                className="
                    text-neutral-600
                    dark:text-neutral-400
                    leading-relaxed
                    mb-6
                    flex-1
                "
            >

                {scheme.description ||
                    "Government scheme and support program for farmers and agricultural development."}

            </p>


            {/* Source */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    pt-5
                    border-t
                    border-neutral-100
                    dark:border-neutral-800
                "
            >

                <div className="flex items-center gap-2">

                    <div
                        className="
                            w-7 h-7
                            rounded-full
                            bg-neutral-100
                            dark:bg-neutral-800
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <Landmark size={14} />

                    </div>

                    <div>

                        <p
                            className="
                                text-xs
                                text-neutral-500
                                dark:text-neutral-500
                            "
                        >
                            Source
                        </p>

                        <p
                            className="
                                text-sm
                                font-medium
                                text-neutral-700
                                dark:text-neutral-300
                            "
                        >
                            {scheme.source || "Government Portal"}
                        </p>

                    </div>

                </div>


                {scheme.url && (

                    <a
                        href={scheme.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-primary-700
                            hover:bg-primary-800
                            dark:bg-primary-600
                            dark:hover:bg-primary-500
                            text-white
                            text-sm
                            font-medium
                            transition-colors
                            duration-200
                            group/button
                        "
                    >

                        View

                        <ExternalLink
                            size={15}
                            className="
                                group-hover/button:translate-x-0.5
                                transition-transform
                            "
                        />

                    </a>

                )}

            </div>

        </motion.article>
    )
}


// ======================================================
// MAIN COMPONENT
// ======================================================

export default function Schemes() {

    const [schemes, setSchemes] = useState([])

    const [loading, setLoading] = useState(true)

    const [refreshing, setRefreshing] = useState(false)

    const [error, setError] = useState("")

    const [search, setSearch] = useState("")

    const [category, setCategory] = useState("All")


    // ==================================================
    // FETCH SCHEMES
    // ==================================================

    const fetchSchemes = async (showRefresh = false) => {

        if (showRefresh) {
            setRefreshing(true)
        } else {
            setLoading(true)
        }

        setError("")

        try {

            const response = await fetch(
                `${API_URL}/api/schemes`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json"
                    }
                }
            )

            if (!response.ok) {

                throw new Error(
                    `Server returned ${response.status}`
                )

            }

            const data = await response.json()


            if (data.status !== "success") {

                throw new Error(
                    data.message ||
                    "Unable to fetch schemes"
                )

            }


            setSchemes(
                Array.isArray(data.schemes)
                    ? data.schemes
                    : []
            )

        } catch (err) {

            console.error(
                "Schemes API Error:",
                err
            )

            setError(
                "Unable to load government schemes. Please make sure the backend server is running."
            )

        } finally {

            setLoading(false)

            setRefreshing(false)

        }
    }


    // ==================================================
    // INITIAL LOAD
    // ==================================================

    useEffect(() => {

        fetchSchemes()

    }, [])


    // ==================================================
    // CATEGORIES
    // ==================================================

    const categories = useMemo(() => {

        const unique = new Set()

        schemes.forEach((scheme) => {

            unique.add(
                getCategory(scheme.title)
            )

        })

        return [
            "All",
            ...Array.from(unique).sort()
        ]

    }, [schemes])


    // ==================================================
    // FILTER SCHEMES
    // ==================================================

    const filteredSchemes = useMemo(() => {

        const searchValue =
            search.trim().toLowerCase()


        return schemes.filter((scheme) => {

            const title =
                (scheme.title || "").toLowerCase()

            const description =
                (scheme.description || "").toLowerCase()

            const schemeCategory =
                getCategory(scheme.title)


            const matchesSearch =
                !searchValue ||
                title.includes(searchValue) ||
                description.includes(searchValue)


            const matchesCategory =
                category === "All" ||
                schemeCategory === category


            return (
                matchesSearch &&
                matchesCategory
            )

        })

    }, [
        schemes,
        search,
        category
    ])


    // ==================================================
    // CLEAR SEARCH
    // ==================================================

    const clearSearch = () => {

        setSearch("")

        setCategory("All")

    }


    // ==================================================
    // UI
    // ==================================================

    return (

        <div
            className="
                min-h-screen
                bg-neutral-50
                dark:bg-neutral-950
            "
        >

            <Navbar />


            {/* ==========================================
                HERO
            ========================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    px-4
                    sm:px-6
                    lg:px-10
                    pt-12
                    sm:pt-16
                    pb-10
                "
            >

                <div
                    className="
                        absolute
                        inset-0
                        pointer-events-none
                    "
                >

                    <div
                        className="
                            absolute
                            top-0
                            left-1/2
                            -translate-x-1/2
                            w-[500px]
                            h-[300px]
                            bg-primary-100/40
                            dark:bg-primary-900/10
                            blur-3xl
                            rounded-full
                        "
                    />

                </div>


                <div
                    className="
                        relative
                        max-w-6xl
                        mx-auto
                        text-center
                    "
                >

                    {/* Icon */}

                    <motion.div

                        initial={{
                            opacity: 0,
                            scale: 0.8
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1
                        }}

                        className="
                            inline-flex
                            items-center
                            justify-center
                            w-16
                            h-16
                            rounded-2xl
                            bg-primary-100
                            dark:bg-primary-900
                            text-primary-700
                            dark:text-primary-300
                            mb-6
                        "
                    >

                        <Sprout size={30} />

                    </motion.div>


                    <motion.h1

                        initial={{
                            opacity: 0,
                            y: 15
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        className="
                            text-4xl
                            sm:text-5xl
                            lg:text-6xl
                            font-display
                            font-semibold
                            text-primary-800
                            dark:text-primary-200
                            tracking-tight
                            mb-5
                        "
                    >

                        Government Schemes

                    </motion.h1>


                    <motion.p

                        initial={{
                            opacity: 0,
                            y: 15
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            delay: 0.1
                        }}

                        className="
                            max-w-2xl
                            mx-auto
                            text-base
                            sm:text-lg
                            text-neutral-600
                            dark:text-neutral-400
                            leading-relaxed
                        "
                    >

                        Discover the latest government schemes,
                        financial assistance, insurance and
                        agricultural support programs available
                        for farmers.

                    </motion.p>


                    {/* Live indicator */}

                    <motion.div

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: 1
                        }}

                        transition={{
                            delay: 0.2
                        }}

                        className="
                            inline-flex
                            items-center
                            gap-2
                            mt-6
                            px-4
                            py-2
                            rounded-full
                            bg-white
                            dark:bg-neutral-900
                            border
                            border-neutral-200
                            dark:border-neutral-800
                            shadow-sm
                        "
                    >

                        <span
                            className="
                                relative
                                flex
                                w-2.5
                                h-2.5
                            "
                        >

                            <span
                                className="
                                    absolute
                                    inline-flex
                                    h-full
                                    w-full
                                    rounded-full
                                    bg-green-400
                                    opacity-75
                                    animate-ping
                                "
                            />

                            <span
                                className="
                                    relative
                                    inline-flex
                                    rounded-full
                                    w-2.5
                                    h-2.5
                                    bg-green-500
                                "
                            />

                        </span>

                        <span
                            className="
                                text-sm
                                font-medium
                                text-neutral-700
                                dark:text-neutral-300
                            "
                        >

                            Live government scheme data

                        </span>

                    </motion.div>

                </div>

            </section>


            {/* ==========================================
                SEARCH + FILTER
            ========================================== */}

            <section
                className="
                    px-4
                    sm:px-6
                    lg:px-10
                    pb-8
                "
            >

                <div
                    className="
                        max-w-6xl
                        mx-auto
                    "
                >

                    <div
                        className="
                            bg-white
                            dark:bg-neutral-900
                            rounded-3xl
                            border
                            border-neutral-200
                            dark:border-neutral-800
                            p-4
                            sm:p-5
                            shadow-soft
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                lg:flex-row
                                gap-4
                            "
                        >

                            {/* Search */}

                            <div
                                className="
                                    relative
                                    flex-1
                                "
                            >

                                <Search
                                    size={20}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-neutral-400
                                    "
                                />

                                <input

                                    type="text"

                                    value={search}

                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }

                                    placeholder="
                                        Search government schemes...
                                    "

                                    className="
                                        w-full
                                        h-12
                                        pl-12
                                        pr-12
                                        rounded-xl
                                        bg-neutral-50
                                        dark:bg-neutral-950
                                        border
                                        border-neutral-200
                                        dark:border-neutral-800
                                        text-neutral-900
                                        dark:text-neutral-100
                                        placeholder:text-neutral-400
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-primary-500/30
                                        focus:border-primary-500
                                        transition
                                    "
                                />


                                {search && (

                                    <button

                                        onClick={() =>
                                            setSearch("")
                                        }

                                        className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-neutral-400
                                            hover:text-neutral-700
                                            dark:hover:text-neutral-200
                                        "
                                    >

                                        <X size={18} />

                                    </button>

                                )}

                            </div>


                            {/* Refresh */}

                            <button

                                onClick={() =>
                                    fetchSchemes(true)
                                }

                                disabled={refreshing}

                                className="
                                    h-12
                                    px-5
                                    rounded-xl
                                    bg-primary-700
                                    hover:bg-primary-800
                                    disabled:opacity-60
                                    text-white
                                    font-medium
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition-colors
                                "
                            >

                                <RefreshCw
                                    size={18}
                                    className={
                                        refreshing
                                            ? "animate-spin"
                                            : ""
                                    }
                                />

                                {refreshing
                                    ? "Refreshing..."
                                    : "Refresh"
                                }

                            </button>

                        </div>


                        {/* Categories */}

                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-2
                                mt-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-neutral-500
                                    mr-1
                                "
                            >

                                <Filter size={16} />

                                Filter:

                            </div>


                            {categories.map((item) => (

                                <button

                                    key={item}

                                    onClick={() =>
                                        setCategory(item)
                                    }

                                    className={`
                                        px-4
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-medium
                                        transition-all
                                        ${
                                            category === item
                                                ? `
                                                    bg-primary-700
                                                    text-white
                                                `
                                                : `
                                                    bg-neutral-100
                                                    dark:bg-neutral-800
                                                    text-neutral-600
                                                    dark:text-neutral-300
                                                    hover:bg-neutral-200
                                                    dark:hover:bg-neutral-700
                                                `
                                        }
                                    `}
                                >

                                    {item}

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                RESULTS
            ========================================== */}

            <section
                className="
                    px-4
                    sm:px-6
                    lg:px-10
                    pb-16
                "
            >

                <div
                    className="
                        max-w-6xl
                        mx-auto
                    "
                >

                    {/* Result count */}

                    {!loading && !error && (

                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                justify-between
                                gap-3
                                mb-6
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-neutral-900
                                        dark:text-neutral-100
                                        font-semibold
                                    "
                                >

                                    {filteredSchemes.length}
                                    {" "}
                                    {filteredSchemes.length === 1
                                        ? "scheme"
                                        : "schemes"
                                    }

                                </p>

                                <p
                                    className="
                                        text-sm
                                        text-neutral-500
                                        dark:text-neutral-500
                                    "
                                >

                                    Latest available government
                                    scheme information

                                </p>

                            </div>


                            {(search ||
                                category !== "All") && (

                                <button

                                    onClick={clearSearch}

                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        text-sm
                                        text-primary-700
                                        dark:text-primary-300
                                        hover:underline
                                    "
                                >

                                    <X size={15} />

                                    Clear filters

                                </button>

                            )}

                        </div>

                    )}


                    {/* Loading */}

                    {loading && (

                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-6
                            "
                        >

                            {Array.from({
                                length: 6
                            }).map((_, index) => (

                                <LoadingCard
                                    key={index}
                                />

                            ))}

                        </div>

                    )}


                    {/* Error */}

                    {!loading && error && (

                        <motion.div

                            initial={{
                                opacity: 0,
                                y: 10
                            }}

                            animate={{
                                opacity: 1,
                                y: 0
                            }}

                            className="
                                max-w-xl
                                mx-auto
                                text-center
                                py-16
                                px-6
                                bg-white
                                dark:bg-neutral-900
                                rounded-3xl
                                border
                                border-neutral-200
                                dark:border-neutral-800
                            "
                        >

                            <div
                                className="
                                    w-16
                                    h-16
                                    mx-auto
                                    mb-5
                                    rounded-2xl
                                    bg-red-100
                                    dark:bg-red-950
                                    text-red-600
                                    dark:text-red-400
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <Landmark size={28} />

                            </div>


                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    text-neutral-900
                                    dark:text-neutral-100
                                    mb-2
                                "
                            >

                                Unable to load schemes

                            </h2>


                            <p
                                className="
                                    text-neutral-600
                                    dark:text-neutral-400
                                    mb-6
                                "
                            >

                                {error}

                            </p>


                            <button

                                onClick={() =>
                                    fetchSchemes()
                                }

                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-primary-700
                                    hover:bg-primary-800
                                    text-white
                                    font-medium
                                "
                            >

                                <RefreshCw size={17} />

                                Try Again

                            </button>

                        </motion.div>

                    )}


                    {/* Empty */}

                    {!loading &&
                        !error &&
                        filteredSchemes.length === 0 && (

                            <motion.div

                                initial={{
                                    opacity: 0
                                }}

                                animate={{
                                    opacity: 1
                                }}

                                className="
                                    text-center
                                    py-16
                                    px-6
                                    bg-white
                                    dark:bg-neutral-900
                                    rounded-3xl
                                    border
                                    border-neutral-200
                                    dark:border-neutral-800
                                "
                            >

                                <div
                                    className="
                                        w-16
                                        h-16
                                        mx-auto
                                        mb-5
                                        rounded-2xl
                                        bg-neutral-100
                                        dark:bg-neutral-800
                                        text-neutral-500
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <Search size={28} />

                                </div>


                                <h2
                                    className="
                                        text-xl
                                        font-semibold
                                        text-neutral-900
                                        dark:text-neutral-100
                                        mb-2
                                    "
                                >

                                    No schemes found

                                </h2>


                                <p
                                    className="
                                        text-neutral-600
                                        dark:text-neutral-400
                                        mb-5
                                    "
                                >

                                    Try searching for a different
                                    scheme or category.

                                </p>


                                <button

                                    onClick={clearSearch}

                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-primary-700
                                        text-white
                                        font-medium
                                    "
                                >

                                    Clear Filters

                                    <ChevronRight
                                        size={17}
                                    />

                                </button>

                            </motion.div>

                        )}


                    {/* Scheme cards */}

                    {!loading &&
                        !error &&
                        filteredSchemes.length > 0 && (

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    md:grid-cols-2
                                    gap-6
                                "
                            >

                                <AnimatePresence>

                                    {filteredSchemes.map(
                                        (scheme, index) => (

                                            <SchemeCard
                                                key={
                                                    scheme.url ||
                                                    scheme.id ||
                                                    index
                                                }
                                                scheme={scheme}
                                                index={index}
                                            />

                                        )
                                    )}

                                </AnimatePresence>

                            </div>

                        )}

                </div>

            </section>


            <Footer />

        </div>
    )
}