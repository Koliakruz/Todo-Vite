import React, { useState } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('')
    const [editingTodo, setEditingTodo] = useState(null)
    const [editingText, setEditingText] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [filter, setFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState('1')
    const itemsPerPage = 5;

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            const updatedTodos = [...todos, { id: Math.random(), text: newTodo, completed: false }];
            setTodos(updatedTodos)
            setNewTodo('');
            setErrorMessage('');
        } else {
            setErrorMessage('The field cannot be empty')
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
            setErrorMessage('The field cannot be empty')
        }
    }

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        setTodos(updatedTodos);
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'inProgress') return !todo.completed;
        return true;
    })

    const allCount = todos.length;
    const inProgressCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.filter(todo => todo.completed).length

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo)

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredTodos.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="todo">
            <div className="filters">
                <span
                    className={`filter ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}> All ({allCount}) </span>
                <span
                    className={`filter ${filter === 'inProgress' ? 'active' : ''}`}
                    onClick={() => setFilter('inProgress')}> In Progress ({inProgressCount}) </span>
                <span
                    className={`filter ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}> Completed ({completedCount})</span>
            </div>
            <form onSubmit={handleFormSubmit} className="submit-form">
                <input
                    type="text"
                    placeholder={errorMessage ? errorMessage : "Add a new task"}
                    value={newTodo}
                    onChange={handleInputChange}
                    className={errorMessage ? 'error' : ''}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {currentTodos.map(todo => (
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

            <div className="pagination">
                {pageNumbers.map(number => (
                    <span
                        key={number}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                        onClick={() => handlePageClick(number)} >
                        {number}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Todo;