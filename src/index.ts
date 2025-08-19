import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import authRouter from "./router/auth.route";
import articleRouter from "./router/article.route";
import { productManualRouter, productReadRouter } from "./router/product.route";
import { categoryManualRouter, categoryReadRouter } from "./router/category.route";
import { subCategoryManualRouter, subCategoryReadRouter } from "./router/subCategory.route";
import { connectDB } from './lib/connection';
import { errorHandler } from "./middlewares/errorHandler";
import imageHandler from "./middlewares/imageHandler";
import { userManualRouter, userReadRouter } from "./router/user.route";

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/upload/image', express.static(path.join(__dirname, process.env.PUBLIC_IMAGE_PATH || "")));
app.use('/api/product', imageHandler({ type: "Product" }), productManualRouter);
app.use('/api/user', imageHandler({ type: "User" }), userManualRouter);
app.use('/api/category', categoryManualRouter);
app.use('/api/subcategory', subCategoryManualRouter);
app.use('/api/post', articleRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productReadRouter);
app.use('/api/user', userReadRouter);
app.use('/api/category', categoryReadRouter);
app.use('/api/subcategory', subCategoryReadRouter);

app.use(errorHandler);

(async () => {
  await connectDB();
})();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
