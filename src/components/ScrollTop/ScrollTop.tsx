import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          transition="all 0.3s ease-in-out"
          borderRadius="10%"
          lineHeight="52px"
          bg={"primary.200"}
          cursor="pointer"
          position="fixed"
          bottom="40px"
          w={"42px"}
          h="42px"
          right="40px"
          _hover={{ bg: "primary.500" }}
          onClick={scrollToTop}
        >
          <ChevronUpIcon color={"white"} boxSize={10} />
        </Flex>
      )}
    </>
  );
}
