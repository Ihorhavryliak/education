import { Link } from "@chakra-ui/next-js";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function Admin() {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    /* debugger
    if (!data) {
      router.push('/').catch((error) => {
        console.error("Failed to navigate:", error);
      });
    } */
  }, []);

  const { data: generalProgram } = api.generalProgram.all.useQuery();
  const { data: program } = api.program.all.useQuery({
    id: router.query.idCurses ? (router.query.idCurses as string) : "",
  }, {});
  const { data: courses } = api.course.all.useQuery();

  return (
    <Layout>
      <Container>
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
          <Link href={"/admin/courses/create"}>Create curse</Link>
        </Box>
        <Box>curses</Box>

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
                  <Link href={`/admin/courses/edit/main-program/${generalProgram.id}`}>Edit</Link>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Container>
    </Layout>
  );
}
