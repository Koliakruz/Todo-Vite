import React from "react";
import './componentsStyle/editForm.css'

function EditForm({ handleEditSubmit, handleEditChange, editingText, errorMessage }) {

    return (
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
    )
}

export default EditForm;