import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Container,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { type FormEvent, useState, useEffect } from "react";
import InputType from "~/components/InputType/InputType";
import { Layout } from "~/components/Layout";
import { useRouter } from "next/router";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

export default function CreateCurse() {
  const router = useRouter();
  const curseId = router.query.curseId;
  const { mutate } = api.course.update.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  const { data: lessonData } = api.course.getById.useQuery(
    {
      id: curseId as string,
    },
    { enabled: curseId ? true : false }
  );

  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionCurse, setDescriptionCurse] = useState("");
  const [shortName, setShortName] = useState("");
  const [sort, setSort] = useState("");
  const [theory, setTheory] = useState("");
  const [url, setUrl] = useState("");
  const [countLoad, setCountLoad] = useState(0);
  useEffect(() => {
    if (countLoad === 1) return;
    if (lessonData?.name) {
      setName(lessonData?.name);
      setCountLoad(1);
    }
    if (lessonData?.video) {
      setVideo(lessonData?.video);
    }
    if (lessonData?.descriptionCurse) {
      setDescriptionCurse(lessonData?.descriptionCurse);
    }
    if (lessonData?.img) {
      setShortName(lessonData?.img);
    }
    if (lessonData?.theory) {
      setTheory(lessonData?.theory);
    }
    if (lessonData?.url) {
      setUrl(lessonData?.url);
    }
    if (lessonData?.sort) {
      setSort(lessonData?.sort.toString());
    }
    if (lessonData?.title) {
      setTitle(lessonData?.title);
    }
    if (lessonData?.description) {
      setDescription(lessonData?.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonData]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name,
      descriptionCurse,
      video,
      img: shortName,
      id: curseId ? +curseId : 1,
      sort: +sort,
      theory: theory,
      title,
      description,
    };
    mutate(data);
  };

  return (
    <Layout>
      <ArrowBack pathname={'/admin/'} />
      <Container>
        <form onSubmit={onSubmit}>
          <FormControl my="8px">
            <FormLabel htmlFor="name">Назва уроку</FormLabel>
            <InputType
              value={name}
              onChange={setName}
              placeholder="Назва уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="8px">
            <FormLabel htmlFor="descriptionCurse">Опис уроку</FormLabel>
            <InputType
              height="200px"
              type="textarea"
              size="lg"
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
          <FormControl my="8px">
            <FormLabel htmlFor="video">Посилання на відео уроку</FormLabel>
            <InputType
              value={video}
              onChange={setVideo}
              placeholder="Посилання на відео уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>

          <FormControl my="8px">
            <FormLabel htmlFor="sort">Теорія до уроку</FormLabel>
            <InputType
              height="600px"
              type="textarea"
              size="lg"
              value={theory}
              onChange={setTheory}
              placeholder="Теорія до уроку"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="8px">
            <FormLabel htmlFor="sort">Порядок сортування</FormLabel>
            <InputType value={sort} onChange={setSort} placeholder="sort" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl my="8px">
            <FormLabel htmlFor="sort">url уроку</FormLabel>
            <InputType value={url} onChange={setUrl} placeholder="url уроку" />
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
