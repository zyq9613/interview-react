import { Box, Text, Flex, useToast, FormControl, Input, Button } from '@chakra-ui/react';
import CommentList from './Comment-list';
import { useState, useEffect } from 'react';

function Comment(props) {
  const toast = useToast();
  const { postId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isGet, setisGet] = useState(false);
  const [comment, setComment] = useState('');
  const [isButLoading, setIsButLoading] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const url = `/api/comments/${postId}`;
  // 组件加载时获取评论列表
  useEffect(() => {
    getComments();
  }, [isGet]);

  // 获取评论列表
  async function getComments() {
    setIsLoading(true);
    try {
      const responce = await fetch(url);
      const jsonRes = await responce.json();
      setCommentData(jsonRes);
      setIsLoading(() => false);
      console.log('请求完成');
    } catch (error) {
      console.log(error);
    }
  }
  // 处理添加评论
  async function handleAddComment() {
    if (!comment || comment.trim() === '') {
      toast({
        title: '请输入评论',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const createTime = `${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`;
    setIsButLoading(() => true);

    try {
      let responce = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          comment,
          createTime,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let resJSON = await responce.json();
      console.log(resJSON);
      if (resJSON.code == 'R000') {
        toast({
          title: '添加评论成功',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setComment('');
        setIsButLoading(false);
        //  添加评论成功后获取最新评论列表
        setisGet(createTime);
      }
    } catch (error) {
      console.log('Request Failed', error);
    }
    setIsLoading(false);
  }
  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  return (
    <Box maxW={960} m="10px auto" p={4} bg="#fff">
      <FormControl>
        <Flex>
          <Input value={comment} onChange={handleCommentChange} placeholder="请理性发言" type="text"></Input>
          <Button isLoading={isButLoading} onClick={handleAddComment} colorScheme="teal" ml={3}>
            发送
          </Button>
        </Flex>
      </FormControl>
      <Box>
        <CommentList isLoading={isLoading} commentData={commentData}></CommentList>
      </Box>
    </Box>
  );
}

export default Comment;
