import axios from "axios";
import config from "../../config/index.js";
import { Order } from "../invoice/invoice.model.js";
import { shippingStatus } from "../invoice/invoice.const.js";

const addParcel = async (payload) => {
  const isOrderExist = await Order.find({ orderId: payload?.orderId });
  if (!isOrderExist) {
    throw new Error("Order not found");
  }

  const deliveryUrl = config.courier.url;

  const deliveryData = {
    // shop_id: vendor?.shopId || "",
    category_id: "1", // Fixed value
    weight: payload?.weight || 1,
    delivery_type_id: payload?.delivery_type_id,
    pickup_shop_name: "Icchaporon",
    pickup_phone: config.courier.email,
    pickup_address: payload?.pickupAddress,
    pickup_shop_img_url: "",
    invoice_no: payload?.orderId,
    customer_name: payload?.customerName,
    customer_address: payload?.customerAddress,
    customer_phone: payload?.customerPhone,
    cash_collection: payload?.cashCollection || 0,
    merchantType: "1", // 1 = multivendor, 2 = singlevendor
    fragileLiquid: payload?.isFragile ? "1" : "",
    note: payload?.message || "N/A",
  };

  try {
    const authBody = {
      email: config.courier.email,
      password: config.courier.password,
    };

    const authRes = await axios.post(deliveryUrl + "/merchant/signin", authBody, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apiKey: config.courier.api_key,
      },
    });
    const authToken = authRes.data?.data?.auth_token;

    const response = await axios.post(deliveryUrl + "/parcel-create", deliveryData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apiKey: config.courier.api_key,
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.data || !response.data.success) {
      throw new Error("Failed to create parcel with RxCourier");
    }

    await Order.findOneAndUpdate(
      { orderId: payload?.orderId },
      { parcelId: response?.data?.data?.parcel?.tracking_id, status: shippingStatus.READY_TO_DELIVERY }
    );

    return {
      trackingId: response?.data?.data?.parcel?.tracking_id,
    };
  } catch (error) {
    console.error("RxCourier Error:", error.response?.data || error.message);
    throw new Error("Failed to create parcel with RxCourier");
  }
};

export const ParcelService = {
  addParcel,
};
