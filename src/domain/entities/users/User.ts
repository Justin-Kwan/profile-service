
abstract class User {

  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private country: string;
  private locationId: string;
  private mobileNum: string;
  private timeCreated: string;
  private verificationStatus: boolean = false;
  private deletionStatus: boolean = false;

  setId(id: string): void {
    this.id = id;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setCountry(country: string): void {
    this.country = country;
  }

  setLocationId(locationId: string): void {
    this.locationId = locationId;
  }

  setMobileNum(mobileNum: string): void {
    this.mobileNum = mobileNum;
  }

  setTimeCreated(timeCreated: string): void {
    this.timeCreated = timeCreated;
  }

  setVerificationStatus(verificationStatus: boolean): void {
    this.verificationStatus = verificationStatus;
  }

  setDeletionStatus(deletionStatus: boolean): void {
    this.deletionStatus = deletionStatus;
  }

  flagAsVerified(): void {
    this.verificationStatus = true;
  }

  flagAsDeleted(): void {
    this.deletionStatus = true;
  }

  getId(): string {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getCountry(): string {
    return this.country;
  }

  getLocationId(): string {
    return this.locationId;
  }

  getMobileNum(): string {
    return this.mobileNum;
  }

  getTimeCreated(): string {
    return this.timeCreated;
  }

  isVerified(): boolean {
    return this.verificationStatus;
  }

  isDeleted(): boolean {
    return this.deletionStatus;
  }

}

export { User };
