const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_number:{
      type: String,
    },
    status:{
      type: String,
      required: [true, "A status is required"],
      default: "Pending"
    },
    date:{
      type: Date,
    },
    customer:{
      type: String
    },
    subtotal:{
      type: Number,
      default: 0
    },
    city_tax:{
      type: Number,
      default: 0
    },
    county_tax:{
      type: Number,
      default: 0
    },
    state_tax:{
      type: Number,
      default: 0
    },
    federal_tax:{
      type: Number,
      default: 0
    },
    total_taxes:{
      type: Number,
      default: 0
    },
    total_amount:{
      type: Number,
      default: 0
    },
    order_items:[{type:mongoose.Schema.Types.ObjectId,ref:"OrderProduct"}],
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model("Order", OrderSchema);

module.exports = { OrderSchema, Order};