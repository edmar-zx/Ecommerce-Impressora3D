import { Search, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 flex flex-col justify-center items-center">
      <nav className=" py-4 flex justify-between items-center w-[90%]">
        
        <Link href="/" className="text-3xl font-bold text-gray-900">
          Impressão 3D
        </Link>

        <div className="relative flex-1 max-w-lg mx-8">
          <input
            type="text"
            className="w-full px-4 py-2 pr-10 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <Search size={20} />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
            Home
          </Link>
          <Link href="#allProducts" className="text-gray-600 hover:text-gray-900 font-medium">
            Produtos
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">
            Sobre
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">
            Contato
          </Link>
        </div>

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