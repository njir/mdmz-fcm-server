import express from 'express';
import request from 'request-promise';
import response from '../helpers/response';

const KAKAO_USER_ME = 'https://kapi.kakao.com/v1/user/me';
const KAKAO_LOGOUT = 'https://kapi.kakao.com/v1/user/logout';

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

const logout = (req, res) => {
    const token = req.body.token;
    if (!token) return response.sendBadRequest(res, 'Access token is a required parameter.');

    const logoutRequest = request({
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        url: KAKAO_LOGOUT,
    });

    return logoutRequest
        .then(resData => {
            console.log(resData);
            const message = JSON.parse(resData);
            return response.sendSuccess(res, message);
        })
        .catch(err => {
            return response.sendBadRequest(res, err);
        });
}

const verifyKaKaoToken = (req, res) => {
    const token = req.body.token;
    if (!token) return response.sendBadRequest(res, 'Access token is a required parameter.');

    return getProfileFromKaKao(token)
        .then(resData => {
            // TODO: save user data to DB or Firebase
            const message = JSON.parse(resData);
            return response.sendSuccess(res, message);
        })
        .catch(err => {
            return response.sendBadRequest(res, err);
        });
}

//! Define routes
routes.route('/verify')
    .post(verifyKaKaoToken);

routes.route('/logout')
    .post(logout);

module.exports = routes;
