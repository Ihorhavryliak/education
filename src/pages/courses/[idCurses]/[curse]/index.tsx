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
  Input,
  Text,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { useRouter } from "next/router";

import React, { useEffect, useMemo, useState } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import CompleteIcon from "~/components/CompleteIcon/CompleteIcon";
import InputType from "~/components/InputType/InputType";
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
  const { mutate: taskMutate, isLoading: isLoadingTask } =
    api.task.updateSolution.useMutation({
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

  const { data, isSuccess, refetch } = api.course.getById.useQuery(
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

  const [solution, setSolution] = useState([{ id: 0, value: "" }]);
  const handleSolutionOnChange = (val: string, id: number) => {
    if (solution.some((sol) => sol.id === id)) {
      const deleteSolution = solution.filter((sol) => sol.id !== id);
      setSolution([...deleteSolution, { id, value: val }]);
    } else {
      setSolution([...solution, { id, value: val }]);
    }
  };
  const [edit, setEdit] = useState(0);
  const handleEdit = (id: number) => {
    if (edit === id) {
      setEdit(0);
    } else {
      setEdit(id);
    }
  };
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

  useEffect(() => {
    const solutions = data?.task.map((task) => {
      return { id: task.id, value: task.solution as string };
    });
    if (solutions && solutions?.length > 0) {
      setSolution(solutions);
    }
  }, [data]);

  const handleSolution = (taskId: number) => {
    const solutionValue = solution.find((sol) => sol.id === taskId);
    taskMutate({ id: taskId, solution: solutionValue?.value as string });
    setEdit(0);
  };

  useEffect(() => {
    void (async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("Error occurred during data fetching:", error);
      }
    })();
  }, [isLoadingTask]);

  return (
    <Layout>
      {data && (
        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mb="1.5rem"
          >
            <Heading as="h1" mb="1.5rem">
              <ArrowBack />
              <Box ms="8px" as="span">
                {data.name}
              </Box>
            </Heading>
            <Box>
              <CompleteIcon
                color="primary.100"
                data={competesId?.completeProgramId}
                size={10}
              />
            </Box>
          </Flex>
          {data.video && (
            <Box maxHeight={"600px"} height="100%">
              <iframe
                allowFullScreen={true}
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${data.video}`}
              ></iframe>
            </Box>
          )}
          <Box mt="2rem">
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Heading as="h5" mb="1rem">
                Теорія
              </Heading>
              <Box>
                <CompleteIcon data={competesId?.theoryId} />
              </Box>
            </Flex>
            <Box dangerouslySetInnerHTML={{ __html: data.theory as string }} />
            <Box textAlign={"right"}>
              <Button
                mt="1rem"
                variant={"main"}
                onClick={() => handleCompleteTheory(data?.id)}
              >
                З теорією ознайомився
              </Button>
            </Box>
          </Box>

          <Box mt="1.5rem">
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Heading as="h5" mb="1rem">
                Завдання
              </Heading>
              <Box>
                <CompleteIcon data={competesId?.taskId} />
              </Box>
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
                        <Box>
                          {task?.video && (
                            <iframe
                              width="100%"
                              height="315"
                              allowFullScreen={true}
                              src={`https://www.youtube.com/embed/${task?.video}`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                          )}
                        </Box>
                        <Box mt="0.5rem">{task.description}</Box>

                        <Text mt={"1rem"} mb={"0.5rem"}>
                          Моє рішення завдання
                        </Text>
                        <Box bg="primary.200" p="1rem">
                          {task.solution}
                          <Box
                            mt="1rem"
                            cursor={"pointer"}
                            _hover={{ color: "primary.100" }}
                            onClick={() => handleEdit(task.id)}
                          >
                            Редагувати
                          </Box>
                        </Box>
                        {!task.solution ||
                          (edit === task.id && (
                            <Box mt="0.5rem">
                              <InputType
                                height={"250px"}
                                size="lg"
                                type="textarea"
                                onChange={(e) =>
                                  handleSolutionOnChange(e, task.id)
                                }
                                value={
                                  solution.find((sol) => sol.id === task.id)
                                    ?.value as string
                                }
                              />
                            </Box>
                          ))}
                        <Box textAlign={"right"}>
                          <Button
                            my="1rem"
                            variant={"main"}
                            onClick={() => handleSolution(task.id)}
                          >
                            Зберегти
                          </Button>
                        </Box>

                        <AccordionItem>
                          <AccordionButton>
                            Показати рішення
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            {task?.videoSolution && (
                              <iframe
                                width="100%"
                                height="315"
                                allowFullScreen={true}
                                src={`https://www.youtube.com/embed/${task?.videoSolution}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              ></iframe>
                            )}
                            <Box mt="0.5rem" bg="primary.200" p="1rem">
                              {task?.lessonSolution}
                            </Box>
                          </AccordionPanel>
                        </AccordionItem>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
            </Accordion>
            <Box textAlign={"right"}>
              <Button
                mt="1rem"
                variant={"main"}
                onClick={() => handleCompleteTask(data?.task[0]?.id as number)}
              >
                Виконано
              </Button>
            </Box>
          </Box>

          <Box mt="1.5rem">
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Heading as="h5" mb="1rem">
                Питання для співбесіди
              </Heading>
              <Box>
                <CompleteIcon data={competesId?.questionId} />
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
                    <AccordionPanel pb={4}>
                      <Box bg={"primary.200"} p="1rem">
                        {question.answer}{" "}
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
            <Box textAlign={"right"}>
              <Button
                mt="1rem"
                variant={"main"}
                onClick={() =>
                  handleCompleteQuestion(data?.question[0]?.id as number)
                }
              >
                Виконано
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Layout>
  );
}
