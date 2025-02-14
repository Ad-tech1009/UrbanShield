import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Guard from "./models/guardSchema.js";
import http from "http";
import {Server} from "socket.io";


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("✅ WebSocket Client Connected");

  socket.on("disconnect", () => {
    console.log("⚠️ Client Disconnected");
  });
});

// Get All Guards' Locations API (Fallback for first load)
app.get("/api/guards", async (req, res) => {
  const guards = await Guard.find({}, "name location");
  res.json(guards);
});

// Routes
app.get("/", (req, res) => {
  res.send("Urban Security API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
