export interface IMenuItem {
  menu: string;
  price: number;
}
export interface TDayMenu {
  day?: string; // Example: "Saturday"
  morning?: IMenuItem;
  evening?: IMenuItem;
  night?: IMenuItem;
}

export interface TMenu {
  day: TDayMenu[];
  author_id: string;
}
