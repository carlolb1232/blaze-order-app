const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, "A name is required"]
    },
    category:{
      type: String,
      required: [true, "A category is required"]
    },
    unit_price:{
      type: Number,
      required: [true, "An unit price is requeried"]
    },
    status:{
      type: String,
      required: [true, "A status is required"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Product", ProductSchema);

module.exports = { ProductSchema, Product};