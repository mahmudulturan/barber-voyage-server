import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Request, } from 'express';
import { GoogleCallbackParameters, Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import User from '../modules/user/user.model';
import configs from '.';

const tokenSecret = configs.jwt_token as string;

// function for getting cookie from req.cookies
const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

// options for get tplem from cookie
const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: tokenSecret,
};

// stratagy for jwt
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


// callback url for google authentication
const callbackURL = configs.node_env === "production" ? configs.live_server_url : configs.local_server_url;

// stratagy for gogle
passport.use(new GoogleStrategy({
    clientID: configs.google_client_id!,
    clientSecret: configs.google_client_secret!,
    callbackURL: `${callbackURL}/api/v1/auth/google/callback`,
    passReqToCallback: true,
    scope: ['profile', 'email']
}, async (req: Request, accessToken: string, refreshToken: string, params: GoogleCallbackParameters, profile: Profile, cb: VerifyCallback) => {
    try {
        const email = profile.emails?.[0]?.value;
        const image = profile.photos?.[0]?.value;
        const user = await User.findOneAndUpdate(
            { googleId: profile.id },
            {
                name: profile.displayName,
                email: email,
                image
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        return cb(null, user)
    } catch (error) {
        return cb(error as Error);
    }
}));


passport.serializeUser((user: any, done) => {
    done(null, user._id);
});


passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});