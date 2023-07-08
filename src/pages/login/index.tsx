import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Heading } from "@chakra-ui/react";
import { type GetServerSideProps } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { type AppProps } from "next/app";
import { useRouter } from "next/navigation";


import { Layout } from "~/components/Layout";
import Loader from "~/components/Loader/Loader";

const Login = ({ providers }: { providers: AppProps }) => {
  const router = useRouter();
  const session = useSession();
  
  

  return (
    <Layout>
      {session.status === "loading" ? <Loader/> :<>
      <Heading as="h1" mb='2rem' >
      <ArrowBackIcon onClick={()=>router.push("/")} cursor={'pointer'} />Увійти
      </Heading>

      {Object.values(providers).map((provider) => (
        <Button
        variant={'main'}
          w={"100%"}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          key={provider.id}
          onClick={() =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            signIn(provider.id, {
              callbackUrl: `http://localhost:3000/`,
            })
          }
        >
          Увійти через Google
        </Button>
      ))}
      </>}
    </Layout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
