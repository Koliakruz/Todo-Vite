import React from "react";
import './filter.css'

interface FilterProps {
    filter: string;
    todos: { id: string, text: string; completed: boolean }[];
    setFilter: (filter: string) => void;
    setCurrentPage: (page: number) => void;
}

const Filter: React.FC<FilterProps> = ({ filter, todos, setFilter, setCurrentPage }) => {

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setCurrentPage(1);
    }

    return (
        <div className="filters">
            <span className={`filter ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All ({todos.length})</span>
            <span className={`filter ${filter === 'inProgress' ? 'active' : ''}`} onClick={() => handleFilterChange('inProgress')}>In Progress ({todos.filter(todo => !todo.completed).length})</span>
            <span className={`filter ${filter === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}>Completed ({todos.filter(todo => todo.completed).length})</span>
        </div>
    )
}

export default Filter;