import { Button, Container, Select, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { type FormEvent, useState, useEffect } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function TaskCreate() {
  const pathname = usePathname();
  const { mutate } = api.task.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { data: lessons } = api.course.all.useQuery();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskVideo, setTaskVideo] = useState("");
  const [taskSort, setTaskSort] = useState("");
  const [curseId, setCurseId] = useState("");
  const [taskVideoSolution, setTaskVideoSolution] = useState("");
  const [lessonSolution, setLessonSolution] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name: taskName,
      video: taskVideo,
      description: taskDescription,
      sort: +taskSort,
      curseId: +curseId,
      videoSolution: taskVideoSolution,
      lessonSolution,
    };
    mutate(data);
    setTaskName("");
    setTaskDescription("");
    setTaskVideo("");
    setTaskSort("");
    setTaskVideoSolution("");
    setLessonSolution("");
  };

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      session.status !== "loading" &&
      session?.data?.user?.role !== 1
    ) {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (session?.data?.user?.role === 1) {
    return (
      <Layout>
        <ArrowBack pathname={pathname} />
        <Container>
          <form onSubmit={onSubmit}>
            <Text my="1rem">Назва завдання:</Text>
            <InputType
              placeholder="Назва завдання"
              value={taskName}
              onChange={setTaskName}
            />
            <Text my="1rem">Опис завдання</Text>
            <InputType
              type="textarea"
              height="200px"
              placeholder="Опис завдання"
              value={taskDescription}
              onChange={setTaskDescription}
            />
            <Text my="1rem">Посилання на відео</Text>
            <InputType
              placeholder="Посилання на відео"
              value={taskVideo}
              onChange={setTaskVideo}
            />
            <Text my="1rem">Рішення завдання</Text>
            <InputType
              type="textarea"
              height="200px"
              placeholder="Рішення завдання"
              value={lessonSolution}
              onChange={setLessonSolution}
            />

            <Text my="1rem">Посилання на відео рішення</Text>
            <InputType
              placeholder="Посилання на відео рішення"
              value={taskVideoSolution}
              onChange={setTaskVideoSolution}
            />

            <Text my="1rem">Вибрати урок</Text>
            <Select
              placeholder="Вибрати урок"
              onChange={(e) => setCurseId(e.target.value)}
            >
              {lessons?.map((lesson) => (
                <option key={lesson.id} value={lesson.id}  style={{background: "#000"}}>
                  {lesson.name}
                </option>
              ))}
            </Select>
            <Text my="1rem">Номер сортування</Text>
            <InputType
              type="number"
              placeholder="Номер сортування"
              value={taskSort}
              onChange={setTaskSort}
            />

            <Button variant={'main'} mt={4}  type="submit">
              Створити
            </Button>
          </form>
        </Container>
      </Layout>
    );
  }
}
