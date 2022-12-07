import Introduction from '../components/homePage/Introduction';
import PostCard from '../components/homePage/PostCard';
import { Fragment } from 'react';
import { getFeaturedPosts } from '../utils/posts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
function HomePage(props) {
  const { t } = useTranslation('post');
  return (
    <Fragment>
      <Introduction></Introduction>

      <PostCard title={t('featuredPost')} posts={props.posts}></PostCard>
    </Fragment>
  );
}

export async function getStaticProps({ locale }) {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
      ...(await serverSideTranslations(locale, ['home', 'post', 'head'])),
    },
    revalidate: 86400,
  };
}
export default HomePage;
