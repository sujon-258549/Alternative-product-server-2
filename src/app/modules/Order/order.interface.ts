export interface TOrderItem {
  menu: string;
  price: number;
}

export interface TDayMenu {
  day?: string; // Example: "Saturday"
  morning?: TOrderItem;
  evening?: TOrderItem;
  night?: TOrderItem;
}

export interface TOrderMenu {
  author_id: string;
  paymentStatus: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  transactionId: string | number;
  total_price: number;
  orderId: string;
  days: TDayMenu[]; // Array of daily menus
}
