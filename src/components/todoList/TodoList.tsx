import React from "react";
import { List } from "@mui/material";

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
        <List>
            {currentTodos.map(todo => renderTodoItem(todo))}
        </List>
    );
};

export default TodoList;