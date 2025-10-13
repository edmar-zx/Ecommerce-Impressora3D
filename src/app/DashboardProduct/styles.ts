import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

export const Container = styled.div`
  height: 100vh;
  margin: 30px 50px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
  color: #000;
  font-size: 24px;
  font-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 20px;
  margin-bottom: 5px;
  border-radius: 8px;
  border: none
`;
export const IconButton = styled(FaPlus)`
  color: #fff;
  transition: color 0.3s;   
  
`;

export const Button = styled.button`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #000;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #fff;
    color: #000; 
  }

  &:hover ${IconButton} {
    color: #000;
  }
`;


export const TextButton = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  display: block;
  transition: color 0.3s;
  ${Button}:hover & {
    color: #000;
  }
`;

export const Text = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: center;
  display: block;
  transition: color 0.3s;
  ${Button}:hover & {
    color: #fff;
  }
`;

export const ProductList = styled.div`
  margin-top: 20px;
  border: none;
  border-radius: 8px;

`;

export const ProductItem = styled.div`
  display: flex;
  font-weight: bold;
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 5px;
  

  text-align: flex-start;
  justify-content: space-between;
  
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`


export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  flex-wrap: wrap; /* permite quebrar linha em telas pequenas */
  gap: 10px;       /* espaço entre input e botão */
`

export const TableHeader = styled.div`
  display: flex;
  font-weight: bold;
  padding: 20px;
  background-color: #D9C9B6;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);


  text-align: center;
  justify-content: space-between;
  
`

export const TableText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  text-align: start;
  display: block;
  transition: color 0.3s;
  flex: 1; 
`


export const BoxModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

`
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 999;
`;