import { Router } from "express";
import {
  deleteCategory,
  getCategories,
  getCategoryId,
  newCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import validResult from "../middlewares/commons.js";
import { isAutenticated, validId } from "../middlewares/users.middlewares.js";
import {
  categoryExists,
  categoryId,
  verifyName,
} from "../middlewares/category.middleware.js";
import { AdminRole } from "../middlewares/question.middlewares.js";

const routerCategory = Router();

routerCategory.get("/", getCategories);

routerCategory.get("/:id", [validId, categoryId, validResult], getCategoryId);

routerCategory.post(
  "/",
  [
    isAutenticated,
    verifyName,
    validResult,
  ] /* ¿Solo puede hacerlo un admin? A los fines de evitar que se vayan por las ramas las categorias */,
  newCategory
);

routerCategory.put(
  "/:id",
  [isAutenticated, categoryId, verifyName, validResult],
  updateCategory
);

routerCategory.delete(
  "/:id",
  [isAutenticated, validId, categoryId, validResult], //Ver tema del adminRole
  deleteCategory
);

export { routerCategory };
