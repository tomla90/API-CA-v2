const express = require("express");
const request = require("supertest");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require("body-parser");

const categoryRouter = require("../routes/categories");
const authRoutes = require("../routes/auth");

app.use(bodyParser.json());
app.use("/categories", categoryRouter);
app.use("/", authRoutes);

describe("testing-category-routes", () => {
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

  let createdCategoryId;

  test("GET /categories - unauthorized", async () => {
    const response = await request(app).get("/categories");
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("GET /categories - success", async () => {
    const response = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe("success");
  });

  test("POST /categories - unauthorized", async () => {
    const response = await request(app).post("/categories");
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("POST /categories - success", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "Test Category" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe("success");
    createdCategoryId = response.body.data.id;
  });

  test("GET /categories/:id - unauthorized", async () => {
    const response = await request(app).get(`/categories/${createdCategoryId}`);
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("GET /categories/:id - success", async () => {
    const response = await request(app)
      .get(`/categories/${createdCategoryId}`)
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body); 
    expect(response.body.status).toBe("success");
  });

  test("PUT /categories/:id - unauthorized", async () => {
    const response = await request(app).put(`/categories/${createdCategoryId}`);
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided" });
  });

  test("PUT /categories/:id - success", async () => {
    const response = await request(app)
      .put(`/categories/${createdCategoryId}`)
      .send({ name: "Updated Test Category" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe("success");
  });

  test("DELETE /categories/:id - unauthorized", async () => {
    const response = await request(app).delete(`/categories/${createdCategoryId}`);
    expect(response.body.status).toBe("fail");
    expect(response.body).toHaveProperty("data", { error: "No token provided"});

  });

  test("DELETE /categories/:id - success", async () => {
    const response = await request(app)
      .delete(`/categories/${createdCategoryId}`)
      .set("Authorization", `Bearer ${token}`);
  
   
    if (response.body.status !== "success") {
      console.log("DELETE /categories/:id - success test failed:", response.body);
    }
  
    expect(response.body.status).toBe("success");
  });
  });


