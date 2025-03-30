export interface TOrderItem {
  menu: string;
  price: number;
}

export interface TDayMenu {
  day: string; // Example: "Saturday"
  morning?: TOrderItem;
  evening?: TOrderItem;
  night?: TOrderItem;
}

export interface TMenu {
  author_id: string;
  orderId: string;
  days: TDayMenu[]; // Array of daily menus
}
