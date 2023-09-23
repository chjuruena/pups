import React from 'react';
import { Button } from '@chakra-ui/react';

interface AdminPanelProps {
  addPuppy: () => void;
  editPuppy: () => void;
  removePuppy: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  addPuppy,
  editPuppy,
  removePuppy,
}) => {
  return (
    <div>
      <Button onClick={addPuppy}>Add New Puppy</Button>
      <Button onClick={editPuppy}>Edit Puppy</Button>
      <Button onClick={removePuppy}>Remove Puppy</Button>
    </div>
  );
};

// export default AdminPanel;
