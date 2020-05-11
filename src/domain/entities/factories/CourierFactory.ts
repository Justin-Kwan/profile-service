import { EntityFactory } from './EntityFactory';
import { Courier } from '../users/Courier';

class CourierFactory extends EntityFactory {

  constructor() {
    super();
  }

  getEntity(courierString: string/*, caller: string*/): Courier {
    const courierObj = JSON.parse(courierString);
    const courier: Courier = new Courier();
    courier.setId(courierObj.id);
    courier.setFirstName(courierObj.firstName);
    courier.setLastName(courierObj.lastName);
    courier.setAddress(courierObj.address);
    courier.setEmail(courierObj.email);
    courier.setCountry(courierObj.country);
    courier.setLocationId(courierObj.locationId);
    courier.setMobileNum(courierObj.mobileNum);
    courier.setVehicleType(courierObj.vehicleType);
    courier.setPreferredZone(courierObj.preferredZone);
    courier.setDeletionStatus(courierObj.deletionStatus);

    //if(caller === REPOSITORY) {
      // user cannot set their own time of creation
      courier.setTimeCreated(courierObj.timeCreated);
      // user cannot change their own verification status
      courier.setVerificationStatus(courierObj.verificationStatus);
      // user cannot set their own invite code
      courier.setInviteCode(courierObj.inviteCode);
    //}

    return courier;
  }

}

export { CourierFactory };
