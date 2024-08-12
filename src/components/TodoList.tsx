import React, { FC } from "react";
import TodoItem from "./TodoItem";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    currentTodos: Todo[];
    editingTodo: string | null;
    editingText: string;
    editErrorMessage: string;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    toggleComplete: (id: string) => void;
}


const TodoList: React.FC<TodoListProps> = ({ currentTodos, editingTodo, editingText, editErrorMessage, handleEditChange, handleEditSubmit, handleEdit,
    handleDelete, toggleComplete }) => {
    return (
        <ul>
            {currentTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editingTodo={editingTodo}
                    editingText={editingText}
                    editErrorMessage={editErrorMessage}
                    handleEditChange={handleEditChange}
                    handleEditSubmit={handleEditSubmit}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    toggleComplete={toggleComplete}
                />
            ))}
        </ul>
    )
}

export default TodoList;