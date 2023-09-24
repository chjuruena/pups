import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
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
  Input,
  //carousel
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';

//carousel
import Slider from 'react-slick';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

//service
import PuppyService from '@/service/PuppyService';

import { AdoptionForm } from './AdoptionForm';
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Carousel = ({ puppy }) => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  // These are the images used in the slide

  return (
    <Box
      position={'relative'}
      height={'600px'}
      width={'full'}
      overflow={'hidden'}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {puppy.cards.map((url, index) => (
          <Box
            key={index}
            height={'6xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
  );
};

const PuppyDetailsDrawer = ({
  isOpen,
  onClose,
  puppy,
  isAdoptionFormOpenForm,
  isPuppyInfoOpen,
}) => {
  const [isAdoptionFormOpen, setAdoptionFormOpen] = useState(false);

  if (!puppy) {
    return null;
  }

  const handleAdoptClick = () => {
    setAdoptionFormOpen(true);
    console.log(isAdoptionFormOpen);
  };

  const handleCloseAdoptionForm = () => {
    setAdoptionFormOpen(false);
  };

  return (
    <Drawer
      closeOnOverlayClick={false}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={'xl'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Puppy Details</DrawerHeader>
        <DrawerBody>
          {/* Display the Adoption Form when isAdoptionFormOpen is true */}
          {isAdoptionFormOpen ? (
            <AdoptionForm onClose={handleCloseAdoptionForm} puppy={puppy} />
          ) : (
            <>
              <Box>
                {<Carousel puppy={puppy} />}

                <p>Name: {puppy.name}</p>
                <p>Breed: {puppy.breed}</p>
                <p>Age: {puppy.age}</p>
                <p>Gender: {puppy.gender}</p>
                <p>Size: {puppy.size}</p>
                <p>Is Vaccinated: {puppy.isVaccinated ? 'Yes' : 'No'}</p>
                <p>Is Neutered/Spayed: {puppy.isNeutered ? 'Yes' : 'No'}</p>
                <p>Personality Traits: {puppy.traits.join(', ')}</p>
                <p>Personality Description: {puppy.personalityTraits}</p>
                <p>Vaccination Records: {puppy.vaccinationRecords}</p>
                <p>Spaying/Neutering Status: {puppy.spayingNeuteringStatus}</p>
                <p>Special Needs: {puppy.specialNeeds}</p>
                <p>Notes: {puppy.notes}</p>
                <Button mt={4} colorScheme="green" onClick={handleAdoptClick}>
                  Adopt now
                </Button>
              </Box>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const PuppyList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [puppies, setPuppies] = useState([]);
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const apiUrlPuppies = 'http://localhost:3001/puppies';

  const [isAdoptionFormOpen, setAdoptionFormOpen] = useState(false);
  const [isPuppyInfoOpen, setPuppyInfoOpen] = useState(true);

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        // Fetch the list of puppies from your backend API
        const response = await PuppyService.fetchPuppies();
        console.log('Fetch all puppies:', response);
        setPuppies(response);
        // Handle success, e.g., show a confirmation message
      } catch (error) {
        console.error('Failed to fetch all puppies:', error);
        // Handle failure, e.g., show an error message to the user
      }
    };

    fetchPuppies();
    if (!isDrawerOpen) {
      console.log('drawer is closed');
      setAdoptionFormOpen(false);
    }
  }, [isDrawerOpen]); // Empty dependency array to run the effect only once

  const handlePuppyClick = (puppy) => {
    setSelectedPuppy(puppy);
    setIsDrawerOpen(true);
    setPuppyInfoOpen(true);
  };

  const closeDrawer = () => {
    //   setSelectedPuppy(null);
    setAdoptionFormOpen(false);
    setPuppyInfoOpen(true);
    setSelectedPuppy(null);
    setIsDrawerOpen(false);

    console.log('close drawer');
  };
  const handleAdoptClick = () => {
    setAdoptionFormOpen(true);
    setPuppyInfoOpen(false);
  };

  return (
    <div>
      <Input
        variant="outline"
        type="text"
        placeholder="Search for breed, age, name, trait, gender, or size"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {puppies &&
          puppies
            .filter((puppy) => {
              const searchLowerCase = searchQuery.toLowerCase();
              const puppyData = `${puppy.breed} ${puppy.age} ${puppy.name} ${
                puppy.traits
              } ${puppy.gender} ${puppy.size}   ${puppy.isVaccinated} ${
                puppy.isNeutered
              } ${puppy.traits.join(',')} ${puppy.vaccinationRecords} ${
                puppy.spayingNeuteringStatus
              } ${puppy.specialNeeds} ${puppy.notes}
                `.toLowerCase();
              return puppyData.includes(searchLowerCase);
            })
            .map((puppy) => (
              <Box key={puppy.id}>
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
                        Certified good{' '}
                        {puppy.gender == 'female' ? 'girl' : 'boy'}!
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        onClick={handleAdoptClick}
                        variant="solid"
                        colorScheme="blue"
                      >
                        Adopt now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
            ))}
      </Grid>

      <PuppyDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        puppy={selectedPuppy}
        isAdoptionFormOpenForm={isAdoptionFormOpen}
        isPuppyInfoOpen={isPuppyInfoOpen}
      />
    </div>
  );
};
