import { NextFunction, Request, Response } from "express";
import Shop from "../shop/shop.model";
import User from "../user/user.model";
import Owner from "./owner.model";


// controller for create a new shop and new owner
const createShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all data from req.body
        const { name, user, barbers, shopImages, license, location, services, experience, specialties } = req.body;

        // set all data
        const newShop = new Shop({ name, barbers, shopImages, license, location, services, });
        const newOwner = new Owner({ user, experience, specialties });

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
const verifyShop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all data from req.body
        const { id, status } = req.body;
        const shop = await Shop.findById(id);
        const owner = await Owner.findById(shop?.owner);
        const user = await User.findById(owner?.user);

        // if shop dont exist then send a error message
        if (!shop || !user || !owner) {
            return res.status(404).send({
                success: false,
                message: shop ? "Shop not found" : owner ? "Owner not found" : "User not found"
            });
        }

        // change the role of the user
        user.role = status === "verified" ? "owner" : "user";
        user.owner = owner._id;

        // change the verification status
        shop.isVerified = status;
        owner.isVerified = status;

        await shop.save();
        await user.save();
        await owner.save();
        // await Promise.all([shop.save(), user.save(), owner.save()]);
        res.status(200).send({ success: true, message: `Successfully updated to ${status}` });
    } catch (error) {
        next(error);
    }
}

export const ownerControllers = {
    createShop,
    verifyShop
}