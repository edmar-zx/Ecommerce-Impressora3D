import Image from 'next/image';
import { Star } from 'lucide-react';

type ProductCardProps = {
  imageUrl: string;
  title: string;
  price: number;
  reviews: number;
  rating: number;
};

export default function ProductCard({
  imageUrl,
  title,
  price,
  reviews,
  rating,
}: ProductCardProps) {
  
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="bg-white rounded-lg overflow-hidden transition-shadow duration-300 group">
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={250}
          height={250}
          className="object-contain object-center w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 truncate h-6">
          {title}
        </h3>

        <div className="flex items-center my-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < Math.floor(rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-2">({reviews})</span>
        </div>

        <p className="text-lg font-bold text-gray-900 mb-4">
          {formattedPrice}
        </p>

        <button className="w-full px-4 py-2 text-sm font-medium text-center bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}