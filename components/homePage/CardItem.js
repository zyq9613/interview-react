import { Grid, GridItem, Flex, Text, Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
function CardItem(props) {
  const { t } = useTranslation('home');
  const { data } = props;
  return (
    <Grid maxW={960} width="full" m="auto" templateColumns="repeat(11, 1fr)" gap={2}>
      <GridItem colSpan={3} borderRadius={10} w="100%" h="100" boxShadow="base" bg="#fff" p={3}>
        <Flex h="full" justify="space-around">
          <Flex h="full" direction="column" align="center" justify="center">
            <Text>{t('pageWidth')}</Text>
            <Skeleton height="40px" isLoaded={data.pageWidth}>
              <Text mt={3} fontSize="2xl">
                {data.pageWidth}
              </Text>
            </Skeleton>
          </Flex>
          <Flex h="full" direction="column" align="center" justify="center">
            <Text>{t('pageHeight')}</Text>
            <Skeleton height="40px" isLoaded={data.pageHeight}>
              <Text mt={3} fontSize="2xl">
                {data.pageHeight}
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem colSpan={3} borderRadius={10} w="100%" h="100" boxShadow="base" bg="#fff" p={3}>
        <Flex h="full" justify="space-around">
          <Flex h="full" direction="column" align="center" justify="center">
            <Text>{t('mousePosX')}</Text>
            <Skeleton height="40px" isLoaded={data.mousePosition.x || data.mousePosition.x >= 0}>
              <Text mt={3} fontSize="2xl">
                {data.mousePosition.x}
              </Text>
            </Skeleton>
          </Flex>
          <Flex h="full" direction="column" align="center" justify="center">
            <Text>{t('mousePosY')}</Text>
            <Skeleton height="40px" isLoaded={data.mousePosition.y}>
              <Text mt={3} fontSize="2xl">
                {data.mousePosition.y}
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem colSpan={3} borderRadius={10} w="100%" h="100" boxShadow="base" bg="#fff" p={3}>
        <Flex h="full" direction="column" align="center" justify="center">
          <Text>{t('currentDate')}</Text>
          <Skeleton height="40px" isLoaded={data.currentDate}>
            <Text mt={3} fontSize="2xl">
              {data.currentDate}
            </Text>
          </Skeleton>
        </Flex>
      </GridItem>

      <GridItem colSpan={2} borderRadius={10} w="100%" h="100" boxShadow="base" bg="#fff" p={3}>
        <Flex h="full" direction="column" align="center" justify="center">
          <Text>{t('IP')}</Text>
          <Skeleton height="40px" isLoaded={data.IP}>
            <Text mt={3} fontSize="2xl">
              {data.IP}
            </Text>
          </Skeleton>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default CardItem;
