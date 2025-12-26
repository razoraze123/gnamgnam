import type { ReactNode } from 'react'

interface BenefitCardProps {
    icon: ReactNode
    title: string
    description: string
    color: string
}

export default function BenefitCard({ icon, title, description, color }: BenefitCardProps) {
    return (
        <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-royal mb-3">{title}</h3>
            <p className="text-royal/60 leading-relaxed">{description}</p>
        </div>
    )
}
