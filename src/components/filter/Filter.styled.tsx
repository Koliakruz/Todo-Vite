import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const FiltersWrapper = styled(Box)`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.primary};
    gap: 10px;
    padding-left: 2px;
    margin-bottom: 20px;
    padding-bottom: 20px;
`;

interface FilterButtonProps {
    isActive: boolean;
}

const BaseFilterButton = ({ isActive, ...props }: FilterButtonProps) => (
    <Typography {...props} />
);

export const FilterButton = styled(BaseFilterButton) <FilterButtonProps>`
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.border.primary};
    text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
`;