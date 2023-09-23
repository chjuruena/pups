import React, { useState } from 'react';
import { Input, Textarea, Button, FormControl, FormLabel } from "@chakra-ui/react";
import axios from 'axios';
import { AdoptionService } from '../service/AdoptionService'
    
export const AdoptionForm = ({ onClose, puppy }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleAdoption = () => {
    // You can add your adoption form submission logic here
    // For this example, let's just display the submitted data
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

      //
      saveAdoptionDetails(adoptionDetails)
    // Close the adoption form
    onClose();
  };

  const saveAdoptionDetails = async (adoptionDetails) => {
    try {
      const response = await axios.post('http://localhost:3000/adopters', adoptionDetails);
  
      if (response.status === 201) {
        console.log('Adoption details saved successfully.');
        return true;
      } else {
        console.error('Failed to save adoption details.');
        return false;
      }
    } catch (error) {
      console.error('Error saving adoption details:', error);
      return false;
    }
  };

  // Inside your component

    const handleAdoptionSubmit = async () => {
        try {
        const response = await AdoptionService.submitAdoption(adoptionDetails);
        console.log('Adoption request submitted successfully:', response);
        // Handle success, e.g., show a confirmation message
        } catch (error) {
        console.error('Failed to submit adoption request:', error);
        // Handle failure, e.g., show an error message to the user
        }
    };

  return (
    <div>
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

      <Button mt={4} onClick={handleAdoption}>
        Initiate Adoption
      </Button>
    </div>
  );
};

// export default AdoptionForm;
