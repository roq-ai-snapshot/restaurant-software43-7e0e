import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getRestaurantById } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { RestaurantInterface } from 'interfaces/restaurant';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { deleteMenuItemById } from 'apiSdk/menu-items';
import { deleteOrderById } from 'apiSdk/orders';
import { deleteReservationById } from 'apiSdk/reservations';
import { deleteSalesDataById } from 'apiSdk/sales-data';

function RestaurantViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RestaurantInterface>(
    () => (id ? `/restaurants/${id}` : null),
    () =>
      getRestaurantById(id, {
        relations: ['user', 'menu_item', 'order', 'reservation', 'sales_data'],
      }),
  );

  const menu_itemHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteMenuItemById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const orderHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteOrderById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const reservationHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteReservationById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const sales_dataHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteSalesDataById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Restaurant Details
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Name: {data?.name}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Owner: <Link href={`/users/view/${data?.user?.id}`}>{data?.user?.roq_user_id}</Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Menu Item
            </Text>
            <Link href={`/menu-items/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Price</Th>
                    <Th>Image URL</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.menu_item?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.name}</Td>
                      <Td>{record.description}</Td>
                      <Td>{record.price}</Td>
                      <Td>{record.image_url}</Td>
                      <Td>
                        <Button>
                          <Link href={`/menu-items/edit/${record.id}`}>Edit</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button>
                          <Link href={`/menu-items/view/${record.id}`}>View</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button onClick={() => menu_itemHandleDelete(record.id)}>Delete</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Text fontSize="md" fontWeight="bold">
              Order
            </Text>
            <Link href={`/orders/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Order ID</Th>
                    <Th>Status</Th>
                    <Th>Created At</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.order?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.id}</Td>
                      <Td>{record.status}</Td>
                      <Td>{record.created_at as unknown as string}</Td>
                      <Td>
                        <Button>
                          <Link href={`/orders/edit/${record.id}`}>Edit</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button>
                          <Link href={`/orders/view/${record.id}`}>View</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button onClick={() => orderHandleDelete(record.id)}>Delete</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Text fontSize="md" fontWeight="bold">
              Reservation
            </Text>
            <Link href={`/reservations/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Time</Th>
                    <Th>Party Size</Th>
                    <Th>Table Status</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.reservation?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.date as unknown as string}</Td>
                      <Td>{record.time as unknown as string}</Td>
                      <Td>{record.party_size}</Td>
                      <Td>{record.table_status}</Td>
                      <Td>
                        <Button>
                          <Link href={`/reservations/edit/${record.id}`}>Edit</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button>
                          <Link href={`/reservations/view/${record.id}`}>View</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button onClick={() => reservationHandleDelete(record.id)}>Delete</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Text fontSize="md" fontWeight="bold">
              Sales Data
            </Text>
            <Link href={`/sales-data/create?restaurant_id=${data?.id}`}>
              <Button colorScheme="blue" mr="4">
                Create
              </Button>
            </Link>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Total Sales</Th>
                    <Th>Average Order Value</Th>
                    <Th>Edit</Th>
                    <Th>View</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.sales_data?.map((record) => (
                    <Tr key={record.id}>
                      <Td>{record.total_sales}</Td>
                      <Td>{record.average_order_value}</Td>
                      <Td>
                        <Button>
                          <Link href={`/sales-data/edit/${record.id}`}>Edit</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button>
                          <Link href={`/sales-data/view/${record.id}`}>View</Link>
                        </Button>
                      </Td>
                      <Td>
                        <Button onClick={() => sales_dataHandleDelete(record.id)}>Delete</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default RestaurantViewPage;
