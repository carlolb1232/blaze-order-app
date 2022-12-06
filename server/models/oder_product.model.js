const mongoose = require("mongoose");

const OrderProductSchema = new mongoose.Schema(
  {
    quantity:{
      type: String,
      required: [true, "A cuantity is required"]
    },
    product:{
      type: mongoose.Schema.Types.ObjectId, ref: "Product"
    },
    cost:{
      type:Number
    }
  },
  {
    timestamps: true
  }
)

const OrderProduct = mongoose.model("OrderProduct", OrderProductSchema);

module.exports = { OrderProductSchema, OrderProduct};