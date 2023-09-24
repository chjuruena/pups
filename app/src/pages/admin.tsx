import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  TableCaption,
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';

import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

import axios from 'axios';
import PuppyService from '../service/PuppyService';
import { EditPuppyForm } from '@/components/EditPuppyForm';
import { Nav } from '@/components/Nav';
const Admin = () => {
  const [allPuppies, setAllPuppies] = useState([]);
  const [editedPuppy, setEditedPuppy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchPuppies();
  }, []); // Empty dependency array to run the effect only once

  const fetchPuppies = async () => {
    try {
      // Fetch the list of puppies from your backend API
      const response = await PuppyService.fetchPuppies();
      // // console.log('Fetch all puppies:', response);
      setAllPuppies(response);
      // Handle success, e.g., show a confirmation message
    } catch (error) {
      // console.error('Failed to fetch all puppies:', error);
      // Handle failure, e.g., show an error message to the user
    }
  };
  const handleEditClick = (puppy) => {
    setIsModalOpen(true);
    onOpen();
    setEditedPuppy(puppy);
  };

  const handleAddPuppy = () => {
    setIsModalOpen(true);
    onOpen();
    setEditedPuppy({});
  };

  const closeEditModal = () => {
    setEditedPuppy(null);
    setIsModalOpen(false);
    onClose();
  };

  const showToast = (status, description) => {
    // Set the background color based on the status (success or fail)
    const bgColor = status === 'success' ? 'green.400' : 'red.400';

    // Set the icon based on the status (success or fail)
    const icon = status === 'success' ? '✅' : '❌';

    // Show the toast message
    toast({
      title: icon,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top-right',
      variant: 'solid',
      backgroundColor: bgColor,
      color: 'white',
    });
  };

  const handleSaveClick = async (updatedPuppy) => {
    // Update the puppy's data on the backend

    // console.log('Edited puppy', updatedPuppy);
    if (updatedPuppy.id) {
      //edit Puppy
      try {
        const response = await PuppyService.updatePuppy(
          updatedPuppy.id,
          updatedPuppy,
        );
        // console.log('Edit a puppy:', response);
        // Handle success, e.g., show a confirmation message
        showToast('success', 'Puppy successfully edited'); // Show success toast

        fetchPuppies();
        onClose();
      } catch (error) {
        console.error('Failed to Edit a puppy:', error);
        // Handle failure, e.g., show an error message to the user
      }
    } else {
      //add Pupp
      // console.log('Add puppy');
      // console.log('Add puppy');
      // console.log('Add puppy');
      const newPuppy = {
        ...updatedPuppy, // Spread the original object
        id: allPuppies.length + 1, // Update the 'name' property
      };
      // console.log(newPuppy);
      try {
        const response = await PuppyService.createPuppy(newPuppy);
        // console.log('Add a puppy:', response);
        // Handle success, e.g., show a confirmation message
        fetchPuppies();
        onClose();
        showToast('success', 'New puppy successfully added'); // Show success toast
      } catch (error) {
        showToast('fail', 'FAILED adding New puppy');

        console.error('Failed to Add a puppy:', error);
        // Handle failure, e.g., show an error message to the user
      }
    }
  };

  const handleDeleteClick = async (puppyId) => {
    // Delete the puppy from the backend
    try {
      const response = await PuppyService.deletePuppy(puppyId);
      // console.log('Delete a puppy data:', response);
      showToast('success', 'Puppy successfully Delete from records'); // Show success toast

      // Handle success, e.g., show a confirmation message
      fetchPuppies();
    } catch (error) {
      showToast('fail', 'Puppy FAILED to be Deleted from records'); // Show success toast

      console.error('Failed to Delete a puppy data:', error);
      // Handle failure, e.g., show an error message to the user
    }
  };
  const onSavePuppy = (updatedPuppy) => {
    // console.log('Edited puppy', updatedPuppy);
  };

  return (
    <>
      <Nav links={['Puppies']} />
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">
            Admin Dashboard to Add, Edit, and Delete Pups
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button colorScheme="teal" size="lg" onClick={handleAddPuppy}>
            Add puppies
          </Button>
        </ButtonGroup>
      </Flex>
      <Box p={10}>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Breed</Th>
                <Th>Age</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allPuppies.map((puppy) => (
                <Tr key={puppy.id}>
                  <Td>{puppy.name}</Td>
                  <Td>{puppy.breed}</Td>
                  <Td>{puppy.age}</Td>
                  <Td>
                    <>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => handleEditClick(puppy)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(puppy.id)}
                      />
                    </>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* edit modal */}
        <Box>
          <Modal isOpen={isOpen} size={'full'} onClose={closeEditModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Puppy</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditPuppyForm
                  puppyData={editedPuppy}
                  onSave={handleSaveClick}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
