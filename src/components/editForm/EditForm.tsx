import React, { ChangeEvent, FormEvent } from "react";
import './editForm.css'

interface EditFormProps {
    handleEditSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editingText: string;
    editErrorMessage: string;
}

const EditForm: React.FC<EditFormProps> = ({ handleEditSubmit, handleEditChange, editingText, editErrorMessage }) => {

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