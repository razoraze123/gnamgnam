import type { Review } from '../lib/supabase'
import StarRating from './StarRating'

interface ReviewCardProps {
    review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-sage to-sage-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                        {review.nom.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-royal truncate">{review.nom}</h4>
                        <StarRating rating={review.note} size="sm" />
                    </div>

                    {/* Comment */}
                    <p className="text-royal/70 text-sm leading-relaxed">
                        {review.commentaire}
                    </p>

                    {/* Date */}
                    <p className="text-royal/40 text-xs mt-3">
                        {formatDate(review.created_at)}
                    </p>
                </div>
            </div>
        </div>
    )
}
