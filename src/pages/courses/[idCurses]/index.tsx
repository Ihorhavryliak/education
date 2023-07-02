import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function CursePage() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const userId = session?.data?.user?.id as number;
  console.log(session, 'session>>')
  const { mutate, isLoading } = api.complete.create.useMutation({
    onSuccess: () => {
      //update data
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        console.log(errorMessage[0]);
      } else {
        console.log("Failed! Please try again later.");
      }
    },
  });

  const { data } = api.program.all.useQuery({
    id: router.query.idCurses ? (router.query.idCurses as string) : "",
  });
  const { data: competesId } = api.complete.findAllByUserId.useQuery(
    {
      userId: userId,
    },
    { enabled: userId ? true : false }
  );

  const handleToPage = async (pageId: number) => {
    const isInCompetes = competesId?.find((ids) => ids.programId === pageId);
    debugger;
    if (!isInCompetes) {
      debugger;
      mutate({ userId: userId, pageId });
      await router.push(`${pathname}/${pageId}`);
    } else {
      await router.push(`${pathname}/${pageId}`);
    }
  };
  console.log(competesId, "competesId");
  console.log(data, "data");
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
                          {mainCur &&
                            Math.round(mainCur?.coursesPages?.filter((cursePage) =>
                              competesId?.some(
                                (compete) =>
                                  compete.completeProgramId === cursePage.id
                              )
                            ).length / mainCur?.coursesPages.length * 100)}
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
                                color={
                                  competesId?.find(
                                    (ids) => ids.programId === page.id
                                  )?.completeProgramId
                                    ? "green"
                                    : "gray.100"
                                }
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

                            <Button
                              onClick={() => handleToPage(page.id)}
                              color="blue.500"
                              fontSize="1.2125rem"
                            >
                              <ExternalLinkIcon />
                            </Button>
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
