import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Create disk storage
const storage = (storagePath: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.join(__dirname, storagePath);

      // Ensure the folder exists
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  });

// File filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (allowed.test(ext) && allowed.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
  }
};

// Multer instance
const upload = (storagePath: string) =>
  multer({
    storage: storage(storagePath),
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  });

export default upload;
