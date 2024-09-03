import React, { ChangeEvent, FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { StyledForm } from "../../styledComponents/Form.styled";

interface EditFormProps {
    handleEditSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editingText: string;
    editErrorMessage: string;
}

const EditForm: React.FC<EditFormProps> = ({ handleEditSubmit, handleEditChange, editingText, editErrorMessage }) => {
    return (
        <StyledForm onSubmit={handleEditSubmit}>
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
        </StyledForm>
    );
};

export default EditForm;