import { Box, Card, CardBody, Container, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function QuestionCreate() {
  const { data: questionData } = api.question.all.useQuery();
  const session = useSession();
  const router = useRouter();
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
    return (
      <Layout>
        <Container>
          <Box>
            <Link href={"/admin/question/create"}>Create question</Link>
          </Box>
          <Flex gap={"15px"}>
            {questionData?.map((question) => {
              return (
                <Card key={question.id}>
                  <CardBody>
                    <Text>{question.name}</Text>
                    <Box> {question.answer} </Box>
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
