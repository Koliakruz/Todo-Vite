import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";

interface TodoFormProps {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setNewTodo: (value: string) => void;
    newTodo: string;
    addErrorMessage: string;
}

const StyledForm = styled.form`
    display: flex;
    column-gap: 10px;
    align-items: center;
    flex: 1;
    margin-bottom: 0;
`;

const TodoForm: FC<TodoFormProps> = ({
    handleFormSubmit,
    setNewTodo,
    newTodo,
    addErrorMessage
}) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };

    return (
        <StyledForm onSubmit={handleFormSubmit}>
            <TextField
                fullWidth
                error={!!addErrorMessage}
                placeholder={addErrorMessage ? addErrorMessage : "Add a new task"}
                value={newTodo}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
            />
            <Button type="submit" variant="contained" color="primary">
                Add
            </Button>
        </StyledForm>
    );
};

export default TodoForm;