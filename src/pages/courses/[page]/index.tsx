"use client";
import {
  ArrowForwardIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Layout } from "~/components/Layout";

const curses = [
  {
    id: 1,
    name: "Next",
    describe: "Curse about",
    rating: [5],
    curse: [
      {
        id: 1,
        name: "Введення в цифровий маркетинг (3 лекції)",
        coursesPages: [
          {
            id: 3,
            name: "вступ",
            sort: 1,
          },
          {
            id: 3,
            name: "Що таке nest",
            sort: 2,
          },
          {
            id: 8,
            name: "Що таке nest",
            sort: 2,
          },
        ],
      },
      {
        id: 2,
        name: "Теорія Nest",
        coursesPages: [
          {
            id: 4,
            name: "вступ",
            sort: 1,
          },
          {
            id: 5,
            name: "Що таке nest",
            sort: 2,
          },
        ],
      },
    ],
  },
];

export default function CursePage() {
  const pathname = usePathname();
  return (
    <Layout>
      <Container pt="3rem ">
        <Heading as="h2" mb="1.5rem">
          Курс Next js
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

        {curses.map((cur) => {
          return (
            <Box
              bg="white"
              key={cur.id}
              border="1px"
              borderTop={"0"}
              padding={"1rem"}
              borderColor="grays.300"
            >
              {/*   <Heading as="h4" fontSize={"1.3125rem"} mb="1.6rem ">
                {cur.curse.name}
              </Heading> */}
              <Accordion defaultIndex={[0]} allowMultiple>
                {cur.curse.map((curse) => {
                  return (
                    <AccordionItem key={curse.id}>
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
                            {curse.name}
                          </Heading>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>

                      {curse.coursesPages.map((page) => {
                        return (
                        
                            <AccordionPanel key={page.id}  py={'15px'} borderTop='1px' 
                            borderColor='gray.100'
                            _hover={{
                              background: "blue.100",
                              transition: "all ease-out 0.2s",
                            }}
                            >
                              <Flex
                                /* borderTop='1px' py='10px' borderColor={'gray.200'} */
                                alignItems={"center"}
                                justifyContent={"space-between"}
                              >
                                <Flex alignItems={"center"} gap="1rem">
                                  <CheckCircleIcon
                                    fontWeight="900"
                                    fontSize={"24px"}
                                  />

                                  <Heading as="h6" fontWeight={400} fontSize="0.9375rem">
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
                  );
                })}
              </Accordion>
            </Box>
          );
        })}
      </Container>
    </Layout>
  );
}
