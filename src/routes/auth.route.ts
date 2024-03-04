import express from 'express';
import { registerUser } from '../controllers/auth.controllers';

const router = express.Router();

router
    //* User Registration Route
    /**
    *@route POST /api/auth/register
    *@description Register a user.
    *@access Public.
    *
    *@parms name, email, password.
    *
    *@returns {object} - Registration status and message.
    *
    *@throws {409} - If the user alread exists;
    *@throws {500} - Internal sever error;
    *
    */
    .post('/register', registerUser)

export default router;