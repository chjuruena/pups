import { render, fireEvent } from '@testing-library/react';
import { AdoptionForm } from './AdoptionForm';
import { AdoptionService } from '../service/AdoptionService';
import { assert, describe, expect, it } from 'vitest';
// import { render, screen, expect, describe, it, vi, userEvent, waitFor } from '../../test-utils'
jest.mock('../service/AdoptionService');

describe('AdoptionForm', () => {
  it('renders correctly', () => {
    const puppy = {
      name: 'Test Puppy',
      breed: 'Test Breed',
      age: '1 year',
      traits: 'Friendly',
      photoUrl: 'test.jpg',
    };

    const { getByPlaceholderText } = render(<AdoptionForm puppy={puppy} />);

    expect(getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Your Phone')).toBeInTheDocument();
    expect(
      getByPlaceholderText('Write a message (optional)'),
    ).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const puppy = {
      name: 'Test Puppy',
      breed: 'Test Breed',
      age: '1 year',
      traits: 'Friendly',
      photoUrl: 'test.jpg',
    };

    AdoptionService.submitAdoption.mockResolvedValue();

    const { getByPlaceholderText, getByText } = render(
      <AdoptionForm puppy={puppy} />,
    );

    fireEvent.change(getByPlaceholderText('Your Name'), {
      target: { value: 'Test Name' },
    });
    fireEvent.change(getByPlaceholderText('Your Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Your Phone'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(getByPlaceholderText('Write a message (optional)'), {
      target: { value: 'Test Message' },
    });

    fireEvent.click(getByText('Submit'));

    expect(AdoptionService.submitAdoption).toHaveBeenCalledWith({
      name: 'Test Name',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'Test Message',
    });
  });
});
