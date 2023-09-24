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
  // Initialize state for editing fields
  const [name, setName] = useState(puppyData.name || '');
  const [age, setAge] = useState(puppyData.age || '');
  const [gender, setGender] = useState(puppyData.gender || '');
  const [isVaccinated, setIsVaccinated] = useState(
    puppyData.isVaccinated || false,
  );
  const [isNeutered, setIsNeutered] = useState(puppyData.isNeutered || false);
  const [size, setSize] = useState(puppyData.size || '');
  const [breed, setBreed] = useState(puppyData.breed || '');
  const [traits, setTraits] = useState(puppyData.traits || []);
  const [personalityTraits, setPersonalityTraits] = useState(
    puppyData.personalityTraits || '',
  );
  const [vaccinationRecords, setVaccinationRecords] = useState(
    puppyData.vaccinationRecords || '',
  );
  const [spayingNeuteringStatus, setSpayingNeuteringStatus] = useState(
    puppyData.spayingNeuteringStatus || '',
  );
  const [specialNeeds, setSpecialNeeds] = useState(
    puppyData.specialNeeds || '',
  );
  const [notes, setNotes] = useState(puppyData.notes || '');
  const [photoUrl, setPhotoUrl] = useState(puppyData.photoUrl || '');

  const handleSave = () => {
    // Prepare updated puppy data
    const updatedPuppy = {
      id: puppyData.id,
      name,
      age,
      gender,
      isVaccinated,
      isNeutered,
      size,
      breed,
      traits,
      personalityTraits,
      vaccinationRecords,
      spayingNeuteringStatus,
      specialNeeds,
      notes,
      photoUrl,
    };

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

      <FormControl>
        <FormLabel>Breed</FormLabel>
        <Input
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Puppy Breed"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Traits</FormLabel>
        <Input
          value={traits.join(', ')}
          onChange={(e) => setTraits(e.target.value.split(', '))}
          placeholder="Puppy Traits (comma-separated)"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Personality Traits</FormLabel>
        <Textarea
          value={personalityTraits}
          onChange={(e) => setPersonalityTraits(e.target.value)}
          placeholder="Puppy Personality Traits"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Vaccination Records</FormLabel>
        <Textarea
          value={vaccinationRecords}
          onChange={(e) => setVaccinationRecords(e.target.value)}
          placeholder="Puppy Vaccination Records"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Spaying/Neutering Status</FormLabel>
        <Textarea
          value={spayingNeuteringStatus}
          onChange={(e) => setSpayingNeuteringStatus(e.target.value)}
          placeholder="Puppy Spaying/Neutering Status"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Special Needs</FormLabel>
        <Textarea
          value={specialNeeds}
          onChange={(e) => setSpecialNeeds(e.target.value)}
          placeholder="Puppy Special Needs"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Notes</FormLabel>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Puppy Notes"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Photo URL</FormLabel>
        <Input
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Puppy Photo URL"
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
