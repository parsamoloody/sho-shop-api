import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import { IProductDocument } from "../types/type";
import mongoose from "mongoose";
import userModel from "../models/user.model";


// Get Product by ID
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

// Edit User by ID
export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        res.json({ success: true, product: updatedUser });
    } catch (error) {
        next(error);
    }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        res.json({ success: true, user: user });
    } catch (error) {
        next(error);
    }
};
