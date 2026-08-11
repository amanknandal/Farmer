import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Trash2, Plus, Mail, MessageSquare, Wheat, Wrench } from "lucide-react"

const TABS = [
    { id: "crops", label: "Crops", icon: Wheat },
    { id: "tools", label: "Tools", icon: Wrench },
    { id: "messages", label: "Contact Messages", icon: Mail },
    { id: "community", label: "Community", icon: MessageSquare }
]

export default function Admin() {

    const [tab, setTab] = useState("crops")

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-6xl mx-auto">

                <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-8">
                    Admin Panel
                </h1>

                <div className="flex flex-wrap gap-2 mb-8" role="tablist">
                    {TABS.map((t) => {
                        const Icon = t.icon
                        return (
                            <button
                                key={t.id}
                                role="tab"
                                aria-selected={tab === t.id}
                                onClick={() => setTab(t.id)}
                                className={`min-h-[44px] px-4 rounded-xl font-medium flex items-center gap-2 transition-colors ${tab === t.id ? "bg-primary-700 text-white" : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"}`}
                            >
                                <Icon size={18} />
                                {t.label}
                            </button>
                        )
                    })}
                </div>

                {tab === "crops" && <CropsAdmin />}
                {tab === "tools" && <ToolsAdmin />}
                {tab === "messages" && <MessagesAdmin />}
                {tab === "community" && <CommunityAdmin />}

            </section>

            <Footer />

        </div>
    )
}

function CropsAdmin() {

    const [crops, setCrops] = useState([])
    const [form, setForm] = useState({ name: "", season: "", soil: "", water_requirement: "", temperature: "", fertilizer: "" })
    const [error, setError] = useState("")

    useEffect(() => { load() }, [])

    const load = async () => {
        const response = await api.get("/crops/")
        setCrops(response.data.data)
    }

    const submit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await api.post("/crops/", form)
            setForm({ name: "", season: "", soil: "", water_requirement: "", temperature: "", fertilizer: "" })
            load()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add crop")
        }
    }

    const remove = async (id) => {
        await api.delete(`/crops/${id}`)
        load()
    }

    return (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

            <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft divide-y divide-neutral-100 dark:divide-neutral-800">
                {crops.map((crop) => (
                    <div key={crop.id} className="p-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-neutral-800 dark:text-neutral-100">{crop.name}</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{crop.season} · {crop.soil}</p>
                        </div>
                        <button onClick={() => remove(crop.id)} aria-label={`Delete ${crop.name}`} className="w-10 h-10 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {crops.length === 0 && <p className="p-6 text-neutral-500">No crops yet</p>}
            </div>

            <form onSubmit={submit} className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-6 h-fit space-y-3">
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2 flex items-center gap-2"><Plus size={18} /> Add Crop</h2>
                {["name", "season", "soil", "water_requirement", "temperature", "fertilizer"].map((field) => (
                    <input
                        key={field}
                        placeholder={field.replace("_", " ")}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full h-11 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary-400"
                    />
                ))}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full h-11 rounded-lg bg-primary-700 text-white font-semibold">Add</button>
            </form>

        </div>
    )
}

function ToolsAdmin() {

    const [tools, setTools] = useState([])
    const [form, setForm] = useState({ name: "", price: "", category: "", description: "" })
    const [error, setError] = useState("")

    useEffect(() => { load() }, [])

    const load = async () => {
        const response = await api.get("/tools/")
        setTools(response.data.data)
    }

    const submit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await api.post("/tools/", form)
            setForm({ name: "", price: "", category: "", description: "" })
            load()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add tool")
        }
    }

    const remove = async (id) => {
        await api.delete(`/tools/${id}`)
        load()
    }

    return (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

            <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft divide-y divide-neutral-100 dark:divide-neutral-800">
                {tools.map((tool) => (
                    <div key={tool.id} className="p-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-neutral-800 dark:text-neutral-100">{tool.name}</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{tool.category} · {tool.price}</p>
                        </div>
                        <button onClick={() => remove(tool.id)} aria-label={`Delete ${tool.name}`} className="w-10 h-10 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {tools.length === 0 && <p className="p-6 text-neutral-500">No tools yet</p>}
            </div>

            <form onSubmit={submit} className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-6 h-fit space-y-3">
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2 flex items-center gap-2"><Plus size={18} /> Add Tool</h2>
                {["name", "price", "category", "description"].map((field) => (
                    <input
                        key={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full h-11 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary-400"
                    />
                ))}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full h-11 rounded-lg bg-primary-700 text-white font-semibold">Add</button>
            </form>

        </div>
    )
}

function MessagesAdmin() {

    const [messages, setMessages] = useState([])

    useEffect(() => { load() }, [])

    const load = async () => {
        const response = await api.get("/admin/contact-messages")
        setMessages(response.data.data)
    }

    const updateStatus = async (id, status) => {
        await api.put(`/admin/contact-messages/${id}`, { status })
        load()
    }

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft divide-y divide-neutral-100 dark:divide-neutral-800">
            {messages.map((m) => (
                <div key={m.id} className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <p className="font-semibold text-neutral-800 dark:text-neutral-100">{m.name} <span className="text-neutral-400 font-normal">({m.email})</span></p>
                        <select
                            value={m.status}
                            onChange={(e) => updateStatus(m.id, e.target.value)}
                            className="h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent px-2 text-sm"
                        >
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm">{m.message}</p>
                </div>
            ))}
            {messages.length === 0 && <p className="p-6 text-neutral-500">No messages yet</p>}
        </div>
    )
}

function CommunityAdmin() {

    const [posts, setPosts] = useState([])

    useEffect(() => { load() }, [])

    const load = async () => {
        const response = await api.get("/admin/community-posts")
        setPosts(response.data.data)
    }

    const remove = async (id) => {
        await api.delete(`/admin/community-posts/${id}`)
        load()
    }

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft divide-y divide-neutral-100 dark:divide-neutral-800">
            {posts.map((p) => (
                <div key={p.id} className="p-5 flex items-start justify-between gap-4">
                    <div>
                        <p className="font-semibold text-neutral-800 dark:text-neutral-100">{p.author_name}</p>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-1">{p.message}</p>
                    </div>
                    <button onClick={() => remove(p.id)} aria-label="Remove post" className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}
            {posts.length === 0 && <p className="p-6 text-neutral-500">No posts yet</p>}
        </div>
    )
}
