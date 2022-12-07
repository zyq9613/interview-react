import PostsHead from '../../components/posts/posts-head';
import PostsContent from '../../components/posts/posts-content';
import Comment from '../../components/posts/Comment';
import { Box } from '@chakra-ui/react';
import { getPostData, getPostPath } from '../../utils/posts';
import { NextSeo } from 'next-seo';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
function PostDetialsPage(props) {
  const { auth, date, title, src, content, slug, description } = props.postData;
  const openGraph = {
    publishedTime: date,
    authors: auth,
  };
  console.log(description);
  return (
    <>
      <Box maxW={960} m="auto">
        <PostsHead auth={auth} date={date} src={src} title={title}></PostsHead>
        <PostsContent content={content}></PostsContent>
        <Comment postId={slug}></Comment>
      </Box>
      <NextSeo
        title={title}
        defaultTitle={title}
        titleTemplate={title}
        description={description}
        openGraph={openGraph}
      ></NextSeo>
    </>
  );
}
export async function getStaticProps({ locale, params }) {
  console.log(params);
  const { postId } = params;
  const postData = getPostData(postId);
  return {
    props: {
      postData: postData,
      ...(await serverSideTranslations(locale, ['home', 'post', 'head'])),
    },
    revalidate: 600,
  };
}

export function getStaticPaths({ locale }) {
  const postsPaths = getPostPath();
  const postIds = postsPaths.map((postId) => postId.replace(/\.md$/, ''));
  return {
    paths: postIds.map((postId) => ({ params: { postId: postId }, locale: locale })),
    fallback: 'blocking',
  };
}
export default PostDetialsPage;
