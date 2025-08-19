import { Request, Response, NextFunction } from "express";
import upload from "../controllers/imageController";

const imageHandler = ({
  type,
}: {
  type: "Product" | "User" | "Public" | "Category" | "SubCategory";
}) => {
  const IMAGE_PATH = process.env[`${type.toUpperCase()}_IMAGE_PATH`];
  if (!IMAGE_PATH)
    throw new Error(`Missing environment variable for ${type} image path`);
  let imageKey = ""

  switch (type) {
    case "User":
      imageKey = "profilePicture"
      break;
    case "Product":
      imageKey = "images"
      break;
    case "Category":
      imageKey = "images"
      break;
    case "SubCategory":
      imageKey = "images"
      break;
    default:
      imageKey = "images"
  }

  return function processWorker(req: Request, res: Response, next: NextFunction) {
    const uploader = upload(IMAGE_PATH).array("images", 10);
if (!req.body) req.body = {};
    uploader(req, res, (err: any) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ message: err.message || "Upload error" });
      }

      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        req.body[imageKey] = [];
      } else {
        req.body[imageKey] = files.map((file) => file.filename);
      }

      next();
    });
  };
};

export default imageHandler;
