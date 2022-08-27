import "dotenv/config";
import { Router } from "express";

const GLOBAL_BASE_PATH = `/api/v1`;
//config
const router = Router();
console.log(GLOBAL_BASE_PATH);

const pruebaIndex = async (req, res) => {
  return await res.status(200).json({ test: "OK" });
};

router.get("/", pruebaIndex);

export default router;
