import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

interface PaginationProps {
    todosLength: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const PaginationWrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
`;

const PageItem = styled(({ active, ...props }: { active: boolean } & React.ComponentProps<typeof Box>) => (
    <Box {...props} />
))`
    cursor: pointer;
    padding: 10px;
    border: 2px solid #007bff;
    border-radius: 4px;
    color: ${({ active }) => (active ? "white" : "#007bff")};
    background-color: ${({ active }) => (active ? "#007bff" : "transparent")};
    user-select: none;
`;

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