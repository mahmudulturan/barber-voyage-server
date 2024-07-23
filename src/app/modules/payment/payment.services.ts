import { IPayment } from "./payment.interfaces";
import Payment from "./payment.model";

const createPaymentIntoDb = async (data: IPayment & { bookingId: string; userId: string; }) => {
    const { bookingId, userId, amount, transactionID } = data;
    const newPayment = new Payment({ booking: bookingId, user: userId, amount, transactionID })
    await newPayment.save();
    return newPayment;
}

export const paymentServices = {
    createPaymentIntoDb
};