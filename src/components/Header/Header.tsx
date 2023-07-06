import {
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Image, Link } from "@chakra-ui/next-js";
export default function Header() {
  return (
    <Container borderRadius={'0'} mt={'1rem'} w={'100%'} maxWidth='100%'>
      <Flex justifyContent={"space-between"}  alignItems={'center'}>
        <Box >
         <Link href='/'> <Image width={200} height={30} alt="logo" src={"/logo.svg"} /></Link>
        </Box>
        <Box>
          <Menu>
            <MenuButton as={Button} variant={'menu'} rightIcon={<ChevronDownIcon />}>
              user
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Container>
  );
}
