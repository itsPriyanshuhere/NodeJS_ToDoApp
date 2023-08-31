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
    methods: ["GET","POST",'PUT',"DELETE"],
    credentials: true
  });


//using middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
  app.use(cors({
    origin:[process.env.FRONTEND_URI]
  }));
app.get("/", (req,res) =>{
    res.send("Nice working");
});

//post: body , get: params, when we use colon use params othewise use query
//in case of question mark

app.use(errorMiddleware);