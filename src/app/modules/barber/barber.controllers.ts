import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { barberServices } from "./barber.services";


// controller for register a new barber
const getBarber = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = barberServices.retriveBarberInfoFromDB(id);
    sendResponse(res, 200, "Successfully retrive barber info!", result);
})


// controller for register a new barber
const barberRegister = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = barberServices.createBarberIntoDB(data);
    sendResponse(res, 201, "Successfully registered as a barber!", result);
})


// controller for verify a requested barber
const verifyBarber = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await barberServices.updateIsVerifiedStatusIntoDb(data);
    sendResponse(res, 200, `Successfully updated to ${result.isVerified}`, result);
})

export const barberControllers = {
    getBarber,
    barberRegister,
    verifyBarber
}