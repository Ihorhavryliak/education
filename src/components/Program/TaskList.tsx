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

interface TaskListType {
  onSubmitQuestion: (id: number) => void;
  questionData:
    | GetResult<
        {
          id: number;
          video: string | null;
          solution: string | null;
          name: string;
          description: string;
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
  setVideo: Dispatch<SetStateAction<string>>;
  video: string;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  taskSort: string;
  setTaskSort: Dispatch<SetStateAction<string>>;
}

export function TaskList({
  questionData,
  setIsOpenId,
  isOpenId,
  questionName,
  setQuestionName,
  video,
  setVideo,
  description,
  setDescription,
  onSubmitQuestion,
  taskSort,
  setTaskSort,
}: TaskListType) {
  return (
    <Flex>
      {questionData?.map((question) => {
        return (
          <Box key={question.id}>
            <Text>{question.name}</Text>
            <Button variant={'main'} onClick={() => setIsOpenId(question.id)}>Open Modal</Button>
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
                    value={video}
                    onChange={setVideo}
                    placeholder="video"
                  />
                  <InputType
                    value={taskSort}
                    onChange={setTaskSort}
                    placeholder="sort"
                  />
                  <InputType
                    value={description}
                    onChange={setDescription}
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
