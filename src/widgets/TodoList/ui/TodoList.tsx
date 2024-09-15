import React from "react";
import { StyledList } from "./TodoList.styled";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    currentTodos: Todo[];
    renderTodoItem: (todo: Todo) => React.ReactNode;
}

const TodoList: React.FC<TodoListProps> = ({ currentTodos, renderTodoItem }) => {
    return (
        <StyledList>
            {currentTodos.map(todo => renderTodoItem(todo))}
        </StyledList>
    );
};

export default TodoList;