import React from "react";
import FormContainer from "../components/FormContainer";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Formik } from "formik";
import { forgotPasswordSchema } from "../utils/formValidationSchema";

function ForgetPassword() {
  
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-slate-300 to-slate-200">
      <Formik
        validationSchema={forgotPasswordSchema}
        initialValues={{
          email: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
          <FormContainer
            className="bg-gradient-to-b from-violet-300 to-gray-400"
            title={"Reset Password"}
          >
            <CustomInput
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
            />
            <Button
              title={"Send reset link"}
              isLoading={isSubmitting}
              onClick={handleSubmit}
            />
            <div>
              <p className="text-center font-medium text-[13px]">
                Already have an account?{" "}
                <Link className="text-violet-500" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </FormContainer>
        )}
      </Formik>
    </div>
  );
}

export default ForgetPassword;
