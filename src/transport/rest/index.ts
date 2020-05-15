import { express } from 'express';
import { cors } from 'cors';

import { consumerRouter } from './routes/ConsumerRoutes';
import { courierRouter } from './routes/CourierRoutes';

const app: express.Application;
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
  origin: API_URL,
  preflightContinue: false
};

function startServer(): void {
  app.listen(3000, function() {
    console.log(‘App is listening on port 3000!’);
  });
}

function initServer(): void {
  app = express();
  app.use(cors(corsOptions));
  app.use('/consumers', consumerRouter);
  app.use('/couriers', courierRouter);
}

function startServer(): void {
  app.listen(3000, function() {
    console.log(‘App is listening on port 3000!’);
  });
}

initServer();
startServer();
