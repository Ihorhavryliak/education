import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

import React, { useState } from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function Curse() {
  const router = useRouter();
  const session = useSession();
  const ctx = api.useContext();
  const userId = session?.data?.user?.id as number;

  const { mutate, isLoading } = api.complete.updateComplete.useMutation({
    onSuccess: () => {
      //update data
      void ctx.complete.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log("Failed! Please try again later.");
      }
    },
  });
  const { data, isSuccess } = api.course.getById.useQuery(
    {
      curseId: router.query.curse as string,
    },
    { enabled: router.query.curse ? true : false }
  );
  // theory array if length > 0 is
  const { data: competesId } = api.complete.findComplete.useQuery(
    {
      userId: userId,
      completeId: data?.id as number,
    },
    { enabled: data?.id && userId ? true : false }
  );

  console.log(competesId, 'competesId')

  const handleCompleteTheory = (theoryId: number) => {
    if (competesId?.questionId && competesId?.taskId) {
      mutate({ completeId: competesId?.id, theoryId });
      mutate({
        completeId: competesId?.id,
        completeProgramId: data?.id,
      });
    } else {
      mutate({ completeId: competesId?.id as number, theoryId });
    }
  };

  const handleCompleteTask = (taskId: number) => {
    debugger
    if (competesId?.theoryId && competesId?.questionId) {
      mutate({ completeId: competesId?.id, taskId });
      mutate({
        completeId: competesId?.id,
        completeProgramId: data?.id,
      });
    } else {
      mutate({ completeId: competesId?.id as number, taskId });
    }
  };

  const handleCompleteQuestion = (questionId: number) => {
    if (competesId?.taskId && competesId?.theoryId) {
      mutate({ completeId: competesId?.id, questionId });
      mutate({
        completeId: competesId?.id,
        completeProgramId: data?.id,
      });
    } else {
      mutate({ completeId: competesId?.id as number, questionId });
    }
  };

  return (
    <Layout>
      {data && (
        <Container pt={"3rem "}>
          <Box>
            <Flex justifyContent={"space-between"}>
              <Heading as="h1" mb="1.5rem">
                Вступ
              </Heading>
              <Box>
                Is complete: {competesId?.completeProgramId ? "true" : "false"}
              </Box>
            </Flex>
            {data.video && (
              <Box maxHeight={"600px"} height="100%">
                <iframe
                  width="100%"
                  height="360"
                  src={`https://www.youtube.com/embed/${data.video}`}
                ></iframe>
              </Box>
            )}
            <Box mt="2rem">
              <Flex justifyContent={"space-between"}>
                <Heading as="h5" mb="1rem">
                  Теорія
                </Heading>
                <Box>
                  Is complete: {competesId?.theoryId ? "true" : "false"}
                </Box>
              </Flex>
              <Text>{data.descriptionCurse}</Text>
              <Button onClick={() => handleCompleteTheory(data?.id)}>
                Complete
              </Button>
            </Box>

            <Box mt="1.2rem">
              <Flex justifyContent={"space-between"}>
                <Heading as="h5" mb="1rem">
                  Завдання
                </Heading>
                <Box>Is complete: {competesId?.taskId ? "true" : "false"}</Box>
              </Flex>
              <Accordion defaultIndex={[]} allowMultiple>
                {data?.task &&
                  data.task.map((task) => {
                    return (
                      <AccordionItem key={task.id}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              {task.name}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {task.description}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
              </Accordion>
              <Button
                onClick={() => handleCompleteTask(data?.task[0]?.id as number)}
              >
                Complete task
              </Button>
            </Box>

            <Box mt="1.2rem">
              <Flex justifyContent={"space-between"}>
                <Heading as="h5" mb="1rem">
                  Питання для співбесіди
                </Heading>
                <Box>
                  Is complete: {competesId?.questionId ? "true" : "false"}
                </Box>
              </Flex>
              <Accordion defaultIndex={[]} allowMultiple>
                {data.question.map((question) => {
                  return (
                    <AccordionItem key={question.id}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {question.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>{question.answer}</AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
              <Button
                onClick={() =>
                  handleCompleteQuestion(data?.question[0]?.id as number)
                }
              >
                Complete question
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </Layout>
  );
}
