import React, { ChangeEvent, FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { StyledEditForm } from "./EditForm.styled";

interface EditFormProps {
    handleEditSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editingText: string;
    editErrorMessage: string;
}

const EditForm: React.FC<EditFormProps> = ({ handleEditSubmit, handleEditChange, editingText, editErrorMessage }) => {
    return (
        <StyledEditForm onSubmit={handleEditSubmit}>
            <TextField
                type="text"
                placeholder={editErrorMessage ? editErrorMessage : "Edit task"}
                value={editingText}
                onChange={handleEditChange}
                error={Boolean(editErrorMessage)}
                variant="outlined"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
        </StyledEditForm>
    );
};

export default EditForm;