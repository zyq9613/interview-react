import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme';
import { RecoilRoot } from 'recoil';
import Layout from '../components/Layout.js';
import { appWithTranslation } from 'next-i18next';

import Loading from '../components/Loading.js';
import { useRouter } from 'next/router.js';
import { useEffect, useState } from 'react';
function MyApp({ Component, pageProps }) {
  const myTheme = extendTheme(theme, {
    styles: {
      global: {
        'html, body': {
          color: 'gray.600',
          lineHeight: 'tall',
          minHeight: '100%',
          height: '100%',
        },
        main: {
          minHeight: 'calc(100% - 150px)',
        },
        h2: {
          fontSize: '3xl',
          lineHeight: 'taller',
        },
        h3: {
          fontSize: 'xl',
          lineHeight: 'tall',
        },
        ol: {
          listStyle: 'none',
          paddingLeft: '4',
        },
        ul: {
          listStyle: 'none',
          paddingLeft: '4',
        },
        li: {
          lineHeight: 'taller',
          marginBottom: '3',
        },
      },
    },
    fonts: {
      heading: ' -apple-system, system-ui, sans-serif',
      body: ' -apple-system, system-ui, sans-serif',
    },
  });
  // {
  //
  // },
  //

  const router = useRouter();
  const [isPageLoading, setIsPageloading] = useState(false);

  useEffect(() => {
    const handleChangeStart = (url) => {
      setIsPageloading(true);
    };

    const handleChangeComplete = (url) => {
      setIsPageloading(false);
    };

    router.events.on('routeChangeStart', handleChangeStart);
    router.events.on('routeChangeComplete', handleChangeComplete);
    router.events.on('routeChangeError', handleChangeComplete);

    return function cleanup() {
      router.events.off('routeChangeStart', handleChangeStart);
      router.events.off('routeChangeComplete', handleChangeComplete);
      router.events.off('routeChangeError', handleChangeComplete);
    };
  }, [router]);

  return (
    <RecoilRoot>
      <ChakraProvider theme={myTheme}>
        <Loading isPageLoading={isPageLoading}></Loading>
        <Layout className={isPageLoading ? 'hidden' : ''}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
