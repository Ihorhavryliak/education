import styles from "./index.module.css";
import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

import { Box, Container } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { Layout } from "~/components/Layout";

const Home: NextPage = () => {
  const { data: session } = useSession();

  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Layout>
      <Box my={"25px"}>
        <Link href="/admin">Admin</Link>
      </Box>
      <Box my={"25px"}>
        <Link href="/courses">courses</Link>
      </Box>
      <AuthShowcase />
    </Layout>
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
