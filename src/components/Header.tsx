import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu as MenuIcon, X, User, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useClient } from '../context/ClientContext'
import PhoneLoginModal from './PhoneLoginModal'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart()
    const { client, isLogged, logout } = useClient()
    const location = useLocation()

    const navLinks = [
        { path: '/', label: 'Accueil' },
        { path: '/boutique', label: 'Boutique' },
        { path: '/bienfaits', label: 'Bienfaits' },
        { path: '/avis', label: 'Avis' },
        { path: '/contact', label: 'Contact' },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-royal/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24 md:h-28">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/logo.png"
                                alt="Gnam Gnam Logo"
                                className="w-20 h-20 md:w-24 md:h-24 object-contain mix-blend-multiply transition-transform group-hover:scale-105"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors relative ${isActive(link.path)
                                        ? 'text-sage'
                                        : 'text-royal/70 hover:text-royal'
                                        }`}
                                >
                                    {link.label}
                                    {isActive(link.path) && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sage rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* User & Cart Buttons */}
                        <div className="flex items-center gap-2">
                            {/* User Button */}
                            {isLogged ? (
                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="text-sm font-medium text-royal/70">
                                        {client?.prenom || 'Compte'}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="p-2 text-royal/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        aria-label="Se déconnecter"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-royal/70 hover:text-royal hover:bg-sand rounded-xl transition-all"
                                >
                                    <User className="w-5 h-5" />
                                    <span>Connexion</span>
                                </button>
                            )}

                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-3 text-royal/70 hover:text-royal hover:bg-sand rounded-xl transition-all"
                                aria-label="Ouvrir le panier"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {itemCount > 0 && (
                                    <span className="absolute top-1 right-1 w-5 h-5 bg-safran text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-[scale-in_0.2s_ease-out]">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-3 text-royal/70 hover:text-royal hover:bg-sand rounded-xl transition-all"
                                aria-label="Menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden glass border-t border-royal/10 animate-[slide-down_0.3s_ease-out]">
                        <nav className="flex flex-col p-4 space-y-2">
                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${isActive(link.path)
                                        ? 'bg-sage/10 text-sage'
                                        : 'text-royal/70 hover:bg-sand-dark'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile Login/Account Button */}
                            <div className="border-t border-royal/10 pt-2 mt-2">
                                {isLogged ? (
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5 text-safran" />
                                            <span className="font-medium text-royal">{client?.prenom || 'Mon compte'}</span>
                                        </div>
                                        <button
                                            onClick={() => { logout(); setIsMenuOpen(false); }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 bg-safran/10 text-safran font-medium rounded-xl hover:bg-safran/20 transition-colors"
                                    >
                                        <User className="w-5 h-5" />
                                        Se connecter
                                    </button>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Cart Sidebar */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[60]">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsCartOpen(false)}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-[slide-left_0.3s_ease-out]">
                        {/* Cart Header */}
                        <div className="flex items-center justify-between p-6 border-b border-royal/10">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-sage" />
                                <h2 className="text-xl font-bold text-royal">Votre Panier</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 text-royal/40 hover:text-royal hover:bg-sand rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-sand-dark rounded-full flex items-center justify-center">
                                        <span className="text-4xl">🥣</span>
                                    </div>
                                    <p className="text-royal/60">Votre panier est vide</p>
                                    <Link
                                        to="/boutique"
                                        onClick={() => setIsCartOpen(false)}
                                        className="inline-block mt-4 px-6 py-2 bg-sage text-white rounded-full font-medium hover:bg-sage-dark transition-colors"
                                    >
                                        Voir la boutique
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.product.id} className="flex gap-4 p-3 bg-sand rounded-xl">
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
                                                        disabled={item.quantity <= 1}
                                                        className={`w-8 h-8 rounded-full bg-white border border-royal/20 text-royal transition-colors ${item.quantity <= 1
                                                            ? 'opacity-30 cursor-not-allowed'
                                                            : 'hover:bg-royal hover:text-white'
                                                            }`}
                                                        aria-label={`Réduire la quantité de ${item.product.nom}`}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full bg-white border border-royal/20 text-royal hover:bg-royal hover:text-white transition-colors"
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
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cart Footer */}
                        {items.length > 0 && (
                            <div className="p-4 border-t border-royal/10 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-royal/60">Total</span>
                                    <span className="text-2xl font-bold text-royal">{total.toLocaleString()} FCFA</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={() => setIsCartOpen(false)}
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
                        )}
                    </div>
                </div>
            )}

            {/* Phone Login Modal */}
            <PhoneLoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </>
    )
}
