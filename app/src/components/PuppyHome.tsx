'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { PuppyList } from './PuppyList';
import { Link } from 'react-router-dom';
import { Nav } from './Nav';

interface Props {
  children: React.ReactNode;
}

const links = ['Admin'];

export const PuppyHome: React.FC = () => {
  return (
    <>
      <Box>
        <Nav links={links} />
      </Box>

      <Box p={4}>{<PuppyList />}</Box>
    </>
  );
};
