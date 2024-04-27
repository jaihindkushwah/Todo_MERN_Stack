import React from "react";
import FormContainer from "../components/FormContainer";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { registerSchema } from "../utils/formValidationSchema";
import axios from "axios";
import { UserState } from "../context/AuthProvider";
import { useToast } from "@chakra-ui/react";

function SignUp() {
  const { setUser } = UserState();
  const toast = useToast();
  const navigation = useNavigate();
  const registerHandler = async ({ email, password, name }) => {
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast({
        title: "Account Created Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigation("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Registration Failed",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-slate-300 to-slate-200">
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          registerHandler(values)
            .then(() => {
              setSubmitting(false);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
          <FormContainer
            className="bg-gradient-to-b from-violet-300 to-gray-400"
            title={"Sign Up"}
          >
            <CustomInput
              name={"name"}
              value={values.name}
              onChange={handleChange}
              errorMessage={errors.name}
              type="text"
              placeholder="Full Name"
            />
            <CustomInput
              name={"email"}
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              type="email"
              placeholder="Email"
            />
            <CustomInput
              name={"password"}
              value={values.password}
              onChange={handleChange}
              errorMessage={errors.password}
              type="password"
              placeholder="Password"
            />
            <CustomInput
              name={"confirmPassword"}
              value={values.confirmPassword}
              onChange={handleChange}
              errorMessage={errors.confirmPassword}
              type="password"
              placeholder="Confirm Password"
            />
            <Button
              title={"Sign Up"}
              type="submit"
              onClick={handleSubmit}
              isLoading={isSubmitting}
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

export default SignUp;
