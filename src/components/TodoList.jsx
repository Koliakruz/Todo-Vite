import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, editingTodo, editingText, errorMessage, handleEditSubmit, handleEdit, handleDelete, toggleComplete }) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editingTodo={editingTodo}
                    editingText={editingText}
                    errorMessage={errorMessage}
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