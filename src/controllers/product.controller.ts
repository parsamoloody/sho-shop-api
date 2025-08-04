import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import { IProductDocument } from "../types/type";
import mongoose from "mongoose";

// Add Product
export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productData: IProductDocument = req.body;
        const product = new Product(productData);
        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};

// Edit Product 
export const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        next(error);
    }
};

// Get All Products
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
       return res.json({ success: true, products });
    } catch (error) {
        next(error);
    }
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
