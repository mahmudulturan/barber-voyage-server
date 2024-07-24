import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import barberRoutes from "../modules/barber/barber.routes";
import bookingRoutes from "../modules/booking/booking.routes";
import ownerRoutes from "../modules/owner/owner.routes";
import paymentRoutes from "../modules/payment/payment.routes";
import reviewRoutes from "../modules/review/review.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

const allRoutes = [
    {
        routes: authRoutes,
        path: "/auth"
    },
    {
        routes: userRoutes,
        path: "/user"
    },
    {
        routes: barberRoutes,
        path: "/barber"
    },
    {
        routes: ownerRoutes,
        path: "/owner"
    },
    {
        routes: bookingRoutes,
        path: "/booking"
    },
    {
        routes: paymentRoutes,
        path: "/payment"
    },
    {
        routes: reviewRoutes,
        path: "/review"
    }
]


allRoutes.forEach(route => router.use(route.path, route.routes));

export default router;