import catchAsync from "../../utils/catchAsync.js";
import { ShopServices } from "./shop.service.js";
import sendResponse from "../../utils/sendResponse.js";

// Create shop
const createShop = catchAsync(async (req, res) => {
  const result = await ShopServices.createShop(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Shop created successfully",
    data: result,
  });
});

// Get all shop
const getAllShop = catchAsync(async (req, res) => {
  const result = await ShopServices.getAllShop(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Shop fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single shop
const getSingleShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShopServices.getSingleShop(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Shop fetched successfully",
    data: result,
  });
});

// Update shop
const updateShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShopServices.updateShop(id, req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Shop updated successfully",
    data: result,
  });
});

// Delete shop
const deleteShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShopServices.deleteShop(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Shop deleted successfully",
    data: result,
  });
});

export const ShopControllers = {
  createShop,
  getAllShop,
  getSingleShop,
  updateShop,
  deleteShop,
};
