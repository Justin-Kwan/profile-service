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

  updateUserObject(courierParams: any, courier: Courier): Courier {
    courier.setFirstName(courierParams.firstName);
    courier.setLastName(courierParams.lastName);
    courier.setEmail(courierParams.email);
    courier.setCountry(courierParams.country);
    courier.setLocationId(courierParams.locationId);
    courier.setMobileNum(courierParams.mobileNum);
    courier.setVehicleType(courierParams.vehicleType);
    courier.setPreferredZone(courierParams.preferredZone);
    return courier;
  }

}

export { CourierService };
