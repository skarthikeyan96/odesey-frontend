import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Button from "./Button";
import axios from "axios";
import { Router, useRouter } from "next/router";
interface Values {
  userName: string;
  email: string;
  password: string;
}

const RegisterFormComponent = () => {

    const router = useRouter()

    
  const handleSubmit = async (
    values: Values,
    setSubmitting: (arg0: boolean) => void
  ) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:8080/user/create", {
        body: JSON.stringify({
            email: values.email,
            password: values.password,
            username: values.userName
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      console.log(response.status)

      if(response.status === 201){
        router.push('/login', undefined, {shallow: true})
      }

      const data = await response.json()
      console.log(data);
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
    >
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
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            placeholder="john@mail.com"
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            placeholder="....."
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <Button type="submit" text="Sign up" />
      </Form>
    </Formik>
  );
};

export default RegisterFormComponent;
