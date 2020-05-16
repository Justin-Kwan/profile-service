import { User } from './User';

class Courier extends User {

  private vehicleType: string;
  private preferredZone: string;

  constructor() {
    super();
  }

  updateFields(courierParams: {
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    locationId: string,
    mobileNum: string,
    vehicleType: string,
    preferredZone: string
  }): void {
    this.setFirstName(courierParams.firstName);
    this.setLastName(courierParams.lastName);
    this.setEmail(courierParams.email);
    this.setCountry(courierParams.country);
    this.setLocationId(courierParams.locationId);
    this.setMobileNum(courierParams.mobileNum);
    this.setVehicleType(courierParams.vehicleType);
    this.setPreferredZone(courierParams.preferredZone);
  }

  setVehicleType(vehicleType: string): void {
    this.vehicleType = vehicleType;
  }

  setPreferredZone(preferredZone: string): void {
    this.preferredZone = preferredZone;
  }

  getVehicleType(): string {
    return this.vehicleType;
  }

  getPreferredZone(): string {
    return this.preferredZone;
  }

}

export { Courier };
