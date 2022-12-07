import Header from './layout/Header';
import { DefaultSeo } from 'next-seo';
import { Box } from '@chakra-ui/react';
import SeoConfig from '../next-seo.config';
function Layout({ children }) {
  return (
    <Box flexDirection="column" justifyContent="space-between">
      <Header></Header>
      <main>{children}</main>
      <DefaultSeo {...SeoConfig}></DefaultSeo>
    </Box>
  );
}

export default Layout;
