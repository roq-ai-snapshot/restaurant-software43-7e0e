import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getUserById } from 'apiSdk/users';
import { Error } from 'components/error';
import { UserInterface } from 'interfaces/user';
import useSWR from 'swr';
import { useRouter } from 'next/router';

function UserViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<UserInterface>(
    () => (id ? `/users/${id}` : null),
    () =>
      getUserById(id, {
        relations: [,],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        User Details
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Roq User ID: {data?.roq_user_id}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Tenant ID: {data?.tenant_id}
            </Text>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default UserViewPage;
