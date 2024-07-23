import AppError from "../../errors/AppError";
import Barber from "../barber/barber.model";
import Shop from "../shop/shop.model";
import { IReview } from "./review.interfaces";
import Review from "./review.model";

const createReviewIntoDb = async (data: IReview & { shopId: string; barberId: string; userId: string; bookingId: string; }) => {
    const { shopId, barberId, userId, bookingId, barberReview, shopReview, image } = data;
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
        throw new AppError(404, (shop && "Shop not found!" || !barber && "Barber not found!") as string);

    }

    // push new Review id on reviews property of shop and barber
    shop.reviews.push(newReview._id);
    barber.reviews.push(newReview._id);

    await Promise.all([newReview.save(), shop.save(), barber.save()]);

    return newReview;
}

export const reviewServices = {
    createReviewIntoDb
};