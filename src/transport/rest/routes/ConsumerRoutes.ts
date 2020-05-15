import { export } from 'express';

import { ConsumerController } from '../../../domain/controllers/CourierController';

const app = express();
const consumerRouter = express.Router();

consumerRouter.route('/v1/consumers/{id}').post(consumerController.createEntity);
consumerRouter.route('/v1/consumers/{id}').put(consumerController.updateEntity);
consumerRouter.route('/v1/consumers/{id}').get(consumerController.getEntity);
consumerRouter.route('/v1/consumers/{id}').delete(consumerController.deleteEntity);

export { consumerRouter };
