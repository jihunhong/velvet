import { RegularPaymentItem } from '@/types/RegularPayment';

export const paymentData: RegularPaymentItem[] = [
  {
    id: 1,
    date: 'Jul 8',
    status: 'paid',
    description: 'Spotify Premium',
    amount: 9000,
  },
  {
    id: 2,
    date: 'Jul 15',
    status: 'due',
    description: 'Netflix Premium',
    amount: 15000,
  },
  {
    id: 3,
    date: 'Jul 20',
    status: 'scheduled',
    description: 'Adobe Creative Cloud',
    amount: 52000,
  },
  {
    id: 4,
    date: 'Jul 25',
    status: 'scheduled',
    description: 'Credit Card Interest',
    amount: 14250,
  },
];
