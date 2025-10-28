import ProductCard from './ProductCard';
import { ChevronDown, ChevronRight } from 'lucide-react';

// --- DADOS DE EXEMPLO CORRIGIDOS ---
// Todos os 8 produtos estão definidos corretamente agora.
const products = [
  {
    id: 1,
    title: 'FlexMount Pro – Suporte Articulado de Impressão 3D para...',
    price: 770.00,
    reviews: 32,
    rating: 4.5,
    imageUrl: '/images/prod-gun.png',
  },
  {
    id: 2,
    title: 'Kit de Peças Decorativas Coloridas - Impressão 3D',
    price: 250.00,
    reviews: 18,
    rating: 4,
    imageUrl: '/images/prod-parts.png',
  },
  {
    id: 3,
    title: 'Robô Articulado "Roby" - Colecionável 3D',
    price: 450.00,
    reviews: 45,
    rating: 5,
    imageUrl: '/images/prod-robot.png',
  },
  {
    id: 4,
    title: 'Coelho "Ryzen" Decorativo - Verde Esmeralda',
    price: 320.00,
    reviews: 22,
    rating: 4.5,
    imageUrl: '/images/prod-rabbit.png',
  },
  // --- INÍCIO DA CORREÇÃO ---
  {
    id: 5,
    title: 'FlexMount Pro – Suporte Articulado de Impressão 3D para...',
    price: 770.00,
    reviews: 32,
    rating: 4.5,
    imageUrl: '/images/prod-gun.png',
  },
  {
    id: 6,
    title: 'Kit de Peças Decorativas Coloridas - Impressão 3D',
    price: 250.00,
    reviews: 18,
    rating: 4,
    imageUrl: '/images/prod-parts.png',
  },
  {
    id: 7,
    title: 'Robô Articulado "Roby" - Colecionável 3D',
    price: 450.00,
    reviews: 45,
    rating: 5,
    imageUrl: '/images/prod-robot.png',
  },
  {
    id: 8,
    title: 'Coelho "Ryzen" Decorativo - Verde Esmeralda',
    price: 320.00,
    reviews: 22,
    rating: 4.5,
    imageUrl: '/images/prod-rabbit.png',
  },
  // --- FIM DA CORREÇÃO ---
];
// --- FIM DOS DADOS DE EXEMPLO ---


export default function ProductList() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Todos os produtos
      </h2>

      {/* 1. Barra de Filtros e Ordenação */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Filtros da Esquerda */}
        <div className="flex flex-wrap gap-2">
          <button className="px-5 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-lg">
            Todos
          </button>
          <button className="px-5 py-2 text-sm font-medium bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
            Em Promoção
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
            Categorias <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
            Preço <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
            Cor <ChevronDown size={16} />
          </button>
        </div>

        {/* Ordenação da Direita */}
        <div>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
            Ordenar Por: <span className="text-gray-900 font-semibold">Melhor Avaliados</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* 2. Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Agora o array 'products' está completo e o 'map' funciona */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title} // Agora 'product.title' é sempre 'string'
            price={product.price}
            reviews={product.reviews}
            rating={product.rating}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>

      {/* 3. Paginação */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <button className="w-10 h-10 flex items-center justify-center font-bold text-white bg-gray-900 rounded-full">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
          3
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}