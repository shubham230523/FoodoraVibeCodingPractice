import { User } from '../types/user';
import { Address } from '../types/address';

export const currentUser: User = {
  id: 'user-1',
  name: 'Shubham',
  email: 'shubham@example.com',
  phone: '+91 9876543210',
  profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'
};

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    type: 'HOME',
    flatNumber: 'A-402, Sunshine Apartments',
    area: 'HSR Layout',
    landmark: 'Near HSR Police Station',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560102',
    latitude: 12.9141,
    longitude: 77.6411
  },
  {
    id: 'addr-2',
    type: 'WORK',
    flatNumber: 'Floor 5, Tech Park',
    area: 'Whitefield',
    landmark: 'Opposite Metro Station',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    latitude: 12.9698,
    longitude: 77.7500
  }
];
