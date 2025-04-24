import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';

export default function UserRegist() {
  const [ name, setName] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password_confirmation, setPasswordCofirmaiton ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function fetchCreateUser() {
    setIsLoading(true);

    try {
      if (!name || !email || !password || !password_confirmation) {
        toast({
          title: '名前、メールアドレス、パスワードを入力をして下さい。',
          status: 'error',
          isClosable: true,
        });

        return;
      }

      const res = await axios.post("http://localhost:3010/api/v1/auth", {
        name, email, password, password_confirmation
      });

      if (!res.status || (res.status < 200 && res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      localStorage.setItem('access-token', res.data['access_token']);
      localStorage.setItem('client', res.data['client']);
      localStorage.setItem('uid', res.data['uid']);

      console.log(localStorage.getItem('access-token'));
      console.log(localStorage.getItem('client'));
      console.log(localStorage.getItem('uid'));

      toast({
        title: '新規登録しました。',
        status: 'success',
        isClosable: true,
      });
    }
    catch (error) {
      console.error('Error creating credos:', error);
      toast({
        title: '新規登録に失敗しました。',
        status: 'error',
        isClosable: true,
      });
    }
    finally {
      setIsLoading(false);
      setName('');
      setEmail('');
      setPassword('');
      setPasswordCofirmaiton('');
    }
  }
  
  return (
    <Center>
      <Box w={["100%", "90%", "80%", "70%", "60%"]} mt={["50px", "100px", "150px", "200px"]}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前を入力" 
        />
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
        <Input 
          mt="6px"
          type='password'
          value={password_confirmation}
          onChange={(e) => setPasswordCofirmaiton(e.target.value)}
          placeholder="パスワード（確認用）" 
        />
        <Center>
          <Button mt="6px" onClick={fetchCreateUser} isLoading={isLoading} disabled={!name || !email || !password || !password_confirmation}>送信</Button>
        </Center>
      </Box>
    </Center>
   );
 }