import { Box } from "@mui/material";
import styled from "styled-components";

export const PaginationWrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
`;

export const PageItem = styled(({ active, ...props }: { active: boolean } & React.ComponentProps<typeof Box>) => (
    <Box {...props} />
))`
    cursor: pointer;
    padding: 10px;
    border: 2px solid #007bff;
    border-radius: 4px;
    color: ${({ active }) => (active ? "white" : "#007bff")};
    background-color: ${({ active }) => (active ? "#007bff" : "transparent")};
    user-select: none;
`;