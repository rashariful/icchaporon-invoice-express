import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

const jsonToXl = catchAsync(async (req, res) => {
  const result = await JsonToXlController.jsonToXl(req.file);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

export const JsonToXlController = {
  jsonToXl,
};
