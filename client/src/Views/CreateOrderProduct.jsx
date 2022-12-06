import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OrderProductForm from '../Components/OrderProductForm';
import { simplePost } from '../Services/simplePost';

const CreateOrderProduct = () => {
  const {idOrder} = useParams();
  const navigate = useNavigate()

  const createOrderProduct = async (values) =>{
    try {
      values.idOrder=idOrder
      console.log("values,. afuera", values)
      const response = await simplePost(`http://localhost:8000/api/order_product`, values)
      console.log(response.data)
      navigate(`/orders/${idOrder}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='container'>
      <h2>Create Order Product</h2>
      <OrderProductForm quantity={0} idProduct="" onSubmitProp={createOrderProduct}/>
    </div>
  );
}

export default CreateOrderProduct;
