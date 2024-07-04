import { Order } from "../modules/invoice/invoice.model.js";

const findLastOrderId = async () => {
  const lastOrder = await Order.findOne({}, { orderId: 1, _id: 0 }).sort({
    createdAt: -1,
  });
  return lastOrder?.orderId ? lastOrder.orderId.substring(4, 10) : "00";
};

const generateOrderID = async (baseOrderId = null) => {
  const lastOrder = await Order.find({}, { orderId: 1, _id: 0 }).sort({
    createdAt: -1,
  });
  const lastTwoDigitOfYear = new Date().getFullYear().toString().slice(-2);
  let newOrderId;

  if (baseOrderId) {
    newOrderId = baseOrderId;
  } else if (lastOrder.length > 0) {
    const lastIdNumber = parseInt(lastOrder[0].orderId.substring(2)) + 1;
    newOrderId = `${lastTwoDigitOfYear}${lastIdNumber
      .toString()
      .padStart(5, "0")}`;
  } else {
    newOrderId = `${lastTwoDigitOfYear}00001`;
  }

  // Ensure uniqueness
  const existingOrder = await Order.findOne({ orderId: newOrderId });
  if (existingOrder) {
    return generateOrderID();
  }

  return newOrderId;
};

export default generateOrderID;
