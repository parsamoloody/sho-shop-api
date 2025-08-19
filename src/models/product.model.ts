import mongoose, { Document, Schema, SchemaTypes, Types } from "mongoose";
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
    rating: {
        type: Number,
        default: 3.5
    },
    category: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'category'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false
    },
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: true,
    })

export default mongoose.model<IProductDocument>('mahsool', productSchema)