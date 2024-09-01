import React, { ChangeEvent, FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "styled-components";

interface EditFormProps {
    handleEditSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
    editingText: string;
    editErrorMessage: string;
}

const StyledForm = styled.form`
    display: flex;
    column-gap: 10px;
    align-items: center;
    flex: 1;
    margin-bottom: 0;
`;

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