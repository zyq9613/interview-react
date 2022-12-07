import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import Classes from './Header.module.scss';
import { useTranslation } from 'next-i18next';
import LocaleSwitcher from './LocaleSwitcher';
function Header() {
  const { t } = useTranslation('head');
  return (
    <Box w="full" bg="#264653">
      <Flex m="auto" maxW={960} h={90} align="center" justify="space-between">
        <Link href="/">
          <a>
            <Text fontSize="3xl" fontWeight="900" color="#fff">
              {t('nestBlog')}
            </Text>
          </a>
        </Link>

        <Flex align="center">
          <nav>
            <Flex>
              <Link href="/posts">
                <span className={`${Classes.link} ${Classes.active}`}>{t('allPost')}</span>
              </Link>
              {/* <Link href="/">
                <span className={Classes.link}>我的收藏</span>
              </Link> */}
            </Flex>
          </nav>
          <LocaleSwitcher />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
