import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav'; // Adjust the import path as needed

describe('Nav', () => {
  it('renders the component with links', () => {
    // Define the links you want to test
    const links = ['Home', 'About', 'Contact'];

    // Render the Nav component with links
    render(<Nav links={links} />);

    // Check if the links are rendered
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });

    // Check if the HamburgerIcon is rendered (for mobile view)
    expect(screen.getByLabelText('Open Menu')).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', () => {
    // Define the links for the mobile menu
    const mobileLinks = ['MobileLink1', 'MobileLink2'];

    // Render the Nav component with mobile links
    render(<Nav links={[]} />);

    // Check if the mobile menu is initially closed
    expect(screen.queryByText('MobileLink1')).not.toBeInTheDocument();

    // Click the HamburgerIcon to open the mobile menu
    fireEvent.click(screen.getByLabelText('Open Menu'));

    // Check if the mobile menu is open
    mobileLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });

    // Click the HamburgerIcon again to close the mobile menu
    fireEvent.click(screen.getByLabelText('Open Menu'));

    // Check if the mobile menu is closed
    mobileLinks.forEach((link) => {
      expect(screen.queryByText(link)).not.toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
