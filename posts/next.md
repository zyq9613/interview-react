---
title: '一文了解 NextJS 并对性能优化做出最佳实践'
date: '10 月 27 日'
auth: 'Zyq'
isFeatured: true
src: '2.jpg'
description: '一文了解 NextJS 并对性能优化做出最佳实践'
---

## 引言

从本文中，我将从是什么，为什么，怎么做来为大家阐述 NextJS 以及如何优化 NextJS 应用体验。

### 一、NextJS 是什么

NextJS 是一款基于 React 进行 web 应用开发的框架，它以极快的应用体验而闻名，内置 Sass、Less、ES 等特性，开箱即用。SSR 只是 NextJS 的一种场景而已，它拥有 4 种渲染模式，我们需要为自己的应用选择正确的渲染模式：

Client Side Rendering (CSR)
客户端渲染，往往是一个 SPA(单页面应用)，HTML 文件仅包含 JS\CSS 资源，不涉及页面内容，页面内容需要浏览器解析 JS 后二次渲染。
Static Site Generation (SSG)
静态页面生成，对于不需要频繁更新的静态页面内容，适合 SSR，不依赖服务端。
Server Side Rendering (SSR)
服务端渲染，对于需要频繁更新的静态页面内容，更适合使用 SSR，依赖服务端。
IncreIncremental Site Rendering (ISR)
增量静态生成，基于页面内容的缓存机制，仅对未缓存过的静态页面进行生成，依赖服务端。
SSG / ISR 都是非常适合博客类应用的，区别在于 SSG 是构建时生成，效率较低，ISR 是基于已有的缓存按需生成，效率更高。

## 二、为什么选 NextJS

### 优点:

1. 首屏加载速度快
   我们的内嵌场景比较丰富，因此比较追求页面的一个首屏体验，NextJS 的产物类似 MPA（多页面应用），在请求页面时会对当前页面的资源进行按需加载,而不是去加载整个应用, 相对于 SPA 而言，可以实现更为极致的用户体验。
2. SEO 优化好
   SSR \ SSG \ ISR 支持页面内容预加载，提升了搜索引擎的友好性。
3. 内置特性易用且极致
   NextJS 内置 getStaticProps、getServerSideProps、next/image、next/link、next/script 等特性，充分利用该框架的这些特性，为你的用户提供更高层次的体验，这些内容后文会细讲。

### 缺点：

1. 页面响应相对于 SPA 而言更慢
   由于页面资源分页面按需加载，每次路由发生变化都需要加载新的资源，优化不够好的话，会导致页面卡顿。
2. 开发体验不够友好
   开发环境下 NextJS 根据当前页面按需进行资源实时构建，影响开发及调试体验

## 如何将 NextJS 应用体验提升到极致

作为一名开发者，我们追求的不应该是应用能用就好，而是好用，那么如何评价我们的应用是否好用呢？

- 最直接的方案当然是通过收集用户反馈来评判
- 从开发层面，最直观的就是通过 performance 与 lighthouse 来评判
