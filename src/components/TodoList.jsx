import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ currentTodos, editingTodo, editingText, errorMessage, handleEditChange, handleEditSubmit, handleEdit,
    handleDelete, toggleComplete }) {
    return (
        <ul>
            {currentTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editingTodo={editingTodo}
                    editingText={editingText}
                    errorMessage={errorMessage}
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