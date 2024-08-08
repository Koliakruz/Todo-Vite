import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import Filter from "./Filter";
import TodoForm from "../components/TodoForm"
import './componentsStyle/todo.css'
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('')
    const [editingTodo, setEditingTodo] = useState(null)
    const [editingText, setEditingText] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [filter, setFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState('1')
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchTodos = async () => {
            const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await responce.json();
            const mappedTodos = data.map(todo => ({
                id: uuidv4(),
                text: todo.title,
                completed: todo.completed
            }));
            setTodos(mappedTodos);
        }
        fetchTodos();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            const updatedTodos = [...todos, { id: uuidv4(), text: newTodo, completed: false }];
            setTodos(updatedTodos)
            setNewTodo('');
            setErrorMessage('');
            setCurrentPage(Math.ceil(updatedTodos.length / itemsPerPage));
        } else {
            setErrorMessage('The field cannot be empty')
        }
    }

    const handleDelete = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        if (currentPage > Math.ceil(updatedTodos.length / itemsPerPage)) {
            setCurrentPage(Math.ceil(updatedTodos.length / itemsPerPage));
        }
    };

    const handleEdit = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        setEditingTodo(id);
        setEditingText(todoToEdit.text);
        setErrorMessage('');
    };

    const handleEditChange = (e) => {
        setEditingText(e.target.value);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault(e);
        if (editingText.trim()) {
            const updatedTodos = todos.map(todo => (todo.id === editingTodo ? { ...todo, text: editingText } : todo));
            setTodos(updatedTodos);
            setEditingTodo(null);
            setEditingText('');
            setErrorMessage('');
        } else {
            setErrorMessage('The field cannot be empty');
        }
    };

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

    return (
        <div className="todo">
            <Filter
                filter={filter}
                todos={todos}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
            />
            <TodoForm
                setNewTodo={setNewTodo}
                handleFormSubmit={handleFormSubmit}
                newTodo={newTodo}
                errorMessage={errorMessage}
            />
            <TodoList
                currentTodos={currentTodos}
                editingTodo={editingTodo}
                editingText={editingText}
                errorMessage={errorMessage}
                handleEditChange={handleEditChange}
                handleEditSubmit={handleEditSubmit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                toggleComplete={toggleComplete}
            />
            {filteredTodos.length > itemsPerPage && (
                <Pagination
                    todosLength={filteredTodos.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}

export default Todo;