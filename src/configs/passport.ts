import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import User, { IUser } from '../models/user.model';
import { Request } from 'express';
import { GoogleCallbackParameters, Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';

const tokenSecret = process.env.JWT_TOKEN;
if (!tokenSecret) throw new Error("JWT_TOKEN is missing in env file");

const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: tokenSecret,
};

passport.use(new Strategy(options, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.id }).select("-password");
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
    scope: ['profile', 'email'] // Add the 'email' scope here
}, async (req: Request, accessToken: string, refreshToken: string, params: GoogleCallbackParameters, profile: Profile, cb: VerifyCallback) => {
    try {
        // Access the user's email from the profile object
        // const email = profile.emails?.[0]?.value;
        // if (!email) {
        //     throw new Error("Email not found in Google profile. Please provide an email address.");
        // }
        const user = await User.findOne({ googleId: profile.id });
        console.log(profile);
        console.log('user', user);
        if (!user) {
            let newUser = new User({ googleId: profile.id, name: profile.displayName, email: 'email' }) 
            await newUser.save();
            return cb(null, newUser)
        }
        return cb(null, user)
    } catch (error) {
        console.log((error as Error).message);
        return cb((error as Error), undefined)
    }
}));