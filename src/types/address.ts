export type AddressType = 'HOME' | 'WORK' | 'OTHER';

export type Address = {
  id: string;
  type: AddressType;
  flatNumber: string;
  area: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
};
