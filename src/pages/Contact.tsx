import { useState } from 'react'
import { MessageCircle, Clock, ChevronDown, Send, Phone, Mail, HelpCircle } from 'lucide-react'
import { useToast } from '../context/ToastContext'

export default function Contact() {
    const { showToast } = useToast()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '33611309743'
        let message = `*CONTACT - GNAM GNAM BOUILLIE*\n\n`
        message += `Nom: ${formData.name}\n`
        message += `Email: ${formData.email}\n`
        message += `Sujet: ${formData.subject}\n\n`
        message += `Message:\n${formData.message}`

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')

        showToast('Redirection vers WhatsApp...', 'info')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <main className="pt-32 pb-16 min-h-screen bg-sand">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 text-sage font-semibold rounded-full text-sm mb-6 animate-[fade-in_0.5s_ease-out]">
                        <Mail className="w-4 h-4" /> Nous Contacter
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-royal mt-3 mb-4">
                        Restons en <span className="gradient-text">Contact</span>
                    </h1>
                    <p className="text-royal/60 max-w-2xl mx-auto text-lg">
                        Une question, une suggestion ou simplement envie de nous dire bonjour ? N'hésitez pas à nous écrire !
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-transparent hover:border-sage/5 transition-all">
                        <h2 className="text-2xl font-bold text-royal mb-8 flex items-center gap-3">
                            <Send className="w-6 h-6 text-sage" />
                            Envoyez-nous un message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-royal mb-2">
                                        Votre nom
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-royal/5 focus:border-sage focus:outline-none transition-all bg-sand/30"
                                        placeholder="Marie Dupont"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-royal mb-2">
                                        Votre email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-royal/5 focus:border-sage focus:outline-none transition-all bg-sand/30"
                                        placeholder="marie@exemple.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-royal mb-2">
                                    Sujet
                                </label>
                                <div className="relative">
                                    <select
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={e => setFormData(d => ({ ...d, subject: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-royal/5 focus:border-sage focus:outline-none transition-all bg-sand/30 appearance-none"
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="Commande">Question sur une commande</option>
                                        <option value="Produit">Information produit</option>
                                        <option value="Partenariat">Partenariat</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-royal/40 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-royal mb-2">
                                    Votre message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-royal/5 focus:border-sage focus:outline-none transition-all bg-sand/30 resize-none"
                                    placeholder="Écrivez votre message ici..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-royal hover:bg-royal-dark text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Envoyer via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Direct WhatsApp */}
                        <div className="bg-gradient-to-br from-sage to-sage-dark rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                            <MessageCircle className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">WhatsApp Direct</h3>
                                        <p className="text-white/80">Réponse rapide garantie</p>
                                    </div>
                                </div>
                                <a
                                    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '33611309743'}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 bg-white text-sage font-bold rounded-xl text-center hover:bg-sand transition-colors shadow-lg"
                                >
                                    Discuter maintenant
                                </a>
                            </div>
                        </div>

                        {/* FAQ Preview */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-royal mb-6 flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-sage" />
                                Questions Fréquentes
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        q: 'Comment passer commande ?',
                                        a: 'Ajoutez vos produits au panier puis validez via WhatsApp. Simple et rapide !',
                                    },
                                    {
                                        q: 'Quels sont les délais de livraison ?',
                                        a: 'Livraison sous 24-48h selon votre localisation.',
                                    },
                                ].map((faq, index) => (
                                    <details key={index} className="group">
                                        <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-royal/5">
                                            <span className="font-semibold text-royal/80">{faq.q}</span>
                                            <ChevronDown className="w-5 h-5 text-royal/40 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <p className="text-royal/60 py-3 text-sm leading-relaxed">{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-royal rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-sage" />
                                Horaires de réponse
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { day: 'Lundi - Vendredi', hours: '8h - 20h' },
                                    { day: 'Samedi', hours: '9h - 18h' },
                                    { day: 'Dimanche', hours: '10h - 16h' },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                        <span className="text-white/70">{item.day}</span>
                                        <span className="font-bold">{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
