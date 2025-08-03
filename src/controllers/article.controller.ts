import { NextFunction, Request, Response } from "express";
import { posts } from "../data";
import { Post } from "../types/type";
import callWebhook from "../webHook/callPost";

// [POST] articles
const createArticle =
    async (req: Request, res: Response) => {
        const { title, body, userId } = req.body;

        if (!title || !body || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const secret = process.env.WEBHOOK_SECRET
        if (!secret) throw new Error('secret key not set')

        const newPost: Post = {
            id: posts.length + 1,
            userId: userId.toString(),
            title,
            body,   
        };

        posts.push(newPost);
        const caller = await callWebhook()

        try {
            if (caller.status === 500) { res.status(500).json({ message: "error calling webHook" }) }
        } catch (e) {
            console.error("webhook call failed:", e)
            return res.status(500).json({ message: "error calling webHook" })
        }

        res.status(201).json(newPost);
    };
// [GET] articles
const getArticle =
    async (req: Request, res: Response, next: NextFunction) => {
        const idParam = req.params.id

        if (idParam) {
            const id = Number(idParam)
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID must be a number' });
            }
            const post = posts.find((p) => p.id === id);

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            console.log(`[GET /posts/${id}]`, new Date().toLocaleTimeString('en-US'));
            return res.status(200).json(post);
        }
        console.log(`[GET /posts]`, new Date().toLocaleTimeString('en-US'));
        return res.status(200).json(posts);
    }

export { createArticle, getArticle }