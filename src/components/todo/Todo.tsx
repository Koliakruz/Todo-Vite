import React, { useState, useEffect, useMemo } from "react";
import { TodoList } from '../todoList'
import { Pagination } from "../pagination";
import { Filter } from "../filter";
import { TodoForm } from "../todoForm";
import { TodoItem } from "../todoItem";
import { useTodos } from "../../hooks/useTodos";
import { TodoWrapper } from "./Todo.styled";

const Todo: React.FC = () => {
    const [editingTodoID, setEditingTodoID] = useState<string | null>(null);
    const [editingText, setEditingText] = useState<string>('');
    const [editErrorMessage, setEditErrorMessage] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const { todos, refetchTodos, addTodo, deleteTodo, editTodo, toggleComplete } = useTodos();

    const handleFormSubmit = async (newTodo: string) => {
        await addTodo(newTodo);
        setFilter('all');
        refetchTodos().then((updatedTodos) => {
            if (updatedTodos.data) {
                const newTotalPages = Math.ceil(updatedTodos.data.length / itemsPerPage);
                setCurrentPage(newTotalPages);
            }
        });
    };

    const handleEdit = (id: string) => {
        const todoToEdit = todos?.find(todo => todo.id === id);
        if (todoToEdit) {
            setEditingTodoID(id);
            setEditingText(todoToEdit.text);
            setEditErrorMessage('');
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingText(e.target.value);
    };

    const handleEditSubmit = (values: { editingText: string }) => {
        if (editingTodoID) {
            editTodo({
                id: editingTodoID,
                title: values.editingText,
            })
                .then(() => {
                    setEditingTodoID(null);
                    refetchTodos();
                })
                .catch(() => {
                    setEditErrorMessage("Failed to edit the task. Please try again.");
                });
        }
    };

    const filteredTodos = useMemo(() => {
        return todos?.filter(todo => {
            if (filter === 'completed') return todo.completed;
            if (filter === 'inProgress') return !todo.completed;
            return true;
        }) || [];
    }, [todos, filter]);

    useEffect(() => {
        if (currentPage > Math.ceil(filteredTodos.length / itemsPerPage)) {
            setCurrentPage(Math.max(1, Math.ceil(filteredTodos.length / itemsPerPage)));
        }
    }, [filteredTodos, currentPage]);

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
        <TodoWrapper>
            <Filter
                filter={filter}
                todos={todos || []}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
            />
            <TodoForm
                handleFormSubmit={handleFormSubmit}
            />
            <TodoList
                currentTodos={currentTodos}
                renderTodoItem={(todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        editingTodoID={editingTodoID}
                        editingText={editingText}
                        editErrorMessage={editErrorMessage}
                        handleEditChange={handleEditChange}
                        handleEditSubmit={handleEditSubmit}
                        handleEdit={handleEdit}
                        handleDelete={deleteTodo}
                        toggleComplete={toggleComplete}
                    />
                )}
            />
            {filteredTodos.length > itemsPerPage && (
                <Pagination
                    todosLength={filteredTodos.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </TodoWrapper>
    );
};

export default Todo;