import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const highlightColor = '#E34A3E';

export default function HeroSection() {
  return (
    <section
      className="h-[90vh] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      style={{ backgroundColor: '#27292D' }}
    >
      <div className="w-full h-full relative z-10 flex flex-col items-center">
        <div className="flex h-full items-start pt-16 justify-between w-[90%]"> 

          <div className="max-w-xl text-white mt-6 mr-6"> 
            <h1 className="text-5xl font-extrabold leading-tight"> 
              Impressão <span style={{ color: highlightColor }}>3D com</span>
              <br />
              <span style={{ color: highlightColor }}>qualidade</span> industrial
            </h1>
          </div>

          <div className="max-w-lg text-white self-start pt-50  "> 
            <p className="text-2xl text-gray-300  rounded-lg  "> 
                Usamos impressoras de alta precisão para criar peças sob medida com acabamento profissional.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:brightness-110"
              style={{ backgroundColor: highlightColor }}
            >
              Ver processo completo
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 w-full flex justify-center h-full max-h-[75vh] pointer-events-none">
        <Image
          src="/impressora3D.png"
          alt="Impressora 3D Creality K1"
          width={700}
          height={700}
          className="object-contain w-auto h-full"
          priority
        />
      </div>

    </section>
  );
}