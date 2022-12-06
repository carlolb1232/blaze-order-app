const OrderController = require("../controllers/order.controller");

module.exports = app => {
  app.get("/api/orders", OrderController.getAllOrders);
  app.get("/api/orders/:id", OrderController.getOneOrder);
  app.post("/api/orders", OrderController.createOneOrder);
  app.put("/api/orders/:id", OrderController.updateOrder);
}