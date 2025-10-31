import Image from 'next/image';

const categories = [
  { name: "Miniaturas", imageUrl: "/categoriaMiniaturas.png" }, 
  { name: "Utensílios", imageUrl: "/categoriaUtensilios.png" },
  { name: "Decoração", imageUrl: "/categoriaDecoracao.png" },
  { name: "Acessórios", imageUrl: "/categoriaAcessorios.png" },
  { name: "Brinquedos", imageUrl: "/categoriaBrinquedos.png" },
];

export default function Categories() {
  return (
    <section className="">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Nossas Categorias
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="flex flex-col items-center group cursor-pointer"
          >
           
            <div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={192} 
                height={192} 
                className="object-contain" 
              />
            </div>
            
            <h3 className="text-lg font-medium text-gray-700 group-hover:text-blue-600">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}