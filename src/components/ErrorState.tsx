import { Link } from 'react-router-dom'

interface ErrorStateProps {
    title?: string
    message?: string
    onRetry?: () => void
    showHomeLink?: boolean
}

export default function ErrorState({
    title = 'Impossible de charger les données',
    message = 'Vérifiez votre connexion internet et réessayez.',
    onRetry,
    showHomeLink = true
}: ErrorStateProps) {
    return (
        <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-royal mb-2">{title}</h3>
            <p className="text-royal/60 mb-6 max-w-md mx-auto">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-6 py-3 bg-sage text-white font-semibold rounded-xl hover:bg-sage-dark transition-colors"
                    >
                        Réessayer
                    </button>
                )}
                {showHomeLink && (
                    <Link
                        to="/"
                        className="px-6 py-3 bg-white text-royal font-semibold rounded-xl border-2 border-royal/10 hover:border-royal/30 transition-colors"
                    >
                        Retour à l'accueil
                    </Link>
                )}
            </div>
        </div>
    )
}
