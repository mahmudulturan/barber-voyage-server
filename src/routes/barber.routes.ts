import { Router } from "express";
import { barberRegister, verifyBarber } from "../controllers/barber.controllers";

const router = Router();

router
    /**
     * @route POST /api/v1/barber/barber-register
     * @group Barber Registration - Operations about registering a new barber
     * @param {string} user.body.required - The id of the user. Example: 65f1dfe6b4e7d6b99214b578
     * @param {string} experience.body.required - The experience of the barber. Example: 2Years
     * @param {string} specialties.body.required - The specialties of the user.  Example: [haircut, beardcut]
     * @param {string} document.body.required - The url of barber's document. Example: https://www.example.com
     * @produces application/json
     * @returns {object} 201 - An object containing the registration status and a success message.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/barber-register', barberRegister);


router
    /**
     * @route POST /api/v1/barber/verify-barber
     * @access admin
     * @group Barber Verification - Operations about verify a barber
     * @param {string} user.body.id - The id of the barber. Example: 65f1dfe6b4e7d6b99214b578
     * @param {string} user.body.status - status of barber's verification. Example: verified/pending/rejected
     * @produces application/json
     * @returns {object} 200 - An object containing the verification status and a success message.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .patch('/verify-barber', verifyBarber);




export default router;