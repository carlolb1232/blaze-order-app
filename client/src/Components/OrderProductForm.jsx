import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { simpleGet } from "../Services/simpleGet";

const OrderProductForm = (props) => {
  const { quantity, idProduct, onSubmitProp } = props;
  const [products, setProducts] = useState();


  const getAllProducts = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/products/`)
      console.log(response.data.products)
      setProducts(response.data.products)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, []);
  

  return (
    <div>
      <Formik
        initialValues={{
          quantity: quantity,
          idProduct: idProduct,
        }}
        validationSchema={Yup.object().shape({
          quantity: Yup.number().required("Write quantity"),
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
                  <label className="form-label" htmlFor="quantity">
                    Quantity:
                  </label>
                  <Field
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Orden Number"
                  ></Field>
                  {errors.quantity && touched.quantity && (
                    <p className="error"> {errors.quantity} </p>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="idProduct">
                  Product:
                  </label>
                  <Field
                    type="text"
                    as="select"
                    name="idProduct"
                    className="form-select"
                  >
                  <option value={""} disabled>--ELIJA UN PRODUCTO--</option>
                    {
                      products&&
                      products.map(product=>{
                        return(
                          <option value={product._id}>{product.name}</option>
                        )
                      })
                    }
                    {/* <option value="Candies">Candies</option>
                    <option value="Cakes">Cakes</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option> */}
                  </Field>
                  {errors.product && touched.product && (
                    <p className="error"> {errors.product} </p>
                  )}
                </div>

                <button
                  disabled={Object.values(errors).length > 0}
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
};

export default OrderProductForm;
