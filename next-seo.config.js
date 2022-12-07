const SeoConfig = {
  title: 'Next Blog',
  defaultTitle: 'Next Blog',
  titleTemplate: 'Next Blog',
  description: 'This is a simple blog made with Nextjs',
  robotsProps: {
    noarchive: false, //不要显示缓存（付费文章之类的应该设置为 true）
    nosnippet: false,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
    notranslate: false,
    noimageindex: false,
  },
  disableGooglebot: false,
};

export default SeoConfig;
