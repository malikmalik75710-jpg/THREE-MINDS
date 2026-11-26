const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let orders = [];

app.get("/", (req, res) => {
  res.json({ message: "THREE MINDS Backend is running!" });
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: Date.now(),
    ...req.body
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order received successfully!",
    order: newOrder
  });
});

module.exports = app;