import { MenuItemInterface } from 'interfaces/menu-item';
import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { SalesDataInterface } from 'interfaces/sales-data';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  owner_id: string;
  menu_item?: MenuItemInterface[];
  order?: OrderInterface[];
  reservation?: ReservationInterface[];
  sales_data?: SalesDataInterface[];
  user?: UserInterface;
  _count?: {
    menu_item?: number;
    order?: number;
    reservation?: number;
    sales_data?: number;
  };
}
