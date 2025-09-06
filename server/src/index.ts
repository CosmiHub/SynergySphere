import express, {Application, Request, Response} from 'express';
import cors from "cors";
import dotenv from "dotenv";

import "dotenv/config"
import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();
const app:Application = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("SynergySphere API is running 🚀");
});

app.listen(PORT, ()=>{
    console.log(`Server is running successfully✅ on port: ${PORT}`);
})