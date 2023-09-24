import React from 'react';
import { render, screen } from '@testing-library/react';
import { PuppyHome } from './PuppyHome'; // Adjust the import path as needed

describe('PuppyHome', () => {
  it('renders the component', () => {
    // Render the PuppyHome component
    render(<PuppyHome />);

    // Use screen queries to check if specific elements are rendered
    expect(screen.getByText('Admin')).toBeInTheDocument(); // Check if the 'Admin' text is rendered
    expect(screen.getByText('PuppyList')).toBeInTheDocument(); // Check if the PuppyList component is rendered
    // Add more assertions for other elements as needed
  });

  // Add more test cases as needed
});
