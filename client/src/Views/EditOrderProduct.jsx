import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OrderProductForm from '../Components/OrderProductForm';
import { simpleGet } from '../Services/simpleGet';
import { simplePut } from '../Services/simplePut';

const EditOrderProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderProduct, setOrderProduct] = useState();

  const getOneOrderProduct = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/order_product/${id}`)
      console.log(response.data.orderProduct[0])
      setOrderProduct(response.data.orderProduct[0])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOneOrderProduct()
  }, []);

  const updateOrderProduct = async (values) => {
    try {
      const response = await simplePut(`http://localhost:8000/api/order_product/${id}`, values)
      console.log(response.data)
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='container'>
      <h2>Editar comanda</h2>
      {
        orderProduct&&
        <OrderProductForm quantity={orderProduct.quantity} idProduct={orderProduct.product._id} onSubmitProp={updateOrderProduct}/>
      }
    </div>
  );
}

export default EditOrderProduct;
