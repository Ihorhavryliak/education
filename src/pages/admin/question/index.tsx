import { Link } from "@chakra-ui/next-js";
import { Box, Button, Card, CardBody, Container, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function QuestionCreate() {
  const { data: questionData } = api.question.all.useQuery();
  const session = useSession();
  const router = useRouter();
  const ctx = api.useContext()
  const { mutate } = api.question.delete.useMutation({
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

  const handleDeleteQuestion = (questionId: number) => {
    mutate({questionId})
  }

  if (session?.data?.user?.role === 1) {
    return (
      <Layout>
        <ArrowBack />
        <Container>
          <Box mb='1rem'>
            <Link variant={'button'} href={"/admin/question/create"}>Створити питання</Link>
          </Box>
          <Flex gap={"15px"}     flexWrap='wrap'>
            {questionData?.map((question) => {
              return (
                <Card key={question.id} color='gray.400' maxW={'350px'}>
                  <CardBody>
                    <Text>{question.name}</Text>
                    <Box noOfLines={2}> {question.answer} </Box>
                    <Link   variant={"button"} href={`/admin/question/edit/${question.id}`}>
                      Редагувати питання
                    </Link>
                    <Button ms='8px' variant={'main'} onClick={()=>handleDeleteQuestion(question.id)}>Видалити</Button>
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
