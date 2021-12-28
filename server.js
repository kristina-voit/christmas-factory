import express from "express";
import mongoose from "mongoose";
import {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/christmas.controller.js";

// Erstellung des express-servers
const server = express();
// 27017 = Server, auf dem die Datenbank läuft!
// Compass; wenn nichts eingegeben 27017; auch genannt uri; Verbindungs-String, mit dem wir uns auf die Datanbank verbinden
mongoose.connect("mongodb://localhost:27017/christmas-factory");
server.listen(4004, () => console.log("Server is up and running!"));

// Middleware zum JSON parsen (req.body wird aufbereitet, was wir aus Postman herausschicken)
server.use(express.json());

// erste Route
server.get("/products", getProducts);

server.get("/products/:productId", getProduct);

// erstelle neuen Product mit den Daten, die ich in Postman eingebe
server.post("/products", postProduct);

server.put("/products/:productId", updateProduct);

server.delete("/products/:productId", deleteProduct);