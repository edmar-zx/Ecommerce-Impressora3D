'use client';
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Cards } from "@/components/Cards";
import { SearchBox } from "@/components/SearchBox";
import { ModalProduto } from "@/components/ModalProduto";

import { Produto } from "@/types/product";
import { validateProduct } from "@/utils/productValidation";
import { TableText } from "@/components/tableText";
import Image from "next/image";
import { ModalDelete } from "@/components/modalDelete"


const getColorHex = (colorName: string): string => {
    const colors: { [key: string]: string } = {
        branco: "#ffffff",
        preto: "#000000",
        vermelho: "#ff0000",
        azul: "#0000ff",
        verde: "#00ff00",
        amarelo: "#ffff00",
        outro: "#808080",
    };

    const normalizedColor = colorName.toLowerCase().trim();
    return colors[normalizedColor] || normalizedColor;
};

export default function ProdutoDashboard() {
    const [produtoAtual, setProdutoAtual] = useState<Produto | null>(null);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [produtoParaDeletar, setProdutoParaDeletar] = useState<Produto | null>(null);
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
        tempoEstimadoProducao: "",
        destaque: false
    };

    const [formData, setFormData] = useState<Produto>({ ...initialFormData });

    const handleOpenModal = (produto: Produto | null = null) => {
        setProdutoAtual(produto);
        setFormData(produto || { ...initialFormData });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    // Funções para o modal de deletar
    const handleOpenDeleteModal = (produto: Produto) => {
        setProdutoParaDeletar(produto);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setProdutoParaDeletar(null);
    };

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
        if (!produtoParaDeletar?._id) return;

        try {
            const res = await fetch("/api/produtos", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: produtoParaDeletar._id })
            });

            if (res.ok) {
                alert("Produto deletado com sucesso!");
                fetchProdutos();
                handleCloseDeleteModal();
            } else {
                const data = await res.json();
                alert(data.error || "Erro ao deletar o produto");
            }
        } catch (err) {
            console.error("Erro ao deletar produto:", err);
            alert("Erro ao deletar produto");
        }
    };

    const handleCreate = async () => {
        try {
            const form_data = new FormData();

            // Campos de texto/número
            form_data.append("nome", formData.nome);
            form_data.append("descricao", formData.descricao);
            form_data.append("categoria", formData.categoria);
            form_data.append("material", formData.material);
            form_data.append("cor", formData.cor);
            form_data.append("acabamento", formData.acabamento);
            form_data.append("peso", String(formData.peso));
            form_data.append("preco", String(formData.preco));
            form_data.append("desconto", String(formData.desconto));
            form_data.append("estoque", String(formData.estoque));
            form_data.append("tempoEstimadoProducao", formData.tempoEstimadoProducao);
            form_data.append("dimensoes", JSON.stringify(formData.dimensoes));
            form_data.append("destaque", String(formData.destaque));

            // Campo de imagem
            if (formData.imagem instanceof File) {
                form_data.append("imagem", formData.imagem);
            }

            const res = await fetch("/api/produtos", {
                method: "POST",
                body: form_data,
            });

            if (res.ok) {
                alert("Produto cadastrado com sucesso!");
                fetchProdutos();
                setFormData({ ...initialFormData });
                handleCloseModal();
            } else {
                const data = await res.json();
                alert(data.error || "Erro ao cadastrar produto");
            }
        } catch (err) {
            console.error("Erro ao cadastrar produto:", err);
        }
    };

    const handleUpdate = async () => {
        if (!produtoAtual?._id) return;

        try {
            const form_data = new FormData();

            // Campos de texto/número
            form_data.append("nome", formData.nome);
            form_data.append("descricao", formData.descricao);
            form_data.append("categoria", formData.categoria);
            form_data.append("material", formData.material);
            form_data.append("cor", formData.cor);
            form_data.append("acabamento", formData.acabamento);
            form_data.append("peso", String(formData.peso));
            form_data.append("preco", String(formData.preco));
            form_data.append("desconto", String(formData.desconto));
            form_data.append("estoque", String(formData.estoque));
            form_data.append("tempoEstimadoProducao", formData.tempoEstimadoProducao);
            form_data.append("dimensoes", JSON.stringify(formData.dimensoes));
            form_data.append("destaque", String(formData.destaque));

            // Imagem
            if (formData.imagem instanceof File) {
                form_data.append("imagem", formData.imagem);
            }

            // Passando o ID como campo separado
            form_data.append("id", produtoAtual._id);

            const res = await fetch("/api/produtos", {
                method: "PUT",
                body: form_data,
            });

            if (res.ok) {
                alert("Produto atualizado com sucesso!");
                fetchProdutos();
                handleCloseModal();
            } else {
                const data = await res.json();
                alert(data.error || "Erro ao atualizar produto");
            }
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("dados----", formData)
        if (!validateProduct(formData)) {
            alert("Preeencha todos os campos!");
            return;
        }

        if (produtoAtual?._id) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };

    const produtosFiltrados = produtos.filter((p: Produto) => {
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
            <div className="flex justify-between">
                <Cards emoji="📦" title="Produtos" value={produtos.length} />
                <Cards emoji="👥" title="Categorias" value={5} />
            </div>

            <div className="flex justify-between items-center mt-5 flex-wrap gap-2.5 bg-[#f5f5f5] p-5 rounded-xl">
                <SearchBox
                    placeholder="Pesquisar por nome ou ID"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
                        onSubmit={handleSubmit}
                        
                        buttonText={produtoAtual?._id ? "Salvar Alterações" : "Cadastrar Produto"}
                        onClose={handleCloseModal}
                    />
                </>
            )}

            {/* Modal de confirmação para deletar */}
            <ModalDelete
                isOpen={showDeleteModal}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDelete}
                produtoNome={produtoParaDeletar?.nome || ""}
            />

            <div className="mt-5 border-none rounded-lg bg-amber-50">
                {/* Cabeçalho da tabela */}
                <div className="grid grid-cols-[30%_15%_12%_13%_10%_10%_10%] font-bold p-5 bg-[#3a5277] rounded-t-xl shadow-sm items-center">
                    <TableText><strong>Nome</strong></TableText>
                    <TableText><strong>Categoria</strong></TableText>
                    <TableText><strong>Preço</strong></TableText>
                    <TableText><strong>Cor</strong></TableText>
                    <TableText><strong>Desconto</strong></TableText>
                    <TableText><strong>Estoque</strong></TableText>
                    <TableText><strong>Ações</strong></TableText>
                </div>

                {/* Corpo da tabela */}
                <div className="s">
                    {produtosFiltrados.map(p => (
                        <div
                            key={p._id}
                            className="grid grid-cols-[30%_15%_12%_13%_10%_10%_10%] p-3 bg-[#f5f5f5] shadow-sm border items-center min-h-[80px]"
                        >
                            {/* Coluna Nome com Imagem */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex-shrink-0 w-14 h-14 relative">
                                    {p.imagem ? (
                                        <Image
                                            src={String(p.imagem)}
                                            alt={p.nome}
                                            fill
                                            className="object-cover rounded-xl border-1 border-gray-300"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                            Sem imagem
                                        </div>
                                    )}
                                </div>
                                <TableText className="truncate font-medium text-gray-900 min-w-0 mr-20">
                                    {p.nome}
                                </TableText>
                            </div>

                            {/* Demais colunas */}
                            <TableText className="text-center truncate">
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full max-w-full truncate">
                                    {p.categoria}
                                </span>
                            </TableText>

                            <TableText className="text-center font-semibold text-gray-900">
                                R$ {Number(p.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </TableText>

                            <TableText className="text-center">
                                <div className="flex items-center gap-2 ">
                                    <div
                                        className="w-4 h-4 rounded-full flex-shrink-0 border-1 border-black"
                                        style={{
                                            backgroundColor: getColorHex(p.cor)
                                        }}
                                    />
                                    <span className="text-sm text-gray-600 truncate hidden sm:block">
                                        {p.cor}
                                    </span>
                                </div>
                            </TableText>

                            <TableText className="text-center">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${Number(p.desconto) > 0
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {Number(p.desconto) > 0 ? `${p.desconto}%` : "Não"}
                                </span>
                            </TableText>

                            <TableText className="text-center">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${Number(p.estoque) === 0
                                        ? `bg-red-100 text-red-800`
                                        : Number(p.estoque) > 10
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {p.estoque}
                                </span>
                            </TableText>

                            <TableText className="text-center">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(p)}
                                        className="p-2 text-white rounded-lg hover:bg-gray-300 hover:cursor-pointer"
                                        title="Editar produto"
                                    >
                                        <FaEdit className="text-black text-md" />
                                    </button>
                                    <button
                                        onClick={() => handleOpenDeleteModal(p)}
                                        className="p-2 text-white rounded-lg hover:bg-gray-300 hover:cursor-pointer "
                                        title="Deletar produto"
                                    >
                                        <FaTrash className="text-red-500 text-md" />
                                    </button>
                                </div>
                            </TableText>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}