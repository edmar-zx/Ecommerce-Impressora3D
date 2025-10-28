import { Mail, MapPin, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-20 mt-16">
      <div className="container mx-auto px-6">
        
        {/* 1. Título da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Tire suas dúvidas ou peça um orçamento agora.
          </p>
        </div>

        {/* 2. Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: E-mail (Escuro) */}
          <div className="bg-gray-800 text-white rounded-lg p-8 flex flex-col">
            <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center mb-6">
              <Mail size={24} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Envie um <span className="text-red-500">e-mail</span>
            </h3>
            <p className="text-gray-300 flex-grow mb-8">
              Conte-nos o que você quer criar
            </p>
            <a 
              href="mailto:impressora3Dguama.com.br" 
              className="font-medium text-gray-100 hover:text-red-500 transition-colors"
            >
              impressora3Dguama.com.br
            </a>
          </div>

          {/* Card 2: Conhecer (Claro) */}
          <div className="bg-white text-gray-900 rounded-lg p-8 flex flex-col shadow-lg">
            <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center mb-6">
              <MapPin size={24} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Venha nos <span className="text-red-500">conhecer</span>
            </h3>
            <p className="text-gray-600 flex-grow mb-8">
              Confira nossa localização no mapa
            </p>
            <a 
              href="#" // Coloque seu link do Google Maps aqui
              className="font-medium text-gray-900 hover:text-red-500 transition-colors"
            >
              Visualizar no Google Maps
            </a>
          </div>

          {/* Card 3: WhatsApp (Escuro) */}
          <div className="bg-gray-800 text-white rounded-lg p-8 flex flex-col">
            <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center mb-6">
              {/* lucide-react não tem ícone do WhatsApp. Usei MessageSquare. */}
              <MessageSquare size={24} className="text-red-500" /> 
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Fale pelo <span className="text-red-500">WhatsApp</span>
            </h3>
            <p className="text-gray-300 flex-grow mb-8">
              Tire dúvidas e faça pedidos pelo WhatsApp
            </p>
            <a 
              href="https://wa.me/5567999669694" // Use o formato internacional
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-100 hover:text-red-500 transition-colors"
            >
              (67) 99966-9694
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}