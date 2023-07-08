import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import CompleteIcon from "~/components/CompleteIcon/CompleteIcon";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import Loader from "~/components/Loader/Loader";
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

  const {
    data,
    isLoading: isLoadingCourse,
    refetch,
  } = api.course.getById.useQuery(
    {
      curseId: router.query.curse as string,
    },
    { enabled: router.query.curse ? true : false }
  );
  // theory array if length > 0 is
  const { data: competesId, isLoading: isLoadingComplete } =
    api.complete.findComplete.useQuery(
      {
        userId: userId,
        completeId: data?.id as number,
      },
      { enabled: data?.id && userId ? true : false }
    );
  const [numberLoading, setNumberLoading] = useState(0);
  console.log(numberLoading, "numberLoading");
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
    setNumberLoading(1);
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
    setNumberLoading(2);
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
    setNumberLoading(3);
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
    setNumberLoading(4);
    const solutionValue = solution.find((sol) => sol.id === taskId);
    taskMutate({ id: taskId, solution: solutionValue?.value as string });
    setEdit(0);
  };

  useEffect(() => {
    void (async () => {
      try {
        if (router.query.curse) {
          await refetch();
        }
      } catch (error) {
        console.error("Error occurred during data fetching:", error);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingTask]);

  useEffect(() => {
    if (!(session.status === "loading") && !session?.data) {
      void router.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Layout>
      {(isLoadingTask || isLoadingCourse || isLoadingComplete) &&
      numberLoading === 0 ? (
        <Loader />
      ) : (
        <>
          {data && (
            <Box>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Heading as="h1">
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
                <Box mt="3rem" maxHeight={"600px"} height="100%">
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
                  <Heading as="h5">Теорія</Heading>
                </Flex>
                <Box
                  mt="1rem"
                  dangerouslySetInnerHTML={{ __html: data.theory as string }}
                />
                <Box textAlign={"right"}>
                  <Button
                    mt="1rem"
                    variant={"load"}
                    onClick={() => handleCompleteTheory(data?.id)}
                    isLoading={isLoading && numberLoading === 1}
                    isDisabled={competesId?.theoryId ? true : false}
                    leftIcon={<CompleteIcon data={competesId?.theoryId} />}
                  >
                    З теорією ознайомився
                  </Button>
                </Box>
              </Box>

              <Box mt="2rem">
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Heading as="h5">Завдання</Heading>
                </Flex>
                <Accordion mt="1rem" defaultIndex={[]} allowMultiple>
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
                            <Box textAlign={"right"} mt="1rem">
                              <Button
                                isLoading={
                                  (isLoadingTask ||
                                    isLoadingCourse ||
                                    isLoadingComplete) &&
                                  numberLoading === 4
                                }
                                my="1rem"
                                variant={"load"}
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
                <Box textAlign={"right"} mt="1rem">
                  <Button
                    isDisabled={competesId?.taskId ? true : false}
                    mt="1rem"
                    variant={"load"}
                    onClick={() =>
                      handleCompleteTask(data?.task[0]?.id as number)
                    }
                    isLoading={isLoading && numberLoading === 2}
                    leftIcon={<CompleteIcon data={competesId?.taskId} />}
                  >
                    Виконано
                  </Button>
                </Box>
              </Box>

              <Box mt="2rem">
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Heading as="h5" mb="1rem">
                    Питання для співбесіди
                  </Heading>
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
                <Box textAlign={"right"} mt="1rem">
                  <Button
                    mt="1rem"
                    variant={"load"}
                    isDisabled={competesId?.questionId ? true : false}
                    onClick={() =>
                      handleCompleteQuestion(data?.question[0]?.id as number)
                    }
                    isLoading={isLoading && numberLoading === 3}
                    leftIcon={<CompleteIcon data={competesId?.questionId} />}
                  >
                    Виконано
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </Layout>
  );
}
