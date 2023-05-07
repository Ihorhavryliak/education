import { Link } from "@chakra-ui/next-js";
import { Box, Container } from "@chakra-ui/react";

export default function Admin() {
  return (
    <Container>
      <Link href={'/admin/courses/create'}>Create curse</Link>
      <Box>curses</Box>
    </Container>
  );
}
