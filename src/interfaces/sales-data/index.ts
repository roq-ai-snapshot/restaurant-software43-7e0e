import { MenuItemInterface } from 'interfaces/menu-item';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface SalesDataInterface {
  id?: string;
  total_sales: number;
  most_popular_item: string;
  average_order_value: number;
  restaurant_id: string;

  menu_item?: MenuItemInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
