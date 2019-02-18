import express from 'express';

import auth from '../controllers/auth';

var passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;


const routes = express.Router();

routes.route('/auth')
    .post(auth.authenticate);

// for Kakao Auth
passport.use('login-kakao', new KakaoStrategy({
    clientID : '43b73b305903492b11653d8d295f8388',
    callbackURL : 'http://localhost:9000/auth/callback'
},
function(accessToken, refreshToken, profile, callback) {
    console.log(profile);
    return callback(null, profile);
}
));

routes.route('/kakao')
    .get(passport.authenticate('login-kakao'));

routes.route('/callback')
    .get(passport.authenticate('login-kakao', {
        successRedirect: '/main',
        failureRedirect: '/'
    }));

module.exports = routes;
