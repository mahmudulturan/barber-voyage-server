import { Document, Types } from "mongoose";

//interface for paymentSchema
export interface IPayment extends Document {
    booking: Types.ObjectId;
    user: Types.ObjectId;
    amount: number;
    transactionID: number;
}
