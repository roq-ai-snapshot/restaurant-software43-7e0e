import * as yup from 'yup';

export const salesDataValidationSchema = yup.object().shape({
  total_sales: yup.number().integer().required(),
  average_order_value: yup.number().integer().required(),
  most_popular_item: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
