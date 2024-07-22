import express from 'express';

const router = express.Router();
import passport from 'passport';
import { authControllers } from './auth.controllers';

router
    /**
     * @route POST /api/v1/auth/register
     * @group User Registration - Operations about user registration
     * @param {string} name.body.required - The name of the user. Example: John Doe
     * @param {string} email.body.required - The email of the user. Example: user@example.com
     * @param {string} password.body.required - The password of the user. Example: userpassword
     * @produces application/json
     * @returns {object} 200 - An object containing the registration status and a success message.
     * @returns {object} 409 - An object containing an error message if the user already exists.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/register', authControllers.registerUser);


router
    /**
     * @route POST /api/v1/auth/login
     * @group Authentication - Operations about user authentication
     * @param {string} email.body.required - The email of the user. Example: user@example.com
     * @param {string} password.body.required - The password of the user. Example: userpassword
     * @produces application/json
     * @returns {object} 200 - An object containing the user information and a success message.
     * @returns {object} 401 - An object containing an error message if the password is incorrect.
     * @returns {object} 404 - An object containing an error message if the user is not found.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .post('/login', authControllers.loginUser)


router
    /**
     * @route GET /api/v1/auth/logout
     * @group Authentication - Operations about user authentication
     * @produces application/json
     * @returns {object} 200 - An object containing a success message indicating that the user has been logged out.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .get('/logout', authControllers.logoutUser)



router
    /**
     * @route GET /api/v1/auth/google
     * @group Authentication - Operations about user authentication
     * @produces application/json
     * @returns {object} 302 - Redirects the user to Google's sign-in page.
     */
    .get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));



router
    /**
     * @route GET /api/v1/auth/google/callback
     * @group Authentication - Operations about user authentication
     * @produces application/json
     * @returns {object} 200 - An object containing the user information and a success message if authentication is successful.
     * @returns {object} 500 - An object containing an error message if there's a server error.
     */
    .get('/google/callback', passport.authenticate('google'), authControllers.loginWithGoogle);


export default router;