import { Target, Eye, Users, Lightbulb, Recycle, Heart } from 'lucide-react';

export default function About() {
    const values = [
        {
            icon: Recycle,
            title: "Sustentabilidade",
            description: "Produção consciente e responsável com o meio ambiente"
        },
        {
            icon: Lightbulb,
            title: "Inovação",
            description: "Soluções tecnológicas avançadas e criativas"
        },
        {
            icon: Users,
            title: "Comunidade",
            description: "Foco no desenvolvimento regional e coletivo"
        }
    ];

    return (
        <section 
            id="about" 
            className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-28 relative overflow-hidden"
            aria-labelledby="about-title"
        >
            <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-200 rounded-full opacity-5 blur-3xl translate-x-1/3 translate-y-1/3"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 lg:mb-20">
                    <div className="inline-flex flex-col items-center mb-6">
                        <h2 
                            id="about-title"
                            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
                        >
                            Sobre o <span className="text-red-500">Projeto</span>
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full mb-2"></div>
                            <div className="w-16 h-1 bg-red-300 rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Conheça nossa missão, visão e valores que orientam nosso trabalho 
                        em tecnologia e inovação
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16 lg:mb-20">
                    <div className="group relative bg-white rounded-3xl p-8 shadow-lg  transition-all duration-500 border border-gray-100  h-full">
                        <div className="absolute top-0 left-8 -translate-y-1/2">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center transition-transform duration-300">
                                <Target size={28} className="text-white" />
                            </div>
                        </div>
                        <div className="pt-6">
                            <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-900 mt-4">
                                Nossa <span className="text-red-500">Missão</span>
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Este projeto tem como objetivo a automação e impressão 3D,
                                integrando tecnologia com produção sustentável. As impressões
                                são realizadas na <span className="font-semibold text-gray-900 bg-red-50 px-2 py-1 rounded-lg">UEMS Nova Andradina</span>,
                                com foco em inovação e soluções práticas para a comunidade
                                acadêmica e regional.
                            </p>
                        </div>
                    </div>

                    <div className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-8 shadow-lg transition-all duration-500 border border-gray-700  h-full">
                        <div className="absolute top-0 left-8 -translate-y-1/2">
                            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg  transition-transform duration-300 border border-gray-700">
                                <Eye size={28} className="text-red-400" />
                            </div>
                        </div>
                        <div className="pt-6">
                            <h3 className="text-2xl lg:text-3xl font-bold mb-6 mt-4">
                                Nossa <span className="text-red-400">Visão</span>
                            </h3>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Além disso, buscamos compartilhar conhecimento, incentivando
                                a educação tecnológica e a criatividade através de prototipagem
                                e projetos educacionais. Promovemos a inovação contínua e o
                                desenvolvimento de soluções acessíveis para toda a comunidade.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                        
                        <div className="text-center mb-12 lg:mb-16 relative z-10">
                            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Nossos <span className="text-red-500">Valores</span>
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-1.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full mb-2"></div>
                                <div className="w-12 h-1 bg-red-300 rounded-full"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                            {values.map((value, index) => (
                                <div 
                                    key={index}
                                    className="group text-center p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl transition-all duration-300 border border-gray-100"
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6  transition-transform duration-300 shadow-lg">
                                        <value.icon size={32} className="text-white" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-xl lg:text-2xl mb-4">
                                        {value.title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}