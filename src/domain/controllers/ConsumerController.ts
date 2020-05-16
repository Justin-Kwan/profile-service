import { UserController } from './UserController';
import { ConsumerService } from '../user-services/ConsumerService';

class ConsumerController extends UserController {

  constructor() {
    super(new ConsumerService());
  }

}

export { ConsumerController };
