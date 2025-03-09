import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ParcelService } from "./parcel.service.js";

const addParcel = catchAsync(async (req, res) => {
  const result = await ParcelService.addParcel(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Parcel added successfully",
    data: result,
  });
});

export const ParcelController = {
  addParcel,
};
