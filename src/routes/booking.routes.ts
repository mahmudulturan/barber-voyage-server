import { Router } from "express";
import { createBooking } from "../controllers/booking.controllers";

const router = Router();

router.post('/create-booking', createBooking);

export default router;