import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import Filter from "./Filter";
import TodoForm from "../components/TodoForm"

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('')
    const [editingTodo, setEditingTodo] = useState(null)
    const [editingText, setEditingText] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [filter, setFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState('1')
    const itemsPerPage = 5;

    const handleFormSubmit = (newTodo) => {
        if (newTodo.trim()) {
            const updatedTodos = [...todos, { id: Math.random(), text: newTodo, completed: false }];
            setTodos(updatedTodos)
            setNewTodo('');
            setErrorMessage('');
            if (updatedTodos.length > itemsPerPage) {
                setCurrentPage(1);
            }
        } else {
            setErrorMessage('The field cannot be empty')
        }
    }

    const handleDelete = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id)
        setTodos(updatedTodos);
    }

    const handleEdit = (id, text) => {
        setEditingTodo(id);
        setEditingText(text);
        setErrorMessage('');
    }

    const handleEditSubmit = (text) => {
        ;
        if (text.trim()) {
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

    useEffect(() => {
        if (currentPage > Math.ceil(filteredTodos.length / itemsPerPage)) {
            setCurrentPage(Math.max(1, Math.ceil(filteredTodos.length / itemsPerPage)))
        }
    }, [filteredTodos, currentPage]);

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo)

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredTodos.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    }

    return (
        <div className="todo">
            <Filter
                filter={filter}
                todos={todos}
                onFilterChange={handleFilterChange}
            />
            <TodoForm
                newTodo={newTodo}
                setNewtodo={setNewTodo}
                errorMessage={errorMessage}
                handleFormSubmit={handleFormSubmit}
                setErrorMessage={setErrorMessage}
            />
            <TodoList
                todos={currentTodos}
                editingTodo={editingTodo}
                editingText={editingText}
                errorMessage={errorMessage}
                handleEditSubmit={handleEditSubmit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                toggleComplete={toggleComplete}
            />
            {filteredTodos.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredTodos.length}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}

export default Todo;