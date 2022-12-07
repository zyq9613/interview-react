---
title: '利用 next-i18next 对网站进行国际化支持'
date: '11 月 27 日'
auth: 'Zyq'
isFeatured: true
src: '3.jpg'
description: '利用 next-i18next 对网站进行国际化支持'
---

## 前言

next.js 作为一个轻量级和产品级的 react.js 变体，确实比 react.js 本身要快速许多，并且他也能够继承 react.js 的插件。但是我在对博客进行 i18n 方案选择的时候，在 next.js 的原生插件和从 react.js 继承而来的插件中做了斟酌，最后选择了 next-i18next。然而，我在学习 next-i18next 的过程中，发现文档和互联网上的主流教程写的非常不明确，所以我撰写本文来明确一下 next-i18next 的正确使用方法。

### 配置环境

#### 安装

和所有的 react.js 或者 next.js 插件一样，直接通过 npm 进行安装就可以了

```js
npm install next-i18next --save
```

#### 配置

注意，接下来的步骤缺一不可。
首先，需要在 ./ 目录下创建一个 next-i18next 的配置文件，本文中就将其命名为 next-i18next.config.js，内容如下：

```js
// next-i18next.config.js
module.exports = {
    i18n: {
        // providing the locales supported by your application
        locales: [...],
        // default locale used when the non-locale paths are visited
        defaultLocale: ...,
    },
    defaultNS: [],
    debug: false,
    ns: [...], // the namespaces needs to be listed here, to make sure they got preloaded
}
```

我个人非常不建议将 debug 设成 true，不然在 npm run dev 的时候控制台要多出一堆 debug 的信息；另外，defaultNS 可以设置为空。

然后，在 ./next.config.js 文件中，将其 export 就好了：

```js
// next.config.js
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
};
```

### 配置 next-i18next

之前的配置文件中省略号的东西还是要靠自己配置，我们举个例子，假如这么配置：

```js
// next-i18next.config.js
module.exports = {
  i18n: {
    locales: ['zh-CN', 'en', 'ja'],
    defaultLocale: 'zh-CN',
  },
  defaultNS: [],
  debug: false,
  ns: ['header', 'main', 'footer'],
};
```

这结合前面的注释就很容易看懂了，这么配置的话需要对 header、main 和 footer 三个名字空间的 zh-CN、en 和 ja 三个语言都应当进行配置。那么配置的文件应该放在哪里呢？答案是放在 ./public/locales 下方，那么整个 ./public/locales 的目录结构如下：

```js
.
├── zh-CN
│   ├── common.json
│   ├── header.json
│   ├── main.json
│   └── footer.json
├── en
│   ├── common.json
│   ├── header.json
│   ├── main.json
│   └── footer.json
└── ja
    ├── common.json
    ├── header.json
    ├── main.json
    └── footer.json
```

其中 common.json 顾名思义，对全局所需的待 i18n 项目提供转；而每个名字空间（namespace, NS）对应的 json 文件各自提供了不同部分（尤其是组件，component）待 i18n 的项目的转换方案，应当被按需使用，即在 ./components/header.js 中只使用 ./public/locales/[custom-locale]/header.json，我会在后文讲述具体如何调用。

这些 json 的内容为一个个 "id" - i18n 方案的键值对，这么说可能不好理解，举个例子：

```json
// ./public/locales/zh-CN/main.json
{
    "tsinghua-university-library": "清华大学图书馆",
    "genshin-impact": "原神",
    "taylor-swift": "泰勒·斯威夫特"
}

// ./public/locales/en/main.json
{
    "tsinghua-university-library": "Tsinghua University Library",
    "genshin-impact": "Genshin Impact",
    "taylor-swift": "Taylor Swift"
}

// ./public/locales/ja/main.json
{
    "tsinghua-university-library": "清華大学図書館",
    "genshin-impact": "原神",
    "taylor-swift": "テイラー・スウィフト"
}
```

### 调用 locale

调用过程分为两个部分：
在组件中使用 useTranslation；
在 ./pages/index.js 中配置 server 端的 next-i18next；

#### 在组件中使用 useTranslation

这里我们以 main.js 和 main.json 举例：

```js
// ./components/main.js
import { useTranslation } from 'next-i18next';

export default function Main() {
  const { t } = useTranslation('main');
  return (
    <p>
      我在{t('tsinghua-university-library')}听着{t('taylor-swift')}的歌玩{t('genshin-impact')}。
    </p>
  );
}
```

其余的组件亦然。

#### server 端配置

我们知道，在 next.js 应用中最核心的事情就是传递 staticProps。我们配置 server 端的 next-i18next 的目的就是将已完成的 i18n 项目传递给 staticProps。

```js
// ./pages/index.js
import Head from 'next/head';
import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js i18n Demo</title>
      </Head>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['header', 'main', 'footer'])),
    },
  };
}
```

最后，在 ./pages/\_app.js 中配置：

```js
// ./pages/_app.js
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
```

这样就大功告成了！读者们也可以根据我提供的整个流程自己试一试，如有不当欢迎指正！
