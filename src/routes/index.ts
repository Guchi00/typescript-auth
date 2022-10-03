import { Router } from "express";
import { authRouter }  from "./auth.route";

export const baseRouter = Router();

baseRouter.use("/auth", authRouter);