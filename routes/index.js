const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router // make route modulized
  .route("/") // make route chainable
  .get(controllers.getAllTodos)
  .post(controllers.createTodo);

router
  .route("/getTodo")
  .get(controllers.getTodo)
  .put(controllers.updateTodo)
  .delete(controllers.deleteTodo);

module.exports = router;
