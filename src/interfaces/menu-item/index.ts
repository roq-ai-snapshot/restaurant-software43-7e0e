import { OrderItemInterface } from 'interfaces/order-item';
import { SalesDataInterface } from 'interfaces/sales-data';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface MenuItemInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  restaurant_id: string;
  order_item?: OrderItemInterface[];
  sales_data?: SalesDataInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    order_item?: number;
    sales_data?: number;
  };
}
