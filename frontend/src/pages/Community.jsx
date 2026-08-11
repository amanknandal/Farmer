import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useAuth } from "../context/AuthContext"
import { Users, MessageCircle, ThumbsUp, Loader2 } from "lucide-react"

export default function Community() {

    const { user } = useAuth()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [posting, setPosting] = useState(false)
    const [openComments, setOpenComments] = useState(null)

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        try {
            const response = await api.get("/community/posts")
            setPosts(response.data.data)
        } catch (err) {
            setPosts([])
        } finally {
            setLoading(false)
        }
    }

    const submitPost = async () => {
        if (!message.trim() || posting) return
        setPosting(true)
        try {
            await api.post("/community/posts", { message })
            setMessage("")
            loadPosts()
        } finally {
            setPosting(false)
        }
    }

    const toggleLike = async (postId) => {
        if (!user) return
        const response = await api.post(`/community/posts/${postId}/like`)
        setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, likes_count: response.data.likes_count, liked_by_me: response.data.liked } : p))
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

            <Navbar />

            <section className="px-4 sm:px-6 lg:px-10 py-12 max-w-4xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-display-md font-display font-semibold text-primary-800 dark:text-primary-200 mb-3">Farmer Community</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Connect, share knowledge and learn from farmers around the country</p>
                </div>

                {
                    user ? (
                        <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-6 mb-10">
                            <textarea
                                placeholder="Share your farming experience..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent p-4 outline-none focus:ring-2 focus:ring-primary-400 text-neutral-800 dark:text-neutral-100 resize-none"
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={submitPost}
                                    disabled={posting}
                                    className="px-6 h-11 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold flex items-center gap-2 disabled:opacity-60"
                                >
                                    {posting && <Loader2 className="animate-spin" size={16} />}
                                    Post
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-6 mb-10 text-center text-neutral-600 dark:text-neutral-400">
                            Log in to share your own experience with other farmers
                        </div>
                    )
                }

                {
                    loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => <div key={i} className="h-32 rounded-card bg-neutral-100 dark:bg-neutral-800 animate-pulse" />)}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-6">

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 flex items-center justify-center">
                                            <Users size={22} />
                                        </div>
                                        <div>
                                            <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">{post.author_name}</h2>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Community Member</p>
                                        </div>
                                    </div>

                                    <p className="text-neutral-700 dark:text-neutral-300 leading-7 mb-5">{post.message}</p>

                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            aria-label="Like post"
                                            className={`flex items-center gap-2 font-semibold text-sm ${post.liked_by_me ? "text-primary-700 dark:text-primary-300" : "text-neutral-600 dark:text-neutral-400"}`}
                                        >
                                            <ThumbsUp size={18} fill={post.liked_by_me ? "currentColor" : "none"} />
                                            {post.likes_count}
                                        </button>
                                        <button
                                            onClick={() => setOpenComments(openComments === post.id ? null : post.id)}
                                            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-semibold text-sm"
                                        >
                                            <MessageCircle size={18} />
                                            {post.comment_count} Comments
                                        </button>
                                    </div>

                                    {openComments === post.id && <CommentThread postId={post.id} canComment={Boolean(user)} />}

                                </div>
                            ))}
                            {posts.length === 0 && (
                                <div className="bg-white dark:bg-neutral-900 rounded-card shadow-soft p-10 text-center text-neutral-500 dark:text-neutral-400">
                                    No posts yet, be the first to share something
                                </div>
                            )}
                        </div>
                    )
                }

            </section>

            <Footer />

        </div>
    )
}

function CommentThread({ postId, canComment }) {

    const [comments, setComments] = useState([])
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const response = await api.get(`/community/posts/${postId}/comments`)
        setComments(response.data.data)
        setLoading(false)
    }

    const submit = async () => {
        if (!text.trim()) return
        await api.post(`/community/posts/${postId}/comments`, { comment: text })
        setText("")
        load()
    }

    return (
        <div className="mt-5 pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-3">

            {loading ? (
                <p className="text-sm text-neutral-400">Loading comments...</p>
            ) : (
                comments.map((c) => (
                    <div key={c.id} className="text-sm">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-100">{c.author_name}</span>
                        <span className="text-neutral-600 dark:text-neutral-400"> · {c.comment}</span>
                    </div>
                ))
            )}

            {
                canComment && (
                    <div className="flex gap-2 pt-2">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") submit() }}
                            placeholder="Write a comment..."
                            className="flex-1 h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary-400"
                        />
                        <button onClick={submit} className="h-10 px-4 rounded-lg bg-primary-700 text-white text-sm font-semibold">Send</button>
                    </div>
                )
            }

        </div>
    )
}
