import React from "react";
import './pagination.css'

interface PaginationProps {
    todosLength: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ todosLength, itemsPerPage, currentPage, setCurrentPage }) => {

    const pageNumbers: number[] = [];
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