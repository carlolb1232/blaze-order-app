import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { simpleGet } from '../Services/simpleGet';
import moment from 'moment';

const OrdersList = () => {

  const [orders, setOrders] = useState();
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const response = await simpleGet("http://localhost:8000/api/orders")
      console.log(response.data.orders)
      setOrders(response.data.orders)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOrders()
  }, []);

  return (
    <div className='container'>
      <h2 className='sub-title'>Orders</h2>
      <button className='btn btn-primary create-button mb-4' onClick={()=>navigate("/create-order")}>Create Order</button>
      <table className='table table-bordered border-secondary'>
        <thead>
          <tr className='table-active'>
            <th>N°</th>
            <th>Consumer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            orders&&
            orders.map((order,idx)=>{
              return(
                <tr key={order._id}>
                  <td>
                    {order.order_number}
                  </td>
                  <td>
                    {order.customer}
                  </td>
                  <td>
                    {order.status}
                  </td>
                  <td>
                    {moment(order.date).add('days', 1).format('DD-MM-YYYY')}
                  </td>
                  <td>
                    ${order.total_amount.toFixed(2)}
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`}>
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

export default OrdersList;
