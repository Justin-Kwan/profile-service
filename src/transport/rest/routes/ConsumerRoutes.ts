import express = require('express');
const bodyParser = require('body-parser');

import { RequestValidator } from '../../../middleware/rest/RequestValidator';
import { ConsumerController } from '../../../domain/controllers/ConsumerController';

const app: express.Application = express();
const consumerRouter: express.Router = express.Router();

const consumerController: ConsumerController = new ConsumerController();
const requestParamChecker: RequestValidator = new RequestValidator();

consumerRouter.use(bodyParser.urlencoded({ extended: true }));
consumerRouter.use(bodyParser.json());

consumerRouter.use(requestParamChecker.validateApiKey);
consumerRouter.use(requestParamChecker.validateRequestContent);
consumerRouter.use(requestParamChecker.validateConsumerJsonBody);

/**
 * consume profile route definitions
 */
consumerRouter.route('/consumers/:id').post(
  consumerController
  .createUser
  .bind(consumerController));

consumerRouter.route('/consumers/:id').put(
  consumerController
  .updateUser
  .bind(consumerController));

consumerRouter.route('/consumers/:id').get(
  consumerController
  .getUser
  .bind(consumerController));

consumerRouter.route('/consumers/:id').delete(
  consumerController
  .deleteUser
  .bind(consumerController));

export { consumerRouter };
