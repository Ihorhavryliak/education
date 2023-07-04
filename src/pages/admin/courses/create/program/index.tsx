import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  HStack,
  TagLabel,
  TagCloseButton,
  Tag,
  Text,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { ProgramType } from "~/schema/program.schema";
import { MultiValue, Select } from "chakra-react-select";
import { ChangeEvent, FormEvent, useId, useState } from "react";
import { Curse } from "@prisma/client";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";

interface ColorOption {
  label: string;
  value: string; // Change the type to string
}

export default function CreateProgram() {
  const { mutate } = api.program.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });

  const course = api.course.all.useQuery();
  const mainProgram = api.generalProgram.all.useQuery();
  //chose tags multiple
  const [choseOption, setChoseOption] = useState<MultiValue<ColorOption>>([]);
  const handleChoseOption = (e: MultiValue<ColorOption>) => {
    setChoseOption(e);
  };
  //chose name
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [generalProgram, setGeneralProgram] = useState("");
  const handleGeneralProgram = (text: string) => {
    setGeneralProgram(text);
  };

  //send data
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const choseValue = choseOption.map((option) => {
      return { id: +option.value } as { id: number };
    });
    const data = {
      generalProgramId: +generalProgram,
      name,
      description,
      coursesPages: choseValue,
    };
    mutate(data);
  };
  return (
    <Layout>
      <Container>
        <form onSubmit={onSubmit}>
          <Text mb="8px">name:</Text>
          <InputType placeholder="name" value={name} onChange={setName} />
          <Text mb="8px">Description Program</Text>
          <InputType
            placeholder="description"
            value={description}
            onChange={setDescription}
          />
          <Text mb="8px">Select Programs</Text>
          <Select<ColorOption, true>
            onChange={(e) => handleChoseOption(e)}
            instanceId={useId()}
            isMulti
            options={
              course.data
                ? course.data.map((opt) => {
                    return { label: opt.name, value: String(opt.id) };
                  })
                : []
            }
            placeholder="Select some colors..."
          />
          <Text mb="8px">Select main program</Text>
          <ChakraSelect
            placeholder="Select option"
            onChange={(e) => handleGeneralProgram(e.target.value)}
          >
            {mainProgram.data &&
              mainProgram.data.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
          </ChakraSelect>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
