import QueryBuilder from "../../helpers/QueryBuilder.js";
import generateOrderID from "../../utils/generateOrderID.js";
import removeFromTempFolder from "../../utils/removeFromTempFolder.js";
import { Shop } from "../shop/shop.model.js";
import { Order } from "./invoice.model.js";
import XLSX from "xlsx";

const createInvoice = async (payload) => {
  payload.orderId = await generateOrderID();

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

const createInvoicesFromXLSX = async (file) => {
  const workbook = XLSX.readFile(file.path);
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("No sheets found in the Excel file");
  }

  const worksheet = workbook.Sheets[sheetName];
  const shops = await Shop.find();

  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
    range: 1,
  });

  removeFromTempFolder(file.filename);

  const groupedData = jsonData.reduce((acc, item) => {
    if (!acc[item?.trackId]) {
      acc[item?.trackId] = {
        orderId: item?.trackId,
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
    acc[item?.trackId].products.push({
      name: item?.product,
      qty: item?.quantity,
      price: item?.price,
      amount: item?.amount,
    });
    return acc;
  }, {});

  const updatedData = await Promise.all(
    Object.values(groupedData).map(async (item, i) => {
      const orderId = (parseInt(await generateOrderID()) + i).toString();
      item.orderId = orderId;
      return item;
    })
  );
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
