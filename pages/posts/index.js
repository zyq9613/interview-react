import { getAllPosts } from '../../utils/posts';
import { NextSeo } from 'next-seo';
import PostCard from '../../components/homePage/PostCard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
function AllPostsPage(props) {
  const { t } = useTranslation('post');
  return (
    <>
      <PostCard title={t('allPost')} posts={props.allPosts}></PostCard>
      <NextSeo
        title="所有文章"
        defaultTitle="所有文章"
        titleTemplate="所有文章"
        description="一文了解 NextJS 并对性能优化做出最佳实践"
      />
      ;
    </>
  );
}
export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts: allPosts,
      ...(await serverSideTranslations(locale, ['home', 'post', 'head'])),
    },
  };
}
export default AllPostsPage;
