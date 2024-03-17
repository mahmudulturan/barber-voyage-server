import { NextFunction, Request, Response } from "express";
import Shop from "../models/shop.model";
import Owner from "../models/owner.model";

// controller for create a new store
export const createShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, owner, barbers, shopImages, license, location, services } = req.body;
        const newShop = new Shop({ name, owner, barbers, shopImages, license, location, services });
        const newOwner = new Owner({})
        await newShop.save();
        res.status(201).send({ success: true, message: "Store created successfully" })
    } catch (error) {
        next(error);
    }
}