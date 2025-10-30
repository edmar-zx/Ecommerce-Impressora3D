import { useEffect, useState, useMemo } from "react";
import { ButtonSelect } from "./ButtonSelect";
import { ButtonCategoryDropdown } from "./ButtonSelectDropdown";
import { ItemProduct } from "./ItemProduct";
import { Produto } from "@/types/product";
import { ChevronDown, ChevronRight } from "lucide-react";

type FilterState = {
  type: "all" | "sale" | "category" | "color";
  value?: string; // usado para categoria/cor
};

export function AllProductsList() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [filter, setFilter] = useState<FilterState>({ sale: false });

  const [sortOption, setSortOption] = useState<string | null>(null);



  type FilterState = {
    sale: boolean;
    category?: string;
    color?: string;
  };

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

  // Atualiza filtro


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
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">Todos os produtos</h1>

      <div className="flex gap-4 mt-10 flex-wrap justify-between">
        <div className="flex gap-6 items-center justify-center">
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


        <ButtonCategoryDropdown
          title="Ordenar por"
          options={sortOptions}
          onSelect={(option) => setSortOption(option)}
        />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-32 mt-10">
        {visibleProducts.map((p) => (
          <ItemProduct
            key={p._id}
            produto={p}
            onAddToCart={() => alert(`${p.nome} adicionado ao carrinho!`)}
          />
        ))}
      </div>
      
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
{/*    <div>
          <button
            className="flex items-center justify-center  gap-2 w-fit px-5 py-3 border rounded-full border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white transition-colors font-medium"
          >
            Ordenar Por
            <ChevronDown size={24} />
          </button>
        </div> */}