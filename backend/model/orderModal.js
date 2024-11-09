import { text } from "express";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    customer: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        lowercase: true // Ensure email is in lowercase
      },
      address: {
        street: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        zip: {
          type: String,
          required: true
        }
      }
    },
    orderDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ["Shipped", "Pending", "Delivered", "Canceled"] ,
      default:"Pending"
    },
    products: [
      {
        productId: {
          type: String,
          required: true
        },
        category:{
            type:String
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true,
          min: 0 // Ensure price is not negative
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0 // Ensure totalAmount is not negative
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true 
  }
);

const OrderDb = mongoose.model("Order", orderSchema);

export default OrderDb;
