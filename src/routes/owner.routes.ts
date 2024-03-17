import { Router } from "express";
import { createShop } from "../controllers/owner.controllers";

const router = Router();

router
    /**
     * @route POST /api/v1/owner/create-store
     * @group Store Creation - Operations about creating a new store
     * @param {string} name.body.required - The name of the store. Example: "Barber's Paradise"
     * @param {Object} owner.body.required - Information about the owner. Example: { "name": "John Doe", "contact": "john.doe@example.com" }
     * @param {Array<ObjectId>} barbers.body.required - An array of ObjectIds referencing the barbers. Example: ["60d5ecb8b487343568912345", "60d5ecb8b487343568912346"]
     * @param {Array<string>} shopImages.body.required - An array of URLs or paths to images of the shop. Example: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
     * @param {string} license.body.required - The license details of the store. Example: "123456789"
     * @param {Object} location.body.required - The location of the store. Example: { "address": "123 Main St", "city": "Anytown", "state": "Anystate", "zip": "12345" }
     * @param {Array<string>} services.body.required - An array of services offered by the store. Example: ["Haircut", "Shave", "Beard Trim"]
     * @produces application/json
     * @returns {object} 201 - An object containing the success message.
     * @returns {object} 400 - An object containing an error message if the request is malformed.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/create-shop', createShop)

export default router;