import "./loadEnviroment";
import express from 'express';
import cors from 'cors';
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;
const htmlPath = path.join(__dirname, "../public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(cors());
app.use(express.static("public"));


// Middleware
app.use(cors());
app.use(express.json());

import registerRoute from "./routes/signupRoutes";
import loginRoutes from "./routes/loginRoutes" ;

//authentication and authoriazation routes 
app.use("/api/register", registerRoute);
app.use("/api/login",loginRoutes) ;

// Routes
app.get('/', async (req,res)=>{
  res.send("Welcome to the backend server!");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on \n http://localhost:${PORT}`);
});
