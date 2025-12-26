import { Link } from 'react-router-dom'
import type { CartItem } from '../context/CartContext'

interface OrderSummaryProps {
    items: CartItem[]
    pricing: {
        total: number
        fraisLivraison: number
        totalFinal: number
    }
    delivery: {
        modeLivraison: 'livraison' | 'retrait'
        quartier: string
    }
}

export default function OrderSummary({
    items,
    pricing,
    delivery
}: OrderSummaryProps) {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
            <h2 className="text-lg font-bold text-royal mb-4">Récapitulatif</h2>

            <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
                {items.map(item => (
                    <OrderItem key={item.product.id} item={item} />
                ))}
            </div>

            <PriceSummary
                pricing={pricing}
                delivery={delivery}
            />

            <Link
                to="/boutique"
                className="block text-center text-sage text-sm font-medium mt-4 hover:underline"
            >
                ← Continuer mes achats
            </Link>
        </div>
    )
}

function OrderItem({ item }: { item: CartItem }) {
    const subtotal = item.product.prix * item.quantity

    return (
        <div className="flex gap-3 p-3 bg-sand/50 rounded-xl">
            <img
                src={item.product.image_url || '/placeholder.jpg'}
                alt={item.product.nom}
                className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-royal text-sm truncate">
                    {item.product.nom}
                </h3>
                <p className="text-royal/60 text-sm">Qté: {item.quantity}</p>
                <p className="text-sage font-bold text-sm">
                    {subtotal.toLocaleString()} FCFA
                </p>
            </div>
        </div>
    )
}

interface PriceSummaryProps {
    pricing: {
        total: number
        fraisLivraison: number
        totalFinal: number
    }
    delivery: {
        modeLivraison: 'livraison' | 'retrait'
        quartier: string
    }
}

function PriceSummary({ pricing, delivery }: PriceSummaryProps) {
    const renderDeliveryFee = () => {
        if (delivery.modeLivraison === 'retrait') {
            return <span className="text-sage">Gratuit</span>
        }
        if (delivery.quartier) {
            return <span className="text-sage">{pricing.fraisLivraison.toLocaleString()} FCFA</span>
        }
        return <span className="text-royal/40 italic">Sélectionnez un quartier</span>
    }

    return (
        <div className="border-t border-royal/10 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-royal/60">
                <span>Sous-total</span>
                <span>{pricing.total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-sm text-royal/60">
                <span>Livraison</span>
                {renderDeliveryFee()}
            </div>
            <div className="flex justify-between text-xl font-bold text-royal pt-2 border-t border-royal/10">
                <span>Total</span>
                <span>{pricing.totalFinal.toLocaleString()} FCFA</span>
            </div>
        </div>
    )
}
