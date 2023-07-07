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


import { Image, Link } from "@chakra-ui/next-js";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <Container borderRadius={"0"} mt={"1rem"} w={"100%"} maxWidth="100%"  >
      <Flex justifyContent={"space-between"} alignItems={"center"} h={'40px'} >
        <Box>
          <Link href="/">
            <Image width={120} height={30} alt="logo" src={"/logo.svg"} />
          </Link>
        </Box>
        <Box>
          {sessionData ? (
            <Menu>
              <MenuButton
              _hover= {{ color: "primary.100" }}
                as={Button}
                variant={"menu"} 
              >
                <Flex alignItems={'center'} gap='8px' >
                  {sessionData.user.image && (
                    <Image
                      width={30}
                      height={30}
                      borderRadius={"50%"}
                      src={sessionData.user.image}
                      alt={sessionData.user.name as string}
                    />
                  )}

                  {sessionData.user.name}
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  Вийти
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link _hover={{ color: "primary.100" }} href={"login"}>Увійти</Link>
          )}
        </Box>
      </Flex>
    </Container>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData && <span>Logged in as {sessionData.user?.name}</span>}

      <button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
