import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
const postsDir = path.join(process.cwd(), 'posts');
// 获取post路径
export function getPostPath() {
  return fs.readdirSync(postsDir);
}
// 获取单个post数据
export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 解构md文件数据
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

// 获取所有的post文件
export function getAllPosts() {
  const postFiles = getPostPath();
  // 将获取的所有的文件内容映射到数组
  const allPosts = postFiles.map((post) => {
    return getPostData(post);
  });
  // 排序
  const sortAllPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
  return sortAllPosts;
}

// 获取精选文章
export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
