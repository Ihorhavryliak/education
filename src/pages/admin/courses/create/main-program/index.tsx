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
        <form onSubmit={handleSend}>
          <FormControl>
            <FormLabel htmlFor="name">Title Program</FormLabel>
            <InputType
              placeholder="Title Program"
              value={name}
              onChange={setName}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description Program</FormLabel>

            <InputType
              placeholder="description"
              value={description}
              onChange={setDescription}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="shortName">Short Name</FormLabel>
            <InputType
              placeholder="Short Name"
              value={shortName}
              onChange={setShortName}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </Layout>
  );
  }
}
