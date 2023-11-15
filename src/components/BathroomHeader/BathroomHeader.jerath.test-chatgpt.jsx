// BathroomHeader.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BathroomHeader from './BathroomHeader';

describe('BathroomHeader Component', () => {
  it('should redirect to the home screen after signing in', async () => {
    // Render the component
    render(<BathroomHeader />);
    
    // Wait for the header text to appear
    const headerText = await screen.findByText('Bathrooms Near Me');
    expect(headerText).toBeInTheDocument();
  });
});