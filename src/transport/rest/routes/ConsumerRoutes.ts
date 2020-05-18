import express = require('express');

import { ConsumerController } from '../../../domain/controllers/ConsumerController';

const app: express.Application = express();
const consumerRouter: express.Router = express.Router();

const consumerController: ConsumerController = new ConsumerController();

/**
 * route definitions
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
