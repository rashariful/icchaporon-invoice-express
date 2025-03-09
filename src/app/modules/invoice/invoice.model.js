import { Schema, model } from "mongoose";
import { shippingStatus } from "./invoice.const.js";
// Declare the Schema of the Mongo model
const orderSchema = new Schema(
  {
    // Define the schema fields
    orderId: {
      type: String,
      required: true,
      // unique: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    customer: {
      name: {
        type: String,
      },
      contactNo: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    deliveryCharge: {
      type: Number,
    },
    paidAmount: {
      type: Number,
    },
    note: {
      type: String,
    },
    subTotal: {
      type: Number,
    },
    grandTotal: {
      type: Number,
    },
    due: {
      type: Number,
    },
    products: [
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
      default: "pending",
    },
    parcelId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Order = model("Order", orderSchema);
