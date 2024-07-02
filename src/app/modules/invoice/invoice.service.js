import QueryBuilder from "../../helpers/QueryBuilder.js";
import generateOrderID from "../../utils/generateOrderId.js";
import { Order } from "./invoice.model.js";

// Declare the Services

const createInvoice = async (payload) => {
  // const orderId = await generateOrderID();
  const lastOrder = await Order.find({}, { orderId: 1, _id: 0 }).sort({
    createdAt: -1,
  });
  const lastTwoDigitOfYear = new Date().getFullYear().toString().slice(-2);

  payload.orderId = lastOrder
    ? `${lastTwoDigitOfYear}${(parseInt(lastOrder[0].orderId) + 1)
        .toString()
        .slice(2)}`
    : `${lastTwoDigitOfYear}00001`;
  const result = await Order.create(payload);

  return result;
};
const getAllInvoice = async (query) => {
  const invoiceSearchableFields = [
    "orderId",
    "customer.name",
    "note",
    "customer.contactNo",
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
