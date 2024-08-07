import React from "react";
import './componentsStyle/filter.css'

function Filter({ filter, todos, handleFilterChange }) {
    return (
        <div className="filters">
            <span className={`filter ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All ({todos.length})</span>
            <span className={`filter ${filter === 'inProgress' ? 'active' : ''}`} onClick={() => handleFilterChange('inProgress')}>In Progress ({todos.filter(todo => !todo.completed).length})</span>
            <span className={`filter ${filter === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}>Completed ({todos.filter(todo => todo.completed).length})</span>
        </div>
    )
}

export default Filter;