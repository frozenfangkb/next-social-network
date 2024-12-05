export interface UserSchema {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressSchema;
  phone: string;
  website: string;
  company: CompanySchema;
}

export interface AddressSchema {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoSchema;
}

export interface GeoSchema {
  lat: string;
  lng: string;
}

export interface CompanySchema {
  name: string;
  catchPhrase: string;
  bs: string;
}
