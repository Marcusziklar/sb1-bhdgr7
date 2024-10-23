import { Apartment } from '../types';

export const apartments: Apartment[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    price: 2500,
    location: 'Downtown',
    sqft: 850,
    beds: 1,
    baths: 1,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    ],
    description: 'Stunning downtown loft with high ceilings and city views.',
  },
  {
    id: '2',
    title: 'Luxury Waterfront Apartment',
    price: 3800,
    location: 'Waterfront',
    sqft: 1200,
    beds: 2,
    baths: 2,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    ],
    description: 'Premium waterfront living with panoramic views and modern amenities.',
  },
  {
    id: '3',
    title: 'Cozy Garden Studio',
    price: 1800,
    location: 'Midtown',
    sqft: 600,
    beds: 1,
    baths: 1,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
    ],
    description: 'Charming studio apartment with private garden access.',
  },
];