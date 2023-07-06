import { Button, Container, Select, Text } from "@chakra-ui/react";
import React, { type FormEvent, useState } from "react";
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
  return (
    <Layout>
    
        <form onSubmit={onSubmit}>
          <Text my="8px">name:</Text>
          <InputType
            placeholder="name"
            value={questionName}
            onChange={setQuestionName}
          />
          <Text my="8px">Answer</Text>
          <InputType
            height="200px"
            type="textarea"
            size="lg"
            placeholder="description"
            value={answer}
            onChange={setAnswer}
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
            value={questionSort}
            onChange={setQuestionSort}
          />

          <Button mt={4} colorScheme="teal" type="submit">
            Create
          </Button>
        </form>
 
    </Layout>
  );
}
