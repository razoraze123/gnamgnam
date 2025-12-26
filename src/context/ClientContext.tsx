import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Client } from '../lib/supabase'

interface ClientContextType {
    client: Client | null
    isLogged: boolean
    isLoading: boolean
    login: (telephone: string) => Promise<Client | null>
    register: (data: { telephone: string; prenom: string; nom: string }) => Promise<Client | null>
    updateClient: (data: Partial<Client>) => Promise<void>
    logout: () => void
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

const CLIENT_STORAGE_KEY = 'gnamgnam_client'

export function ClientProvider({ children }: { children: ReactNode }) {
    const [client, setClient] = useState<Client | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Load client from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(CLIENT_STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setClient(parsed)
            } catch (e) {
                console.error('Failed to parse saved client:', e)
                localStorage.removeItem(CLIENT_STORAGE_KEY)
            }
        }
        setIsLoading(false)
    }, [])

    // Persist client to localStorage
    useEffect(() => {
        if (client) {
            localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(client))
        } else {
            localStorage.removeItem(CLIENT_STORAGE_KEY)
        }
    }, [client])

    // Login by phone number (find existing client)
    const login = useCallback(async (telephone: string): Promise<Client | null> => {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('telephone', telephone)
                .single()

            if (error || !data) {
                return null // Client not found
            }

            setClient(data)
            return data
        } catch (err) {
            console.error('Login error:', err)
            return null
        }
    }, [])

    // Register new client
    const register = useCallback(async (
        data: { telephone: string; prenom: string; nom: string }
    ): Promise<Client | null> => {
        try {
            const { data: newClient, error } = await supabase
                .from('clients')
                .insert([{
                    telephone: data.telephone,
                    prenom: data.prenom,
                    nom: data.nom
                }])
                .select()
                .single()

            if (error) {
                console.error('Register error:', error)
                return null
            }

            setClient(newClient)
            return newClient
        } catch (err) {
            console.error('Register error:', err)
            return null
        }
    }, [])

    // Update client info
    const updateClient = useCallback(async (data: Partial<Client>) => {
        if (!client) return

        try {
            const { error } = await supabase
                .from('clients')
                .update(data)
                .eq('id', client.id)

            if (!error) {
                setClient(prev => prev ? { ...prev, ...data } : null)
            }
        } catch (err) {
            console.error('Update error:', err)
        }
    }, [client])

    // Logout
    const logout = useCallback(() => {
        setClient(null)
    }, [])

    return (
        <ClientContext.Provider
            value={{
                client,
                isLogged: !!client,
                isLoading,
                login,
                register,
                updateClient,
                logout
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}

export function useClient() {
    const context = useContext(ClientContext)
    if (!context) {
        throw new Error('useClient must be used within a ClientProvider')
    }
    return context
}
