import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/type";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    images:{
        gallery: {
            type: [String],
            required: false
        },
        thumbnail: {
            type: [String],
            required: false
        }
    }
})

export default mongoose.model<ICategory>('category', categorySchema)