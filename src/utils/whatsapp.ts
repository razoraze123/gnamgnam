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
    let message = `*🌟 RÉCAPITULATIF PANIER - GNAM GNAM 🌟*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`
    message += `🛒 *Détails de la sélection :*\n`

    items.forEach(item => {
        message += `• ${item.quantity} x ${item.product.nom}\n`
        message += `  └ ${item.product.prix.toLocaleString()} FCFA\n`
    })

    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`
    message += `💰 *TOTAL ESTIMÉ : ${total.toLocaleString()} FCFA*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`
    message += `🔗 _Complétez votre commande ici :_\n`
    message += `http://gnamgnam.nordikforge.com/`

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

    let message = `*📦 NOUVELLE COMMANDE GNAM GNAM *\n`
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`

    message += `👤 *INFO CLIENT*\n`
    message += `• Nom : ${customerInfo.prenom} ${customerInfo.nom}\n`
    message += `• Tél : ${customerInfo.telephone}\n\n`

    message += `🚚 *LOGISTIQUE*\n`
    if (customerInfo.modeLivraison === 'livraison') {
        message += `• Mode : Livraison à domicile\n`
        message += `• Quartier : ${customerInfo.quartier}\n`
        if (customerInfo.descriptionLocalisation) {
            message += `• Précision : ${customerInfo.descriptionLocalisation}\n`
        }
    } else {
        message += `• Mode : Retrait en boutique\n`
    }
    message += `\n`

    message += `💳 *RÈGLEMENT*\n`
    const paymentText = customerInfo.moyenPaiement === 'especes'
        ? '💵 Espèces à la livraison'
        : '📱 Paiement via Nita'
    message += `• Moyen : ${paymentText}\n\n`

    message += `🛒 *DÉTAIL DU PANIER*\n`
    items.forEach(item => {
        message += `• ${item.quantity}x ${item.product.nom}\n`
        message += `  └ ${(item.product.prix * item.quantity).toLocaleString()} FCFA\n`
    })

    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`
    message += `• Sous-total : ${total.toLocaleString()} FCFA\n`
    if (customerInfo.fraisLivraison > 0) {
        message += `• Livraison  : ${customerInfo.fraisLivraison.toLocaleString()} FCFA\n`
    }
    message += `💰 *TOTAL FINAL : ${totalFinal.toLocaleString()} FCFA*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`
    message += `🚚 _Livraison estimée sous 24H_\n`
    message += `✨ _Merci pour votre confiance !_ ✨`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Get the WhatsApp number
 */
export function getWhatsAppNumber(): string {
    return WHATSAPP_NUMBER
}
