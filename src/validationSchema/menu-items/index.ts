import * as yup from 'yup';
import { orderItemValidationSchema } from 'validationSchema/order-items';
import { salesDataValidationSchema } from 'validationSchema/sales-data';

export const menuItemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number().integer().required(),
  image_url: yup.string(),
  restaurant_id: yup.string().nullable().required(),
  order_item: yup.array().of(orderItemValidationSchema),
  sales_data: yup.array().of(salesDataValidationSchema),
});
