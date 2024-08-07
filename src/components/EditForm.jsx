import React from "react";
import './componentsStyle/editForm.css'

function EditForm({ editingText, errorMessage, handleEditChange, handleEditSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditSubmit(editingText);
    }
    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <input
                type="text"
                placeholder={errorMessage ? errorMessage : "Edit text"}
                value={editingText}
                onChange={handleEditChange}
                className={errorMessage ? 'error' : ''}
            />
            <button type="submit">Save</button>
        </form>
    )
}

export default EditForm;