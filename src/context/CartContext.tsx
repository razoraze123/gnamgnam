import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../lib/supabase'

export interface CartItem {
    product: Product
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'gnamgnam_cart'

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem(CART_STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }, [items])

    const addToCart = (product: Product) => {
        setItems(current => {
            const existing = current.find(item => item.product.id === product.id)
            if (existing) {
                return current.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...current, { product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: string) => {
        setItems(current => current.filter(item => item.product.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setItems(current =>
            current.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const total = items.reduce(
        (sum, item) => sum + item.product.prix * item.quantity,
        0
    )

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
