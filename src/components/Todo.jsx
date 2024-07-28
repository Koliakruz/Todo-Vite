import React, { useState } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('')
    const [editingTodo, setEditingTodo] = useState(null)
    const [editingText, setEditingText] = useState('')

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, { id: Math.random(), text: newTodo }])
            setNewTodo('');
        }
    }

    // console.log(todos)
    // console.log(todos.length !== 0 ? todos[0].id : null)

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleEdit = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id)
        setEditingTodo(id);
        setEditingText(todoToEdit.text);
    }

    const handleEditChange = (e) => {
        setEditingText(e.target.value);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setTodos(todos.map(todo => (todo.id === editingTodo ? { ...todo, text: editingText } : todo)))
        setEditingTodo(null);
        setEditingText('');
    }

    return (
        <div className="todo">
            <h2>My Todo Items</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        {editingTodo === todo.id ? (
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={handleEditChange}
                                />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <>
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