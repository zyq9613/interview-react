import { Box, Grid, GridItem, Center } from '@chakra-ui/react';
import Link from 'next/link';
import PostItem from './PostItem';
function PostCard(props) {
  const { posts, title } = props;
  console.log(posts);
  return (
    <Box maxW={960} m="20px auto" pb={20}>
      <Center fontSize="3xl">{title}</Center>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4}>
        {posts.map((post) => (
          <GridItem key={post.slug}>
            <Link href={`/posts/${post.slug}`} passHref legacyBehavior>
              <a>
                <PostItem post={post}></PostItem>
              </a>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default PostCard;
