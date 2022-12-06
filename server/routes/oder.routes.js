const OrderController = require("../controllers/order.controller");

module.exports = app => {
  app.post("/api/orders", OrderController.createOneOrder);
}