import QueryBuilder from "../../helpers/QueryBuilder.js";
import generateOrderID from "../../utils/generateOrderId.js";
import { Order } from "./invoice.model.js";

// Declare the Services

const createInvoice = async (payload) => {
  const orderId = await generateOrderID();
  payload.orderId = orderId;
  const result = await Order.create(payload);
  return result;
};
const getAllInvoice = async (query) => {
  const invoiceSearchableFields = [
    "orderId",
    "customer_name",
    "note",
    "customer_phone",
  ];

  const resultQuery = new QueryBuilder(Order.find(), query)
    .search(invoiceSearchableFields)
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
const getSingleInvoice = async (id) => {
  const result = await Order.findById(id);
  return result;
};
const updateInvoice = async (id, payload) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteInvoice = async (id) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const InvoiceServices = {
  createInvoice,
  getAllInvoice,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
};
