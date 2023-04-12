var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var TodoService = require("../services/TodoService");
var todoService = new TodoService(db);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');

router.use(jsend.middleware);


router.get("/", async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.jsend.fail({ "error": "No token provided" });

  try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const todos = await todoService.getAll(user.id);
      res.jsend.success(todos);
    } catch (err) {
      res.jsend.fail({ "error": "Invalid token", "details": err.message });
  }
});


router.get("/:id", async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.jsend.fail({ "error": "No token provided" });

  try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const todo = await todoService.getOne(req.params.id, user.id);
      res.jsend.success(todo);
  } catch (err) {
      res.jsend.fail({ "error": "Invalid token" });
  }
});

router.post("/", jsonParser, async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.jsend.fail({ "error": "No token provided" });

  try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const { name, categoryId } = req.body;
      const todo = await todoService.create(name, categoryId, user.id);
      res.jsend.success(todo);
  } catch (err) {
      res.jsend.fail({ "error": "Invalid token" });
  }
});


router.put("/:id", jsonParser, async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.jsend.fail({ "error": "No token provided" });

  try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const updatedTodo = await todoService.update(req.params.id, req.body.name, user.id);
      res.jsend.success(updatedTodo);
  } catch (err) {
      res.jsend.fail({ "error": "Invalid token" });
  }
});


router.delete("/:id", async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.jsend.fail({ "error": "No token provided" });

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        await todoService.delete(req.params.id, user.id);
        res.jsend.success({ "message": "Todo deleted successfully" });
    } catch (err) {
        res.jsend.fail({ "error": "Invalid token" });
    }
});


module.exports = router;