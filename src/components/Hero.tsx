// NOTA: Coloque sua imagem em /public/images/hero-bg.jpg
// ou altere o caminho no style={{...}}

export default function Hero() {
  return (
    <section 
      className="relative w-full h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Overlay para escurecer a imagem */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Container do Conteúdo */}
      <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10 max-w-2xl">
        
        {/* Texto Principal */}
        <h1 className="text-white font-bold text-5xl md:text-7xl uppercase tracking-tighter">
          Design
        </h1>
        <h1 className="text-white font-bold text-5xl md:text-7xl uppercase tracking-tighter">
          Tecnologia
        </h1>
        <h1 className="text-white font-bold text-5xl md:text-7xl uppercase tracking-tighter">
          Impressão 3D
        </h1>

        {/* Botões */}
        <div className="flex space-x-4 mt-8">
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
            Explorar Produtos
          </button>
          <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Sobre Nós
          </button>
        </div>
      </div>

      {/* Botão "Entre em Contato" (Canto Superior Direito) */}
      <button className="absolute top-6 right-6 z-10 px-5 py-2 bg-white/90 text-gray-800 font-medium rounded-full backdrop-blur-sm hover:bg-white transition-colors">
        Entre em Contato
      </button>

    </section>
  );
}