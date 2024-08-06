import React from "react";

function Filter({ filter, todos, onFilterChange }) {
    return (
        <div className="filters">
            <span className={`filter ${filter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>All ({todos.length})</span>
            <span className={`filter ${filter === 'inProgress' ? 'active' : ''}`} onClick={() => onFilterChange('inProgress')}>In Progress ({todos.filter(todo => !todo.completed).length})</span>
            <span className={`filter ${filter === 'completed' ? 'active' : ''}`} onClick={() => onFilterChange('completed')}>Completed ({todos.filter(todo => todo.completed).length})</span>
        </div>
    )
}

export default Filter;