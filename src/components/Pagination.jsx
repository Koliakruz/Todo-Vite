import React from "react";
import './componentsStyle/pagination.css'

function Pagination({ currentPage, itemsPerPage, totalItems, setCurrentPage }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
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