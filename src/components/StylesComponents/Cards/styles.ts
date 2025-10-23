import styled from "styled-components";

export const Card = styled.div`
  padding: 20px;
  background-color: #ffffff;
  width: 23%;
  border-radius: 12px;
  max-height: 200px;
  min-height: 150px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const Icon = styled.span`
  font-size: 2rem; 
  margin-right: 8px; 
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-top: 30px;
`;

export const Value = styled.strong`
 font-size: 36px;
 font-weight: bold;
 color: #000;
`;