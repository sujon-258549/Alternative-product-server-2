export interface TMenuItem {
  menu: string;
  price: number;
}

export interface TMenu {
  day: string;
  author_id: string;
  morning: TMenuItem;
  evening: TMenuItem;
  night: TMenuItem;
}
