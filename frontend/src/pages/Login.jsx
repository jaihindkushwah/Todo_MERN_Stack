import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CustomInput from "../components/CustomInput";
import FormContainer from "../components/FormContainer";
import { Formik } from "formik";
import { loginSchema } from "../utils/formValidationSchema";
import { useToast } from "@chakra-ui/react";
import { UserState } from "../context/AuthProvider";
import axios from "axios";

function Login() {
  const { setUser} = UserState();
  const toast = useToast();
  const navigation = useNavigate();

  const loginHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      navigation("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className={`w-screen h-screen flex justify-center items-center bg-gradient-to-r from-slate-300 to-slate-200`}>
      <Formik
        validationSchema={loginSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          loginHandler(values)
            .then(() => {
              setSubmitting(false);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values, errors }) => (
          <FormContainer title={"Login"} >
            <CustomInput
              value={values.email}
              onChange={handleChange}
              name={"email"}
              type="email"
              placeholder="Email"
              errorMessage={errors.email}
            />

            <CustomInput
              value={values.password}
              type="password"
              onChange={handleChange}
              name={"password"}
              placeholder="Password"
              errorMessage={errors.password}
            />

            <Button
              title={"Login"}
              type="submit"
              onClick={handleSubmit}
              isLoading={isSubmitting}
            />
            <div>
              <p className="text-center font-medium text-[13px] flex flex-col gap-2">
                <span>
                  Forgot Password?{" "}
                  <Link className="text-violet-500" to="/forgotPassword">
                    Click
                  </Link>
                </span>
                <span>
                  Don't have an account?{" "}
                  <Link className="text-violet-500" to="/SignUp">
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
          </FormContainer>
        )}
      </Formik>
    </div>
  );
}

export default Login;
