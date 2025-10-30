import { useEffect, useState, useMemo } from "react";
import { ButtonSelect } from "./ButtonSelect";
import { ButtonCategoryDropdown } from "./ButtonSelectDropdown";
import { ItemProduct } from "./ItemProduct";
import { Produto } from "@/types/product";
import { ChevronDown, ChevronRight } from "lucide-react";

type FilterState = {
  sale: boolean;
  category?: string;
  color?: string;
};

export function AllProductsList() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [filter, setFilter] = useState<FilterState>({ sale: false });
  const [sortOption, setSortOption] = useState<string | null>(null);

  const handleFilterChange = (key: keyof FilterState, value?: string | boolean) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const sortOptions = [
    "Mais recentes",
    "Menor preço",
    "Maior preço",
    "A-Z",
    "Z-A",
  ];

  // Buscar produtos
  const fetchProdutos = async () => {
    try {
      const res = await fetch("/api/produtos");
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Filtra produtos dinamicamente
  const visibleProducts = useMemo(() => {
    let result = [...products];

    // ---- Filtros ----
    if (filter.sale) {
      result = result.filter((p) => p.desconto > 0);
    }
    if (filter.category) {
      result = result.filter((p) => p.categoria === filter.category);
    }
    if (filter.color) {
      result = result.filter((p) => p.cor === filter.color);
    }

    // ---- Ordenação ----
    switch (sortOption) {
      case "Menor preço":
        result.sort((a, b) => a.preco - b.preco);
        break;
      case "Maior preço":
        result.sort((a, b) => b.preco - a.preco);
        break;
      case "A-Z":
        result.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "Z-A":
        result.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case "Mais recentes":
        result.sort(
          (a, b) => new Date(b.createAt as string).getTime() - new Date(a.createAt as string).getTime()
        );
        break;
    }

    return result;
  }, [products, filter, sortOption]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
      <h1 className="text-3xl sm:text-4xl font-bold">Todos os produtos</h1>

      {/* Filtros e Ordenação */}
      <div className="flex flex-col lg:flex-row gap-4 mt-10 justify-between items-start lg:items-center">
        {/* Filtros */}
        <div className="flex flex-wrap gap-3 items-center">
          <ButtonSelect
            title="Todos"
            onClick={() => setFilter({ sale: false, category: undefined, color: undefined })}
            active={!filter.sale && !filter.category && !filter.color}
          />

          <ButtonSelect
            title="Em Promoção"
            onClick={() => handleFilterChange("sale", true)}
            active={filter.sale === true}
          />

          <ButtonCategoryDropdown
            title="Categoria"
            options={["Miniaturas", "Utensílios", "Decoração", "Acessórios", "Brinquedos"]}
            onSelect={(option) => handleFilterChange("category", option)}
          />

          <ButtonCategoryDropdown
            title="Cor"
            options={["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Outro"]}
            onSelect={(option) => handleFilterChange("color", option)}
          />
        </div>

        {/* Ordenação */}
        <div className="w-full lg:w-auto">
          <ButtonCategoryDropdown
            title="Ordenar por"
            options={sortOptions}
            onSelect={(option) => setSortOption(option)}
          />
        </div>
      </div>

      {/* Grid de Produtos - CORRIGIDO */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full">
        {visibleProducts.map((p) => (
          <div key={p._id} className="w-full flex justify-center">
            <div className="w-full max-w-[280px]">
              <ItemProduct
                produto={p}
                onAddToCart={() => alert(`${p.nome} adicionado ao carrinho!`)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
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
    </div>
  );
}