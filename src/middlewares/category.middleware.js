import Category from "../models/category.js";
import { check } from "express-validator";

const categoryExists = check("name").custom(async (name) => {
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exists");
  }
}); //Verificar que la categoria no exista en la db

const verifyName = check(
  "name",
  "The name must contain a minimum of 10 characters and a maximum of 100."
).isLength({ min: 10, max: 100 });

const categoryId = async (id) => {
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    throw new Error(`El id ${id} no existe`);
  }
};

export { categoryExists, verifyName, categoryId };
