import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Sparkles, Sprout, Baby, Zap, Star, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Product, Review } from '../lib/supabase'
import ProductCard from '../components/ProductCard'
import ReviewCard from '../components/ReviewCard'
import ErrorState from '../components/ErrorState'

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
    const [latestReviews, setLatestReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const [productsRes, reviewsRes] = await Promise.all([
                supabase.from('products').select('*').limit(3),
                supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(3)
            ])

            if (productsRes.error) throw productsRes.error
            if (reviewsRes.error) throw reviewsRes.error

            setFeaturedProducts(productsRes.data || [])
            setLatestReviews(reviewsRes.data || [])
        } catch (err) {
            console.error('Error fetching data:', err)
            setError('Impossible de charger les données. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <main>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sand via-sand-warm to-sand">
                {/* Decorative Blobs */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-sage/20 blob" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-royal/10 blob" style={{ animationDelay: '-4s' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 text-sage font-semibold rounded-full text-sm mb-6 animate-[fade-in_0.5s_ease-out]">
                                <Leaf className="w-4 h-4" /> 100% Naturel & Premium
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-royal leading-tight mb-6">
                                La nutrition{' '}
                                <span className="gradient-text">parfaite</span>{' '}
                                pour votre bébé
                            </h1>
                            <p className="text-lg text-royal/70 mb-8 max-w-lg mx-auto lg:mx-0">
                                Découvrez nos bouillies premium préparées avec des ingrédients naturels soigneusement sélectionnés pour accompagner la croissance de votre enfant.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/boutique"
                                    className="btn-primary group px-8 py-4 text-white font-bold rounded-full text-lg shadow-lg flex items-center justify-center gap-2"
                                >
                                    Découvrir nos bouillies
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/bienfaits"
                                    className="px-8 py-4 bg-white text-royal font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all border-2 border-royal/10 flex items-center justify-center gap-2"
                                >
                                    Nos bienfaits
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-sage flex items-center justify-center gap-1">
                                        100<span className="text-base">%</span>
                                    </p>
                                    <p className="text-sm text-royal/60">Naturel</p>
                                </div>
                                <div className="w-px h-12 bg-royal/20" />
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-sage">Dès</p>
                                    <p className="text-sm text-royal/60">6 mois</p>
                                </div>
                                <div className="w-px h-12 bg-royal/20" />
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-sage flex items-center justify-center gap-1">
                                        5<Star className="w-5 h-5 fill-sage" />
                                    </p>
                                    <p className="text-sm text-royal/60">Avis clients</p>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative">
                            <div className="relative aspect-square max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-sage/30 to-sage-light/30 rounded-full blob" />
                                <div className="absolute inset-8 bg-white rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
                                    <div className="text-center p-8 flex flex-col items-center">
                                        <div className="w-24 h-24 bg-sand rounded-full flex items-center justify-center mb-6">
                                            <Sparkles className="w-12 h-12 text-sage animate-pulse" />
                                        </div>
                                        <p className="text-royal font-bold text-xl uppercase tracking-widest">Gnam Gnam</p>
                                        <p className="text-royal/60 text-sm italic">Bouillie Premium</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-sage font-semibold text-sm uppercase tracking-wider">Pourquoi nous choisir</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-royal mt-3">
                            Une qualité <span className="gradient-text">exceptionnelle</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Sprout className="w-10 h-10 text-sage" />,
                                title: 'Ingrédients Naturels',
                                description: 'Céréales locales et fruits frais, sélectionnés avec soin pour une nutrition optimale.',
                            },
                            {
                                icon: <Baby className="w-10 h-10 text-sage" />,
                                title: 'Adapté à Chaque Âge',
                                description: 'Formules spécialement conçues pour les besoins nutritionnels de chaque étape.',
                            },
                            {
                                icon: <Zap className="w-10 h-10 text-sage" />,
                                title: 'Sans Additifs',
                                description: 'Aucun conservateur, colorant artificiel ou sucre ajouté. Juste le meilleur.',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="text-center p-8 rounded-2xl bg-sand/50 hover:bg-white hover:shadow-xl transition-all group border-2 border-transparent hover:border-sage/10"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform group-hover:rotate-3">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-royal mb-3">{feature.title}</h3>
                                <p className="text-royal/60">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-sand">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-sage font-semibold text-sm uppercase tracking-wider">Notre sélection</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-royal mt-3">
                                Produits phares
                            </h2>
                        </div>
                        <Link
                            to="/boutique"
                            className="hidden sm:flex items-center gap-2 text-sage font-semibold hover:gap-3 transition-all"
                        >
                            Voir tout
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {error ? (
                        <ErrorState
                            title="Oups ! Une erreur est survenue"
                            message={error}
                            onRetry={fetchData}
                        />
                    ) : loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                                    <div className="aspect-square bg-sand-dark rounded-xl mb-4" />
                                    <div className="h-4 bg-sand-dark rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-sand-dark rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-royal/60">Les produits arrivent bientôt...</p>
                        </div>
                    )}

                    <div className="text-center mt-8 sm:hidden">
                        <Link
                            to="/boutique"
                            className="inline-flex items-center gap-2 text-sage font-semibold"
                        >
                            Voir toute la boutique
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-sage font-semibold text-sm uppercase tracking-wider">Témoignages</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-royal mt-3">
                            Ce que disent nos clients
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-sand rounded-2xl p-6 animate-pulse">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-sand-dark rounded-full" />
                                        <div className="flex-1">
                                            <div className="h-4 bg-sand-dark rounded w-24 mb-2" />
                                            <div className="h-3 bg-sand-dark rounded w-full mb-1" />
                                            <div className="h-3 bg-sand-dark rounded w-3/4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : latestReviews.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-6">
                            {latestReviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-royal/60">Les avis arrivent bientôt...</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <Link
                            to="/avis"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-royal text-white font-semibold rounded-full hover:bg-royal-light transition-colors"
                        >
                            Voir tous les avis
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-royal to-royal-dark text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block bg-white p-3 rounded-3xl shadow-xl mb-8">
                        <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Prêt à offrir le meilleur à votre bébé ?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Commandez dès maintenant et recevez vos bouillies premium. Livraison rapide et paiement à la livraison disponible.
                    </p>
                    <Link
                        to="/boutique"
                        className="inline-block px-8 py-4 bg-sage text-white font-bold rounded-full text-lg hover:bg-sage-light transition-colors shadow-lg"
                    >
                        Commander maintenant
                    </Link>
                </div>
            </section>
        </main>
    )
}
