import express from 'express';
import auth from '../controllers/auth';

const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const KAKAO_CLIENT_ID = '43b73b305903492b11653d8d295f8388';
const KAKAO_CALLBACK_URL = 'http://localhost:9000/auth/callback';

passport.use('login-kakao',
    new KakaoStrategy({
        clientID: KAKAO_CLIENT_ID, callbackURL: KAKAO_CALLBACK_URL
    }, (accessToken, refreshToken, profile, callback) => {
        console.log('accessToken: ', accessToken);
        console.log('refreshToken: ', refreshToken);
        console.log('profile: ', profile);
        return callback(null, profile);
    })
);

const routes = express.Router();

routes.route('/auth')
    .post(auth.authenticate);

// using passport
routes.route('/kakao')
    .get(passport.authenticate('login-kakao'));

routes.route('/callback')
    .get(passport.authenticate('login-kakao', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

module.exports = routes;
