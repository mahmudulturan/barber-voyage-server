import { NextFunction, Request, Response } from "express";
import Shop from "../models/shop.model";

// controller for create a new store
export const createStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, ownerInfo, barbers, shopImages, license, location, services } = req.body;
        const newShop = new Shop({ name, ownerInfo, barbers, shopImages, license, location, services });
        await newShop.save();
        res.status(201).send({ success: true, message: "Store created successfully" })
    } catch (error) {
        next(error);
    }
}