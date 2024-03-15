import { Router } from "express";
import { barberRegister } from "../controllers/barber.controllers";

const router = Router();

router.post('/barber-register', barberRegister)


export default router;