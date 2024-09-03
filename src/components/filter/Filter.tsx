import React from "react";
import { FiltersWrapper } from "../../styledComponents/Filter.styled";
import { FilterButton } from "../../styledComponents/Filter.styled";

interface FilterProps {
    filter: string;
    todos: { id: string; text: string; completed: boolean }[];
    setFilter: (filter: string) => void;
    setCurrentPage: (page: number) => void;
}

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