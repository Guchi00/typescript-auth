import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import { login } from "../controller/auth.controller"

const config = process.env;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY as string);
        res.status(200).send("You're welcome");
        // req.user = decoded
    } catch (error) {
        return res.status(400).send("Invalid token")
    }
    return next();
};