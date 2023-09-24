import React from 'react';
import { Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {PuppyHome} from '@/components/PuppyHome';
// import { AdminPanel } from '@/components/AdminPanel';
import  Admin  from './admin';
const IndexPage: React.FC = () => {
  return (
    
    <Router>
      <Flex w="100%" direction="column">
        <Routes>
          <Route path="/" element={<PuppyHome/>} />
          <Route path="/puppies" element={<PuppyHome/>} />
          <Route path="/admin" element={<Admin/>} />
          {/* Define other routes here */}
        </Routes>
      </Flex>
    </Router>
  );
};

export default IndexPage;
