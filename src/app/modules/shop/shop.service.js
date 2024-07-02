import { Shop } from "./shop.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Declare the Services

const createShop = async (file, payload) => {
  if (file) {
    const imageName = `${payload?.name}|${Date.now()}`;
    const { secure_url } = await sendImageToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }

  const result = await Shop.create(payload);
  return result;
};
const getAllShop = async (query) => {
  const shopSearchableFields = [];
  const resultQuery = new QueryBuilder(Shop.find(), query)
    .search(shopSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();

  return {
    data: result,
    meta,
  };
};
const getSingleShop = async (id) => {
  const result = await Shop.findById(id);
  return result;
};
const updateShop = async (id, file, payload) => {
  const result = await Shop.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteShop = async (id) => {
  const result = await Shop.findByIdAndDelete(id);
  return result;
};

export const ShopServices = {
  createShop,
  getAllShop,
  getSingleShop,
  updateShop,
  deleteShop,
};
