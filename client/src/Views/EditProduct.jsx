import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsForm from '../Components/ProductsForm';
import { simpleDelete } from '../Services/simpleDelete';
import { simpleGet } from '../Services/simpleGet';
import { simplePut } from '../Services/simplePut';

const EditProduct = () => {
  // const [errors, setErrors] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [errors, setErrors] = useState();



  const getOneProduct = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/products/${id}`)
      console.log(response.data.product[0])
      setProduct(response.data.product[0])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOneProduct()
  }, []);

  const editProduct = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/products/${id}`, values)
      console.log(response.data)
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

  const deleteProduct = async () =>{
    try {
      const response = await simpleDelete(`http://localhost:8000/api/products/${id}`)
      console.log(response.data)
      navigate("/products")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    

    <div className='container'>
      <h2>Edit Product</h2>
      {errors?.map((error, index) => <p key={index} className="alert alert-danger">{error}</p>)}
      {
        product&&
        <ProductsForm name={product.name} category={product.category} unit_price={product.unit_price} status={product.status} onSubmitProp={editProduct}/>
      }
      <button className='btn btn-danger' onClick={()=>deleteProduct()}>DELETE PRODUCT</button>
    </div>
  );
}

export default EditProduct;
