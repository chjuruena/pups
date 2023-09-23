import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

interface AdoptionInfo {
  name: string;
  email: string;
  phone: string;
  puppyId: number;
}

interface AdoptionFormProps {
  puppy: Puppy;
  initiateAdoption: (info: AdoptionInfo) => void;
}

export const AdoptionForm: React.FC<AdoptionFormProps> = ({
  puppy,
  initiateAdoption,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdoption = () => {
    const adoptionInfo: AdoptionInfo = {
      name,
      email,
      phone,
      puppyId: puppy.id,
    };
    initiateAdoption(adoptionInfo);
  };

  return (
    <div>
      <Input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Other form inputs */}
      <Button onClick={handleAdoption}>Initiate Adoption</Button>
    </div>
  );
};

// export default AdoptionForm;
