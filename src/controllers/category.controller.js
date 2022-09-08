import Category from "../models/Category.js";

//obtenerCategorias - pagina - total - populate

const getCategories = async (req, res) => {
  const query = { status: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).populate("user", "name"),
  ]);
  res.json({ total, categories });
};

//obtenerCategoria por ID
const getCategoryId = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.json(category);
};

const newCategory = async (req, res) => {
  const { name } = req.body;
  const user = req.user.id;
  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    name,
    user,
  };

  const category = new Category(data);

  //Guardar DB
  await category.save();

  res.status(201).json(category);
};

//actualizarCategoria
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;
  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

//borrar categoria -
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { status: false });
  res.json(category);
};

export {
  getCategories,
  getCategoryId,
  newCategory,
  updateCategory,
  deleteCategory,
};
