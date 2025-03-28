//app.ts
import express from "express";

import cors from "cors";
import router from "./app/routes/index.js";

const app = express();
app.use(
  cors({
    // origin: ["http://localhost:3000", "https://vite-invoice-seven.vercel.app"],
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

export default app;
