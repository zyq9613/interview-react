import Image from 'next/image';
import { Text, Flex, Box } from '@chakra-ui/react';
import { Fragment } from 'react';

import classes from './PostItem.module.scss';
function PostItem(props) {
  const { title, src, date, auth } = props.post;
  return (
    <Fragment>
      <Image
        className={classes.image}
        src={`/images/homePage/${src}`}
        layout="responsive"
        alt=""
        width={200}
        height={100}
      ></Image>
      <Box bg="#fff" borderRadius="0 0 10px 10px" height={100} p={2} boxShadow="base">
        <Text fontSize="16">{title}</Text>
        <Flex justify="space-between" mt={4} color="gray.400">
          <Text fontSize="14">{date}</Text>
          <Text fontSize="14">{auth}</Text>
        </Flex>
      </Box>
    </Fragment>
  );
}

export default PostItem;
