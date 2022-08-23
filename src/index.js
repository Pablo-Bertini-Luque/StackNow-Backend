import dotenv from "dotenv/config";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./routes/index.routes.js";
import db from "./db/config.js";

//config
const PORT = process.env.PORT || 4002;
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, async () => {
  await db();
  console.log(`Server on port ${PORT}`);
});
