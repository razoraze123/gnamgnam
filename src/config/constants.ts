/**
 * Configuration centralisée pour Gnam Gnam
 * Ce fichier contient toutes les constantes métier de l'application
 */

// ============================================================================
// Livraison
// ============================================================================

export interface Quartier {
    nom: string
    frais: number
}

/**
 * Liste des quartiers avec leurs frais de livraison en FCFA
 */
export const QUARTIERS: Quartier[] = [
    { nom: 'Plateau', frais: 1000 },
    { nom: 'Koulouba', frais: 1000 },
    { nom: 'Yantala', frais: 1200 },
    { nom: 'Gamkallé', frais: 1200 },
    { nom: 'Boukoki', frais: 1000 },
    { nom: 'Talladjé', frais: 1300 },
    { nom: 'Lazaret', frais: 1300 },
    { nom: 'Saga', frais: 1500 },
    { nom: 'Niamey 2000', frais: 1400 },
    { nom: 'Francophonie', frais: 1500 },
]

/**
 * Frais de livraison par défaut si le quartier n'est pas trouvé
 */
export const DEFAULT_DELIVERY_FEE = 1500

// ============================================================================
// Timing
// ============================================================================

/**
 * Délai de livraison estimé en heures
 */
export const DELIVERY_TIME_HOURS = 24

/**
 * Durée d'affichage des notifications toast en millisecondes
 */
export const TOAST_DURATION_MS = 3000

// ============================================================================
// Stock
// ============================================================================

/**
 * Seuil en dessous duquel un produit est considéré en stock limité
 */
export const LOW_STOCK_THRESHOLD = 5

// ============================================================================
// Validation
// ============================================================================

/**
 * Longueur minimale d'un numéro de téléphone valide
 */
export const MIN_PHONE_LENGTH = 8

/**
 * Longueur maximale d'un numéro de téléphone valide
 */
export const MAX_PHONE_LENGTH = 15
