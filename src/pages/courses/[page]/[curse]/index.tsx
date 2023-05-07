"use client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "~/components/Layout";

const course = {
  id: 1,
  video: "https://www.youtube.com/embed/oFXX-R-2fgU",
  theory: `Привіт! 😊 У цьому модулі ти познайомишся з основами мови
  програмування Javascript та навчишся розвязувати прості алгоритмічні
  задачі. Якщо ти бажаєш повторювати код з відеоуроків, будь ласка,
  встанови Visual Studio Code. У відео ти знайдеш деякі поради щодо
  використання VSCode. Редактор на платформі працює так само, тому ти
  можеш використовувати ті ж команди в ньому. Встановлення VSCode на
  MacOS Якщо у тебе компютер або ноутбук з macOS, просто завантаж
  VSCode, розпакуй його та запусти. Встановлення VSCode на Windows
  Якщо у тебе Windows, виконай наступні кроки: Завантаж VSCode.
  Запусти файл як завжди (НЕ як Адміністратор). Продовжуй до кроку
  Select Additional Tasks. Обери наступні опції: Add action ...
  дозволяє тобі відкривати файли та папки з контекстного меню (правою
  клавішею); Register Code ... відкриватиме підтримувані файли в
  VSCode після подвійного кліку; Add to PATH дозволяє запустити VSCode
  з Терміналу за допомогою команди code. Select Additional Tasks
  Продовжуй до завершення.`,
  task: [
    {
      id: 1,
      name: " Завдання 1",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      id: 2,
      name: "Завдання 2",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
  ],
  question: [
    {
      id: 1, name: 'Що таке Java Script ?',
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.`
    },
    {
      id: 2, name: 'Що таке Java ?',
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.`
    }
  ],
  rating: 2,
};

export default function Curse() {
  return (
    <Layout>
      <Container pt={"3rem "}>
        <Box>
          <Heading as="h1" mb="1.5rem">
            Вступ
          </Heading>
          <Box maxHeight={"600px"} height="100%">
            <iframe
              width="100%"
              height="600px"
              src={course.video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </Box>
          <Box mt="2rem">
            <Heading as="h5" mb="1rem">
              Теорія
            </Heading>
            <Text>{course.theory}</Text>
          </Box>

          <Box mt="1.2rem">
            <Heading as="h5" mb="1rem">
              Завдання
            </Heading>
            <Accordion defaultIndex={[]} allowMultiple>
              {course.task.map((task) => {
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
                    <AccordionPanel pb={4}>{task.description}</AccordionPanel>
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
              
              {course.question.map(question=>{return(
                 <AccordionItem key={question.id}>
                 <h2>
                   <AccordionButton>
                     <Box as="span" flex="1" textAlign="left">
                       {question.name}
                     </Box>
                     <AccordionIcon />
                   </AccordionButton>
                 </h2>
                 <AccordionPanel pb={4}>
                 {question.answer}
                 </AccordionPanel>
               </AccordionItem>
              )})}
            </Accordion>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
