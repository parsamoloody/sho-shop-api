import mongoose, { Schema, model, models, Document } from 'mongoose';
import { IAddress, ICartItem, IOrderSummary, IWish } from '../types/type';

const cartItemSchema = new Schema<ICartItem>(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSummarySchema = new Schema<IOrderSummary>(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<IWish>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cart: [cartItemSchema],
    orderHistory: [orderSummarySchema],
  },
  { timestamps: true }
);

export default mongoose.model<IWish>('wish', UserSchema);
