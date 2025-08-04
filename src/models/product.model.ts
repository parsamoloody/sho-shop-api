import mongoose, { Document, Schema, SchemaTypes } from "mongoose";
import { IDiscount, IPrice, IProductDocument } from "../types/type";

const discountSchema = new Schema<IDiscount>({
    amount: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: ['fixed', 'percent'],
        default: 'percent'
    },
    expiresAt: Date,
}, { _id: false })

const priceSchema = new Schema<IPrice>({
    original: {
        type: Number,
        required: true
    },
    discount: {
        type: discountSchema
    },
    currency: {
        type: String,
        default: 'USD'
    }
}, { _id: false })
const productSchema = new Schema<IProductDocument>({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: priceSchema,
        required: true
    },
    category: {
        type: [String],
        default: []
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},
    {
        timestamps: true,
    })

export default mongoose.model<IProductDocument>('products', productSchema)