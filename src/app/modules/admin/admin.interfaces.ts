import { Document, Types } from "mongoose";

//interface for adminSchema
export interface IAdmin extends Document {
    user: Types.ObjectId;
    adminSince: Date;
}