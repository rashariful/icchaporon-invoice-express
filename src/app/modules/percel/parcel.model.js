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
    isInsideDhaka: {
      type: Boolean,
      default: true,
    },
    deliveryType: {
      type: Number,
      required: [true, "Delivery type is required"],
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
