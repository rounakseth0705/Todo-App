import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/mongodb.js";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
connectdb();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/", routes);

app.listen(port, () => console.log("App is listening on 4000"));