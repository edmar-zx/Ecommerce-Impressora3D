import Image from 'next/image';

// 1. Defina os dados das categorias
// NOTA: Coloque suas imagens na pasta /public/images/
const categories = [
  { name: "Miniaturas", imageUrl: "/images/cat-miniatura.png" }, 
  { name: "Utensílios", imageUrl: "/images/cat-utensilios.png" },
  { name: "Decoração", imageUrl: "/images/cat-decoracao.png" },
  { name: "Acessórios", imageUrl: "/images/cat-acessorios.png" },
  { name: "Brinquedos", imageUrl: "/images/cat-brinquedos.png" },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Nossas Categorias
      </h2>
      
      {/* Grid responsivo para as categorias */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Círculo da Imagem */}
            <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={192} // w-48
                height={192} // h-48
                className="object-contain" 
              />
            </div>
            {/* Nome da Categoria */}
            <h3 className="text-lg font-medium text-gray-700 group-hover:text-blue-600">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}