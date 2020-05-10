import { EntityFactory } from './EntityFactory';
import { Courier } from '../users/Courier';

class CourierFactory extends EntityFactory {

  getEntity(courierString: string): Courier {
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
    courier.setTimeCreated(courierObj.timeCreated);
    courier.setVerificationStatus(courierObj.verificationStatus);
    courier.setDeletionStatus(courierObj.deletionStatus);
    courier.setVehicleType(courierObj.vehicleType);
    courier.setPreferredZone(courierObj.preferredZone);
    courier.setInviteCode(courierObj.inviteCode);
    return courier;
  }

}

export { CourierFactory };
