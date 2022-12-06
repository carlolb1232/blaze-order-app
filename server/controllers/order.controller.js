const { Order } = require("../models/order.model")

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.json({ message: "", orders: orders })
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.getOneOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.find({ _id: id }).populate({
      path: 'order_items',
      populate: {
        path: 'product',
        model: 'Product'
      }
    })
      .exec();
      let subtotal = 0
    order[0].order_items.map(order_item=>{
      subtotal += order_item.quantity*order_item.product.unit_price
    })
    order.subtotal = subtotal 
    let total_amount = subtotal
    let city_tax = total_amount * 0.10
    total_amount += city_tax
    let county_tax = total_amount * 0.05
    total_amount += county_tax
    let state_tax = total_amount * 0.08
    total_amount += state_tax
    let federal_tax = total_amount * 0.02
    total_amount += federal_tax
    let total_taxes = city_tax + county_tax + state_tax + federal_tax

    const orderUpdated = await Order.findByIdAndUpdate({ _id: id }, { subtotal, city_tax, county_tax, state_tax, federal_tax, total_taxes, total_amount }, { new: true })

    res.json({ message: "", order: orderUpdated })
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.createOneOrder = async (req, res) => {
  try {
    const { body } = req
    const order = await Order.create(body);
    res.json({ message: "", order: order })
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req

    const order = await Order.findByIdAndUpdate({_id:id}, body, {new:true})
    res.json({message:"", order:order})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}



