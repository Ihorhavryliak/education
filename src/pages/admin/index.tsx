import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function Admin() {
  const session = useSession();
  const router = useRouter();

  const { data: generalProgram, refetch: refetchCurses } =
    api.generalProgram.all.useQuery();
  const { data: program, refetch } = api.program.allProgram.useQuery();
  const { data: courses, refetch: refetchLesson } = api.course.all.useQuery();
  const { mutate } = api.program.delete.useMutation({
    onSuccess: async (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      } else {
        await refetch();
      }
    },
  });
  const { mutate: mutateLesson } = api.course.delete.useMutation({
    onSuccess: async (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      } else {
        await refetchLesson();
      }
    },
  });
  const { mutate: mutateCourse } = api.generalProgram.delete.useMutation({
    onSuccess: async (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      } else {
        await refetchCurses();
      }
    },
  });
  useEffect(() => {
    if (session.status !== "loading" && session?.data?.user?.role !== 1) {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleDeleteProgram = (id: number) => {
    mutate({ id });
  };
  const handleDeleteLesson = (id: number) => {
    mutateLesson({ id });
  };
  const handleDeleteCurse = (id: number) => {
    mutateCourse({ id });
  };

  return (
    <Layout>
      <ArrowBack />
      {session?.data?.user?.role === 1 && (
        <>
          <Flex gap={"1rem"}>
            <Box my="1rem">
              <Link href={"/admin/courses/create/main-program"}>
                Створити курс
              </Link>
            </Box>
            <Box my="1rem">
              <Link href={"/admin/courses/create/program"}>
                Створити програму
              </Link>
            </Box>
            <Box my="1rem">
              <Link href={"/admin/courses/create"}>Створити урок</Link>
            </Box>
            <Box my="1rem">
              <Link href={"/admin/task"}>Створити завдання</Link>
            </Box>
            <Box my="1rem">
              <Link href={"/admin/question"}>Створити питання</Link>
            </Box>
          </Flex>
          <Box>
            <Heading as="h2" mt="1rem">
              Курси
            </Heading>
            <Flex gap="2rem" mt="1rem">
              {generalProgram?.map((generalProgram) => {
                return (
                  <Box
                    key={generalProgram.id}
                    border={"1px"}
                    borderColor={"gray.600"}
                    borderRadius={"1rem"}
                    p="1rem"
                    fontSize={"16px"}
                    w={"250px"}
                  >
                    <Box> {generalProgram.name}</Box>
                    <Box mb="1rem" noOfLines={1}>
                      {generalProgram.description}
                    </Box>
                    <Flex justifyContent={"space-between"}>
                      <Link
                        variant={"button"}
                        href={`/admin/courses/edit/main-program/${generalProgram.id}`}
                      >
                        Edit
                      </Link>
                      <Button
                        variant={"main"}
                        onClick={() => handleDeleteCurse(generalProgram.id)}
                      >
                        Видалити
                      </Button>
                    </Flex>
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box mt="2rem">
            <Heading as="h2" mb="1rem">
              Програми
            </Heading>
            <Flex gap="2rem">
              {program?.map((program) => {
                return (
                  <Box
                    key={program.id}
                    border={"1px"}
                    borderColor={"gray.600"}
                    borderRadius={"1rem"}
                    p="1rem"
                    fontSize={"16px"}
                    w={"250px"}
                  >
                    <Box> {program.name}</Box>
                    <Box mb="1rem" noOfLines={1}>
                      {" "}
                      {program.description}
                    </Box>
                    <Flex justifyContent={"space-between"}>
                      <Link
                        variant={"button"}
                        href={`/admin/courses/edit/program/${program.id}`}
                      >
                        Edit
                      </Link>

                      <Button
                        variant={"main"}
                        onClick={() => handleDeleteProgram(program.id)}
                      >
                        Видалити
                      </Button>
                    </Flex>
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box mt="2rem">
            <Heading as="h2" mb="1rem">
              Уроки
            </Heading>
            <Flex gap="2rem" flexWrap={"wrap"}>
              {courses?.map((course) => {
                return (
                  <Box
                    key={course.id}
                    border={"1px"}
                    borderColor={"gray.600"}
                    borderRadius={"1rem"}
                    p="1rem"
                    fontSize={"16px"}
                    w={"250px"}
                  >
                    <Box color={"gray.400"} borderTopRadius={"4px"}>
                      <Box> {course.name}</Box>
                      <Box> {course.description}</Box>
                    </Box>

                    <Flex mt="1rem" justifyContent={"space-between"}>
                      <Link
                        variant={"button"}
                        href={`/admin/courses/edit/${course.id}`}
                      >
                        Edit
                      </Link>
                      <Button
                        variant={"main"}
                        onClick={() => handleDeleteLesson(course.id)}
                      >
                        Видалити
                      </Button>
                    </Flex>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </>
      )}
    </Layout>
  );
}
