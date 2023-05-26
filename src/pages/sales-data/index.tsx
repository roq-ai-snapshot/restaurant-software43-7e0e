import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getSalesData, deleteSalesDataById } from 'apiSdk/sales-data';
import { SalesDataInterface } from 'interfaces/sales-data';
import { Error } from 'components/error';

function SalesDataListPage() {
  const { data, error, isLoading, mutate } = useSWR<SalesDataInterface[]>(
    () => '/sales-data',
    () =>
      getSalesData({
        relations: ['menu_item', 'restaurant'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteSalesDataById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Sales Data
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/sales-data/create`}>
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
                  <Th>Total Sales</Th>
                  <Th>Average Order Value</Th>
                  <Th>Most Popular Item</Th>
                  <Th>Restaurant</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.total_sales}</Td>
                    <Td>{record.average_order_value}</Td>
                    <Td>{record.menu_item?.name}</Td>
                    <Td>{record.restaurant?.name}</Td>

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
export default SalesDataListPage;
