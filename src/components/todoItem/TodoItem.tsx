import React, { FC } from "react";
import { EditForm } from '../editForm'
import './todoItem.css';

interface TodoItemProps {
    todo: { id: string; text: string; completed: boolean };
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editingTodoID: string | null;
    editingText: string;
    editErrorMessage: string;
    toggleComplete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({
    todo,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleEditChange,
    editingTodoID,
    editingText,
    editErrorMessage,
    toggleComplete,
}) => {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingTodoID === todo.id ? (
                <EditForm
                    handleEditSubmit={handleEditSubmit}
                    handleEditChange={handleEditChange}
                    editingText={editingText}
                    editErrorMessage={editErrorMessage}
                />
            ) : (
                <>
                    <input
                        className="checkbox"
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
    );
};

export default TodoItem;
