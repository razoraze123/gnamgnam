import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
    id: string
    nom: string
    prix: number
    description: string
    categorie_age: string
    image_url: string
    stock_disponible: number
    created_at: string
}

export interface Review {
    id: string
    nom: string
    note: number
    commentaire: string
    created_at: string
}

export interface Client {
    id: string
    telephone: string
    prenom: string | null
    nom: string | null
    quartier_prefere: string | null
    adresse_details: string | null
    created_at: string
    updated_at: string
}

export interface Commande {
    id: string
    client_id: string | null
    contenu: object
    total: number
    frais_livraison: number
    mode_livraison: 'livraison' | 'retrait'
    quartier: string | null
    adresse_details: string | null
    moyen_paiement: 'especes' | 'nita'
    statut: 'en_attente' | 'confirmee' | 'livree' | 'annulee'
    created_at: string
}
