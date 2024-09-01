import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

interface FilterProps {
    filter: string;
    todos: { id: string; text: string; completed: boolean }[];
    setFilter: (filter: string) => void;
    setCurrentPage: (page: number) => void;
}

const FiltersWrapper = styled(Box)`
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

const FilterButton = styled(({ isActive, ...props }: FilterButtonProps & React.ComponentProps<typeof Typography>) => (
    <Typography {...props} />
))`
    font-size: 14px;
    cursor: pointer;
    color: grey;
    text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
    font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
`;

const Filter: React.FC<FilterProps> = ({ filter, todos, setFilter, setCurrentPage }) => {

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    return (
        <FiltersWrapper>
            <FilterButton
                isActive={filter === 'all'}
                onClick={() => handleFilterChange('all')}
            >
                All ({todos.length})
            </FilterButton>
            <FilterButton
                isActive={filter === 'inProgress'}
                onClick={() => handleFilterChange('inProgress')}
            >
                In Progress ({todos.filter(todo => !todo.completed).length})
            </FilterButton>
            <FilterButton
                isActive={filter === 'completed'}
                onClick={() => handleFilterChange('completed')}
            >
                Completed ({todos.filter(todo => todo.completed).length})
            </FilterButton>
        </FiltersWrapper>
    );
};

export default Filter;