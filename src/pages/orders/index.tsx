import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getOrders, deleteOrderById } from 'apiSdk/orders';
import { OrderInterface } from 'interfaces/order';
import { Error } from 'components/error';

function OrderListPage() {
  const { data, error, isLoading, mutate } = useSWR<OrderInterface[]>(
    () => '/orders',
    () =>
      getOrders({
        relations: ['user', 'restaurant'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteOrderById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Order
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/orders/create`}>
          <Button colorScheme="blue" mr="4">
            Create
          </Button>
        </Link>
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Status</Th>
                  <Th>Created At</Th>
                  <Th>Customer</Th>
                  <Th>Restaurant</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.status}</Td>
                    <Td>{record.created_at as unknown as string}</Td>
                    <Td>{record.user?.roq_user_id}</Td>
                    <Td>{record.restaurant?.name}</Td>

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
                      <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default OrderListPage;
