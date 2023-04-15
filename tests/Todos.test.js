const express = require("express");
const request = require("supertest");
const app = express();
require('dotenv').config()

const bodyParser = require("body-parser");

const todoRouter = require("../routes/todos");
const authRoutes = require("../routes/auth");

app.use(bodyParser.json());
app.use("/todos", todoRouter);
app.use("/", authRoutes);

describe("testing-todo-routes", () => {
  let token;
  test("POST /login - success", async () => {
    const credentials = {
      name: "testuser",
      email: "test@gmail.com",
      password: "0000"
    }
    const { body } = await request(app).post("/login").send(credentials);
    expect(body).toHaveProperty("status", "success");
    expect(body).toHaveProperty("data");
    expect(body.data).toHaveProperty("token");
    token = body.data.token;
  });

  let createdTodoId;

  test("GET /todos - unauthorized", async () => {
    const response = await request(app).get("/todos");
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("GET /todos - success", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe("success");
  });

  test("POST /todos - unauthorized", async () => {
    const response = await request(app).post("/todos");
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("POST /todos - success", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ name: "Test Todo", categoryId: 1 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe("success");
    createdTodoId = response.body.data.id;
  });

  test("GET /todos/:id - unauthorized", async () => {
    const response = await request(app).get(`/todos/${createdTodoId}`);
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("GET /todos/:id - success", async () => {
    const response = await request(app)
      .get(`/todos/${createdTodoId}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body); 
    expect(response.body.status).toBe("success");
  });

  test("PUT /todos/:id - unauthorized", async () => {
    const response = await request(app).put(`/todos/${createdTodoId}`);
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("PUT /todos/:id - success", async () => {
    const response = await request(app)
      .put(`/todos/${createdTodoId}`)
      .send({ name: "Updated Test Todo" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe("success");
  });

  test("DELETE /todos/:id - unauthorized", async () => {
    const response = await request(app).delete(`/todos/${createdTodoId}`);
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });
  
  test("DELETE /todos/:id - success", async () => {
    const response = await request(app)
      .delete(`/todos/${createdTodoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe("success");
  });
});