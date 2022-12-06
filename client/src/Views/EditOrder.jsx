import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { simpleGet } from '../Services/simpleGet';
import moment from 'moment';
import { simpleDelete } from '../Services/simpleDelete';
import { simplePut } from '../Services/simplePut';

const EditOrder = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();


  const [order, setOrder] = useState();
  const [orderProducts, setOrderProducts] = useState();
  const [updateWarning, setUpdateWarning] = useState(false);

  const getOrder = async () =>{
    try {
      const response = await simpleGet(`http://localhost:8000/api/orders/${id}`)
      console.log(response.data.order)
      setOrder(response.data.order)
    } catch (err) {
      console.log(err)
    }
  }

  const getOrderProducts = async () => {
    try {
      const response = await simpleGet(`http://localhost:8000/api/orders_products/${id}`)
      console.log("reviews", response.data.orderProducts)
      setOrderProducts(response.data.orderProducts)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getOrder()
    getOrderProducts()
  }, []);
  
  useEffect(() => {
    getOrder()
    getOrderProducts()
  }, [updateWarning]);

  const deleteOrderProduct = async (id) => {
    try {
      const response = await simpleDelete(`http://localhost:8000/api/order_product/${id}`)
      console.log(response.data)
      setOrderProducts((orderProducts)=>orderProducts.filter(orderProduct=>orderProduct._id!==id))
      setUpdateWarning((oldUpdate)=>!oldUpdate)
    } catch (err) {
      console.log(err)
    }
  }
  
  const updateOrder = async (updatedStatus) =>{
    try {
      const response = await simplePut(`http://localhost:8000/api/orders/${id}`, {status:updatedStatus})
      console.log(response.data)
      navigate("/orders")
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className='container'>
      <div className="data-container">
        <h2 className='mb-3'>Order N°{order?.order_number}</h2>
        <h4>Customer: {order?.customer}</h4>
        <h4>Status: {order?.status}</h4>
        <h4>Date: {moment(order?.date).add('days', 1).format('DD-MM-YYYY')}</h4>
      </div>

      <table className='table table-bordered border-secondary'>
        <thead>
          <tr className='table-active'>
            <th>N°</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            orderProducts&&
            orderProducts.map((orderProduct, idx) => {
              return(
                <tr key={orderProduct._id}>
                  <td>{idx + 1}</td>
                  <td>{orderProduct.product.name}</td>
                  <td>{orderProduct.quantity}</td>
                  <td>${orderProduct.product.unit_price}</td>
                  <td>${orderProduct.cost.toFixed(2)}</td>
                  <td className='action-container'>
                    <Link to={`/edit/order-product/${orderProduct._id}`}>Edit</Link>
                    <Link onClick={()=>deleteOrderProduct(orderProduct._id)}>Delete</Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="button-container">
        <button className='btn btn-primary btn-lg' onClick={()=>navigate(`/create/order-product/${id}`)}>Add Item+</button>
      </div>
      <div className="count-container mt-5">
        <ul>
          <li><span className='price-tags'> Subtotal: </span>${order?.subtotal.toFixed(2)}</li>
          <li className='price-tags'> Taxes</li>
          <ul>
            <li><span className='price-tags'> Total City Tax :</span>${order?.city_tax.toFixed(2)}</li>
            <li><span className='price-tags'> Total County Tax :</span>${order?.county_tax.toFixed(2)}</li>
            <li><span className='price-tags'> Total State Tax :</span>${order?.state_tax.toFixed(2)}</li>
            <li><span className='price-tags'> Total Federal Tax :</span>${order?.federal_tax.toFixed(2)}</li>
          </ul>
          <li><span className='price-tags'> Total Taxes: </span>${order?.total_taxes.toFixed(2)}</li>
          <li><span className='price-tags'> Total:</span>${order?.total_amount.toFixed(2)}</li>
        </ul>
      </div>
      <div className="button-container">
        <button className='btn btn-success btn-lg' onClick={()=>updateOrder("Completed")}>Complete Order</button>
        <button className='btn btn-danger btn-lg' onClick={()=>updateOrder("Rejected")}>Reject Order</button>
      </div>
    </div>
  );
}

export default EditOrder;
