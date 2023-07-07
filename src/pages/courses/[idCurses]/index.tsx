import {
  ArrowForwardIcon,
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
  Button,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ArrowBack from "~/components/ArrowBack/ArrowBack";
import CircularProgress from "~/components/CircularProgress/CircularProgress";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";
import Router from "next/router";
import Loader from "~/components/Loader/Loader";

export default function CursePage() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const userId = session?.data?.user?.id as number;

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

  const { data, isLoading: isLoadingProgram } = api.program.all.useQuery({
    id: router.query.idCurses ? (router.query.idCurses as string) : "",
  });
  const { data: competesId, isLoading: isLoadingComplete } =
    api.complete.findAllByUserId.useQuery(
      {
        userId: userId,
      },
      { enabled: userId ? true : false }
    );

  const handleToPage = async (pageId: number) => {
    const isInCompetes = competesId?.find((ids) => ids.programId === pageId);
    if (!isInCompetes) {
      mutate({ userId: userId, pageId });
      await router.push(`${pathname}/${pageId}`);
    } else {
      await router.push(`${pathname}/${pageId}`);
    }
  };

  useEffect(() => {
    if (!(session.status === 'loading') && !session?.data) {
      void router.push("/login");
    }
  }, []);

  return (
    <>
      <Layout>
        {isLoading || isLoadingProgram || isLoadingComplete ? (
          <Loader />
        ) : (
          <>
            {session?.data && (
              <>
                <Heading as="h2" mb="1.5rem">
                  <ArrowBack /> {data && data.mainProgram?.name}
                </Heading>

                <Heading
                  as="h3"
                  fontSize={"1.875rem"}
                  borderRadius={"0.5rem"}
                  border="1px"
                  borderColor="grays.300"
                  padding={"1rem"}
                  //bg="grays.900"
                >
                  Навчальний план
                </Heading>
              </>
            )}
          </>
        )}
      </Layout>
      {data &&
        data.program.map((mainCur) => {
          return (
            <Container
              _before={{
                content: "''",
                position: "absolute",
                width: "2px",
                height: "3rem",
                backgroundColor: "darks.300",
                zIndex: "0",
                marginTop: "-4.6rem",
                marginLeft: "2.5rem",
              }}
              key={mainCur.id}
              mt={"3rem"}
            >
              <Box>
                {/*   <Heading as="h4" fontSize={"1.3125rem"} mb="1.6rem ">
                {cur.curse.name}
              </Heading> */}
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem border={0}>
                    <h2>
                      <AccordionButton my="1rem" _hover={{ bg: "none" }}>
                        <Text mr={"1rem"}>
                          <CircularProgress
                            size={50}
                            strokeWidth={2}
                            percentage={
                              mainCur &&
                              Math.round(
                                (mainCur?.coursesPages?.filter((cursePage) =>
                                  competesId?.some(
                                    (compete) =>
                                      compete.completeProgramId === cursePage.id
                                  )
                                ).length /
                                  mainCur?.coursesPages.length) *
                                  100
                              )
                            }
                            color={
                              mainCur &&
                              Math.round(
                                (mainCur?.coursesPages?.filter((cursePage) =>
                                  competesId?.some(
                                    (compete) =>
                                      compete.completeProgramId === cursePage.id
                                  )
                                ).length /
                                  mainCur?.coursesPages.length) *
                                  100
                              ) === 100
                                ? "#8e85e6"
                                : "#f7c32e"
                            }
                          />
                        </Text>
                        <Heading
                          as="h4"
                          flex="1"
                          textAlign="left"
                          fontSize={"16px"}
                        >
                          {mainCur.name}
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>

                    {mainCur.coursesPages.map((page, index) => {
                      return (
                        <AccordionPanel
                          key={page.id}
                          py={"15px"}
                          ps="26px"
                          borderTop={index === 0 ? "1px" : 0}
                          borderBottom="1px"
                          borderColor="darks.200"
                          _hover={{
                            background: "primary.200",
                            transition: "all ease-out 0.2s",
                          }}
                          onClick={() => handleToPage(page.id)}
                          cursor={"pointer"}
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
                                    ? "primary.100"
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

                            {/* <Button
                              
                              color="blue.500"
                              fontSize="1.2125rem"
                            > */}
                            <ArrowForwardIcon boxSize={6} />
                            {/*    </Button> */}
                          </Flex>
                        </AccordionPanel>
                      );
                    })}
                  </AccordionItem>
                </Accordion>
              </Box>
            </Container>
          );
        })}
    </>
  );
}
