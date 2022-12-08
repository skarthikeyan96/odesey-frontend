import React, { useEffect } from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import Button from "./Button";
import axios from "axios";
import { Router, useRouter } from "next/router";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userAction";
import useRedirectAfterSomeSeconds from "../hooks";

interface Values {
  userName: string;
  email: string;
  password: string;
}

export const renderErrorDataFromAPI = (error:any) => {
  if (error) {
    return (
      <div
        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert"
      >
        {error.detail}
      </div>
    );
  }
};


const isRequired = (message: string) => (value: any) =>
  !!value ? undefined : message;

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required"),

  userName: yup.string().min(5, "Username must be 5 charachters long").required("Username is required").matches(/^[a-zA-Z0-9]+$/igm)
});

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validateUsername(value: string) {
  let error;
 if (value === "admin") {
    error = "Nice try!";
  }

  return error;
}

const RegisterFormComponent = () => {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = React.useState(20);

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state: any) => state.user);

  React.useEffect(() => {
   
    // NEED TO Handle the flash at last
    if(success){
      const timer = setTimeout(() => {
        setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
        if (secondsRemaining === 1) router.push("/login?register=success");
      }, 1000);

      
      return () => {
        clearInterval(timer);
      };
    }

    
  }, [success, secondsRemaining]);


  const handleSubmit = async (
    values: Values,
    setSubmitting: (arg0: boolean) => void
  ) => {
    // @ts-ignore
    await dispatch(registerUser(values));
    router.push("/login?register=success");
  };



  // redirect the user after 10s to login
  // const { secondsRemaining } = useRedirectAfterSomeSeconds('/login?register=success', 10);

  return (
    <>
      {renderErrorDataFromAPI(error)}
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) =>
          handleSubmit(values, setSubmitting)
        }
        validationSchema={validationSchema}
      >
        {(formik: any) => {
          const { errors, touched, isValid, dirty } = formik;
          return (
            <>
          {
              success === true && (
              <>
                <div
                  className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                  role="alert"
                >
                  You are already registered 🚀. Please login to continue. Redirecting to login in {secondsRemaining} {secondsRemaining > 1 ? 'seconds' : 'second'} .... 
                </div>
                
              </>
              )
            }

              <Form>
                <div className="mb-6">
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <Field
                    id="userName"
                    name="userName"
                    placeholder="John"
                    validate={validateUsername}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="userName"
                    component="span"
                    className="error text-sm text-red-600"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    validate={validateEmail}
                    placeholder="john@mail.com"
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error text-sm text-red-600"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    validate={isRequired("This field is required")}
                    placeholder="....."
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error text-sm text-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-slate-800  text-white tracking-normal text-lg font-sans  py-2 px-4 rounded w-full"
                  disabled={Object.keys(errors).length !== 0}
                >
                  {loading ? (
                    <div className="flex items-center text-center justify-center">
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p> Registering ...</p>
                    </div>
                  ) : (
                    <> Sign up</>
                  )}
                </button>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterFormComponent;
