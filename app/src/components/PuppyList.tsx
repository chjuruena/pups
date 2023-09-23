import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Spacer,
} from '@chakra-ui/react';
// import PuppyDetailsDrawer from './PuppyDetailsDrawer';

const PuppyDetailsDrawer = ({ isOpen, onClose, puppy }) => {
  if (!puppy) {
    return null;
  }
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Puppy Details</DrawerHeader>
        <DrawerBody>
          <p>Name: {puppy.name}</p>
          <p>Breed: {puppy.breed}</p>
          <p>Age: {puppy.age}</p>
          <p>Description: {puppy.description}</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const PuppyList = () => {
  const [puppies, setPuppies] = useState([]);
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const apiUrl = 'https://run.mocky.io/v3/d668fcb2-b4a2-484f-8c31-2c2f74f8fa21';

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setPuppies(response.data);
        console.log(response.data);
        console.log(puppies);
      })
      .catch((error) => {
        console.error('Error fetching puppies:', error);
      });
  }, []);

  const handlePuppyClick = (puppy) => {
    setSelectedPuppy(puppy);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    //   setSelectedPuppy(null);
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Flex>
        {puppies.map((puppy) => (
          <>
            {/* //   <Box key={puppy.id} borderWidth="1px" borderRadius="lg" p="4" m="2" cursor="pointer" onClick={() => handlePuppyClick(puppy)}>
        //     <p>Name: {puppy.name}</p>
        //     <p>Breed: {puppy.breed}</p>
        //     <p>Age: {puppy.age}</p>
        //     <Image boxSize='200px' objectFit='cover' src={puppy.photoUrl} alt='pup' />

        //   </Box> */}

            <Box>
              <Card
                maxW="sm"
                key={puppy.id}
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                m="2"
                cursor="pointer"
                onClick={() => handlePuppyClick(puppy)}
              >
                <CardBody>
                  <Image src={puppy.photoUrl} alt="pup" borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{puppy.name} </Heading>
                    <Text>Breed: {puppy.breed}</Text>
                    <Text>Age: {puppy.age}</Text>
                    <Text>Traits: {puppy.traits}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      $450
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Buy now
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Box>
            <Spacer />
          </>
        ))}
      </Flex>

      <PuppyDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        puppy={selectedPuppy}
      />
    </div>
  );
};
