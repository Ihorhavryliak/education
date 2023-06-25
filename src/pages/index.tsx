import styles from "./index.module.css";
import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Box, Container } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Container>
      <Box>dsfsd</Box>
      <Box>
        <Link href="/courses">courses</Link>
      </Box>
      <Box>
        <Link href="/admin">Admin</Link>
        <AuthShowcase />
      </Box>
    </Container>
  );
};

export default Home;

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className={styles.authContainer}>
      <p className={styles.showcaseText}>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className={styles.loginButton}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
