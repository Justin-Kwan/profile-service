require('custom-env').env(true);
import express = require('express');
import cors = require('cors');

import { consumerRouter } from './transport/rest/routes/ConsumerRoutes';
import { courierRouter } from './transport/rest/routes/CourierRoutes';

const app: express.Application = express();

/**
 * rest api config constants
 */
const API_VERSION_PATH: string = '/v1';
const corsOptions: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'
  ],
  credentials: true,
  methods: 'GET, PUT, POST, DELETE',
  // origin: API_URL,
  preflightContinue: false
};

function initRestApiServer(): void {
  app.use(cors(corsOptions));
  app.use(API_VERSION_PATH, consumerRouter);
  app.use(API_VERSION_PATH, courierRouter);
}

function startRestApiServer(): void {
  app.listen(process.env.NODE_PORT, () => {
    console.log('Profile service started in ' + process.env.NODE_ENV + ' mode');
    console.log('Profile service started at 127.0.0.1:' + process.env.NODE_PORT);
  });
}

initRestApiServer();
startRestApiServer();
