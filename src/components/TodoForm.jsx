import React from "react";

function TodoForm({ newTodo, setNewtodo, errorMessage, handleFormSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(newTodo);
    }

    return (
        <form onSubmit={handleSubmit} className="submit-form">
            <input
                type="text"
                placeholder={errorMessage ? errorMessage : "Add a new task"}
                value={newTodo}
                onChange={(e) => setNewtodo(e.target.value)}
                className={errorMessage ? 'error' : ''}
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TodoForm;