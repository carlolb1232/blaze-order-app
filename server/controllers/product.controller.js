const { Product } = require("../models/product.model")


module.exports.findAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({message:"", products:products})
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}

module.exports.findOneProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.find({_id:id});
    res.json({message:"", product:product});
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}

module.exports.createOneProduct = async (req, res) => {
  try {
    const { body } = req;
    const product = await Product.create(body);
    res.json({message:"", product:product});
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}

module.exports.editOneProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req;
    const product = await Product.findByIdAndUpdate({_id:id}, body, {new:true, runValidators:true});
    res.json({message:"", product:product});
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}

module.exports.deleteOneProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deleteMessage = await Product.findByIdAndDelete({_id:id});
    res.json({message:"", deleteMessage:deleteMessage});
  } catch (err) {
    res.json({message:'Ocurrio un error', errors: err.errors})
  }
}