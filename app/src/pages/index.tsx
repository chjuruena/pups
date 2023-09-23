import React from 'react';
import { Flex } from '@chakra-ui/react';
// import { PuppyList } from '@/components/PuppyList';
import { PuppyHome } from '@/components/PuppyHome';

const IndexPage: React.FC = (props) => {
  return (
    <>
      <Flex w="100%" direction="column">
        <PuppyHome />
      </Flex>
      ;
    </>
  );
};

export default IndexPage;
