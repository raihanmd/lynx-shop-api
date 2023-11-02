import PREFIX from "../const/prefix";
import orderDatabase from "../database/order/orderDatabase";
import { ServiceError } from "../error/serviceError";
import { ICheckoutOrderBody, IPOSTOrderBody } from "../interfaces/order/IOrderBody";
import getUnixTime from "../utils/getUnixTime";
import { getUuid } from "../utils/getUuid";
import { validate } from "../utils/validation";
import { CheckoutOrderValidation, POSTOrderValidation } from "../validation/orderValidation";

const get = async (req: { userName: string }): Promise<object[] | string> => {
  const { userName } = req;

  const orders = await orderDatabase.get(userName);

  //@ts-ignore
  if (orders.length === 0) {
    throw new ServiceError(404, "User not found.");
  }

  //@ts-ignore
  if (!orders[0].productId) {
    throw new ServiceError(404, "Order not found.");
  }

  //@ts-ignore
  return orders;
};

const insertOne = async (req: IPOSTOrderBody): Promise<object> => {
  const orderBody = validate(POSTOrderValidation, req);

  orderBody.orderId = PREFIX.ORDER + getUuid();
  orderBody.orderDate = getUnixTime();

  await orderDatabase.insertOne(orderBody);

  return { isSucceed: true };
};

const checkout = async (req: ICheckoutOrderBody): Promise<object> => {
  const orderBody = validate(CheckoutOrderValidation, req);

  orderBody.checkoutAt = getUnixTime();

  await orderDatabase.checkout(orderBody);

  return { isSucceed: true };
};

export default { get, insertOne, checkout };
