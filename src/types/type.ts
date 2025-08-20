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
  profilePicture: string[];
  addresses: IAddress[];
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
interface IWish extends Document {
  _id: mongoose.Types.ObjectId;
  cart: ICartItem[];
  orderHistory: IOrderSummary[];
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
}

// Category type definition (parent)
interface ICategory {
  name: string;
  description: string;
  images: {
    gallery: string[];
    thumbnail: string;
  };
}

// Subcategory type definition (child)
interface ISubcategory {
  name: string;
  description: string;
  categories: Types.ObjectId[];
  images: {
    gallery: string[];
    thumbnail: string;
  };
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
  category: Types.ObjectId[];
  name: string;
  description: string;
  price: IPrice;
  images: string[];
  createdBy: Types.ObjectId,
  rating: number,
  stock: number,
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
  IProductDocument,
  ICategory,
  ISubcategory,
  IWish
}