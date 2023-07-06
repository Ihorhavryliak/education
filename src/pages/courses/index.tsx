import { Link } from "@chakra-ui/next-js";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function Courses() {
  const { data } = api.generalProgram.all.useQuery();

  return (
    <Layout>
      <Flex
        w="100%"
        flexWrap={"wrap"}
        gap="2rem" /* justifyContent={'space-between'} */
      >
        {data &&
          data.map((curse) => {
            return (
              <Box key={curse.id} maxWidth={"272px"}>
                <Box
                  borderRadius="0.5rem 0.5rem 0 0"
                  boxShadow="0px 0px 40px rgba(29, 58, 83, 0.15)"
                >
                  <Flex
                    bg={"gray.400"}
                    minH={"8rem"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text
                      fontSize={"3rem"}
                      fontWeight={"bold"}
                      textTransform={"uppercase"}
                      color={"facebook.700"}
                    >
                      {curse.shortName}
                    </Text>
                  </Flex>
                  <Box p="1rem 1rem 0 1rem" bg="white">
                    <Text as="h5">
                      <Link
                        fontFamily={"Heebo, sans-serif"}
                        fontSize="calc(1.25625rem + 0.075vw)"
                        fontWeight={700}
                        color="grays.800"
                        href={`/courses/${curse.id}`}
                      >
                        {curse.name}
                      </Link>
                      <Text mb={0.5}>
                        Proposal indulged no do sociable he throwing settling.
                      </Text>
                      <Text
                        color="grays.800"
                        fontFamily="Heebo, sans-serif"
                        fontSize="0.9375rem"
                      >
                        0/5.0
                      </Text>
                    </Text>
                  </Box>
{/*                   <Box p="0 1rem 1rem 1rem">
                    <Divider my="1rem " borderColor="grays.500" />
                    <Flex justifyContent={"space-between"}>
                      <Box>12h 56m</Box>
                      <Box>15 lectures</Box>
                    </Flex>
                  </Box> */}
                </Box>
              </Box>
            );
          })}
      </Flex>
    </Layout>
  );
}
