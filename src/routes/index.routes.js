import "dotenv/config";
import { Router } from "express";

const GLOBAL_BASE_PATH = `/api/v1`;
//config
const router = Router();
console.log(GLOBAL_BASE_PATH);

router.get(`${GLOBAL_BASE_PATH}/test`, (_req, res) => {
  return res.status(200).json({ test: "ox" });
});

export default router;
