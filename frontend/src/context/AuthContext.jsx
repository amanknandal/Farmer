import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const token = localStorage.getItem("agrosmart_token")
        if (!token) {
            setLoading(false)
            return
        }
        try {
            const response = await api.get("/auth/me")
            setUser(response.data.user)
        } catch (err) {
            localStorage.removeItem("agrosmart_token")
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = (token, userData) => {
        localStorage.setItem("agrosmart_token", token)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("agrosmart_token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: user?.role === "admin" }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
