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
    align-items: center;
    flex: 1;
    margin-bottom: 0;
`;

const StyledTextField = styled(TextField)`
    flex: 1;
    margin-right: 10px;

    & .MuiInputBase-root {
        padding: 5px;
        border-radius: 5px;
    }

    & .MuiOutlinedInput-root {
        fieldset {
            border-color: #ccc;
        }
    }

    & .MuiFormHelperText-root {
        margin-top: 0;
    }
`;

const StyledButton = styled(Button)`
    padding: 5px 10px;
    font-size: 14px;
    height: 36px;
    min-width: 30px;
`;

const EditForm: React.FC<EditFormProps> = ({ handleEditSubmit, handleEditChange, editingText, editErrorMessage }) => {
    return (
        <StyledForm onSubmit={handleEditSubmit}>
            <StyledTextField
                type="text"
                placeholder="Edit text"
                value={editingText}
                onChange={handleEditChange}
                error={Boolean(editErrorMessage)}
                helperText={editErrorMessage || ""}
                variant="outlined"
                fullWidth
            />
            <StyledButton type="submit" variant="contained" color="primary">
                Save
            </StyledButton>
        </StyledForm>
    );
};

export default EditForm;