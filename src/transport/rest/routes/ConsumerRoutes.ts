import express = require('express');
import bodyParser = require('body-parser');

import { RequestValidator } from '../../../middleware/rest/RequestValidator';
import { ConsumerController } from '../../../domain/controllers/ConsumerController';

const app: express.Application = express();
const consumerRouter: express.Router = express.Router();

const consumerController: ConsumerController = new ConsumerController();
const requestValidator: RequestValidator = new RequestValidator();

/**
 * middleware filters applied to all routes
 */
consumerRouter.use(requestValidator.validateApiKey);
consumerRouter.use(requestValidator.validateRequestContentType);
consumerRouter.use(bodyParser.urlencoded({ extended: true }));
consumerRouter.use(bodyParser.json());

/**
 * consumer profile route definitions
 */
consumerRouter.post('/consumers/:id',
  requestValidator.validateConsumerJsonBody,
  consumerController.createUser.bind(consumerController)
);

consumerRouter.put('/consumers/:id',
  requestValidator.validateConsumerJsonBody,
  consumerController.updateUser.bind(consumerController)
);

consumerRouter.get('/consumers/:id',
  consumerController.getUser.bind(consumerController)
);

consumerRouter.delete('/consumers/:id',
  consumerController.deleteUser.bind(consumerController)
);

export { consumerRouter };
