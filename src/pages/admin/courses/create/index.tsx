import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { CourseType } from "~/schema/course.schema";



export default function CreateCurse() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CourseType>();


  const { mutate } = api.course.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });

  
  const onSubmit: SubmitHandler<CourseType> = (values) => {
    console.log(values, 'values>>>');
    mutate(values);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl /* isInvalid={errors.root?.message} */>
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input
            id="name"
            placeholder="name"
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
          <FormLabel htmlFor="video">video</FormLabel>
          <Input
            id="video"
            placeholder="video"
            {...register("video", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {" "}
            {errors.video && errors.video.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl /* isInvalid={errors.name} */>
          <FormLabel htmlFor="descriptionCurse">descriptionCurse</FormLabel>
          <Input
            id="descriptionCurse"
            placeholder="descriptionCurse"
            {...register("descriptionCurse", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.descriptionCurse && errors.descriptionCurse.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl /* isInvalid={errors.name} */>
          <FormLabel htmlFor="shortName">Short Name</FormLabel>
          <Input
            id="shortName"
            placeholder="Short Name"
            {...register("img", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.descriptionCurse && errors.descriptionCurse.message}
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
