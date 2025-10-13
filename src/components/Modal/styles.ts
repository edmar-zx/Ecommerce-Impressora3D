import styled from "styled-components";
import { FaTrash, FaSave } from "react-icons/fa";



const variants = {
  primary: {
    bg: "#000",
    border: "#000",
    hoverText: "#000",
  },
  danger: {
    bg: "#ff4d4f",
    border: "#ff4d4f",
    hoverText: "#ff4d4f",
  }
}


export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  max-height: 90vh; /* 🔑 altura máxima = 80% da tela */

  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  z-index: 1000;


`;

export const ModalContent = styled.div`
  width: 100%;
  padding: 20px;
  overflow-y: auto;  
  box-sizing: border-box;
 
`;

export const Form = styled.form`
 display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
  width: 100%;

`;

interface FieldWrapperProps {
  full?: boolean;
}

export const FieldWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "full", // ⚡ evita passar para o div real
}) <FieldWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  /* se tiver a prop full, ocupa as duas colunas */
  grid-column: ${({ full }) => (full ? "1 / -1" : "auto")};
`;

export const ThreeFieldsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; /* mesmo espaçamento do restante do grid */
  width: 100%;
  grid-column: 1 / -1; /* ocupa a linha toda do grid principal */
`;

export const Input = styled.input`
  padding: 20px;
  margin-bottom: 5px;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  width: 100%;       /* ocupa todo o espaço disponível */
  box-sizing: border-box; /* garante padding dentro da largura */
`;
export const Text = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: left;
  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 120px; /* 🔑 altura maior */
  resize: vertical; /* permite redimensionar só na vertical */
  box-sizing: border-box;
  font-family: inherit;
`;

export const IconButton = styled(FaTrash)`
  color: #fff;
  transition: color 0.3s;   
  
`;

type VariantType = "primary" | "danger";

interface ButtonProps {
  variant: VariantType;
  full?: boolean;
}

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["variant", "full"].includes(prop),
}) <ButtonProps>`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ variant }) => variants[variant].bg};
  border: 1px solid ${({ variant }) => variants[variant].border};
  border-radius: 8px;
  cursor: pointer;
  width: 15rem;
  gap: 8px;
  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: #fff;
    color: ${({ variant }) => variants[variant].hoverText};
  }

  &:hover svg {
    color: ${({ variant }) => variants[variant].hoverText};
  }
`;

export const DeleteIcon = styled(FaTrash)`
  color: #fff;
`;

export const SaveIcon = styled(FaSave)`
  color: #fff;
`;

interface TextButtonProps {
  variant: VariantType;
}

export const TextButton = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
}) <TextButtonProps>`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  display: block;
  transition: color 0.3s;

  ${Button}:hover & {
    color: ${({ variant }) => variants[variant].hoverText};
  }
`;

interface ButtonRowProps {
  full?: boolean;
}

export const ButtonRow = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "full", //nao passa para o div real
}) <ButtonRowProps>`
  display: flex;
  justify-content: space-between;
  grid-column: ${({ full }) => (full ? "1 / -1" : "auto")};
`;
