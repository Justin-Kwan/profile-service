import express = require('express');
import cors = require('cors');

import { consumerRouter } from './routes/ConsumerRoutes';
import { courierRouter } from './routes/CourierRoutes';

const app: express.Application = express();

const corsOptions: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'
  ],
  credentials: true,
  methods: 'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE',
  // origin: API_URL,
  preflightContinue: false
};

function initRestApiServer(): void {
  app.use(cors(corsOptions));
  app.use('/', consumerRouter);
  app.use('/', courierRouter);
}

function startRestApiServer(): void {
  app.listen(3000, () => {
    console.log('Server started at 127.0.0.1:3000');
  });
}

initRestApiServer();
startRestApiServer();
