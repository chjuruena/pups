import { render } from '@testing-library/react';
import { EditPuppyForm } from './EditPuppyForm';

describe('EditPuppyForm', () => {
  it('renders without crashing', () => {
    const puppyData = {
      id: '1',
      name: 'Test',
      age: '1',
      gender: 'Male',
      isVaccinated: true,
      isNeutered: false,
      size: 'Small',
      breed: 'Bulldog',
      traits: ['Friendly'],
      personalityTraits: 'Loyal, playful',
      vaccinationRecords: 'Up-to-date',
      spayingNeuteringStatus: 'Not neutered',
      specialNeeds: 'None',
      notes: 'Test notes',
      photoUrl: 'https://example.com/test.jpg',
    };

    const onSave = jest.fn();

    const { container } = render(
      <EditPuppyForm puppyData={puppyData} onSave={onSave} />,
    );

    expect(container).toBeTruthy();
  });
});
