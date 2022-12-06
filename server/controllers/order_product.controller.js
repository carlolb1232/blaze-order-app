const { OrderProduct } = require("../models/oder_product.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");


module.exports.createOneOrderProduct = async (req, res) => {
  try {
    const { quantity, idProduct, idOrder } = req.body;
    const product = await Product.find({_id:idProduct});
    const order = await Order.find({_id:idOrder}).exec();

    
    let currentOrder = order[0] 
    let currentProduct = product[0]
    const orderProduct = new OrderProduct({quantity:quantity});
    orderProduct.product = currentProduct;
    
    let cost = quantity*currentProduct.unit_price
    orderProduct.cost = cost
    
    await orderProduct.save()
    order[0].order_items.push(orderProduct)
    await order[0].save()
    
    console.log(currentOrder.subtotal)
    let subtotal = currentOrder.subtotal + cost
    let total_amount = subtotal
    console.log(subtotal);
    let city_tax = total_amount*0.10
    total_amount += city_tax
    let county_tax = total_amount*0.05
    total_amount += county_tax
    let state_tax = total_amount*0.08
    total_amount += state_tax
    let federal_tax = total_amount*0.02
    total_amount += federal_tax
    let total_taxes =  city_tax + county_tax + state_tax +federal_tax
    console.log(total_taxes);
    console.log(total_amount)
    
    const orderUpdated = await Order.findByIdAndUpdate({_id:idOrder}, {subtotal, city_tax, county_tax, state_tax, federal_tax, total_taxes, total_amount}, {new:true})
    res.json({message:"",orderUpdated:orderUpdated})
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}


module.exports.getOneOrderProduct = async (req,res) => {
  try {
    const { id } = req.params;
    const orderProduct = await OrderProduct.find({_id:id}).populate("product");
    res.json({message:"", orderProduct: orderProduct})
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}

module.exports.updateOneOrderProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const orderProduct = await OrderProduct.find({_id:id}).populate("product");
    const cost = orderProduct[0].product.unit_price*quantity 
    const orderProductUpdate = await OrderProduct.findByIdAndUpdate({_id:id}, {quantity:quantity, cost:cost}, {new:true, runValidators:true});
    res.json({message:"", orderProductUpdate: orderProductUpdate});
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}

