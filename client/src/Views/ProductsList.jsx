import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { simpleGet } from '../Services/simpleGet';
import { simplePut } from '../Services/simplePut';

const ProductsList = () => {
  
  const [products, setProducts] = useState();
  const navigate = useNavigate();

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
    <div className='container'>
      <h2 className='sub-title'>
        Products
      </h2>
      <button className='btn btn-primary create-button mb-4' onClick={()=>navigate("/create-product")}>CREATE PRODUCT</button>
      <table className='table table-bordered border-secondary'>
        <thead>
          <tr className='table-active'>
            <th>N°</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products&&
            products.map((product,idx)=>{
              return(
                <tr key={product._id}>
                  <td>
                    {idx+1}
                  </td>
                  <td>
                    {product.name}
                  </td>
                  <td>
                    ${product.unit_price}
                  </td>
                  <td>
                    {product.status}
                  </td>
                  <td>
                    <Link to={`/edit-product/${product._id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
