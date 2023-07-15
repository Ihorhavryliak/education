import { Link } from "@chakra-ui/next-js";
import { Box, Card, CardBody, Container, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import { usePathname } from "next/navigation";

import ArrowBack from "~/components/ArrowBack/ArrowBack";
import { Layout } from "~/components/Layout";
import Loader from "~/components/Loader/Loader";
import { api } from "~/utils/api";

export default function Courses() {
  const { data, isLoading } = api.generalProgram.all.useQuery();
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>Безкоштовні курси Front-End, Back-End, Full-Stack - Edupt</title>
        <meta
          name="description"
          content="Дізнайтесь більше про безкоштовні курси з Front-End, Back-End та Full-Stack розробки на Edupt. Розширюйте свої навички програмування та створюйте вражаючі веб-додатки."
        />
      </Head>
      <Layout>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Box as="span" fontSize={"16px"} position={"relative"} mr="8px">
              <ArrowBack pathname={pathname} />
            </Box>
            Курси
          </>
        )}
      </Layout>
      <Container bg="darks.200" px={0}>
        <Flex w="100%" flexWrap={"wrap"} gap="3rem">
          {data &&
            data.map((curse) => {
              return (
                <Card key={curse.id}>
                  <CardBody>
                    <Box>
                      <Link href={`/courses/${curse.id}`}>
                        <Flex
                          borderRadius={"1rem"}
                          bg={"darks.300"}
                          minH={"267px"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Text
                            fontSize={"2rem"}
                            fontWeight={"bold"}
                            textTransform={"uppercase"}
                            color={"primary.100"}
                          >
                            {curse.shortName}
                          </Text>
                        </Flex>
                      </Link>
                      <Box p="1rem " bg="primary.200">
                        <Text as="h5">
                          <Link
                            fontFamily={"Heebo, sans-serif"}
                            fontSize="calc(1.25625rem + 0.075vw)"
                            fontWeight={700}
                            color="white"
                            href={`/courses/${curse.id}`}
                          >
                            {curse.name}
                          </Link>
                          <Text
                            my="1rem"
                            color={"grays.400"}
                            minHeight={"48px"}
                            noOfLines={2}
                          >
                            {curse.descriptionGeneral}
                          </Text>
                        </Text>
                      </Box>
                    </Box>
                  </CardBody>
                </Card>
              );
            })}
        </Flex>
      </Container>
    </>
  );
}
