'use client';
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Cards } from "@/components/Cards";
import { SearchBox } from "@/components/SearchBox";
import { ModalProduto } from "@/components/ModalProduto";
import { Produto } from "@/types/product";
import { validateProduct } from "@/utils/productValidation";
import { TableText } from "@/components/tableText";
import Image from "next/image";

export default function ProdutoDashboard() {
  const [produtoAtual, setProdutoAtual] = useState<Produto | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const initialFormData: Produto = {
    nome: "",
    descricao: "",
    categoria: "",
    imagem: "",
    material: "",
    cor: "",
    acabamento: "",
    peso: 0,
    dimensoes: { largura: 0, altura: 0, profundidade: 0 },
    preco: 0,
    desconto: 0,
    estoque: 0,
    tempoEstimadoProducao: ""
  };

  const [formData, setFormData] = useState<Produto>({ ...initialFormData });

  const handleOpenModal = (produto: Produto | null = null) => {
    setProdutoAtual(produto);
    setFormData(produto || { ...initialFormData });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const fetchProdutos = async () => {
    try {
      const res = await fetch('/api/produtos');
      const data = await res.json();
      if (res.ok) setProdutos(data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async () => {
    if (!produtoAtual?._id) return;
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      const res = await fetch("/api/produtos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: produtoAtual._id })
      });
      if (res.ok) {
        alert("Produto deletado com sucesso!");
        fetchProdutos();
        handleCloseModal();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao deletar o produto");
      }
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      alert("Erro ao deletar produto");
    }
  };

  const handleSubmitProduto = async () => {
    const isValid = validateProduct(formData);
    if (!isValid) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const form_data = new FormData();

    // Campos de texto e números
    Object.entries({
      nome: formData.nome,
      descricao: formData.descricao,
      categoria: formData.categoria,
      material: formData.material,
      cor: formData.cor,
      acabamento: formData.acabamento,
      peso: formData.peso,
      preco: formData.preco,
      desconto: formData.desconto,
      estoque: formData.estoque,
      tempoEstimadoProducao: formData.tempoEstimadoProducao,
      dimensoes: JSON.stringify(formData.dimensoes),
    }).forEach(([key, value]) => form_data.append(key, String(value)));

    // Imagem (File)
    if (formData.imagem instanceof File) {
      form_data.append("imagem", formData.imagem);
    }

    // Se for update, adiciona ID
    if (produtoAtual?._id) {
      form_data.append("id", produtoAtual._id);
    }

    try {
      const res = await fetch("/api/produtos", {
        method: produtoAtual?._id ? "PUT" : "POST",
        body: form_data,
      });

      if (res.ok) {
        alert(produtoAtual?._id ? "Produto atualizado!" : "Produto cadastrado!");
        fetchProdutos();
        setFormData({ ...initialFormData });
        handleCloseModal();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao salvar produto");
      }
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      alert("Erro ao salvar produto");
    }
  };

  const produtosFiltrados = produtos.filter(p => {
    const term = searchTerm.toLowerCase();
    return p.nome.toLowerCase().includes(term) || (p._id?.includes(term) ?? false);
  });

  const Button = ({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <button
      onClick={onClick}
      className={`p-3.5 flex items-center gap-2 bg-black border border-black rounded-lg cursor-pointer transition-colors duration-300 hover:bg-white hover:text-black ${className}`}
    >
      {children}
    </button>
  );

  const TextButton = ({ children }: { children: React.ReactNode }) => (
    <span className="text-base font-bold text-white text-center block transition-colors duration-300 group-hover:text-black">
      {children}
    </span>
  );

  return (
    <div className="h-screen my-7.5 mx-12.5">
      <div className="flex justify-between flex-wrap gap-2.5">
        <Cards emoji="📦" title="Produtos" value={produtos.length} />
        <Cards emoji="👥" title="Categorias" value={5} />
      </div>

      <div className="flex justify-between items-center mt-5 flex-wrap gap-2.5">
        <SearchBox
          placeholder="Pesquisar por nome ou ID"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => handleOpenModal()} className="group">
          <FaPlus className="text-white transition-colors duration-300 group-hover:text-black" />
          <TextButton>Adicionar Produto</TextButton>
        </Button>
      </div>

      {showModal && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[999]"
            onClick={handleCloseModal}
          />
          <ModalProduto
            formData={formData}
            onChange={setFormData}
            onSubmit={(e) => { e.preventDefault(); handleSubmitProduto(); }}
            onDelete={produtoAtual?._id ? handleDelete : undefined}
            buttonText={produtoAtual?._id ? "Salvar Alterações" : "Cadastrar Produto"}
          />
        </>
      )}

      <div className="mt-5 border-none rounded-lg">
        <div className="flex font-bold p-5 bg-[#D9C9B6] mb-2.5 rounded shadow-sm justify-between text-center">
          <TableText>ID</TableText>
          <TableText>Imagem</TableText>
          <TableText>Nome</TableText>
          <TableText>Categoria</TableText>
          <TableText>Preço</TableText>
          <TableText>Cor</TableText>
          <TableText>Desconto</TableText>
          <TableText>Estoque</TableText>
          <TableText>Ações</TableText>
        </div>
        {produtosFiltrados.map(p => (
          <div key={p._id} className="flex font-bold p-5 bg-[#f5f5f5] shadow-sm rounded mb-1 text-start justify-between">
            <TableText>{p._id}</TableText>
            <TableText>
              {p.imagem ? (
                <Image
                  src={typeof p.imagem === "string" ? p.imagem : URL.createObjectURL(p.imagem)}
                  alt={p.nome}
                  width={50}
                  height={50}
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              ) : "Sem imagem"}
            </TableText>
            <TableText>{p.nome}</TableText>
            <TableText>{p.categoria}</TableText>
            <TableText>R$ {p.preco}</TableText>
            <TableText>{p.cor}</TableText>
            <TableText>{p.desconto > 0 ? `${p.desconto}%` : "Não"}</TableText>
            <TableText>{p.estoque}</TableText>
            <TableText onClick={() => handleOpenModal(p)}>
              <FaEdit />
            </TableText>
          </div>
        ))}
      </div>
    </div>
  );
}
