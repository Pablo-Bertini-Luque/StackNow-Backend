import "dotenv/config";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./routes/index.routes.js";
import db from "./db/config.js";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//config
const PORT = process.env.PORT || 4002;
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);
app.use("/public", express.static(`${__dirname}/storage`))
console.log(`${__dirname}/storage`)

app.listen(PORT, async ()=>{
    await db();
    console.log(`Server on port ${PORT}`);
});