import catchAsync from "../../utils/catchAsync.js";
import { InvoiceServices } from "./invoice.service.js";
import sendResponse from "../../utils/sendResponse.js";

// Create invoice
const createInvoice = catchAsync(async (req, res) => {
  const result = await InvoiceServices.createInvoice(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Invoice created successfully",
    data: result,
  });
});

// Get all invoice
const getAllInvoice = catchAsync(async (req, res) => {
  const result = await InvoiceServices.getAllInvoice(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Invoice fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single invoice
const getSingleInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.getSingleInvoice(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Invoice fetched successfully",
    data: result,
  });
});
const createInvoicesFromXLSX = catchAsync(async (req, res) => {
  const result = await InvoiceServices.createInvoicesFromXLSX(req.file);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Invoice created successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Update invoice
const updateInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.updateInvoice(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Invoice updated successfully",
    data: result,
  });
});

// Delete invoice
const deleteInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.deleteInvoice(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Invoice deleted successfully",
    data: result,
  });
});

export const InvoiceControllers = {
  createInvoice,
  getAllInvoice,
  getSingleInvoice,
  createInvoicesFromXLSX,
  updateInvoice,
  deleteInvoice,
};
