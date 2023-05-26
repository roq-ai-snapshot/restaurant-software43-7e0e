import * as yup from 'yup';
import { menuItemValidationSchema } from 'validationSchema/menu-items';
import { orderValidationSchema } from 'validationSchema/orders';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { salesDataValidationSchema } from 'validationSchema/sales-data';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  menu_item: yup.array().of(menuItemValidationSchema),
  order: yup.array().of(orderValidationSchema),
  reservation: yup.array().of(reservationValidationSchema),
  sales_data: yup.array().of(salesDataValidationSchema),
});
