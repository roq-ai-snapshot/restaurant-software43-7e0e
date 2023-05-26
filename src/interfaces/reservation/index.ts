import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface ReservationInterface {
  id?: string;
  date: Date;
  time: Date;
  party_size: number;
  customer_id: string;
  restaurant_id: string;
  table_status: string;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
