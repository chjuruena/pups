import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Puppy {
  name: string;
  breed: string;
  age: number;
  description: string;
  // Add more properties as needed
}

interface PuppyProfileProps {
  puppy: Puppy;
}

export const PuppyProfile: React.FC<PuppyProfileProps> = ({ puppy }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Text>Name: {puppy.name}</Text>
      <Text>Breed: {puppy.breed}</Text>
      <Text>Age: {puppy.age}</Text>
      <Text>Description: {puppy.description}</Text>
      {/* Add more details here */}
    </Box>
  );
};

// export default PuppyProfile;
