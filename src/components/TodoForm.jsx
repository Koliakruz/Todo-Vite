import React from "react";
import './componentsStyle/todoForm.css'

function TodoForm({ handleFormSubmit, setNewTodo, newTodo, errorMessage }) {

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    return (
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
    )
}

export default TodoForm;