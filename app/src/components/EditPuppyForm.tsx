import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Stack,
  Button,
} from '@chakra-ui/react';

export const EditPuppyForm = ({ puppyData, onSave }) => {
  // export const EditPuppyForm = ({ puppyData }) => {
  // Initialize state for editing fields
  const [name, setName] = useState(puppyData.name);
  const [age, setAge] = useState(puppyData.age);
  const [gender, setGender] = useState(puppyData.gender);
  const [isVaccinated, setIsVaccinated] = useState(puppyData.isVaccinated);
  const [isNeutered, setIsNeutered] = useState(puppyData.isNeutered);
  const [size, setSize] = useState(puppyData.size);

  const handleSave = () => {
    // Prepare updated puppy data
    const updatedPuppy = {
      ...puppyData,
      name,
      age,
      gender,
      isVaccinated,
      isNeutered,
      size,
    };

    console.log(updatedPuppy)
    // Call onSave function to save the changes
    onSave(updatedPuppy);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Puppy Name"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Age</FormLabel>
        <Input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Puppy Age"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Gender</FormLabel>
        <Input
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Puppy Gender"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Is Vaccinated</FormLabel>
        <Checkbox
          isChecked={isVaccinated}
          onChange={(e) => setIsVaccinated(e.target.checked)}
        >
          Vaccinated
        </Checkbox>
      </FormControl>

      <FormControl>
        <FormLabel>Is Neutered</FormLabel>
        <Checkbox
          isChecked={isNeutered}
          onChange={(e) => setIsNeutered(e.target.checked)}
        >
          Neutered
        </Checkbox>
      </FormControl>

      <FormControl>
        <FormLabel>Size</FormLabel>
        <Input
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Puppy Size"
        />
      </FormControl>

      <Stack spacing={4} mt={4}>
        <Button colorScheme="teal" onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

