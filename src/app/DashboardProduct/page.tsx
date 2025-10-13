'use client';
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
    Container, CardContainer, Button, TextButton, Overlay,
    Toolbar, ProductList, ProductItem, TableHeader, TableText,
    IconButton
} from './styles';
import { Cards } from "@/components/Cards";
import { SearchBox } from "@/components/Searchbox";
import { ModalProduto } from "@/components/Modal";
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
            const body: Omit<Produto, "_id"> = {
                ...formData,
                preco: Number(formData.preco),
                desconto: Number(formData.desconto) || 0,
            };

            const res = await fetch("/api/produtos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                alert("Produto Cadastrado com Sucesso");
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
            // Remover _id de formData antes de enviar para o $set
            const { _id, ...fields } = formData;

            const body = {
                ...fields,
                id: produtoAtual._id, // id separado para filtro
                preco: Number(formData.preco),
                desconto: Number(formData.desconto) || 0,
            };

            const res = await fetch("/api/produtos", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                alert("Produto Atualizado com Sucesso");
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
                    <TableText><strong>Nome</strong></TableText>
                    <TableText><strong>Categoria</strong></TableText>
                    <TableText><strong>Preço</strong></TableText>
                    <TableText><strong>Cor</strong></TableText>
                    <TableText><strong>Em Promoção</strong></TableText>
                    <TableText><strong>Ações</strong></TableText>
                </TableHeader>
                {produtosFiltrados.map(p => (
                    <ProductItem key={p._id}>
                        <TableText>{p._id}</TableText>
                        <TableText>{p.nome}</TableText>
                        <TableText>{p.categoria}</TableText>
                        <TableText>R$ {p.preco}</TableText>
                        <TableText>{p.cor}</TableText>
                        <TableText>
                            {(Number(p.desconto) > 0 ? `${p.desconto}%` : "Não")}
                        </TableText>
                        <TableText onClick={() => handleOpenModal(p)}>
                            <FaEdit />
                        </TableText>
                    </ProductItem>
                ))}
            </ProductList>
        </Container>
    );
}
