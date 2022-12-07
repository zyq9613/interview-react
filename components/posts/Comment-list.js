import { Box, Flex, Avatar, Text, Divider, Center, Spinner, Skeleton, Stack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { TbLoader, TbMoodEmpty } from 'react-icons/tb';
import { useTranslation } from 'next-i18next';

function CommentList(props) {
  const { t } = useTranslation('post');
  const { commentData, isLoading } = props;
  const { data } = commentData;
  console.log(isLoading);

  // if (isLoading) {
  //   return <Spinner></Spinner>;
  // }
  return (
    <Stack padding={4} spacing={1}>
      <Skeleton isLoaded={!isLoading}>
        {!data || data.length == 0 ? (
          <Flex flexDirection="column" alignItems="center" pt={10}>
            <TbMoodEmpty fontSize={200}></TbMoodEmpty>
            <Text>{t('comment')}</Text>
          </Flex>
        ) : (
          data.map((comment) => (
            <Box key={comment.createTime} mt={4}>
              <Flex justify="space-between" align="center">
                <Flex align="center">
                  <Avatar size="sm" name="Dan Abrahmov" mr="4" src="https://bit.ly/dan-abramov" />
                  <Text>Zyq</Text>
                </Flex>
                <Text color="gray.400">{comment.createTime}</Text>
              </Flex>
              <Box mt={4} mb={4}>
                <Text color="gray.800">{comment.comment}</Text>
              </Box>
              <Divider />
            </Box>
          ))
        )}
      </Skeleton>
    </Stack>
  );
}

export default CommentList;
