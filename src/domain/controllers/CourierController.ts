import { UserController } from './UserController';
import { CourierService } from '../user-services/CourierService';

class CourierController extends UserController {

  constructor() {
    super(new CourierService());
  }

}

export { CourierController };
