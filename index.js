import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import { getMethod, getById, postMethod, deleteMethod, updateMethod, getPaginate } from "./controller/post.js";
import { dbConnection } from "./utils/dbConnection.js";
import { login, register } from "./controller/auth.js";
const app = express();
const Port = process.env.PORT;
dotenv.config({ path: ".env" })

// middlewares
app.use(bodyParser.json({ extended:true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// database middleware for databaseConnection
app.use(async(req, res, next) => {
    await dbConnection();
    next()
});

// routes for create vehicle record
app.get("/", getMethod);
app.get("/:id", getById);
app.post("/postVehicle", postMethod);
app.put("/updateVehicle/:id", updateMethod);
app.delete("/deleteVehicle/:id", deleteMethod);
app.get('/getPaginatedData', getPaginate);

// routes for auth
app.post('/register', register)
app.post('/login', login);

// port on which app will run
app.listen(Port || 4000, () => {
    console.log("Backend server is running!");
  });

