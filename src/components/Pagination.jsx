import React from "react";
import './componentsStyle/pagination.css'

function Pagination({ todosLength, itemsPerPage, currentPage, setCurrentPage }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todosLength / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {pageNumbers.map(number => (
                <span
                    key={number}
                    className={`page-item ${currentPage === number ? 'active' : ''}`}
                    onClick={() => setCurrentPage(number)}>
                    {number}
                </span>
            ))}
        </div>
    )
}

export default Pagination;