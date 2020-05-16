import { UserService } from './UserService';
import { CourierRepository } from '../../storage/repository/CourierRepository';
import { CourierFactory } from '../factories/CourierFactory';
import { CourierSerializer } from '../user-serializers/CourierSerializer';
import { Courier } from '../entities/users/Courier';

class CourierService extends UserService<Courier> {

  constructor() {
    super(
      new CourierRepository(),
      new CourierFactory(),
      new CourierSerializer()
    );
  }

}

export { CourierService };
