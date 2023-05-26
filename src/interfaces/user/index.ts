import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface UserInterface {
  id?: string;
  roq_user_id: string;
  tenant_id: string;
  order?: OrderInterface[];
  reservation?: ReservationInterface[];
  restaurant?: RestaurantInterface[];

  _count?: {
    order?: number;
    reservation?: number;
    restaurant?: number;
  };
}
