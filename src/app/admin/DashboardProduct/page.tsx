'use client';
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
    Container, CardContainer, Button, TextButton, Overlay,
    Toolbar, ProductList, ProductItem, TableHeader, TableText,
    IconButton
} from './styles';
import { Cards } from "@/components/StylesComponents/Cards";
import { SearchBox } from "@/components/StylesComponents/Searchbox";
import { ModalProduto } from "@/components/StylesComponents/Modal";
import { Produto } from "@/types/product";
import { validateProduct } from "@/utils/productValidation";

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

        const confirmDelete = confirm("Tem certeza que deseja deletar este produto?");
        if (!confirmDelete) return;

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

            // Campo de imagem
            if (formData.imagem instanceof File) {
                form_data.append("imagem", formData.imagem);
            }

            const res = await fetch("/api/produtos", {
                method: "POST",
                body: form_data, // ✅ multipart/form-data automaticamente
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

            // Imagem
            if (formData.imagem instanceof File) {
                form_data.append("imagem", formData.imagem);
            }

            // Passando o ID como campo separado
            form_data.append("id", produtoAtual._id);

            const res = await fetch("/api/produtos", {
                method: "PUT",
                body: form_data, // multipart/form-data
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

    return (
        <Container>
            <CardContainer>
                <Cards emoji="📦" title="Produtos" value={produtos.length} />
                <Cards emoji="👥" title="Categorias" value={5} />
                <Cards emoji="📦" title="Produtos" value={produtos.length} />
                <Cards emoji="👥" title="Categorias" value={5} />
            </CardContainer>

            <Toolbar>
                <SearchBox
                    placeholder="Pesquisar por nome ou ID"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => handleOpenModal()}>
                    <IconButton />
                    <TextButton>Adicionar Produto</TextButton>
                </Button>
            </Toolbar>

            {showModal && (
                <>
                    <Overlay onClick={handleCloseModal} />
                    <ModalProduto
                        formData={formData}
                        onChange={setFormData}
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                        buttonText={produtoAtual?._id ? "Salvar Alterações" : "Cadastrar Produto"}
                    />
                </>
            )}
            <ProductList>
                <TableHeader>
                    <TableText><strong>ID</strong></TableText>
                    <TableText><strong>Imagem</strong></TableText>
                    <TableText><strong>Nome</strong></TableText>
                    <TableText><strong>Categoria</strong></TableText>
                    <TableText><strong>Preço</strong></TableText>
                    <TableText><strong>Cor</strong></TableText>
                    <TableText><strong>Desconto</strong></TableText>
                    <TableText><strong>Estoque</strong></TableText>
                    <TableText><strong>Ações</strong></TableText>
                </TableHeader>

                {produtosFiltrados.map((p) => (
                    <ProductItem key={p._id}>
                        <TableText>{p._id}</TableText>
                        <TableText>
                            {p.imagem ? (
                                <img
                                    src={p.imagem}
                                    alt={p.nome}
                                    width={50}
                                    height={50}
                                    style={{ objectFit: "cover", borderRadius: "4px" }}
                                />
                            ) : (
                                "Sem imagem"
                            )}
                        </TableText>
                        <TableText>{p.nome}</TableText>
                        <TableText>{p.categoria}</TableText>
                        <TableText>R$ {p.preco.toFixed(2)}</TableText>
                        <TableText>{p.cor}</TableText>
                        <TableText>{p.desconto > 0 ? `${p.desconto}%` : "Não"}</TableText>
                        <TableText>{p.estoque}</TableText>
                        <TableText onClick={() => handleOpenModal(p)}>
                            <FaEdit style={{ cursor: "pointer" }} />
                        </TableText>
                    </ProductItem>
                ))}
            </ProductList>

        </Container>
    );
}
