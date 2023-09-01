import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS with credentials
const corsOptions = {
  origin: process.env.FRONTEND_URI, // Allow requests only from this origin
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

app.use(errorMiddleware);
