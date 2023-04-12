var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var CategoryService = require("../services/CategoryService");
var categoryService = new CategoryService(db);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');

router.use(jsend.middleware);


router.get("/", async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.jsend.fail({ "error": "No token provided" });

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        const categories = await categoryService.getAll(user.id);
        res.jsend.success(categories);
    } catch (err) {
        res.jsend.fail({ "error": "Invalid token" });
    }
});


router.get("/:id", async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.jsend.fail({ "error": "No token provided" });

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        const category = await categoryService.getOne(req.params.id, user.id);
        res.jsend.success(category);
    } catch (err) {
        res.jsend.fail({ "error": "Invalid token" });
    }
});

router.post("/", jsonParser, async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.jsend.fail({ "error": "No token provided" });

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        const category = await categoryService.create(req.body.name, user.id);
        res.jsend.success(category);
    } catch (err) {
        res.jsend.fail({ "error": "Invalid token" });
    }
});


router.put("/:id", jsonParser, async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.jsend.fail({ "error": "No token provided" });

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        const updatedCategory = await categoryService.update(req.params.id, req.body.name, user.id);
        res.jsend.success(updatedCategory);
    } catch (err) {
        res.jsend.fail({ "error": "Invalid token" });
    }
});


router.delete("/:id", async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.jsend.fail({ "error": "No token provided" });

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        await categoryService.delete(req.params.id, user.id);
        res.jsend.success({ "message": "Category deleted successfully" });
    } catch (err) {
        res.jsend.fail({ "error": "Invalid token" });
    }
});



module.exports = router;