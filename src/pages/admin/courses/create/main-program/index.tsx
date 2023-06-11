import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { GeneralProgramType } from "~/schema/general.schema";

export default function CreateGeneralProgram() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<GeneralProgramType>();

  const { mutate } = api.generalProgram.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });

  const onSubmit: SubmitHandler<GeneralProgramType> = (values) => {
    console.log(values, "values>>>");
    mutate(values);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl /* isInvalid={errors.root?.message} */>
          <FormLabel htmlFor="name">Title Program</FormLabel>
          <Input
            id="name"
            placeholder="Title Program"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl /* isInvalid={errors.name} */>
          <FormLabel htmlFor="description">Description Program</FormLabel>
          <Input
            id="description"
            placeholder="description"
            {...register("description", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl /* isInvalid={errors.name} */>
          <FormLabel htmlFor="shortName">Short Name</FormLabel>
          <Input
            id="shortName"
            placeholder="Short Name"
            {...register("shortName", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.shortName && errors.shortName.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
