import React, { FC } from "react";
import { Checkbox, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditForm } from "../editForm";
import { StyledListItem } from "./TodoItem.styled";

interface TodoItemProps {
    todo: { id: string; text: string; completed: boolean };
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    handleEditSubmit: (values: { editingText: string }) => void;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editingTodoID: string | null;
    editingText: string;
    editErrorMessage: string;
    toggleComplete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({
    todo,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    editingTodoID,
    editingText,
    toggleComplete,
}) => {
    return (
        <StyledListItem className={todo.completed ? 'completed' : ''}>
            {editingTodoID === todo.id ? (
                <EditForm
                    handleEditSubmit={handleEditSubmit}
                    initialText={editingText}
                />
            ) : (
                <>
                    <Checkbox
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        color="primary"
                    />
                    <Typography variant="h2" style={{ flex: 1 }}>
                        {todo.text}
                    </Typography>
                    <IconButton onClick={() => handleEdit(todo.id)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(todo.id)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </>
            )}
        </StyledListItem>
    );
};

export default TodoItem;