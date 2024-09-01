import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";

interface TodoFormProps {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setNewTodo: (value: string) => void;
    newTodo: string;
    addErrorMessage: string;
}

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
    margin-left: 10px;
    padding: 1px 6px;
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
        <Form onSubmit={handleFormSubmit}>
            <TextField
                fullWidth
                error={!!addErrorMessage}
                helperText={addErrorMessage || ""}
                placeholder={addErrorMessage ? "" : "Add a new task"}
                value={newTodo}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
            />
            <StyledButton type="submit" variant="contained" color="primary">
                Add Task
            </StyledButton>
        </Form>
    );
};

export default TodoForm;