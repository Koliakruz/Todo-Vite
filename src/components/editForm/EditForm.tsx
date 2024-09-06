import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button } from "@mui/material";
import { StyledEditForm } from "./EditForm.styled";

interface EditFormProps {
    handleEditSubmit: (values: { editingText: string }) => void;
    initialText: string;
}

const validationSchema = yup.object({
    editingText: yup
        .string()
        .required("The field cannot be empty")
        .min(1, "Must be at least 1 character long"),
});

const EditForm: React.FC<EditFormProps> = ({ handleEditSubmit, initialText }) => {
    const formik = useFormik({
        initialValues: {
            editingText: initialText,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleEditSubmit(values);
        },
    });

    return (
        <StyledEditForm onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                variant="outlined"
                id="editingText"
                name="editingText"
                label="Edit task"
                value={formik.values.editingText}
                onChange={formik.handleChange}
                error={formik.touched.editingText && Boolean(formik.errors.editingText)}
                placeholder={formik.touched.editingText && formik.errors.editingText ? formik.errors.editingText : "Enter task..."}
                slotProps={{
                    inputLabel: { shrink: true },
                }}
            />
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
        </StyledEditForm>
    );
};

export default EditForm;