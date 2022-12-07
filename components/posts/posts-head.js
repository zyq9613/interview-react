import Image from 'next/image';
import { Box, Flex, Text, Divider } from '@chakra-ui/react';
function PostsHead(props) {
  const { auth, date, title, src } = props;
  return (
    <Box>
      <Image
        alt="/images/homePage/2.jpg"
        src={`/images/homePage/${src}`}
        width={300}
        height={100}
        layout="responsive"
      ></Image>
      <Flex direction="column" p={4} bg="#fff">
        <Text fontSize="2xl" fontWeight={500} mb={3}>
          {title}
        </Text>
        <Flex justify="space-between" color="gray.500">
          <Text>作者：{auth}</Text>
          <Text>发布日期：{date}</Text>
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
}

export default PostsHead;
