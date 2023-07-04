import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";
import InputType from "~/components/InputType/InputType";
import { type GetResult } from "@prisma/client/runtime";
import ModalWindow from "~/components/Modal/ModalWindow";

interface QuestionListType {
  onSubmitQuestion: (id: number) => void;
  questionData:
    | GetResult<
        {
          id: number;
          name: string;
          answer: string;
          curseId: number;
          sort: number | null;
        },
        { [x: string]: () => unknown }
      >[]
    | undefined;
  setIsOpenId: Dispatch<SetStateAction<number>>;
  isOpenId: number;
  questionName: string;
  setQuestionName: Dispatch<SetStateAction<string>>;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  questionSort: string;
  setQuestionSort: Dispatch<SetStateAction<string>>;
}

export function QuestionList({
  questionData,
  setIsOpenId,
  isOpenId,
  questionName,
  setQuestionName,
  answer,
  setAnswer,
  questionSort,
  setQuestionSort,
  onSubmitQuestion,
}: QuestionListType) {
  return (
    <Flex>
      {questionData?.map((question) => {
        return (
          <Box key={question.id}>
            <Text>{question.name}</Text>
            <Button onClick={() => setIsOpenId(question.id)}>Open Modal</Button>
            <ModalWindow
              id={question.id}
              key={question.id}
              setIsOpen={setIsOpenId}
              isOpen={isOpenId === question.id}
              onSubmit={onSubmitQuestion}
            >
              <form>
                <FormControl>
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <InputType
                    value={questionName}
                    onChange={setQuestionName}
                    placeholder="name"
                  />
                  <InputType
                    value={answer}
                    onChange={setAnswer}
                    placeholder="answer"
                  />
                  <InputType
                    value={questionSort}
                    onChange={setQuestionSort}
                    placeholder="sort"
                  />
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>
              </form>
            </ModalWindow>
          </Box>
        );
      })}
    </Flex>
  );
}
