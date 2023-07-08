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
  const [description, setDescription] = useState("");
  const [shortName, setShortName] = useState("");

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
  }, [mainProgram]);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = {
      name,
      description,
      shortName,
      id: mainProgramId ? +mainProgramId : 1,
    };

    if (mainProgramId) {
      mutate(data);
    }
  };
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
            Q <FormErrorMessage></FormErrorMessage>
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
            Edit
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
