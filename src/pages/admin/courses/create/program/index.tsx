import {
  Button,
  Container,
  Text,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { type MultiValue, Select } from "chakra-react-select";
import { type FormEvent, useId, useState, useEffect } from "react";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

interface ColorOption {
  label: string;
  value: string; // Change the type to string
}

export default function CreateProgram() {
  const idUse = useId();
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
  const [title, setTitle] = useState("");
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
      title,
      description,
      coursesPages: choseValue,
    };
    mutate(data);

    setChoseOption([]);
    setName("");
    setDescription("");
    setGeneralProgram("");
    setTitle("");
  };
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status !== "loading" && session?.data?.user?.role !== 1) {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (session?.data?.user?.role === 1) {
    return (
      <Layout>
        <ArrowBack pathname={'/admin/'} />
        <Container>
          <form onSubmit={onSubmit}>
            <Text my="8px">Назва програми:</Text>
            <InputType
              placeholder="Назва програми"
              value={name}
              onChange={setName}
            />
            <Text my="8px">Заголовок програми - Title:</Text>
            <InputType
              type="textarea"
              height="100px"
              placeholder="Заголовок програми"
              value={title}
              onChange={setTitle}
            />
            <Text my="8px">Опис програми Description:</Text>
            <InputType
              type="textarea"
              height="200px"
              placeholder="Опис програми"
              value={description}
              onChange={setDescription}
            />
            <Text my="8px">Добавити уроки:</Text>
            <Select<ColorOption, true>
              onChange={(e) => handleChoseOption(e)}
              instanceId={idUse}
              isMulti
              options={
                course.data
                  ? course.data.map((opt) => {
                      return { label: opt.name, value: String(opt.id) };
                    })
                  : []
              }
              placeholder="Вибрати уроки"
            />
            <Text my="8px">
              Вибрати головну курс де буде відображатися програма:
            </Text>
            <ChakraSelect
              placeholder="Вибрати головну курс де буде відображатися програма"
              onChange={(e) => handleGeneralProgram(e.target.value)}
            >
              {mainProgram.data &&
                mainProgram.data.map((program) => (
                  <option
                    key={program.id}
                    style={{ background: "#000" }}
                    value={program.id}
                  >
                    {program.name}
                  </option>
                ))}
            </ChakraSelect>
            <Button mt={4} variant={"main"} type="submit">
              Створити
            </Button>
          </form>
        </Container>
      </Layout>
    );
  }
}
