import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Container,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { type FormEvent, useState } from "react";
import InputType from "~/hooks/input";
import { Layout } from "~/components/Layout";

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

  return (
    <Layout>
      <Container>
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel htmlFor="name">First name</FormLabel>
            <InputType value={name} onChange={setName} placeholder="name" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="video">video</FormLabel>
            <InputType value={video} onChange={setVideo} placeholder="video" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="descriptionCurse">descriptionCurse</FormLabel>
            <InputType
              value={description}
              onChange={setDescription}
              placeholder="description curse"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="shortName">Short Name</FormLabel>
            <InputType
              value={shortName}
              onChange={setShortName}
              placeholder="Short Name"
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
