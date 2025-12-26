import type { ReactNode } from 'react'

interface IngredientCardProps {
    name: string
    icon: ReactNode
    desc: string
}

export default function IngredientCard({ name, icon, desc }: IngredientCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 mx-auto mb-4 bg-sand-dark rounded-full flex items-center justify-center">
                {icon}
            </div>
            <h4 className="font-bold text-royal mb-1">{name}</h4>
            <p className="text-royal/60 text-sm">{desc}</p>
        </div>
    )
}
