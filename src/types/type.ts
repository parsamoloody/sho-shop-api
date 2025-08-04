import mongoose, { Document, Mongoose, Types } from "mongoose";

// User type definition
type Post = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  addresses: IAddress[];
  cart: ICartItem[];
  orderHistory: IOrderSummary[];
  createdAt?: Date;
  updatedAt?: Date;
  resetToken?: String;
  resetTokenExpire?: Number;
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

// Product type definition

interface IDiscount {
  amount: number
  type: 'fixed' | 'percent';
  expiresAt?: string
}
interface IPrice {
  original: number;
  discount: IDiscount;
  currency: "USD" | "IRR"
}
interface IProductDocument extends Document {
  product_id: string;
  category: string[];
  name: string;
  description: string;
  price: IPrice;
  createdBy: Types.ObjectId,
  editedBy: Types.ObjectId,
  createdAt: Date;
  updatedAt: Date;
}

export {
  Post,
  IUser,
  IAddress,
  IOrderSummary,
  ICartItem,
  IDiscount,
  IPrice,
  IProductDocument
}