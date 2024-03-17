import { NextFunction, Request, Response } from "express";
import Shop from "../models/shop.model";
import Owner from "../models/owner.model";

// controller for create a new shop and new owner
export const createShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all data from req.body
        const { name, owner, barbers, shopImages, license, location, services, experience, specialties } = req.body;

        // set all data
        const newShop = new Shop({ name, barbers, shopImages, license, location, services, });
        const newOwner = new Owner({ user: owner, experience, specialties });

        // set shop and owner id
        newShop.owner = newOwner._id;
        newOwner.shop = newShop._id;

        // save newShop and newOwner
        await newShop.save();
        await newOwner.save();
        res.status(201).send({ success: true, message: "Shop created successfully" })
    } catch (error) {
        next(error);
    }
}


// controller for verify shop and new owner
export const verifyShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all data from req.body
        const { id, status } = req.body;
        const shop = await Shop.findById(id);
        // if shop dont exist then send a error message
        if (!shop) {
            return res.status(404).send({ success: false, message: "Shop not found" });
        }

        // change the verification status
        shop.isVerified = status;
        await shop.save();
        res.status(200).send({ success: true, message: `Successfully updated to ${status}` });
    } catch (error) {
        next(error);
    }
}