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
      {session?.data?.user?.role === 1 && (
        <>
          <Box>
            <Link href={"/admin/courses/create/main-program"}>
              Create main program
            </Link>
          </Box>
          <Box>
            <Link href={"/admin/courses/create/program"}>
              Create program curse
            </Link>
          </Box>
          <Box>
            <Link href={"/admin/courses/create"}>Create Lesson</Link>
          </Box>
          <Box>
            <Link href={"/admin/task"}>Tasks</Link>
          </Box>
          <Box>
            <Link href={"/admin/question"}>Questions</Link>
          </Box>

          <Box>
            <Heading as="h2"> generalProgram</Heading>
            <Flex gap="10px">
              {generalProgram?.map((generalProgram) => {
                return (
                  <Box
                    key={generalProgram.id}
                    border={"1px"}
                    borderColor={"blackAlpha.200"}
                    p="1rem"
                    fontSize={"16px"}
                  >
                    <Box> {generalProgram.name}</Box>
                    <Box> {generalProgram.description}</Box>
                    <Link
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
              {" "}
              Program
            </Heading>
            <Flex gap="10px">
              {program?.map((program) => {
                return (
                  <Box
                    key={program.id}
                    border={"1px"}
                    borderColor={"blackAlpha.200"}
                    p="1rem"
                    fontSize={"16px"}
                  >
                    <Box> {program.name}</Box>
                    <Box> {program.description}</Box>
                    <Link href={`/admin/courses/edit/program/${program.id}`}>
                      Edit
                    </Link>
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box mt="2rem">
            <Heading as="h2" mb="1rem">
              Lesson
            </Heading>
            <Flex gap="10px">
              {courses?.map((course) => {
                return (
                  <Card key={course.id} fontSize={"16px"}>
                    <CardBody bg={"gray.600"} borderTopRadius={"4px"}>
                      <Box> {course.name}</Box>
                      <Box> {course.description}</Box>
                    </CardBody>
                    <Divider />
                    <CardFooter bg={"gray.600"} borderBottomRadius={"4px"}>
                      <Link href={`/admin/courses/edit/${course.id}`}>
                        Edit
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </Flex>
          </Box>
        </>
      )}
    </Layout>
  );
}
