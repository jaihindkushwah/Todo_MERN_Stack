import * as yup from "yup";

export const loginSchema=yup.object().shape({
    email:yup.string().trim().email("Enter a valid email").required("Email is required"),
    password:yup.string().trim().required("Password is required").min(8,"Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be like Abc@1234"),
})
export const registerSchema=yup.object().shape({
    name:yup.string().trim().required("Name is required"),
    email:yup.string().trim().email("Enter a valid email").required("Email is required"),
    password:yup.string().trim().required("Password is required").min(8,"Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be like Abc@1234"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),null],"Password must match")
})

export const forgotPasswordSchema=yup.object().shape({
    email:yup.string().trim().email("Enter a valid email").required("Email is required"),
})
export const taskSchema=yup.object().shape({
    name:yup.string().trim().required("Task Name is required"),
    description:yup.string().trim().required("Description is required"),
    endDate:yup.date().required("End Date and Time is required"),
})