import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.services";


const addReview = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await reviewServices.createReviewIntoDb(data);
    sendResponse(res, 201, "Review Posted!", result);
})

export const reviewControllers = {
    addReview
}