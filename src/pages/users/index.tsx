import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getUsers, deleteUserById } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { Error } from 'components/error';

function UserListPage() {
  const { data, error, isLoading, mutate } = useSWR<UserInterface[]>(
    () => '/users',
    () =>
      getUsers({
        relations: [,],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteUserById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        User
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/users/create`}>
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
                  <Th>Roq User ID</Th>
                  <Th>Tenant ID</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.roq_user_id}</Td>
                    <Td>{record.tenant_id}</Td>

                    <Td>
                      <Button>
                        <Link href={`/users/edit/${record.id}`}>Edit</Link>
                      </Button>
                    </Td>
                    <Td>
                      <Button>
                        <Link href={`/users/view/${record.id}`}>View</Link>
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
export default UserListPage;
