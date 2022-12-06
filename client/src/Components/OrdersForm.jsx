import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const OrdersForm = (props) => {
  const { date, customer, onSubmitProp } = props;

  return (
    <div>
      <Formik
        initialValues={{
          date: date,
          customer: customer,
        }}
        validationSchema={Yup.object().shape({
          date: Yup.date().required("Choose a date"),
          customer: Yup.string().required("Write a customer"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitProp(values);
          console.log(values);
        }}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <div className="mb-3">
              <Form>
                <div className="form-group">
                  <label className="form-label" htmlFor="date">
                    Order date:
                  </label>
                  <Field
                    type="date"
                    name="date"
                    className="form-control"
                    placeholder="Date"
                  ></Field>
                  {errors.date && touched.date && (
                    <p className="error"> {errors.date} </p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="customer">
                    Customer:
                  </label>
                  <Field
                    type="text"
                    name="customer"
                    className="form-control"
                    placeholder="Customer"
                  ></Field>
                  {errors.customer && touched.customer && (
                    <p className="error"> {errors.customer} </p>
                  )}
                </div>
                
              
                <button
                  disabled={
                    Object.values(errors).length > 0
                  }
                  className="btn btn-success btn-lg mt-5"
                  type="submit"
                >
                  SUBMIT
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default OrdersForm;
