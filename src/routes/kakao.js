import express from 'express';
import request from 'request-promise';
import response from '../helpers/response';

const KAKAO_USER_ME = 'https://kapi.kakao.com/v1/user/me';
const routes = express.Router();

//! Implement functions
const getProfileFromKaKao = (kakaoToken) => {
    console.log('Requesting user profile from Kakao API');
    return request({
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + kakaoToken },
        url: KAKAO_USER_ME,
    });
}

const verifyToken = (req, res) => {
    const token = req.body.token;
    if (!token) return response.sendBadRequest(res, 'Access token is a required parameter.');

    return getProfileFromKaKao(token)
        .then(kakaoRes => {
            // TODO: save user data to DB or Firebase
            const message = JSON.parse(kakaoRes);
            return response.sendSuccess(res, message);
        })
        .catch(err => {
            return response.sendBadRequest(res, err);
        })
}

//! Define routes
routes.route('/verify')
    .post(verifyToken);

module.exports = routes;
