import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function Courses() {
  const { data } = api.generalProgram.all.useQuery();

  return (
    <>
      <Layout>
        <Box as="span" fontSize={"16px"} position={'relative'} mr='8px'>
          <ArrowBack />
        </Box>
        Курси
      </Layout>
      <Container bg="darks.200" px={0}>
        <Flex
          w="100%"
          flexWrap={"wrap"}
          gap="2.98rem" /* justifyContent={'space-between'} */
        >
          {data &&
            data.map((curse) => {
              return (
                <Card key={curse.id}>
                  <CardBody>
                    <Box maxWidth={"372px"}>
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
                            {curse.description}
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
