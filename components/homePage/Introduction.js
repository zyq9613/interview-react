import { Box, Center, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import CardList from './CardList';
import Classes from './Introduction.module.scss';
function Introduction() {
  return (
    <Fragment>
      <Box w="100%" pt={4} pb={4} bg="gray.100">
        <Center>
          <Box>
            <div className={Classes.image}>
              <Image src={'/images/homePage/1.jpeg'} alt="zyq" width={200} height={200} layout="responsive" />
            </div>
          </Box>
        </Center>
        <Center mt={2}>
          <Flex>
            <Text fontSize="3xl" mr={4}>
              Zyq
            </Text>
            <Text fontSize="3xl">26</Text>
          </Flex>
        </Center>
        <Center mt={2}>
          <Text maxW={960} fontSize="2xl" textIndent={40} textAlign="justify">
            五年前端工作经验，有独立大型项目开发经验，参加过大公司旗下创业团队，有丰富的远程工作经验，开朗乐观，善于沟通，学习能力强，对未知有强烈的敬畏和好奇，能够熟练运用
            angular/vue，es6，熟悉 node ，熟悉 webpack/gulp/vite 等项目自动化工具，熟悉 git/Svn
            项目管理工具，可以熟练使用Photoshop，Sketch等设计工具和Axure、Figma等原型设计工具。
          </Text>
        </Center>
      </Box>
      <CardList></CardList>
    </Fragment>
  );
}

export default Introduction;
