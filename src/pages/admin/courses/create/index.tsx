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

export default function CreateCurse() {
  const { mutate } = api.course.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  //chose name
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [shortName, setShortName] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name,
      descriptionCurse: description,
      video,
      img: shortName,
    };
    mutate(data);
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
        <Container>
          <form onSubmit={onSubmit}>
            <FormControl mt="8px">
              <FormLabel htmlFor="name">First name</FormLabel>
              <InputType value={name} onChange={setName} placeholder="name" />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="video">video</FormLabel>
              <InputType
                value={video}
                onChange={setVideo}
                placeholder="video"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="descriptionCurse">descriptionCurse</FormLabel>
              <InputType
                value={description}
                onChange={setDescription}
                placeholder="description curse"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mt="8px">
              <FormLabel htmlFor="shortName">Image</FormLabel>
              <InputType
                value={shortName}
                onChange={setShortName}
                placeholder="Image"
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <Box textAlign={"right"}>
              <Button mt={4} colorScheme="teal" type="submit">
                Сторити
              </Button>
            </Box>
          </form>
        </Container>
      </Layout>
    );
  }
}
