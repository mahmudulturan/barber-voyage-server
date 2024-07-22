import { Document, Types } from "mongoose";


//interface for cookie options
export interface ICookieOptions {
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none" | boolean;
    secure: boolean;
    maxAge?: number;
    expires?: Date;
}


//interface for userSchema
export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    password?: string;
    googleId?: string;
    role: string;
    barber?: Types.ObjectId;
    owner?: Types.ObjectId;
    admin?: Types.ObjectId;
    bookings?: Types.ObjectId[];
}


//interface for barberSchema
export interface IBarber extends Document {
    user: Types.ObjectId;
    hiredAt: {
        joinedDate: Date;
        shop: Types.ObjectId;
    };
    experience: string;
    specialties: string[];
    document: string;
    reviews: Types.ObjectId[];
    bookings: Types.ObjectId[];
    isVerified: string;
}


//interface for ownerSchema
export interface IOwner extends Document {
    user: Types.ObjectId;
    shop: Types.ObjectId;
    experience: string;
    specialties: string[];
    isVerified: string;
    reviews: Types.ObjectId[];
    bookings: Types.ObjectId[];
}


//interface for adminSchema
export interface IAdmin extends Document {
    user: Types.ObjectId;
    adminSince: Date;
}


//interface for shopSchema
export interface IShop extends Document {
    name: string;
    owner: Types.ObjectId;
    barbers: Types.ObjectId[];
    shopImages: string[];
    license: string;
    reviews: Types.ObjectId[];
    location: object;
    services: string[];
    bookings: Types.ObjectId[];
    isVerified: string;
}

//interface for bookingSchema
export interface IBooking extends Document {
    shop: Types.ObjectId;
    barber: Types.ObjectId;
    user: Types.ObjectId;
    service: string;
    price: number;
    transaction: Types.ObjectId;
    bookingTime: Date;
    estimatedAppoinmentTime: Date;
    estimatedDuration: string;
    bookingStatus: string;
}

//interface for paymentSchema
export interface IPayment extends Document {
    booking: Types.ObjectId;
    user: Types.ObjectId;
    amount: number;
    transactionID: number;
}


export interface IReview extends Document {
    shop: Types.ObjectId;
    barber: Types.ObjectId;
    user: Types.ObjectId;
    booking: Types.ObjectId;
    barberReview: {
        rating: number;
        reviewMessage: string;
    };
    shopReview: {
        rating: number;
        reviewMessage: string;
    };
    image?: string;
}