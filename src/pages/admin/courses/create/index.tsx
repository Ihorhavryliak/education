import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Container,
  Box,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { type FormEvent, useState, useEffect } from "react";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

export default function CreateCurse() {
  const { mutate } = api.course.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      } else {
        setName("");
        setVideo("");
        setDescriptionCurse("");
        setShortName("");
        setTheory("");
        setSort("");
      }
    },
  });
  //chose name
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionCurse, setDescriptionCurse] = useState("");
  const [shortName, setShortName] = useState("");

  const [theory, setTheory] = useState("");
  const [sort, setSort] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name,
      title,
      description,
      descriptionCurse,
      video,
      img: shortName,
      sort: +sort,
      theory,
    };
    mutate(data);
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
        <ArrowBack />
        <Container>
          <form onSubmit={onSubmit}>
            <FormControl mt="8px">
              <FormLabel htmlFor="name">Імя уроку</FormLabel>
              <InputType
                value={name}
                onChange={setName}
                placeholder="Імя уроку"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="video">Відео посилання на урок</FormLabel>
              <InputType
                value={video}
                onChange={setVideo}
                placeholder="Відео посилання на урок"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="descriptionCurse">Опис уроку</FormLabel>
              <InputType
                type="textarea"
                height="200px"
                value={descriptionCurse}
                onChange={setDescriptionCurse}
                placeholder="Опис уроку"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="descriptionCurse">
                Заголовок уроку - Title
              </FormLabel>
              <InputType
                type="textarea"
                height="100px"
                value={title}
                onChange={setTitle}
                placeholder="Заголовок уроку Title"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="descriptionCurse">
                Опис уроку - Description
              </FormLabel>
              <InputType
                type="textarea"
                height="200px"
                value={description}
                onChange={setDescription}
                placeholder="Опис уроку - Description"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="shortName">Фото уроку</FormLabel>
              <InputType
                value={shortName}
                onChange={setShortName}
                placeholder="Фото уроку"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl mt="8px">
              <FormLabel htmlFor="shortName">Теорія</FormLabel>
              <InputType
                type="textarea"
                height="200px"
                value={theory}
                onChange={setTheory}
                placeholder="Теорія"
              />
            </FormControl>

            <FormControl mt="8px">
              <FormLabel htmlFor="shortName">Порядок сортування</FormLabel>
              <InputType
                value={sort}
                onChange={setSort}
                placeholder="Порядок сортування"
              />
            </FormControl>

            <Box textAlign={"right"}>
              <Button mt={4} variant={"main"} type="submit">
                Створити
              </Button>
            </Box>
          </form>
        </Container>
      </Layout>
    );
  }
}
