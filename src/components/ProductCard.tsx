import { useState } from 'react'
import type { Product } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import ProductModal from './ProductModal'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { addToCart } = useCart()
    const { showToast } = useToast()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation()
        addToCart(product)
        showToast(`${product.nom} ajouté au panier !`)
    }

    const isOutOfStock = product.stock_disponible <= 0
    const isLowStock = product.stock_disponible > 0 && product.stock_disponible < 5

    return (
        <>
            <div className='product-card bg-white rounded-2xl overflow-hidden shadow-lg group'>
                <div
                    className='relative aspect-square overflow-hidden bg-sand'
                >
                    <img
                        src={product.image_url || '/placeholder.jpg'}
                        alt={product.nom}
                        loading='lazy'
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />

                    {/* Age Badge */}
                    {product.categorie_age && (
                        <span className='absolute top-3 left-3 px-3 py-1 bg-royal text-white text-xs font-semibold rounded-full'>
                            {product.categorie_age}
                        </span>
                    )}

                    {isOutOfStock && (
                        <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                            <span className='px-4 py-2 bg-red-500 text-white font-bold rounded-full'>
                                Épuisé
                            </span>
                        </div>
                    )}

                    {isLowStock && !isOutOfStock && (
                        <span className='absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full animate-pulse'>
                            Stock limité
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className='p-4'>
                    <h3
                        className='text-lg font-bold text-royal mb-1 line-clamp-1'
                    >
                        {product.nom}
                    </h3>
                    <p className='text-royal/60 text-sm mb-3 line-clamp-2'>
                        {product.description}
                    </p>
                    <div className='flex items-center justify-between mt-4'>
                        <span className='text-xl font-bold text-sage'>
                            {product.prix.toLocaleString()} <span className='text-sm'>FCFA</span>
                        </span>

                        <div className='flex items-center gap-3'>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className='text-royal/60 hover:text-sage text-sm font-medium hover:underline underline-offset-4 transition-colors'
                            >
                                En savoir plus
                            </button>

                            <button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm ${isOutOfStock
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'btn-primary text-white hover:shadow-lg'
                                    }`}
                            >
                                {isOutOfStock ? 'Indisponible' : 'Ajouter'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Detail Modal */}
            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
