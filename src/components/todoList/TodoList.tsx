import React, { FC } from "react";

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
        <ul>
            {currentTodos.map(todo => renderTodoItem(todo))}
        </ul>
    );
};

export default TodoList;