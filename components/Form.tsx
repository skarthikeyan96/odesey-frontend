import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const FormComponent = () => {
    return(
        <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" type="text"/>

         
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

    )
}

export default FormComponent