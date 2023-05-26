import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createSalesData } from 'apiSdk/sales-data';
import { Error } from 'components/error';
import { salesDataValidationSchema } from 'validationSchema/sales-data';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { MenuItemInterface } from 'interfaces/menu-item';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getMenuItems } from 'apiSdk/menu-items';
import { getRestaurants } from 'apiSdk/restaurants';
import { SalesDataInterface } from 'interfaces/sales-data';

function SalesDataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SalesDataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSalesData(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SalesDataInterface>({
    initialValues: {
      total_sales: 0,
      average_order_value: 0,
      most_popular_item: (router.query.most_popular_item as string) ?? null,
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: salesDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Sales Data
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="total_sales" mb="4" isInvalid={!!formik.errors?.total_sales}>
            <FormLabel>Total Sales</FormLabel>
            <NumberInput
              name="total_sales"
              value={formik.values?.total_sales}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('total_sales', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.total_sales && <FormErrorMessage>{formik.errors?.total_sales}</FormErrorMessage>}
          </FormControl>
          <FormControl id="average_order_value" mb="4" isInvalid={!!formik.errors?.average_order_value}>
            <FormLabel>Average Order Value</FormLabel>
            <NumberInput
              name="average_order_value"
              value={formik.values?.average_order_value}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('average_order_value', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.average_order_value && (
              <FormErrorMessage>{formik.errors?.average_order_value}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<MenuItemInterface>
            formik={formik}
            name={'most_popular_item'}
            label={'Most Popular Item'}
            placeholder={'Select Menu Item'}
            fetcher={getMenuItems}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.id}
              </option>
            )}
          />
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.id}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default SalesDataCreatePage;
