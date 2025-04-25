import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';

export default function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function fetchLogin() {
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast({
          title: 'メールアドレス、パスワードを入力をして下さい。',
          status: 'error',
          isClosable: true,
        });

        return;
      }

      const res = await axios.post("http://localhost:3010/api/v1/auth/sign_in", {
        email, password
      });

      if (!res.status || (res.status < 200 && res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      localStorage.setItem('access-token', res.headers['access-token']);
      localStorage.setItem('client', res.headers['client']);
      localStorage.setItem('uid', res.headers['uid']);

      console.log(localStorage.getItem('access-token'));
      console.log(localStorage.getItem('client'));
      console.log(localStorage.getItem('uid'));

      toast({
        title: 'ログインしました。',
        status: 'success',
        isClosable: true,
      });
    }
    catch (error) {
      console.error('Error creating credos:', error);
      toast({
        title: 'ログインに失敗しました。',
        status: 'error',
        isClosable: true,
      });
    }
    finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
  }
  
  return (
    <Center>
      <Box w={["100%", "90%", "80%", "70%", "60%"]} mt={["50px", "100px", "150px", "200px"]}>
        <Input
          mt="6px"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Eメールを入力" 
        />
        <Input
          mt="6px"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード" 
        />
        <Center>
          <Button mt="6px" onClick={fetchLogin} isLoading={isLoading} disabled={!email || !password}>送信</Button>
        </Center>
      </Box>
    </Center>
   );
 }