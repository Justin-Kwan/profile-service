
interface IUser {
  updateFields(userParams: any): void;
  setId(id: string): void;
  setFirstName(firstName: string): void;
  setLastName(lastName: string): void;
  setEmail(email: string): void;
  setCountry(country: string): void;
  setLocationId(locationId: string): void;
  setMobileNum(mobileNum: string): void;
  setTimeCreated(timeCreated: string): void;
  setVerificationStatus(verificationStatus: boolean): void;
  flagAsVerified(): void;
  getId(): string;
  getFirstName(): string;
  getLastName(): string;
  getEmail(): string;
  getCountry(): string;
  getLocationId(): string;
  getMobileNum(): string;
  getTimeCreated(): string;
  isVerified(): boolean;
}

export { IUser };
