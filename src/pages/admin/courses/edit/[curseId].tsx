import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Container,
  Text,
  Box,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { type FormEvent, useState, useEffect, useMemo } from "react";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { useRouter } from "next/router";

import { QuestionList } from "../../../../components/Program/QuestionList";
import { TaskList } from "~/components/Program/TaskList";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

export default function CreateCurse() {
  const router = useRouter();
  const curseId = router.query.curseId;
  const { mutate } = api.course.update.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { mutate: questionMutate } = api.question.update.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { mutate: taskMutate } = api.task.update.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { data: lessonData } = api.course.getById.useQuery(
    {
      curseId: curseId as string,
    },
    { enabled: curseId ? true : false }
  );
  const { data: questionData } = api.question.all.useQuery();
  const { data: taskData } = api.task.all.useQuery();

  const [isOpenId, setIsOpenId] = useState(0);
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [shortName, setShortName] = useState("");
  const [sort, setSort] = useState("");
  const [theory, setTheory] = useState("");
  const [url, setUrl] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionSort, setQuestionSort] = useState("");

  const [isOpenTaskId, setIsOpenTaskId] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskVideo, setTaskVideo] = useState("");
  const [taskSort, setTaskSort] = useState("");

  useEffect(() => {
    if (lessonData?.name) {
      setName(lessonData?.name);
    }
    if (lessonData?.video) {
      setVideo(lessonData?.video);
    }
    if (lessonData?.description) {
      setDescription(lessonData?.description);
    }
    if (lessonData?.img) {
      setShortName(lessonData?.img);
    }
    if (lessonData?.theory) {
      setTheory(lessonData?.theory);
    }
    if (lessonData?.url) {
      setUrl(lessonData?.url);
    }
    if (lessonData?.sort) {
      setSort(lessonData?.sort.toString());
    }
  }, [lessonData]);

  useMemo(() => {
    const question = questionData?.find((question) => question.id === isOpenId);
    if (question?.sort) {
      setQuestionSort(question?.sort.toString());
    } else {
      setQuestionSort("");
    }
    if (question?.answer) {
      setAnswer(question?.answer);
    } else {
      setAnswer("");
    }
    if (question?.name) {
      setQuestionName(question?.name);
    } else {
      setQuestionName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenId]);

  useMemo(() => {
    const task = taskData?.find((task) => task.id === isOpenTaskId);
    if (task?.sort) {
      setTaskSort(String(task?.sort));
    } else {
      setTaskSort("");
    }
    if (task?.video) {
      setTaskVideo(task?.video);
    } else {
      setTaskVideo("");
    }
    if (task?.name) {
      setTaskName(task?.name);
    } else {
      setTaskName("");
    }
    if (task?.description) {
      setTaskDescription(task?.description);
    } else {
      setTaskDescription("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenTaskId]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name,
      descriptionCurse: description,
      video,
      img: shortName,
      id: curseId ? +curseId : 1,
      sort: +sort,
      theory: theory,
    };
    mutate(data);
  };
  const onSubmitQuestion = (id: number) => {
    const data = {
      id: id.toString(),
      curseId: curseId ? +curseId : 1,
      name: questionName,
      answer,
      sort: +questionSort,
    };
    questionMutate(data);
  };
  const onSubmitTask = (id: number) => {
    /*  const data = {
      id: id,
      name: taskName,
      description: taskDescription,
      video: taskVideo,
      sort: +taskSort,
    };
    taskMutate(data); */
  };

  return (
    <Layout>
      <ArrowBack />
      <Container>
        <form onSubmit={onSubmit}>
          <FormControl my="8px">
            <FormLabel htmlFor="name">Назва уроку</FormLabel>
            <InputType
              value={name}
              onChange={setName}
              placeholder="Назва уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="8px">
            <FormLabel htmlFor="descriptionCurse">Опис уроку</FormLabel>
            <InputType
              height="200px"
              type="textarea"
              size="lg"
              value={description}
              onChange={setDescription}
              placeholder="Опис уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="8px">
            <FormLabel htmlFor="video">Посилання на відео уроку</FormLabel>
            <InputType
              value={video}
              onChange={setVideo}
              placeholder="Посилання на відео уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
         
          {/* <FormControl my="8px">
            <FormLabel htmlFor="shortName">Фото уроку</FormLabel>
            <InputType
              value={shortName}
              onChange={setShortName}
              placeholder="Фото уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl> */}
          
          <FormControl my="8px">
            <FormLabel htmlFor="sort">Теорія до уроку</FormLabel>
            <InputType
              height="200px"
              type="textarea"
              size="lg"
              value={theory}
              onChange={setTheory}
              placeholder="Теорія до уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="8px">
            <FormLabel htmlFor="sort">Порядок сортування</FormLabel>
            <InputType value={sort} onChange={setSort} placeholder="sort" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="8px">
            <FormLabel htmlFor="sort">url уроку</FormLabel>
            <InputType value={url} onChange={setUrl} placeholder="url уроку" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <Button mt={4} variant={'main'} type="submit">
            Зберегти
          </Button>
        </form>
          <Box mt='7rem'>
        <Text mt="4rem" mb="8px" my="8px">
          Питання
        </Text>
        <QuestionList
          questionData={questionData}
          setIsOpenId={setIsOpenId}
          isOpenId={isOpenId}
          questionName={questionName}
          setQuestionName={setQuestionName}
          answer={answer}
          setAnswer={setAnswer}
          questionSort={questionSort}
          setQuestionSort={setQuestionSort}
          onSubmitQuestion={onSubmitQuestion}
        />
        <Text mt="2rem" mb="8px" my="8px">
          Завдання
        </Text>
        <TaskList
          questionData={taskData}
          setIsOpenId={setIsOpenTaskId}
          isOpenId={isOpenTaskId}
          questionName={taskName}
          setQuestionName={setTaskName}
          video={taskVideo}
          setVideo={setTaskVideo}
          description={taskDescription}
          setDescription={setTaskDescription}
          onSubmitQuestion={onSubmitTask}
          taskSort={taskSort}
          setTaskSort={setTaskSort}
        />
        </Box>
      </Container>
    </Layout>
  );
}
