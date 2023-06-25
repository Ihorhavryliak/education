import { Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

const SignUp = () => {

  const { mutate } = api.user.create.useMutation({
    onSuccess: (err) => {
      if (!err) {
        console.log("Todo completed 🎉");
      }
    },
  });

  const [email, setEmail] = useState("");
  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const handleSend = () => {
    mutate({email, password})
  };
  return (
    <Layout>
      <Text mb="8px">Email</Text>
      <Input onChange={(e) => handleEmail(e.target.value)} type="email" />
      <Text mb="8px">Password</Text>
      <Input onChange={(e) => handlePassword(e.target.value)} type="password" />
      <Button onClick={handleSend} mt={"2rem"}>
        Sigh up
      </Button>
    </Layout>
  );
};

export default SignUp;
