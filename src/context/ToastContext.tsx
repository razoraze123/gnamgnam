import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

interface Toast {
    id: string
    message: string
    type: 'success' | 'error' | 'info'
}

interface ToastContextType {
    toasts: Toast[]
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now().toString()
        setToasts(current => [...current, { id, message, type }])

        setTimeout(() => {
            setToasts(current => current.filter(t => t.id !== id))
        }, 3000)
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts(current => current.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
