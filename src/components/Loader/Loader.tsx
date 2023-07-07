import {  Flex, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} h={'100vh'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.700"
        color="primary.100"
        size='xl'
      />
    </Flex>
  );
}
