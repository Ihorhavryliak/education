import { Button, Select, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { type FormEvent, useState, useEffect } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function QuestionCreate() {
  const { mutate } = api.question.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { data: lessons } = api.course.all.useQuery();

  const [questionName, setQuestionName] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionSort, setQuestionSort] = useState("");
  const [curseId, setCurseId] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const data = {
      name: questionName,
      answer,
      sort: +questionSort,
      curseId: +curseId,
    };
    mutate(data);
    setQuestionName("");
    setAnswer("");
    setQuestionSort("");
    setCurseId("");
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
        <ArrowBack />
        <form onSubmit={onSubmit}>
          <Text my="8px">Назва питання:</Text>
          <InputType
            placeholder="Назва питання"
            value={questionName}
            onChange={setQuestionName}
          />
          <Text my="8px">Відповідь на питання:</Text>
          <InputType
            height="200px"
            type="textarea"
            size="lg"
            placeholder="Відповідь на питання"
            value={answer}
            onChange={setAnswer}
          />
          <Text my="8px">Вибрати урок де буде відображатися питання:</Text>
          <Select
          value={curseId}
            placeholder="Вибрати урок де буде відображатися питання"
            onChange={(e) => setCurseId(e.target.value)}
          >
            {lessons?.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </Select>
          <Text my="8px">Порядок сортування:</Text>
          <InputType
            type="number"
            placeholder="Порядок сортування"
            value={questionSort}
            onChange={setQuestionSort}
          />

          <Button mt={4} variant={'main'} type="submit">
            Створити
          </Button>
        </form>
      </Layout>
    );
  }
}
