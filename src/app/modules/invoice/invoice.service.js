import QueryBuilder from "../../helpers/QueryBuilder.js";
import removeFromTempFolder from "../../utils/removeFromTempFolder.js";
import { Shop } from "../shop/shop.model.js";
import { Order } from "./invoice.model.js";
import XLSX from "xlsx";
// Declare the Services

const createInvoice = async (payload) => {
  // const orderId = await generateOrderID();
  const lastOrder = await Order.find({}, { orderId: 1, _id: 0 }).sort({
    createdAt: -1,
  });
  const lastTwoDigitOfYear = new Date().getFullYear().toString().slice(-2);

  payload.orderId = lastOrder
    ? `${lastTwoDigitOfYear}${(parseInt(lastOrder[0].orderId) + 1).toString().slice(2)}`
    : `${lastTwoDigitOfYear}00001`;
  const result = await Order.create(payload);

  return result;
};
const getAllInvoice = async (query) => {
  const invoiceSearchableFields = ["orderId", "customer.name", "note", "customer.contactNo"];

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
const createInvoicesFromXLSX = async (file) => {
  const workbook = XLSX.readFile(file.path);

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("No sheets found in the Excel file");
  }

  const worksheet = workbook.Sheets[sheetName];
  const shops = await Shop.find();
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "", range: 1 });
  removeFromTempFolder(file.filename);
  const groupedData = jsonData.reduce((acc, item) => {
    if (!acc[item?.orderId]) {
      acc[item?.orderId] = {
        orderId: item?.orderId,
        shop: shops.find((shop) => shop.name === item?.shop)?._id,
        customer: {
          name: item?.customerName,
          contactNo: item?.customerContact.toString(),
          address: item?.customeAddress,
        },
        deliveryCharge: item?.deliveryCharge,
        paidAmount: item?.paidAmount,
        note: item?.note,
        subTotal: item?.subTotal,
        grandTotal: item?.grandTotal,
        due: item?.due,
        products: [],
      };
    }
    acc[item?.orderId].products.push({
      name: item?.product,
      qty: item?.quantity,
      price: item?.price,
      amount: item?.amount,
    });
    return acc;
  }, {});

  const updatedData = Object.values(groupedData);

  const result = await Order.insertMany(updatedData);

  return {
    data: result,
    meta: { total: result.length },
  };
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
  createInvoicesFromXLSX,
  updateInvoice,
  deleteInvoice,
};

// [
//   {
//     orderId: 2400001,
//     product: 'Iphone 6s',
//     quantity: 2,
//     price: 40000,
//     amount: 80000,
//     shop: 'icchaporon.com',
//     customerName: 'John Wick',
//     customerContact: 1811122233,
//     customeAddress: 'North Badda',
//     deliveryCharge: 120,
//     paidAmount: 0,
//     note: 'please pay',
//     subTotal: 80000,
//     grandTotal: 800120,
//     due: 800120
//   },
//   {
//     orderId: 2400002,
//     product: 'Iphone 6s',
//     quantity: 2,
//     price: 40000,
//     amount: 80000,
//     shop: 'icchaporon.com',
//     customerName: 'Tony Stark',
//     customerContact: 1811122234,
//     customeAddress: 'South Baddaa',
//     deliveryCharge: 120,
//     paidAmount: 0,
//     note: 'please pay',
//     subTotal: 80000,
//     grandTotal: 800120,
//     due: 800120
//   },
//   {
//     orderId: 2400001,
//     product: 'Readmi Note 11',
//     quantity: 5,
//     price: 30000,
//     amount: 150000,
//     shop: 'Mi Official Store',
//     customerName: 'John Wick',
//     customerContact: 1811122233,
//     customeAddress: 'North Badda',
//     deliveryCharge: 120,
//     paidAmount: 0,
//     note: 'please pay',
//     subTotal: 150000,
//     grandTotal: 150120,
//     due: 150120
//   },
//   {
//     orderId: 2400004,
//     product: 'Iphone 6s',
//     quantity: 2,
//     price: 40000,
//     amount: 80000,
//     shop: 'icchaporon.com',
//     customerName: 'Tom Holland',
//     customerContact: 1811122236,
//     customeAddress: 'Mohakhali',
//     deliveryCharge: 120,
//     paidAmount: 0,
//     note: 'please pay',
//     subTotal: 80000,
//     grandTotal: 800120,
//     due: 800120
//   },
//   {
//     orderId: 2400001,
//     product: 'Nokia 1200',
//     quantity: 5,
//     price: 2000,
//     amount: 10000,
//     shop: 'Mi Official Store',
//     customerName: 'John Wick',
//     customerContact: 1811122233,
//     customeAddress: 'North Badda',
//     deliveryCharge: 120,
//     paidAmount: 0,
//     note: 'please pay',
//     subTotal: 10000,
//     grandTotal: 10120,
//     due: 10120
//   }
// ]
