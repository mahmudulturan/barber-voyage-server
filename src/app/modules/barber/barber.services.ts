import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { IBarber } from "./barber.interfaces";
import Barber from "./barber.model";

// service for retrive single barber info from db
const retriveBarberInfoFromDB = async (id: string) => {
    const barberDetails = await Barber.findById(id).populate("user").populate("bookings", "user");
    return barberDetails;
}

// service for create a barber into db
const createBarberIntoDB = async (data: IBarber) => {
    const { user, experience, specialties, document, } = data;
    const newBarber = new Barber({ user, experience, specialties, document });
    await newBarber.save();
    return newBarber;
}

// service for update barber verification status into db
const updateIsVerifiedStatusIntoDb = async (data: { id: string, status: string }) => {
    const { id, status } = data;

    const barber = await Barber.findById(id);
    const user = await User.findById(barber?.user);

    // if barber or user dont exist then send a error message
    if (!barber || !user) {
        throw new AppError(404, "Verification failed!")
    }

    // change the verification status and change the user role
    barber.isVerified = status;
    user.role = status === "verified" ? "barber" : "user";

    await barber.save();
    await user.save();

    return barber;
}

export const barberServices = {
    createBarberIntoDB,
    retriveBarberInfoFromDB,
    updateIsVerifiedStatusIntoDb
}