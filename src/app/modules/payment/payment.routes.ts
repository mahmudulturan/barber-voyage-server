import { Router } from "express";
import { createPayment } from "./payment.controllers";

const router = Router();

router
    /**
     * @route POST /api/v1/payment/create-payment
     * @access user
     * @group Payment - Operations about creating a new payment
     * @param {string} bookingId.body.required - The id of the booking. Example: 60d5ecb8b392d7001f8e8e91
     * @param {string} userId.body.required - The id of the user. Example: 60d5ecb8b392d7001f8e8e90
     * @param {number} amount.body.required - The amount of the payment. Example: 100
     * @param {string} transactionID.body.required - The transaction ID. Example: 1234567890
     * @produces application/json
     * @returns {object} 201 - An object containing the success message and the payment details.
     * @returns {object} 400 - An object containing an error message if the request is malformed.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/create-payment', createPayment)

export default router;