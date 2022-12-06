import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ProductsForm(props) {
  const { name, category, unit_price, status, onSubmitProp } = props;

  return (
    <div>
      <Formik
        initialValues={{
          name: name,
          category: category,
          unit_price: unit_price,
          status: status,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Write a name please"),
          category: Yup.string().required("Choose a category"),
          unit_price: Yup.number().required("Give a unit price"),
          status: Yup.string().required("Bring a status"),
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
                  <label className="form-label" htmlFor="name">
                    Product Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Product name"
                  ></Field>
                  {errors.name && touched.name && (
                    <p className="error"> {errors.name} </p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="category">
                    Category:
                  </label>
                  <Field
                    type="text"
                    as="select"
                    name="category"
                    className="form-select"
                  >
                    <option value="Cookies">Cookies</option>
                    <option value="Candies">Candies</option>
                    <option value="Cakes">Cakes</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </Field>
                  {errors.category && touched.category && (
                    <p className="error"> {errors.category} </p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="unit_price">
                    Unit Price:
                  </label>
                  <Field
                    type="number"
                    name="unit_price"
                    className="form-control"
                  ></Field>
                  {errors.unit_price && touched.unit_price && (
                    <p className="error"> {errors.unit_price} </p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="status">
                    status:
                  </label>
                  <Field
                    type="text"
                    as="select"
                    name="status"
                    className="form-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Field>
                  {errors.status && touched.status && (
                    <p className="error"> {errors.status} </p>
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
