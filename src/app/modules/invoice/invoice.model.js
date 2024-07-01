import { Schema, model } from "mongoose";
import { shippingStatus } from "./invoice.const.js";

// Declare the Schema of the Mongo model
const orderSchema = new Schema(
  {
    // Define the schema fields
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    cashier_name: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_phone: {
      type: String,
      required: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    delivery_charge: {
      type: Number,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    due: {
      type: Number,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: Object.values(shippingStatus),
      default: shippingStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Order = model("Order", orderSchema);
