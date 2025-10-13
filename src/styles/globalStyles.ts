'use client';
import { styled, createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    
    background-color: #E5E5E5 ;
    color: #333;
  }

  h1, h2, h3 {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const Text = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: center;
  margin-bottom: 10px;
  

`;

export default GlobalStyle;