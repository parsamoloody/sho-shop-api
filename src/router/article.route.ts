import { Router } from "express";
import { checkApiKey } from "../middlewares/auth.middleware";
import { createArticle, getArticle } from "../controllers/article.controller";

const router = Router()

router.post("/write-article", checkApiKey, createArticle )
router.get("/article/:id", getArticle)
router.get("/article", getArticle)
export default router