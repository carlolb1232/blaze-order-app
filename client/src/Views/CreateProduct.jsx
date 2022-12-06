import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsForm from '../Components/ProductsForm';
import { simplePost } from '../Services/simplePost';

const CreateProduct = () => {

  const [errors, setErrors] = useState();
  const navigate = useNavigate()
  
  const createProduct = async (values) => {
    try {
      const response = await simplePost(`http://localhost:8000/api/products/`, values);
      console.log(response.data);
      if (response.data.message === "") {
        console.log(response.data);
        navigate("/products")
      } else {
        console.log("ERRORS", response.data);
        const errorResponse = response.data.errors;
        console.log("Object keys", Object.keys(errorResponse));
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          console.log(errorResponse[key]);
          errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    

    <div className='container'>
      <h2>Create Product</h2>
      {errors?.map((error, index) => <p key={index} className="alert alert-danger">{error}</p>)}
      <ProductsForm name="" category="Cookies" unit_price={0} status="Active" onSubmitProp={createProduct}/>
    </div>
  );
}

export default CreateProduct;
