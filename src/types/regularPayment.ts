export interface RegularPaymentItem {
  id: number;
  date: string;
  status: 'paid' | 'due' | 'scheduled';
  description: string;
  amount: number;
}

export interface RegularPaymentProps {
  items: RegularPaymentItem[];
}
