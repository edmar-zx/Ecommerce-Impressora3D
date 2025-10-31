import { useEffect, useState, useMemo } from "react";
import { ButtonSelect } from "./ButtonSelect";
import { ButtonCategoryDropdown } from "./ButtonSelectDropdown";
import { ItemProduct } from "./ItemProduct";
import { Produto } from "@/types/product";
import { ChevronRight, ChevronLeft } from "lucide-react";

type FilterState = {
  sale: boolean;
  category?: string;
  color?: string;
};

export function AllProductsList() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [filter, setFilter] = useState<FilterState>({ sale: false });
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  const handleFilterChange = (key: keyof FilterState, value?: string | boolean) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const sortOptions = [
    "Mais recentes",
    "Menor preço",
    "Maior preço",
    "A-Z",
    "Z-A",
  ];

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

  const filteredProducts = useMemo(() => {

    let result = [...products];

    if (filter.sale) result = result.filter((p) => p.desconto > 0);
    if (filter.category) result = result.filter((p) => p.categoria === filter.category);
    if (filter.color) result = result.filter((p) => p.cor === filter.color);

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
          (a, b) =>
            new Date(b.createAt as string).getTime() -
            new Date(a.createAt as string).getTime()
        );
        break;
    }

    return result;
  }, [products, filter, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="">
      <h1 className="text-3xl sm:text-4xl font-bold">Todos os produtos</h1>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {paginatedProducts.map((p) => (
          <ItemProduct
            key={p._id}
            produto={p}
            onAddToCart={() => alert(`${p.nome} adicionado ao carrinho!`)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-15 h-15 flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-15 h-15 flex items-center justify-center rounded-full border font-medium transition-colors ${
                  currentPage === page
                    ? "bg-gray-900 text-white font-bold"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-15 h-15 flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}