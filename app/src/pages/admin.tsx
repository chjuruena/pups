import React, { useState, useEffect,  } from 'react';
import { Button, Box, Table, Thead, Tr, Th, Tbody, Td, Input, IconButton, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } 
from "@chakra-ui/react";

import { CheckIcon, CloseIcon, EditIcon, DeleteIcon} from '@chakra-ui/icons';

import axios from 'axios';
import  PuppyService  from '../service/PuppyService'
import { EditPuppyForm } from '@/components/EditPuppyForm';

const Admin = () => {
    const [allPuppies, setAllPuppies] = useState([]);
    const [editedPuppy, setEditedPuppy] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        
    
        fetchPuppies();
      }, []); // Empty dependency array to run the effect only once
    
  
    const fetchPuppies = async () => {
        try {
          // Fetch the list of puppies from your backend API
          const response = await PuppyService.fetchPuppies();
          console.log('Fetch all puppies:', response);
          setAllPuppies(response);
          // Handle success, e.g., show a confirmation message
        } catch (error) {
          console.error('Failed to fetch all puppies:', error);
          // Handle failure, e.g., show an error message to the user
        }
      };
      const handleEditClick = (puppy) => {
        setIsModalOpen(true);
       onOpen();
      setEditedPuppy(puppy);
    };

    
      const closeEditModal = () => {
        setEditedPuppy(null);
        setIsModalOpen(false);
        onClose();
      };
  
    const handleSaveClick = async (updatedPuppy) => {
        // Update the puppy's data on the backend
        //   axios.put(`/api/puppies/${puppy.id}`, puppy).then(() => {
        //     setEditedPuppy(null);
        //   });
        console.log('Edited puppy',updatedPuppy )


        try {
            const response = await PuppyService.updatePuppy(updatedPuppy.id, updatedPuppy);
            console.log('Edit a puppy:', response);
            // Handle success, e.g., show a confirmation message
            fetchPuppies();
            onClose();

            } catch (error) {
            console.error('Failed to Edit a puppy:', error);
            // Handle failure, e.g., show an error message to the user
        }
    };
  
    const handleDeleteClick = async (puppyId) => {
      // Delete the puppy from the backend
      try {
        const response = await PuppyService.deletePuppy(puppyId);
        console.log('Delete a puppy data:', response);
        // Handle success, e.g., show a confirmation message
        fetchPuppies();

        } catch (error) {
        console.error('Failed to Delete a puppy data:', error);
        // Handle failure, e.g., show an error message to the user
    }

    };
    const onSavePuppy = (updatedPuppy) => {
        console.log('Edited puppy',updatedPuppy )
        // setEditedPuppy(updatedPuppy)
    };
  
    return (
      <Box>
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
                <Td>
                 
                   { puppy.name}
                </Td>
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

        {/* edit modal */}
        <Modal isOpen={isOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Puppy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editedPuppy && (
              <EditPuppyForm
                puppyData={editedPuppy}
                onSave={handleSaveClick}
               
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      </Box>
    );
  };
  
  

export default Admin;
