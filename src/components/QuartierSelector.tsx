import { MapPin } from 'lucide-react'

interface Quartier {
    nom: string
    frais: number
}

interface QuartierSelectorProps {
    quartiers: Quartier[]
    selectedQuartier: string
    onSelect: (quartier: string) => void
    descriptionLocalisation: string
    onDescriptionChange: (value: string) => void
    error?: string
}

export default function QuartierSelector({
    quartiers,
    selectedQuartier,
    onSelect,
    descriptionLocalisation,
    onDescriptionChange,
    error
}: QuartierSelectorProps) {
    return (
        <div className="mt-6 p-5 bg-gradient-to-br from-sand to-sand-warm rounded-2xl border border-sand-dark">
            <Header />

            <QuartierChips
                quartiers={quartiers}
                selectedQuartier={selectedQuartier}
                onSelect={onSelect}
            />

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <LocationDescription
                value={descriptionLocalisation}
                onChange={onDescriptionChange}
            />
        </div>
    )
}

function Header() {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-safran/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-safran" />
            </div>
            <span className="font-semibold text-royal">Où livrer ?</span>
        </div>
    )
}

interface QuartierChipsProps {
    quartiers: Quartier[]
    selectedQuartier: string
    onSelect: (quartier: string) => void
}

function QuartierChips({ quartiers, selectedQuartier, onSelect }: QuartierChipsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {quartiers.map(quartier => (
                <QuartierChip
                    key={quartier.nom}
                    quartier={quartier}
                    isSelected={selectedQuartier === quartier.nom}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}

interface QuartierChipProps {
    quartier: Quartier
    isSelected: boolean
    onSelect: (quartier: string) => void
}

function QuartierChip({ quartier, isSelected, onSelect }: QuartierChipProps) {
    const baseClasses = 'group relative px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-200'
    const selectedClasses = 'bg-safran text-white shadow-lg shadow-safran/30 scale-105'
    const unselectedClasses = 'bg-white text-royal/70 hover:bg-safran/10 hover:text-safran border border-royal/10'

    const priceBaseClasses = 'text-xs px-1.5 py-0.5 rounded-full'
    const priceSelectedClasses = 'bg-white/20 text-white'
    const priceUnselectedClasses = 'bg-sage/10 text-sage'

    return (
        <button
            type="button"
            onClick={() => onSelect(quartier.nom)}
            className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
        >
            <span className="flex items-center gap-2">
                {quartier.nom}
                <span className={`${priceBaseClasses} ${isSelected ? priceSelectedClasses : priceUnselectedClasses}`}>
                    {quartier.frais.toLocaleString()}
                </span>
            </span>
        </button>
    )
}

interface LocationDescriptionProps {
    value: string
    onChange: (value: string) => void
}

function LocationDescription({ value, onChange }: LocationDescriptionProps) {
    return (
        <div className="mt-4">
            <label className="block text-sm font-medium text-royal/70 mb-2">
                Précisez votre localisation (optionnel)
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ex: Près de la pharmacie centrale, maison bleue après le carrefour..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border-2 border-royal/10 bg-white transition-colors focus:outline-none focus:border-safran resize-none text-sm"
            />
        </div>
    )
}
