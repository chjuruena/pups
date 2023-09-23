import React, { useState } from 'react';
import { Input, Select, Button } from '@chakra-ui/react';

interface FilterOptions {
  breed: string;
  age: string;
  size: string;
  gender: string;
}

interface PuppyFilterProps {
  filterPuppies: (filters: FilterOptions) => void;
}

export const PuppyFilter: React.FC<PuppyFilterProps> = ({ filterPuppies }) => {
  const [breedFilter, setBreedFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const handleFilter = () => {
    const filters: FilterOptions = {
      breed: breedFilter,
      age: ageFilter,
      size: sizeFilter,
      gender: genderFilter,
    };
    filterPuppies(filters);
  };

  return (
    <div>
      <Input
        placeholder="Breed"
        value={breedFilter}
        onChange={(e) => setBreedFilter(e.target.value)}
      />
      {/* Other filter inputs */}
      <Button onClick={handleFilter}>Filter</Button>
    </div>
  );
};

// export default PuppyFilter;
