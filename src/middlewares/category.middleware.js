import Category from "../models/Category.js";
import { check } from "express-validator";

const categoryExists = check("name").custom(async (req, res) => {
  const { id } = req.params;
  const categoryFound = await Category.findOne({ id });
  if (categoryFound) {
    throw new Error("Category already exists");
  }
}); //Verificar que la categoria no exista en la db

const verifyName = check(
  "name",
  "The name must contain a maximum of 20 characters."
).isLength({ max: 20 });

const categoryId = check("id").custom(async (id) => {
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    throw new Error(`El id ${id} no existe`);
  }
});

export { categoryExists, verifyName, categoryId };
