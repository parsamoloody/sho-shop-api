import { createCrudController } from "../controllers/resolve.controller";
import categoryModel from "../models/category.model";
import productModel from "../models/product.model";
import subCategoryModel from "../models/subCategory.model";
import userModel from "../models/user.model";

const categoryController = createCrudController(
    categoryModel,
    "Category");
const subCategoryController = createCrudController(
    subCategoryModel,
    "Subcategory",
    // ["category"]
);
const productController = createCrudController(
    productModel,
    "Products",
    // ["category", "subcategory", "User"]
);
const userController = createCrudController(
    userModel,
    "User")
export { categoryController, userController, productController, subCategoryController };
