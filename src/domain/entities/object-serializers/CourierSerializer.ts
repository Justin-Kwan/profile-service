import { Courier } from '../users/Courier';

class CourierSerializer {

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
    courier.setDeletionStatus(courierObj.deletionStatus);
    return courier;
  }

  serializeForClient(courier: Courier): string {
    return JSON.stringify({
      id: courier.getId(),
      firstName: courier.getFirstName(),
      lastName: courier.getLastName(),
      email: courier.getEmail(),
      country: courier.getCountry(),
      locationId: courier.getLocationId(),
      mobileNum: courier.getMobileNum(),
      vehicleType: courier.getVehicleType(),
      preferredZone: courier.getPreferredZone(),
    });
  }

}

export { CourierSerializer };
