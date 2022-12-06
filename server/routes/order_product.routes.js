const OrderProductController = require("../controllers/order_product.controller");

module.exports = app =>{
  app.get("/api/order_product/:id", OrderProductController.getOneOrderProduct);
  app.post("/api/order_product", OrderProductController.createOneOrderProduct);
  app.put("/api/order_product/:id", OrderProductController.updateOneOrderProduct);
}