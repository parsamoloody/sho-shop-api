import { createCrudController } from "../controllers/resolve.controller";
import categoryModel from "../models/category.model";
import productModel from "../models/product.model";
import subCategoryModel from "../models/subCategory.model";
import userModel from "../models/user.model";
import wishModel from "../models/wish.model";

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
const wishController = createCrudController(
    wishModel,
    "Wish list"
)
export { categoryController, userController, productController, subCategoryController, wishController };
