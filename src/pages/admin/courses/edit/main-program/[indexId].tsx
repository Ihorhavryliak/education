import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { type FormEvent, useState, useEffect } from "react";
import { Layout } from "~/components/Layout";
import InputType from "~/components/InputType/InputType";
import { api } from "~/utils/api";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

export default function CreateGeneralProgram() {
  const router = useRouter();
  const mainProgramId = router?.query?.indexId as string;

  const { mutate } = api.generalProgram.update.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { data: mainProgram } = api.generalProgram.findById.useQuery(
    {
      id: mainProgramId ? +mainProgramId : 1,
    },
    { enabled: mainProgramId ? true : false }
  );

  //chose namesx
  const [name, setName] = useState("");
  const [descriptionGeneral, setDescriptionGeneral] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortName, setShortName] = useState("");
  const [sort, setSort] = useState("");
  useEffect(() => {
    if (mainProgram?.name) {
      setName(mainProgram.name);
    }
    if (mainProgram?.description) {
      setDescription(mainProgram.description);
    }
    if (mainProgram?.shortName) {
      setShortName(mainProgram.shortName);
    }
    if (mainProgram?.title) {
      setTitle(mainProgram.title as string);
    }
    if (mainProgram?.sort) {
      const sortData = mainProgram?.sort as number
      setSort(sortData.toString());
    }
    if (mainProgram?.descriptionGeneral) {
      setDescriptionGeneral(mainProgram?.descriptionGeneral as string);
    }
  }, [mainProgram]);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name,
      descriptionGeneral,
      title,
      description,
      shortName,
      sort: +sort,
      id: mainProgramId ? +mainProgramId : 1,
    };

    if (mainProgramId) {
      mutate(data);
    }
  };
  return (
    <Layout>
      <ArrowBack pathname={'/admin/'} />
      <Container>
        <form onSubmit={handleSend}>
          <FormControl>
            <FormLabel my="1rem" htmlFor="name">
              Назва курсу
            </FormLabel>
            <InputType
              placeholder="Назва курсу"
              value={name}
              onChange={setName}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="12px">
              <FormLabel htmlFor="descriptionGeneral">
                Опис курсу
              </FormLabel>

              <InputType
                type="textarea"
                height="200px"
                placeholder="Опис курсу"
                value={descriptionGeneral}
                onChange={setDescriptionGeneral}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
          <FormControl my="12px">
            <FormLabel htmlFor="description">Заголовок курсу - Title</FormLabel>
            <InputType
              type="textarea"
              height="100px"
              placeholder="Заголовок курсу"
              value={title}
              onChange={setTitle}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="1rem">
            <FormLabel htmlFor="description">
              Опис курсу - description
            </FormLabel>

            <InputType
              type="textarea"
              height="200px"
              placeholder="Опис курсу"
              value={description}
              onChange={setDescription}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="1rem">
            <FormLabel htmlFor="shortName">Коротке імя курсу</FormLabel>
            <InputType
              placeholder="Коротке імя курсу"
              value={shortName}
              onChange={setShortName}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="1rem">
            <FormLabel htmlFor="shortName">Порядок сортування</FormLabel>
            <InputType
              placeholder="Порядок сортування"
              type="number"
              value={sort}
              onChange={setSort}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <Button mt={4} variant={"main"} type="submit">
            Зберегти
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
