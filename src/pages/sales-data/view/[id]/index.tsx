import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getSalesDataById } from 'apiSdk/sales-data';
import { Error } from 'components/error';
import { SalesDataInterface } from 'interfaces/sales-data';
import useSWR from 'swr';
import { useRouter } from 'next/router';

function SalesDataViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SalesDataInterface>(
    () => (id ? `/sales-data/${id}` : null),
    () =>
      getSalesDataById(id, {
        relations: ['menu_item', 'restaurant'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Sales Data Details
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Total Sales: {data?.total_sales}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Average Order Value: {data?.average_order_value}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Most Popular Item: <Link href={`/menu-items/view/${data?.menu_item?.id}`}>{data?.menu_item?.name}</Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Restaurant: <Link href={`/restaurants/view/${data?.restaurant?.id}`}>{data?.restaurant?.name}</Link>
            </Text>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default SalesDataViewPage;
