import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useClient } from '../context/ClientContext'
import { supabase } from '../lib/supabase'
import { sanitizeInput, isValidPhone } from '../utils/security'
import { generateOrderWhatsAppUrl } from '../utils/whatsapp'
import QuartierSelector from '../components/QuartierSelector'
import OrderSummary from '../components/OrderSummary'

// Liste des quartiers avec frais de livraison
const QUARTIERS = [
    { nom: 'Plateau', frais: 1000 },
    { nom: 'Koulouba', frais: 1000 },
    { nom: 'Yantala', frais: 1200 },
    { nom: 'Gamkallé', frais: 1200 },
    { nom: 'Boukoki', frais: 1000 },
    { nom: 'Talladjé', frais: 1300 },
    { nom: 'Lazaret', frais: 1300 },
    { nom: 'Saga', frais: 1500 },
    { nom: 'Niamey 2000', frais: 1400 },
    { nom: 'Francophonie', frais: 1500 },
]

interface CheckoutFormData {
    prenom: string
    nom: string
    telephone: string
    modeLivraison: 'livraison' | 'retrait'
    quartier: string
    descriptionLocalisation: string
    moyenPaiement: 'especes' | 'nita'
}

export default function Checkout() {
    const { items, total, clearCart } = useCart()
    const { client, isLogged, updateClient } = useClient()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<CheckoutFormData>({
        prenom: '',
        nom: '',
        telephone: '',
        modeLivraison: 'livraison',
        quartier: '',
        descriptionLocalisation: '',
        moyenPaiement: 'especes'
    })

    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})

    // Auto-fill form if client is logged in
    useEffect(() => {
        if (isLogged && client) {
            setFormData(prev => ({
                ...prev,
                prenom: client.prenom || prev.prenom,
                nom: client.nom || prev.nom,
                telephone: client.telephone || prev.telephone,
                quartier: client.quartier_prefere || prev.quartier,
                descriptionLocalisation: client.adresse_details || prev.descriptionLocalisation,
            }))
        }
    }, [isLogged, client])

    // Get delivery fee based on selected quartier
    const getDeliveryFee = (): number => {
        if (formData.modeLivraison !== 'livraison' || !formData.quartier) {
            return 0
        }
        const selectedQuartier = QUARTIERS.find(q => q.nom === formData.quartier)
        return selectedQuartier?.frais || 0
    }
    const fraisLivraison = getDeliveryFee()

    const totalFinal = total + fraisLivraison

    // Redirect to shop if cart is empty
    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-sand pt-32 pb-12">
                <div className="max-w-4xl mx-auto px-4 text-center py-20">
                    <div className="w-24 h-24 mx-auto mb-6 bg-sand-dark rounded-full flex items-center justify-center">
                        <span className="text-5xl">🛒</span>
                    </div>
                    <h1 className="text-2xl font-bold text-royal mb-4">Votre panier est vide</h1>
                    <p className="text-royal/60 mb-8">Ajoutez des produits avant de passer commande</p>
                    <Link
                        to="/boutique"
                        className="inline-block px-8 py-4 btn-primary text-white font-bold rounded-xl"
                    >
                        Voir la boutique
                    </Link>
                </div>
            </main>
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name as keyof CheckoutFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {}

        if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis'
        if (!formData.nom.trim()) newErrors.nom = 'Nom requis'
        if (!formData.telephone.trim()) {
            newErrors.telephone = 'Numéro requis'
        } else if (!isValidPhone(formData.telephone)) {
            newErrors.telephone = 'Numéro invalide'
        }

        // Validate quartier if livraison is selected
        if (formData.modeLivraison === 'livraison' && !formData.quartier) {
            newErrors.quartier = 'Veuillez sélectionner un quartier'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        // Save order to Supabase if client is logged in
        if (isLogged && client) {
            try {
                // Save the order
                await supabase.from('commandes').insert([{
                    client_id: client.id,
                    contenu: items.map(item => ({
                        id: item.product.id,
                        nom: item.product.nom,
                        prix: item.product.prix,
                        quantite: item.quantity
                    })),
                    total: total,
                    frais_livraison: fraisLivraison,
                    mode_livraison: formData.modeLivraison,
                    quartier: formData.quartier,
                    adresse_details: sanitizeInput(formData.descriptionLocalisation),
                    moyen_paiement: formData.moyenPaiement
                }])

                // Update client preferences
                await updateClient({
                    quartier_prefere: formData.quartier,
                    adresse_details: sanitizeInput(formData.descriptionLocalisation)
                })
            } catch (err) {
                console.error('Error saving order:', err)
            }
        }

        // Generate WhatsApp URL using utility
        const whatsappUrl = generateOrderWhatsAppUrl({
            items,
            total,
            customerInfo: {
                prenom: sanitizeInput(formData.prenom),
                nom: sanitizeInput(formData.nom),
                telephone: sanitizeInput(formData.telephone),
                modeLivraison: formData.modeLivraison,
                quartier: formData.quartier,
                descriptionLocalisation: sanitizeInput(formData.descriptionLocalisation),
                moyenPaiement: formData.moyenPaiement,
                fraisLivraison
            }
        })

        // Open WhatsApp with the order
        window.open(whatsappUrl, '_blank')

        // Clear cart after sending
        clearCart()

        // Redirect to confirmation page
        navigate('/confirmation')
    }

    return (
        <main className="min-h-screen bg-sand pt-32 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-royal mb-8 text-center">
                    Finaliser ma commande
                </h1>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">
                            <PersonalInfoSection
                                formData={formData}
                                errors={errors}
                                onChange={handleChange}
                            />

                            <DeliveryModeSection
                                formData={formData}
                                errors={errors}
                                onChange={handleChange}
                                setFormData={setFormData}
                            />

                            <PaymentSection
                                formData={formData}
                                onChange={handleChange}
                            />

                            <SubmitButton />
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <OrderSummary
                            items={items}
                            pricing={{
                                total,
                                fraisLivraison,
                                totalFinal
                            }}
                            delivery={{
                                modeLivraison: formData.modeLivraison,
                                quartier: formData.quartier
                            }}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

// ============================================================================
// Sub-components for form sections
// ============================================================================

interface PersonalInfoSectionProps {
    formData: CheckoutFormData
    errors: Partial<Record<keyof CheckoutFormData, string>>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function PersonalInfoSection({ formData, errors, onChange }: PersonalInfoSectionProps) {
    return (
        <div>
            <h2 className="text-lg font-bold text-royal mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center text-sage text-sm">1</span>
                Vos informations
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-royal/70 mb-2">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={onChange}
                        placeholder="Votre prénom"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-sage ${errors.prenom ? 'border-red-400 bg-red-50' : 'border-royal/10 bg-sand/50'}`}
                    />
                    {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-royal/70 mb-2">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={onChange}
                        placeholder="Votre nom"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-sage ${errors.nom ? 'border-red-400 bg-red-50' : 'border-royal/10 bg-sand/50'}`}
                    />
                    {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-royal/70 mb-2">Numéro de téléphone</label>
                <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={onChange}
                    placeholder="Ex: 90123456"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:border-sage ${errors.telephone ? 'border-red-400 bg-red-50' : 'border-royal/10 bg-sand/50'}`}
                />
                {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
            </div>
        </div>
    )
}

interface DeliveryModeSectionProps {
    formData: CheckoutFormData
    errors: Partial<Record<keyof CheckoutFormData, string>>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>
}

function DeliveryModeSection({ formData, errors, onChange, setFormData }: DeliveryModeSectionProps) {
    return (
        <div>
            <h2 className="text-lg font-bold text-royal mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center text-sage text-sm">2</span>
                Mode de livraison
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.modeLivraison === 'livraison' ? 'border-sage bg-sage/5' : 'border-royal/10 hover:border-royal/30'}`}>
                    <input
                        type="radio"
                        name="modeLivraison"
                        value="livraison"
                        checked={formData.modeLivraison === 'livraison'}
                        onChange={onChange}
                        className="w-5 h-5 text-sage"
                    />
                    <div>
                        <span className="text-2xl">🚚</span>
                        <p className="font-semibold text-royal">Livraison à domicile</p>
                    </div>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.modeLivraison === 'retrait' ? 'border-sage bg-sage/5' : 'border-royal/10 hover:border-royal/30'}`}>
                    <input
                        type="radio"
                        name="modeLivraison"
                        value="retrait"
                        checked={formData.modeLivraison === 'retrait'}
                        onChange={onChange}
                        className="w-5 h-5 text-sage"
                    />
                    <div>
                        <span className="text-2xl">🏪</span>
                        <p className="font-semibold text-royal">Retrait en boutique</p>
                    </div>
                </label>
            </div>

            {formData.modeLivraison === 'livraison' && (
                <QuartierSelector
                    location={{
                        quartiers: QUARTIERS,
                        selectedQuartier: formData.quartier,
                        description: formData.descriptionLocalisation
                    }}
                    actions={{
                        onSelect: (val) => setFormData(prev => ({ ...prev, quartier: val })),
                        onDescriptionChange: (val) => setFormData(prev => ({ ...prev, descriptionLocalisation: val }))
                    }}
                    error={errors.quartier}
                />
            )}
        </div>
    )
}

interface PaymentSectionProps {
    formData: CheckoutFormData
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function PaymentSection({ formData, onChange }: PaymentSectionProps) {
    return (
        <div>
            <h2 className="text-lg font-bold text-royal mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center text-sage text-sm">3</span>
                Moyen de paiement
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.moyenPaiement === 'especes' ? 'border-sage bg-sage/5' : 'border-royal/10 hover:border-royal/30'}`}>
                    <input
                        type="radio"
                        name="moyenPaiement"
                        value="especes"
                        checked={formData.moyenPaiement === 'especes'}
                        onChange={onChange}
                        className="w-5 h-5 text-sage"
                    />
                    <div>
                        <span className="text-2xl">💵</span>
                        <p className="font-semibold text-royal">Espèces</p>
                        <p className="text-xs text-royal/50">Paiement à la livraison/remise</p>
                    </div>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.moyenPaiement === 'nita' ? 'border-sage bg-sage/5' : 'border-royal/10 hover:border-royal/30'}`}>
                    <input
                        type="radio"
                        name="moyenPaiement"
                        value="nita"
                        checked={formData.moyenPaiement === 'nita'}
                        onChange={onChange}
                        className="w-5 h-5 text-sage"
                    />
                    <div>
                        <span className="text-2xl">📱</span>
                        <p className="font-semibold text-royal">Nita</p>
                        <p className="text-xs text-royal/50">Paiement mobile</p>
                    </div>
                </label>
            </div>
        </div>
    )
}

function SubmitButton() {
    return (
        <button
            type="submit"
            className="group relative w-full py-5 bg-gradient-to-r from-safran via-safran-dark to-safran bg-[length:200%_100%] text-white text-lg font-bold rounded-2xl hover:bg-[position:100%_0] transition-all duration-500 shadow-xl shadow-safran/30 hover:shadow-2xl hover:shadow-safran/40 active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
        >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="relative z-10">Commander via WhatsApp</span>
        </button>
    )
}
