import express, { Express, Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database";
import { baseRouter } from "./src/routes";

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", baseRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express + Typescript Authentication Server")
});

app.listen(port, () => {
    console.log(`[Sever]: Server is running at http://localhost:${port}`)
});