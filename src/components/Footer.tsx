import { Mail, MapPin, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black py-20 mt-16 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#E74C3C] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E74C3C] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Vamos Trabalhar Juntos?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Pronto para transformar suas ideias em realidade? Entre em contato e vamos criar algo incrível!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="group relative">
            <div className="absolute inset-0 bg-[#E74C3C] rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-[#E74C3C] transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-[#E74C3C] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Envie um <span className="text-[#E74C3C]">E-mail</span>
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Descreva seu projeto e vamos conversar sobre como podemos ajudar
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&to=marcelino.garcia@uems.br&su=Orçamento%20de%20impressão%203D&body"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-[#E74C3C] transition-all duration-300 font-medium group/link"
              >
                <span className="border-b border-transparent hover:border-[#E74C3C] transition-all duration-300">
                  marcelino.garcia@uems.br
                </span>
                <span className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-[#E74C3C] rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl p-8 border border-gray-200 hover:border-[#E74C3C] transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="w-14 h-14 bg-[#E74C3C] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <MapPin size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Visite Nossa <span className="text-[#E74C3C]">Unidade</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tecnologia de ponta na UEMS Nova Andradina
              </p>
              <a
                href="https://www.google.com/maps/place/Universidade+Estadual+de+Mato+Grosso+do+Sul+-+Nova+Andradina/@-22.2381058,-53.3447786,17z/data=!3m1!4b1!4m6!3m5!1s0x948e7cde774c89f3:0x46c9b6f4cd37c429!8m2!3d-22.2381108!4d-53.3422037!16s%2Fg%2F1tmbx699?entry=ttu&g_ep=EgoyMDI1MTAyOS4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-900 hover:text-[#E74C3C] transition-all duration-300 font-medium group/link"
              >
                <span className="border-b border-transparent hover:border-[#E74C3C] transition-all duration-300">
                  Ver no Maps
                </span>
                <span className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-[#E74C3C] rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-[#E74C3C] transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-[#E74C3C] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <MessageSquare size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Chamada <span className="text-[#E74C3C]">Instantânea</span>
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Conversa rápida e direta pelo WhatsApp
              </p>
              <a
                href="https://wa.me/5567999669694"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-[#E74C3C] transition-all duration-300 font-medium group/link"
              >
                <span className="border-b border-transparent hover:border-[#E74C3C] transition-all duration-300">
                  (67) 99966-9694
                </span>
                <span className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>

        </div>

        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400">
            © 2024 Impressões 3D UEMS. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}