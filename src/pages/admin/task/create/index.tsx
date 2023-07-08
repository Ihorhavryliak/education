import { Button, Container, Select, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { type FormEvent, useState, useEffect } from "react";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function TaskCreate() {
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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name: taskName,
      video: taskVideo,
      description: taskDescription,
      sort: +taskSort,
      curseId: +curseId,
    };
    mutate(data);
  };

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
          <form onSubmit={onSubmit}>
            <Text my="8px">name:</Text>
            <InputType
              placeholder="name"
              value={taskName}
              onChange={setTaskName}
            />
            <Text my="8px">Description task</Text>
            <InputType
              placeholder="description"
              value={taskDescription}
              onChange={setTaskDescription}
            />
            <Text my="8px">Video</Text>
            <InputType
              placeholder="Video"
              value={taskVideo}
              onChange={setTaskVideo}
            />

            <Text my="8px">Select lesson</Text>
            <Select
              placeholder="Select lesson"
              onChange={(e) => setCurseId(e.target.value)}
            >
              {lessons?.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </option>
              ))}
            </Select>
            <Text my="8px">Sort</Text>
            <InputType
              type="number"
              placeholder="Sort"
              value={taskSort}
              onChange={setTaskSort}
            />

            <Button mt={4} colorScheme="teal" type="submit">
              Create
            </Button>
          </form>
        </Container>
      </Layout>
    );
  }
}
