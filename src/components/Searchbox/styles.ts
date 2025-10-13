import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export const InputWrapper = styled.form`
  position: relative;
  display: inline-block;
  flex: 1;  
  min-width: 200px; /* não fica muito pequeno em telas pequenas */
`;

export const BoxSearch = styled.input`
  padding: 20px 20px 20px 50px; /* espaço pro ícone */
  background-color: #ffffff;
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  width: 100%;       /* ocupa todo o espaço disponível */
  max-width: 500px;  /* nunca maior que 500px */
  box-sizing: border-box; /* garante padding dentro da largura */
  
`;

export const Icon = styled(FaSearch)`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
`;