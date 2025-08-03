import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  addresses: IAddress[];
  cart: ICartItem[];
  orderHistory: IOrderSummary[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface IOrderSummary {
  orderId: mongoose.Types.ObjectId;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  size?: string;
  color?: string;
}

const addressSchema = new Schema<IAddress>(
  {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String },
  },
  { _id: false }
);

const cartItemSchema = new Schema<ICartItem>(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    size: { type: String },
    color: { type: String },
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

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
    addresses: [addressSchema],
    cart: [cartItemSchema],
    orderHistory: [orderSummarySchema],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('fuser', UserSchema);
