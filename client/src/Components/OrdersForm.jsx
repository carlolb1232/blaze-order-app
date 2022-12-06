import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const OrdersForm = (props) => {
  const { order_number, date, customer, onSubmitProp } = props;

  return (
    <div>
      <Formik
        initialValues={{
          order_number: order_number,
          date: date,
          customer: customer,
        }}
        validationSchema={Yup.object().shape({
          order_number: Yup.string().required("Write order_number"),
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
                  <label className="form-label" htmlFor="order_number">
                    Orden Number:
                  </label>
                  <Field
                    type="text"
                    name="order_number"
                    className="form-control"
                    placeholder="Orden Number"
                  ></Field>
                  {errors.order_number && touched.order_number && (
                    <p className="error"> {errors.order_number} </p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="date">
                    Product date:
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
                  className="btn btn-success btn-lg"
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
