import { Center, Fade, Text } from '@chakra-ui/react';
import Class from './loading.module.scss';
function Loading(props) {
  const { isPageLoading } = props;
  console.log(isPageLoading);
  if (isPageLoading)
    return (
      <Center position="fixed" zIndex="1000" w="100%" h="100%" bg="#0dc5c1">
        <Fade in={isPageLoading}>
          <div className={Class.loader}>Loading...</div>
          <Text fontSize="2xl" color="#fff">
            正在加载中，请稍候
          </Text>
        </Fade>
      </Center>
    );
}

export default Loading;
