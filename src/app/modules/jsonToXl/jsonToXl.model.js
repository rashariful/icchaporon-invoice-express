import { Schema, model } from "mongoose";

const JsonToXlDataSchema = new Schema({}, { strict: false });

export const JsonToXlData = model("JsonToXlData", JsonToXlDataSchema);
