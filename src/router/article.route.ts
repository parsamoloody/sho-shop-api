import { Router } from "express";
import { checkApiKey } from "../middlewares/auth.middleware";
import { createArticle, getArticle } from "../controllers/article.controller";

const router = Router()

router.post("/create", checkApiKey, createArticle )
router.get("/get-one/:id", getArticle)
router.get("/get-all", getArticle)
export default router