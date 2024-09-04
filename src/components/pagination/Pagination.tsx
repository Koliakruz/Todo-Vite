import React from "react";
import { PaginationWrapper } from "./Pagination.styled";
import { PageItem } from "./Pagination.styled";

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
        <PaginationWrapper>
            {pageNumbers.map(number => (
                <PageItem
                    key={number}
                    active={currentPage === number}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </PageItem>
            ))}
        </PaginationWrapper>
    );
};

export default Pagination;