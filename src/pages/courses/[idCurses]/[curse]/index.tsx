import { UnlockIcon } from "@chakra-ui/icons";
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
import Head from "next/head";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
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

  const [solution, setSolution] = useState([{ id: 0, value: "" }]);
  const [solutionErr, setSolutionErr] = useState([{ id: 0, error: "" }]);
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
    if (solutions && solutions?.length > 0 && edit === 0) {
      setSolution(solutions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSolution = (taskId: number) => {
    setNumberLoading(4);
    const solutionValue = solution.find((sol) => sol.id === taskId);

    setSolutionErr([{ id: 0, error: "" }]);
    if (solutionValue?.value && solutionValue?.value?.length > 2000) {
      return setSolutionErr([
        { id: taskId, error: "Максимально допустима кількість символів 2000" },
      ]);
    }

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
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="description" content={data?.description as string} />
      </Head>
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
                    <ArrowBack pathname={pathname} />
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
                      data.task.map((task, index) => {
                        return (
                          <AccordionItem key={task.id}>
                            <h2>
                              <AccordionButton my="1rem">
                                <Box as="span" flex="1" textAlign="left">
                                  <Box as="span">{index + 1}.</Box> {task.name}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel>
                              {task?.video && (
                                <Box>
                                  <iframe
                                    width="100%"
                                    height="315"
                                    allowFullScreen={true}
                                    src={`https://www.youtube.com/embed/${task?.video}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  ></iframe>{" "}
                                </Box>
                              )}
                              <Box>Опис завдання:</Box>
                              {task.description && (
                                <Box my="1rem" bg="primary.400" p="1rem">
                                  <Box
                                    dangerouslySetInnerHTML={{
                                      __html: task.description,
                                    }}
                                  />
                                </Box>
                              )}

                              <Text mt={"1rem"} mb={"0.5rem"}>
                                Моє рішення завдання:
                              </Text>
                              {!task.solution ||
                                (task?.solution.length > 0 && (
                                  <>
                                    <Box bg="primary.400" p="1rem">
                                      {task.solution}
                                    </Box>
                                    {task.solution && (
                                      <Box textAlign={"right"}>
                                        <Text
                                          mt="1rem"
                                          cursor={"pointer"}
                                          _hover={{ color: "primary.100" }}
                                          onClick={() => handleEdit(task.id)}
                                        >
                                          Редагувати рішення
                                        </Text>
                                      </Box>
                                    )}
                                  </>
                                ))}

                              {!task.solution && (
                                <Box mt="1rem">
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
                                  <Box color={"red.800"}>
                                    {
                                      solutionErr.find(
                                        (sol) => sol.id === task.id
                                      )?.error
                                    }
                                  </Box>
                                </Box>
                              )}
                              {edit === task.id && (
                                <Box mt="1rem">
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

                                  <Box color={"red.800"}>
                                    {
                                      solutionErr.find(
                                        (sol) => sol.id === task.id
                                      )?.error
                                    }
                                  </Box>
                                </Box>
                              )}
                              {(edit === task.id || !task.solution) && (
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
                                    Зберегти рішення
                                  </Button>
                                </Box>
                              )}
                              <AccordionItem mt="2rem">
                                {(task?.videoSolution ||
                                  task?.lessonSolution) && (
                                  <AccordionButton>
                                    <Box as="span" me={"8px"}>
                                      <UnlockIcon boxSize={3} />{" "}
                                    </Box>{" "}
                                    Показати рішення
                                    <AccordionIcon />
                                  </AccordionButton>
                                )}
                                <AccordionPanel>
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
                                  {task?.lessonSolution && (
                                    <Box mt="0.5rem" bg="primary.400">
                                      {task?.lessonSolution}
                                    </Box>
                                  )}
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
                    {data.question.map((question, index) => {
                      return (
                        <AccordionItem key={question.id}>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                {index + 1}. {question.name}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box bg={"primary.200"} p="1rem" mt="1rem">
                              <Box
                                dangerouslySetInnerHTML={{
                                  __html: question.answer,
                                }}
                              />
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
    </>
  );
}
