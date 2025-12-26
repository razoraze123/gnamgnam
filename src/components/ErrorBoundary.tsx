import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen bg-sand flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-5xl">😵</span>
                        </div>
                        <h1 className="text-2xl font-bold text-royal mb-4">
                            Oups, une erreur s'est produite
                        </h1>
                        <p className="text-royal/60 mb-8">
                            Nous sommes désolés, quelque chose ne s'est pas passé comme prévu.
                            Veuillez réessayer ou revenir à l'accueil.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-sage text-white font-semibold rounded-xl hover:bg-sage-dark transition-colors"
                            >
                                Réessayer
                            </button>
                            <Link
                                to="/"
                                className="px-6 py-3 bg-white text-royal font-semibold rounded-xl border-2 border-royal/10 hover:border-royal/30 transition-colors"
                            >
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
