import React from "react";
import styled from "styled-components";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    currentTodos: Todo[];
    renderTodoItem: (todo: Todo) => React.ReactNode;
}

const StyledList = styled.ul`
    margin-top: 20px;
    padding-inline-start: 0; 
`;

const TodoList: React.FC<TodoListProps> = ({ currentTodos, renderTodoItem }) => {
    return (
        <StyledList>
            {currentTodos.map(todo => renderTodoItem(todo))}
        </StyledList>
    );
};

export default TodoList;