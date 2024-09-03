import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const FiltersWrapper = styled(Box)`
    display: flex;
    border-bottom: 1px solid grey;
    gap: 10px;
    padding-left: 2px;
    margin-bottom: 20px;
    padding-bottom: 20px;
`;

interface FilterButtonProps {
    isActive: boolean;
}

export const FilterButton = styled(({ isActive, ...props }: FilterButtonProps & React.ComponentProps<typeof Typography>) => (
    <Typography {...props} />
))`
    font-size: 14px;
    cursor: pointer;
    color: grey;
    text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
    font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
`;