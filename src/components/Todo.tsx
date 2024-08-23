import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import Filter from "./Filter";
import TodoForm from "./TodoForm";
import './componentsStyle/todo.css';
import { useMutation, useQuery } from '@tanstack/react-query';

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

function Todo() {
    const [newTodo, setNewTodo] = useState<string>('');
    const [editingTodo, setEditingTodo] = useState<string | null>(null);
    const [editingText, setEditingText] = useState<string>('');
    const [addErrorMessage, setAddErrorMessage] = useState<string>('');
    const [editErrorMessage, setEditErrorMessage] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const { data: todos, refetch } = useQuery<TodoItem[]>({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await fetch('https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos', {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            const data = await response.json();
            console.log('Data fetched from API:', data);
            return data.map((todo: { id: number; title: string; completed: boolean }) => ({
                id: todo.id.toString(),
                text: todo.title,
                completed: todo.completed,
            }));
        },
        refetchOnWindowFocus: false,
    });

    const addTodoMutation = useMutation({
        mutationFn: async (newTask: string) => {
            const response = await fetch('https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos', {
                method: 'POST',
                body: JSON.stringify({
                    userId: 1,
                    title: newTask,
                    completed: false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.json();
        },
        onSuccess: () => {
            setNewTodo('');
            setAddErrorMessage('');
            setFilter('all');
            refetch().then((updatedTodos) => {
                console.log("Refetch completed after adding a new task.");
                if (updatedTodos.data) {
                    const newTotalPages = Math.ceil(updatedTodos.data.length / itemsPerPage);
                    setCurrentPage(newTotalPages);
                }
            });
        },
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodoMutation.mutate(newTodo);
        } else {
            setAddErrorMessage('The field cannot be empty');
        }
    };

    const handleDelete = async (id: string) => {
        const response = await fetch(`https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(`Task with ID ${id} deleted. Calling refetch...`);
            await refetch();
            console.log("Refetch completed after deleting a task.");
        } else {
            console.error('Failed to delete the task');
        }
    };

    const handleEdit = (id: string) => {
        const todoToEdit = todos?.find(todo => todo.id === id);
        if (todoToEdit) {
            setEditingTodo(id);
            setEditingText(todoToEdit.text);
            setEditErrorMessage('');
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingText(e.target.value);
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingText.trim() && editingTodo) {
            const response = await fetch(`https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos/${editingTodo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editingTodo,
                    title: editingText,
                    completed: false,
                }),
            });

            if (response.ok) {
                console.log(`Task with ID ${editingTodo} edited. Calling refetch...`);
                await refetch();
                console.log("Refetch completed after editing a task.");
                setEditingTodo(null);
                setEditingText('');
                setEditErrorMessage('');
            } else {
                console.error('Failed to edit the task');
                setEditErrorMessage('Failed to edit the task. Please try again.');
            }
        } else {
            setEditErrorMessage('The field cannot be empty');
        }
    };

    const toggleComplete = async (id: string) => {
        const todoToToggle = todos?.find(todo => todo.id === id);
        if (todoToToggle) {
            const response = await fetch(`https://66c8103c732bf1b79fa81b5e.mockapi.io/api/v1/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: todoToToggle.text,
                    completed: !todoToToggle.completed,
                }),
            });

            if (response.ok) {
                console.log(`Task with ID ${id} toggled. Calling refetch...`);
                await refetch();
                console.log("Refetch completed after toggling a task.");
            } else {
                console.error('Failed to toggle the task status');
            }
        }
    };

    const filteredTodos = todos?.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'inProgress') return !todo.completed;
        return true;
    }) || [];

    useEffect(() => {
        if (currentPage > Math.ceil(filteredTodos.length / itemsPerPage)) {
            setCurrentPage(Math.max(1, Math.ceil(filteredTodos.length / itemsPerPage)));
        }
    }, [filteredTodos, currentPage]);

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
        <div className="todo">
            <Filter
                filter={filter}
                todos={todos || []}
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
    );
}

export default Todo;