import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
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

  const { data: generalProgram } = api.generalProgram.all.useQuery();
  const { data: program } = api.program.allProgram.useQuery();
  const { data: courses } = api.course.all.useQuery();

  useEffect(() => {
    if (
      (!(session.status === "loading") && !session?.data) ||
      session?.data?.user?.role !== 1
    ) {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Layout>
      <ArrowBack />
      {session?.data?.user?.role === 1 && (
        <>
        <Flex gap={'1rem'}>
          <Box my='1rem'>
            <Link href={"/admin/courses/create/main-program"}>
              Створити курс
            </Link>
          </Box>
          <Box my='1rem'>
            <Link href={"/admin/courses/create/program"}>
            Створити програму
            </Link>
          </Box>
          <Box my='1rem'>
            <Link href={"/admin/courses/create"}>Створити урок</Link>
          </Box>
          <Box my='1rem'>
            <Link href={"/admin/task"}>Створити завдання</Link>
          </Box>
          <Box my='1rem'>
            <Link href={"/admin/question"}>Створити питання</Link>
          </Box>
          </Flex>
          <Box>
            <Heading as="h2" mt='1rem'> Курси</Heading>
            <Flex gap="2rem" mt='1rem'>
              {generalProgram?.map((generalProgram) => {
                return (
                  <Box
                    key={generalProgram.id}
                    border={"1px"}
                    borderColor={"gray.600"}
                    borderRadius={"1rem"}
                    p="1rem"
                    fontSize={"16px"}
                  >
                    <Box> {generalProgram.name}</Box>
                    <Box mb="1rem" noOfLines={1}>
                      {" "}
                      {generalProgram.description}
                    </Box>
                    <Link
                      variant={"button"}
                      href={`/admin/courses/edit/main-program/${generalProgram.id}`}
                    >
                      Edit
                    </Link>
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
                    maxW={"200px"}
                  >
                    <Box> {program.name}</Box>
                    <Box mb="1rem" noOfLines={1}>
                      {" "}
                      {program.description}
                    </Box>
                    <Link
                      variant={"button"}
                      href={`/admin/courses/edit/program/${program.id}`}
                    >
                      Edit
                    </Link>
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box mt="2rem">
            <Heading as="h2" mb="1rem">
              Уроки
            </Heading>
            <Flex gap="2rem" >
              {courses?.map((course) => {
                return (
                  <Box
                  key={course.id}
                  border={"1px"}
                  borderColor={"gray.600"}
                  borderRadius={"1rem"}
                  p="1rem"
                  fontSize={"16px"}
                  maxW={"200px"}
                >
                    <Box color={"gray.400"} borderTopRadius={"4px"} >
                      <Box> {course.name}</Box>
                      <Box> {course.description}</Box>
                    </Box>
                   
                    <Box mt='1rem'>
                      <Link
                        variant={"button"}
                        href={`/admin/courses/edit/${course.id}`}
                      >
                        Edit
                      </Link>
                    </Box>
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
