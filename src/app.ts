import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import "./loadEnviroment";

const app = express();
const PORT = process.env.PORT || 5001;
const htmlPath = path.join(__dirname, "../public");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(cors());
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());

import loginRoutes from "./routes/loginRoutes";
import registerRoute from "./routes/signupRoutes";
import userRoutes from "./routes/userRoutes"
import productRouter from "./routes/productRoute";
import uploadRouter from "./routes/uploadRouter";

//authentication and authoriazation routes
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoutes);
app.use("/api/user", userRoutes);

//upload routes
app.use("/api/upload", uploadRouter);


//product related routes 
app.use("/api/product",productRouter);


// Routes
app.get("/", async (req, res) => {
  res.send("Welcome to the backend server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on \n http://localhost:${PORT}`);
});
