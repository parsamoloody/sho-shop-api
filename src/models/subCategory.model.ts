import mongoose, { Schema } from "mongoose";
import { ISubcategory } from "../types/type";

const SUB_C_INDEX = "subcategories"
const categorySchema = new Schema<ISubcategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    images: {
        gallery: {
            type: [String],
            required: false
        },
        thumbnail: {
            type: String,
            required: false
        }
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }]
})
let SubCategoryModel: mongoose.Model<ISubcategory>;
if (mongoose.models[SUB_C_INDEX]) {
    SubCategoryModel = mongoose.model<ISubcategory>(SUB_C_INDEX)
} else {
    SubCategoryModel = mongoose.model<ISubcategory>(SUB_C_INDEX, categorySchema)
}
export default SubCategoryModel = mongoose.model<ISubcategory>(SUB_C_INDEX, categorySchema)