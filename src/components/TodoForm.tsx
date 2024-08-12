import React, { ChangeEvent, FC } from "react";
import './componentsStyle/todoForm.css'

interface TodoFormProps {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setNewTodo: (value: string) => void;
    newTodo: string;
    addErrorMessage: string;
}

const TodoForm: FC<TodoFormProps> = ({ handleFormSubmit, setNewTodo, newTodo, addErrorMessage }) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };

    return (
        <form onSubmit={handleFormSubmit} className="submit-form">
            <input
                type="text"
                placeholder={addErrorMessage ? addErrorMessage : "Add a new task"}
                value={newTodo}
                onChange={handleInputChange}
                className={addErrorMessage ? 'error' : ''}
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TodoForm;