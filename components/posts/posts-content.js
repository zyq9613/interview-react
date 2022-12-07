/* eslint-disable react/no-children-prop */
import { Box, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const dark = dynamic(() => import('react-syntax-highlighter/dist/esm/styles/prism'), { ssr: false });
function PostsContent(props) {
  const { content } = props;
  const customRenderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  return (
    <Box bg="#fff" p={8}>
      <ReactMarkdown components={customRenderers} children={content} />,
    </Box>
  );
}

export default PostsContent;
