import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from 'config';
import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log('MDMZ push server started on port: ' + port);

module.exports = app;
