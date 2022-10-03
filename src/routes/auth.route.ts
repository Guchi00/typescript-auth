import express from "express";
import { authController } from "../controller";
import { middleware } from "../middleware";


export const authRouter = express.Router();


authRouter.post("/", authController.create);

authRouter.post("/login", authController.login);

authRouter.post("/welcome", middleware.verifyToken)
