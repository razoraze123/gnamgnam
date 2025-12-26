import { Link } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import type { Client } from '../lib/supabase'

interface NavLink {
    path: string
    label: string
}

interface MobileMenuProps {
    isOpen: boolean
    navLinks: NavLink[]
    isActive: (path: string) => boolean
    onClose: () => void
    auth: {
        isLogged: boolean
        client: Client | null
        logout: () => void
        openLogin: () => void
    }
}

export default function MobileMenu({
    isOpen,
    navLinks,
    isActive,
    onClose,
    auth
}: MobileMenuProps) {
    if (!isOpen) return null

    return (
        <div className="md:hidden glass border-t border-royal/10 animate-[slide-down_0.3s_ease-out]">
            <nav className="flex flex-col p-4 space-y-2">
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={onClose}
                        className={`block px-4 py-3 rounded-xl font-medium transition-colors ${isActive(link.path)
                            ? 'bg-sage/10 text-sage'
                            : 'text-royal/70 hover:bg-sand-dark'
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}

                <MobileAccountSection
                    auth={auth}
                    onClose={onClose}
                />
            </nav>
        </div>
    )
}

interface MobileAccountSectionProps {
    auth: {
        isLogged: boolean
        client: Client | null
        logout: () => void
        openLogin: () => void
    }
    onClose: () => void
}

function MobileAccountSection({ auth, onClose }: MobileAccountSectionProps) {
    const handleLogout = () => {
        auth.logout()
        onClose()
    }

    const handleLogin = () => {
        auth.openLogin()
        onClose()
    }

    return (
        <div className="border-t border-royal/10 pt-2 mt-2">
            {auth.isLogged ? (
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-safran" />
                        <span className="font-medium text-royal">
                            {auth.client?.prenom || 'Mon compte'}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleLogin}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-safran/10 text-safran font-medium rounded-xl hover:bg-safran/20 transition-colors"
                >
                    <User className="w-5 h-5" />
                    Se connecter
                </button>
            )}
        </div>
    )
}
