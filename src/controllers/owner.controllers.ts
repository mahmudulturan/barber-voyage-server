import { NextFunction, Request, Response } from "express";
import Shop from "../models/shop.model";
import Owner from "../models/owner.model";

// controller for create a new store
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
        res.status(201).send({ success: true, message: "Store created successfully" })
    } catch (error) {
        next(error);
    }
}