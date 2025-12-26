import { Link } from 'react-router-dom'

export default function Confirmation() {
    return (
        <main className="min-h-screen bg-sand pt-32 pb-16">
            <div className="max-w-2xl mx-auto px-4 text-center">
                {/* Success Animation */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-royal mb-4">
                    Commande envoyée ! 🎉
                </h1>
                <p className="text-royal/60 text-lg mb-8 max-w-md mx-auto">
                    Votre commande a été transmise avec succès via WhatsApp.
                    Notre équipe vous contactera très bientôt pour confirmer les détails.
                </p>

                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="w-14 h-14 mx-auto mb-4 bg-sage/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📱</span>
                        </div>
                        <h3 className="font-bold text-royal mb-2">Confirmation WhatsApp</h3>
                        <p className="text-royal/60 text-sm">
                            Vous recevrez une réponse sous 30 minutes aux heures ouvrées
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="w-14 h-14 mx-auto mb-4 bg-sage/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🚚</span>
                        </div>
                        <h3 className="font-bold text-royal mb-2">Livraison Rapide</h3>
                        <p className="text-royal/60 text-sm">
                            Livraison sous 24-48h selon votre localisation
                        </p>
                    </div>
                </div>

                {/* CTA */}
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
                        Continuer mes achats
                    </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-12 p-6 bg-royal/5 rounded-2xl">
                    <p className="text-royal/60 text-sm">
                        Une question ? Contactez-nous directement sur{' '}
                        <a
                            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '33611309743'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sage font-semibold hover:underline"
                        >
                            WhatsApp
                        </a>
                    </p>
                </div>
            </div>
        </main>
    )
}
