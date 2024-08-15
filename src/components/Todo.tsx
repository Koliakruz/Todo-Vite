import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import Filter from "./Filter";
import TodoForm from "./TodoForm";
import './componentsStyle/todo.css';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

function Todo() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState<string>('')
    const [editingTodo, setEditingTodo] = useState<string | null>(null)
    const [editingText, setEditingText] = useState<string>('')
    const [addErrorMessage, setAddErrorMessage] = useState<string>('');
    const [editErrorMessage, setEditErrorMessage] = useState<string>('');
    const [filter, setFilter] = useState<string>('all')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 5;
    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchTodos = async () => {
            const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await responce.json();
            const mappedTodos: TodoItem[] = data.map((todo: any) => ({
                id: uuidv4(),
                text: todo.title,
                completed: todo.completed
            }));
            setTodos(mappedTodos);
        }
        fetchTodos();
    }, []);

    const addTodoMutation = useMutation({
        mutationFn: async (newTask: string) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify({
                    title: newTask,
                    completed: false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.json();
        },
        onSuccess: (data) => {
            const newTodo: TodoItem = {
                id: uuidv4(),
                text: data.title,
                completed: data.completed,
            };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTodo('');
            setAddErrorMessage('');
            setFilter('all');
            setCurrentPage(Math.ceil((todos.length + 1) / itemsPerPage));
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodoMutation.mutate(newTodo);
        } else {
            setAddErrorMessage('The field cannot be empty')
        }
    }

    const handleDelete = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        if (currentPage > Math.ceil(updatedTodos.length / itemsPerPage)) {
            setCurrentPage(Math.ceil(updatedTodos.length / itemsPerPage));
        }
    };

    const handleEdit = (id: string) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setEditingTodo(id);
            setEditingText(todoToEdit.text);
            setEditErrorMessage('');
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingText(e.target.value);
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingText.trim()) {
            const updatedTodos = todos.map(todo => (todo.id === editingTodo ? { ...todo, text: editingText } : todo));
            setTodos(updatedTodos);
            setEditingTodo(null);
            setEditingText('');
            setEditErrorMessage('');
        } else {
            setEditErrorMessage('The field cannot be empty');
        }
    };

    const toggleComplete = (id: string) => {
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
                addErrorMessage={addErrorMessage}
            />
            <TodoList
                currentTodos={currentTodos}
                editingTodo={editingTodo}
                editingText={editingText}
                editErrorMessage={editErrorMessage}
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