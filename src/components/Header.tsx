import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu as MenuIcon, X, User, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useClient } from '../context/ClientContext'
import PhoneLoginModal from './PhoneLoginModal'
import CartSidebar from './CartSidebar'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
    { path: '/', label: 'Accueil' },
    { path: '/boutique', label: 'Boutique' },
    { path: '/bienfaits', label: 'Bienfaits' },
    { path: '/avis', label: 'Avis' },
    { path: '/contact', label: 'Contact' },
]

const LOGO_SIZE_SM = 'w-20 h-20'
const LOGO_SIZE_LG = 'md:w-24 md:h-24'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart()
    const { client, isLogged, logout } = useClient()
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <>
            <header className='fixed top-0 left-0 right-0 z-50 glass border-b border-royal/10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-24 md:h-28'>
                        <Logo />
                        <DesktopNav navLinks={NAV_LINKS} isActive={isActive} />
                        <HeaderActions
                            auth={{
                                isLogged,
                                client,
                                logout,
                                openLogin: () => setIsLoginOpen(true),
                            }}
                            cart={{
                                openCart: () => setIsCartOpen(true),
                                itemCount,
                            }}
                            menu={{
                                isMenuOpen,
                                toggleMenu: () => setIsMenuOpen(!isMenuOpen),
                            }}
                        />
                    </div>
                </div>

                <MobileMenu
                    isOpen={isMenuOpen}
                    navLinks={NAV_LINKS}
                    isActive={isActive}
                    onClose={() => setIsMenuOpen(false)}
                    auth={{
                        isLogged,
                        client,
                        logout,
                        openLogin: () => setIsLoginOpen(true),
                    }}
                />
            </header>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={{ items, total }}
                actions={{ updateQuantity, removeFromCart, clearCart }}
            />

            <PhoneLoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </>
    )
}

function Logo() {
    return (
        <Link to='/' className='flex items-center gap-2 group'>
            <img
                src='/logo.png'
                alt='Gnam Gnam Logo'
                className={`${LOGO_SIZE_SM} ${LOGO_SIZE_LG} object-contain mix-blend-multiply transition-transform group-hover:scale-105`}
            />
        </Link>
    )
}

interface DesktopNavProps {
    navLinks: typeof NAV_LINKS
    isActive: (path: string) => boolean
}

function DesktopNav({ navLinks, isActive }: DesktopNavProps) {
    return (
        <nav className='hidden md:flex items-center gap-8'>
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
                        <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-sage rounded-full' />
                    )}
                </Link>
            ))}
        </nav>
    )
}

interface HeaderActionsProps {
    auth: {
        isLogged: boolean
        client: { prenom?: string | null } | null
        logout: () => void
        openLogin: () => void
    }
    cart: {
        openCart: () => void
        itemCount: number
    }
    menu: {
        isMenuOpen: boolean
        toggleMenu: () => void
    }
}

function HeaderActions({ auth, cart, menu }: HeaderActionsProps) {
    return (
        <div className='flex items-center gap-2'>
            <UserButton
                isLogged={auth.isLogged}
                clientName={auth.client?.prenom}
                logout={auth.logout}
                openLogin={auth.openLogin}
            />
            <CartButton onClick={cart.openCart} itemCount={cart.itemCount} />
            <MobileMenuButton isOpen={menu.isMenuOpen} onClick={menu.toggleMenu} />
        </div>
    )
}

interface UserButtonProps {
    isLogged: boolean
    clientName?: string | null
    logout: () => void
    openLogin: () => void
}

function UserButton({ isLogged, clientName, logout, openLogin }: UserButtonProps) {
    if (isLogged) {
        return (
            <div className='hidden sm:flex items-center gap-2'>
                <span className='text-sm font-medium text-royal/70'>
                    {clientName || 'Compte'}
                </span>
                <button
                    onClick={logout}
                    className='p-2 text-royal/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all'
                    aria-label='Se déconnecter'
                >
                    <LogOut className='w-5 h-5' />
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={openLogin}
            className='hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-royal/70 hover:text-royal hover:bg-sand rounded-xl transition-all'
        >
            <User className='w-5 h-5' />
            <span>Connexion</span>
        </button>
    )
}

interface CartButtonProps {
    onClick: () => void
    itemCount: number
}

function CartButton({ onClick, itemCount }: CartButtonProps) {
    return (
        <button
            onClick={onClick}
            className='relative p-3 text-royal/70 hover:text-royal hover:bg-sand rounded-xl transition-all'
            aria-label='Ouvrir le panier'
        >
            <ShoppingBag className='w-6 h-6' />
            {itemCount > 0 && (
                <span className='absolute top-1 right-1 w-5 h-5 bg-safran text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-[scale-in_0.2s_ease-out]'>
                    {itemCount}
                </span>
            )}
        </button>
    )
}

interface MobileMenuButtonProps {
    isOpen: boolean
    onClick: () => void
}

function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className='md:hidden p-3 text-royal/70 hover:text-royal hover:bg-sand rounded-xl transition-all'
            aria-label='Menu'
        >
            {isOpen ? <X className='w-6 h-6' /> : <MenuIcon className='w-6 h-6' />}
        </button>
    )
}
