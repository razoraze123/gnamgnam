import type { CartItem } from '../context/CartContext'

interface WhatsAppOrderOptions {
    items: CartItem[]
    total: number
    customerInfo?: {
        prenom: string
        nom: string
        telephone: string
        modeLivraison: 'livraison' | 'retrait'
        quartier?: string
        descriptionLocalisation?: string
        moyenPaiement: 'especes' | 'nita'
        fraisLivraison: number
    }
}

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '33611309743'

/**
 * Generate WhatsApp URL with order message for cart overview
 */
export function generateCartWhatsAppUrl(items: CartItem[], total: number): string {
    let message = `*BON DE COMMANDE - GNAM GNAM BOUILLIE*\n`
    message += `---------------------------------------\n`
    message += `Détails de la sélection :\n`

    items.forEach(item => {
        message += `- ${item.quantity} x ${item.product.nom} (${item.product.prix.toLocaleString()} FCFA)\n`
    })

    message += `---------------------------------------\n`
    message += `TOTAL À RÉGLER : ${total.toLocaleString()} FCFA\n`
    message += `---------------------------------------\n`
    message += `Lien panier : http://gnamgnam.nordikforge.com/`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Generate WhatsApp URL with complete order message for checkout
 */
export function generateOrderWhatsAppUrl({
    items,
    total,
    customerInfo
}: WhatsAppOrderOptions): string {
    if (!customerInfo) {
        return generateCartWhatsAppUrl(items, total)
    }

    const totalFinal = total + customerInfo.fraisLivraison

    let message = `*🛍️ NOUVELLE COMMANDE - GNAM GNAM*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`

    message += `*👤 CLIENT*\n`
    message += `Nom: ${customerInfo.prenom} ${customerInfo.nom}\n`
    message += `Tél: ${customerInfo.telephone}\n\n`

    message += `*📦 LIVRAISON*\n`
    if (customerInfo.modeLivraison === 'livraison') {
        message += `🚚 Livraison à domicile\n`
        message += `📍 Quartier: ${customerInfo.quartier}\n`
        message += `💵 Frais: ${customerInfo.fraisLivraison.toLocaleString()} FCFA\n`
        if (customerInfo.descriptionLocalisation) {
            message += `📝 Indications: ${customerInfo.descriptionLocalisation}\n`
        }
    } else {
        message += `🏪 Retrait en boutique\n`
    }
    message += `\n`

    let paymentText = ''
    if (customerInfo.moyenPaiement === 'especes') {
        const deliveryType = customerInfo.modeLivraison === 'livraison' ? 'livraison' : 'remise'
        paymentText = `💵 Espèces à la ${deliveryType}`
    } else {
        paymentText = '📱 Nita'
    }
    message += `${paymentText}\n\n`

    message += `*🛒 PANIER*\n`
    items.forEach(item => {
        message += `• ${item.quantity}x ${item.product.nom}\n`
        message += `  └ ${(item.product.prix * item.quantity).toLocaleString()} FCFA\n`
    })

    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`
    message += `Sous-total: ${total.toLocaleString()} FCFA\n`
    if (customerInfo.fraisLivraison > 0) {
        message += `Livraison: ${customerInfo.fraisLivraison.toLocaleString()} FCFA\n`
    }
    message += `*💰 TOTAL: ${totalFinal.toLocaleString()} FCFA*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Get the WhatsApp number
 */
export function getWhatsAppNumber(): string {
    return WHATSAPP_NUMBER
}
