import React from "react";
import EditForm from "./EditForm";
import './componentsStyle/todoItem.css'

function TodoItem({ todo, handleEdit, handleDelete, handleEditSubmit, handleEditChange, editingTodo, editingText,
    editErrorMessage, toggleComplete }) {

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingTodo === todo.id ? (
                <EditForm
                    handleEditSubmit={handleEditSubmit}
                    handleEditChange={handleEditChange}
                    editingText={editingText}
                    editErrorMessage={editErrorMessage}
                />
            ) : (
                <>
                    <input className="checkbox"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                    />
                    <span className="todo-text">{todo.text}</span>
                    <button onClick={() => handleEdit(todo.id)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(todo.id)} className="delete-button">Delete</button>
                </>
            )}
        </li>
    )
}

export default TodoItem;