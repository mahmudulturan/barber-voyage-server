import { Router } from "express";
import verifyUser from "../../middlewares/verifyUser";
import { userControllers } from "./user.controllers";


const router = Router();

router
    // GET /current-user
    // This route retrieves the current authenticated user's information.
    // It requires the user to be authenticated via the 'verifyUser' middleware.
    // The 'currentUser' controller handles the request and returns the user's details.
    .get('/current-user', verifyUser, userControllers.currentUser);

export default router;