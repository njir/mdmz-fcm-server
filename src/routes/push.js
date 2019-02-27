import express from 'express';
import response from '../helpers/response';
import * as admin from 'firebase-admin';

const serviceAccount = require('../config/MDMZ_ADMIN_KEY.json');
const routes = express.Router();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//! Implements function
const pushMessage = (req, res) => {
    const token = req.body.token;
    const title = req.body.title;
    const body = req.body.body;
    if (!token) return response.sendBadRequest(res, 'Device token is a required parameter.');

    const message = {
        token: token,
        notification: { title, body },
    };

    return admin.messaging().send(message)
        .then((resData) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', resData);
            return response.sendSuccess(res, resData);
        })
        .catch((err) => {
            console.log('Error sending message:', err);
            return response.sendBadRequest(res, err);
        });
}

//! Define routes
routes.route('/message')
    .post(pushMessage);

module.exports = routes;
