import React, { useState } from 'react';
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Box,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Spacer,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';
import { AdoptionService } from '../service/AdoptionService';
import { error } from 'console';

export const AdoptionForm = ({ onClose, puppy, closeDrawer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Inside your component
  const ShowStatus = (stat) => {
    return (
      <Stack>
        <Alert status={stat ? 'success' : 'error'} variant="subtle">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      </Stack>
    );
  };
  const handleAdoptionSubmit = async () => {
    console.log('Adoption Form Submitted:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Message:', message);

    const adoptionDetails = {
      name,
      email,
      phone,
      message,
      // Add other form fields as needed
    };

    try {
      const response = await AdoptionService.submitAdoption(adoptionDetails);
      console.log('Adoption request submitted successfully:', response);
      // Handle success, e.g., show a confirmation message
      <ShowStatus stat={true} />;
      onClose();
    } catch (error) {
      <ShowStatus stat={true} />;

      console.error('Failed to submit adoption request:', error);
      // Handle failure, e.g., show an error message to the user
    }
  };

  return (
    <>
      <Box>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '200px' }}
            src={puppy.photoUrl}
            alt="Puppy"
          />

          <Stack>
            <CardBody>
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

            <CardFooter>
              {/* <Button variant='solid' colorScheme='blue'>
                Buy Latte
            </Button> */}
            </CardFooter>
          </Stack>
        </Card>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>Your Name</FormLabel>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Your Email</FormLabel>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Your Phone</FormLabel>
          <Input
            type="tel"
            placeholder="Your Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Additional Message</FormLabel>
          <Textarea
            placeholder="Write a message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>

        <Button mt={4} colorScheme="green" onClick={handleAdoptionSubmit}>
          Initiate Adoption
        </Button>
        <Spacer />
        <Button mt={4} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

// export default AdoptionForm;
