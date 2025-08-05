import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/type";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

export default mongoose.model<ICategory>('category', categorySchema)