import { Link } from 'react-router-dom'
import { ShoppingBag, X } from 'lucide-react'
import type { CartItem } from '../context/CartContext'

interface CartSidebarProps {
    isOpen: boolean
    onClose: () => void
    cart: {
        items: CartItem[]
        total: number
    }
    actions: {
        updateQuantity: (id: string, quantity: number) => void
        removeFromCart: (id: string) => void
        clearCart: () => void
    }
}

export default function CartSidebar({
    isOpen,
    onClose,
    cart,
    actions
}: CartSidebarProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[60]">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-[slide-left_0.3s_ease-out]">
                <div className="flex items-center justify-between p-6 border-b border-royal/10">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-sage" />
                        <h2 className="text-xl font-bold text-royal">Votre Panier</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-royal/40 hover:text-royal hover:bg-sand rounded-full transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {cart.items.length === 0 ? (
                        <EmptyCart onClose={onClose} />
                    ) : (
                        <CartItemsList
                            items={cart.items}
                            updateQuantity={actions.updateQuantity}
                            removeFromCart={actions.removeFromCart}
                        />
                    )}
                </div>

                {cart.items.length > 0 && (
                    <CartFooter
                        total={cart.total}
                        onClose={onClose}
                        clearCart={actions.clearCart}
                    />
                )}
            </div>
        </div>
    )
}

function EmptyCart({ onClose }: { onClose: () => void }) {
    return (
        <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-sand-dark rounded-full flex items-center justify-center">
                <span className="text-4xl">🥣</span>
            </div>
            <p className="text-royal/60">Votre panier est vide</p>
            <Link
                to="/boutique"
                onClick={onClose}
                className="inline-block mt-4 px-6 py-2 bg-sage text-white rounded-full font-medium hover:bg-sage-dark transition-colors"
            >
                Voir la boutique
            </Link>
        </div>
    )
}

interface CartItemsListProps {
    items: CartItem[]
    updateQuantity: (id: string, quantity: number) => void
    removeFromCart: (id: string) => void
}

function CartItemsList({ items, updateQuantity, removeFromCart }: CartItemsListProps) {
    return (
        <div className="space-y-4">
            {items.map(item => (
                <CartItemCard
                    key={item.product.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                />
            ))}
        </div>
    )
}

interface CartItemCardProps {
    item: CartItem
    updateQuantity: (id: string, quantity: number) => void
    removeFromCart: (id: string) => void
}

function CartItemCard({ item, updateQuantity, removeFromCart }: CartItemCardProps) {
    const isMinQuantity = item.quantity <= 1

    return (
        <div className="flex gap-4 p-3 bg-sand rounded-xl">
            <img
                src={item.product.image_url || '/placeholder.jpg'}
                alt={item.product.nom}
                className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
                <h3 className="font-semibold text-royal">{item.product.nom}</h3>
                <p className="text-sage font-bold">{item.product.prix.toLocaleString()} FCFA</p>
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={isMinQuantity}
                        className={`
                            w-8 h-8 rounded-full bg-white border border-royal/20 text-royal transition-colors
                            ${isMinQuantity ? 'opacity-30 cursor-not-allowed' : 'hover:bg-royal hover:text-white'}
                        `}
                        aria-label={`Réduire la quantité de ${item.product.nom}`}
                    >
                        -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="
                            w-8 h-8 rounded-full bg-white border border-royal/20 text-royal 
                            hover:bg-royal hover:text-white transition-colors
                        "
                        aria-label={`Augmenter la quantité de ${item.product.nom}`}
                    >
                        +
                    </button>
                    <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Supprimer ${item.product.nom} du panier`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

interface CartFooterProps {
    total: number
    onClose: () => void
    clearCart: () => void
}

function CartFooter({ total, onClose, clearCart }: CartFooterProps) {
    return (
        <div className="p-4 border-t border-royal/10 space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-royal/60">Total</span>
                <span className="text-2xl font-bold text-royal">{total.toLocaleString()} FCFA</span>
            </div>
            <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full py-4 btn-primary text-white text-center font-bold rounded-xl hover:shadow-xl transition-all shadow-lg"
            >
                <span className="flex items-center justify-center gap-2">
                    Passer au checkout
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </Link>
            <button
                onClick={clearCart}
                className="w-full py-2 text-royal/60 hover:text-red-500 transition-colors text-sm"
            >
                Vider le panier
            </button>
        </div>
    )
}
