import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  Center,

} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';

export default function NewCategory() {
  const [category, setCategory] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchGetUserName();
  }
  , []);

  async function fetchGetUserName() {
    try {
      const res = await axios.get("http://localhost:3010/api/v1/users/user_name", {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'client': localStorage.getItem('client'),
          'uid': localStorage.getItem('uid'),
        }
      });

      if (!res.status || (res.status < 200 && res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setUserName(res.data.name);
    }
    catch (error) {
      console.error('Error creating credos:', error);
      toast({
        title: 'ユーザー名の取得に失敗しました。',
        status: 'error',
        isClosable: true,
      });
    }
  }

  async function fetchCreateCategory() {
    setIsLoading(true);

    try {
      if (!category) {
        toast({
          title: 'カテゴリを入力して下さい。',
          status: 'error',
          isClosable: true,
        });

        return;
      }

      const res = await axios.post("http://localhost:3010/api/v1/categories", {
        category: {
          name: category,
        },}, 
        {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getItem('client'),
            'uid': localStorage.getItem('uid'),
          }
        });

      if (!res.status || (res.status < 200 && res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      toast({
        title: 'カテゴリを登録しました。',
        status: 'success',
        isClosable: true,
      });
    }
    catch (error) {
      console.error('Error creating credos:', error);
      toast({
        title: 'カテゴリの登録に失敗しました。',
        status: 'error',
        isClosable: true,
      });
    }
    finally {
      setIsLoading(false);
      setCategory('');
    }
  }

  return (
    <Center>
      <Box w={["100%", "90%", "80%", "70%", "60%"]} mt={["50px", "100px", "150px", "200px"]}>
          {"ユーザ名 : "+userName}
          <Input
            mt={6}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="追加したいカテゴリを入力" />
        <Center>
          <Button mt="6px" onClick={fetchCreateCategory} isLoading={isLoading} disabled={!userName || !category}>登録</Button>
        </Center>
      </Box>
    </Center>
  );
}