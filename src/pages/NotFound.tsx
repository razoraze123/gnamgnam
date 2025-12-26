import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="min-h-screen pt-32 pb-12 flex items-center bg-sand">
            <div className="max-w-md mx-auto px-4 text-center">
                <div className="bg-white p-6 rounded-3xl shadow-xl inline-block mb-8">
                    <Search className="w-20 h-20 text-sage" />
                </div>
                <h1 className="text-6xl font-black text-royal mb-4">404</h1>
                <h2 className="text-2xl font-bold text-royal mb-4">Page introuvable</h2>
                <p className="text-royal/60 mb-8">
                    Désolé, la bouillie que vous cherchez n'est pas ici.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-4 btn-primary text-white font-bold rounded-xl shadow-lg"
                    >
                        Retour à l'accueil
                    </Link>
                    <Link
                        to="/boutique"
                        className="px-8 py-4 bg-white text-royal font-bold rounded-xl border-2 border-royal/10 hover:border-sage transition-colors"
                    >
                        Voir la boutique
                    </Link>
                </div>
            </div>
        </main>
    )
}
