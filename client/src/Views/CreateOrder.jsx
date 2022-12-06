import React from 'react';
import OrdersForm from '../Components/OrdersForm';
import { simplePost } from '../Services/simplePost';
import moment from 'moment';

const CreateOrder = () => {
  const createOrder = async (values) => {
    try {
      const response = await simplePost(`http://localhost:8000/api/orders`, values)
      console.log(response.data)
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
