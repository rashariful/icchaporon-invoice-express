import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const shopSchema = new Schema(
  {
    // Define the schema fields
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Shop = model("Shop", shopSchema);
