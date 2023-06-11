import {
  CheckCircleIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router'
import React from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";



export default function CursePage() {
  const router = useRouter()
  const pathname = usePathname();

  const { data } = api.program.all.useQuery({id: router.query.idCurses ? router.query.idCurses as string : '' });

  return (
    <Layout>
      <Container pt="3rem ">
        <Heading as="h2" mb="1.5rem">
          {data && data.mainProgram?.name}
        </Heading>
        <Heading
          bg="white"
          as="h3"
          fontSize={"1.875rem"}
          borderRadius={"0.5rem 0.5rem 0  0"}
          border="1px"
          borderColor="grays.300"
          padding={"1rem"}
        >
          Навчальний план
        </Heading>

        {data &&
          data.program.map((mainCur) => {
            return (
              <Box
                bg="white"
                key={mainCur.id}
                border="1px"
                borderTop={"0"}
                padding={"1rem"}
                borderColor="grays.300"
              >
                {/*   <Heading as="h4" fontSize={"1.3125rem"} mb="1.6rem ">
                {cur.curse.name}
              </Heading> */}
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box
                          display={"block"}
                          color="white.400"
                          fontWeight={700}
                          backgroundColor="gray.300"
                          height="40px"
                          width="40px"
                          lineHeight="40px"
                          borderRadius="50%"
                          textAlign="center"
                          fontSize={"13px"}
                          mr="1rem"
                          _hover={{
                            color: "white",
                            backgroundColor: "reds.100",
                            borderColor: "reds.100",
                            transition: "all ease-out 0.2s",
                          }}
                        >
                          {/* <ArrowForwardIcon
                                    fontWeight="900"
                                    fontSize={"20px"}
                                  /> */}
                          70%
                        </Box>
                        <Heading
                          as="h4"
                          flex="1"
                          textAlign="left"
                          fontSize={"16px"}
                          color="grays.800"
                        >
                          {mainCur.name}
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>

                    {mainCur.coursesPages.map((page) => {
                      return (
                        <AccordionPanel
                          key={page.id}
                          py={"15px"}
                          borderTop="1px"
                          borderColor="gray.100"
                          _hover={{
                            background: "blue.100",
                            transition: "all ease-out 0.2s",
                          }}
                        >
                          <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Flex alignItems={"center"} gap="1rem">
                              <CheckCircleIcon
                                fontWeight="900"
                                fontSize={"24px"}
                              />

                              <Heading
                                as="h6"
                                fontWeight={400}
                                fontSize="0.9375rem"
                              >
                                {page.name}
                              </Heading>
                            </Flex>

                            <Link
                              color="blue.500"
                              fontSize="1.2125rem"
                              href={`${pathname}/${page.id}`}
                              _hover={{
                                color: "blue.300",
                                transition: "all ease-out 0.2s",
                              }}
                            >
                              <ExternalLinkIcon />
                            </Link>
                          </Flex>
                        </AccordionPanel>
                      );
                    })}
                  </AccordionItem>
                </Accordion>
              </Box>
            );
          })}
      </Container>
    </Layout>
  );
}
