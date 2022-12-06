const { Order } = require("../models/order.model")

module.exports.createOneOrder = async (req, res) => {
  try {
    const { body } = req
    const order = await Order.create(body);
    res.json({message:"", order:order})
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}



