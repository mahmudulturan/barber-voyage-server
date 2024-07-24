import { Router } from "express";
import { reviewControllers } from "./review.controllers";

const router = Router();

router
    /**
     * @route POST /api/v1/review/add-review
     * @access user
     * @group Review Submission - Operations about submitting a review
     * @param {string} shopId.body.required - The id of the shop. Example: 60d5ecb8b392d7001f8e8e8e
     * @param {string} barberId.body.required - The id of the barber. Example: 60d5ecb8b392d7001f8e8e8f
     * @param {string} userId.body.required - The id of the user. Example: 60d5ecb8b392d7001f8e8e90
     * @param {string} bookingId.body.required - The id of the booking. Example: 60d5ecb8b392d7001f8e8e91
     * @param {object} barberReview.body.required - The review for the barber. Example: {"rating": 5, "reviewMessage": "Great service!"}
     * @param {object} shopReview.body.required - The review for the shop. Example: {"rating": 4, "reviewMessage": "Clean and comfortable environment."}
     * @param {string} [image] - URL to an image associated with the review. Example: https://example.com/path/to/image.jpg
     * @produces application/json
     * @returns {object} 201 - An object containing the success message and the review details.
     * @returns {object} 404 - An object containing an error message if the shop or barber is not found.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/add-review', reviewControllers.addReview);


export default router;