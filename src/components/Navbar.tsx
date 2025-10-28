import { Search, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 1. Logo */}
        <Link href="/" className="text-3xl font-bold text-gray-900">
          RYZEN
        </Link>

        {/* 2. Barra de Busca */}
        <div className="relative flex-1 max-w-lg mx-8">
          <input
            type="text"
            className="w-full px-4 py-2 pr-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <Search size={20} />
          </button>
        </div>

        {/* 3. Links de Navegação */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
            Home
          </Link>
          <Link href="/produtos" className="text-gray-600 hover:text-gray-900 font-medium">
            Produtos
          </Link>
          <button className="flex items-center text-gray-600 hover:text-gray-900 font-medium">
            Categorias <ChevronDown size={16} className="ml-1" />
          </button>
          <Link href="/sobre" className="text-gray-600 hover:text-gray-900 font-medium">
            Sobre
          </Link>
          <Link href="/contato" className="text-gray-600 hover:text-gray-900 font-medium">
            Contato
          </Link>
        </div>

        {/* 4. Ícones da Direita */}
        <div className="flex items-center space-x-4 ml-6">
          <button className="text-gray-600 hover:text-gray-900">
            <Heart size={24} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <ShoppingCart size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
}