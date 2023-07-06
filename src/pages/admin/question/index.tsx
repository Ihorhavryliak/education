import { Box, Card, CardBody, Container, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function QuestionCreate() {
  const { data: questionData } = api.question.all.useQuery();
  return (
    <Layout>
     
      <Container>
      <Box>
        <Link href={"/admin/question/create"}>Create question</Link>
      </Box>
        <Flex gap={'15px'}>
          {questionData?.map((question) => {
            return (
              <Card key={question.id}>
                <CardBody>
                  <Text>
                   {question.name}
                  </Text>
                  <Box >  {question.answer} </Box>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </Container>
    </Layout>
  );
}
