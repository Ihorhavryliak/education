import styles from "./index.module.css";
import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Layout } from "~/components/Layout";
import mainImage from "../assets/Image/main.png";
import Image from "next/image";
import { ArrowForwardIcon } from "@chakra-ui/icons";
const Home: NextPage = () => {
  const { data: session,  } = useSession();

  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Layout>Головна</Layout>
      <Container bg="darks.200">
        <Flex>
          <Box w="100%">
            <Heading as="h1">Ласкаво просимо до Edupt!</Heading>
            <Box mt="2rem" mb="4rem">
              <Heading fontSize={"24px"} as="h2">
                Давай ставати кращими разом
              </Heading>
            </Box>
            <Link variant={"button"} href={"/courses"}>
              Перейти до курсів <ArrowForwardIcon />
            </Link>
          </Box>
          <Flex justifyContent={"center"} w="100%">
            <Image
              width={500}
              height={500}
              alt="main image"
              src={"/main.png"}
            />
          </Flex>
        </Flex>
        {session?.user.role === 1 && (
          <Box my={"25px"}>
            <Link variant={"button"} href="/admin">
              Admin
            </Link>
          </Box>
        )}
      </Container>
      <Container>
        Всі курси безкоштовні. Пітримайте нас фінансово
        <Link variant={"buttonLink"} ms="8px" href={"/courses"}>
          Підтримати
        </Link>
      </Container>
    </>
  );
};

export default Home;

