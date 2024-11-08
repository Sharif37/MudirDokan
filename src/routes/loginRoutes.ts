// /logInRouter.ts
import express, { RouterOptions } from "express";
import { loginUser } from "../controllers/loginController";
import { verifySession } from "./auth/auth";

const routerOptions: RouterOptions = {
  caseSensitive: true,
};
const logInRouter = express.Router(routerOptions);

logInRouter.post("/user", loginUser);


export default logInRouter;
