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


router.put("/:id?", jsonParser, async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.jsend.fail({ "error": "No token provided" });

  try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const id = req.params.id ? parseInt(req.params.id) : null;
      const { oldName, newName } = req.body;
      const updatedTodo = await todoService.update(id, oldName, newName, user.id);
      res.jsend.success(updatedTodo);
  } catch (err) {
      res.jsend.fail({ "error": "Invalid token or input parameters" });
  }
});


router.delete("/:id?", jsonParser, async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.jsend.fail({ "error": "No token provided" });

  try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const id = req.params.id ? parseInt(req.params.id) : null;
      const { name } = req.body;
      const deletedTodo = await todoService.delete(id, name, user.id);
      res.jsend.success(deletedTodo);
  } catch (err) {
      res.jsend.fail({ "error": "Invalid token or input parameters" });
  }
});


module.exports = router;