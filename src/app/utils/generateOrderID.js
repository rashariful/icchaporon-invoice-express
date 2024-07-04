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

  const orderId = lastOrder
    ? `${lastTwoDigitOfYear}${(parseInt(lastOrder[0].orderId) + 1)
        .toString()
        .slice(2)}`
    : `${lastTwoDigitOfYear}00001`;

  return orderId;
};

export default generateOrderID;
