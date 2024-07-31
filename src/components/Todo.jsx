import React, { useState } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('')
    const [editingTodo, setEditingTodo] = useState(null)
    const [editingText, setEditingText] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            const updatedTodos = [...todos, { id: Math.random(), text: newTodo, completed: false }];
            setTodos(updatedTodos)
            setNewTodo('');
        }
    }

    const handleDelete = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id)
        setTodos(updatedTodos);
    }

    const handleEdit = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id)
        setEditingTodo(id);
        setEditingText(todoToEdit.text);
        setErrorMessage('');
    }

    const handleEditChange = (e) => {
        setEditingText(e.target.value);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editingText.trim()) {
            const updatedTodos = todos.map(todo => (todo.id === editingTodo ? { ...todo, text: editingText } : todo))
            setTodos(updatedTodos)
            setEditingTodo(null);
            setEditingText('');
            setErrorMessage('');
        } else {
            setErrorMessage('Поле не може бути порожнім')
        }

    }

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        setTodos(updatedTodos);
    }

    return (
        <div className="todo">
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={handleInputChange}
                    className={errorMessage ? 'error' : ''}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        {editingTodo === todo.id ? (
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <input
                                    type="text"
                                    placeholder={errorMessage ? errorMessage : "Edit text"}
                                    value={editingText}
                                    onChange={handleEditChange}
                                    className={errorMessage ? 'error' : ''}
                                />
                                <button type="submit">Save</button>
                            </form>
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
                ))}
            </ul>
        </div>
    )
}

export default Todo;

// console.log(todos.length !== 0 ? todos[0].id : null)