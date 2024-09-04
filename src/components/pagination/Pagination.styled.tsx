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
    border: 2px solid ${({ theme }) => theme.palette.border.secondary};
    border-radius: 4px;
    color: ${({ active, theme }) => (active ? "white" : theme.palette.border.secondary)};
    background-color: ${({ active, theme }) => (active ? theme.palette.border.secondary : "transparent")};
    user-select: none;
`;