import { useEffect } from 'react'
import { X, Leaf, Sparkles, ShieldCheck, Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

interface ProductModalProps {
    product: Product
    isOpen: boolean
    onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addToCart } = useCart()
    const { showToast } = useToast()

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleAddToCart = () => {
        addToCart(product)
        showToast(`${product.nom} ajouté au panier !`)
        onClose()
    }

    const isOutOfStock = product.stock_disponible <= 0

    return (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="pointer-events-auto relative bg-white w-full md:max-w-2xl md:mx-4 max-h-[90vh] flex flex-col md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-[slide-up_0.3s_ease-out] md:scale-in">

                {/* Close Button - Floating */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-royal transition-all shadow-lg"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content Container - Scrollable */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <div className="flex flex-col md:grid md:grid-cols-2">
                        {/* Image Section */}
                        <div className="relative h-[40vh] md:h-full bg-sand min-h-[300px]">
                            <img
                                src={product.image_url || '/placeholder.jpg'}
                                alt={product.nom}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                        </div>

                        {/* Content Section */}
                        <div className="relative px-6 py-8 -mt-10 md:mt-0 bg-white rounded-t-3xl md:rounded-none flex flex-col h-full z-10">
                            {/* Header */}
                            <div className="mb-6 text-center md:text-left">
                                <div className="inline-block px-3 py-1 mb-3 rounded-full bg-sand-dark text-royal/60 text-[10px] font-bold tracking-widest uppercase">
                                    {product.categorie_age || 'Premium'}
                                </div>
                                <h2 className="text-3xl font-extrabold text-royal mb-2 leading-tight">
                                    {product.nom}
                                </h2>
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <span className="text-2xl font-bold text-sage">
                                        {product.prix.toLocaleString()}
                                    </span>
                                    <span className="text-sm font-medium text-sage/70">FCFA</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <p className="text-royal/70 leading-relaxed text-sm md:text-base">
                                    {product.description}
                                </p>
                            </div>

                            {/* Benefits - Modern grid */}
                            <div className="mb-8">
                                <h3 className="text-[10px] font-bold text-royal/40 uppercase tracking-widest mb-4">
                                    Qualités nutritionnelles
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { icon: <Leaf className="w-4 h-4" />, text: '100% Naturel', color: 'text-sage' },
                                        { icon: <Sparkles className="w-4 h-4" />, text: 'Sans additifs', color: 'text-sage' },
                                        { icon: <ShieldCheck className="w-4 h-4" />, text: 'Nutritif', color: 'text-sage' },
                                        { icon: <Heart className="w-4 h-4" />, text: 'Avec amour', color: 'text-sage' },
                                    ].map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-2xl bg-sand/50 border border-sand-dark/50"
                                        >
                                            <span className={benefit.color}>{benefit.icon}</span>
                                            <span className="text-xs font-semibold text-royal/80">{benefit.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stock Info */}
                            {!isOutOfStock && (
                                <div className="flex items-center gap-2 text-[10px] text-royal/40 font-bold mb-6 justify-center md:justify-start uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Expédition sous 24h
                                </div>
                            )}

                            {/* Action Button */}
                            <div className="mt-auto">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95 ${isOutOfStock
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-royal hover:bg-royal-dark text-white'
                                        }`}
                                >
                                    {isOutOfStock ? (
                                        'Rupture de stock'
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5" />
                                            <span>Ajouter au panier</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
