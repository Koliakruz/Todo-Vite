import React from "react";
import './componentsStyle/editForm.css'

function EditForm({ handleEditSubmit, handleEditChange, editingText, editErrorMessage }) {

    return (
        <form onSubmit={handleEditSubmit} className="edit-form">
            <input
                type="text"
                placeholder={editErrorMessage ? editErrorMessage : "Edit text"}
                value={editingText}
                onChange={handleEditChange}
                className={editErrorMessage ? 'error' : ''}
            />
            <button type="submit">Save</button>
        </form>
    )
}

export default EditForm;