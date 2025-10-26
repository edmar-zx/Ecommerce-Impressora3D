'use client';
import React, { useState } from "react";
import { DropdownField } from "../DropdownField";
import { Produto } from "@/types/product";
import {
    ModalContainer, ModalContent, Form, FieldWrapper, Input, Text, TextArea, Button, TextButton,
    ButtonRow, IconButton, SaveIcon, ThreeFieldsRow,
} from "./styles";

interface ModalProdutoProps {
    formData: Produto;
    onChange: (data: Produto) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onDelete: () => void;
    buttonText: string;
}

export function ModalProduto({ formData, onChange, onSubmit, onDelete }: ModalProdutoProps) {
    const categorias = ["Miniaturas", "Utensílios", "Decoração", "Acessórios", "Brinquedos"];
    const acabamentos = ["Liso", "Polido", "Pintado", "Texturizado"];
    const materiais = ["PLA", "ABS", "PETG", "Resina", "TPU"];
    const cores = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Outro"];
    const tempoDeProducao = ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"];
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <Form onSubmit={onSubmit}>
                    <FieldWrapper full={true}>
                        <Text>Nome</Text>
                        <Input
                            type="text"
                            placeholder="Nome do produto"
                            value={formData.nome}
                            onChange={(e) => onChange({ ...formData, nome: e.target.value })}
                        />
                    </FieldWrapper>

                    {/* TRATAR IMAGEM DEPOIS */}
                    <FieldWrapper full>
                        <Text>Imagem</Text>
                        {/* <TextArea
                            placeholder="Cole as URLs separadas por vírgula"
                            value={formData.imagens?.join(", ") || ""}
                            onChange={(e) =>
                                onChange({
                                    ...formData,
                                    imagens: e.target.value.split(",").map((i) => i.trim()),
                                })
                            }
                        /> */}
                        <div className="flex">
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                className="hover:cursor-pointer !border !border-solid !border-black"
                                value={formData.imagem}
                            />
                            {preview && (
                                <img src={preview} alt="Preview" width={200} className="mt-2 rounded-md" />
                            )}
                        </div>
                    </FieldWrapper>

                    <DropdownField
                        label="Categoria"
                        options={categorias}
                        value={formData.categoria}
                        onChange={(value) => onChange({ ...formData, categoria: value })}
                        disabled={!!formData._id}
                    />

                    <DropdownField
                        label="Tempo de produção"
                        options={tempoDeProducao}
                        value={formData.tempoEstimadoProducao}
                        onChange={(value) => onChange({ ...formData, tempoEstimadoProducao: value })}

                    />
                    <FieldWrapper>
                        <Text>Peso (g)</Text>
                        <Input
                            type="number"
                            min={0}
                            step={1}
                            value={formData.peso ?? 0}
                            onChange={(e) => onChange({ ...formData, peso: Number(e.target.value) })}
                        />
                    </FieldWrapper>

                    <DropdownField
                        label="Material"
                        options={materiais}
                        value={formData.material}
                        onChange={(value) => onChange({ ...formData, material: value })}
                    />
                    <DropdownField
                        label="Cor"
                        options={cores}
                        value={formData.cor}
                        onChange={(value) => onChange({ ...formData, cor: value })}
                    />
                    <DropdownField
                        label="Acabamento"
                        options={acabamentos}
                        value={formData.acabamento}
                        onChange={(value) => onChange({ ...formData, acabamento: value })}
                    />

                    <ThreeFieldsRow>
                        <FieldWrapper>
                            <Text>Largura (mm)</Text>
                            <Input
                                type="number"
                                min={0}
                                step={1}
                                value={formData.dimensoes?.largura ?? 0}
                                onChange={(e) =>
                                    onChange({
                                        ...formData,
                                        dimensoes: {
                                            ...formData.dimensoes,
                                            largura: Number(e.target.value),
                                        },
                                    })
                                }
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Text>Altura (mm)</Text>
                            <Input
                                type="number"
                                min={0}
                                step={1}
                                value={formData.dimensoes?.altura ?? 0}
                                onChange={(e) =>
                                    onChange({
                                        ...formData,
                                        dimensoes: {
                                            ...formData.dimensoes,
                                            altura: Number(e.target.value),
                                        },
                                    })
                                }
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Text>Profundidade (mm)</Text>
                            <Input
                                type="number"
                                min={0}
                                step={1}
                                value={formData.dimensoes?.profundidade ?? 0}
                                onChange={(e) =>
                                    onChange({
                                        ...formData,
                                        dimensoes: {
                                            ...formData.dimensoes,
                                            profundidade: Number(e.target.value),
                                        },
                                    })
                                }
                            />
                        </FieldWrapper>
                    </ThreeFieldsRow>

                    <FieldWrapper full={true}>
                        <Text>Descrição</Text>
                        <TextArea
                            placeholder="Descrição do produto"
                            value={formData.descricao}
                            onChange={(e) => onChange({ ...formData, descricao: e.target.value })}
                        />
                    </FieldWrapper>

                    <ThreeFieldsRow>
                        <FieldWrapper>
                            <Text>Preço</Text>
                            <Input
                                type="text"
                                placeholder="R$ 0,00"
                                value={
                                    formData.preco
                                        ? new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(formData.preco)
                                        : ''
                                }
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const numeric = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
                                    let valor = Number(numeric) / 100;  // Divide por 100 para formatar como centavos
                                    if (valor < 0) valor = 0;  // Garante que não seja negativo
                                    onChange({ ...formData, preco: valor });
                                }}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Text>Desconto (0% a 100%)</Text>
                            <Input
                                type="number"
                                placeholder="0"
                                min={0}
                                max={100}
                                step={1}
                                value={formData.desconto}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const valorStr = e.target.value;
                                    if (valorStr === "") {
                                        onChange({ ...formData, desconto: 0 });
                                        return;
                                    }
                                    let valorNum = Number(valorStr);
                                    if (valorNum < 0) valorNum = 0;
                                    if (valorNum > 100) valorNum = 100;
                                    onChange({ ...formData, desconto: valorNum });
                                }}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Text>Quantidade disponível</Text>
                            <Input
                                type="number"
                                placeholder="0"
                                min={0}
                                step={1}
                                value={formData.estoque}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const valorStr = e.target.value;
                                    if (valorStr === "") {
                                        onChange({ ...formData, estoque: 0 });
                                        return;
                                    }
                                    let valorNum = Number(valorStr);
                                    if (valorNum < 0) valorNum = 0;
                                    onChange({ ...formData, estoque: valorNum });
                                }}
                            />
                        </FieldWrapper>
                    </ThreeFieldsRow>
                    {formData._id && (
                        <>
                            <FieldWrapper>
                                <Text>ID</Text>
                                <Input
                                    type="text"
                                    value={formData._id}
                                    readOnly
                                />
                            </FieldWrapper>

                            <FieldWrapper>
                                <Text>Data de Criação</Text>
                                <Input
                                    type="text"
                                    value={formData.createAt ? new Date(formData.createAt).toLocaleString() : ""}
                                    readOnly
                                />
                            </FieldWrapper>
                        </>

                    )}
                    {formData._id ? (
                        <ButtonRow full={true}>
                            <Button type="submit" variant="primary">
                                <SaveIcon />
                                <TextButton variant="primary">Salvar</TextButton>
                            </Button>
                            <Button type="button" onClick={onDelete} variant="danger">
                                <IconButton />
                                <TextButton variant="danger">Deletar</TextButton>
                            </Button>
                        </ButtonRow>
                    ) : (
                        <Button type="submit" variant="primary">
                            <SaveIcon />
                            <TextButton variant="primary">Cadastrar</TextButton>
                        </Button>
                    )}
                </Form>
            </ModalContent>
        </ModalContainer>
    );
}
