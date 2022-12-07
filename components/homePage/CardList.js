import { Box, Flex, Stack, Skeleton } from '@chakra-ui/react';
import CardItem from './CardItem';
import { useGetState } from '../../utils/useGetState';
import { useEffect, useState } from 'react';
function CardList() {
  const { width, height } = useGetState().windowSize;
  const { x, y } = useGetState().mousePosition;
  const { currentDate } = useGetState();
  const [ip, setIp] = useState();
  useEffect(() => {
    fetch('/api/ip').then((res) => {
      res.json().then((responce) => {
        setIp(responce.ip);
        console.log(ip);
      });
    });
  }, []);
  const cardData = {
    pageWidth: width,
    pageHeight: height,
    mousePosition: { x, y },
    currentDate: currentDate,
    IP: ip,
  };

  return (
    <Flex pt={5} pb={10} bg="gray.100">
      <CardItem data={cardData}></CardItem>
    </Flex>
  );
}

export default CardList;
