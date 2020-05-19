import express = require('express');
import bodyParser = require('body-parser');

import { RequestValidator } from '../../../middleware/rest/RequestValidator';
import { ConsumerController } from '../../../domain/controllers/ConsumerController';

const app: express.Application = express();
const consumerRouter: express.Router = express.Router();

const consumerController: ConsumerController = new ConsumerController();
const requestParamChecker: RequestValidator = new RequestValidator();

consumerRouter.use(bodyParser.urlencoded({ extended: true }));
consumerRouter.use(bodyParser.json());

/**
 * api key validation middleware appied to all routes
 */
consumerRouter.use(requestParamChecker.validateApiKey);

/**
 * consumer profile route definitions
 */
consumerRouter.post('/consumers/:id',
  requestParamChecker.validateConsumerJsonBody,
  requestParamChecker.validateRequestContent,
  consumerController.createUser.bind(consumerController)
);

consumerRouter.put('/consumers/:id',
  requestParamChecker.validateConsumerJsonBody,
  requestParamChecker.validateRequestContent,
  consumerController.updateUser.bind(consumerController)
);

consumerRouter.get('/consumers/:id',
  consumerController.getUser.bind(consumerController)
);

consumerRouter.delete('/consumers/:id',
  consumerController.deleteUser.bind(consumerController)
);

export { consumerRouter };
