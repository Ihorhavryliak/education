import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import React from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

export default function Curse() {
  const router = useRouter();
  if (!router.query.curse) return;
  const { data } = api.course.getById.useQuery({
    curseId: router.query.curse as string,
  });

  console.log(data, "data<<");
  return (
    <Layout>
      {data && (
        <Container pt={"3rem "}>
          <Box>
            <Heading as="h1" mb="1.5rem">
              Вступ
            </Heading>
            {data.video && (
              <Box maxHeight={"600px"} height="100%">
                <iframe
                  width="100%"
                  height="360"
                  src={`https://www.youtube.com/embed/${data.video}`}
                ></iframe>
              </Box>
            )}
            <Box mt="2rem">
              <Heading as="h5" mb="1rem">
                Теорія
              </Heading>
             <Text>{data.descriptionCurse}</Text> 
            </Box>

            <Box mt="1.2rem">
              <Heading as="h5" mb="1rem">
                Завдання
              </Heading>
              <Accordion defaultIndex={[]} allowMultiple>
                {data?.task &&
                  data.task.map((task) => {
                    return (
                      <AccordionItem key={task.id}>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              {task.name}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {task.description}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
              </Accordion>
            </Box>

            <Box mt="1.2rem">
              <Heading as="h5" mb="1rem">
                Питання для співбесіди
              </Heading>
              <Accordion defaultIndex={[]} allowMultiple>
                {data.question.map((question) => {
                  return (
                    <AccordionItem key={question.id}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {question.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>{question.answer}</AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Box>
          </Box>
        </Container>
      )}
    </Layout>
  );
}
