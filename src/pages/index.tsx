import styles from "./index.module.css";
import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

import { Box, Container } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session)
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

  return (
    <div className={styles.authContainer}>
      <p className={styles.showcaseText}>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
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
