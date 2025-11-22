import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db";
import links from "./routes/links.route";
import redirect from "./routes/redirect.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//Health check end point
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//Routes
app.use("/api/links", links);
app.use("/api/redirect", redirect);

//Connect DB, then start the server
pool
  .connect()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect DB", err);
    process.exit(1); //Stop app if DB connection fails
  });
