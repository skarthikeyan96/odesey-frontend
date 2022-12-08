import React from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { userLogin } from "../redux/userAction";
import { renderErrorDataFromAPI } from "./RegisterForm";
interface Values {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required("Password is required"),
});

function validateEmail(value:string) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}


const LoginFormComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state: any) => state.user);

  const handleSubmit = async (
    values: Values,
    setSubmitting: (arg0: boolean) => void
  ) => {

    //@ts-ignore
    await dispatch(userLogin(values))
    router.push("/admin/dashboard");


  };

  return (
    <>
     {renderErrorDataFromAPI(error)}
      {router.query.register && (
        <>
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            Registered Successfully. Please login to start your journey
          </div>
        </>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {(formik: any) => {
          const { errors, touched, isValid, dirty } = formik;
          return (
            <Form className="pt-4">
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
                      <p> Logging in  ...</p>
                    </div>
                  ) : (
                    <> Sign in</>
                  )}
                </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginFormComponent;
