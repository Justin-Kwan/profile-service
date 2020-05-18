import { User } from './User';

class Courier extends User {

  private vehicleType: string;

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
  }): void {
    this.setFirstName(courierParams.firstName);
    this.setLastName(courierParams.lastName);
    this.setEmail(courierParams.email);
    this.setCountry(courierParams.country);
    this.setLocationId(courierParams.locationId);
    this.setMobileNum(courierParams.mobileNum);
    this.setVehicleType(courierParams.vehicleType);
  }

  setVehicleType(vehicleType: string): void {
    this.vehicleType = vehicleType;
  }

  getVehicleType(): string {
    return this.vehicleType;
  }

}

export { Courier };
