import { Menu, MenuList, IconButton, MenuButton, MenuItem } from '@chakra-ui/react';
import { ImCheckmark } from 'react-icons/im';

import { IoLanguage } from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from 'next/link';

function LocaleSwitcher() {
  const router = useRouter();
  console.log(router);
  const { locale, locales } = router;
  return (
    <Menu>
      <MenuButton fontSize="20px" aria-label="swich lang" size="sm" as={IconButton} icon={<IoLanguage />}></MenuButton>

      <MenuList>
        {locales.map((item, index) => {
          const { pathname, query, asPath } = router;
          return (
            <Link key={index} href={{ pathname, query }} as={asPath} locale={item}>
              <a>
                <MenuItem value={item} justifyContent="space-between">
                  <span>{item == 'zh-CN' ? '简体中文' : 'English'}</span>
                  {item == locale ? <ImCheckmark></ImCheckmark> : null}
                </MenuItem>
              </a>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default LocaleSwitcher;
