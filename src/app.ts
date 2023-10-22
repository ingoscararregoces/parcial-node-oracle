import express from "express";
import cors from "cors";
import { router } from "./routes";
import "dotenv/config";
// import "./config/server";
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);

app.listen(PORT, () => console.log(`Corriendo en el puerto: ${PORT}`));
