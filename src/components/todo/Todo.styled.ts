import styled from "styled-components";

export const TodoWrapper = styled.div`
width: 100%;
max-width: 600px;
margin: 0 auto;
padding: 20px;
border: 1px solid ${({ theme }) => theme.palette.border.default};
border-radius: 5px;
background-color: ${({ theme }) => theme.palette.primary};
`;