import React from 'react';
import OrdersForm from '../Components/OrdersForm';
import { simplePost } from '../Services/simplePost';
import moment from 'moment';
import { useState } from 'react';
import { simpleGet } from '../Services/simpleGet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {

  const [ordersNumber, setOrdersNumber] = useState();
  const navigate = useNavigate()
  const getAllOrders = async() =>{
    try {
      const response = await simpleGet(`http://localhost:8000/api/orders`)
      console.log(response.data.orders.length)
      setOrdersNumber(response.data.orders.length)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllOrders()
  }, []);

  const createOrder = async (values) => {
    try {
      values.order_number = (Number(ordersNumber)+1)
      const response = await simplePost(`http://localhost:8000/api/orders`, values)
      console.log(response.data)
      navigate("/orders")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='container'>
      <h2>Create Order</h2>
      <OrdersForm order_number="" date={moment().format('YYYY-MM-DD')} customer="" onSubmitProp={createOrder}/>
    </div>
  );
}

export default CreateOrder;
