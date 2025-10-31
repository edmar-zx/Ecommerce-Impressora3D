import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-rgba(224, 224, 224, 1)">
      <div className="container mx-auto px-6">
        <div
          className="h-[85vh] rounded-lg  bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundPosition: "center 20%",
          }}
        >
          <div className="absolute inset-0 "></div>

          <div className="relative h-full">
            <div className="pt-15 ml-25">

              {/* Substituindo o texto por SVG */}
              <div className="w-[400px] md:w-[500px]">
                <Image
                  src="/heroImg.svg"
                  alt="Impressão 3D"
                  width={500}
                  height={150}
                  priority
                />
              </div>

              <div className="flex space-x-4 mt-8">
                <button className="px-6 hover:cursor-pointer py-3 bg-[#27292D] text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors ">
                  <Link href="⁠allProducts">Explorar Produtos</Link>
                </button>
                <button className="px-6 hover:cursor-pointer py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors ">
                  <Link href="#contact">Sobre Nós</Link>
                </button>
              </div>
            </div>

            <button className="absolute top-6 right-6 px-5 py-2 bg-white/90 text-gray-900 font-medium rounded-full backdrop-blur-sm hover:bg-white transition-colors">
              <Link href="#contact">Entre em Contato</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}