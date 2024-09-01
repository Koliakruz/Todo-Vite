import React, { FC } from "react";
import { Checkbox, IconButton, ListItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { EditForm } from "../editForm";

interface TodoItemProps {
    todo: { id: string; text: string; completed: boolean };
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editingTodoID: string | null;
    editingText: string;
    editErrorMessage: string;
    toggleComplete: (id: string) => void;
}

const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;

    &.completed .todo-text {
        text-decoration: line-through;
        color: grey;
    }
`;

const TodoItem: FC<TodoItemProps> = ({
    todo,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleEditChange,
    editingTodoID,
    editingText,
    editErrorMessage,
    toggleComplete,
}) => {
    return (
        <StyledListItem className={todo.completed ? 'completed' : ''}>
            {editingTodoID === todo.id ? (
                <EditForm
                    handleEditSubmit={handleEditSubmit}
                    handleEditChange={handleEditChange}
                    editingText={editingText}
                    editErrorMessage={editErrorMessage}
                />
            ) : (
                <>
                    <Checkbox
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        color="primary"
                    />
                    <Typography className="todo-text" style={{ flex: 1 }}>
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