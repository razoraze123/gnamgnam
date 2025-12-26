import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number
    size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    }

    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <Star
                    key={star}
                    className={`${sizeClasses[size]} ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                />
            ))}
        </div>
    )
}
