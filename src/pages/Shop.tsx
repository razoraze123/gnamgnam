import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Product } from '../lib/supabase'
import ProductCard from '../components/ProductCard'
import ErrorState from '../components/ErrorState'
import { Search, X, PackageSearch, Truck } from 'lucide-react'

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const { data, error: supabaseError } = await supabase
                .from('products')
                .select('*')
                .order('nom')

            if (supabaseError) throw supabaseError
            if (data) setProducts(data)
        } catch (err) {
            console.error('Error fetching products:', err)
            setError('Impossible de charger les produits. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const categories = ['all', ...new Set(products.map(p => p.categorie_age).filter(Boolean))]

    // Combined filter: category + search
    const filteredProducts = products.filter(p => {
        const matchesCategory = filter === 'all' || p.categorie_age === filter
        const matchesSearch = searchQuery === '' ||
            p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <main className="pt-32 pb-16 min-h-screen bg-sand">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-sage font-semibold text-sm uppercase tracking-wider">Notre catalogue</span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-royal mt-3 mb-4">
                        La Boutique
                    </h1>
                    <p className="text-royal/60 max-w-2xl mx-auto">
                        Découvrez notre gamme complète de bouillies premium, soigneusement préparées pour accompagner chaque étape de croissance de votre bébé.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-royal/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher une bouillie..."
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-royal/10 focus:border-sage focus:outline-none transition-colors shadow-sm"
                            aria-label="Rechercher un produit"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-royal/40 hover:text-royal transition-colors"
                                aria-label="Effacer la recherche"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-full font-medium transition-all ${filter === cat
                                    ? 'bg-sage text-white shadow-lg'
                                    : 'bg-white text-royal/70 hover:bg-royal/5'
                                    }`}
                            >
                                {cat === 'all' ? 'Tous les produits' : cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Products Grid */}
                {error ? (
                    <ErrorState
                        title="Erreur de chargement"
                        message={error}
                        onRetry={fetchProducts}
                    />
                ) : loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                                <div className="aspect-square bg-sand-dark rounded-xl mb-4" />
                                <div className="h-4 bg-sand-dark rounded w-3/4 mb-2" />
                                <div className="h-4 bg-sand-dark rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-royal/10">
                        <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl shadow-sm flex items-center justify-center p-4">
                            <PackageSearch className="w-12 h-12 text-sage" />
                        </div>
                        <h3 className="text-xl font-bold text-royal mb-2">Catalogue en préparation</h3>
                        <p className="text-royal/60">Nos délicieuses bouillies arrivent bientôt...</p>
                    </div>
                )}

                {/* Info Banner */}
                <div className="mt-16 bg-gradient-to-r from-royal to-royal-dark rounded-3xl p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Truck className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-3">
                            <Truck className="w-8 h-8 text-sage" />
                            Livraison dans toute la ville
                        </h3>
                        <p className="text-white/80 max-w-xl mx-auto">
                            Commandez via WhatsApp et recevez vos bouillies fraîches. Paiement à la livraison accepté.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
