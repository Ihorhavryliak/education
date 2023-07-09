import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Container,
} from "@chakra-ui/react";
import { type FormEvent, useState, useEffect } from "react";
import { Layout } from "~/components/Layout";
import InputType from "~/components/InputType/InputType";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

export default function CreateGeneralProgram() {
  const { mutate } = api.generalProgram.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });
  //chose name
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortName, setShortName] = useState("");

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name,
      description,
      shortName,
    };
    mutate(data);
    setName("");
    setDescription("");
    setShortName("");
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
        <ArrowBack />
        <Container>
          <form onSubmit={handleSend}>
            <FormControl my="12px">
              <FormLabel htmlFor="name">Назва курсу</FormLabel>
              <InputType
                placeholder="Назва курсу"
                value={name}
                onChange={setName}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl my="12px">
              <FormLabel htmlFor="shortName">Коротке імя курсу</FormLabel>
              <InputType
                placeholder="Коротке імя курсу"
                value={shortName}
                onChange={setShortName}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl my="12px">
              <FormLabel htmlFor="description">Опис курсу</FormLabel>

              <InputType
                type="textarea"
                height="200px"
                placeholder="Опис курсу"
                value={description}
                onChange={setDescription}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <Button mt={4} variant={"main"} type="submit">
              Створити
            </Button>
          </form>
        </Container>
      </Layout>
    );
  }
}
