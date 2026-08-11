import { Component } from "react"

export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error("AgroSmart error boundary caught:", error, info)
    }

    handleReload = () => {
        this.setState({ hasError: false })
        window.location.href = "/"
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6 text-center">
                    <div>
                        <h1 className="text-2xl font-display font-semibold text-primary-800 dark:text-primary-200 mb-3">Something went wrong</h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-8">An unexpected error occurred. Please try again.</p>
                        <button
                            onClick={this.handleReload}
                            className="bg-primary-700 hover:bg-primary-800 transition-colors text-white px-8 py-3.5 rounded-pill font-semibold"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
