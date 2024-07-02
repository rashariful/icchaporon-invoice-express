import { Order } from "../modules/invoice/invoice.model.js";

const findLastOrderId = async () => {
  const lastOrder = await Order.findOne({}, { orderId: 1, _id: 0 }).sort({
    createdAt: -1,
  });
  return lastOrder?.orderId ? lastOrder.orderId.substring(4, 10) : "00";
};

const generateOrderID = async () => {
  const currentId = (await findLastOrderId()) || "00000";

  const lastTwoDigitsOfYear = new Date().getFullYear().toString().slice(-2);
  // const timestamp = new Date(); // Use timestamp as the dynamic portion

  let incrementedId = (parseInt(currentId) + 2).toString().padStart(5, "0");

  const orderID = `${lastTwoDigitsOfYear}${incrementedId}`; //not ok

  return orderID;
};

export default generateOrderID;
