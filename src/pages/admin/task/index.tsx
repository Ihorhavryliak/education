
import { Box, Card, CardBody, Container, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function TaskCreate() {
  const session = useSession();
  const router = useRouter();
  const { data: taskData } = api.task.all.useQuery();
  useEffect(() => {
    if (
      (!(session.status === "loading") && !session?.data) ||
      session?.data?.user?.role !== 1
    ) {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if(session?.data?.user?.role === 1){

 
  return (
    <Layout>
     
      <Container>
      <Box my='25px'>
        <Link href={"/admin/task/create"}>Create task</Link>
      </Box>
        <Flex gap={'15px'}>
          {taskData?.map((task) => {
            return (
              <Card key={task.id}>
                <CardBody>
                  <Text>
                   {task.name}
                  </Text>
                  <Box >  {task.description} </Box>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </Container>
    </Layout>
  );
}
}
