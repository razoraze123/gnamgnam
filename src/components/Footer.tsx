import { MessageCircle, Heart, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-royal text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-white p-2 rounded-2xl shadow-xl">
                                <img
                                    src="/logo.png"
                                    alt="Gnam Gnam Logo"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                        </div>
                        <p className="text-white/70 max-w-md leading-relaxed text-lg">
                            Une nutrition infantile de qualité premium, élaborée avec amour et des ingrédients naturels pour accompagner la croissance de votre bébé.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-xl mb-6">Navigation</h4>
                        <ul className="space-y-3 text-white/70">
                            <li><a href="/" className="hover:text-sage-light transition-colors flex items-center gap-2">Accueil</a></li>
                            <li><a href="/boutique" className="hover:text-sage-light transition-colors flex items-center gap-2">Boutique</a></li>
                            <li><a href="/bienfaits" className="hover:text-sage-light transition-colors flex items-center gap-2">Bienfaits</a></li>
                            <li><a href="/avis" className="hover:text-sage-light transition-colors flex items-center gap-2">Avis Clients</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-xl mb-6">Contact</h4>
                        <ul className="space-y-4 text-white/70">
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-sage transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <span>WhatsApp</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-sage transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <a href="/contact" className="hover:text-white transition-colors">
                                    Contactez-nous
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/60 text-sm">
                        © 2024 Gnam Gnam Bouillie. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                        <span>Fait avec</span>
                        <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
                        <span>pour les bébés</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
