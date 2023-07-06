
import { Box, Card, CardBody, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function TaskCreate() {
  const { data: taskData } = api.task.all.useQuery();
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
