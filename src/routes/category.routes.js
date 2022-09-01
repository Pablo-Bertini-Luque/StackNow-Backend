import { Router } from "express";
import {
  deleteCategory,
  getCategories,
  getCategory,
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

routerCategory.get("/", [validId, categoryExists, validResult], getCategory);

routerCategory.post(
  "/",
  [isAutenticated, verifyName, validResult],
  newCategory
);

routerCategory.put(
  "/:id",
  [isAutenticated, verifyName, categoryId, validResult],
  updateCategory
);

routerCategory.delete(
  "/:id",
  [isAutenticated, AdminRole, validId, categoryId, validResult],
  deleteCategory
);

export { routerCategory };
