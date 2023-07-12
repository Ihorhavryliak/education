import {
  Button,
  Container,
  Text,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { type MultiValue, Select } from "chakra-react-select";
import { type FormEvent, useEffect, useId, useState } from "react";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { useRouter } from "next/router";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

interface LessonOption {
  label: string;
  value: string; // Change the type to string
}

export default function CreateProgram() {
  const router = useRouter();
  const programId = router?.query?.programId as string;
  const { mutate } = api.program.update.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { mutate: mutateLesson  } = api.program.deleteConnectLesson.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });

  const course = api.course.all.useQuery();
  const mainProgram = api.generalProgram.all.useQuery();
  const { data: program } = api.program.findById.useQuery(
    {
      id: programId ? +programId : 1,
    },
    { enabled: programId ? true : false }
  );

  //chose tags multiple
  const [choseOption, setChoseOption] = useState<MultiValue<LessonOption>>([]);
  const handleChoseOption = (e: MultiValue<LessonOption>) => {
    const findOption = choseOption.find(option=>!e.includes(option))
    if(findOption){
      mutateLesson({ id: +programId, lessonId: +findOption.value} )
    }
    debugger
    setChoseOption(e);
  };
  //chose name
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [generalProgram, setGeneralProgram] = useState("");
  const [order, setOrder] = useState("");
  const handleGeneralProgram = (text: string) => {
    setGeneralProgram(text);
  };

  useEffect(() => {
    if (program?.name) {
      setName(program.name);
    }
    if (program?.description) {
      setDescription(program.description);
    }
    if (program?.generalProgramId) {
      setGeneralProgram(program.generalProgramId.toString());
    }
    if (program?.coursesPages) {
      const newCoursesPages = program.coursesPages.map((coursePages) => {
        return { label: coursePages.name, value: coursePages.id.toString() };
      });
      setChoseOption(newCoursesPages);
    }
    if (program?.order) {
      const orderProgram = program.order ? program.order : (1 as number);
      setOrder(orderProgram.toString());
    }
  }, [program]);

  //send data
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const choseValue = choseOption.map((option) => {
      return { id: +option.value } as { id: number };
    });
    const data = {
      id: programId ? +programId : 1,
      generalProgramId: +generalProgram,
      name,
      description,
      coursesPages: choseValue,
      order: order ? +order : 1,
    };
    mutate(data);
  };
  return (
    <Layout>
      <ArrowBack />
      <Container>
        <form onSubmit={onSubmit}>
          <Text my="1rem">Назва програми:</Text>
          <InputType placeholder="Назва програми" value={name} onChange={setName} />
          <Text my="1rem">Опис програми</Text>
          <InputType
            placeholder="Опис програми"
            value={description}
            onChange={setDescription}
          />
          <Text my="1rem">Вибрати уроки</Text>
          <Select<LessonOption, true>
            onChange={(e) => handleChoseOption(e)}
            instanceId={useId()}
            isMulti
            value={choseOption}
            options={
              course.data
                ? course.data.map((opt) => {
                    return { label: opt.name, value: String(opt.id) };
                  })
                : []
            }
            placeholder="Вибрати уроки"
          />
          <Text my="1rem">Вибрати курс</Text>
          <ChakraSelect
            value={generalProgram}
            placeholder="Select main program"
            onChange={(e) => handleGeneralProgram(e.target.value)}
          >
            {mainProgram.data &&
              mainProgram.data.map((program) => (
                <option key={program.id} value={program.id}  style={{background: "#000"}}>
                  {program.name}
                </option>
              ))}
          </ChakraSelect>
          <Text my="1rem">order:</Text>
          <InputType
            placeholder="order"
            type="number"
            value={order}
            onChange={setOrder}
          />
          <Button variant={'main'} mt={4} colorScheme="teal" type="submit">
            Зберегти
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
