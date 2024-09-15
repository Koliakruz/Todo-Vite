import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import { StyledTodoForm } from "./TodoForm.styled";
import * as Yup from "yup";

interface TodoFormProps {
    handleFormSubmit: (newTodo: string) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ handleFormSubmit }) => {
    const validationSchema = Yup.object({
        newTodo: Yup.string()
            .trim()
            .required("The field cannot be empty"),
    });

    const formik = useFormik({
        initialValues: {
            newTodo: "",
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values, { resetForm }) => {
            await handleFormSubmit(values.newTodo);
            resetForm();
        },
    });

    return (
        <StyledTodoForm onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                error={Boolean(formik.errors.newTodo && formik.submitCount > 0)}
                placeholder={
                    formik.errors.newTodo && formik.submitCount > 0
                        ? formik.errors.newTodo
                        : "Add a new task"
                }
                {...formik.getFieldProps("newTodo")}
                variant="outlined"
                size="small"
            />
            <Button type="submit" variant="contained" color="primary">
                Add
            </Button>
        </StyledTodoForm>
    );
};

export default TodoForm;