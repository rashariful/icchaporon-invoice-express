import { Schema } from "mongoose";

const parcelSchema = new Schema(
  {
    invoiceNo: {
      type: String,
      required: [true, "Invoice number is required"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone is required"],
    },
    customerAddress: {
      type: String,
      required: [true, "Customer address is required"],
    },
    pickupAddress: {
      type: String,
      required: [true, "Pickup address is required"],
    },
    delivery_type_id: {
      type: Number,
      default: 2,
    },
    message: {
      type: String,
    },
    trackingId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Parcel = model("Parcel", parcelSchema);
