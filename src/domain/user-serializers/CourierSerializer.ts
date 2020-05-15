import { IUserSerializer } from './IUserSerializer';
import { Courier } from '../entities/users/Courier';


class CourierSerializer implements IUserSerializer<Courier> {

  /**
   * deserializes courier json string into courier object, copying
   * all fields
   * @param {string}
   * @return {Courier}
   */
  deserialize(courierString: string): Courier {
    const courierObj = JSON.parse(courierString);
    const courier: Courier = new Courier();
    courier.setId(courierObj.id);
    courier.setFirstName(courierObj.firstName);
    courier.setLastName(courierObj.lastName);
    courier.setEmail(courierObj.email);
    courier.setCountry(courierObj.country);
    courier.setLocationId(courierObj.locationId);
    courier.setMobileNum(courierObj.mobileNum);
    courier.setVehicleType(courierObj.vehicleType);
    courier.setPreferredZone(courierObj.preferredZone);
    courier.setTimeCreated(courierObj.timeCreated);
    courier.setVerificationStatus(courierObj.verificationStatus);
    return courier;
  }

  /**
   * serializes courier object into json string, filtering
   * out sensitive fields for web client
   * @param {Courier}
   * @return {string}
   */
  serializeForClient(courier: Courier): object {
    return {
      id: courier.getId(),
      firstName: courier.getFirstName(),
      lastName: courier.getLastName(),
      email: courier.getEmail(),
      country: courier.getCountry(),
      locationId: courier.getLocationId(),
      mobileNum: courier.getMobileNum(),
      vehicleType: courier.getVehicleType(),
      preferredZone: courier.getPreferredZone(),
      verificationStatus: courier.isVerified()
    };
  }

}

export { CourierSerializer };
