import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function TaskCreate() {
  const session = useSession();
  const router = useRouter();
  const ctx = api.useContext();
  const { data: taskData } = api.task.all.useQuery();
  const { mutate } = api.task.delete.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
      void ctx.complete.invalidate();
    },
  });

  
  useEffect(() => {
    if (
      (!(session.status === "loading") && !session?.data) ||
      session?.data?.user?.role !== 1
    ) {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (session?.data?.user?.role === 1) {
    const handleDeleteTask = (taskId: number) => {
      mutate({ taskId });
    };
    return (
      <Layout>
        <ArrowBack />
        <Container>
          <Box my="25px">
            <Link href={"/admin/task/create"}>Створити завдання</Link>
          </Box>
          <Flex gap={"15px"}>
            {taskData?.map((task) => {
              return (
                <Card key={task.id}>
                  <CardBody color={"gray.400"}>
                    <Text>{task.name}</Text>
                    <Text mb="1rem"> {task.description} </Text>
                    <Link  variant={"button"} href={`/admin/task/edit/${task.id}`}>
                      Редагувати завдання
                    </Link>
                    <Button ms='8px' variant={'main'} onClick={()=>handleDeleteTask(task.id)}>Видалити</Button>
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
