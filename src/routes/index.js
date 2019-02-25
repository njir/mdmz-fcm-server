import express from 'express';

import push from './push';
import response from '../helpers/response';

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/push', push);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Ok' });
});

routes.use((req, res) => {
    response.sendNotFound(res);
});

module.exports = routes;
