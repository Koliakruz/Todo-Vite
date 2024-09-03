import React, { ChangeEvent, FC } from "react";
import { TextField, Button } from "@mui/material";
import { StyledForm } from "../../styledComponents/Form.styled";

interface TodoFormProps {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setNewTodo: (value: string) => void;
    newTodo: string;
    addErrorMessage: string;
}

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