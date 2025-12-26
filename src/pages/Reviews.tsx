import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Review } from '../lib/supabase'
import ReviewCard from '../components/ReviewCard'
import StarRating from '../components/StarRating'
import ErrorState from '../components/ErrorState'
import { MessageSquareQuote } from 'lucide-react'

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const { data, error: supabaseError } = await supabase
                .from('reviews')
                .select('*')
                .order('created_at', { ascending: false })

            if (supabaseError) throw supabaseError
            if (data) setReviews(data)
        } catch (err) {
            console.error('Error fetching reviews:', err)
            setError('Impossible de charger les avis. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchReviews()

        // Setup realtime subscription
        const channel = supabase
            .channel('reviews-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'reviews' },
                (payload) => {
                    setReviews(current => [payload.new as Review, ...current])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [fetchReviews])

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.note, 0) / reviews.length
        : 0

    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.note === rating).length,
        percentage: reviews.length > 0
            ? (reviews.filter(r => r.note === rating).length / reviews.length) * 100
            : 0,
    }))

    return (
        <main className="pt-32 pb-16 min-h-screen bg-sand">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-sage font-semibold text-sm uppercase tracking-wider">Témoignages</span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-royal mt-3 mb-4">
                        Avis de nos Clients
                    </h1>
                    <p className="text-royal/60 max-w-2xl mx-auto">
                        Découvrez ce que les parents disent de nos bouillies. Leur satisfaction est notre plus grande fierté.
                    </p>
                </div>

                {/* Stats */}
                {reviews.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 mb-12 shadow-lg">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Average Rating */}
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <span className="text-6xl font-bold text-royal">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <div>
                                        <StarRating rating={Math.round(averageRating)} size="lg" />
                                        <p className="text-royal/60 mt-1">{reviews.length} avis</p>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Distribution */}
                            <div className="space-y-2">
                                {ratingDistribution.map(({ rating, count, percentage }) => (
                                    <div key={rating} className="flex items-center gap-3">
                                        <span className="text-sm text-royal/60 w-6">{rating}★</span>
                                        <div className="flex-1 h-3 bg-sand rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-royal/60 w-8">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Grid */}
                {error ? (
                    <ErrorState
                        title="Erreur de chargement"
                        message={error}
                        onRetry={fetchReviews}
                    />
                ) : loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
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
                ) : reviews.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-royal/10">
                        <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl shadow-sm flex items-center justify-center p-4">
                            <MessageSquareQuote className="w-12 h-12 text-sage" />
                        </div>
                        <h3 className="text-xl font-bold text-royal mb-2">Aucun avis pour le moment</h3>
                        <p className="text-royal/60">Soyez le premier à partager votre expérience !</p>
                    </div>
                )}

                {/* Realtime Indicator */}
                <div className="mt-12 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-royal/60 shadow">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Avis en temps réel
                    </span>
                </div>
            </div>
        </main>
    )
}
