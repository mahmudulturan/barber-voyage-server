import { Router } from "express";
import { ownerControllers } from "./owner.controllers";

const router = Router();

router
    /**
     * @route POST /api/v1/owner/create-shop
     * @group shop Creation - Operations about creating a new shop and also create a owner
     * @param {string} name.body.required - The name of the shop. Example: "Barber's Paradise"
     * @param {Object} owner.body.required - Information about the owner. Example: { "name": "John Doe", "contact": "john.doe@example.com" }
     * @param {Array<ObjectId>} barbers.body.required - An array of ObjectIds referencing the barbers. Example: ["60d5ecb8b487343568912345", "60d5ecb8b487343568912346"]
     * @param {Array<string>} shopImages.body.required - An array of URLs or paths to images of the shop. Example: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
     * @param {string} license.body.required - The license details of the shop. Example: "123456789"
     * @param {Object} location.body.required - The location of the shop. Example: { "address": "123 Main St", "city": "Anytown", "state": "Anystate", "zip": "12345" }
     * @param {Array<string>} services.body.required - An array of services offered by the shop. Example: ["Haircut", "Shave", "Beard Trim"]
     * @param {Array<string>} experience.body.required - An string of barber how many experience he have. Example: "2Years"
     * @param {Array<string>} specialties.body.required - An array of specialties offered by the owner. Example: ["Haircut", "Shave", "Beard Trim"]
     * @produces application/json
     * @returns {object} 201 - An object containing the success message.
     * @returns {object} 400 - An object containing an error message if the request is malformed.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/create-shop', ownerControllers.createShop)


router
    /**
     * @route PATCH /api/v1/owner/verify-shop
     * @group Shop Verification - Operations about verifying a new shop
     * @param {string} id.body.required - The id of the shop. Example: "60d5ecb8b487343568912345"
     * @param {Object} status.body.required - status of shop's verification. Example: verified/pending/rejected
     * @produces application/json
     * @returns {object} 201 - An object containing the success message.
     * @returns {object} 400 - An object containing an error message if the request is malformed.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .patch('/verify-shop', ownerControllers.verifyShop)

export default router;