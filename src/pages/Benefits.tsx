import { Link } from 'react-router-dom'
import {
    Sprout,
    ShieldCheck,
    Zap,
    Brain,
    Leaf,
    Apple,
    Milk,
    ShieldPlus,
} from 'lucide-react'

export default function Benefits() {
    const benefits = [
        {
            icon: <Sprout className="w-8 h-8" />,
            title: 'Céréales Complètes',
            description: 'Nos bouillies sont préparées à partir de céréales complètes locales, riches en fibres et nutriments essentiels pour le développement de votre bébé.',
            color: 'from-amber-400 to-orange-500',
        },
        {
            icon: <Milk className="w-8 h-8" />,
            title: 'Riche en Calcium',
            description: 'Fortifiées en calcium pour des os et des dents solides. Chaque portion apporte les nutriments nécessaires à une croissance saine.',
            color: 'from-blue-400 to-cyan-500',
        },
        {
            icon: <Apple className="w-8 h-8" />,
            title: 'Fruits Naturels',
            description: 'Saveurs naturelles de fruits frais sans sucres ajoutés. Le goût que les bébés adorent, approuvé par les parents.',
            color: 'from-yellow-400 to-green-500',
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Énergie Durable',
            description: 'Glucides complexes à libération lente pour une énergie constante tout au long de la journée. Parfait pour les petits explorateurs.',
            color: 'from-purple-400 to-pink-500',
        },
        {
            icon: <ShieldPlus className="w-8 h-8" />,
            title: 'Système Immunitaire',
            description: 'Enrichies en vitamines A, C et D pour renforcer les défenses naturelles de votre enfant et le protéger au quotidien.',
            color: 'from-green-400 to-emerald-500',
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: 'Développement Cérébral',
            description: 'Oméga-3 et fer pour soutenir le développement cognitif. Une nutrition intelligente pour les futures générations.',
            color: 'from-indigo-400 to-violet-500',
        },
    ]

    const ingredients = [
        { name: 'Mil', icon: <Sprout className="w-8 h-8 text-amber-600" />, desc: 'Source de fer et protéines' },
        { name: 'Maïs', icon: <Sprout className="w-8 h-8 text-yellow-600" />, desc: 'Énergie et fibres' },
        { name: 'Arachide', icon: <Sprout className="w-8 h-8 text-orange-600" />, desc: 'Protéines végétales' },
        { name: 'Soja', icon: <Sprout className="w-8 h-8 text-green-600" />, desc: 'Acides aminés essentiels' },
        { name: 'Banane', icon: <Apple className="w-8 h-8 text-yellow-500" />, desc: 'Potassium naturel' },
        { name: 'Moringa', icon: <Leaf className="w-8 h-8 text-emerald-600" />, desc: 'Super-aliment local' },
    ]

    return (
        <main className="pt-32 pb-16 min-h-screen bg-sand">
            {/* Hero */}
            <section className="bg-gradient-to-br from-sand via-sand-warm to-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 text-sage font-semibold rounded-full text-sm mb-6 animate-[fade-in_0.5s_ease-out]">
                        <ShieldCheck className="w-4 h-4" /> Nutrition Optimale
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-royal mb-6">
                        Les Bienfaits de nos
                        <span className="gradient-text"> Bouillies</span>
                    </h1>
                    <p className="text-lg text-royal/70 max-w-2xl mx-auto">
                        Chaque cuillère de Gnam Gnam Bouillie est pensée pour offrir le meilleur à votre enfant. Découvrez pourquoi les parents nous font confiance.
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-3xl bg-sand hover:bg-white hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-sage/5"
                            >
                                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-royal mb-3">{benefit.title}</h3>
                                <p className="text-royal/60 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ingredients */}
            <section className="py-20 bg-sand">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-sage font-semibold text-sm uppercase tracking-wider">Nos Ingrédients</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-royal mt-3">
                            Le meilleur de la nature
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {ingredients.map((ing, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group border-2 border-transparent hover:border-sage/10"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-sage/5 rounded-full blob group-hover:bg-sage/10 transition-colors" />
                                    <div className="relative z-10 scale-125 group-hover:scale-110 transition-transform">
                                        {ing.icon}
                                    </div>
                                </div>
                                <h4 className="font-bold text-royal mb-1">{ing.name}</h4>
                                <p className="text-sm text-royal/60">{ing.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Age Guide */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-sage font-semibold text-sm uppercase tracking-wider">Guide par Âge</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-royal mt-3">
                            Une bouillie pour chaque étape
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                age: 'Dès 6 mois',
                                title: 'Première Découverte',
                                desc: 'Texture fine et douce pour les premiers repas de diversification. Céréales simples et faciles à digérer.',
                                features: ['Sans gluten', 'Texture lisse', 'Goût neutre'],
                            },
                            {
                                age: 'Dès 8 mois',
                                title: 'Éveil des Saveurs',
                                desc: 'Introduction progressive de nouvelles saveurs avec des fruits et légumes. Texture légèrement plus consistante.',
                                features: ['Fruits naturels', 'Plus de fibres', 'Saveurs variées'],
                            },
                            {
                                age: 'Dès 12 mois',
                                title: 'Grande Autonomie',
                                desc: 'Formules complètes avec un équilibre optimal de nutriments pour accompagner leur croissance accélérée.',
                                features: ['Formule complète', 'Multi-céréales', 'Riche en fer'],
                            },
                        ].map((stage, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl bg-sand hover:bg-sand-dark transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    <span className="inline-block px-4 py-2 bg-royal text-white font-bold rounded-full text-sm">
                                        {stage.age}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-royal mb-2">{stage.title}</h3>
                                    <p className="text-royal/60 mb-4">{stage.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {stage.features.map((feat, i) => (
                                            <span key={i} className="px-3 py-1 bg-sage/10 text-sage text-sm font-medium rounded-full">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-sage to-sage-dark text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à nourrir votre bébé avec le meilleur ?
                    </h2>
                    <p className="text-white/80 mb-8">
                        Découvrez notre gamme complète de bouillies premium.
                    </p>
                    <Link
                        to="/boutique"
                        className="inline-block px-8 py-4 bg-white text-sage font-bold rounded-full hover:bg-sand transition-colors shadow-lg"
                    >
                        Voir la boutique
                    </Link>
                </div>
            </section>
        </main>
    )
}
