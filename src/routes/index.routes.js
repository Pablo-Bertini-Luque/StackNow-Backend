import "dotenv/config"
import { Router } from "express";
import userRouter from "./users.routes.js";
const GLOBAL_BASE_PATH = `/api/v1`;
//config
const router = Router();
const basePathUsers = `${GLOBAL_BASE_PATH}/users`;

console.log(basePathUsers)

router.get(`${GLOBAL_BASE_PATH}/test`, (_req, res) => {
    return res.status(200).json({test: "ox"});
})
//middlewares
router.use(basePathUsers, userRouter)


export default router;