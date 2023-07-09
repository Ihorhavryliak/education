import { Button, Container, Select, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { type FormEvent, useState, useEffect } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function TaskEdit() {
  const session = useSession();
  const router = useRouter();

  const { data: lessons } = api.course.all.useQuery();
  const { data: taskData } = api.task.getById.useQuery(
    { taskId: router.query.taskId as string },
    { enabled: router.query.taskId ? true : false }
  );

  const { mutate } = api.task.update.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskVideo, setTaskVideo] = useState("");
  const [taskSort, setTaskSort] = useState("");
  const [curseId, setCurseId] = useState("");
  const [taskVideoSolution, setTaskVideoSolution] = useState("");
  const [lessonSolution, setLessonSolution] = useState("");

  useEffect(() => {
    if (taskData?.name) {
      setTaskName(taskData?.name);
    }
    if (taskData?.description) {
      setTaskDescription(taskData?.description);
    }
    if (taskData?.video) {
      setTaskVideo(taskData?.video);
    }
    if (taskData?.sort) {
      setTaskSort(taskData?.sort.toString());
    }
    if (taskData?.curseId) {
      setCurseId(taskData?.curseId.toString());
    }
    if (taskData?.lessonSolution) {
      setLessonSolution(taskData?.lessonSolution);
    }
    if (taskData?.videoSolution) {
      setTaskVideoSolution(taskData?.videoSolution);
    }
  }, [taskData]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const taskIdRouter = router.query.taskId as string;
    const data = {
      id: +taskIdRouter,
      name: taskName,
      video: taskVideo,
      description: taskDescription,
      sort: +taskSort,
      curseId: +curseId,
      videoSolution: taskVideoSolution,
      lessonSolution,
    };
    mutate(data);
  };

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
        <ArrowBack />
        <Container>
          <form onSubmit={onSubmit}>
            <Text my="8px">Імя завдання:</Text>
            <InputType
              placeholder="Імя завдання"
              value={taskName}
              onChange={setTaskName}
            />
            <Text my="8px">Опис завдання</Text>
            <InputType
              type="textarea"
              height="200px"
              placeholder="Опис завдання"
              value={taskDescription}
              onChange={setTaskDescription}
            />
            <Text my="8px">Посилання на відео</Text>
            <InputType
              placeholder="Посилання на відео"
              value={taskVideo}
              onChange={setTaskVideo}
            />
            <Text my="8px">Рішення завдання</Text>
            <InputType
              type="textarea"
              height="200px"
              placeholder="Рішення завдання"
              value={lessonSolution}
              onChange={setLessonSolution}
            />

            <Text my="8px">Посилання на відео рішення</Text>
            <InputType
              placeholder="Посилання на відео рішення"
              value={taskVideoSolution}
              onChange={setTaskVideoSolution}
            />

            <Text my="8px">Вибрати урок</Text>
            <Select
              value={curseId}
              placeholder="Вибрати урок"
              onChange={(e) => setCurseId(e.target.value)}
            >
              {lessons?.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </option>
              ))}
            </Select>
            <Text my="8px">Номер сортування</Text>
            <InputType
              type="number"
              placeholder="Номер сортування"
              value={taskSort}
              onChange={setTaskSort}
            />

            <Button variant={"main"} mt={4} colorScheme="teal" type="submit">
              Зберегти
            </Button>
          </form>
        </Container>
      </Layout>
    );
  }
}
