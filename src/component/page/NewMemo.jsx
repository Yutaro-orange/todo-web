import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Center,
  Select,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';

export default function NewMemo() {
  const [ categories, setCategories] = useState([]);
  const [ category_id, setCategoryId ] = useState('');
  const [ memo, setMemo ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchGetCategory();
  }, [])

  async function fetchGetCategory() {
    try {
      const res = await axios.get("http://localhost:3010/api/v1/categories");

      if (!res.status || (res.status < 200 && res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setCategories(res.data);
    }
    catch (error) {
      console.error('Error creating credos:', error);
      toast({
        title: 'カテゴリの取得に失敗しました。',
        status: 'error',
        isClosable: true,
      });
    }
  }

  async function fetchCreateMemo() {
    setIsLoading(true);

    try {
      if (!category_id || !memo) {
        toast({
          title: 'カテゴリの選択とメモの入力をして下さい。',
          status: 'error',
          isClosable: true,
        });

        return;
      }

      const res = await axios.post("http://localhost:3010/api/v1/memos", {
        memo: {
          content: memo,
          category_id
        },
      });

      if (!res.status || (res.status < 200 && res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      toast({
        title: 'メモを登録しました。',
        status: 'success',
        isClosable: true,
      });
    }
    catch (error) {
      console.error('Error creating credos:', error);
      toast({
        title: 'メモの登録に失敗しました。',
        status: 'error',
        isClosable: true,
      });
    }
    finally {
      setIsLoading(false);
      setMemo('');
    }
  }
  
  return (
    <Center>
      <Box w={["100%", "90%", "80%", "70%", "60%"]} mt={["50px", "100px", "150px", "200px"]}>
        <Select
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder='カテゴリを選択して下さい。'
        >
          {categories.length > 0 && categories.map((item, index) => {
            return <option value={item.id} key={index}>{item.name}</option>;
          })}
        </Select>
        <Input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="追加したいメモを入力" 
        />
        <Center>
          <Button mt="6px" onClick={fetchCreateMemo} isLoading={isLoading} disabled={!memo || !category_id}>送信</Button>
        </Center>
      </Box>
    </Center>
   );
 }