import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Heading } from "@chakra-ui/react";
import { type GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { type AppProps } from "next/app";
import { useRouter } from "next/navigation";
import ArrowBack from "~/components/ArrowBack/ArrowBack";

import { Layout } from "~/components/Layout";

const Login = ({ providers }: { providers: AppProps }) => {
  const router = useRouter();
  return (
    <Layout>
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
