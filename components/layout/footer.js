import { Box, Flex, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box h={14} bg="gray.800" w="full">
      <Flex justifyContent="space-between" h="full" alignItems="center" maxW={960} m="auto">
        <Text color="#fff" fontSize="xl">
          NEXTBlog
        </Text>
        <Text color="#fff" fontSize="xl">
          power By NextJS
        </Text>
      </Flex>
    </Box>
  );
}
export default Footer;
