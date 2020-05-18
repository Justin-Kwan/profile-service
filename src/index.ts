import * as dotenv from "dotenv";
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

function setEnvConfigFile(): void {
  dotenv.config({
    path: '../../../.env'
  });
}

function initRestApiServer(): void {
  app.use(cors(corsOptions));
  app.use(API_VERSION_PATH, consumerRouter);
  app.use(API_VERSION_PATH, courierRouter);
}

function startRestApiServer(): void {
  app.listen(process.env.NODE_PORT, () => {
    console.log('Server started in ' + process.env.NODE_ENV + ' mode');
    console.log('Server started at 127.0.0.1:' + process.env.NODE_PORT);
  });
}

setEnvConfigFile();
initRestApiServer();
startRestApiServer();
