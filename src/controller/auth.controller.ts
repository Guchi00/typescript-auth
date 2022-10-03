import express, {Request, Response, NextFunction } from "express";
import { register, RegisterType, findByEmail } from "../repository/auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, age } = req.body;

        if (!(email && password && firstName && lastName && age)) {
            res.status(400).send("All input is required");
        }

        const existingUser = await findByEmail({ email });

        if (existingUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await register({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            age
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY as string,

            { 
                expiresIn: "2",
            }
        );
        return res.status(201).json({ token });

    } catch (error) {
        next(error)
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email && password) {
            return res.status(409).send("These fields are required");
        }

        const user = await findByEmail({ email });

        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password); 

            if (comparePassword) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY as string,
    
                    {
                        expiresIn: "2"
                    }
                );
    
                return res.status(201).json({ token });
            }
            return res.status(400).send("Invalid Credential")
        }
        res.status(400).send("Invalid User");

    } catch (error) {
        next(error);
    }
}