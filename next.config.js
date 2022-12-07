/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);
const nextConfig = {
  reactStrictMode: false,
  i18n,
};

module.exports = withTM(nextConfig);
