import { NextFunction, Request, Response } from "express";
import Review from "./review.model";
import Barber from "../barber/barber.model";
import Shop from "../shop/shop.model";


export const addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shopId, barberId, userId, bookingId, barberReview, shopReview, image } = req.body;
        const newReview = new Review({
            shop: shopId,
            barber: barberId,
            user: userId,
            booking: bookingId,
            barberReview,
            shopReview,
            image
        });

        // find barber and shop
        const barber = await Barber.findById(barberId);
        const shop = await Shop.findById(shopId);

        // if shop or barber or user is not found then send a message
        if (!shop || !barber) {
            return res.status(404).send(
                {
                    success: false,
                    error: shop && "Shop not found!" || !barber && "Barber not found!"
                }
            );
        }

        // push new Review id on reviews property of shop and barber
        shop.reviews.push(newReview._id);
        barber.reviews.push(newReview._id);

        await Promise.all([newReview.save(), shop.save(), barber.save()]);

        res.status(201).send({ success: true, message: "Review Posted" });
    } catch (error) {
        next(error);
    }
}