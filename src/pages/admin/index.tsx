import { Link } from "@chakra-ui/next-js";
import { Box, Container } from "@chakra-ui/react";

export default function Admin() {
  return (
    <Container>
      <Box>
        <Link href={"/admin/courses/create/main-program"}>
          Create main program
        </Link>
      </Box>
      <Box>
        <Link href={"/admin/courses/create/program"}>Create program curse</Link>
      </Box>
      <Box>
        <Link href={"/admin/courses/create"}>Create curse</Link>
      </Box>
      <Box>curses</Box>
    </Container>
  );
}
