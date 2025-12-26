import { useState } from 'react'
import { X, Phone, User, ArrowRight, Loader2 } from 'lucide-react'
import { useClient } from '../context/ClientContext'

interface PhoneLoginModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

export default function PhoneLoginModal({ isOpen, onClose, onSuccess }: PhoneLoginModalProps) {
    const { login, register } = useClient()
    const [step, setStep] = useState<'phone' | 'register'>('phone')
    const [telephone, setTelephone] = useState('')
    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    if (!isOpen) return null

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!telephone.trim() || telephone.length < 8) {
            setError('Numéro de téléphone invalide')
            return
        }

        setIsLoading(true)
        const client = await login(telephone)
        setIsLoading(false)

        if (client) {
            // Client found, login successful
            onSuccess?.()
            onClose()
        } else {
            // Client not found, show registration form
            setStep('register')
        }
    }

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!prenom.trim() || !nom.trim()) {
            setError('Veuillez remplir tous les champs')
            return
        }

        setIsLoading(true)
        const client = await register({ telephone, prenom, nom })
        setIsLoading(false)

        if (client) {
            onSuccess?.()
            onClose()
        } else {
            setError('Erreur lors de l\'inscription')
        }
    }

    const handleClose = () => {
        setStep('phone')
        setTelephone('')
        setPrenom('')
        setNom('')
        setError('')
        onClose()
    }

    return (
        <div className='fixed inset-0 z-[70] flex items-center justify-center p-4'>
            <div
                className='absolute inset-0 bg-black/60 backdrop-blur-sm'
                onClick={handleClose}
            />

            {/* Modal */}
            <div className='relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-[scale-in_0.2s_ease-out]'>
                <div className='relative bg-gradient-to-r from-safran to-safran-dark p-6 text-white'>
                    <button
                        onClick={handleClose}
                        className='absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors'
                    >
                        <X className='w-5 h-5' />
                    </button>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'>
                            {step === 'phone' ? (
                                <Phone className='w-6 h-6' />
                            ) : (
                                <User className='w-6 h-6' />
                            )}
                        </div>
                        <div>
                            <h2 className='text-xl font-bold'>
                                {step === 'phone' ? 'Connexion' : 'Inscription'}
                            </h2>
                            <p className='text-white/80 text-sm'>
                                {step === 'phone'
                                    ? 'Entrez votre numéro de téléphone'
                                    : 'Créez votre compte'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className='p-6'>
                    {step === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-royal/70 mb-2'>
                                    Numéro de téléphone
                                </label>
                                <div className='relative'>
                                    <Phone className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-royal/40' />
                                    <input
                                        type='tel'
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                        placeholder='90 12 34 56'
                                        className='w-full pl-12 pr-4 py-3 rounded-xl border-2 border-royal/10 bg-sand/50 focus:border-safran focus:outline-none transition-colors text-lg'
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className='text-red-500 text-sm'>{error}</p>
                            )}

                            <button
                                type='submit'
                                disabled={isLoading}
                                className='w-full py-3 bg-safran text-white font-bold rounded-xl hover:bg-safran-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50'
                            >
                                {isLoading ? (
                                    <Loader2 className='w-5 h-5 animate-spin' />
                                ) : (
                                    <>
                                        Continuer
                                        <ArrowRight className='w-5 h-5' />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className='space-y-4'>
                            <p className='text-sm text-royal/60 bg-sand/50 p-3 rounded-xl'>
                                Ce numéro n'est pas encore enregistré.
                                Créez votre compte pour sauvegarder vos informations.
                            </p>

                            <div>
                                <label className='block text-sm font-medium text-royal/70 mb-2'>
                                    Prénom
                                </label>
                                <input
                                    type='text'
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    placeholder='Votre prénom'
                                    className='w-full px-4 py-3 rounded-xl border-2 border-royal/10 bg-sand/50 focus:border-safran focus:outline-none transition-colors'
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-royal/70 mb-2'>
                                    Nom
                                </label>
                                <input
                                    type='text'
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    placeholder='Votre nom'
                                    className='w-full px-4 py-3 rounded-xl border-2 border-royal/10 bg-sand/50 focus:border-safran focus:outline-none transition-colors'
                                />
                            </div>

                            {error && (
                                <p className='text-red-500 text-sm'>{error}</p>
                            )}

                            <div className='flex gap-3'>
                                <button
                                    type='button'
                                    onClick={() => setStep('phone')}
                                    className='flex-1 py-3 border-2 border-royal/20 text-royal font-medium rounded-xl hover:bg-sand transition-colors'
                                >
                                    Retour
                                </button>
                                <button
                                    type='submit'
                                    disabled={isLoading}
                                    className='flex-1 py-3 bg-safran text-white font-bold rounded-xl hover:bg-safran-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50'
                                >
                                    {isLoading ? (
                                        <Loader2 className='w-5 h-5 animate-spin' />
                                    ) : (
                                        'Créer mon compte'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
