import moment from 'moment';

import { IUserFactory } from './IUserFactory';
import { Courier } from '../entities/users/Courier';

class CourierFactory implements IUserFactory<Courier> {

  createNew(courierId: string, courierString: string): Courier {
    const courierObj = JSON.parse(courierString);
    const courier: Courier = new Courier();
    courier.setId(courierId);
    courier.setFirstName(courierObj.firstName);
    courier.setLastName(courierObj.lastName);
    courier.setEmail(courierObj.email);
    courier.setCountry(courierObj.country);
    courier.setLocationId(courierObj.locationId);
    courier.setMobileNum(courierObj.mobileNum);
    courier.setVehicleType(courierObj.vehicleType);
    courier.setPreferredZone(courierObj.preferredZone);
    courier.setTimeCreated(moment().format());
    courier.setVerificationStatus(false);
    return courier;
  }

}

export { CourierFactory };
