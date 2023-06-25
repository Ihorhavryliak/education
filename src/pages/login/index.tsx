import { Button } from "@chakra-ui/react";
import { type GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { type AppProps } from "next/app";

import { Layout } from "~/components/Layout";

const Login = ({ providers }: { providers: AppProps }) => {
  return (
    <Layout>
      {Object.values(providers).map((provider) => (
        <Button
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          key={provider.id}
          onClick={() =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            signIn(provider.id, {
              callbackUrl: `http://localhost:3000/`,
            })
          }
        >
          Sign in with Google
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
