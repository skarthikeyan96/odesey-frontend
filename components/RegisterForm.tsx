import React from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import Button from "./Button";
import axios from "axios";
import { Router, useRouter } from "next/router";
import * as yup from "yup";

interface Values {
  userName: string;
  email: string;
  password: string;
}

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
  if (!value) {
    error = "Required";
  }else if (value === "admin") {
    error = "Nice try!";
  } else if (!/^[a-zA-Z0-9]+$/.test(value)){
    error = "Invalid username"
  }
  return error;
}

const RegisterFormComponent = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: Values,
    setSubmitting: (arg0: boolean) => void
  ) => {
    try {
      const response = await fetch("http://localhost:8080/user/create", {
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          username: values.userName,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      console.log(response.status);

      if (response.status === 201) {
        router.push("/login?register=success");
      }

      // const data = await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
              Sign up
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormComponent;
