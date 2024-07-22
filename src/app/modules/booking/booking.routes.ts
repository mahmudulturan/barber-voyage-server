import { Router } from "express";
import { createBooking, changeBookingStatus } from "./booking.controllers";

const router = Router();

router
    /**
     * @route POST /api/v1/booking/create-booking
     * @group Booking - Operations about creating a new booking
     * @param {string} shopId.body.required - The id of the shop. Example: 60d5ecb8b392d7001f8e8e8e
     * @param {string} barberId.body.required - The id of the barber. Example: 60d5ecb8b392d7001f8e8e8f
     * @param {string} userId.body.required - The id of the user. Example: 60d5ecb8b392d7001f8e8e90
     * @param {string} service.body.required - The service requested. Example: Haircut
     * @param {number} price.body.required - The price of the service. Example: 50
     * @param {string} transaction.body.required - The transaction id. Example: 1234567890
     * @param {string} bookingTime.body.required - The booking time. Example: 2023-04-01T10:00:00Z
     * @param {string} estimatedAppoinmentTime.body.required - The estimated appointment time. Example: 2023-04-01T10:30:00Z
     * @param {number} estimatedDuration.body.required - The estimated duration of the service in minutes. Example: 30
     * @produces application/json
     * @returns {object} 201 - An object containing the booking status and a success message.
     * @returns {object} 404 - An object containing an error message if the shop, barber, or user is not found.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/create-booking', createBooking);



router
    /**
     * @route PATCH /api/v1/booking/change-status
     * @group Booking - Operations about changing the status of a booking
     * @param {string} bookingId.body.required - The id of the booking. Example: 60d5ecb8b392d7001f8e8e91
     * @param {string} status.body.required - The new status of the booking. Example: Confirmed
     * @produces application/json
     * @returns {object} 201 - An object containing the booking status and a success message.
     * @returns {object} 404 - An object containing an error message if the booking is not found.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .patch('/change-status', changeBookingStatus);


    
export default router;